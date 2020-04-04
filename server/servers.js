//*********************************************** */
// Socket.io Server services both node & react clients
// Entry point for Socket.io Server
// **Entry point for cluster to make workers,
// **and workers will do the socket.io handling
//
// Req:
//  -farmhash (google's hashing algorithms)
//  -socket.io 
//  -socket.io-redis
//*********************************************** */


//*********************************************** */
// IMPORTS
//*********************************************** */

//See https://github.com/elad/node-cluster-socket.io
const express = require('express');
const cluster = require('cluster');
const net = require('net'); //http module extends this (no one connects to master via http, they come in via TCP)
const socketio = require('socket.io');
// const helmet = require('helmet'); //only if using express
const socketMain = require('./socketMain');
// const expressMain = require('./expressMain');
const port = 8181;
const num_processes = require('os').cpus().length;
// Brew breaks for me more than it solves a problem, so I 
// installed redis from https://redis.io/topics/quickstart
// have to actually run redis via: $ redis-server (go to location of the binary)
// check to see if it's running -- redis-cli monitor
const io_redis = require('socket.io-redis');
const farmhash = require('farmhash');



//*********************************************** */
// CLUSTER MANAGEMENT
// MASTER, THEN WORKER
//*********************************************** */

if (cluster.isMaster) {
	// This stores our workers. We need to keep them to be able to reference
	// them based on source IP address. It's also useful for auto-restart,
	// for example.
	let workers = [];

	// Helper function for spawning worker at index 'i'.
	let spawn = function(i) {
		workers[i] = cluster.fork(); //spawn another program

		// Optional: Restart worker on exit (when any cluster dies it emits the EXIT event)
		workers[i].on('exit', function(code, signal) {
			console.log('respawning worker', i);
			spawn(i);
		});
    };

    // Spawn workers for each thread
	for (var i = 0; i < num_processes; i++) {
		spawn(i);
	}

	// Helper function for getting a worker index based on IP address.
	// This is a hot path so it should be really fast. The way it works
	// is by converting the IP address to a number by removing non numeric
    // characters, then compressing it to the number of slots we have.
	//
	// Compared against "real" hashing (from the sticky-session code) and
	// "real" IP number conversion, this function is on par in terms of
	// worker index distribution only much faster.
	const worker_index = function(ip, len) {
		return farmhash.fingerprint32(ip) % len; // Farmhash is the fastest and works with IPv6, too
    };
    //TURN IP TO HASH AND FIND WHAT WORKIER TO ATTACH IT TO


    // in this case, we are going to start up a tcp connection via the net
    // module INSTEAD OF the http module. Express will use http, but we need
    // an independent tcp port open for cluster to work. This is the port that 
    // will face the internet. 
    //Anyone who connects to our Port via TCP, the callback will run**. Grab a worker from the worker array
    //worker index from the hashing algorithm
	const server = net.createServer({ pauseOnConnect: true }, (connection) =>{
		// We received a connection and need to pass it to the appropriate
		// worker. Get the worker for this connection's source IP and pass
		// it the connection.
		let worker = workers[worker_index(connection.remoteAddress, num_processes)];//connects to sepcific worker based on IP
		worker.send('sticky-session:connection', connection);
    });
    server.listen(port);
    console.log(`Master listening on port ${port}`);


} 
//*********************************************** */
// CLUSTER MANAGEMENT ( WORKER)
//
//*********************************************** */
else {
    // Note we don't use a port here because the master listens on it for us.
    let app = express();
    app.use(express.static(__dirname + '/public')); //Can serve static files if we want to.
    //app.use(helmet());
    
	// Don't expose our internal server to the outside world.
    const server = app.listen(0, 'localhost'); //NOT EXPOSED TO THE OUTSIDE WORLD: PORT 0. MASTER LISTENS FOR US
    // console.log("Worker listening...");    
	const io = socketio(server);

	// Tell Socket.IO to use the redis adapter. By default, the redis
	// server is assumed to be on localhost:6379. You don't have to
	// specify them explicitly unless you want to change them*****
	// redis-cli monitor
	io.adapter(io_redis({ host: 'localhost', port: 6379 }));

    // Here you might use Socket.IO middleware for authorization etc.
	// on connection, send the socket over to our module with socket stuff
    io.on('connection', function(socket) {
        //call socketMain on the server and the socket that just connected
		socketMain(io,socket);
		console.log(`connected to worker: ${cluster.worker.id}`);
    });

	// Worker: ONLY Listen to messages sent from the master. Ignore everything else.
	process.on('message', function(message, connection) {
		if (message !== 'sticky-session:connection') {
			return;
		}

		// Emulate a connection event on the server by emitting the
		// event with the connection the master sent us.
		server.emit('connection', connection);

		connection.resume();
	});
}

//*********************************************** */
//
//*********************************************** */
