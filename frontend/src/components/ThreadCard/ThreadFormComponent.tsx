import {
  Box,
  Button,
  FormControl,
  IconButton,
  Stack,
  TextareaAutosize,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import React, { useRef, useState } from "react";
import { usePostThread } from "@/pages/Home/useThreadsData";
import { ThreadPostType } from "@/types/app";

interface CustomFile extends File {
  preview: string;
}

const ThreadFormComponent: React.FC = () => {
  const [content, setContent] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<{ file: File; preview: string }[]>([]);

  const { mutate } = usePostThread(() => {
    setContent("");
    setImage([]); // reset the selected image after posting thread
  });

  const postThread = () => {
    const thread: ThreadPostType = {
      content,
      image: image.map(({ file, preview }) => {
        const clonedFile: CustomFile = new File([file], file.name, {
          type: file.type,
          lastModified: file.lastModified,
        }) as CustomFile;
        clonedFile.preview = preview;
        return clonedFile;
      }),
    };

    mutate(thread);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      Promise.all(
        filesArray.map((file) => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
              resolve({ file, preview: e.target?.result as string });
            };
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
          });
        })
      ).then((images) => {
        setImage(
          (prevImages: { file: File; preview: string }[]) =>
            [...prevImages, ...images] as { file: File; preview: string }[]
        );
      });
    }
  };

  const handleRemoveImage = (index: number) => {
    setImage((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Box>
      <FormControl style={{ width: "100%", padding: 10 }}>
        <TextareaAutosize
          className="container"
          placeholder="Type something..."
          style={{
            resize: "none",
            height: "7rem",
            border: "none",
            borderRadius: "5px",
            fontFamily: "Roboto",
            fontSize: "1rem",
            padding: "10px",
            outline: "none",
            color: "rgba(255, 255, 255, 0.6)",
          }}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
            setContent(event.target.value)
          }
        />
      </FormControl>

      <Stack direction={["column", "row"]} spacing={"24px"} overflow={"auto"}>
        {image.map((images, index) => (
          <Box key={index} position="relative">
            <img
              src={images.preview}
              alt={`${images.preview}@${index}`}
              style={{
                width: "150px",
                height: "150px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
            <IconButton
              aria-label="delete"
              style={{
                position: "absolute",
                top: 5,
                right: 5,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                color: "white",
                borderRadius: "50%",
              }}
              onClick={() => handleRemoveImage(index)}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        ))}
      </Stack>

      <Box
        sx={{
          display: "flex",
          // backgroundColor: "#3f3f3f",
          gap: 1,
          alignItems: "center",
          padding: 1,
          justifyContent: "flex-end",
        }}
      >
        <Box sx={{ cursor: "pointer" }} onClick={handleAvatarClick}>
          <AddPhotoAlternateIcon fontSize="large" />
        </Box>
        <input
          type="file"
          name="image"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          style={{ display: "none" }}
          ref={fileInputRef}
        />
        <Button
          variant="outlined"
          style={{
            borderRadius: "50px",
            backgroundColor: "#04A51E",
            color: "white",
            fontWeight: "bold",
            padding: "5px 20px",
            border: "none",
          }}
          onClick={postThread}
        >
          Post
        </Button>
      </Box>
    </Box>
  );
};

export default ThreadFormComponent;
