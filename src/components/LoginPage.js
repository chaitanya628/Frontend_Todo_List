import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import * as React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginApi } from "../api/userApi";
import { useDispatch } from "react-redux";

const defaultTheme = createTheme();

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(loginApi(data, navigate));
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        {/* <CssBaseline /> */}
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 2,
            boxShadow: 3,
          }}
        >
          <Avatar
            sx={{ m: 1, alignItems: "center" }}
            style={{ backgroundColor: "green" }}
          >
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={data.username}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={data.password}
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{ marginTop: 10 }}
            >
              Sign In
            </Button>
            <Grid
              container
              style={{ marginTop: "20%" }}
              display="flex"
              alignContent="center"
              justifyContent="space-between"
            >
              <Grid item>Don't have an account?</Grid>
              <Grid item>
                <Button
                  variant="contained"
                  style={{ backgroundColor: "black", color: "white" }}
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Register
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
