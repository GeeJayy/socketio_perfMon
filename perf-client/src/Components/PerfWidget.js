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
    const [CPULoad, setCPULoad] = useState(null);

    useEffect(()=>{
        setKeyVal(props.keyVal);
        setData(props.data);
        console.log("Props Data: ", props.data["CPU_Load"]);  

        
    },[props]);
    

    const LOG = (data, key, param) => {

        console.log('LOG: ', data[key]);
        // return <p> `${data[key]}` </p>
    };



    return(
        <>
    
            <h1>Main Widget</h1>
            {/* props.keyVal*/}
            {/* props.data[props.keyVal] */}
            {/* {console.log("Key Received: ", props.keyVal)} */}
            {/* { props.data === {} ? console.log("Data Received: ", props.data[props.keyVal]) : console.log('nodata') }*/}
            {/* {data === null ? console.log("No Data") : LOG(data,keyVal)} */}
            <CPUWidget>
            
            </CPUWidget>
            
            <MemWidget>

            </MemWidget>

            <InfoWidget>

            </InfoWidget>
        </>
 
    );

}


export default PerfWidget;