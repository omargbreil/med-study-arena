import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/user/userContext';


export default function Navbar({logOut}) {

  const { decode } = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    const redirectPath = logOut();
    navigate(redirectPath);
  };

  

  return (
<>

<nav className="navbar navbar-expand-lg">
  <div className="container-fluid">
   
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"><i className='fa-2xs'> </i> </span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active fw-bolder" aria-current="page" to="home">Med <span className='text-success'>Study</span> Arena</Link>
        </li>

        {localStorage.getItem('userToken')?<>
        
         
          <li className="nav-item">
          <button onClick={handleLogout} className="nav-link active fw-bolder" aria-current="page">Logout</button >
        </li>

        <li className="nav-item">
          <Link className="nav-link active fw-bolder" aria-current="page" to="course">Course</Link>
        </li>
        {!decode?'':decode.role==="admin"?(
           <li className="nav-item">
           <Link className="nav-link active fw-bolder" aria-current="page" to="admin">admin</Link>
         </li>
         
        ):''}





        </>:<>
         
        <li className="nav-item">
          <Link className="nav-link active fw-bolder" aria-current="page" to="signup">signup</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active fw-bolder" aria-current="page" to="signin">signin</Link>
        </li>
  
        </>}
       
       

       
 
       
    
    
          
      </ul>

    </div>
  </div>
</nav>
</>

  )
}
