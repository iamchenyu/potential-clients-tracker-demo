import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { Typography } from "@mui/material";
import PotentialClientTrackerApi from "./api";

export default function DeleteConfirmation({
  open,
  handleClose,
  deleteObject,
  handleDelete,
}) {
  const confirmMsg = {
    mt: 3,
    letterSpacing: "0.5px",
    fontWeight: "500",
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent sx={{ py: "10px" }}>
        <DialogContentText sx={{ py: "10px" }}>
          <Typography variant="h7" sx={confirmMsg}>
            Are you sure you want to delete this {deleteObject}?
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus sx={{ py: "0px" }}>
          No
        </Button>
        <Button onClick={handleDelete} sx={{ py: "0px" }}>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
