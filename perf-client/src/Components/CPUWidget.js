//*********************************************** */
// CPU WIDGET FOR DISPLAYING CPU DATA
//*********************************************** */


//*********************************************** */
// IMPORTS
//*********************************************** */
import React, { useEffect, useState } from "react";
import {PieChart, Pie, Sector, Cell, Legend,Tooltip} from 'recharts';
import './CPUStyles.css'


function CPUWidget(props){
    const [state, setState] = useState({});
    const [CPUData, setCPUData] = useState([{name:'CPU Load',value:10},{name: 'CPU Available',value:90}]);
    // const configuredCurve = d3Shape.curveCatmullRom.alpha(0.5);
    const COLORS = [ '#FFBB28', '#0088FE'];//'#0088FE', '#00C49F',
    var dataFormat = 
    //NEW PROPS
    useEffect(()=>{
        let temp = props.data['CPU_Load'] ? props.data['CPU_Load'] : 0
        setCPUData([{name:'CPU Load',value: temp},{name: 'CPU Available',value:100-temp}])
       
    },[props]);



    return(
        <div className = {'CPUContainer'}>
            <h1>CPU Widget</h1>
            <div className = {'InfChContainer'}>

            
                <div className = {'CPUInfo'}>
                    <h3>CPU Model: <p className = "item">{props.data['CPU_Model']}</p></h3>
                    <h3>CPU Speed: <p className = "item">{`${props.data['CPU_Speed']} GHz`}  </p></h3>
                    <h3>CPU Cores: <p className = "item">{props.data['CPU_Cores']}</p></h3>
                    <h3>CPU Threads: <p className = "item" >{props.data['CPU_Threads']}</p></h3>

                </div>

                <div className = {'LineChartDiv'}>
                    <h1>Real-Time CPU Load</h1>
                    <PieChart
                        width={800}
                        height={800}
                    >
                        <Pie
                            data = {CPUData}
                            cx = {400}
                            cy = {185}
                            labelLine = {true}
                            outerRadius = {180}
                            fill="#8884d8"
                            dataKey="value"
                            label = {true}
                        >

                            {
                                CPUData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                            }
                        </Pie>

                        <Legend
                            verticalAlign="top"
                            height={0}
                            iconType = {'square'}
                        />
                        {/* <Tooltip /> */}
                    </PieChart>

                </div>
            </div>
        </div>
        


    );

}


export default CPUWidget;