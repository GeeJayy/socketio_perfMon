//*********************************************** */
// INFO WIDGET FOR DISPLAYING CPU/OS INFO DATA
//*********************************************** */


//*********************************************** */
// IMPORTS
//*********************************************** */
import React, { useEffect, useState } from "react";
 

function InfoWidget(props){
    const [state, setState] = useState({});


    return(
        <div>
            <h1>Connected Machine Info</h1>
            <p>MAC Address: {props.data['MAC_Address']}</p>
            <p>OS Type: {props.data['OS_Type']}</p>
            <p>OS Up Time: {props.data['OS_UpTime']} seconds</p>
        </div>


    );

}


export default InfoWidget;