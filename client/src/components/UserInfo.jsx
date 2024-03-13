import React from 'react';

const UserInfo = ({ user, onHandleLogout }) => {
  const handleLogout = () => {
    onHandleLogout();
  };
  return (
    <div style={{ marginBottom: '20px' }}>
      {user.name} logged-in{' '}
      <button type="button" onClick={handleLogout}>
        logout
      </button>
    </div>
  );
};

export default UserInfo;
