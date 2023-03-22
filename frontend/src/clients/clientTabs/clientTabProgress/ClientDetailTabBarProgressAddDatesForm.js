import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { DialogTitle, Box } from "@mui/material";
import PotentialClientTrackerApi from "../../../api";
import errMapping from "../../../helper/errorMsg";

export default function ClientDetailTabBarProgressAddDatesForm({
  open,
  handleClose,
  client,
  statusId,
  statusMapping,
  setClientDetails,
  updateClient,
  setErr,
}) {
  const handleSubmitAddDate = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const addData = {
      clientId: +client.id,
      statusId: +statusId,
      updateDate: formData.get("updateDate"),
    };
    try {
      const { data } = await PotentialClientTrackerApi.addStatus(addData);
      setClientDetails(data.client);
      handleClose();
      updateClient(data.client);
    } catch (e) {
      setErr(
        errMapping[e.response.data.error.message] || "Something went wrong"
      );
      console.log(e.response.data.error.message);
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Date</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please choose the status date of{" "}
          <strong>{statusMapping[statusId]}</strong> for client{" "}
          <strong>{client.first_name + " " + client.last_name}</strong>
        </DialogContentText>
        <Box component="form" onSubmit={handleSubmitAddDate}>
          <TextField
            autoFocus
            required
            margin="normal"
            id="updateDate"
            name="updateDate"
            type="date"
            fullWidth
            variant="standard"
          />
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Confirm</Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
