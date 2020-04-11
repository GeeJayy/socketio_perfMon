//*********************************************** */
// Node Program that captures local Performance Data
// Runs on the machines giving perf data
// Req:
//  -farmhash (google's hashing algorithms)
//  -socket.io client
//*********************************************** */


//*********************************************** */
// IMPORTS
//*********************************************** */
const os = require('os');
const io = require('socket.io-client');
let socket = io('http://localhost:8181'); //PORT FOR Socket.io Server (MASTER) 

//*********************************************** */
// SYSTEM DATA INFORMATION
//*********************************************** */
// need CPU load (current), Memory Usage (free + total),
// OS type, up-Time Online, Processor Information (type, num cores, clock speed)

// const osType = os.type();
// const osCPUinfoObj = os.cpus(); //returns array of infor for each logical CPU core (I have 16, since 8 cores)
// const osCPUNumCores = osCPUinfoObj.length;
// const osCPUModel = osCPUinfoObj[0].model; //all will be the same model
// const osCPUSpeed = osCPUinfoObj[0].speed;
// const osUpTime = os.uptime();
// const osFreeMem = os.freemem();
// const osTotalMem = os.totalmem();
// const osUsedMem = osTotalMem - osFreeMem;
// const osMemUsage = Math.floor(osUsedMem/osTotalMem*100) //usedmem/totalmem


//*********************************************** */
// SOCKET CONNECTION & EMITTINGS
//*********************************************** */
//Need a way to ID this client to whoever is concerned (Cant us IP*)
//USE NETWORK INTERFACES (MAC ADDRESS - EXTERNAL), LOOP THRU PROPS TILL INTERNAL = false
socket.on('connect',()=>{
    console.log('Connected to Socket Server');

    const networkInterface = os.networkInterfaces();
    let MACaddress;
    //Loop thru interfaces to find INTERNAL = FALSE
    for(let key in networkInterface){
        //CHECK IF INTERNAL PROPERTY IS FALSE
        if(!key[0].interal){
            MACaddress = networkInterface[key][0].mac //MAC address of external Net. Int.
            break; //only need one network interface per machine
        }
        else{
            console.log("Machine not connected to Internet");
        }

    }


    //*********************************************** */
    //AUTHENTICATION: CLient auth with single key/valu
    socket.emit('clientAuth','q345bqv34b5q347nq47yq45bq34q3')


    //*********************************************** */
    //INIT PERF DATA:
    performanceData().then((allPerfData)=>{
        allPerfData.MACaddress = MACaddress; //APPEND MAC ADDRESS FOR FIRST CHECK
        socket.emit('initPerfData',allPerfData); //Send over all perf data on init
    })


    //*********************************************** */
    //PERF DATA EVERY SECOND:
    let perfDataInterval = setInterval(()=>{
        performanceData().then((allPerfData) =>{
            //console.log("performance Data: ", allPerfData);
            allPerfData.MACaddress = MACaddress; //APPEND MAC ADDRESS FOR FIRST CHECK
            socket.emit('perfData',allPerfData); //NEED TO APPEND MAC ADDRESS
        });
    },100); //run every one second

    //IF THE SOCKET DISCONNECTS, CLEAR THE INTERVAL, SO WHEN RECONNECTS IT IS DUPLICATED
    socket.on('disconnect',()=>{
        clearInterval(perfDataInterval);
    });

});

//*********************************************** */
//Use the OS CPU times object to compute the real-time load for each mode the CPU is in:
//Need average of all the cores -> full CPU Average
function performanceData(){
    return new Promise(async(resolve,reject)=>{
        const OS_Type = os.type();
        const CPU_INFO = os.cpus(); //returns array of infor for each logical CPU core (I have 16, since 8 cores)
        const CPU_Threads = CPU_INFO.length;
        const CPU_Cores = CPU_Threads/2;
        const CPU_Model = CPU_INFO[0].model; //all will be the same model
        const CPU_Speed = CPU_INFO[0].speed;
        const OS_UpTime = os.uptime();
        const OS_FreeMem = os.freemem();
        const OS_TotalMem = os.totalmem();
        const OS_UsedMem = OS_TotalMem - OS_FreeMem;
        const OS_MemUsage = Math.floor(OS_UsedMem/OS_TotalMem*100) //usedmem/totalmem
    
        const CPU_Load = await getCPUload();

        resolve({
            OS_Type,
            OS_UpTime,
            CPU_Model,
            CPU_Speed,
            CPU_Cores,
            CPU_Threads,
            CPU_Load,
            OS_TotalMem,
            OS_FreeMem,
            OS_UsedMem,
            OS_MemUsage
        });

    });

}

//*********************************************** */
//Use the OS CPU times object to compute the real-time load for each mode the CPU is in:
//Need average of all the cores -> full CPU Average
function computeCPUavg(){
    const cpus = os.cpus();
    //Ms in each mode, but number is in milli seconds since reboot...
    let idleMS = 0; //total of all cores in idle mode
    let totalMS = 0; //total of all cores
    cpus.forEach((core) => {
        //loop thru each property of the core (User, Nice, Sys, Idle, irq)
        for(type in core.times){
            //console.log ('Types: ', type);
            totalMS += core.times[type];0
        }
        idleMS += core.times.idle;

    });

    return {
        idle: idleMS/cpus.length,
        total: totalMS/cpus.length
    }

}
//*********************************************** */


//*********************************************** */
// Since cpu times property is time since boot, we will look at 100 milli second slices
// and compare loads
function getCPUload(){
    //ASYNC 
    return new Promise((resolve,reject)=>{
        const startLoad = computeCPUavg();
        setTimeout(()=>{
            const endLoad = computeCPUavg();
            const idleDiff = endLoad.idle - startLoad.idle
            const totalDiff = endLoad.total-startLoad.total
            //Compute Percentage of CPU Used:
            const percentCPU = 100 - Math.floor(100*idleDiff/totalDiff);
            resolve(percentCPU);
        }, 100); //Runs after 100 millisecondsv

        //CHECK THE 1 SECOND INTERVALS
        // setInterval(() => {
        //     getCPUload();
        // }, 1000);
    });
}
//*********************************************** */



//*********************************************** */
//  LOGGING
//*********************************************** */
// console.log('***********************************************');
// console.log('***********************************************');
// console.log("** OS Type: ", osType);
// console.log("** OS Up-time: ", osUpTime, " seconds");
// console.log('** OS CPU Model: ', osCPUModel);
// console.log('** OS CPU Cores: ', osCPUNumCores);
// console.log('** OS CPU Speed: ', osCPUSpeed, "MHz");
// console.log("** OS Free Memory: ", osFreeMem, " bytes");
// console.log("** OS Total Memory: ", osTotalMem, " bytes");
// console.log("** OS Memory Usage: ", osMemUsage, '%');

// // getCPUload()

// console.log('***********************************************');
// console.log('***********************************************');
