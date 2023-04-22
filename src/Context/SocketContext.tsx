import React, { createContext, useContext, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

interface SocketProviderProps {
  children: React.ReactNode;
}

interface User {
  id: string;
  stream: MediaStream;
}

interface SocketContextProps {
  socket: Socket;
}

// create the react context
const SocketContext = createContext<SocketContextProps>({
  socket: io("http://localhost:3567"),
});

export const useSocket = () => useContext(SocketContext);
export const SocketProvider = ({ children }: SocketProviderProps) => {
  const socket = io("http://localhost:3567");

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

// const [myStream, setMyStream] = useState<MediaStream | null>(null);
// // const { roomId } = useParams<{ roomId: string }>();
// const [users, setUsers] = useState<User[]>([]);
// const [myId, setMyId] = useState<string | null>(null);
// const [socket, setSocket] = useState<Socket | null>(null);
