import { useState, useEffect } from 'react';
import { getTasks, getTaskHistory, createTask, completeTask } from '../api/tasks';
import { addPoints } from '../api/points';

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

  const markTaskAsCompleted = async (taskId) => {
    try {
      const updatedTask = await completeTask(taskId);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      setCompletedTasks((prevCompleted) => [...prevCompleted, updatedTask]);

      // Award 10 points for completing a task
      await addPoints(10);
    } catch (err) {
      setError(err.message || 'Failed to complete task');
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
