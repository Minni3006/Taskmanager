import { useState, useEffect, useCallback } from 'react';
import { fetchTasks, createTask, updateTask, deleteTask } from '../api/tasks';
import toast from 'react-hot-toast';

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await fetchTasks();
      setTasks(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const addTask = async (taskData) => {
    const { data } = await createTask(taskData);
    setTasks((prev) => [data, ...prev]);
    toast.success('Task created!');
    return data;
  };

  const editTask = async (id, taskData) => {
    const { data } = await updateTask(id, taskData);
    setTasks((prev) => prev.map((t) => (t._id === id ? data : t)));
    toast.success('Task updated!');
    return data;
  };

  const removeTask = async (id) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t._id !== id));
    toast.success('Task deleted!');
  };

  const toggleStatus = async (task) => {
    const newStatus = task.status === 'completed' ? 'pending' : 'completed';
    await editTask(task._id, { ...task, status: newStatus });
  };

  return { tasks, loading, error, addTask, editTask, removeTask, toggleStatus, reload: loadTasks };
};
