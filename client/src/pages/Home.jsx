import React from 'react';

function Home() {
  return (
    <div className="container mt-5">
      <div className="p-5 mb-4 bg-light rounded-3">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold">Swachh-Tracker</h1>
          <p className="col-md-8 fs-4">
            Your one-stop solution to report and track garbage collection issues in your area.
            Help us keep our cities clean.
          </p>
          {/* I will add login/signup buttons here later */}
        </div>
      </div>
    </div>
  );
}

export default Home;