import React from 'react';
import './styles/TaskList.css';

/**
 * TaskList component to display a list of tasks.
 * @param {Array} tasks - List of tasks.
 * @param {Function} onDelete - Function to handle task deletion.
 * @param {Function} onToggleStatus - Function to handle task status toggle.
 * @returns {JSX.Element}
 */
const TaskList = ({ tasks, onDelete, onToggleStatus }) => {
  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <p>No tasks available. Add a new task to get started!</p>
      ) : (
        tasks.map((task) => (
          <div key={task.id} className="task-item">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p><strong>Due Date:</strong> {task.dueDate}</p>
            <p><strong>Labels:</strong> {task.labels}</p>
            <p><strong>Priority:</strong> {task.priority}</p>
            <p><strong>Status:</strong> {task.status}</p>
            {task.notify && (
              <p><strong>Notification:</strong> {task.notifyDescription} on {task.notifyDate}</p>
            )}
            <button onClick={() => onToggleStatus(task.id)}>
              {task.status === 'pending' ? 'Complete Task' : 'Reopen Task'}
            </button>
            <button onClick={() => onDelete(task.id)}>Delete Task</button>
          </div>
        ))
      )}
    </div>
  );
};

export default TaskList;
