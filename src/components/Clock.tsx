import React, { useState, useEffect } from 'react';
import './Clock.css';

const Clock: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(timerId);
  }, []);

  return (
    <div className="clock">
      <h1 className="display-1">{currentTime.toLocaleTimeString()}</h1>
    </div>
  );
};

export default Clock;
