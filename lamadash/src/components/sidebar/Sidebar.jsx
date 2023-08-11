import "./sidebar.scss";
import{PieChart,Article}from "@mui/icons-material";
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import axios from "axios";
import { useAuth } from '../../context/AuthContext';
import Login from "../../pages/login/Login";
import { useNavigate} from "react-router-dom";


const Sidebar = () => {

  const {dispatch}=useContext(DarkModeContext)
  const { isAuthenticated , handleLogout} = useAuth();
  const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post("/users/logout");
        handleLogout(res.data.token); 
        
        console.log("Logged out!");
        window.location.replace("/");
      } catch (err) {
        console.log("Error during logout:", err);
      }
    };
    
  

  return (
    <div className="sidebar">
      <div className="top">
      <Link to="/" style={{textDecoration:"none"}}>
          <span className="logo">HR3</span>
          </Link>
      </div>
      <hr />
      
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/" style={{textDecoration:"none"}}>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          </Link>
         
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Employees</span>
            </li>
          </Link>
          <Link to="/products" style={{ textDecoration: "none" }}>
            <li>
              <CompareArrowsIcon className="icon" />
              <span>Demands</span>
            </li>
          </Link>
          <li>
            <Article className="icon" />
            <span>Forms</span>
          </li>
          <li>
            <PieChart className="icon" />
            <span>Reports</span>
          </li>
          {/* <p className="title">USEFUL</p>
          <li>
            <InsertChartIcon className="icon" />
            <span>Stats</span>
          </li>
          <li>
            <NotificationsNoneIcon className="icon" />
            <span>Notifications</span>
          </li> */}
        {/*   <p className="title">SERVICE</p>
          <li>
            <SettingsSystemDaydreamOutlinedIcon className="icon" />
            <span>System Health</span>
          </li>
          <li>
            <PsychologyOutlinedIcon className="icon" />
            <span>Logs</span>
          </li> */}
         
          <p className="title1">USER</p>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
          <li>
            <SettingsApplicationsIcon className="icon" />
            <Link to="/settings" style={{ textDecoration: "none" }}>
            <span>Settings</span></Link>
          </li>
          <div className="bottom">
        <div
          className="colorOption" onClick={()=>dispatch({type:"LIGHT"})}>
        </div>
        <div
          className="colorOption"
          onClick={()=>dispatch({type:"DARK"})}>
          </div>
      </div>
          <li >
          <button type="button" className="button" onClick={handleSubmit}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </button>
          </li>
        </ul>
      </div>
      
    </div>
  );
};

export default Sidebar;