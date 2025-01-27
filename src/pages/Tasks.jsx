import React, { useState } from 'react';
import useTasks from '../hooks/useTasks';

const Tasks = () => {
  const {
    tasks,
    completedTasks,
    addTask,
    markTaskAsCompleted,
    loading,
    error,
  } = useTasks();

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 1,
    deadline: '',
  });

  const handleInputChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    addTask(newTask);
    setNewTask({ title: '', description: '', priority: 1, deadline: '' });
  };

  return (
    <div>
      <h1>Tasks</h1>
      {loading && <p>Loading tasks...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleAddTask}>
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
        ></textarea>
        <input
          type="number"
          name="priority"
          placeholder="Priority"
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
        <button type="submit">Add Task</button>
      </form>

      <h2>Active Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Priority: {task.priority}</p>
            <p>Deadline: {task.deadline}</p>
            <button onClick={() => markTaskAsCompleted(task.id)}>Mark as Completed</button>
          </li>
        ))}
      </ul>

      <h2>Completed Tasks</h2>
      <ul>
        {completedTasks.map((task) => (
          <li key={task.id}>
            <h3>{task.title}</h3>
            <p>Completed On: {task.completion_date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;