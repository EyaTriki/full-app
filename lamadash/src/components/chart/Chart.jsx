import "./chart.scss";
import {
  AreaChart,
  Area,
  Legend,
  Line ,
  LineChart,
  YAxis,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "January", autorisations: 1200 ,absences:500,leaves:1700,retards:900},
  { name: "February", autorisations: 2100 ,absences:800,leaves:500,retards:1200},
  { name: "March", autorisations: 800 ,absences:2000,leaves:2200,retards:400},
  { name: "April", autorisations: 1600 ,absences:1000,leaves:800,retards:1900},
  { name: "May", autorisations: 900 ,absences:1500,leaves:1200,retards:2000},
  { name: "June", autorisations: 1700 ,absences:2100,leaves:1400,retards:750},
];

const Chart = ({aspect,title}) => {
  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
       {/*  <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart> */}
        <LineChart width={730} height={250} data={data}
  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="name" />
  <YAxis />
  <Tooltip />
  <Legend />
  <Line type="monotone" dataKey="autorisations" stroke="#8884d8" />
  <Line type="monotone" dataKey="absences" stroke="#82ca9d" />
  <Line type="monotone" dataKey="leaves" stroke="#ff6600" /> 
      <Line type="monotone" dataKey="retards" stroke="#ffcc00" />
</LineChart>
      </ResponsiveContainer>
      
    </div>
  );
};

export default Chart;