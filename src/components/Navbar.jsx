import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { sendUserEmail, getDailyStreak } from '../api/dailystreak';
import { getUserPoints } from '../api/points';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [streak, setStreak] = useState('');
  const [points, setPoints] = useState(0);

  useEffect(() => {
    if (user) {
      const updateStreakAndPoints = async () => {
        try {
          // Send user email to backend
          await sendUserEmail(user.email);

          // Fetch updated streak with a delay
          setTimeout(async () => {
            const streakMessage = await getDailyStreak();
            setStreak(streakMessage);
          }, 2000);

          // Fetch user points
          const userPoints = await getUserPoints();
          setPoints(userPoints);
        } catch (error) {
          console.error("Error updating streak or points:", error);
        }
      };

      updateStreakAndPoints();
      const interval = setInterval(updateStreakAndPoints, 10000); // Update every 10s
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
          <span className="points">Points: {points}</span>
          <span className="streak">    {streak}</span>
          <button onClick={logout} className="logout-button">
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
