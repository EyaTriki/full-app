import React, { useState } from 'react'
import axios from 'axios';
import "./login.scss";
import jwt_decode from "jwt-decode";
import Home from '../home/Home';
import { useAuth } from '../../context/AuthContext';
import { useNavigate} from "react-router-dom";



const Login = () => {
  
  const [user , setUser]=useState(null);
  const [email,setEmail]=useState("");
  const [password , setPassword]=useState("");
  const [error, setError]=useState(false);
  const [success , setSuccess]=useState(false);
  const { isAuthenticated , handleLogin} = useAuth();
  const navigate = useNavigate();


  const refreshToken = async () => {
    try {
      const res = await axios.post("/users/refresh", { token: user.refreshToken });
      setUser({
        ...user,
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken,
      });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const axiosJWT = axios.create()

  axiosJWT.interceptors.request.use(
    async (config) => {
      let currentDate = new Date();
      const decodedToken = jwt_decode(user.accessToken);
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        const data = await refreshToken();
        config.headers["authorization"] = "Bearer " + data.accessToken;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
const handleSubmit = async (e)=>{
  e.preventDefault();
  try {
    
const res= await axios.post("/users/login",{email , password})
setUser(res.data)
handleLogin(res.data.accessToken);
console.log(res.data)
navigate("/");
  } catch (err) {
    setSuccess(false);
      setError(true);
      
      console.log(err);
  }
}


  return (
    <>

   {isAuthenticated ?(
      <Home />
    ) : (
      <div className="signin-form-container">
      <form className="signin-form" onSubmit={handleSubmit}>
      <h2>Sign In</h2>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <span className="error">Please enter both email and password.</span>}
      <button type="submit">Sign In</button>
    </form>
    </div>
  )}
  </>
 
  )
}

export default Login
