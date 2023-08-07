import React from 'react'
import "./chart2.scss";
import {
    PieChart,Pie,
    ResponsiveContainer,
  } from "recharts";



const data01 = [
    {
      "name": "Group A",
      "value": 400
    },
    {
      "name": "Group B",
      "value": 300
    },
  
  ];
const Chart3 = ({aspect,title}) => {
  return (
    <div className="chart">
    <div className="title">{title}</div>
 <ResponsiveContainer width="100%" aspect={aspect}>
 <PieChart width={730} height={250}>
  <Pie data={data01} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" />
  
</PieChart>
    </ResponsiveContainer>
    </div>
  )
}

export default Chart3
