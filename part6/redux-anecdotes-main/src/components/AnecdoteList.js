import React from 'react';
import { voteAnedote } from '../reducers/anecdoteReducer';
import { connect } from 'react-redux';

const AnecdoteList = (props) => {
  const vote = (id) => {
    props.voteAnedote(id);
  };

  return (
    <div>
      {props.anecdotesSortedByVotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

const sortAnecdotesByVotes = (anecdotes) => {
  return [...anecdotes].sort((a, b) => {
    return b.votes - a.votes;
  });
};

const mapStateToProps = (state) => {
  return {
    anecdotesSortedByVotes: sortAnecdotesByVotes(state),
  };
};

const mapDispatchToProps = { voteAnedote };

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList);
export default ConnectedAnecdoteList;
