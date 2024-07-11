import React, { useState } from 'react';
import './styles/TaskForm.css';

/**
 * TaskForm component for adding and managing tasks.
 * @param {Function} onSubmit - Function to handle task submission.
 * @param {Function} onSearch - Function to handle task search.
 * @param {Function} onFilter - Function to handle task filtering.
 * @returns {JSX.Element}
 */
const TaskForm = ({ onSubmit, onSearch, onFilter }) => {
  const [task, setTask] = useState({
    id: '',
    title: '',
    description: '',
    dueDate: '',
    labels: '',
    priority: 'medium',
    status: 'pending',
    createdAt: '',
    updatedAt: '',
    notify: false,
    notifyDescription: '',
    notifyDate: '',
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    priority: '',
    dueDate: '',
    labels: '',
  });

  /**
   * Handle input changes for task form.
   * @param {Object} e - Event object.
   */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTask({
      ...task,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  /**
   * Handle form submission to add a task.
   * @param {Object} e - Event object.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...task, id: new Date().getTime().toString(), createdAt: new Date().toISOString() });
    setTask({
      id: '',
      title: '',
      description: '',
      dueDate: '',
      labels: '',
      priority: 'medium',
      status: 'pending',
      createdAt: '',
      updatedAt: '',
      notify: false,
      notifyDescription: '',
      notifyDate: '',
    });
  };

  /**
   * Handle search input changes.
   * @param {Object} e - Event object.
   */
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  /**
   * Handle filter input changes.
   * @param {Object} e - Event object.
   */
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
    onFilter(name, value);
  };

  return (
    <div className="task-form-container">
      <form className="task-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={task.dueDate}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Labels</label>
          <input
            type="text"
            name="labels"
            value={task.labels}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Priority</label>
          <select name="priority" value={task.priority} onChange={handleChange}>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
        <div className="form-group">
          <label>Status</label>
          <select name="status" value={task.status} onChange={handleChange}>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="form-group">
          <label>Notify Me</label>
          <input
            type="checkbox"
            name="notify"
            checked={task.notify}
            onChange={handleChange}
          />
        </div>
        {task.notify && (
          <div className="form-group">
            <label>Notification Description</label>
            <input
              type="text"
              name="notifyDescription"
              value={task.notifyDescription}
              onChange={handleChange}
            />
            <label>Notification Date</label>
            <input
              type="date"
              name="notifyDate"
              value={task.notifyDate}
              onChange={handleChange}
            />
          </div>
        )}
        <button type="submit">Add Task</button>
      </form>
      <div className="task-search-filter">
        <input
          type="text"
          placeholder="Search tasks"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <select name="priority" value={filters.priority} onChange={handleFilterChange}>
          <option value="">All Priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <input
          type="date"
          name="dueDate"
          value={filters.dueDate}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          placeholder="Filter by labels"
          name="labels"
          value={filters.labels}
          onChange={handleFilterChange}
        />
      </div>
    </div>
  );
};

export default TaskForm;
