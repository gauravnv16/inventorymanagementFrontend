import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const NavBar = () => {
    const [status,setStatus] = React.useState({});
   
    React.useEffect(() => {
        axios.get('https://inventorymanagement2.herokuapp.com/api/status').then((res) => {
          setStatus(res.data);
        });
      });


    if(status.login_status === false){
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
              <a className="navbar-brand me-2" href="/">
              <i className="box icon mb-2"></i>  <span className='ms-1'>Inventory Management</span>
              
              </a>
        
              <button
                className="navbar-toggler"
                type="button"
                data-mdb-toggle="collapse"
                data-mdb-target="#navbarButtonsExample"
                aria-controls="navbarButtonsExample"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <i className="fas fa-bars"></i>
              </button>
          
        
              <div className="collapse navbar-collapse" id="navbarButtonsExample">
        
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  
                </ul>
        
          
                <div className="d-flex align-items-center">
                  <button type="button" className="btn btn-link px-3 me-2">
                    Login
                  </button>
                  <Link to='/register' className="btn btn-primary me-3">Sign up for free</Link>
                  <a
                    className="btn btn-dark px-3" target="_blank"
                    href="https://github.com/GAURAV-NVG/InventoryManagement-By-GAURAV-N-V"
                    role="button"
                    ><i className="fab fa-github"></i
                  ></a>
                </div>
              </div>
            </div>
          </nav>
        );
    }
    else{
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
            <a className="navbar-brand me-2" href="/">
            <i className="box icon mb-2"></i> <span className='ms-1'> Inventory Management</span>
            </a>

            <button
                className="navbar-toggler"
                type="button"
                data-mdb-toggle="collapse"
                data-mdb-target="#navbarButtonsExample"
                aria-controls="navbarButtonsExample"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <i className="fas fa-bars"></i>
            </button>
        

            <div className="collapse navbar-collapse" id="navbarButtonsExample">

            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-3">
                  <li className="nav-item">
                    <a className="nav-link" href="/units"><i className="balance scale icon"></i> Units</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/category"><i className="sitemap icon"></i> Category</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/inventory"><i className="boxes icon"></i> Products</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/order"><i className="pallet icon"></i> Orders</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/invoice"><i className="file icon"></i> Invoice</a>
                  </li>
                </ul>

        
                <div className="d-flex align-items-center">
                <button type="button" className="btn btn-link px-3 me-2">
                    <a href="/logout"><i className="sign-out icon"></i> Logout</a>
                </button>
                <button type="button" className="btn btn-primary me-3">
                <i className="user outline icon"></i> Account
                </button>
                <a
                    className="btn btn-dark px-3"
                    href="https://github.com/GAURAV-NVG/InventoryManagement-By-GAURAV-N-V" target="_blank"
                    ><i className="fab fa-github"></i
                ></a>
                </div>
            </div>
            </div>
        </nav>
        );
    }
    
}

export default NavBar;