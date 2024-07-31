import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/auth';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await login(email, password);
      console.log('Login successful', response.data);
      // Simpan status login, misalnya di localStorage
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('token', response.data.data.token);
      console.log(localStorage.getItem('token'));
      // Arahkan ke halaman dashboard
      // navigate('/dashboard');
      window.location.href = '/dashboard';
      
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div className="page">
      <div className="page-single">
        <div className="container">
          <div className="row">
            <div className="col col-login mx-auto">
              <div className="card">
                <div className="card-body p-6">
                  <div className="card-title">Login to your account</div>
                  <div className="form-group">
                    <label className="form-label">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter email"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                    />
                  </div>
                  <div className="form-footer">
                    <button onClick={handleLogin} className="btn btn-primary btn-block">
                      Login
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;