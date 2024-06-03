import useLoginValidation from "@/lib/validation/useLoginValidation";
import { useAppSelector } from "@/store";
import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Controller } from "react-hook-form";
import { Link } from "react-router-dom";
import { useLoginFunction } from "./loginFunctions";

const Login: React.FC = () => {
  const authState = useAppSelector((state) => state.auth);

  const { control, reset, handleSubmit } = useLoginValidation();
  const { onErrorSubmit, onSubmit } = useLoginFunction({ reset });

  useEffect(() => {}, [authState]);

  return (
    <Box
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box sx={{ padding: 2 }}>
        <Typography variant="h4" fontWeight={"bold"} paddingY={3}>
          Login to circle
        </Typography>
        <form>
          <Box
            width={"412px"}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <Controller
              control={control}
              name="email"
              render={({ field, fieldState }) => (
                <TextField
                  label="Email"
                  color="success"
                  sx={{ border: "none" }}
                  {...field}
                  helperText={fieldState.error?.message}
                  error={Boolean(fieldState.error)}
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field, fieldState }) => (
                <TextField
                  label="Password"
                  color="success"
                  sx={{ borderColor: "white" }}
                  {...field}
                  helperText={fieldState.error?.message}
                  error={Boolean(fieldState.error)}
                />
              )}
            />
            <Link
              to={"#"}
              style={{
                textDecoration: "none",
                color: "white",
                textAlign: "right",
                fontWeight: "bold",
              }}
            >
              Forgot Password?
            </Link>
            <Button
              variant="contained"
              color="success"
              onClick={handleSubmit(onSubmit, onErrorSubmit)}
              sx={{
                color: "white",
                borderRadius: "20px",
                textTransform: "capitalize",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              Login
            </Button>
            <Typography fontWeight={"bold"}>
              Don't have an account yet ?{" "}
              <Link
                to={"/auth/register"}
                style={{
                  textDecoration: "none",
                  color: "green",
                  textAlign: "right",
                  fontWeight: "bold",
                }}
              >
                Create account
              </Link>
            </Typography>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
