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
import AlertDialog from "./AlertDialog";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [err, setErr] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await PotentialClientTrackerApi.sendResetEmail({
        email,
      });
      console.log(data);
      setOpen(true);
    } catch (e) {
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
          Forgot Your Password?{" "}
        </Typography>
        <Typography variant="h6">
          Please enter your email address to reset your password
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            id="email"
            label="Email"
            required
            sx={{ width: "80%" }}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <Button
            variant="contained"
            type="submit"
            sx={{ my: "20px", display: "block" }}
          >
            Submit
          </Button>
          <Link href="/login" variant="body2" sx={loginLink}>
            Back to login page
          </Link>
        </Box>
      </Container>
      <AlertDialog
        type="forgot"
        open={open}
        handleClose={handleClose}
        setErr={setErr}
        email={email}
        title="Reset Password Link Has Been Sent"
        description1="Please go to your email address and click the link to reset your password. You may close this window after the reset. "
        description2="If you haven't received any email, please check your spam or junk folder, or request to resend another link. The link will expire after 10 mins."
      />
    </>
  );
};

export default ForgotPassword;
