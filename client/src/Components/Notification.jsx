import React from 'react';

const Notification = ({ message, type }) => {
    return (
      <div
        className={`p-4 mb-4 rounded-md ${
          type === 'success' ? 'bg-accent-color text-black' : 'bg-highlight-color text-white'
        }`}
        style ={{color: 'black'}}
      >
        <p>{message}</p>
      </div>
    );
  };
  
export default Notification;