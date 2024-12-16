// src/components/Courses.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://51.20.123.161:5000/api/courses');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourses();
  }, []);

  const handleEnroll = async (courseId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://51.20.123.161:5000/api/courses/${courseId}/enroll`, {}, {
        headers: { Authorization: token }
      });
      alert('Enrolled successfully!');
    } catch (error) {
      console.error('Error enrolling in course:', error);
      alert(error.response?.data?.message || 'An error occurred while enrolling');
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Available Courses</h2>
      <div className="row">
        {courses.map(course => (
          <div key={course._id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{course.title}</h5>
                <p className="card-text">{course.description}</p>
                <div className="d-flex justify-content-between">
                  <Link to={`/courses/${course._id}`} className="btn btn-primary">View Details</Link>
                  <button className="btn btn-success" onClick={() => handleEnroll(course._id)}>Enroll</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;
