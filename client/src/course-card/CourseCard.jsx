import React from 'react';
import './style.css';

const CourseCard = ({ course, setCourse }) => {
  const handleClick = () => {
    setCourse({
      name: course.name,
      price: course.price,
    });
  };
  return (
    <div className="CourseCard" onClick={handleClick}>
      <h3 className="card-name">{course.name}</h3>
      <p className="card-price">${course.price}</p>
    </div>
  );
};

export default CourseCard;