import axios from "axios";

const BASE_URL = process.env.STORE_API_URL || "http://localhost:8004";

/**
 * Fetch available store items.
 * @returns {Promise} - List of store items.
 */
export const getStoreItems = async () => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("No access token found");

  try {
    const response = await axios.get(`${BASE_URL}/store`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching store items:", error);
    throw new Error(error.response?.data?.detail || "Failed to fetch store items");
  }
};

/**
 * Purchase an item.
 * @param {number} itemId - ID of the item to purchase.
 * @returns {Promise} - Purchase result.
 */
export const purchaseItem = async (itemId) => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("No access token found");

  try {
    const response = await axios.post(
      `${BASE_URL}/store/purchase`,
      { item_id: itemId },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error purchasing item:", error);
    throw new Error(error.response?.data?.detail || "Failed to purchase item");
  }
};
