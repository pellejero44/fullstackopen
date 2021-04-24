import React from 'react';
import { connect } from 'react-redux';
import { deleteNotification } from '../reducers/notificationReducer'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };

  if (props.notification === '') {
    return null;
  } else {
    setTimeout(() => {
      props.deleteNotification();
    }, 3000);
  }

  return <div style={style}>{props.notification}</div>;
};

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  };
};

const mapDispatchToProps = {deleteNotification}

const ConnectedNotification = connect(
  mapStateToProps,
  mapDispatchToProps
  )(Notification);
export default ConnectedNotification;
