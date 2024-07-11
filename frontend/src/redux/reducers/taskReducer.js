import {
  TASK_LIST_REQUEST,
  TASK_LIST_SUCCESS,
  TASK_LIST_FAIL,
  TASK_CREATE_REQUEST,
  TASK_CREATE_SUCCESS,
  TASK_CREATE_FAIL,
  TASK_UPDATE_REQUEST,
  TASK_UPDATE_SUCCESS,
  TASK_UPDATE_FAIL,
  TASK_DELETE_REQUEST,
  TASK_DELETE_SUCCESS,
  TASK_DELETE_FAIL,
} from '../actions/taskActions';

/**
 * Initial state for the task reducer.
 */
const taskInitialState = {
  tasks: [],
  loading: false,
  error: null,
};

/**
 * Task reducer to handle task management actions.
 */
const taskReducer = (state = taskInitialState, action) => {
  switch (action.type) {
    case TASK_LIST_REQUEST:
    case TASK_CREATE_REQUEST:
    case TASK_UPDATE_REQUEST:
    case TASK_DELETE_REQUEST:
      return { ...state, loading: true };

    case TASK_LIST_SUCCESS:
      return { ...state, loading: false, tasks: action.payload, error: null };

    case TASK_CREATE_SUCCESS:
      return { ...state, loading: false, tasks: [...state.tasks, action.payload], error: null };

    case TASK_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: state.tasks.map((task) => (task.id === action.payload.id ? action.payload : task)),
        error: null,
      };

    case TASK_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
        error: null,
      };

    case TASK_LIST_FAIL:
    case TASK_CREATE_FAIL:
    case TASK_UPDATE_FAIL:
    case TASK_DELETE_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default taskReducer;
