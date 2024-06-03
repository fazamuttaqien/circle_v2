import CardSidebar from "@/components/SidebarRight";
import Sidebar from "@/components/Sidebar";
import { Box, Container } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@/store";

const RootLayout = () => {
  const isLogin = useAppSelector(
    (state: { auth: { isLogin: any } }) => state.auth.isLogin
  );

  if (!isLogin) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <Box className="container">
      <Container
        maxWidth="xl"
        className="container"
        sx={{
          display: "flex",
          height: "100vh",
          width: "100%",
          color: "#fff",
          backgroundColor: "#2E2E2E",
        }}
      >
        <Box flex={1} sx={{}}>
          <Sidebar />
        </Box>
        <Box
          flex={2.5}
          className="thread-container"
          sx={{
            borderLeft: "2px solid #3f3f3f",
            borderRight: "2px solid #3f3f3f",
            overflowY: "auto",
          }}
        >
          <Outlet />
        </Box>
        <Box flex={1.5}>
          <CardSidebar />
        </Box>
      </Container>
    </Box>
  );
};

export default RootLayout;
