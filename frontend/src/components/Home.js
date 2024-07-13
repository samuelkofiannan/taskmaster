import React, { useState } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import './styles/Home.css';

/**
 * Home component that serves as the main container for the TaskForm and TaskList components.
 * Manages the state of the tasks, including adding, updating, and deleting tasks.
 *
 * @returns {JSX.Element} The rendered Home component.
 */
const Home = () => {
  const [tasks, setTasks] = useState([]);

  /**
   * Adds a new task to the tasks state.
   *
   * @param {object} newTask - The new task to be added.
   */
  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  /**
   * Updates an existing task in the tasks state.
   *
   * @param {object} updatedTask - The task with updated details.
   */
  const updateTask = (updatedTask) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
  };

  /**
   * Deletes a task from the tasks state.
   *
   * @param {number} taskId - The ID of the task to be deleted.
   */
  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  /**
   * Toggles the status of a task between 'pending' and 'completed'.
   *
   * @param {number} taskId - The ID of the task to toggle the status for.
   */
  const toggleStatus = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: task.status === 'pending' ? 'completed' : 'pending' } : task
    ));
  };

  return (
    <div className="home-container">
      <TaskForm onSubmit={addTask} onSearch={() => {}} onFilter={() => {}} />
      <TaskList tasks={tasks} onDelete={deleteTask} onToggleStatus={toggleStatus} />
    </div>
  );
};

export default Home;
