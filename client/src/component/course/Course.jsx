import React, { createContext, useContext, useEffect, useState } from 'react';
import './cstyle.css';
import CourseCard from './coursecard/CourseCard';
import { DataContext } from '../../context/dataContext/DataContext';





export const CourseContext = createContext(null);

export default function Course() {


  let {courses}=useContext(DataContext);



  return (
    <>

    <div className="container">


<div className="row">
  {courses.map((course) => (

   <CourseCard key={course.id} course={course}/>
 
    
  ))}
</div>
</div>
  
    </>
  );
}

