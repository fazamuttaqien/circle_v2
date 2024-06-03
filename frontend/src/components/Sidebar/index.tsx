import { Box, Button, Typography } from "@mui/material";
import MenuItem from "./MenuItem";

const Sidebar = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        paddingX: 2,
        gap: 4,
        backgroundColor: "#2E2E2E",
      }}
    >
      <Box sx={{ mt: 4 }}>
        <img src="./src/assets/logo.png" />
      </Box>
      <Box>
        <MenuItem />
      </Box>
      <Box>
        <Button
          variant="outlined"
          style={{
            borderRadius: "50px",
            backgroundColor: "#04A51E",
            color: "white",
            fontWeight: "bold",
            padding: "10px",
            border: "none",
            width: "100%",
          }}
        >
          Create Post
        </Button>
      </Box>
      <Box
        sx={{
          marginTop: "auto",
          marginBottom: "40px",
          marginLeft: "5px",
          display: "flex",
          alignItems: "center",
          gap: 2,
          width: "120px",
          cursor: "pointer",
        }}
      >
        <img src="./src/assets/logout.svg" />
        <Typography variant="h6">Logout</Typography>
      </Box>
    </Box>
  );
};

export default Sidebar;
