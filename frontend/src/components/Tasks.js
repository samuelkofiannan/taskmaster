import React, { useState, useEffect } from 'react';
import { getTasks, addTask, updateTask, deleteTask } from '../api/tasks';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token'); // Assume token is stored in local storage
      const data = await getTasks(token);
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Assume token is stored in local storage
      const task = { title: newTask }; // Adjust task structure as needed
      await addTask(task, token);
      fetchTasks(); // Refresh task list
      setNewTask('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleUpdateTask = async (id, updatedTask) => {
    try {
      const token = localStorage.getItem('token'); // Assume token is stored in local storage
      await updateTask(id, updatedTask, token);
      fetchTasks(); // Refresh task list
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      const token = localStorage.getItem('token'); // Assume token is stored in local storage
      await deleteTask(id, token);
      fetchTasks(); // Refresh task list
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          required
        />
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.title}
            <button onClick={() => handleUpdateTask(task._id, { title: 'Updated Task' })}>
              Update
            </button>
            <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
