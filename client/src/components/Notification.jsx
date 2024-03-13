import React from 'react'
import propTypes from 'prop-types'

const Notification = ({ message }) => {
  const msgStyle = {
    background: 'lightgrey',
    padding: '0 10px',
    borderStyle: 'solid',
    borderRadius: 5,
    color: message && message.type === 'error' ? 'red' : 'green',
    fontSize: '20',
    marginBottom: '10',
  }

  return (
    <div style={msgStyle}>
      <h2>{message.msg}</h2>
    </div>
  )
}

Notification.propTypes = {
  message: propTypes.object.isRequired,
}

export default Notification
