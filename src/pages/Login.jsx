import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../api/auth';
import { sendUserEmail, getDailyStreak } from '../api/dailystreak';
import useAuth from '../hooks/useAuth';
import '../styles/globals.css'; // Ensure styles are imported

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { access_token } = await loginUser(formData);
      login(access_token);

      // Send email to backend to update streak
      await sendUserEmail(formData.email);
      setTimeout(async () => {
        const streakMessage = await getDailyStreak();
        console.log("Updated Streak:", streakMessage);
      }, 2000); // Delay to allow backend processing

      navigate('/');
    } catch (err) {
      setError(err.message || 'Invalid credentials. Try again.');
    }
  };

  return (
    <div className="auth-page">
        <img src="/assets/sleeping_cat.png" alt="Sleeping Cat" className="side-image left-image"/>
        
        <div className="form-container">
            <h1 className="game-title">PIXEL PETS</h1>

            {error && <p className="error-message">{error}</p>}

            <form onSubmit={handleSubmit} className="login-form">
                <label>Email:</label>
                <input type="email" name="email" placeholder="Type here" value={formData.email} onChange={handleInputChange} required/>

                <label>Password:</label>
                <input type="password" name="password" placeholder="Type here" value={formData.password} onChange={handleInputChange} required/>

                <button type="submit" className="btn-login">Log In</button>
            </form>

            <Link to="/register" className="btn-register">Create an account</Link>

            <p className="tagline">Gamify your goals with data-driven rewards and adorable pixel companions</p>
        </div>

        <img src="/assets/happy_dog.png" alt="Happy Dog" className="side-image right-image"/>
    </div>
  );
};

export default Login;
