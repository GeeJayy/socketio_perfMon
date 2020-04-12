//*********************************************** */
// MAIN WIDGET FOR DISPLAYING CHILD WIDGETS
//*********************************************** */


//*********************************************** */
// IMPORTS
//*********************************************** */
import React, { useEffect, useState } from "react";
import CPUWidget from './CPUWidget'; 
import MemWidget from './MemoryWidget'; 
import InfoWidget from './InfoWidget';

function PerfWidget(props){
    const [keyVal, setKeyVal] = useState();
    const [data, setData] = useState(null);

    useEffect(()=>{
        setKeyVal(props.keyVal);
        setData(props.data);
        //console.log("Props Data: ", props.data["CPU_Load"]);  

        
    },[props]);
    

    return(
        <div className="widgetWrapper">
            <InfoWidget
                data = {props.data}
                mac = {props.keyVal}
            />
           
            <CPUWidget
                data = {props.data}
            />
            
            <MemWidget
                data = {props.data}
            />

        </div>
 
    );

}


export default PerfWidget;