
import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../context/user/userContext';

export default function UpdateCourse() {

  let {token} = useContext(UserContext);
  let {id}=useParams()

 

  const [course, setcourse] = useState({

    image: "",
    name: "",
    description: "",
    price:"",
    discount:""
    
   
  });

  

      
  function getCourse(e) {
    let myCourse = { ...course };
    if (e.target.name === 'image') {
      myCourse[e.target.name] = e.target.files[0];
    } else {
      myCourse[e.target.name] = e.target.value;
    }
    setcourse(myCourse);
  }


  
  async function submit(e) {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('image', course.image);
    formData.append('name', course.name);
    formData.append('description', course.description);
    formData.append('price', course.price);
    formData.append('discount', course.discount);
  
    console.log(formData);
    try {
      const response = await axios.put(`${process.env.REACT_APP_prourl}/arena/v1/course/update/${id}`, formData, {
        headers: {
          'token': token,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('done');
      console.log(response.data);
    } catch (err) {
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




<button type='submit' className=' m-4 b-2 btn btn-outline-primary'>

  Update

</button>

</form>
      </div>
    </div>
</div>

</>

  )
}





