import React from 'react'
import '../cstyle.css';
import { Link } from 'react-router-dom';

export default function CourseCard({course}) {
  return (
    <div className="col-lg-4">

    <div className="members overflow-hidden position-relative">
      <img src={course.image} alt="" className='w-100' />
      <div className="member1 d-flex flex-column justify-content-between  position-absolute w-100 h-100">
        <ul className=" d-flex  list-unstyled m-3  text-light">
          <li><i className="fab fa-facebook-f"></i></li>
          <li><i className="fab fa-twitter"></i></li>
          <li><i className="fab fa-linkedin-in"></i></li>
        </ul>


        <div className="member1-info text-light m-3">
          <p className="h4">
            {course.name}

          </p>
          <p className="h5">
            {course.total_price}$
          </p> 
          {
            true?<>
            <Link to={`/track/${course.id}`}>
              <button className="btn btn-outline-success">
              Track
              </button>
            </Link>
            </>:''
          } 




        </div>
      </div>
    </div>

  </div>



  )
}
