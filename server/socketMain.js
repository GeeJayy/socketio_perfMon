//*********************************************** */
// Socket Module for all workers 
//
// Req:
//  -farmhash (google's hashing algorithms)
//  -socket.io 
//  -socket.io-redis
//*********************************************** */


//*********************************************** */
// IMPORTS
//*********************************************** */
const mongoose = require('mongoose');
const mongoURL = 'mongodb://127.0.0.1/perfdata'
const mongoOptions = {  
    useNewUrlParser: true,
    useUnifiedTopology: true 
};
const Machine = require('./models/Machine'); //Schema

//*********************************************** */
// MONGO DB
//*********************************************** */
mongoose.connect(mongoURL, mongoOptions);





//*********************************************** */
// SOCKET MAIN
//*********************************************** */
function socketMain(ioServer, socket){
    console.log("Socket Connected: ")//, socket.id

//*********************************************** */
//CLIENT AUTH
socket.on('clientAuth',(key)=>{
    if(key === 'q345bqv34b5q347nq47yq45bq34q3'){
        //VALID NODE CLIENT
        socket.join('clients'); //JOIN CLIENT ROOM
    }
    else if(key === 'asdfjhaer923')
    {
        //FRONT END CLIENT HERE (SEND EVENTS TO JUST UI if need)
    }
    else{
        //an invalid client has joined: close all connections immediately
        socket.disconnect(true);
    }

});

//*********************************************** */
//RUN ON WHEN RECEIVING PERF DATA
    socket.on('perfData', (data)=>{
        console.log('**********************************');
        console.log("Performance Data Received: ", data);
        console.log('**********************************\n');
    })
}

module.exports = socketMain;