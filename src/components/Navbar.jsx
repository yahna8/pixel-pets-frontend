import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { sendUserEmail, getDailyStreak } from '../api/dailystreak';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [streak, setStreak] = useState('');

  useEffect(() => {
    if (user) {
      const updateStreak = async () => {
        try {
          // Send user email to backend
          await sendUserEmail(user.email);
          // Wait for backend to process the streak
          setTimeout(async () => {
            const streakMessage = await getDailyStreak(); // Fetch updated streak
            setStreak(streakMessage);
          }, 2000); // 2-second delay to allow backend to update streak
        } catch (error) {
          console.error("Error updating streak:", error);
        }
      };

      updateStreak();
      const interval = setInterval(updateStreak, 10000); // Update every 10s
      return () => clearInterval(interval);
    }
  }, [user]);

  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/tasks">Tasks</Link></li>
        <li><Link to="/store">Store</Link></li>
        <li><Link to="/inventory">Inventory</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/help">Help</Link></li>
      </ul>

      {user && (
        <div className="user-info">
          <span className="points">Points: </span>
          <span className="streak">{streak}</span>
          <button onClick={logout} className="logout-button">
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
