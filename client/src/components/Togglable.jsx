import React, { useState, forwardRef, useImperativeHandle } from 'react';

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(true);

  const show = { display: visible ? '' : 'none' };
  const hide = { display: visible ? 'none' : '' };

  const toggleVisible = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisible,
    };
  });

  return (
    <div>
      <div style={show}>
        <button onClick={toggleVisible}>Create new blog</button>
      </div>
      <div style={hide}>
        {props.children} <button onClick={toggleVisible}>Cancel</button>
      </div>
    </div>
  );
});

export default Togglable;
