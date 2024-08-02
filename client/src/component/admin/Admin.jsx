import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../../context/dataContext/DataContext';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/user/userContext';

export default function Admin() {

    const [users, setusers] = useState([]);
    let {courses}=useContext(DataContext);
    let {token}=useContext(UserContext);

   async function getUsers () {

        let {data}= await axios.get(`${process.env.REACT_APP_prourl}/arena/v1/user`);
        console.log(courses);

        setusers(data.result);
        
    };

    const [deleted, setdeleted] = useState(false)


    async function deleteCourse(tid) {


        setdeleted(false)


        try {
            const response = await axios.delete(`${process.env.REACT_APP_prourl}/arena/v1/course/delete/${tid}`, {
                headers: {
                    'token': token,
                },
            });
            if (response.data.message === "done") {

                setdeleted(true)

            }
        } catch (err) {

            console.log(err);
        }

    }

    if (deleted) {
        console.log("deleted");
    }

    useEffect(() => {

      getUsers();
    

    
   
    },[]);
    


  return <>

<div className="container">
<div className="users">
<table className="table table-dark table-hover">
<thead>
<tr>
<th className="col">ID</th>
<th className="col">Name</th>
<th className="col">email</th>
<th className="col">qualification</th>
<th className="col">pay</th>
<th className="col">update</th>
<th className="col">delete</th>
</tr>
</thead>
<tbody>
{users.map((user)=>{
return( <tr key={user.id}>

<td>{user.id}</td>
<td>{user.name}</td>
<td>{user.email}</td>
<td>{user.qualification}</td>
<td>{user.pay}</td>
<td><button className='btn btn-danger'>delete</button></td>
<td><button className='btn btn-outline-secondary'>update</button></td>
</tr>)


  
})}

</tbody>
</table>
</div>

<div className="row">

  <h2>
  <Link to="/addcourse"> <button className='btn btn-outline-success'>add course</button></Link>

  </h2>
{courses.map((course)=>{
return (
<div key={course.id} className="col-sm-4">

<div className="card w-100" style={{width: '18rem'}}>
<img src={course.image} className="card-img-top" alt="..."/>
<div className="card-body">
  <h5 className="card-title">{course.name}</h5>
  <p className="card-text">{course.description}</p>
  <Link to={`/courseadmin/${course.id}`} className="btn btn-primary">view details</Link>
  <button onClick={() => deleteCourse(course.id)} className='mx-2 btn btn-danger'>Delete Course</button>


</div>
</div>

</div>
);
})}
</div>
</div>

  
  </>;
}


