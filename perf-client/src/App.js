import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import socket from './util/socketConnection';


function App() {

  const [perfData, setPerfData] = useState({});

  useEffect(()=>{
    //***************************************** */
    //WHEN SOCKET RECEIVES DATA UPDATE STATE
    socket.on('data',(data)=>{
      console.log('Data Received: ', data);
      setPerfData(data);
    });
  },[]);//When Component Mounts

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
