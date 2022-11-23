import axios from 'axios';
import { useEffect, useState } from 'react';

const InvoiceI = () => {
    const [products, setProducts] = useState([]);
    const [dates,setDates] = useState([]);
    useEffect(() => {
        axios.get('https://inventorymanagement2.herokuapp.com/api/inventory').then((response) =>{
            setProducts(response.data);
            var p = []
            for(var i = 0;i<products.length;i++){
                p.push(products[i].added_on)
            }
            const uniqueDates = Array.from(new Set(p));
            setDates(uniqueDates);
        })
    })
    
    return(<div className="d-flex justify-content-center mt-3">
    <div >
        {
            dates.map((product)=> {
                return (
                    <>
                    <div >
                    <h6 style={{display:'flex',alignItems:'center'}}>Date : {product}<button type="button" className="btn btn-primary btn-floating ms-5">
                    <i className="fas fa-download"></i>
                    </button></h6></div>
                    <table className="table table-bordered" style={{textAlign: 'center',width:"300px"}}>
                        <thead>
                            <tr>
                                <td>Vcode</td>
                                <td>Name</td>
                                <td>Qty</td>
                                <td>Cost</td>
                            </tr>
                        </thead>
                        <tbody>
                    {
                        products.map((item,i) => {
                            if(item.added_on == product){
                                return(
                                    <tr>
                                    <td style={{padding:"3px"}}>{item.vendor_code}</td>
                                    <td style={{padding:"3px"}}>{item.pname}</td>
                                    <td style={{padding:"3px"}}>{item.qty}</td>
                                    <td style={{padding:"3px"}}>{item.tc}</td>
                                    </tr>
                                )
        
                            }
                        })

                        
                    }
                    </tbody>
                    </table>
                    </>
                )
             
            })
        }
    </div>
    </div>)
}

export default InvoiceI;