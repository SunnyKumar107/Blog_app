import React from 'react';

const Notification = ({ message }) => {
  const msgStyle = {
    background: 'lightgrey',
    padding: '0 10px',
    borderStyle: 'solid',
    borderRadius: 5,
    color: message && message.type === 'error' ? 'red' : 'green',
    fontSize: '20',
    marginBottom: '10',
  };

  return (
    <div style={msgStyle}>
      <h2>{message.msg}</h2>
    </div>
  );
};

export default Notification;
