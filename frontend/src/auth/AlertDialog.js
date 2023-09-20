import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Link } from "@mui/material";
import PotentialClientTrackerApi from "../helper/api";
import { Link as RouterLink } from "react-router-dom";
import errMapping from "../helper/errorMsg";

export default function AlertDialog({
  type,
  open,
  email,
  setErr,
  title,
  description1,
  description2,
  handleClose,
}) {
  const handleResendLink = async () => {
    try {
      await PotentialClientTrackerApi.sendResetEmail({
        email,
      });
    } catch (e) {
      setErr(
        errMapping[e.response.data.error.message] || "Something went wrong"
      );
      console.log(e.response.data.error.message);
    }
  };

  const loginLink = {
    textDecoration: "none",
    fontStyle: "italic",
    fontSize: "small",
    fontFamily: "Raleway",
    "&:hover": {
      textDecoration: "underline",
    },
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description1}
        </DialogContentText>
        <br />
        <DialogContentText id="alert-dialog-description">
          {description2}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {type === "forgot" ? (
          <Button onClick={handleResendLink} autoFocus>
            Resend the link
          </Button>
        ) : (
          <Link component={RouterLink} to="/login" sx={loginLink}>
            Go Back to Login Page
          </Link>
        )}
      </DialogActions>
    </Dialog>
  );
}
