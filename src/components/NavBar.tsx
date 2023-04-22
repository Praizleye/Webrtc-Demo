import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import { AppBar } from "@mui/material";
import VideoChatOutlinedIcon from "@mui/icons-material/VideoChatOutlined";
import Container from "@mui/material/Container";
import { Outlet } from "react-router-dom";
import HomePage from "./HomePage";

export default function NavBar() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Box
            width="100%"
            my="1"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Typography sx={{ textAlign: "center", my: 1 }} variant="h3">
              Talent+ <VideoChatOutlinedIcon fontSize="large" />
            </Typography>{" "}
            <Typography sx={{ textAlign: "center", justifySelf: "baseline" }}>
              {" "}
              video conferencing made simple.
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      <Toolbar>
        <Container>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <HomePage />
          </Box>
        </Container>
      </Toolbar>
    </>
  );
}
