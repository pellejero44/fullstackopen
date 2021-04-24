import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import anecdoteReducer from './reducers/anecdoteReducer';
import notificationReduces from './reducers/notificationReducer';
import filterReducer from './reducers/filterReducer';


const reducer = combineReducers({
  notification: notificationReduces,
  anecdotes: anecdoteReducer,
  filter: filterReducer,
});

const store = createStore(reducer, composeWithDevTools());

export default store;
