import axios from 'axios';

const BASE_URL = process.env.POINTS_API_URL || 'http://localhost:8003';

/**
 * Fetch the user's current points balance.
 * @returns {Promise} - User's point balance.
 */
export const getUserPoints = async () => {
  const token = localStorage.getItem('access_token'); // Retrieve the token from localStorage
  if (!token) {
    console.error("No access token found.");
    throw new Error('No access token found');
  }

  console.log("Using token:", token); // Debugging

  try {
    const response = await axios.get(`${BASE_URL}/points`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data.balance;
  } catch (error) {
    console.error('Error fetching user points:', error.response?.data || error);
    throw new Error(error.response?.data?.detail || 'Failed to fetch points');
  }
};

/**
 * Add points to the user's balance.
 * @param {number} amount - The amount of points to add.
 * @returns {Promise} - Updated point balance.
 */
export const addPoints = async (amount) => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    throw new Error('No access token found');
  }

  try {
    const response = await axios.post(`${BASE_URL}/points/add`, null, {
      params: { amount },
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data.balance;
  } catch (error) {
    console.error('Error adding points:', error);
    throw new Error(error.response?.data?.detail || 'Failed to add points');
  }
};

/**
 * Deduct points from the user's balance.
 * @param {number} amount - The amount of points to deduct.
 * @returns {Promise} - Updated point balance.
 */
export const deductPoints = async (amount) => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    throw new Error('No access token found');
  }

  try {
    const response = await axios.post(`${BASE_URL}/points/deduct`, null, {
      params: { amount },
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data.balance;
  } catch (error) {
    console.error('Error deducting points:', error);
    throw new Error(error.response?.data?.detail || 'Failed to deduct points');
  }
};
