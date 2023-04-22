import React, { useCallback, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { Link, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import CopyToClipboard from "react-copy-to-clipboard";
import { Typography } from "@mui/material";
import ContentPasteGoOutlinedIcon from "@mui/icons-material/ContentPasteGoOutlined";

import { useSocket } from "../../Context/SocketContext";

export default function Room() {
  const [name, setName] = React.useState<string>("");
  const [roomId, setRoomId] = React.useState<string>(uuidv4());

  // const roomId = uuidv4();

  const [isCopied, setIsCopied] = React.useState<boolean>(false);

  const handleCopyClick = useCallback(() => {
    setIsCopied(!isCopied);
  }, []);

  // destructuring all data gotten from the context
  const { socket } = useSocket();

  const handleBtnClickedForJoiningRoom = () => {
    socket.emit("join-room", { roomId, name });
    console.log(`new user with ${name} joined ${roomId}`);
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { mt: 5, width: "37ch" },
        display: "flex",
        flexDirection: "column",
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="standard-basic"
        label="Full Name*"
        variant="standard"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />

      <TextField
        id="standard-basic"
        label="Meeting Id*"
        variant="standard"
        value={roomId}
        onChange={(e) => {
          setRoomId(e.target.value);
        }}
      />
      <div>
        <CopyToClipboard text={roomId} onCopy={handleCopyClick}>
          <Button variant="outlined" endIcon={<ContentPasteGoOutlinedIcon />}>
            Copy to Clipboard
          </Button>
        </CopyToClipboard>
      </div>

      <Typography>
        {isCopied && <Typography>Meeting Id {`${roomId} copied`}</Typography>}
      </Typography>

      {/* the state: name is passed to the the meeting room via the link prop.... */}
      <Link to={`/meeting-room/${roomId}`} state={{ name, roomId }}>
        <Button
          onClick={handleBtnClickedForJoiningRoom}
          variant="contained"
          endIcon={<AddIcon />}
        >
          Enter Room
        </Button>
      </Link>
    </Box>
  );
}
// 2fd772a0-9c99-4644-99ae-30b18acd4a30
