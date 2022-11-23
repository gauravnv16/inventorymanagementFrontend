import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom'
const Products = () => {
    const [products,setProducts] = useState([]);
    const [units,setUnits] = useState([]);
    const [category,setCategory] = useState([]);
    const [count,setCount] = useState(0);

    useEffect(() => {
        if(count == 0){
            axios.get('https://inventorymanagement2.herokuapp.com/api/inventory').then((response) =>{
                setProducts(response.data);
            });

            axios.get('https://inventorymanagement2.herokuapp.com/api/categories').then((res) => {
                setCategory(res.data);
            });

            axios.get('https://inventorymanagement2.herokuapp.com/api/units').then((res) => {
                setUnits(res.data);
            });
        }
    });

    const handleSubmitAdd = (e) =>{
        e.preventDefault();

        var vcode = e.target.vcode.value;
        var pname = e.target.pname.value;
        var uname = e.target.uname.value;
        var cname = e.target.cname.value;
        var qty = Number(e.target.qty.value);
        var ppi = Number(e.target.ppi.value);
        var tc = qty * ppi;
        var curr = e.target.curr.value;
        var exp_date = e.target.exp_date.value;

        axios({
            headers: { 
                'content-type': 'application/json'
            },
            method: 'post',
            url: `https://inventorymanagement2.herokuapp.com/api/inventory/add`,
            params: {
                "vcode": vcode,
                "pname": pname,
                "uname": uname,
                "cname": cname,
                "qty": qty,
                "ppi": ppi,
                "tc": tc,
                "curr": curr,
                "exp_date": exp_date,
            }
        })
        .then((response) => {
            window.location.reload();
        })
        .catch((error) => error);
    }

    const search = () => {
            var search_value = document.getElementById('search').value.toLowerCase();
            for(var i = 0;i<products.length;i++){
                if(products[i].pname.toLowerCase() == search_value){
                    setCount(1);
                    setProducts((products) => {
                        return [products[i]];
                    } );
                    break;
                }
            }
    }

    const removeSearch = () => {
        setCount(0);
    }


    if(count == 1){
        return(<div className="containerm my-2 p-3">
        <div>
        <div className="ui animated button mini mb-3" tabIndex="0">
        <div className="visible content ">back</div>
        <div className="hidden content">
            <Link to="/"><i className="left arrow icon"></i></Link>
        </div>
        </div>
        <br/>
        <h2 className="uh my-3"><img src="https://cdn-icons.flaticon.com/png/512/4862/premium/4862425.png?token=exp=1659787988~hmac=3e9e6aa2ac5c849df7541b923dd7834d" className="me-1" style={{height:"35px"}}/> Inventory</h2>
            <br/>
            <div className="input-group">
            <div className="form">
                <input type="search" id="search" className="form-control" placeholder="Search.."/>
            </div>
            <button type="button" className="btn btn-primary">
                <i className="fas fa-search" onClick={search}></i>
            </button>
            </div>

            <br/>

            <button type="button" className="btn btn-primary" data-mdb-toggle="modal" data-mdb-target="#exampleModal">
            Add Inventory
            </button>
            <Link to="/damaged" className='btn btn-dark mx-2'> k
            </Link>
    <button className="btn btn-success my-2" onClick={removeSearch}>Clear search</button>
    {/*  */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel"><img src="https://cdn-icons.flaticon.com/png/512/4862/premium/4862425.png?token=exp=1659787988~hmac=3e9e6aa2ac5c849df7541b923dd7834d" className="me-2" style={{height:"35px"}}/> 
                     Add Inventory</h5>
                    <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <form onSubmit={handleSubmitAdd}>
                    <div className="form-outline b-1 mb-2">
                    <input type="text" id="unamea" className="form-control" name="unamea" />
                    <label className="form-label" for="form12">Inventory Name</label>
                    </div>
                       
                        is_Active: <br></br>
                        <select className="ui selection dropdown my-3 pb-2" style={{width:"50px"}} name="is_activea" id="is_activea">
                            <option value="true">true</option>
                            <option value="false">false</option>
                        </select>
                       
                        <button className="btn btn-primary btn-floating float-end mt-5 me-1"><i className="fas fa-plus"></i></button>
                    </form>
                </div>
                
                </div>
            </div>
            </div>
            {/*  */}
            <br/>
            <table className="table  align-middle mb-0 bg-white w-50 mt-4 shadow-2-strong rounded-5">
            <thead>
                <tr>
                <th>S.no</th>
                <th>Name</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody style={{textAlign:"center"}}>
            {
                   products.map((product,i) => 
                   <tr key={i}>
                    <td>{i+1}</td>
                    <td>{product.pname}</td>
                    <td>
                    <Link to="/product" state={{data:product}}>
                        <button  className="btn btn-success">
                            more
                        </button>
                    </Link>
                    </td>
                    </tr>
                   )
            }
            </tbody>
        </table>
        </div>
        
    </div>)
    }
    else{
        return(<div className="containerm my-2 p-3">
        <div>
        <div className="ui animated button mini mb-3" tabIndex="0">
        <div className="visible content ">back</div>
        <div className="hidden content">
            <Link to="/"><i className="left arrow icon"></i></Link>
        </div>
        </div>
        <br/>
        <h2 className="uh my-3"><img src="https://cdn-icons.flaticon.com/png/512/4862/premium/4862425.png?token=exp=1659787988~hmac=3e9e6aa2ac5c849df7541b923dd7834d" className="me-1" style={{height:"35px"}}/> Inventory</h2>
            <br/>
            <div className="input-group">
            <div className="form">
                <input type="search" id="search" className="form-control" placeholder="Search.."/>
            </div>
            <button type="button" className="btn btn-primary">
                <i className="fas fa-search" onClick={search}></i>
            </button>
            </div>

            <br/>

            <button type="button" className="btn btn-primary" data-mdb-toggle="modal" data-mdb-target="#exampleModal">
            Add Inventory
            </button>
            <Link to="/damaged" className='btn btn-dark mx-2'> <i class="fas fa-house-damage"></i>
            </Link>
    {/*  */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel"><img src="https://cdn-icons.flaticon.com/png/512/4862/premium/4862425.png?token=exp=1659787988~hmac=3e9e6aa2ac5c849df7541b923dd7834d" className="me-2" style={{height:"35px"}}/> 
                     Add Inventory</h5>
                    <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">

                    <form onSubmit={handleSubmitAdd}>

                    <div className="form-outline b-1 mb-2">
                    <input type="text" id="vcode" className="form-control" name="vcode" />
                    <label className="form-label" for="form12">Vendor Code</label>
                    </div>
                    
                    <div className="form-outline b-1 mb-2">
                    <input type="text" id="pname" className="form-control" name="pname" />
                    <label className="form-label" for="form12">Product Name</label>
                    </div>
                    
                    <select className="p-2 my-3 mx-2" style={{width:"200px",border:"1px solid #ddd"}} name="cname" id="cname">
                        <option value="Category">Category</option>
                        {
                            category.map((item,i) => 
                                <option key={i} value={item.cname}>{item.cname}</option>
                            )
                        }  
                    </select>

                    <select className="p-2 my-3 mx-2" style={{width:"200px",border:"1px solid #ddd"}} name="uname" id="uname">
                        <option value="Category">Units</option>
                        {
                            units.map((item,i) => 
                                <option key={i} value={item.uname}>{item.uname}</option>
                            )
                        }  
                    </select>
                    
                    <div className="form-outline b-1 mb-2">
                    <input type="text" id="qty" className="form-control" name="qty" />
                    <label className="form-label" for="form12">Qty</label>
                    </div>
                    
                    <div className="form-outline b-1 mb-2">
                    <input type="text" id="curr" className="form-control" name="curr" />
                    <label className="form-label" for="form12">Currency</label>
                    </div>

                    <div className="form-outline b-1 mb-2">
                    <input type="text" id="ppi" className="form-control" name="ppi" />
                    <label className="form-label" for="form12">PPI</label>
                    </div>

                    <div className="form-outline b-1 mb-2">
                    <input type="date" id="exp_date" className="form-control" name="exp_date" />
                    <label className="form-label" for="form12">Exp Date</label>
                    </div>

                        <button className="btn btn-primary btn-floating float-end mt-5 me-1"><i className="fas fa-plus"></i></button>
                    </form>


                </div>
                
                </div>
            </div>
            </div>
            {/*  */}
            <br/>
            <table className="table  align-middle mb-0 bg-white w-50 mt-4 shadow-2-strong rounded-5">
            <thead>
                <tr>
                <th>S.no</th>
                <th>Name</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody style={{textAlign:"center"}}>
            {
                   products.map((product,i) => 
                   <tr key={i}>
                    <td>{i+1}</td>
                    <td>{product.pname}</td>
                    <td>
                    <Link to="/product" state={{data:product}}>
                        <button  className="btn btn-success">
                            more
                        </button>
                    </Link>
                    </td>
                    </tr>
                   )
            }
            </tbody>
        </table>
        </div>
        
    </div>)
    }
};

export default Products;