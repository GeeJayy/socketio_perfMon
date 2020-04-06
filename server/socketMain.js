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
    var MACaddress;
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
            console.log("React Client Joined");
        }
        else{
            //an invalid client has joined: close all connections immediately
            socket.disconnect(true);
        }

    }); 

    //*********************************************** */
    //RUN WHEN NEW CLIENT CONNECTS FIRST TIME:
    socket.on('initPerfData',async (data)=>{
        //NEED perf data to run once first.
        //console.log('INIT PERF DATA: ', data);
        var MACaddress = data.MACaddress; //UPDATE MAC ADDRESS;
        //NOW CHECK MONGO IF THIS CLIENT HAS CONNECTED BEFORE**
        const mongoResponse = await checkNAddMongo(data);
        console.log('Mongoose Response: ', mongoResponse)
    });    


    //*********************************************** */
    //RUN WHEN RECEIVING PERF DATA EACH TICK
    socket.on('perfData', (data)=>{
        console.log('**********************************');
        console.log("******Performance Data Ticking****");
        console.log('**********************************\n');
        

        // SEND THIS DATA TO THE UI NAMESPACE 
        ioServer.emit('data',data);
    });
}

function checkNAddMongo(data){
    //THIS IS DB STUFF - NEED ASYNC PROMISE
    return new Promise((resolve,reject)=>{
        Machine.findOne(
            {MAC_Address: data.MACAddress},//QUERY TO RUN
            (err,doc)=>{// CALLBACK TO RUN ONCE SUCCEEDED QUERY
                if(err){
                    throw err;
                    reject(err); //TO RESOLVE THE PROMISE
                }
                else if(doc == null){
                    //IF THE RECORD IS NOT IN DB YET: MAC Address doesnt EXIST - CREATE IT
                    let newMachine = new Machine(data); //Map fields
                    newMachine.save();//Save it to DB
                    resolve('added data');
                }
                else{
                    //MAC ADDRESS HAS RECORDS IN DB (we can append data)
                    resolve('found');
                }

            }
        )

    });
}



//*********************************************** */
// EXPORTS
//*********************************************** */
module.exports = socketMain;