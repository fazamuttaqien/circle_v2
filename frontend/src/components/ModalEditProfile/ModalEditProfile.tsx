import {
  Avatar,
  Box,
  Container,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import * as React from "react";
// import { Controller } from "react-hook-form";

const ModalEditProfile: React.FC<{
  open: boolean;
  handleClose: () => void;
}> = ({ open, handleClose }) => {
  return (
    <Modal
      open={open}
      aria-labelledby="edit-profile-title"
      aria-describedby="edit-profile-description"
    >
      <MainContainer>
        <Header>
          <Typography
            variant="h6"
            color="white"
            id="edit-profile-title"
            marginLeft={-2}
          >
            Edit Profile
          </Typography>
          <Box
            onClick={handleClose}
            sx={{ cursor: "pointer", marginRight: "-15px", marginTop: "5px" }}
          >
            <img src="./src/assets/close-circle.svg" />
          </Box>
        </Header>

        {/* Cover */}
        <Box
          sx={{
            top: "240px",
            left: "50px",
          }}
        >
          <img
            style={{
              width: "100%",
              aspectRatio: "2.86",
              objectFit: "cover",
              borderRadius: "10px",
            }}
            src="https://s3-alpha-sig.figma.com/img/ff72/df09/d00360c5841aa3f95403eff20cb41f19?Expires=1716768000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=owG4eqbcoefMPo4LJLbhm-W6MahMUaSL22GPhKHLJU9ci9QihySvSgAU2-axwo1KqEvz1mw454kc3OzwiMKN9rOlb9jKEGXy1mPwJR806LWVkbnKEDVD6nVApPdzCOciND9dMyqaYtdwztJ~gJP-QuXzM9h9m~RwRwB3aCCJWQVGtYbgcHND~ukNIVDbHKUOxdbbnzTunYCjO0fkE-qWj6GaTchm7S-ONaXIoOOARD7ATyq5ktjOaso2R~Gl7QkAkfA278THrLPIKPmZtrv~dLhxhYPzGYSGoyBo2yIe0GReejQc6RXlSfYjzskk60610b2k6H340BWukJRt8wyBNQ__"
          />

          <img
            src="./src/assets/add-image.svg"
            style={{
              position: "absolute",
              padding: 5,
              backgroundColor: "black",
              borderRadius: "100%",
              top: "150px",
              right: "340px",
            }}
          />
        </Box>

        {/* Avatar */}
        <Box
          sx={{
            position: "absolute",
            top: "240px",
            left: "50px",
          }}
        >
          <Avatar
            src="https://s3-alpha-sig.figma.com/img/500a/9d4a/fa52a9a97030092c33ba8c07e4d2c537?Expires=1716768000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Dsbn6qN4IMVNzoV9UrKqDe8zBQTYzRWT8i10Iqay2SSLI96ukdjT2YSCiM-aoq5hMqHIb~2ILEBxFkdriIvrxw17kv9yqjIzacjl8ryHEiLdK51GHhlXJjB2Je9tjD9VTYqxYxEscrWtmJqwkCpT9-9Nz8uJ0OaPm~ZCphbnrpKT6Q80gV1oETSdtz7GxUg3r46R2bEXOd9oprHv9u75sguu-kzOn-4NhBe7Z9kl7Zp-el1nA5cfn8XuvHmymSds2petxc6YAJ5su-oR85lkQadhj2PYakzqo-ZoTO9nlAUhZlvwnwC2JbzyVw0IWPktq3S~vypYbqwcbFFWeXpAlA__"
            sx={{ width: "80px", height: "80px", position: "relative" }}
          />

          <img
            src="./src/assets/add-image.svg"
            style={{
              position: "absolute",
              padding: 5,
              backgroundColor: "black",
              borderRadius: "100%",
              top: "25px",
              left: "25px",
            }}
          />
        </Box>

        {/* Input */}
        <form>
          <Box
            width={"100%"}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              mt: 7,
              mb: 5,
            }}
          >
            <TextField
              label="Name"
              sx={{
                borderColor: "gray",
              }}
            />
            <TextField label="Username" sx={{ borderColor: "white" }} />
            <TextField
              label="Bio"
              sx={{ borderColor: "white" }}
              inputProps={{
                style: {
                  height: "100px",
                },
              }}
              fullWidth
              multiline
            />
          </Box>
        </form>
      </MainContainer>
    </Modal>
  );
};

export default ModalEditProfile;

const MainContainer = styled(Container)(({ theme }) => ({
  borderRadius: "10px",
  boxShadow: "0px 25px 50px -12px rgba(0, 0, 0, 0.25)",
  backgroundColor: "#1d1d1d",
  display: "flex",
  width: "700px",
  height: "auto",
  maxHeight: "90vh",
  flexDirection: "column",
  fontWeight: 700,
  padding: theme.spacing(1),
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
}));

const Header = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  backgroundColor: "#1d1d1d",
  color: "#fff",
  padding: theme.spacing(1, 2),
}));
