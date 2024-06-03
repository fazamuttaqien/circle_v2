import { Avatar, Box, Button, Typography, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import ModalEditProfile from "../ModalEditProfile/ModalEditProfile";
import { useAppDispatch, useAppSelector } from "@/store";
import { getProfile } from "@/store/async/profileAsync";

const CardProfile: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useAppDispatch();
  const { data: profileData } = useAppSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getProfile());
  }, []);

  return (
    <Container sx={{ backgroundColor: "#1F1F1F", borderRadius: "10px" }}>
      <Box
        sx={{
          color: "white",
          flex: 1,
          pt: 2,
          overflow: "auto",
          position: "relative",
          boxShadow: "none",
        }}
      >
        <Typography variant="h6">Profile</Typography>
        <img
          style={{
            width: "100%",
            height: "120px",
            borderRadius: "10px",
            objectFit: "cover",
          }}
          src={profileData?.cover}
          title={profileData?.Id}
        />
        <Avatar
          alt={profileData?.Id}
          src={profileData?.avatar}
          sx={{
            position: "absolute",
            width: "80px",
            height: "80px",
            top: "140px",
            left: "20px",
          }}
        />
        <Button
          onClick={handleOpen}
          sx={{
            color: "white",
            borderRadius: "50px",
            border: "1px solid white",
            padding: "4px 10px",
            fontWeight: "bold",
            textTransform: "capitalize",
            position: "absolute",
            top: "180px",
            right: "1px",
            letterSpacing: "1px",
          }}
        >
          Edit Profile
        </Button>
        <Box mt={"70px"} mb={"40px"}>
          <Typography color={"white"} fontSize={20}>
            {profileData?.fullname}
          </Typography>
          <Typography color={"gray"} fontSize={15}>
            @{profileData?.username}
          </Typography>
          <Typography color={"gray"} fontSize={"medium"}>
            {profileData?.bio}
          </Typography>
          <Box sx={{ display: "flex", gap: 3, mt: "10px" }}>
            <Box display={"flex"} gap={1}>
              <Typography color={"gray"} fontSize={15} fontWeight={"bold"}>
                Followers
              </Typography>
              <span style={{ fontWeight: "bold", color: "white" }}>
                {profileData?.follower?.length}
              </span>{" "}
            </Box>
            <Box display={"flex"} gap={1}>
              <Typography color={"gray"} fontSize={15} fontWeight={"bold"}>
                Following
              </Typography>
              <span style={{ fontWeight: "bold", color: "white" }}>
                {profileData?.following?.length}
              </span>{" "}
            </Box>
          </Box>
        </Box>
        <ModalEditProfile open={open} handleClose={handleClose} />
      </Box>
    </Container>
  );
};

export default CardProfile;
