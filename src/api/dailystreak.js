import axios from "axios";

const BASE_URL = "http://localhost:8006"; // Your Node.js backend server

// Function to send the user email to the backend
export const sendUserEmail = async (email) => {
  try {
    const response = await axios.post(`${BASE_URL}/write-username`, { email });
    return response.data.message; // Expecting success message
  } catch (error) {
    console.error("Error sending user email:", error);
    return "Error updating streak.";
  }
};

// Function to fetch daily streak message
export const getDailyStreak = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/get-streak`);
    return response.data.streak; // Expecting streak message
  } catch (error) {
    console.error("Error fetching daily streak:", error);
    return "Error retrieving streak.";
  }
};