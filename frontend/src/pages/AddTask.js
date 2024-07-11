import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './styles/AddTask.css';

/**
 * AddTask page component.
 * Allows users to add a new task with title, description, due date, priority, status, and notification settings.
 * Includes save and cancel buttons.
 * 
 * @returns {JSX.Element} The rendered AddTask page component.
 */
const AddTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [status, setStatus] = useState('Pending');
  const [notification, setNotification] = useState(false);
  const [notificationDate, setNotificationDate] = useState('');
  const [notificationTime, setNotificationTime] = useState('');
  const [showDueDate, setShowDueDate] = useState(false);
  const [showPriority, setShowPriority] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const navigate = useNavigate(); // Hook for programmatic navigation

  /**
   * Handles the form submission for adding a new task.
   * 
   * @param {React.FormEvent<HTMLFormElement>} event - The form submission event.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    const newTask = {
      title,
      description,
      dueDate,
      priority,
      status,
      notification,
      notificationDate,
      notificationTime
    };

    try {
      await axios.post('/api/tasks', newTask);
      navigate('/home'); // Redirect to Home page
    } catch (error) {
      console.error('Error adding task:', error.message);
    }
  };

  /**
   * Handles the cancel button click event.
   */
  const handleCancel = () => {
    navigate('/home'); // Redirect to Home page
  };

  return (
    <div className="add-task-container">
      <Header />
      <div className="add-task-content">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="clickable-group">
            <div
              className="clickable"
              onClick={() => setShowDueDate(!showDueDate)}
            >
              Due Date
              {showDueDate && (
                <div className="dropdown">
                  <label htmlFor="dueDate">Select Due Date:</label>
                  <input
                    type="date"
                    id="dueDate"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </div>
              )}
            </div>

            <div
              className="clickable"
              onClick={() => setShowPriority(!showPriority)}
            >
              Priority
              {showPriority && (
                <div className="dropdown">
                  <label htmlFor="priority">Select Priority:</label>
                  <div className="priority-options">
                    <span
                      className={`priority high ${priority === 'High' ? 'selected' : ''}`}
                      onClick={() => setPriority('High')}
                    >
                      High
                    </span>
                    <span
                      className={`priority medium ${priority === 'Medium' ? 'selected' : ''}`}
                      onClick={() => setPriority('Medium')}
                    >
                      Medium
                    </span>
                    <span
                      className={`priority low ${priority === 'Low' ? 'selected' : ''}`}
                      onClick={() => setPriority('Low')}
                    >
                      Low
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div
              className="clickable"
              onClick={() => setShowStatus(!showStatus)}
            >
              Status
              {showStatus && (
                <div className="dropdown">
                  <label htmlFor="status">Select Status:</label>
                  <div className="status-options">
                    <span
                      className={`status pending ${status === 'Pending' ? 'selected' : ''}`}
                      onClick={() => setStatus('Pending')}
                    >
                      Pending
                    </span>
                    <span
                      className={`status completed ${status === 'Completed' ? 'selected' : ''}`}
                      onClick={() => setStatus('Completed')}
                    >
                      Completed
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div
              className="clickable"
              onClick={() => setShowNotification(!showNotification)}
            >
              Notification
              {showNotification && (
                <div className="dropdown">
                  <label htmlFor="notification">Enable Notification:</label>
                  <input
                    type="checkbox"
                    id="notification"
                    checked={notification}
                    onChange={(e) => setNotification(e.target.checked)}
                  />
                  {notification && (
                    <div className="notification-settings">
                      <label htmlFor="notificationDate">Select Date:</label>
                      <input
                        type="date"
                        id="notificationDate"
                        value={notificationDate}
                        onChange={(e) => setNotificationDate(e.target.value)}
                      />
                      <label htmlFor="notificationTime">Select Time:</label>
                      <input
                        type="time"
                        id="notificationTime"
                        value={notificationTime}
                        onChange={(e) => setNotificationTime(e.target.value)}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="form-buttons">
            <button type="submit">Save</button>
            <button type="button" onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default AddTask;
