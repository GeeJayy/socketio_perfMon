//*********************************************** */
//  MongoDB Model
//
//
//
//*********************************************** */


//*********************************************** */
// IMPORTS
//*********************************************** */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Machine = new Schema({
    MAC_Address: String,
    OS_Type: String,
    OS_UpTime: String,
    CPU_Model: String,
    CPU_Speed: Number,
    CPU_Cores: Number,
    CPU_Threads: Number,
    CPU_Load: Number,
    OS_TotalMem: Number,
    OS_FreeMem: Number,
    OS_UsedMem:Number,
    OS_MemUsage: Number, 
});



module.exports = mongoose.model('Machine', Machine); //export as a Mongoose Model