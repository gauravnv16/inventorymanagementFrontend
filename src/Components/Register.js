import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';



const Register = () =>{
    const navigate = useNavigate();

    function myForm(e){
        e.preventDefault();
        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var password = document.getElementById('pass').value;
        const request = axios({
            headers: { 
                'content-type': 'application/json'
            },
            method: 'post',
            url: `https://inventorymanagement2.herokuapp.com/api/register`,
            params: {
                name:name,
                email:email,
                pass:password
            }
        }).then((response) => {
            navigate("/login");
        }).catch((error) => error);
    }
    
    return (
        <div className="form_height row d-flex align-items-center justify-content-center">
        <form className="myForm rounded-4 shadow p-5" onSubmit={myForm}>
      
            <h4 className="formHeading"><i className="user outline icon"></i>  Register</h4>

            <div className="form mb-4">
              <input type="text" id="name" name="name" className="form-control" placeholder="Name" />
            </div>

            <div className="form mb-4">
              <input type="email" id="email" name="email" className="form-control" placeholder="Email" />
            </div>
          
            
            <div className="form mb-4 ">
              <input type="password" id="pass" name="pass" className="form-control"  placeholder="Password" />
            </div>
          
            <span className="formText">Existing User<Link to="/login">Login ?</Link></span><br/>
            <button type="submit" className="btn btn-primary btn-block">Sign Up</button>

            
          </form>
    </div>
    )
}

export default Register;
