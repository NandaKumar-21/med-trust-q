import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ChangePassword from './pages/ChangePassword';
import ViewProfile from './pages/ViewProfile';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import PatientDashboard from './pages/PatientDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import HospitalDashboard from './pages/HospitalDashboard';
import InsuranceDashboard from './pages/InsuranceDashboard';
import PrivateRoute from './components/PrivateRoute';
import './styles/theme.css';

function App() {
  const [userRole, setUserRole] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (role, email) => {
    setUserRole(role);
    setUserEmail(email);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setUserRole(null);
    setUserEmail(null);
    setIsAuthenticated(false);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login setUserRole={handleLogin} setUserEmail={setUserEmail} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route 
          path="/admin-dashboard" 
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <AdminDashboard />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/change-password" 
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <ChangePassword userEmail={userEmail} />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <ViewProfile role={userRole} userEmail={userEmail} />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/patient-dashboard" 
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <PatientDashboard />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/doctor-dashboard" 
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <DoctorDashboard />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/hospital-dashboard" 
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <HospitalDashboard />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/insurance-dashboard" 
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <InsuranceDashboard />
            </PrivateRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
