import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Link, Outlet } from "react-router-dom";

export default function () {
  return (
    <Box sx={{ mt: 5 }}>
      <ButtonGroup variant="outlined" aria-label="outlined button group">
        <Button>
          <Link to="/room">Create / Enter a Room</Link>
        </Button>
      </ButtonGroup>
      <Outlet />
    </Box>
  );
}
