import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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

          <div className="form-group">
            <label htmlFor="dueDate">Due Date:</label>
            <input
              type="date"
              id="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="priority">Priority:</label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              required
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="status">Status:</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="form-group">
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

          <div className="form-buttons">
            <button type="submit">Save</button>
            <button type="button" onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
