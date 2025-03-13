import React, { useState } from "react";
import '../styles/globals.css'; // Ensure styles are imported

const HelpPage = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="help-container">
      <h1 className="help-title">Help - Pixel Pets</h1>
      <p className="help-intro">
        Welcome to Pixel Pets! This virtual pet productivity tracker helps you stay on top of tasks while rewarding you with cool pets and items. Click on a section below to learn more.
      </p>

      {/* Accordion Sections */}
      {[
    {
        title: "Costs & Pricing",
        content: (
            <ul>
            <li><strong>Is Pixel Pets Free?</strong> Yes! Pixel Pets is completely free to use.</li>
            <li><strong>Are There Any Paid Features?</strong> No, everything including task tracking, points, store purchases, and inventory management is included at no cost.</li>
            <li><strong>Do I Need to Make Any Purchases?</strong> No real-money purchases are required. All in-game items are bought using points earned from completing tasks.</li>
            </ul>
        ),
        },
        {
          title: "How to Use Pixel Pets",
          content: (
            <ul>
              <li><strong>Add Tasks:</strong> Use the "Tasks" page to create new tasks.</li>
              <li><strong>Mark Tasks as Complete:</strong> Click the ✔ button next to a task to complete it and earn points.</li>
              <li><strong>Daily Streaks:</strong> Completing tasks consistently increases your streak and gives bonus points!</li>
              <li><strong>Track Progress:</strong> View task history and check your profile for streak details.</li>
            </ul>
          ),
        },
        {
          title: "Earning & Using Points",
          content: (
            <ul>
              <li><strong>How to Earn Points:</strong> Completing tasks grants you points. The harder the task, the more points you earn.</li>
              <li><strong>Spending Points:</strong> Use your points in the <strong>Store</strong> to purchase new pets.</li>
              <li><strong>Not Enough Points?</strong> Keep completing tasks to save up!</li>
            </ul>
          ),
        },
        {
          title: "Store & Inventory",
          content: (
            <ul>
              <li><strong>Store:</strong> The store lets you buy new pets using points.</li>
              <li><strong>Purchasing Items:</strong> Click the "Buy" button and confirm your purchase.</li>
              <li><strong>Inventory:</strong> Items you buy appear in your inventory, where you can equip them.</li>
            </ul>
          ),
        },
        {
          title: "Choosing Pets",
          content: (
            <ul>
              <li><strong>How to Equip a Pet:</strong> Visit your <strong>Inventory</strong>, select a pet, and click "Equip."</li>
              <li><strong>Viewing Your Pet:</strong> Your equipped pet appears on the homepage.</li>
              <li><strong>Switching Pets:</strong> You can swap between pets anytime in your inventory.</li>
            </ul>
          ),
        },
        {
          title: "Profile & Account Settings",
          content: (
            <ul>
              <li><strong>View Profile:</strong> Your profile displays your username and email.</li>
              <li><strong>Track Streaks:</strong> Check your profile to see how long your task streak is.</li>
              <li><strong>Logout:</strong> Click "Logout" in the navigation bar to log out securely.</li>
            </ul>
          ),
        },
        {
          title: "Frequently Asked Questions",
          content: (
            <ul>
              <li><strong>Q: What happens if I forget to complete tasks?</strong><br/>A: Incomplete tasks remain in your list.</li>
              <li><strong>Q: Can I switch my pet later?</strong><br/>A: Yes! You can equip any pet you’ve purchased from the inventory.</li>
              <li><strong>Q: Can I buy multiple pets?</strong><br/>A: Absolutely! Pets you purchase are stored in your inventory, and you can equip them anytime.</li>
              <li><strong>Q: How do I report a bug or suggest a feature?</strong><br/>A: You can reach out via the support section in the app.</li>
            </ul>
          ),
        },
      ].map((section, index) => (
        <div key={index} className="help-section">
          <button className="help-section-title" onClick={() => toggleSection(index)}>
            {section.title}
            <span className={`dropdown-arrow ${openSection === index ? "open" : ""}`}>&#9662;</span>
          </button>
          <div className={`help-content ${openSection === index ? "show" : ""}`}>
            {section.content}
          </div>
        </div>
      ))}

      <footer className="help-footer">
        Thank you for using Pixel Pets! Keep completing tasks and growing your pet collection!
      </footer>
    </div>
  );
};

export default HelpPage;
