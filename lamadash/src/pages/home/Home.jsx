import React from 'react'
import "./home.scss"
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import Widget from '../../components/widget/Widget'
import Featured from '../../components/featured/Featured'
import Chart from '../../components/chart/Chart'
import Table from '../../components/table/Table'
import Chart2 from '../../components/chart/Chart2'
import Chart3 from '../../components/chart/Chart3'


const Home = () => {
  return (
    <div className='home'>
      <Sidebar/>
      <div className='homeContainer'>
        <Navbar/> 
        <div className="charts">
        <Chart title="Last 6 Months (Rate)" aspect={4/1}/>
</div>
      <div className="charts">
     {/*  <Featured/>  */}
       {/*  <Chart3 title="Contracts" aspect={4/1}/>  */}
        <Chart2 title="Contracts" aspect={4/1}/>
       
        <div className="widgets">
        <Widget type='user'/>
        <Widget type='earning'/> 
      </div>
      </div>
      
  
      <div className="listContainer">
        <div className="listTitle"> Latest Transactions</div>
      <Table/>
    
      </div>
      </div>
    </div>
  )
}

export default Home
