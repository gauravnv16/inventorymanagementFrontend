import axios from 'axios';
import { useEffect, useState } from 'react';

const Damaged = () => {
    const [products,setProducts] = useState([]);

    useEffect(() => {
        axios.get('https://inventorymanagement2.herokuapp.com/api/damaged').then((response) =>{
            setProducts(response.data);
        })
    });

    return <div className="mt-3 d-flex justify-content-center align-items-center p-4" style={{flexDirection: 'column'}}>
            {
                products.map((product) =><div><h6 className='d-flex align-items-center ms-2'>{product.ON}<button type="button" className="btn btn-primary btn-floating ms-2">
                <i className="fas fa-download"></i>
              </button></h6>            <table className="table table-bordered w-25 mb-3" style={{textAlign: 'center'}}>
                <thead>
                    <tr>
                        <td>Vcode</td>
                        <td>Pname</td>
                        <td>type</td>
                        <td>Qty</td>
                    </tr>
                </thead>
                <tbody>
        {
            products.map((product1) =>{
                if(product1.ON != product.ON){
                    return <tr>
                    <td style={{padding:"1px"}}>{product1.vendor_code}</td>
                    <td style={{padding:"1px"}}>{product1.pname}</td>
                    <td style={{padding:"1px"}}>{product1.damage_type}</td>
                    <td style={{padding:"1px"}}>{product1.qty}</td>
                </tr>
                }
            })
        }
        </tbody>
        </table></div>)
            }

    </div>
}

export default Damaged;