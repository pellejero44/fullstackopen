import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Notification from './components/Notification';
import Filter from './components/Filter';
import { anecdotesService } from './services/anecotes';
import { initAnecdotes } from './reducers/anecdoteReducer';

const App = (props) => {
  useEffect(() => {
    anecdotesService.getAll().then((anecdotes) => {
      props.initAnecdotes(anecdotes);
    });
  }, [props]);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default connect(null, { initAnecdotes })(App);
