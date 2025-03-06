import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../api/auth';
import '../styles/globals.css'; // Ensure styles are imported

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await registerUser(formData);  // Register user
        navigate('/login');  // Redirect to login page after successful registration
    } catch (err) {
      setError(err.message || 'Registration failed.');
    }
  };

  return (
    <div className="auth-page">
        <img src="/assets/sleeping_cat.png" alt="Sleeping Cat" className="side-image left-image"/>

        <div className="form-container">
            <h1 className="game-title">STUDY CRITTERS</h1>

            {error && <p className="error-message">{error}</p>}

            <form onSubmit={handleSubmit} className="register-form">
                <label>Name:</label>
                <input type="text" name="name" placeholder="Enter your name" value={formData.name} onChange={handleInputChange} required/>

                <label>Email:</label>
                <input type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleInputChange} required/>

                <label>Password:</label>
                <input type="password" name="password" placeholder="Enter your password" value={formData.password} onChange={handleInputChange} required/>

                <button type="submit" className="btn-register">Sign Up</button>
            </form>

            <p>Already have an account? <Link to="/login" className="link">Log in</Link></p>

            <p className="tagline">Gamify your goals with data-driven rewards and adorable pixel companions</p>
        </div>

        <img src="/assets/happy_dog.png" alt="Happy Dog" className="side-image right-image"/>
    </div>
  );
};

export default Register;