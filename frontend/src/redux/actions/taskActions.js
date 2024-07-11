import axios from 'axios';

/**
 * Action types for task management.
 */
export const TASK_LIST_REQUEST = 'TASK_LIST_REQUEST';
export const TASK_LIST_SUCCESS = 'TASK_LIST_SUCCESS';
export const TASK_LIST_FAIL = 'TASK_LIST_FAIL';

export const TASK_CREATE_REQUEST = 'TASK_CREATE_REQUEST';
export const TASK_CREATE_SUCCESS = 'TASK_CREATE_SUCCESS';
export const TASK_CREATE_FAIL = 'TASK_CREATE_FAIL';

export const TASK_UPDATE_REQUEST = 'TASK_UPDATE_REQUEST';
export const TASK_UPDATE_SUCCESS = 'TASK_UPDATE_SUCCESS';
export const TASK_UPDATE_FAIL = 'TASK_UPDATE_FAIL';

export const TASK_DELETE_REQUEST = 'TASK_DELETE_REQUEST';
export const TASK_DELETE_SUCCESS = 'TASK_DELETE_SUCCESS';
export const TASK_DELETE_FAIL = 'TASK_DELETE_FAIL';

/**
 * Fetches the list of tasks.
 */
export const listTasks = () => async (dispatch) => {
  try {
    dispatch({ type: TASK_LIST_REQUEST });

    const { data } = await axios.get('/api/tasks');

    dispatch({ type: TASK_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: TASK_LIST_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

/**
 * Creates a new task.
 * @param {object} task - The task object.
 */
export const createTask = (task) => async (dispatch) => {
  try {
    dispatch({ type: TASK_CREATE_REQUEST });

    const { data } = await axios.post('/api/tasks', task);

    dispatch({ type: TASK_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: TASK_CREATE_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

/**
 * Updates an existing task.
 * @param {object} task - The task object.
 */
export const updateTask = (task) => async (dispatch) => {
  try {
    dispatch({ type: TASK_UPDATE_REQUEST });

    const { data } = await axios.put(`/api/tasks/${task.id}`, task);

    dispatch({ type: TASK_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: TASK_UPDATE_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

/**
 * Deletes a task.
 * @param {number} taskId - The ID of the task.
 */
export const deleteTask = (taskId) => async (dispatch) => {
  try {
    dispatch({ type: TASK_DELETE_REQUEST });

    await axios.delete(`/api/tasks/${taskId}`);

    dispatch({ type: TASK_DELETE_SUCCESS, payload: taskId });
  } catch (error) {
    dispatch({
      type: TASK_DELETE_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};
