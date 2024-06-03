import * as React from "react";
import ImageListItem from "@mui/material/ImageListItem";
import { IThreadImage } from "@/types/app";

const ThreadImageItem: React.FC<{ images: IThreadImage[] }> = ({ images }) => {
  return (
    <>
      {images.map((img) => (
        <ImageListItem key={img.Id}>
          <img
            src={`${img.url}`}
            alt={`${img.Id}_alt`}
            loading="lazy"
            style={{ width: "100%", height: "100%" }}
          />
        </ImageListItem>
      ))}
    </>
  );
};
export default ThreadImageItem;
