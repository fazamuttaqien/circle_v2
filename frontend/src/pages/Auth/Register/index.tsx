import useRegisterValidation from "@/lib/validation/useRegisterValidation";
import { useAppSelector } from "@/store";
import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Controller } from "react-hook-form";
import { Link } from "react-router-dom";

const Register: React.FC = () => {
  const authState = useAppSelector((state) => state.auth);

  const { control, reset, handleSubmit } = useRegisterValidation();

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
          Create account circle
        </Typography>
        <form>
          <Box
            width={"412px"}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <Controller
              control={control}
              name="fullname"
              render={({ field, fieldState }) => (
                <TextField
                  label="Fullname"
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
              name="username"
              render={({ field, fieldState }) => (
                <TextField
                  label="Username"
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
            <Button
              variant="contained"
              color="success"
              // onClick={handleSubmit(onSubmit, onErrorSubmit)}
              sx={{
                color: "white",
                borderRadius: "20px",
                textTransform: "capitalize",
                fontSize: "18px",
                fontWeight: "bold",
                mt: 2,
              }}
            >
              Create
            </Button>
            <Typography fontWeight={"bold"}>
              Already have account ?{" "}
              <Link
                to={"/auth/login"}
                style={{
                  textDecoration: "none",
                  color: "green",
                  textAlign: "right",
                  fontWeight: "bold",
                }}
              >
                Login
              </Link>
            </Typography>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Register;
