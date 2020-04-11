//*********************************************** */
// MEMORY WIDGET FOR DISPLAYING RAM DATA
//*********************************************** */


//*********************************************** */
// IMPORTS
//*********************************************** */
import React, { useEffect, useState } from "react";
import {PieChart, Pie, Sector, Cell, Legend,Tooltip,LabelList} from 'recharts';
import './Styles.css'
import './Styles.css'

function MemWidget(props){
    const [state, setState] = useState({});
    const [PieData, SetPieData] = useState([{}]);
    const COLORS = [ '#FFBB28', '#0088FE'];
    const conversion = 9.313225746154785e-10;



    useEffect(()=>{
    //update the pie data streaming in
    let temp1 = props.data['OS_UsedMem'] ? props.data['OS_UsedMem'] : 0
    let temp2 = props.data['OS_FreeMem'] ? props.data['OS_FreeMem'] : 0

    let memData = [
        {
            name: "Used Memory", value: temp1
        },
        {
            name: "Free Memory", value: temp2
        },
    

    ];
    SetPieData(memData);


    },[props]);


    const renderToolTip = (props) => {
        const { payload } = props;
      
        return (
          <ul>
            {
              payload.map((entry, index) => (
                <li className = {'toolTip'} key={`${entry.dataKey}`}>{`${entry.name}: ${(entry.value*conversion).toFixed(3)}`}</li>
              ))
            }
          </ul>
        );
      }

    return(
        <div className = "Container">
            <h1 className="widgetTitle">RAM Data</h1>
            <div className="SecondContainer">
                <div className = {'Info'}>
                        <h3>Total Memory Available: <p className = "item">{(props.data['OS_TotalMem']*conversion).toFixed(3)} GB</p></h3>
                        

                </div>
                <div className = {'ReChartDiv'}>
                    <PieChart
                            width={800}
                            height={400}
                            label = {true}
                            labelLine = {true}
                    >
                        <LabelList dataKey="name" position="top" />
                        <Pie
                            data = {PieData}
                            cx = {400}
                            cy = {185}

                            outerRadius = {180}
                            fill="#8884d8"
                            dataKey="value"

                        >
                            

                            {
                                PieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                            }

                        </Pie>

                        <Legend
                            verticalAlign="top"
                            height={0}
                            iconType = {'square'}

                        />
                        {/* <Tooltip
                            // payload = {(d)=>{
                            //     d.value = (d.value*conversion).toFixed(3);
                            // }}
                            content = {renderToolTip}
                        /> */}
                    </PieChart>
                </div>
            </div>
            
            








        </div>


    );

}


export default MemWidget;