import axios from 'axios';

const BASE_URL = process.env.TASKS_API_URL || 'http://localhost:8002'; 

/**
 * Fetch all active tasks.
 * @returns {Promise} - List of tasks.
 */
export const getTasks = async () => {
  const response = await axios.get(`${BASE_URL}/tasks`);
  return response.data;
};

/**
 * Fetch completed tasks (task history).
 * @returns {Promise} - List of completed tasks.
 */
export const getTaskHistory = async () => {
  const response = await axios.get(`${BASE_URL}/tasks/history`);
  return response.data;
};

/**
 * Create a new task.
 * @param {Object} task - Task details (title, description, priority, deadline).
 * @returns {Promise} - Created task.
 */
export const createTask = async (task) => {
    const token = localStorage.getItem('access_token'); // Retrieve the token from localStorage
    if (!token) {
      throw new Error('No access token found');
    }
  
    const response = await axios.post(`${BASE_URL}/tasks`, task, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  
    return response.data;
  };

/**
 * Mark a task as completed.
 * @param {number} taskId - ID of the task to mark as completed.
 * @returns {Promise} - Updated task.
 */
export const completeTask = async (taskId) => {
  const response = await axios.put(`${BASE_URL}/tasks/${taskId}/complete`);
  return response.data;
};