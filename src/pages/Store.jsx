import React, { useEffect, useState } from "react";
import { getStoreItems, purchaseItem } from "../api/store";
import { getUserPoints, deductPoints } from "../api/points";
import ConfirmationModal from "../components/ConfirmationModal";
import "../styles/globals.css"; // Import styles

const BASE_URL = process.env.STORE_API_URL || "http://localhost:8004";

const Store = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedItem, setSelectedItem] = useState(null); // Track selected item for modal
  const [userPoints, setUserPoints] = useState(0); // Track user's points
  const [errorMessage, setErrorMessage] = useState(""); // Track error message

  useEffect(() => {
    const fetchItemsAndPoints = async () => {
      try {
        const storeItems = await getStoreItems();
        const points = await getUserPoints();
        setItems(storeItems);
        setUserPoints(points);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItemsAndPoints();
  }, []);

  const handlePurchase = async (itemId, itemPrice) => {
    if (userPoints < itemPrice) {
      setErrorMessage("Purchase failed, you don't have enough points! Complete more tasks in order to make this purchase.");
      setSelectedItem(null); // Close confirmation modal
      return;
    }

    try {
      // Deduct points before purchasing
      const updatedPoints = await deductPoints(itemPrice);
      setUserPoints(updatedPoints); // Update UI with new points balance

      // Proceed with the purchase
      await purchaseItem(itemId);
      alert("Item purchased successfully!");
      setSelectedItem(null); // Close modal after purchase
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="store-and-inventory">
      <h2>Store</h2>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <div className="item-grid">
        {items.map((item) => (
          <div key={item.id} className="item-card">
            <img
              src={`${BASE_URL}${item.image}`} // ✅ Ensure images load from backend
              alt={item.name}
              className="item-image"
            />
            <div className="item-details">
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p><strong>{item.price} points</strong></p>
              <button className="buy-button" onClick={() => setSelectedItem(item)}>Buy</button>
            </div>
          </div>
        ))}
      </div>

      {/* Show the modal if an item is selected */}
      {selectedItem && (
        <ConfirmationModal
          item={selectedItem}
          onConfirm={() => handlePurchase(selectedItem.id, selectedItem.price)}
          onCancel={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
};

export default Store;
