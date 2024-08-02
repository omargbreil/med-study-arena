import axios from 'axios';
import joi from 'joi';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';



export default function Signup() {

  const [error, seterror] = useState();
  const [loading, setloading] = useState(false);
  const [validationError, setvalidationError] = useState([]);

  let navigate = useNavigate();

  const [user, setuser] = useState({

    name: "",
    email: "",
    password: "",
    phone: "",
    country: "",

  });

  /* -------------------------------------------------------------------------- */
  /*                                 validation                                 */
  /* -------------------------------------------------------------------------- */

  function validation(user) {

    const schema = joi.object({
      name: joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

      password: joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')),


      phone: joi.string()
      .pattern(new RegExp('^[0-9]{11}$'))
        .required(),

      email: joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),

      country: joi.string().required(),



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

        let { data } = await axios.post(`${process.env.REACT_APP_prourl}/arena/v1/user/signup`, user);

        if (data.message === "done") {

          setloading(false);

          navigate('/signin');
        } else {
          seterror(data.message);
        };
      } catch (err) {
        setloading(false);
        seterror(err.response.data.message);
        console.log(err);
      };
    }
  };



  useEffect(() => {

    console.log("component did mount");

    return () => {
      console.log("component will mount");

    }
  }, [])

  useEffect(() => {

    console.log({ user });

  }, [user])


  return (
    <div className='container'>

      <form onSubmit={submit} className='m-3 p-3 w-100'>

        <label htmlFor="name">name :</label>
        <input onChange={getUser} type="text" className='form-control mb-3' name='name' id='name' />

        <label htmlFor="email">email :</label>
        <input onChange={getUser} type="email" className='form-control mb-3' name='email' id='email' />

        <label htmlFor="password">password :</label>
        <input onChange={getUser} type="password" className='form-control mb-3' name='password' id='password' />

        <label htmlFor="phone">phone :</label>
        <input onChange={getUser} type="text" className='form-control mb-3' name='phone' id='phone' />

        <label htmlFor="country">country :</label>
        <input onChange={getUser} type="text" className='form-control mb-3' name='country' id='country' />







        <button type='submit' className=' m-4 b-2 btn btn-danger'>
          {loading ? <i className='fas fa-spinner fa-spin'></i> : 'register'} 
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
