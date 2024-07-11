import React, { useState, useEffect } from 'react';
import './styles/EditTask.css';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useParams, useNavigate } from 'react-router-dom';

/**
 * EditTask component for editing an existing task.
 * Fetches the task details from the API using the task ID from the URL parameters.
 * Provides a form to edit the task details and save the changes.
 * 
 * @returns {JSX.Element} The rendered EditTask component.
 */
const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'Low',
    status: 'Pending',
    notification: false,
    notificationDate: '',
    notificationTime: '',
  });

  const [showDropdown, setShowDropdown] = useState({
    dueDate: false,
    priority: false,
    status: false,
    notification: false,
  });

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`/api/tasks/${id}`);
        setTask(response.data);
      } catch (error) {
        console.error('Error fetching the task', error);
      }
    };

    fetchTask();
  }, [id]);

  /**
   * Handle input changes for form fields.
   * @param {object} e - Event object for input change.
   */
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  /**
   * Handle form submission for saving the task.
   * @param {object} e - Event object for form submission.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/tasks/${id}`, task);
      navigate('/home');
    } catch (error) {
      console.error('Error updating the task', error);
    }
  };

  /**
   * Handle cancellation of task editing.
   */
  const handleCancel = () => {
    navigate('/home');
  };

  /**
   * Toggle the visibility of dropdowns for due date, priority, status, and notification.
   * @param {string} field - Field to toggle the dropdown visibility for.
   */
  const toggleDropdown = (field) => {
    setShowDropdown((prevShowDropdown) => ({
      ...prevShowDropdown,
      [field]: !prevShowDropdown[field],
    }));
  };

  return (
    <div className="edit-task-container">
      <Header />
      <div className="edit-task-content">
        <h2>Edit Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={task.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={task.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="clickable-group">
            <div className="clickable" onClick={() => toggleDropdown('dueDate')}>
              Due Date: {task.dueDate}
              {showDropdown.dueDate && (
                <div className="dropdown">
                  <input
                    type="date"
                    name="dueDate"
                    value={task.dueDate}
                    onChange={handleInputChange}
                  />
                </div>
              )}
            </div>
            <div className="clickable" onClick={() => toggleDropdown('priority')}>
              Priority: {task.priority}
              {showDropdown.priority && (
                <div className="dropdown priority-options">
                  {['High', 'Medium', 'Low'].map((level) => (
                    <div
                      key={level}
                      className={`priority ${level.toLowerCase()}`}
                      onClick={() => setTask({ ...task, priority: level })}
                    >
                      {level}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="clickable" onClick={() => toggleDropdown('status')}>
              Status: {task.status}
              {showDropdown.status && (
                <div className="dropdown status-options">
                  {['Pending', 'Completed'].map((status) => (
                    <div
                      key={status}
                      className={`status ${status.toLowerCase()}`}
                      onClick={() => setTask({ ...task, status })}
                    >
                      {status}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="clickable" onClick={() => toggleDropdown('notification')}>
              Notification: {task.notification ? 'On' : 'Off'}
              {showDropdown.notification && (
                <div className="dropdown notification-settings">
                  <label>
                    <input
                      type="checkbox"
                      name="notification"
                      checked={task.notification}
                      onChange={handleInputChange}
                    />
                    Enable Notification
                  </label>
                  {task.notification && (
                    <>
                      <label htmlFor="notificationDate">Date:</label>
                      <input
                        type="date"
                        id="notificationDate"
                        name="notificationDate"
                        value={task.notificationDate}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="notificationTime">Time:</label>
                      <input
                        type="time"
                        id="notificationTime"
                        name="notificationTime"
                        value={task.notificationTime}
                        onChange={handleInputChange}
                      />
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="form-buttons">
            <button type="submit">Save</button>
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default EditTask;
