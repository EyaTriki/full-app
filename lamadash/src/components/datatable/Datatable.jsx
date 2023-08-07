import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect,useState } from "react";
import axios from "axios";
import { useAuth } from '../../context/AuthContext';



const Datatable = () => {
  const [data, setData] = useState([]);
  const { isAuthenticated } = useAuth(); // Get the isAuthenticated state from AuthContext

  const fetchData = async () => {
    try {
      
      if (isAuthenticated) {
        // If the user is authenticated, get the token from local storage
        const token = localStorage.getItem('access_token');
        console.log(token);
        // Set the axios request headers with the token
        const response = await axios.get('/employes/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(
          response.data.map((user, index) => ({
            id: index + 1,
            img: user.img,
            name: user.name,
            email: user.email,
            phone: user.phone,
          }))
        );
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  

  useEffect(() => {
    fetchData();
  }, [isAuthenticated]);

const handleDelete =(id)=>{
  setData(data.filter((item)=>item.id !== id))
}
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 240,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{textDecoration:"none"}}>
          <div className="viewButton">View</div>
          </Link>
            <div className="deleteButton" onClick={()=>handleDelete(params.row.id)}>
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
<div className="datatableTitle">Add New User
<Link to ="/users/new" style={{textDecoration:"none"}} className="link">
Add New</Link></div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;