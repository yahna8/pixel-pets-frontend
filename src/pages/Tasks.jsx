import React, { useState } from 'react';
import useTasks from '../hooks/useTasks';

const Tasks = () => {
  const { tasks, addTask, markTaskAsCompleted } = useTasks();

  // State for form visibility and task input
  const [isAdding, setIsAdding] = useState(false);
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
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className="task-item">
              {task.title}
              <button onClick={() => markTaskAsCompleted(task.id)}>✔</button>
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
            <input
              type="number"
              name="priority"
              placeholder="Priority (1-5)"
              value={newTask.priority}
              onChange={handleInputChange}
              required
            />
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