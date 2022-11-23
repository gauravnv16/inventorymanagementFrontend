import './App.css';
import React from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
function App() {

  const [status,setStatus] = React.useState({});
  // window.location.reload(false);
  React.useEffect(() => {
    axios.get('https://inventorymanagement2.herokuapp.com/api/status').then((res) => {
      setStatus(res.data);
    });
  });

  if(status.login_status === false){
    return (
      <Navigate to="/login" />
    )
  }
  return (
    <div className="App p-3">
      <br/>
      <div className="headerg">
        <div>
          <h1>  {"Welcome " + status.user_name + " !!"}</h1>
          <p>Thanks for trying this webapp made by gaurav nv</p>
          <button className="btn btn-primary">Explore</button>
        </div>
        
      </div>
      <div className="about_me">
        <div>
        <h3>About</h3>
        <p>Inventory Management is a full stack (MERN) project that allows you to manage your products monitor both incoming products and products moving ou you will be able to add different categories,filter products barcode generation,all CRUD operations are possible,generate pdf of the invoices etc </p>
        </div>
        <div>
        <img
          src="https://images.unsplash.com/photo-1542553458-79a13aebfda6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Nnx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60"
          className="img-fluid rounded-4 hover-shadow"
          alt="Hollywood Sign on The Hill"
        />
        
        </div>
      </div>
    </div>
  );
}

export default App;
