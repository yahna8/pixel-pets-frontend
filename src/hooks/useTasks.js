import { useState, useEffect } from 'react';
import { getTasks, getTaskHistory, createTask, completeTask } from '../api/tasks';
import { addPoints } from "../api/points"; 

const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch tasks on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const activeTasks = await getTasks();
        const history = await getTaskHistory();
        setTasks(activeTasks);
        setCompletedTasks(history);
      } catch (err) {
        setError(err.message || 'Failed to fetch tasks');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const addTask = async (newTask) => {
    try {
      const createdTask = await createTask(newTask);
      setTasks((prevTasks) => [...prevTasks, createdTask]);
    } catch (err) {
      setError(err.message || 'Failed to add task');
    }
  };

  const markTaskAsCompleted = async (task) => {
    try {
      await completeTask(task.id); // Mark task as completed
  
      const pointsAwarded = task.priority * 5; // Calculate points based on priority
  
      await addPoints(pointsAwarded); // Add points using the Points API
  
      alert(`Task completed! You earned ${pointsAwarded} points!`);
  
      // ✅ Remove task from active list and update completed tasks
      setTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id));
      setCompletedTasks((prevCompleted) => [...prevCompleted, task]);
    } catch (err) {
      setError(err.message || "Failed to complete task");
    }
  };

  return {
    tasks,
    completedTasks,
    addTask,
    markTaskAsCompleted,
    loading,
    error,
  };
};

export default useTasks;
