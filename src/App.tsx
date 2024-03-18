// @ts-nocheck

import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useToasts } from 'react-toast-notifications';
import './App.css';

function App() {
  const [task, setTask] = useState('');
  const [expiryTime, setExpiryTime] = useState('');
  const { addToast } = useToasts();

  const handleTaskChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTask(event.target.value);
  };

  const handleExpiryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExpiryTime(event.target.value);
  };

  const handleSaveTask = () => {
    if (!task || !expiryTime) {
      addToast('Please enter a task and expiry time.', { appearance: 'error' });
      return;
    }

    Cookies.set('task', task, { expires: new Date(expiryTime) });
    addToast('Task saved successfully.', { appearance: 'success' });

    // Schedule notification
    const expiryTimestamp = new Date(expiryTime).getTime();
    const currentTime = new Date().getTime();
    const timeUntilExpiry = expiryTimestamp - currentTime;

    setTimeout(() => {
      addToast(`Task "${task}" is due now!`, { appearance: 'info' });
    }, timeUntilExpiry);
  };

  return (
    <div className="container">
      <h1>Task Reminder App</h1>
      <div className="form-group">
        <label htmlFor="task">Task:</label>
        <input type="text" id="task" value={task} onChange={handleTaskChange} />
      </div>
      <div className="form-group">
        <label htmlFor="expiry">Expiry Time:</label>
        <input type="datetime-local" id="expiry" value={expiryTime} onChange={handleExpiryChange} />
      </div>
      <button className="save-button" onClick={handleSaveTask}>Save Task</button>
    </div>
  );
}

export default App;
