import React from "react";
import "../styles/globals.css"; // Import styles

const ConfirmationModal = ({ item, onConfirm, onCancel }) => {
  if (!item) return null; // Don't render if no item is selected

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Are you sure?</h2>
        <p>You are about to purchase <strong>{item.name}</strong> for <strong>{item.price} points</strong>.</p>
        <p><strong>This action cannot be undone.</strong></p>
        <div className="modal-buttons">
          <button className="cancel-button" onClick={onCancel}>Cancel</button>
          <button className="confirm-button" onClick={onConfirm}>Confirm Purchase</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
