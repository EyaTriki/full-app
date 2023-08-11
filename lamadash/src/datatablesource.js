import '../src/components/datatable/datatable.scss'
export const userColumns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "user",
      headerName: "User",
      width: 280,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.image} alt="img" />
            {params.row.name}
          </div>
        );
      },
    },
    {
      field: "name",
      headerName: "Name",
      width: 200,
     
    },{
    field: "role",
    headerName: "Role",
    width: 200,
   
  },
    {
      field: "email",
      headerName: "Email",
      width: 270,
    },
  
   /*  {
      field: "phone",
      headerName: "Phone",
      width: 150,
    },
    */
  ];
  
  