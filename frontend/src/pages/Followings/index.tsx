import { Avatar, Box, Button, Container, Typography } from "@mui/material";
import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useState,
} from "react";
import { useDetailUsersByUserId } from "./useFollowsData";

const Followings = () => {
  const [activeTab, setActiveTab] = useState<string>("Followers");

  const { data: users, refetch } = useDetailUsersByUserId();
  useEffect(() => {
    refetch();
  }, []);

  return (
    <Container sx={{ paddingY: 5 }}>
      <Box className="row-nospace">
        <span
          style={{
            cursor: "pointer",
            width: "50%",
            color: activeTab === "Followers" ? "white" : "gray",
            fontWeight: activeTab === "Followers" ? "bold" : "normal",
            borderBottom:
              activeTab === "Followers" ? "2px solid #04A51E" : "none",
          }}
          className="tab activeTab"
          onClick={() => setActiveTab("Followers")}
        >
          Followers
        </span>
        <span
          style={{
            cursor: "pointer",
            width: "50%",
            color: activeTab === "Following" ? "white" : "gray",
            fontWeight: activeTab === "Following" ? "bold" : "normal",
            borderBottom:
              activeTab === "Following" ? "2px solid #04A51E" : "none",
          }}
          className="tab"
          onClick={() => setActiveTab("Following")}
        >
          Following
        </span>
      </Box>

      <Box>
        {activeTab === "Followers" ? (
          <>
            {/* FOLLOWERS */}
            {!users?.follower.length ? (
              <Typography variant="h5" color="white">
                No Follower Found
              </Typography>
            ) : (
              <>
                {users?.follower.map(
                  (
                    user: {
                      follower: {
                        Id: string | undefined;
                        avatar: string | undefined;
                        fullname:
                          | string
                          | number
                          | boolean
                          | ReactElement<
                              any,
                              string | JSXElementConstructor<any>
                            >
                          | Iterable<ReactNode>
                          | ReactPortal
                          | null
                          | undefined;
                        username:
                          | string
                          | number
                          | boolean
                          | ReactElement<
                              any,
                              string | JSXElementConstructor<any>
                            >
                          | Iterable<ReactNode>
                          | ReactPortal
                          | null
                          | undefined;
                      };
                    },
                    index: Key | null | undefined
                  ) => (
                    <Box
                      key={index}
                      display={"flex"}
                      flexDirection={"row"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                      padding={1}
                      borderRadius={10}
                      my={4}
                      paddingRight={2}
                      border={"1px solid gray"}
                    >
                      <Box display={"flex"} alignItems={"center"} gap={2}>
                        <Avatar
                          alt={user.follower.Id}
                          src={user.follower.avatar}
                          sx={{ width: "45px", height: "45px" }}
                        />
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "start",
                          }}
                        >
                          <Typography
                            fontSize={"14px"}
                            lineHeight={1}
                            color={"white"}
                          >
                            {user.follower.fullname}
                          </Typography>
                          <Typography fontSize={"14px"} color={"gray"}>
                            @{user.follower.username}
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
                  )
                )}
              </>
            )}
          </>
        ) : null}
        {activeTab === "Following" ? (
          <>
            {/* FOLLOWING */}
            {!users?.following.length ? (
              <Typography variant="h5" color="white">
                No Following Found
              </Typography>
            ) : (
              <>
                {users?.following.map(
                  (
                    user: {
                      following: {
                        Id: string | undefined;
                        avatar: string | undefined;
                        fullname:
                          | string
                          | number
                          | boolean
                          | ReactElement<
                              any,
                              string | JSXElementConstructor<any>
                            >
                          | Iterable<ReactNode>
                          | ReactPortal
                          | null
                          | undefined;
                        username:
                          | string
                          | number
                          | boolean
                          | ReactElement<
                              any,
                              string | JSXElementConstructor<any>
                            >
                          | Iterable<ReactNode>
                          | ReactPortal
                          | null
                          | undefined;
                      };
                    },
                    index: Key | null | undefined
                  ) => (
                    <Box
                      key={index}
                      display={"flex"}
                      flexDirection={"row"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                      padding={1}
                      borderRadius={10}
                      my={4}
                      paddingRight={2}
                      border={"1px solid gray"}
                    >
                      <Box display={"flex"} alignItems={"center"} gap={2}>
                        <Avatar
                          alt={user.following.Id}
                          src={user.following.avatar}
                          sx={{ width: "45px", height: "45px" }}
                        />
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "start",
                          }}
                        >
                          <Typography
                            fontSize={"14px"}
                            lineHeight={1}
                            color={"white"}
                          >
                            {user.following.fullname}
                          </Typography>
                          <Typography fontSize={"14px"} color={"gray"}>
                            @{user.following.username}
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
                          Following
                        </Button>
                      </Box>
                    </Box>
                  )
                )}
              </>
            )}
          </>
        ) : null}
      </Box>
    </Container>
  );
};

export default Followings;
