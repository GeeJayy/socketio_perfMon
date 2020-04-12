//*********************************************** */
// INFO WIDGET FOR DISPLAYING CPU/OS INFO DATA
//*********************************************** */


//*********************************************** */
// IMPORTS
//*********************************************** */
import React, { useEffect, useState } from "react";
import './Styles.css'

function InfoWidget(props){
    const [state, setState] = useState({});


    return(
        <div className="Container">
            <h1 className="widgetTitle">Machine Info</h1>
            <div className = "ThirdContainer">
                <h3 className = "hTitle">MAC Address: <p className = "item">{props.mac}</p></h3>
                <h3 className = "hTitle">OS Type: <p className = "item">{props.data['OS_Type']}</p></h3>
                <h3 className = "hTitle">OS Up Time: <p className = "item">{props.data['OS_UpTime']} seconds</p></h3>
            </div>

        </div>


    );

}


export default InfoWidget;