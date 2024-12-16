import React from 'react';

function Home() {
  return (
    <div className="container my-5">
      <div className="row justify-content-center text-center">
        <div className="col-md-8">
          <h1 className="display-4 mb-4">Welcome to our E-Learning Platform</h1>
          <p className="lead mb-4">Start your learning journey today!</p>
          <a href="/courses" className="btn btn-primary btn-lg">Explore Courses</a>
        </div>
      </div>
    </div>
  );
}

export default Home;
