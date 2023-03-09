import * as React from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import logo from "../logo.png";
import Copyright from "../helper/copyright";
import PotentialClientTrackerApi from "../api";
import AlertBanner from "../AlertBanner";
import { Link as RouterLink } from "react-router-dom";

const loginLink = {
  textDecoration: "none",
  fontStyle: "italic",
  fontSize: "small",
  "&:hover": {
    textDecoration: "underline",
  },
};

export default function Register({ handleLogin }) {
  const [err, setErr] = React.useState(null);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const registerData = {
      email: data.get("email"),
      password: data.get("password"),
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
    };
    try {
      const { data } = await PotentialClientTrackerApi.register(registerData);
      handleLogin(data.userId);
    } catch (e) {
      setErr(e.response.data.error.message);
    }
  };

  return (
    <>
      {err ? (
        <AlertBanner
          severity="error"
          title="Register Failed"
          msg={`${err} - please try again`}
          setErr={setErr}
        />
      ) : null}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{
              m: 1,
              bgcolor: "secondary.main",
              width: "70px",
              height: "65px",
            }}
          >
            <img
              src={logo}
              style={{ width: "58px", height: "50px", mb: "2px" }}
              alt="CCACC company logo"
            />
          </Avatar>
          <Typography
            component="h1"
            variant="h5"
            sx={{ mt: 2, color: "primary.main" }}
          >
            Create Account
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Grid container>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
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
              />
              <Grid item sx={{ marginRight: 4 }} sm={5.5}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="firstName"
                  label="First Name"
                  type="text"
                  id="firstName"
                  autoComplete="given-name"
                />
              </Grid>
              <Grid item sm={5.5} sx={{ marginLeft: "auto" }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="lastName"
                  label="Last Name"
                  type="text"
                  id="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                }}
              >
                Register
              </Button>
              <Grid container sx={{ justifyContent: "center" }}>
                <Grid item>
                  <Link
                    component={RouterLink}
                    to="/login"
                    variant="body2"
                    sx={loginLink}
                  >
                    {"Already have an account? Log in here"}
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </>
  );
}
