import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
} from '../actions/userActions';

/**
 * Initial state for the user reducer.
 */
const userInitialState = {
  userInfo: null,
  loading: false,
  error: null,
};

/**
 * User reducer to handle user authentication and registration actions.
 */
const userReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
    case USER_REGISTER_REQUEST:
      return { ...state, loading: true };

    case USER_LOGIN_SUCCESS:
    case USER_REGISTER_SUCCESS:
      return { ...state, loading: false, userInfo: action.payload, error: null };

    case USER_LOGIN_FAIL:
    case USER_REGISTER_FAIL:
      return { ...state, loading: false, error: action.payload };

    case USER_LOGOUT:
      return { ...state, userInfo: null, error: null };

    default:
      return state;
  }
};

export default userReducer;
