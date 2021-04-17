import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import actions from './actions/anecdoteActions';
import AnecdoteForm from './components/AnecdoteForm';
import { asObject } from './reducers/anecdoteReducer';

const App = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();
  const vote = (id) => {
    const action = {
      ...actions.VOTE,
      payload: {
        id,
      },
    };
    dispatch(action);
  };

  const createAnecdote = (anecdote) => {
    const payload = asObject(anecdote);
    const action = {
      ...actions.CREATED,
      payload,
    };
    dispatch(action);
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <AnecdoteForm create={createAnecdote} />
    </div>
  );
};

export default App;
