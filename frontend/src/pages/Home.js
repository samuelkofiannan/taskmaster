import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './styles/Home.css';

/**
 * Home page component.
 * Displays the user's tasks and allows management (view, edit, delete).
 * Includes functionality for searching, filtering tasks, and navigating to add/edit tasks.
 * 
 * @returns {JSX.Element} The rendered Home page component.
 */
const Home = () => {
  const [tasks, setTasks] = useState([]); // State to manage the list of tasks
  const [searchTerm, setSearchTerm] = useState(''); // State to manage search input
  const [filteredTasks, setFilteredTasks] = useState([]); // State to manage filtered tasks
  const [selectedTask, setSelectedTask] = useState(null); // State to manage the currently selected task
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); // State to manage delete confirmation dialog
  const [taskToDelete, setTaskToDelete] = useState(null); // State to manage task to delete

  const navigate = useNavigate(); // Hook for programmatic navigation

  /**
   * Fetches tasks from the backend on component mount.
   */
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('/api/tasks');
        setTasks(response.data);
        setFilteredTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error.message);
      }
    };

    fetchTasks();
  }, []);

  /**
   * Handles search input change and filters tasks based on search term.
   * 
   * @param {React.ChangeEvent<HTMLInputElement>} event - The input change event.
   */
  const handleSearchChange = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    if (term) {
      setFilteredTasks(tasks.filter(task => 
        task.title.toLowerCase().includes(term)
      ));
    } else {
      setFilteredTasks(tasks);
    }
  };

  /**
   * Handles task selection and displays details.
   * 
   * @param {Object} task - The selected task object.
   */
  const handleTaskClick = (task) => {
    setSelectedTask(task === selectedTask ? null : task); // Toggle task details
  };

  /**
   * Handles navigation to the Add Task page.
   */
  const handleAddTask = () => {
    navigate('/add-task'); // Redirect to Add Task page
  };

  /**
   * Handles navigation to the Edit Task page.
   * 
   * @param {Object} task - The task to be edited.
   */
  const handleEditTask = (task) => {
    navigate(`/edit-task/${task._id}`); // Redirect to Edit Task page
  };

  /**
   * Handles task deletion.
   * 
   * @param {Object} task - The task to be deleted.
   */
  const handleDeleteTask = (task) => {
    setTaskToDelete(task);
    setShowDeleteConfirm(true); // Show delete confirmation dialog
  };

  /**
   * Confirms deletion of a task.
   */
  const confirmDelete = async () => {
    try {
      await axios.delete(`/api/tasks/${taskToDelete._id}`);
      setTasks(tasks.filter(task => task._id !== taskToDelete._id));
      setFilteredTasks(filteredTasks.filter(task => task._id !== taskToDelete._id));
      setShowDeleteConfirm(false);
      setTaskToDelete(null);
    } catch (error) {
      console.error('Error deleting task:', error.message);
    }
  };

  /**
   * Cancels the delete action.
   */
  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setTaskToDelete(null);
  };

  return (
    <div className="home-container">
      <Header />
      <div className="home-content">
        <div className="search-filter">
          <input
            type="text"
            placeholder="Search & filter"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button onClick={handleAddTask}>Add Task</button>
        </div>

        <div className="task-list">
          {filteredTasks.map(task => (
            <div key={task._id} className="task-item">
              <div
                className="task-title"
                onClick={() => handleTaskClick(task)}
              >
                {task.title}
                {selectedTask && selectedTask._id === task._id && (
                  <div className="task-details">
                    <p>Description: {task.description}</p>
                    <p>Status: {task.status}</p>
                    <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
                    <p>Notification: {task.notification ? 'Enabled' : 'Disabled'}</p>
                    <button onClick={() => handleEditTask(task)}>
                      Edit <span className="icon">✎</span>
                    </button>
                    <button onClick={() => handleDeleteTask(task)}>
                      Delete <span className="icon">🗑️</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {showDeleteConfirm && (
          <div className="delete-confirm">
            <p>Are you sure you want to delete this task?</p>
            <button onClick={confirmDelete}>Confirm</button>
            <button onClick={cancelDelete}>Cancel</button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
