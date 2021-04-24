import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import anecdoteReducer from './reducers/anecdoteReducer';
import notificationReduces from './reducers/notificationReducer';


const reducer = combineReducers({
  notification: notificationReduces,
  anecdotes: anecdoteReducer
})


const store = createStore(reducer, composeWithDevTools());

export default store;
