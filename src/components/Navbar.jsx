import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex space-x-4">
        <li><Link to="/">Home</Link></li>
        {user && (
          <>
            <li><Link to="/tasks">Tasks</Link></li>
            <li><Link to="/store">Store</Link></li>
            <li><Link to="/inventory">Inventory</Link></li>
            <li>
              <button onClick={logout} className="text-red-500">
                Logout
              </button>
            </li>
          </>
        )}
        {!user && <li><Link to="/login">Login</Link></li>}
      </ul>
    </nav>
  );
};

export default Navbar;