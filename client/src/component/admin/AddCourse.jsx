import React, { useContext, useState } from 'react'
import { UserContext } from '../../context/user/userContext';
import axios from 'axios';

export default function AddCourse() {
 
  let {token} = useContext(UserContext);

 

  const [course, setcourse] = useState({

    image: "",
    name: "",
    description: "",
    price:"",
    discount:""
    
   
  });
  const [loading, setloading] = useState(false);


  

      
  function getCourse(e) {
    let myCourse = { ...course };
    if (e.target.name === 'image') {
      myCourse[e.target.name] = e.target.files[0];
      console.log(e.target.files[0]);
    } else {
      myCourse[e.target.name] = e.target.value;
    }
    setcourse(myCourse);
  }


  
  async function submit(e) {
    e.preventDefault();
    setloading(true)
  
    const formData = new FormData();
    formData.append('image', course.image);
    formData.append('name', course.name);
    formData.append('description', course.description);
    formData.append('price', course.price);
    formData.append('discount', course.discount);
  
    console.log(formData);
    console.log(token);
    try {
      const response = await axios.post(`https://study-arena-f.vercel.app/arena/v1/course/add`, formData, {
        headers: {
          'token': token,
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data.message==="done") {
        
        setloading(false);
      }
    } catch (err) {
      setloading(false);

      console.log(err);
    }
  }

  return (
    <>

      <div className='container'>

    <div className="row">
      <div className="col-4">
      <form onSubmit={submit} className='m-3 p-3 w-100'>

<label htmlFor="image">image :</label>
<input onChange={getCourse} type="file" name='image' className='form-control mb-3'/>

<label htmlFor="name">name :</label>
<input onChange={getCourse} type="text" className='form-control mb-3' name='name' id='name' />

<label htmlFor="description">description :</label>
<input onChange={getCourse} type="text" className='form-control mb-3' name='description' id='description' />

<label htmlFor="price">price :</label>
<input onChange={getCourse} type="text" className='form-control mb-3' name='price' id='phone' />

<label htmlFor="discount">discount :</label>
<input onChange={getCourse} type="text" className='form-control mb-3' name='discount' id='discount' />

{loading?(<button className="btn btn-primary" type="button" disabled>
  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
  Loading...
</button>):<button type='submit' className=' m-4 b-2 btn btn-outline-primary'>
  add
</button>}



</form>
      </div>
    </div>
</div>

</>

  )

}








