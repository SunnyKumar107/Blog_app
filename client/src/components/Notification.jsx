import React from 'react';

const Notification = (props) => {
  const message = props.message;

  return (
    <div className="notification">
      <h2>{message}</h2>
    </div>
  );
};

export default Notification;
