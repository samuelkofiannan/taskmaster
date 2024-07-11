import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import userReducer from './reducers/userReducer';
import taskReducer from './reducers/taskReducer';

/**
 * Combines all the reducers into a single root reducer.
 */
const rootReducer = combineReducers({
  user: userReducer,
  tasks: taskReducer,
});

/**
 * Creates the Redux store with middleware and dev tools.
 */
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
