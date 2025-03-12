import axios from "axios";

const BASE_URL = process.env.STORE_API_URL || "http://localhost:8004";

/**
 * Fetch user's inventory.
 * @returns {Promise} - List of inventory items.
 */
export const getInventory = async () => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("No access token found");

  try {
    const response = await axios.get(`${BASE_URL}/inventory`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching inventory:", error);
    throw new Error(error.response?.data?.detail || "Failed to fetch inventory");
  }
};
