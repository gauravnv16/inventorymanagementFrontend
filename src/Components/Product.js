import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Product = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state.data;
    const [products,setProducts] = useState([]);
    const [units,setUnits] = useState([]);
    const [category,setCategory] = useState([]);

    useEffect(() => {
            axios.get('https://inventorymanagement2.herokuapp.com/api/inventory').then((response) =>{
                setProducts(response.data);
            });

            axios.get('https://inventorymanagement2.herokuapp.com/api/categories').then((res) => {
                setCategory(res.data);
            });

            axios.get('https://inventorymanagement2.herokuapp.com/api/units').then((res) => {
                setUnits(res.data);
            });
    });

    const handleSubmitUpdate = (e) =>{
        e.preventDefault();
        var id = data._id;
        var vcode = e.target.vcode.value;
        var pname = e.target.pname.value;
        var uname = e.target.uname.value;
        var cname = e.target.cname.value;
        var qty = Number(e.target.qty.value);
        var ppi = Number(e.target.ppi.value);
        var tc = qty * ppi;
        var curr = e.target.curr.value;
        var exp_date = e.target.exp_date.value;

        const request = axios({
            headers: { 
                'content-type': 'application/json'
            },
            method: 'post',
            url: `https://inventorymanagement2.herokuapp.com/api/inventory/${id}/update`,
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
            navigate('/inventory');
            window.location.reload();
        })
    }

    return (
           <div style={{display:"flex",justifyContent: "center"}}>
             <div className="p-4" style={{width:"370px"}}>
                <div className="ui animated button mini mb-3" tabIndex="0">
                <div className="visible content ">back</div>
                <div className="hidden content">
                    <Link to="/inventory"><i className="left arrow icon"></i></Link>
                </div>
                </div>
                <div className="card text-center ">
                <div className="card-header">Product Details</div>
                <div className="card-body">
                    <h5 className="card-title">{data.pname}</h5>
                    <p>Vendor Code : {data.vendor_code}</p>
                    <p>Exp Date : {data.exp_date}</p>
                    <table className="table table-bordered my-3"> 
                        <thead>
                            <tr>
                                <td>Qty</td>
                                <td>PPi</td>
                                <td>Tc</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{data.qty}</td>
                                <td>{data.ppi}</td>
                                <td>{data.tc}</td>
                            </tr>
                        </tbody>
                    </table>
                    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>


                    <button className="btn btn-success mx-2" data-mdb-toggle="modal" data-mdb-target={"#" + data.pname + "1"}><i className="far fa-edit"></i></button>

                    <div className="modal fade" id={data.pname + "1"} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel"><img src="https://cdn-icons.flaticon.com/png/512/4862/premium/4862425.png?token=exp=1659787988~hmac=3e9e6aa2ac5c849df7541b923dd7834d" className="me-2" style={{height:"35px"}}/> 
                            Edit</h5>
                            <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <form onSubmit={handleSubmitUpdate}>

                            <div className="form-outline b-1 mb-2">
                            <input type="text" id="vcode" className="form-control" name="vcode" defaultValue={data.vendor_code}/>
                            </div>
                            
                            <div className="form-outline b-1 mb-2">
                            <input type="text" id="pname" className="form-control" name="pname" defaultValue={data.pname}/>
                        
                            </div>
                            
                            <select className="p-2 my-3 mx-2" style={{width:"200px",border:"1px solid #ddd"}} name="cname" id="cname">
                                <option defaultValue={data.category}>{data.category}</option>
                                {
                                    category.map((item,i) => 
                                        <option key={i} value={item.cname}>{item.cname}</option>
                                    )
                                }  
                            </select>

                            <select className="p-2 my-3 mx-2" style={{width:"200px",border:"1px solid #ddd"}} name="uname" id="uname">
                                <option defaultValue={data.unit}>{data.unit}</option>
                                {
                                    units.map((item,i) => 
                                        <option key={i} value={item.uname}>{item.uname}</option>
                                    )
                                }  
                            </select>
                            
                            <div className="form-outline b-1 mb-2">
                            <input type="text" id="qty" className="form-control" name="qty" defaultValue={data.qty}/>
                            </div>
                            
                            <div className="form-outline b-1 mb-2">
                            <input type="text" id="curr" className="form-control" name="curr" defaultValue={data.currency}/>
                            </div>

                            <div className="form-outline b-1 mb-2">
                            <input type="text" id="ppi" className="form-control" name="ppi" defaultValue={data.ppi}/>
                            </div>

                            <div className="form-outline b-1 mb-2">
                            <input type="text" id="exp_date" className="form-control" name="exp_date" defaultValue={data.exp_date}/>
                            </div>

                                <button className="btn btn-success btn-floating float-end mt-5 me-1"><i className="fas fa-check"></i></button>
                                
                            </form>


                        </div>
                        
                        </div>
                    </div>
                    </div>



                    <button className="btn btn-danger" data-mdb-toggle="modal" data-mdb-target={"#" + data.pname + "2"}><i className="far fa-trash-alt"></i></button>

                    <div className="modal fade" id={data.pname + "2"} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel"><img src="https://cdn-icons-png.flaticon.com/512/3306/3306049.png" className="me-2" style={{height:"35px"}}/> 
                                            Delete Category : {data.pname}</h5>
                                            <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <form onSubmit={(e) => {
                                                e.preventDefault();
                                                var uname = data._id;
                                                
                                                axios({
                                                    headers: { 
                                                        'content-type': 'application/json'
                                                    },
                                                    method: 'get',
                                                    url: `https://inventorymanagement2.herokuapp.com/api/inventory/${uname}/delete`,
                                                    params: {
                                                        id: uname,
                                                    }
                                                })
                                                .then((response) => {
                                                    navigate('/inventory');
                                                    window.location.reload();
                                                })
                                                .catch((error) => error);

                                            }} >
                                            <div className="form-outline b-1 mb-2">
                                            </div>
                                            <p>Are you sure to delete {data.pname}</p>
                                            
                                                <button className="btn btn-danger btn-floating float-end mt-5 me-1"><i className="far fa-trash-alt"></i></button>
                                            </form>
                                        </div>
                                        
                                        </div>
                                    </div>
                                    </div>
                </div>
                
                
                <div className="card-footer text-muted">
                <img alt='Barcode Generator TEC-IT' className="w-75"
                src={"https://barcode.tec-it.com/barcode.ashx?data=" + data._id + "&code=Code128&translate-esc=on}"}/>
                </div>
                </div>
            </div>
           </div>
    );
}

export default Product;