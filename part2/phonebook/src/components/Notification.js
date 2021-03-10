import React from 'react';
const Notification = ({ message }) => {
  if (!message || message.status_code === 0) {
    return <></>;
  }

  const className = message.status_code === 200 ? 'sucess' : 'error';
  return <div className={className}>{message.message}</div>;
};

export default Notification;
