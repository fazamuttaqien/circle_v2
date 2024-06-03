import { useAppDispatch, useAppSelector } from "@/store";
import { getSuggested } from "@/store/async/suggestedAsync";
import { Avatar, Box, Button, Container, Typography } from "@mui/material";
import React, { useEffect } from "react";

const CardSuggested: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data: suggestedData } = useAppSelector((data) => data.suggested);

  useEffect(() => {
    dispatch(getSuggested());
  }, []);

  return (
    <Container
      sx={{
        width: "100%",
        backgroundColor: "#1f1f1f",
        padding: "5px",
        borderRadius: "10px",
      }}
    >
      <Typography fontWeight={"bold"} variant="h6" my={1}>
        Suggested for you
      </Typography>
      {!suggestedData.length ? (
        <Typography color={"gray"} variant="h6">
          No suggested for you
        </Typography>
      ) : (
        <>
          {suggestedData.map((suggested) => (
            <Box
              key={suggested.Id}
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              py={1}
            >
              <Box display={"flex"} alignItems={"center"} gap={2}>
                <Avatar
                  alt={suggested.Id}
                  src={suggested.avatar}
                  sx={{ width: "45px", height: "45px" }}
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                  }}
                >
                  <Typography fontSize={"14px"} lineHeight={1} color={"white"}>
                    {suggested.fullname}
                  </Typography>
                  <Typography fontSize={"14px"} color={"gray"}>
                    @{suggested.username}
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Button
                  sx={{
                    color: "white",
                    borderRadius: "50px",
                    border: "1px solid white",
                    padding: "2px 10px",
                    fontWeight: "bold",
                    textTransform: "capitalize",
                    letterSpacing: "1px",
                  }}
                >
                  Follow
                </Button>
              </Box>
            </Box>
          ))}
        </>
      )}
    </Container>
  );
};

export default CardSuggested;
