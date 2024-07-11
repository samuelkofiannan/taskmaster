import axios from 'axios';

/**
 * Action types for user authentication.
 */
export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAIL = 'USER_LOGIN_FAIL';
export const USER_LOGOUT = 'USER_LOGOUT';

/**
 * Action types for user registration.
 */
export const USER_REGISTER_REQUEST = 'USER_REGISTER_REQUEST';
export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS';
export const USER_REGISTER_FAIL = 'USER_REGISTER_FAIL';

/**
 * Logs in the user.
 * @param {string} username - The username.
 * @param {string} password - The password.
 */
export const login = (username, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const { data } = await axios.post('/api/auth/login', { username, password });

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

/**
 * Registers a new user.
 * @param {string} username - The username.
 * @param {string} email - The email.
 * @param {string} password - The password.
 */
export const register = (username, email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const { data } = await axios.post('/api/auth/register', { username, email, password });

    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

/**
 * Logs out the user.
 */
export const logout = () => (dispatch) => {
  dispatch({ type: USER_LOGOUT });
};
