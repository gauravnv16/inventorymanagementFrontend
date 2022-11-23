import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import App from '../App';
import '../App.css'

const Login = () => {
    const navigate = useNavigate();



    function myForm(e){
        e.preventDefault();
        var email = document.getElementById('email').value;
        var password = document.getElementById('pass').value;
        const request = axios({
            headers: { 
                'content-type': 'application/json'
            },
            method: 'post',
            url: `https://inventorymanagement2.herokuapp.com/api/login`,
            params: {
                email:email,
                pass:password
            }
        })
        .then((response) => {
            if(response.data.login_status == true){
                navigate("/");
            }
        })
        .catch((error) => error);
    }

    return (
        <div className="form_height row d-flex align-items-center justify-content-center">
        <form className="myForm rounded-4 shadow p-5" onSubmit={myForm}>
      
            <h4 className="formHeading"><i className="user outline icon"></i> Login</h4>

            <div className="form mb-4">
              <input type="email" id="email" name="email" className="form-control" placeholder="Email" />
            </div>

            <div className="form mb-4 ">
              <input type="password" id="pass" name="pass" className="form-control"  placeholder="Password" />
            </div>
          
            <span className="formText">New user <Link to="/register">register ?</Link></span><br/>
            <button type="submit" className="btn btn-primary btn-block">Sign in</button>

            
          </form>
    </div>
    )
}

export default Login;