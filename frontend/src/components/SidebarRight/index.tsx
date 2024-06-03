import { Box } from "@mui/material";
import React from "react";
import CardProfile from "./Profile";
import CardSuggested from "./Suggested";

const CardSidebar: React.FC = () => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        paddingX: 2,
        paddingY: 4,
      }}
    >
      <CardProfile />
      <CardSuggested />
    </Box>
  );
};

export default CardSidebar;
