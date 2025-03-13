import React, { useState } from 'react';
import useTasks from '../hooks/useTasks';

const Tasks = () => {
  const { tasks, addTask, markTaskAsCompleted } = useTasks();

  // State for form visibility and task input
  const [isAdding, setIsAdding] = useState(false);
  const [expandedTask, setExpandedTask] = useState(null); 
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 1,
    deadline: '',
  });

  // Handle input changes in the form
  const handleInputChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const toggleTaskDetails = (taskId) => {
    setExpandedTask(expandedTask === taskId ? null : taskId);
  };

  // Submit the form and send task data to the API
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return; // Ensure title is not empty

    addTask(newTask); // Send request to API
    setNewTask({ title: '', description: '', priority: 1, deadline: '' }); // Reset form
    setIsAdding(false); // Close form after submission
  };

  return (
    <div className="tasks-page">
      <div className="tasks-card">
        <h2>Tasks</h2>
        {/* Active Task List */}
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className="task-item" onClick={() => toggleTaskDetails(task.id)}>
              {task.title} {expandedTask === task.id ? "▲" : "▼"}

              {expandedTask === task.id && (
                <div className="task-details">
                  <p><strong>Description:</strong> {task.description || "No description"}</p>
                  <p><strong>Due Date:</strong> {task.deadline || "No deadline"}</p>
                  <p><strong>Difficulty:</strong> {task.priority}/5</p>
                  <button className="complete-task-button" onClick={() => markTaskAsCompleted(task.id)}>✔ Complete Task</button>
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Add Task Button */}
        {!isAdding && (
          <button className="add-task" onClick={() => setIsAdding(true)}>
            + Add Task
          </button>
        )}

        {/* Task Creation Form */}
        {isAdding && (
          <form className="task-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Task Title"
              value={newTask.title}
              onChange={handleInputChange}
              required
            />
            <textarea
              name="description"
              placeholder="Task Description"
              value={newTask.description}
              onChange={handleInputChange}
            />
            
            {/* ✅ Change "Priority" to "Difficulty" */}
            <label htmlFor="difficulty">Difficulty:</label>
            <select
              id="difficulty"
              name="priority"
              value={newTask.priority}
              onChange={handleInputChange}
              required
            >
              <option value="1">Easy (1 point)</option>
              <option value="2">Medium (2 points)</option>
              <option value="3">Hard (3 points)</option>
              <option value="4">Very Hard (4 points)</option>
              <option value="5">Extreme (5 points)</option>
            </select>

            <input
              type="date"
              name="deadline"
              value={newTask.deadline}
              onChange={handleInputChange}
              required
            />
            <button type="submit">Create Task</button>
            <button type="button" onClick={() => setIsAdding(false)}>
              Cancel
            </button>
          </form>
        )}

        

      </div>
    </div>
  );
};

export default Tasks;
