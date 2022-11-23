import axios from 'axios';
import { useEffect, useState } from 'react';

const Orders = () => {
    const [orders,setOrder] = useState([]);

    useEffect(() => {
        axios.get('https://inventorymanagement2.herokuapp.com/api/orders').then((response) =>{
            setOrder(response.data);
        })
    });

    return (
        <div>
            {orders.map((order) => <table id={order._id+"-tab"} class="d-flex justify-content-center mt-2">
                <tr class="d-flex justify-content-center mt-2">
            <tbody>
                <tr class="card text-center" style={{width:"280px"}}>
                <tr class="card-header">Order</tr>
                <tr class="card-body">
                <tr class="input-group flex-wrap" style={{width:"200px"}}>
                    <span class="input-group-text" id="addon-wrapping"><i class="fas fa-user"></i></span>
                    <input type="text" class="form-control" aria-label="Username" aria-describedby="addon-wrapping" value={order.Cname}/>
                </tr>
                <br/>
                Date : {order.Date}
                    <table class="table align-middle mb-0 bg-white w-25 mt-2 rounded-5 w-25">
                        <thead>
                            <tr>
                            <td>Product</td>
                            <td>Qty</td>
                            <td>Cost</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                order.Products.map((item)=>
                                    <tr>
                                        <td>{item.pname}</td>
                                        <td>{item.qty}</td>
                                        <td>{item.tc}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </tr>
                <tr class="card-footer text-muted" style={{display:"flex",justifyContent: "space-between",alignItems: "center"}}>Total Cost : {order.tc} <button type="button" className="btn btn-primary btn-floating ms-5" id={order._id+"-but"}>
                <i className="fas fa-download"></i>
              </button>

              <script>
                {`
                  $('#${order._id+"-but"}').click(function () {

                    var table = tableToJson($('#${order._id+"-tab"}').get(0))
                    var doc = new jsPDF('p','pt', 'a4', true);
                    doc.cellInitialize();
                    $.each(table, function (i, row){
                        console.debug(row);
                        $.each(row, function (j, cell){
                            doc.cell(10, 50,120, 50, cell, i);  // 2nd parameter=top margin,1st=left margin 3rd=row cell width 4th=Row height
                        })
                    })
            
            
                    doc.save('sample-file.pdf');
                });
                `}
              </script>
                </tr>
                </tr>
            </tbody>
           
        </tr></table>
            )}
        </div>
    )
}

export default Orders;
