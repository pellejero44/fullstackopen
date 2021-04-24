import React from 'react';
import { voteAnedote } from '../reducers/anecdoteReducer';
import { createNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux';

const AnecdoteList = (props) => {
  const vote = (id, content) => {
    props.voteAnedote(id);
    props.createNotification(`you voted '${content}'`)
  };

  return (
    <div>
      {props.anecdotesSortedByVotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

const sortAnecdotesByVotes = ({anecdotes}) => {
  return [...anecdotes].sort((a, b) => {
    return b.votes - a.votes;
  });
};

const mapStateToProps = (state) => {
  return {
    anecdotesSortedByVotes: sortAnecdotesByVotes(state),
  };
};

const mapDispatchToProps = { voteAnedote, createNotification }

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList);
export default ConnectedAnecdoteList;
