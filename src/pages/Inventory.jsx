import React, { useEffect, useState } from "react";
import { getInventory } from "../api/inventory";
import axios from "axios";
import "../styles/globals.css";

const BASE_URL = process.env.STORE_API_URL || "http://localhost:8004";

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [equippedItem, setEquippedItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchInventoryAndEquipped = async () => {
      try {
        const items = await getInventory();
        setInventory(items);

        const equippedResponse = await axios.get(`${BASE_URL}/inventory/equipped`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
        });

        setEquippedItem(equippedResponse.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInventoryAndEquipped();
  }, []);

  const handleEquip = async (item) => {
    const payload = { item_id: item.id };
  
    try {
      console.log("Sending equip request:", payload);
  
      const response = await axios.post(
        `${BASE_URL}/inventory/equip`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
  
      console.log("Equip response:", response.data);
  
      // Fetch updated equipped item
      const equippedResponse = await axios.get(`${BASE_URL}/inventory/equipped`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
      });
  
      setEquippedItem(equippedResponse.data);
    } catch (err) {
      console.error("Error equipping item:", err.response?.data || err.message);
    }
  };


  if (loading) return <p>Loading inventory...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="store-and-inventory">
      <h2>Your Inventory</h2>

      {equippedItem && (
        <div className="equipped-item">
          <h3>Current pet:</h3>
          <img src={`http://localhost:8004${equippedItem.image}`} alt={equippedItem.name} className="equipped-image" />
          <p><strong>{equippedItem.name}</strong></p>
        </div>
      )}

      <div className="item-grid">
        {inventory.map((item) => (
          <div key={item.id} className="item-card">
            <img
              src={`http://localhost:8004${item.image}`}
              alt={item.name}
              className="item-image"
            />
            <div className="item-details">
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <button className="equip-button" onClick={() => handleEquip(item)}>Choose pet</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inventory;
