//*********************************************** */
// CPU WIDGET FOR DISPLAYING CPU DATA
//*********************************************** */


//*********************************************** */
// IMPORTS
//*********************************************** */
import React, { useEffect, useState } from "react";
import {XYPlot, LineSeries, VerticalGridLines, HorizontalGridLines,XAxis,YAxis} from 'react-vis';
import {RadialChart}from 'react-vis';

import './CPUStyles.css'
import 'react-vis/dist/style.css';

function CPUWidget(props){
    const [state, setState] = useState({});
    const [CPUData, setCPUData] = useState([{x:0,y:0}]);
    const [index, setIndex] = useState(1);
    const [reset, setReset] = useState(false);
    const [CPUPie, setCPUPie] = useState([{angle:0,label:'CPU Used'},{angle:100, label:'CPU Available'}])
    // const configuredCurve = d3Shape.curveCatmullRom.alpha(0.5);
    //NEW PROPS
    useEffect(()=>{
        let yData = props.data['CPU_Load'] ? props.data['CPU_Load'] : 0 //DONT ALLOW UNDEFINED VALUES
        let newData = {x:index%100, y: yData}
        setCPUData(CPUData.concat(newData));
        setIndex(index+1); //CHANGE THIS TO TIME STAMP:
        if((index % 100 == 0)){
            console.log('true')
            // setReset(true)
            setCPUData([{x:0,y:0}])
        }
        setCPUPie([{angle:props.data['CPU_Load'],label:'CPU Used'},{angle:100-props.data['CPU_Load'], label:'CPU Available'}])
    },[props]);

    //
    // useEffect(()=>{
    //     // console.log("RUN")
    //     setCPUData([{x:0,y:0}])

    // },[reset])


    return(
        <div className = {'CPUContainer'}>
            <h1>CPU Widget</h1>
            <div className = {'InfChContainer'}>

            
                <div className = {'CPUInfo'}>
                    <h3>CPU Model: {props.data['CPU_Model']}</h3>
                    <h3>CPU Speed: {props.data['CPU_Speed']} GHz</h3>
                    <h3>CPU Cores: {props.data['CPU_Cores']}</h3>
                    <h3>CPU Threads: {props.data['CPU_Threads']}</h3>

                </div>

                <div className = {'LineChartDiv'}>
                <h1>Real-Time CPU Load</h1>
                    {/* <XYPlot
                        height = {400}
                        width = {800}
                        colorType="linear"
                        colorDomain={[0, 9]}
                        colorRange={['yellow', 'orange']}
                    >
                        <LineSeries
                            data = {CPUData}
                            style={{strokeLinejoin: "round"}}
                            
                        />
                        <VerticalGridLines />
                        <HorizontalGridLines />
                        <XAxis
                            tickValues={[...Array(100).keys()]}
                            tickFormat={v => v}
                        />
                        <YAxis />
                    </XYPlot> */}
                    <RadialChart
                        data = {CPUPie}
                        labelsRadiusMultiplier={1.1}
                        labelsStyle={{
                          fontSize: 12
                        }}
                        //showLabels
                        animation
                        width= {800}
                        height = {400}
                    />

                </div>
            </div>
        </div>
        


    );

}


export default CPUWidget;