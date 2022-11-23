import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Login from './Components/Login';
import NavBar from './Components/NavBar';
import LogOut from './Components/LogOut';
import Register from './Components/Register';
import Units from './Components/Units';
import Footer from './Components/Footer';
import Category from './Components/Category';
import Products from './Components/Products';
import Product from './Components/Product';
import Order from './Components/Order';
import Damaged from './Components/Damaged';
import Invoice from './Components/Invoice';
import Orders from './Components/Orders';
import InvoiceI from './Components/InvoiceI';
// import axios from 'axios';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <NavBar/>
    <Routes>
      <Route path="/" element={<App />}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register />}/>
      <Route path="/logout" element={<LogOut/>}/>
      <Route path="/category" element={<Category />}/>
      <Route path="/units" element={<Units/>}/>
      <Route path="/inventory" element={<Products />}/>
      <Route path="/product" element={<Product/> }/>
      <Route path="/order" element={<Order/>}/>
      <Route path="/damaged" element={<Damaged />}/>
      <Route path="/invoice" element={<Invoice/>}/>
      <Route path="/orders" element={<Orders/>}/>
      <Route path="/invoicei" element={<InvoiceI />}/>
    </Routes>
    <br/>
    <br/>
   
    <Footer/>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
