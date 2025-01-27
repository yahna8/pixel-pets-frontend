import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Auth provider
import useAuth from './hooks/useAuth';
import Navbar from './components/Navbar'; // Navigation bar
import Login from './pages/Login'; // Login/Register page
import Home from './pages/Home'; // Landing page
import Tasks from './pages/Tasks'; // Task management page
import Store from './pages/Store'; // Store page
import Inventory from './pages/Inventory'; // Inventory page

// Debugging: Check if useAuth works correctly
const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    console.log('PrivateRoute: User is not logged in');
    return <Navigate to="/login" />;
  }

  console.log('PrivateRoute: User is logged in', user);
  return children;
};

const App = () => {
  console.log('Rendering App Component');

  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/tasks"
            element={
              <PrivateRoute>
                <Tasks />
              </PrivateRoute>
            }
          />
          <Route
            path="/store"
            element={
              <PrivateRoute>
                <Store />
              </PrivateRoute>
            }
          />
          <Route
            path="/inventory"
            element={
              <PrivateRoute>
                <Inventory />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;