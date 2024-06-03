import { Box, Container } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store";

const AuthLayout = () => {
  const isLogin = useAppSelector(
    (state: { auth: { isLogin: any } }) => state.auth.isLogin
  );

  if (isLogin) {
    return <Navigate to="/" />;
  }

  return (
    <Box className="container" height="100vh">
      <Container className="container">
        <Outlet />
      </Container>
    </Box>
  );
};

export default AuthLayout;
