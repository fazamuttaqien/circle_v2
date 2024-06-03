import { Container, Box, Input, Typography } from "@mui/material";

const Search = () => {
  return (
    <Container sx={{ padding: 5 }}>
      <Box sx={{ height: "80px" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            padding: "10px 20px",
            border: "1px solid gray",
            borderRadius: "50px",
          }}
        >
          <img
            src="./src/assets/user-search.svg"
            style={{ width: "25px", height: "25px" }}
          />
          <Input
            sx={{
              width: "100%",
            }}
            placeholder="Search your friends"
            disableUnderline
          />
        </Box>
      </Box>

      <Box
        display={"flex"}
        flexDirection={"column"}
        gap={2}
        textAlign={"center"}
        height={"100%"}
      >
        <Typography>No results for “asmorncd”</Typography>
        <Typography>
          Try searching for something else or check the spelling of what you
          typed.
        </Typography>
      </Box>
    </Container>
  );
};

export default Search;
