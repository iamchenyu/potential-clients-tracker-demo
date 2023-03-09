import React, { useState } from "react";
import {
  Typography,
  Box,
  TextField,
  Button,
  Container,
  Link,
} from "@mui/material";
import PotentialClientTrackerApi from "../api";
import AlertBanner from "../AlertBanner";
import { useParams } from "react-router-dom";
import AlertDialog from "./AlertDialog";
import { Link as RouterLink } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);
  const [open, setOpen] = useState(false);

  const token = useParams();

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await PotentialClientTrackerApi.resetPassword(token, {
        password,
      });
      console.log(data);
      setOpen(true);
    } catch (e) {
      console.log(e);
      setErr(e.response.data.error.message);
    }
  };

  const wrapper = {
    display: "flex",
    flexDirection: "column",
    gap: "30px",
    marginTop: "20px",
  };

  const loginLink = {
    textDecoration: "none",
    fontStyle: "italic",
    fontSize: "small",
    "&:hover": {
      textDecoration: "underline",
    },
  };

  return (
    <>
      {err ? (
        <AlertBanner
          severity="error"
          title="Reset Password Request Failed"
          msg={`${err} - please try again`}
          setErr={setErr}
        />
      ) : null}
      <Container sx={wrapper}>
        <Typography variant="h3" component="h1">
          Reset Your Password{" "}
        </Typography>
        <Typography variant="h6">
          Please enter your new password here
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            id="password"
            label="Password"
            required
            sx={{ width: "80%" }}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <Button
            variant="contained"
            type="submit"
            sx={{ my: "20px", display: "block" }}
          >
            Change
          </Button>
          <Link
            component={RouterLink}
            to="/login"
            variant="body2"
            sx={loginLink}
          >
            Cancel and go back to the login page
          </Link>
        </Box>
      </Container>
      <AlertDialog
        type="reset"
        open={open}
        handleClose={handleClose}
        title="Your Password Has Been Reset Successfully"
        description1="Please go back and log in with your new password."
      />
    </>
  );
};

export default ResetPassword;
