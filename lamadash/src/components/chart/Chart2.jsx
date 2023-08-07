import "./chart2.scss";
import {
    Bar ,
    Legend,
    BarChart,
    YAxis,
    XAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
  } from "recharts";


const data = [
    {
      "name": "CIVP",
      "CIVP": 4000,
      
    },
    {
      "name": "CDD",
      "CDD": 3000,
    
    },
    {
      "name": "Karama",
      "Karama": 2000,
    
    },
    {
      "name": "CDI",
      "CDI": 2780,
    },
   
  ]

const Chart2 = ({aspect,title}) => {
    
  return (
    <div className="chart">
         <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
      <BarChart width={530} height={250} data={data} barCategoryGap={5} barGap={0}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="name" />
  <YAxis />
  <Tooltip />
  <Legend />
  <Bar dataKey="CIVP" fill="#8884d8" />
  <Bar dataKey="CDD" fill="#82ca9d" />
  <Bar dataKey="Karama" fill="#ffbb33" />
  <Bar dataKey="CDI" fill="#ff8042" />
</BarChart>
</ResponsiveContainer>
    </div>
  )
}

export default Chart2
