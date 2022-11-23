import React from "react";
import axios from "axios";
import {Link} from 'react-router-dom';



const Units = () => {
    var [count,setCount] = React.useState(0);
    const [status,setStatus] = React.useState([]);

    React.useEffect(() => {
        if(count == 0){
            axios.get('https://inventorymanagement2.herokuapp.com/api/units').then((res) => {
                setStatus(res.data);
            });
        }
    });

    const handleSubmitAdd = (e) =>{
        e.preventDefault();

        var uname = document.getElementById('unamea').value;
        var is_active = document.getElementById('is_activea').value
        const request = axios({
            headers: { 
                'content-type': 'application/json'
            },
            method: 'post',
            url: `https://inventorymanagement2.herokuapp.com/api/units/add`,
            params: {
                uname: uname,
                is_active: is_active
            }
        })
        .then((response) => {
            window.location.reload();
        })
        .catch((error) => error);
    }

  var removeSearch = () => {
    setCount(0);
  }

  const search = () => {
        var search_value = document.getElementById('search').value.toLowerCase();
        
        for(var i = 0;i<status.length;i++){
            if(status[i].uname.toLowerCase() == search_value){
                setCount(1);
                setStatus((status) => {
                    return [status[i]];
                } );
                break;
            }
        }
  }


    if(count == 1){
        return(
            <div className="containerm my-2 p-4">
                <div>
                <div className="ui animated button mini mb-3" tabIndex="0">
                <div className="visible content ">back</div>
                <div className="hidden content">
                    <Link to="/"><i className="left arrow icon"></i></Link>
                </div>
                </div>
                <br/>
                <h2 className="uh my-3"><img src="https://cdn-icons.flaticon.com/png/512/913/premium/913458.png?token=exp=1659680251~hmac=dbd5f25d95b7dc6950590642fe240af2" className="me-1" style={{height:"35px"}}/> Units</h2>
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
                    Add New Units
                    </button>
            <button className="btn btn-success ms-2" onClick={removeSearch}>Clear search</button>
            {/*  */}
                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel"><img src="https://cdn-icons.flaticon.com/png/512/913/premium/913458.png?token=exp=1659680251~hmac=dbd5f25d95b7dc6950590642fe240af2" className="me-2" style={{height:"35px"}}/> 
                             Add unit</h5>
                            <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmitAdd}>
                            <div className="form-outline b-1 mb-2">
                            <input type="text" id="unamea" className="form-control" name="unamea" />
                            <label className="form-label" for="form12">Unit Name</label>
                            </div>
                               
                                is_Active: <br></br>
                                <select className="ui selection dropdown my-3 pb-2" style={{width:"50px"}} name="is_activea" id="is_activea">
                                    <option value="true">True</option>
                                    <option value="false">False</option>
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
                        <th>Status</th>
                        <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        status.map((unit,i) => 
                            <tr key={i}>
                                  <td>{i+1}.</td>
                                  <td>{unit.uname}</td>
                                  <td>{String(unit.is_active)}</td>
                                  <td>
                                      <button className="btn btn-secondary my-1" data-mdb-toggle="modal" data-mdb-target={"#" + unit.uname +"1"}>
                                      <i className="far fa-edit"></i>
                                      </button>

                                      <div className="modal fade" id={unit.uname+"1"} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel"><img src="https://cdn-icons.flaticon.com/png/512/913/premium/913458.png?token=exp=1659680251~hmac=dbd5f25d95b7dc6950590642fe240af2" className="me-2" style={{height:"35px"}}/> 
                                            Edit unit : {unit.uname}</h5>
                                            <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <form onSubmit={(e) => {
                                                e.preventDefault();
                                                var uname = e.target.uname.value;
                                                var is_active = e.target.is_active.value;
                                                
                                                axios({
                                                    headers: { 
                                                        'content-type': 'application/json'
                                                    },
                                                    method: 'post',
                                                    url: `https://inventorymanagement2.herokuapp.com/api/unit/${uname}/update`,
                                                    params: {
                                                        uname: uname,
                                                        is_active: is_active
                                                    }
                                                })
                                                .then((response) => {
                                                    window.location.reload();
                                                })
                                                .catch((error) => error);

                                            }} >
                                            <div className="form-outline b-1 mb-2">
                                            <input type="text" id="uname" className="form-control" name="uname" value={unit.uname}/>
                                            </div>
                                            
                                                is_Active: <br></br>
                                                <select className="ui selection dropdown my-3 pb-2" style={{width:"50px"}} name="is_active" id="is_active">
                                                    <option value={String(unit.is_active)}>{String(unit.is_active)}</option>
                                                    <option value="true">true</option>
                                                    <option value="false">false</option>
                                                </select>
                                            
                                                <button className="btn btn-success btn-floating float-end mt-5 me-1"><i class="fas fa-check"></i></button>
                                            </form>
                                        </div>
                                        
                                        </div>
                                    </div>
                                    </div>
                                         
                          
                                      <button className="btn btn-danger my-1" data-mdb-toggle="modal" data-mdb-target={"#" + unit.uname +"2"}>
                                          <i className="far fa-trash-alt"></i>
                                      </button>
                                      <div className="modal fade" id={unit.uname+"2"} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel"><img src="https://cdn-icons.flaticon.com/png/512/913/premium/913458.png?token=exp=1659680251~hmac=dbd5f25d95b7dc6950590642fe240af2" className="me-2" style={{height:"35px"}}/> 
                                            Delete unit : {unit.uname}</h5>
                                            <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <form onSubmit={(e) => {
                                                e.preventDefault();
                                                var uname = e.target.uname.value;
                                                
                                                axios({
                                                    headers: { 
                                                        'content-type': 'application/json'
                                                    },
                                                    method: 'get',
                                                    url: `https://inventorymanagement2.herokuapp.com/api/unit/${uname}/delete`,
                                                    params: {
                                                        uname: uname,
                                                    }
                                                })
                                                .then((response) => {
                                                    window.location.reload();
                                                })
                                                .catch((error) => error);

                                            }} >
                                            <div className="form-outline b-1 mb-2">
                                            
                                            <input type="text" id="uname" className="form-control" name="uname" value={unit.uname} style={{display: 'none'}}/>
                                            </div>
                                            <p>Are you sure to delete {unit.uname}</p>
                                            
                                                <button className="btn btn-danger btn-floating float-end mt-5 me-1"><i className="far fa-trash-alt"></i></button>
                                            </form>
                                        </div>
                                        
                                        </div>
                                    </div>
                                    </div>

                                  </td>
                              </tr>
                            )
                    }
                    </tbody>
                </table>
                </div>
                
            </div>
        )
    }
    else{
        return(
            <div className="containerm my-2 p-3">
                <div>
                <div className="ui animated button mini mb-3" tabIndex="0">
                <div className="visible content ">back</div>
                <div className="hidden content">
                    <Link to="/"><i className="left arrow icon"></i></Link>
                </div>
                </div>
                <br/>
                <h2 className="uh my-3"><img src="https://cdn-icons.flaticon.com/png/512/913/premium/913458.png?token=exp=1659680251~hmac=dbd5f25d95b7dc6950590642fe240af2" className="me-1" style={{height:"35px"}}/> Units</h2>
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
                    Add New Units
                    </button>
                    
                    <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel"><img src="https://cdn-icons.flaticon.com/png/512/913/premium/913458.png?token=exp=1659680251~hmac=dbd5f25d95b7dc6950590642fe240af2" className="me-2" style={{height:"35px"}}/> 
                             Add unit</h5>
                            <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmitAdd}>
                            <div className="form-outline b-1 mb-2">
                            <input type="text" id="unamea" className="form-control" name="unamea" />
                            <label className="form-label" for="form12">Unit Name</label>
                            </div>
                               
                                is_Active: <br></br>
                                <select className="ui selection dropdown my-3 pb-2" style={{width:"50px"}} name="is_activea" id="is_activea">
                                    <option value="true">True</option>
                                    <option value="false">False</option>
                                </select>
                               
                                <button className="btn btn-primary btn-floating float-end mt-5 me-1"><i className="fas fa-plus"></i></button>
                            </form>
                        </div>
                        
                        </div>
                    </div>
                    </div>
                    
                    <br/>
                    <table className="table  align-middle mb-0 bg-white w-50 mt-4 shadow-2-strong rounded-5">
                    <thead>
                        <tr>
                        <th>S.no</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                            status.map((unit,i) => 
                            <tr key={i}>
                                  <td>{i+1}.</td>
                                  <td>{unit.uname}</td>
                                  <td>{String(unit.is_active)}</td>
                                  <td>
                                      <button className="btn btn-secondary my-1" data-mdb-toggle="modal" data-mdb-target={"#" + unit.uname +"1"}>
                                      <i className="far fa-edit"></i>
                                      </button>

                                      <div className="modal fade" id={unit.uname+"1"} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel"><img src="https://cdn-icons.flaticon.com/png/512/913/premium/913458.png?token=exp=1659680251~hmac=dbd5f25d95b7dc6950590642fe240af2" className="me-2" style={{height:"35px"}}/> 
                                            Edit unit : {unit.uname}</h5>
                                            <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <form onSubmit={(e) => {
                                                e.preventDefault();
                                                var uname = e.target.uname.value;
                                                var is_active = e.target.is_active.value;
                                                
                                                axios({
                                                    headers: { 
                                                        'content-type': 'application/json'
                                                    },
                                                    method: 'post',
                                                    url: `https://inventorymanagement2.herokuapp.com/api/unit/${uname}/update`,
                                                    params: {
                                                        uname: uname,
                                                        is_active: is_active
                                                    }
                                                })
                                                .then((response) => {
                                                    window.location.reload();
                                                })
                                                .catch((error) => error);

                                            }} >
                                            <div className="form-outline b-1 mb-2">
                                            <input type="text" id="uname" className="form-control" name="uname" value={unit.uname}/>
                                            </div>
                                            
                                                is_Active: <br></br>
                                                <select className="ui selection dropdown my-3 pb-2" style={{width:"50px"}} name="is_active" id="is_active">
                                                    <option value={String(unit.is_active)}>{String(unit.is_active)}</option>
                                                    <option value="true">true</option>
                                                    <option value="false">false</option>
                                                </select>
                                            
                                                <button className="btn btn-success btn-floating float-end mt-5 me-1"><i class="fas fa-check"></i></button>
                                            </form>
                                        </div>
                                        
                                        </div>
                                    </div>
                                    </div>
                                         
                          
                                      <button className="btn btn-danger my-1" data-mdb-toggle="modal" data-mdb-target={"#" + unit.uname +"2"}>
                                          <i className="far fa-trash-alt"></i>
                                      </button>
                                      <div className="modal fade" id={unit.uname+"2"} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel"><img src="https://cdn-icons.flaticon.com/png/512/913/premium/913458.png?token=exp=1659680251~hmac=dbd5f25d95b7dc6950590642fe240af2" className="me-2" style={{height:"35px"}}/> 
                                            Delete unit : {unit.uname}</h5>
                                            <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <form onSubmit={(e) => {
                                                e.preventDefault();
                                                var uname = e.target.uname.value;
                                                
                                                axios({
                                                    headers: { 
                                                        'content-type': 'application/json'
                                                    },
                                                    method: 'get',
                                                    url: `https://inventorymanagement2.herokuapp.com/api/unit/${uname}/delete`,
                                                    params: {
                                                        uname: uname,
                                                    }
                                                })
                                                .then((response) => {
                                                    window.location.reload();
                                                })
                                                .catch((error) => error);

                                            }} >
                                            <div className="form-outline b-1 mb-2">
                                            
                                            <input type="text" id="uname" className="form-control" name="uname" value={unit.uname} style={{display: 'none'}}/>
                                            </div>
                                            <p>Are you sure to delete {unit.uname}</p>
                                            
                                                <button className="btn btn-danger btn-floating float-end mt-5 me-1"><i className="far fa-trash-alt"></i></button>
                                            </form>
                                        </div>
                                        
                                        </div>
                                    </div>
                                    </div>

                                  </td>
                              </tr>
                            )
                    }
                    </tbody>
                </table>
                </div>
                
            </div>
        )
    }
}

export default Units;