import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '@tabler/core/dist/css/tabler.min.css';
// import Home from './pages/Home';
import Login from './pages/Login'; // Tambahkan impor ini
import Dashboard from './pages/Dashboard'; // Tambahkan impor untuk Dashboard
import ProtectedRoute from './components/ProtectedRoute'; // Tambahkan impor untuk ProtectedRoute
import CategoryForm from './pages/CategoryForm'; // Tambahkan impor untuk CategoryForm
import Register from './pages/Register'; // Tambahkan impor untuk Register
// import 'bootstrap/dist/css/bootstrap.min.css'; // Tambahkan impor ini
// import tailwindcss dari cdn
import 'tailwindcss/tailwind.css';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        {/* Tambahkan rute lain di sini */}
        <Route path="/login" element={<Login />} />
        {/* buat route register */}
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        {/* buat route categoryform */}
        <Route path="/category-form" element={<CategoryForm />} />
        
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();