import { Avatar, Button, Box, Typography, ImageList } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect, useState } from "react";
import ModalEditProfile from "@/components/ModalEditProfile/ModalEditProfile";
import { useAppSelector, useAppDispatch } from "@/store";
import { getDetailUser } from "@/store/async/userAsync";
import ThreadItem from "@/components/ThreadProps/ThreadItem";
import { IThread } from "@/types/app";
import ThreadImageItem from "@/components/ThreadProps/ThreadImage";
import { getThreadByUserId } from "@/store/async/threadAsync";

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("All Post");

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useAppDispatch();
  const { data: detailUser } = useAppSelector((state) => state.detailUser);
  const { data: thread } = useAppSelector((state) => state.threadByUserId);

  useEffect(() => {
    dispatch(getDetailUser());
    dispatch(getThreadByUserId());
  }, []);

  return (
    <Box sx={{ backgroundColor: "#262626" }}>
      <Box
        sx={{
          color: "white",
          flex: 1,
          px: 3,
          pt: 5,
          overflow: "auto",
          backgroundColor: "#262626",
          position: "relative",
          boxShadow: "none",
        }}
      >
        <Box display={"flex"} sx={{ alignItems: "center" }} mb={1} gap={2}>
          <ArrowBackIcon />
          <Typography variant="h6">{detailUser?.fullname}</Typography>
        </Box>
        <img
          style={{
            width: "100%",
            height: "180px",
            borderRadius: "10px",
            objectFit: "cover",
          }}
          src={detailUser?.cover}
          title={detailUser?.Id}
        />
        <Avatar
          alt={detailUser?.Id}
          src={detailUser?.avatar}
          sx={{
            position: "absolute",
            width: "80px",
            height: "80px",
            top: "230px",
            left: "50px",
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
            top: "270px",
            right: "25px",
            letterSpacing: "1px",
          }}
        >
          Edit Profile
        </Button>
        <Box mt={"70px"} mb={"40px"}>
          <Typography color={"white"} fontSize={20}>
            {detailUser?.fullname}
          </Typography>
          <Typography color={"gray"} fontSize={15}>
            @{detailUser?.username}
          </Typography>
          <Typography color={"gray"} fontSize={"medium"}>
            {detailUser?.bio}
          </Typography>
          <Box sx={{ display: "flex", gap: "20px", mt: "10px" }}>
            <Typography color={"gray"} fontSize={15} display={"inline"}>
              <span style={{ fontWeight: "bold", color: "white" }}>
                {detailUser?.follower?.length}
              </span>{" "}
              Followers
            </Typography>
            <Typography color={"gray"} fontSize={15} display={"inline"}>
              <span style={{ fontWeight: "bold", color: "white" }}>
                {detailUser?.following?.length}
              </span>{" "}
              Following
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box className="row-nospace">
        <span
          style={{
            cursor: "pointer",
            width: "50%",
            color: activeTab === "All Post" ? "white" : "gray",
            fontWeight: activeTab === "All Post" ? "bold" : "normal",
            borderBottom:
              activeTab === "All Post" ? "2px solid #04A51E" : "none",
          }}
          className="tab activeTab"
          onClick={() => setActiveTab("All Post")}
        >
          All Post
        </span>
        <span
          style={{
            cursor: "pointer",
            width: "50%",
            color: activeTab === "Media" ? "white" : "gray",
            fontWeight: activeTab === "Media" ? "bold" : "normal",
            borderBottom: activeTab === "Media" ? "2px solid #04A51E" : "none",
          }}
          className="tab"
          onClick={() => setActiveTab("Media")}
        >
          Media
        </span>
      </Box>

      <Box>
        {activeTab === "All Post" ? (
          <>
            {thread?.map((item: IThread) => (
              <ThreadItem key={item.Id} thread={item} />
            ))}
          </>
        ) : null}
        {activeTab === "Media" ? (
          <ImageList cols={3} rowHeight={164}>
            <>
              {thread?.map((item: IThread) => (
                <ThreadImageItem
                  images={Array.isArray(item.image) ? item.image : []}
                />
              ))}
            </>
          </ImageList>
        ) : null}
      </Box>

      <ModalEditProfile open={open} handleClose={handleClose} />
    </Box>
  );
};

export default Profile;
