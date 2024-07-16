import React, { useContext, useState } from 'react'
import { UserContext } from '../../context/user/userContext';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function AddStep() {
 
  let {token} = useContext(UserContext);

  let {id}=useParams();
 

  const [step, setStep] = useState({

    video: "",
    image: "",
    text: "",
    pdf:"",
    course:id

   
  });
  const [loading, setloading] = useState(false);


  

      
  function getStep(e) {
    let myStep = { ...step };
    if (e.target.name === 'text') {

      myStep[e.target.name] = e.target.value;

    } else {
      myStep[e.target.name] = e.target.files[0];      
    }
    setStep(myStep);
  }


  
  async function submit(e) {
    e.preventDefault();
    setloading(true)
  
    // const formData = new FormData();
    // formData.append('video', step.video);
    // formData.append('image', step.image);
    // formData.append('text', step.text);
    // formData.append('pdf', step.pdf);
  
    // console.log(formData);
    // console.log(step);
    // console.log(token);
    try {
      const response = await axios.post(`http://localhost:5000/arena/v1/track/add`, step, {
        headers: {
          'token': token,
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data.message==="done") {
        setloading(false)
      }
    } catch (err) {
      setloading(false)

      console.log(err);
    }
  }

  return (
    <>

      <div className='container'>

    <div className="row">
      <div className="col-4">
      <form onSubmit={submit} className='m-3 p-3 w-100'>

<label htmlFor="video">video :</label>
<input onChange={getStep} type="file" name='video' className='form-control mb-3'/>
<label htmlFor="image">image :</label>
<input onChange={getStep} type="file" name='image' className='form-control mb-3'/>
<label htmlFor="pdf">pdf :</label>
<input onChange={getStep} type="file" name='pdf' className='form-control mb-3'/>

<label htmlFor="text">text :</label>
<input onChange={getStep} type="text" className='form-control mb-3' name='text' id='text' />



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








