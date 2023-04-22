import { useState } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import { NavBar } from "./components";
import { Room, MeetingRoom } from "./pages";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import { SocketProvider } from "./Context/SocketContext";
import { PeerProvider } from "./Context/PeerContext";

function App() {
  return (
    <div className="App">
      <SocketProvider>
        <PeerProvider>
          <Routes>
            <Route path="/" element={<NavBar />}>
              <Route path="/room" element={<Room />} />
            </Route>
            <Route path={`/meeting-room/:roomId`} element={<MeetingRoom />} />
          </Routes>
        </PeerProvider>
      </SocketProvider>
    </div>
  );
}

export default App;
