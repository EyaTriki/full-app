import Home from "./pages/home/Home";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import  Settings from "./pages/settings/Settings";
import {userInputs, productInputs} from'./formSource';
import './style/dark.scss'
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthProvider, useAuth } from '../src/context/AuthContext'; // Adjust the file path as needed




function App() {
  const { darkMode } = useContext(DarkModeContext);
  const { isAuthenticated } = useAuth();
  console.log('isAuthenticated:', isAuthenticated);
  
    return (
      <AuthProvider>
        <div className={darkMode ? "app dark" : "app"}>
          <BrowserRouter>
            <Routes>
              {/* Define the root route ("/") */}
              <Route path="/">
                {/* Conditionally render Home or Login based on authentication */}
                {isAuthenticated ? (
                  <Route index  element={<Home />} />
                ) : (
                  <Route index  element={<Login />} />
                )}
  
                {/* Nested routes for users */}
                <Route path="users">
                  <Route index element={<List />} />
                
                  <Route path=":userId" element={<Single />} />
                  <Route path="new" element={<New inputs={userInputs} title="Add New Employee" />} />
                </Route>
                <Route path="/settings" element={<Settings />} />
                {/* Nested routes for products */}
                 <Route path="products">
                  <Route index element={<List />} />
                  <Route path=":productId" element={<Single />} />
                  <Route path="new" element={<New inputs={productInputs} title="Add New Product" />} />
                </Route>  
              </Route>
            </Routes>
          </BrowserRouter>
        </div>
      </AuthProvider>
    );
  }

export default App;