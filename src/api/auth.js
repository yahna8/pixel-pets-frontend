import axios from 'axios';

// Base URL for the auth microservice
const BASE_URL = process.env.AUTH_API_URL || 'http://localhost:8001';

/**
 * Registers a new user.
 * @param {Object} userData - Contains name, email, and password.
 * @returns {Promise} - Axios response.
 */
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Registration failed' };
  }
};

/**
 * Logs in a user.
 * @param {Object} credentials - Contains email and password.
 * @returns {Promise} - Axios response with access token.
 */
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Login failed' };
  }
};

/**
 * Validates a JWT token.
 * @param {string} token - JWT token to validate.
 * @returns {Promise} - Axios response with user_id if valid.
 */
export const validateToken = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/validate`, {
      params: { token },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Token validation failed' };
  }
};
