import actions from '../actions/anecdoteActions';

const getId = () => (100000 * Math.random()).toFixed(0);

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

export const initAnecdotes = payload => {
  return {
    ...actions.INIT,
    payload,
  };
};

export const createAnecdote = (content) => {
  const payload = asObject(content);
  return {
    ...actions.CREATED,
    payload,
  };
};

export const voteAnedote = (id) => {
  return {
    ...actions.VOTE,
    payload: {
      id,
    },
  };
};

export const sortAnecdotesByVotes = (anecdotes) => {
  return [...anecdotes].sort((a, b) => {
    return b.votes - a.votes;
  });
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
            ...anecdote,
            votes: anecdote.votes + 1,
          };
        }
        return anecdote;
      });
    default:
      return state;
  }
};

export default anecdoteReducer;
