import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Auth provider
import useAuth from './hooks/useAuth';
import Navbar from './components/Navbar'; // Navigation bar
import Login from './pages/Login'; // Login page
import Register from './pages/Register'; // Import Register component
import Home from './pages/Home'; // Landing page
import Tasks from './pages/Tasks'; // Task management page
import Store from './pages/Store'; // Store page
import Inventory from './pages/Inventory'; // Inventory page
import Profile from './pages/Profile'; // Profile page
import Help from './pages/Help'; // Help page


const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    console.log('PrivateRoute: User is not logged in');
    return <Navigate to="/login" />;
  }

  console.log('PrivateRoute: User is logged in', user);
  return children;
};

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // If user is logged in, redirect to home
  if (user) {
    return <Navigate to="/" />;
  }

  return children;
};

const App = () => {
  console.log('Rendering App Component');

  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
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
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/help"
            element={
              <PrivateRoute>
                <Help />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;