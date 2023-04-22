import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";

export default function JoinRoom() {
  const [newUserName, setnewUserName] = React.useState<string>("");
  const [newUserId, setnewUserId] = React.useState<string>("");

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
        value={newUserName}
        onChange={(e) => {
          setnewUserName(e.target.value);
        }}
      />
      <TextField
        id="standard-basic"
        label="Meeting Id*"
        variant="standard"
        value={newUserId}
        onChange={(e) => {
          setnewUserId(e.target.value);
        }}
      />

      <Link to="/meeting-room" state={{ newUserId, newUserName }}>
        <Button variant="contained" endIcon={<AddIcon />}>
          Join Room
        </Button>
      </Link>
    </Box>
  );
}
