//*********************************************** */
//  
//
//*********************************************** */


//*********************************************** */
// IMPORTS
//*********************************************** */
import io from 'socket.io-client'; 



//*********************************************** */
// SOCKET BINDING TO HTTP SERVER
//*********************************************** */
let socket = io.connect('http://localhost:8181'); //Where Master is hosted and can pass around this instance.
const authKey = 'asdfjhaer923';

socket.emit('clientAuth',authKey);     

//*********************************************** */
// EXPORTS
//*********************************************** */
export default socket;     