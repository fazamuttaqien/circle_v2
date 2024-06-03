import ModalThread from "@/components/ModalThread/ModalThread";
import { IThread } from "@/types/app";
import {
  BarChartRounded,
  ChatOutlined,
  FavoriteBorderOutlined,
  IosShareOutlined,
  LoopOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  ImageList,
  ImageListItem,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import moment from "moment";

interface IProps {
  thread: IThread;
}

const ThreadItem: React.FC<IProps> = ({ thread }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box className="feed-item" width={"100%"}>
      <Box className="row-between">
        <Box className="row-nospace">
          <Avatar sx={{ width: 50, height: 50 }} src={thread.user?.avatar} />
          <Box className="feed-item-info row-nospace" width={"100%"} ml={1}>
            <Typography variant="h4">{thread.user?.fullname}</Typography>
            <p>@{thread.user?.username}</p>
            <p style={{ fontWeight: "bolder" }}> · </p>
            <p>{moment(new Date(thread.createdAt)).calendar()}</p>
          </Box>
        </Box>
        <MoreHorizOutlined className="feed-more-icon" />
      </Box>
      <Box className="feed-item-content">
        <Typography variant="h4">{thread.content}</Typography>
      </Box>
      <Box mb={2}>
        {Array.isArray(thread.image) && thread.image.length !== 0 && (
          <Box onClick={handleOpen}>
            <ImageList
              sx={{
                width: 500,
                borderRadius: "5px",
                marginLeft: "100px",
                height: thread.image.length > 4 ? "335px" : "200px",
              }}
              cols={2}
              rowHeight={"auto"}
            >
              {thread.image.map((img, index) => (
                <ImageListItem key={`${img}_${index}`}>
                  <img src={img.url} alt={`${img}`} loading="lazy" />
                </ImageListItem>
              ))}
            </ImageList>
          </Box>
        )}
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

      <ModalThread open={open} handleClose={handleClose} thread={thread} />
    </Box>
  );
};

export default ThreadItem;
