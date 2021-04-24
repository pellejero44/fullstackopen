import actions from '../actions/anecdoteActions';
import { anecdotesService } from '../services/anecotes';

const getId = () => (100000 * Math.random()).toFixed(0);

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

export const initAnecdotes = () => {
  return async (dispatch) => {
    const payload = await anecdotesService.getAll();

    dispatch({
      ...actions.INIT,
      payload,
    });
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = asObject(content);
    const payload = await anecdotesService.create(anecdote);

    dispatch({
      ...actions.CREATED,
      payload,
    });
  };
};

export const voteAnedote = (id) => {
  return async (dispatch) => {
    const payload = await anecdotesService.vote(id);
    dispatch({
      ...actions.VOTE,
      payload
    });
  };
};

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case actions.INIT.type:
      return action.payload;
    case actions.CREATED.type:
      return [...state, action.payload];
    case actions.VOTE.type:
      return state.map((anecdote) => {
        if (anecdote.id === action.payload.id) {
          return {
            ...action.payload
          };
        }
        return anecdote;
      });
    default:
      return state;
  }
};

export default anecdoteReducer;
