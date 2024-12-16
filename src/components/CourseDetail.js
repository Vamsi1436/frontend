import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CourseDetail.css';

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [enrolled, setEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // For navigating back

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`http://51.20.123.161:5000/api/courses/${id}`);
        setCourse(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load course details. Please try again later.');
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const enrollCourse = async () => {
    try {
      const response = await axios.post(`http://51.20.123.161:5000/api/courses/${id}/enroll`, {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // store the auth token in localStorage
        }
      });

      if (response.data.success) {
        setEnrolled(true);
        setError('');
      }
    } catch (err) {
      if (err.response) {
        setError(`Enrollment failed: ${err.response.data.message || 'Please try again.'}`);
      } else if (err.request) {
        setError('No response received from server. Please check your connection.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
      console.error('Error enrolling in course:', err);
    }
  };

  if (loading) return <div className="loading text-center">Loading...</div>;
  if (error) return <div className="error text-center text-danger">{error}</div>;
  if (!course) return <div className="error text-center text-danger">Course not found.</div>;

  return (
    <div className="container my-5">
      <div className="card">
        <div className="card-body">
          <h1 className="card-title">{course.title}</h1>
          <p className="card-text">{course.description}</p>
          <p className="fw-bold">Instructor: <span>{course.instructor}</span></p>

          {!enrolled ? (
            <>
              <button className="btn btn-primary" onClick={enrollCourse}>Enroll Now</button>
              <p className="mt-3 text-muted">Go back to enroll in this course.</p>
            </>
          ) : (
            <p className="text-success">You are enrolled in this course!</p>
          )}

          {/* Go Back Button */}
          <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>Go Back</button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
