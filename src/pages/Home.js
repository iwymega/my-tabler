import React from 'react';
import { login } from '../api/auth';
import { useNavigate } from 'react-router-dom';


function Home() {
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="page">
      <div className="page-single">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-4">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Home</h3>
                </div>
                <div className="card-body">
                <button onClick={navigateToLogin} className="btn btn-primary btn-block">
                    Go to Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;