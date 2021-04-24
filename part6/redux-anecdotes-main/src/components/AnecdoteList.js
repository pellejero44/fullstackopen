import React from 'react';
import { voteAnedote } from '../reducers/anecdoteReducer';
import { createNotification } from '../reducers/notificationReducer';
import { connect } from 'react-redux';

const AnecdoteList = (props) => {
  const vote = (id, content) => {
    props.voteAnedote(id);
    props.createNotification(`you voted '${content}'`, 10);
  };

  return (
    <div>
      {props.anecdotesSortedByVotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

const sortAnecdotesByVotes = ({ anecdotes, filter }) => {
  const anecdotesSorted = [...anecdotes].sort((a, b) => {
    return b.votes - a.votes;
  });

  if (filter === '') {
    return anecdotesSorted;
  } else {
    return anecdotesSorted.filter((e) =>
      e.content.toLowerCase().includes(filter.toLowerCase())
    );
  }
};

const mapStateToProps = (state) => {
  return {
    anecdotesSortedByVotes: sortAnecdotesByVotes(state),
  };
};

const mapDispatchToProps = { voteAnedote, createNotification };

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList);
export default ConnectedAnecdoteList;
