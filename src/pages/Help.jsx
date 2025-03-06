import React, { useState } from "react";
import '../styles/globals.css'; // Ensure styles are imported

const HelpPage = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="help-container">
      <h1 className="help-title">Help - Pet Study Tracker</h1>
      <p className="help-intro">
        Complete tasks, earn points, and customize your virtual pet with rewards!
        Click on a section below to learn more.
      </p>

      {/* Accordion Sections */}
      {[
        {
            title: "Cost & Fees",
            content: (
                <ul>
                <li><strong>Cost:</strong> Pixel Pets is a free-to-use service. Don't worry about hidden fees or anything like that - we are dedicated to providing productivity support at no cost to you!</li>
                </ul>
            ),
            },
        {
          title: "Earning & Using Points",
          content: (
            <ul>
              <li><strong>How to Earn Points:</strong> Complete tasks to earn points. Bigger tasks may grant more points.</li>
              <li><strong>Spending Points:</strong> Use points in the shop to buy new pets, decorations, and accessories.</li>
              <li><strong>Bonus Rewards:</strong> Keep a daily streak to earn bonus points!</li>
            </ul>
          ),
        },
        {
          title: "Customizing Your Pet",
          content: (
            <ul>
              <li><strong>Changing Pets:</strong> Unlock and switch between different pets.</li>
              <li><strong>Decorations & Accessories:</strong> Use points to purchase items for your pet’s environment.</li>
              <li><strong>Pet Mood & Reactions:</strong> Your pet reacts based on your productivity—keep completing tasks to keep it happy!</li>
            </ul>
          ),
        },
        {
          title: "Settings & Account Management",
          content: (
            <ul>
              <li><strong>Profile Settings:</strong> Change your username, pet preferences, and theme.</li>
              <li><strong>Notification Preferences:</strong> Enable or disable reminders for upcoming tasks.</li>
              <li><strong>Reset Progress:</strong> Start fresh by resetting your tasks and points (this cannot be undone).</li>
            </ul>
          ),
        },
        {
            title: "Frequently Asked Questions",
            content: (
              <ul>
                <li><strong>Q: What happens if I forget to complete tasks?</strong> A: Incomplete tasks will remain in your list, but missing deadlines may affect streaks.</li>
                <li><strong>Q: Can I switch my pet later?</strong> A: Yes! You can unlock new pets and change them at any time.</li>
                <li><strong>Q: Are there different difficulty levels for tasks?</strong> A: Yes! You can assign difficulty levels, and harder tasks grant more points.</li>
                <li><strong>Q: How do I report a bug or suggest a feature?</strong> A: Contact us through the support section in the app.</li>
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

      <footer className="help-footer">Thank you for choosing Pixel Pets to help you in your productivity journey!</footer>
    </div>
  );
};

export default HelpPage;
