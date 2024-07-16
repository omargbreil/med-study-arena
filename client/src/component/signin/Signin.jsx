import axios from 'axios';
import joi from 'joi';
import React, { useContext } from 'react';
import { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/user/userContext';


export default function Signin(props) {
  const [error, seterror] = useState();
  const [loading, setloading] = useState(false);
  const [validationError, setvalidationError] = useState([]);
  let {getToken}=useContext(UserContext);

  let navigate = useNavigate();

  const [user, setuser] = useState({

    email: "",
    password: "",
   
  });

  /* -------------------------------------------------------------------------- */
  /*                                 validation                                 */
  /* -------------------------------------------------------------------------- */

  function validation(user) {

    const schema = joi.object({
    

      password: joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')),


      email: joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required()

    })

    return schema.validate(user, { abortEarly: false });

  }

/* -------------------------------------------------------------------------- */
/*                                 user  data                                 */
/* -------------------------------------------------------------------------- */
    
  function getUser(e) {

    let myUser = { ...user };

    myUser[e.target.name] = e.target.value;
    setuser(myUser);

  };

  /* -------------------------------------------------------------------------- */
  /*                                   submit                                   */
  /* -------------------------------------------------------------------------- */

  async function submit(e) {
    e.preventDefault();
    setloading(true);

    let valid = validation(user);
    if (valid.error) {
      setloading(false);
      setvalidationError(valid.error.details);
    } else {

      setloading(true);
      setvalidationError([]);
      try {

        let {data} = await axios.post('http://localhost:5000/arena/v1/user/signin', user);

        if (data.message ==="done") {

          console.log('done');
          console.log(data);
          seterror(null)
          setloading(false);
          localStorage.setItem('userToken', data.token);
          getToken();


          const qualification =data.user.qualification;
          const answered=data.user.answered;

          if (answered) {
            navigate('/course');
          }else{
            
            if (qualification==="us_student") {
            
              navigate('/us_student');
  
            }else if(qualification==="int_student"){
  
              navigate('/int_student');
  
            }else if(qualification==="int_graduate"){
  
              navigate('/int_graduate');
              
  
            }else{
  
              seterror("Something wrong please contact the admin")
            }
          }

        } else {
          seterror(data.message);

        };
      } catch (err) {
        setloading(false);

        seterror(err.response.data.message);
      };
    }
  };




  return (
    <div className='container'>

      <form onSubmit={submit} className='m-3 p-3 w-100'>

        <label htmlFor="email">email :</label>
        <input onChange={getUser} type="email" className='form-control mb-3' name='email' id='email' />

        <label htmlFor="password">password :</label>
        <input onChange={getUser} type="password" className='form-control mb-3' name='password' id='password' />



        <button type='submit' className=' m-4 b-2 btn btn-danger'>
          {loading ? <i className='fas fa-spinner fa-spin'></i> : 'login'} 
          </button>
        {error ? <div className="alert alert-danger p-2">{error}</div> : ''}

        {validationError.map((err , index) => {
    
    if (validationError[index].context.label === "password") 
    {
     return <div key={index}  className="alert alert-danger">"invalid password"</div>
      
    }else if (validationError[index].context.label === "phone") {
      

      return <div key={index}  className="alert alert-danger">"invalid phone number"</div>

    }else
    {
      return <div key={index} className="alert alert-danger">{err.message}</div>
    }
    })}



      </form>


    </div>
  )
}
