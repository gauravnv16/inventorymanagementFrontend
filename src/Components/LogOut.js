import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';


const LogOut = () => {
  const navigate = useNavigate();
  
    function MyFn(){
      axios.get('https://inventorymanagement2.herokuapp.com/api/logout').then((res) => {
        
    });
    navigate("/login");
    }

    return (
      
      <div className="row d-flex justify-content-center mt-5">
        <div className="ms-5">
        <p>Are you sure to log out</p>
        <button className="btn btn-primary" onClick={MyFn}>Log out</button>
        </div>
      </div>
    )

}

export default LogOut;