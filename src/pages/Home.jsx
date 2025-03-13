import React, { useEffect, useState } from "react";
import useTasks from "../hooks/useTasks";
import axios from "axios";
import "../styles/globals.css"; // Import styles

const BASE_URL = process.env.STORE_API_URL || "http://localhost:8004";

export default function Home() {
  const { tasks, addTask, markTaskAsCompleted } = useTasks();
  const [equippedItem, setEquippedItem] = useState(null);

  useEffect(() => {
    // Disable scrolling when the component mounts
    document.body.classList.add("no-scroll");

    return () => {
      // Re-enable scrolling when leaving the Home page
      document.body.classList.remove("no-scroll");
    };
  }, []);

  useEffect(() => {
    // Fetch the equipped asset
    const fetchEquippedItem = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/inventory/equipped`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
        });

        setEquippedItem(response.data);
      } catch (error) {
        console.error("Error fetching equipped item:", error);
      }
    };

    fetchEquippedItem();
  }, []);

  return (
    <div className="home-background">
      {/* Content Wrapper */}
      <div className="home-content-wrapper">
        
        {/* Equipped Asset (Centered on Homepage) */}
        <div className="equipped-asset-container">
          {equippedItem && equippedItem.image ? (
            <img
              src={`${BASE_URL}${equippedItem.image}`}
              alt={equippedItem.name}
              className="equipped-asset"
            />
          ) : (
            <p>No asset equipped</p>
          )}
        </div>

        {/* To-Do List (Right Side Panel) */}
        <div className="todo-panel-home">
          <h2>To-Do List</h2>
          <ul>
            {tasks.map((task) => (
              <li key={task.id}>
                {task.title}
                <button onClick={() => markTaskAsCompleted(task.id)}>✔</button>
              </li>
            ))}
          </ul>
          <button onClick={() => addTask({ title: "New Task" })}>+ Add Task</button>
        </div>
      </div>
    </div>
  );
}
