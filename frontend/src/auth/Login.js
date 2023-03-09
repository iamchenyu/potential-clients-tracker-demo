import * as React from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import logo from "../logo.png";
import PotentialClientTrackerApi from "../api";
import AlertBanner from "../AlertBanner";
import Copyright from "../helper/copyright";

export default function Login({ handleLogin }) {
  const [err, setErr] = React.useState(null);
  const [checked, setChecked] = React.useState(false);

  const loginLink = {
    textDecoration: "none",
    fontStyle: "italic",
    fontSize: "small",
    "&:hover": {
      textDecoration: "underline",
    },
  };

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const loginData = {
      email: data.get("email"),
      password: data.get("password"),
      remember: checked,
    };
    try {
      const { data } = await PotentialClientTrackerApi.login(loginData);
      handleLogin(data.userId, data.remember);
    } catch (e) {
      setErr(e.response.data.error.message);
    }
  };

  return (
    <>
      {err ? (
        <AlertBanner
          severity="error"
          title="Log In Failed"
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
            Log In
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
            <FormControlLabel
              control={
                <Checkbox
                  name="remember"
                  checked={checked}
                  onChange={handleCheckboxChange}
                  color="primary"
                />
              }
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
              }}
            >
              Log In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link
                  component={RouterLink}
                  to="/forgot-password"
                  variant="body2"
                  sx={loginLink}
                >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  component={RouterLink}
                  to="/register"
                  variant="body2"
                  sx={loginLink}
                >
                  {"Don't have an account? Register here"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </>
  );
}
