import axios from 'axios';
import { useEffect, useState } from 'react';


const Order = () => {
    const [products,setProducts] = useState([]);
    const [oitems,setOitems] = useState([]);
    const [amount,setAmount] = useState(0);
    useEffect(() => {
            axios.get('https://inventorymanagement2.herokuapp.com/api/inventory').then((response) =>{
                setProducts(response.data);
            });
        
    });

    const addItem = () => {
        var pname = document.getElementById('pname').value;
        var qty = document.getElementById('qty').value;
        var count = 0;
        if(oitems.length != undefined) {
            let s = 0;
            for(var i = 0;i<oitems.length;i++){
                if(oitems[i].pname == pname){
                    count ++;
                    oitems[i].qty = qty;
                    oitems[i].tc = qty*oitems[i].ppi;
                }
                s=s+oitems[i].tc;
            }
            setAmount(s);
        }
        if(count == 0){
            for(var i = 0;i<products.length;i++){
                if(products[i].pname == pname){
                    var tc = Number(qty)*products[i].ppi;
                    var ppi = products[i].ppi;
                    setOitems(oitems => [...oitems,{pname:pname, qty:qty, tc:tc,ppi:ppi}]);
                    setAmount(amount => amount+tc);
                }
            }
        }
    }

    const OrderHandler = (e) => {
        e.preventDefault();
        var uname = document.getElementById('uname').value;
        var c = amount;
        var Ostring = uname+","+c;
        for (var i =0;i<oitems.length;i++){
            var s = ","+oitems[i].pname+"_"+oitems[i].qty+"_"+oitems[i].tc;
            Ostring += s;
        }

        axios({
            headers: { 
                'content-type': 'application/json'
            },
            method: 'post',
            url: `https://inventorymanagement2.herokuapp.com/api/orders/create`,
            params: {
                "OS":Ostring
            }
        })
        .then((response) => {
            window.location.reload();
        })
        .catch((error) => error);
        console.log(Ostring);
    }

    return(
        <div class="d-flex justify-content-center mt-2 ms-2">
            <div >
                <div class="card text-center" style={{width:"280px"}}>
                <div class="card-header">Order</div>
                <div class="card-body">
                <div class="input-group flex-wrap" style={{width:"200px"}}>
                    <span class="input-group-text" id="addon-wrapping"><i class="fas fa-user"></i></span>
                    <input type="text" class="form-control" name="uname" id="uname" placeholder="Name.." aria-label="Username" aria-describedby="addon-wrapping" />
                </div>
                <br/>
                <select class="p-2 me-2" name="pname" id="pname" style={{width:"120px",border:"1px solid #ddd"}}>
                    {
                        products.map((item,key) => <option key={key} value={item.pname}>{item.pname}</option>)
                    }
                </select>

                <input type="text" class="form-control w-25 me-2" placeholder="qty" aria-label="Username" id="qty" name="qty" aria-describedby="addon-wrapping" style={{display:"inline"}}/>

                <button type="button" class="btn btn-primary btn-floating" onClick={addItem}>
                    <i class="fas fa-plus"></i>
                </button>
                    <table class="table align-middle mb-0 bg-white w-25 mt-4  rounded-5 w-25">
                        <thead>
                            <tr>
                            <td>Product</td>
                            <td>Qty</td>
                            <td>Cost</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                oitems.map((item)=>
                                    <tr>
                                        <td>{item.pname}</td>
                                        <td>{item.qty}</td>
                                        <td>{item.tc}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
                <div class="card-footer text-muted">Total Cost : {amount}
                <form onSubmit={OrderHandler}>
                    {
                        oitems.map((item,key)=>
                        <span style={{display: 'none'}}>
                        <input type="text" name={key} id={key} value={item.pname+"_"+item.qty+'_'+item.tc}/>
                        </span>
                        )
                    }   
                    <button class="btn btn-success mt-2 ms-2">place order</button>    
                </form> </div>
                </div>
               
                
            </div>
           
        </div>
    )
}

export default Order;