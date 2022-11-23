import React from "react";
import axios from "axios";
import {Link} from 'react-router-dom';



const Category = () => {
    var [count,setCount] = React.useState(0);
    const [status,setStatus] = React.useState([]);

    React.useEffect(() => {
        if(count == 0){
            axios.get('https://inventorymanagement2.herokuapp.com/api/categories').then((res) => {
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
            url: `https://inventorymanagement2.herokuapp.com/api/categories/add`,
            params: {
                cname: uname,
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
            if(status[i].cname.toLowerCase() == search_value){
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
            <div className="containerm my-2 p-3">
                <div>
                <div className="ui animated button mini mb-3" tabIndex="0">
                <div className="visible content ">back</div>
                <div className="hidden content">
                    <Link to="/"><i className="left arrow icon"></i></Link>
                </div>
                </div>
                <br/>
                <h2 className="uh my-3"><img src="https://cdn-icons-png.flaticon.com/512/3306/3306049.png" className="me-1" style={{height:"35px"}}/> Category</h2>
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
                    Add Category
                    </button>
            <button className="btn btn-success ms-2" onClick={removeSearch}>Clear search</button>
            {/*  */}
                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel"><img src="https://cdn-icons-png.flaticon.com/512/3306/3306049.png" className="me-2" style={{height:"35px"}}/> 
                             Add Category</h5>
                            <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmitAdd}>
                            <div className="form-outline b-1 mb-2">
                            <input type="text" id="unamea" className="form-control" name="unamea" />
                            <label className="form-label" for="form12">Category Name</label>
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
                        <th>Status</th>
                        <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody style={{textAlign:"center"}}>
                    {
                            status.map((unit,i) => 
                            <tr key={i}>
                                  <td style={{padding:"5px"}}>{i+1}.</td>
                                  <td style={{padding:"5px"}}>{unit.cname}</td>
                                  <td style={{padding:"5px"}}>{String(unit.is_active)}</td>
                                  <td style={{padding:"5px"}}>
                                      <button className="btn btn-secondary my-1" data-mdb-toggle="modal" data-mdb-target={"#" + unit.cname +"1"}>
                                      <i className="far fa-edit"></i>
                                      </button>

                                      <div className="modal fade" id={unit.cname+"1"} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel"><img src="https://cdn-icons-png.flaticon.com/512/3306/3306049.png" className="me-2" style={{height:"35px"}}/> 
                                            Edit Category : {unit.cname}</h5>
                                            <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <form onSubmit={(e) => {
                                                e.preventDefault();
                                                var cname = e.target.uname.value;
                                                var is_active = e.target.is_active.value;
                                                
                                                axios({
                                                    headers: { 
                                                        'content-type': 'application/json'
                                                    },
                                                    method: 'post',
                                                    url: `https://inventorymanagement2.herokuapp.com/api/categorie/${cname}/update`,
                                                    params: {
                                                        uname: cname,
                                                        is_active: is_active
                                                    }
                                                })
                                                .then((response) => {
                                                    window.location.reload();
                                                })
                                                .catch((error) => error);

                                            }} >
                                            <div className="form-outline b-1 mb-2">
                                            <input type="text" id="uname" className="form-control" name="uname" value={unit.cname}/>
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
                                         
                          
                                      <button className="btn btn-danger my-1" data-mdb-toggle="modal" data-mdb-target={"#" + unit.cname +"2"}>
                                          <i className="far fa-trash-alt"></i>
                                      </button>
                                      <div className="modal fade" id={unit.cname+"2"} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel"><img src="https://cdn-icons-png.flaticon.com/512/3306/3306049.png" className="me-2" style={{height:"35px"}}/> 
                                            Delete Category : {unit.cname}</h5>
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
                                                    url: `https://inventorymanagement2.herokuapp.com/api/categorie/${uname}/delete`,
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
                                            
                                            <input type="text" id="uname" className="form-control" name="uname" value={unit.cname} style={{display: 'none'}}/>
                                            </div>
                                            <p>Are you sure to delete {unit.cname}</p>
                                            
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
            <h2 className="uh my-3"><img src="https://cdn-icons-png.flaticon.com/512/3306/3306049.png" className="me-1" style={{height:"35px"}}/> Category</h2>
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
                Add Category
                </button>
        
        {/*  */}
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel"><img src="https://cdn-icons-png.flaticon.com/512/3306/3306049.png" className="me-2" style={{height:"35px"}}/> 
                         Add Category</h5>
                        <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmitAdd}>
                        <div className="form-outline b-1 mb-2">
                        <input type="text" id="unamea" className="form-control" name="unamea" />
                        <label className="form-label" for="form12">Category Name</label>
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
                    <th>Status</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody style={{textAlign:"center"}}>
                {
                        status.map((unit,i) => 
                        <tr key={i}>
                              <td style={{padding:"5px"}}>{i+1}.</td>
                              <td style={{padding:"5px"}}>{unit.cname}</td>
                              <td style={{padding:"5px"}}>{String(unit.is_active)}</td>
                              <td style={{padding:"5px"}}>
                                  <button className="btn btn-secondary my-1" data-mdb-toggle="modal" data-mdb-target={"#" + unit.cname +"1"}>
                                  <i className="far fa-edit"></i>
                                  </button>

                                  <div className="modal fade" id={unit.cname+"1"} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel"><img src="https://cdn-icons-png.flaticon.com/512/3306/3306049.png" className="me-2" style={{height:"35px"}}/> 
                                        Edit Category : {unit.cname}</h5>
                                        <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <form onSubmit={(e) => {
                                            e.preventDefault();
                                            var cname = e.target.uname.value;
                                            var is_active = e.target.is_active.value;
                                            
                                            axios({
                                                headers: { 
                                                    'content-type': 'application/json'
                                                },
                                                method: 'post',
                                                url: `https://inventorymanagement2.herokuapp.com/api/categorie/${cname}/update`,
                                                params: {
                                                    uname: cname,
                                                    is_active: is_active
                                                }
                                            })
                                            .then((response) => {
                                                window.location.reload();
                                            })
                                            .catch((error) => error);

                                        }} >
                                        <div className="form-outline b-1 mb-2">
                                        <input type="text" id="uname" className="form-control" name="uname" value={unit.cname}/>
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
                                     
                      
                                  <button className="btn btn-danger my-1" data-mdb-toggle="modal" data-mdb-target={"#" + unit.cname +"2"}>
                                      <i className="far fa-trash-alt"></i>
                                  </button>
                                  <div className="modal fade" id={unit.cname+"2"} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel"><img src="https://cdn-icons-png.flaticon.com/512/3306/3306049.png" className="me-2" style={{height:"35px"}}/> 
                                        Delete Category : {unit.cname}</h5>
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
                                                url: `https://inventorymanagement2.herokuapp.com/api/categorie/${uname}/delete`,
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
                                        
                                        <input type="text" id="uname" className="form-control" name="uname" value={unit.cname} style={{display: 'none'}}/>
                                        </div>
                                        <p>Are you sure to delete {unit.cname}</p>
                                        
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

export default Category;