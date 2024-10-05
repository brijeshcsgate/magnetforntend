import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const UserSessionTracker = ({ userId }) => {
  const [socket, setSocket] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    newSocket.emit('start_session', { userId });

    newSocket.on('session_started', ({ sessionId }) => {
      setSessionId(sessionId);
      setStartTime(new Date());
    });

    newSocket.on('session_ended', () => {
      setEndTime(new Date());
    });

    return () => {
      if (sessionId) {
        newSocket.emit('end_session', { sessionId });
      }
      newSocket.disconnect();
    };
  }, [userId]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (socket && sessionId) {
        socket.emit('end_session', { sessionId });
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [socket, sessionId]);

  return (
    <div>
      <h2>User Session Tracker</h2>
      <p>User ID: {userId}</p>
      <p>Session Start Time: {startTime ? startTime.toLocaleString() : 'Not started'}</p>
      <p>Session End Time: {endTime ? endTime.toLocaleString() : 'Not ended'}</p>
    </div>
  );
};

export default UserSessionTracker;
