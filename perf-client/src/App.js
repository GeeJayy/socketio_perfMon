import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
//import logo from './logo.svg';
import './App.css';
import socket from './util/socketConnection';
import PerfWidget from './Components/PerfWidget';


function App() {

  const [perfData, setPerfData] = useState({});
  const [widgets, setWidgets] = useState({}); //Stores the widget data
   
  //***************************************** */
  //GRAB DATA WHEN WE MOUNT (FOR EACH MACHINE CONNECTED)
  useEffect(()=>{
    //***************************************** */
    //WHEN SOCKET RECEIVES DATA UPDATE STATE
    socket.on('data',(data)=>{
      // console.log('Data Received: ', data);
      //UPDATE STATE SO WE CAN RE-RENDER APP->WIDGET->CPU/MEM/INFO
      //MAKE A COPY OF CURRENT STATE TO MUTATE IT:
      const currState = Object.assign({},perfData);
      currState[data.MACaddress] = data;
      setPerfData(currState);
    });

  },[]);

  const Widget  = (data) =>{
    let keys = Object.keys(data)[0];
    let sData = {...data};
    let formatData = {};
    Object.entries(sData).map((d,k)=>{
      console.log("D: ", d[1]);
      console.log('k: ', k)
      formatData = d[1];
    });
    //let vals = Object.values(data)[0];
    //console.log("CPU CORES 1: ", data.CPU_Cores);
    return <PerfWidget
              keyVal = {keys}
              data = {formatData}
              // CPUCores = {...data["CPU_Cores"]}
            />
  }
  
 //***************************************** */ 
 //
 //***************************************** */
  return (
      <div className="App">
        {/* {console.log('PerfData: ', perfData)} */}
        {/* 
        <PerfWidget
          key = {key}
          data = {perfData}
        /> */}
        {Widget(perfData)}

      </div>
  );
}

export default App;
