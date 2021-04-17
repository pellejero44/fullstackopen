import actions from '../actions/anecdoteActions';

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

const getId = () => (100000 * Math.random()).toFixed(0);

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
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

const initialState = anecdotesAtStart.map(asObject);

export const sortAnecdotesByVotes = (anecdotes) => {
  return [...anecdotes].sort((a, b) => {
    return b.votes - a.votes;
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
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

export default reducer;
