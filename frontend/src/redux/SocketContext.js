// socketContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { BASE_URL } from '..'; // Assuming BASE_URL is defined in your config file

const SocketContext = createContext();

export const SocketProvider = ({ children, authUser }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (authUser) {
      const socketio = io(`${BASE_URL}`, {
        query: {
          userId: authUser._id,
        },
      });
      setSocket(socketio);

      // Clean up the socket connection when the component unmounts
      return () => socketio.close();
    } else {
      // If the user logs out, disconnect the socket
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

// Custom hook to use the socket context
export const useSocket = () => useContext(SocketContext);
