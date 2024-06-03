import { IThread } from "@/types/app";
import {
  BarChartRounded,
  ChatOutlined,
  FavoriteBorderOutlined,
  IosShareOutlined,
  LoopOutlined,
} from "@mui/icons-material";
import moment from "moment";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import {
  Avatar,
  Box,
  Grid,
  Modal,
  Typography,
  Button,
  Input,
} from "@mui/material";
import ThreadItem from "@/components/ThreadProps/ThreadItem";

const ModalThread: React.FC<{
  open: boolean;
  handleClose: () => void;
  thread: IThread;
}> = ({ open, handleClose, thread }) => {
  return (
    <Modal open={open} sx={{ backgroundColor: "#1F1F1F" }}>
      <Box width={"100vw"} height={"100vh"}>
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <Box width={"100%"} height={"100vh"} position={"relative"}>
              <img
                src="https://plus.unsplash.com/premium_photo-1664304376458-6757dab127e5?q=80&w=2056&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                width={"100%"}
              />
              <Box
                onClick={handleClose}
                sx={{
                  cursor: "pointer",
                  position: "absolute",
                  top: "10px",
                  left: "10px",
                }}
              >
                <img src="./src/assets/close-thread.svg" />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box bgcolor={"#2E2E2E"} width={"100%"} height={"100vh"}>
              <Box className="feed-item" width={"100%"}>
                <Box className="row-between">
                  <Box className="row-nospace">
                    <Avatar
                      sx={{ width: 50, height: 50 }}
                      src={thread.avatar}
                    />
                    <Box
                      className="feed-item-info row-nospace"
                      width={"70%"}
                      ml={1}
                    >
                      <Typography variant="h4">
                        {thread.user?.fullname}
                      </Typography>
                      <p>@{thread.user?.username}</p>
                      <p style={{ fontWeight: "bolder" }}> · </p>
                      <p>{moment(new Date(thread.createdAt)).calendar()}</p>
                    </Box>
                  </Box>
                </Box>
                <Box className="feed-item-content">
                  <Typography variant="h4" paddingX={1}>
                    {thread.content}
                  </Typography>
                </Box>
                <Box className="feed-item-footer">
                  <Box className="row-between">
                    <div className="feed-item-icons row-nospace View">
                      <BarChartRounded />
                      <p>9230</p>
                    </div>
                    <div className="feed-item-icons row-nospace Reply">
                      <ChatOutlined />
                      <p>{thread.replies?.length}</p>
                    </div>
                    <div className="feed-item-icons row-nospace ReTweet">
                      <LoopOutlined />
                      <p>220</p>
                    </div>
                    <div className="feed-item-icons row-nospace Like">
                      <FavoriteBorderOutlined />
                      <p>{thread.likes?.length}</p>
                    </div>
                    <div
                      className="feed-item-icons row-nospace Share"
                      style={{ marginRight: "15px" }}
                    >
                      <IosShareOutlined />
                    </div>
                  </Box>
                </Box>
              </Box>
              <Box
                display={"flex"}
                alignItems={"center"}
                sx={{ padding: "10px" }}
              >
                <Avatar sx={{ width: 40, height: 40 }} src={thread.avatar} />
                <Input
                  placeholder="Type your reply!"
                  disableUnderline
                  sx={{
                    width: "100%",
                    border: "none",
                    borderRadius: "5px",
                    fontFamily: "Roboto",
                    fontSize: "1rem",
                    padding: "10px",
                    outline: "none",
                    color: "white",
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    alignItems: "center",
                    padding: 1,
                    justifyContent: "flex-end",
                  }}
                >
                  <AddPhotoAlternateIcon />
                  <Button
                    variant="outlined"
                    style={{
                      borderRadius: "50px",
                      backgroundColor: "#04A51E",
                      color: "white",
                      fontWeight: "bold",
                      padding: "1px 3px",
                      border: "none",
                    }}
                  >
                    Post
                  </Button>
                </Box>
              </Box>
              <ThreadItem
                Id={thread.Id}
                threadId={thread.threadId}
                userId={thread.userId}
                content={thread.content}
                bio={thread.bio}
                avatar={thread.avatar}
                cover={thread.cover}
                image={thread.image}
                isEdited={thread.isEdited}
                isLiked={thread.isLiked}
                createdAt={thread.createdAt}
                user={thread.user}
                replies={thread.replies}
                likes={thread.likes}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default ModalThread;
