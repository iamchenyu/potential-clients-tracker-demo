import * as React from "react";
import { Button, DialogActions, Box, DialogContent } from "@mui/material";
import PotentialClientTrackerApi from "../../../api";
import DialogTitle from "@mui/material/DialogTitle";
import ClientFormField from "./ClientFormField";
import ClientDetailDelete from "./ClientInDetailDelete";
import AppContext from "../../../AppContext";

const ClientDetailTabBarInformation = ({ client, getErr }) => {
  const [isDisabled, setIsDisabled] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const { user } = React.useContext(AppContext);

  const handleClickOpen = () => {
    if (user.role === "viewer") {
      getErr("You don't have the permission to delete");
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = () => {
    if (user.role === "viewer") {
      getErr("You don't have the permission to edit");
    } else {
      setIsDisabled(!isDisabled);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const editClientFormData = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      dob: data.get("dob"),
      email: data.get("email"),
      phone: data.get("phone"),
      address: data.get("address"),
      citizenship: data.get("citizenship"),
      channel: data.get("channel"),
      physician: data.get("physician"),
      diagnosis: data.get("diagnosis"),
      note: data.get("note"),
      daycare: data.get("daycare") === "true" ? true : false,
      medicaid: data.get("medicaid") === "true" ? true : false,
    };
    try {
      await PotentialClientTrackerApi.updateClient(
        client.id,
        editClientFormData
      );
      window.location.reload(false);
    } catch (e) {
      getErr(e.response.data.error.message);
    }
  };

  const editFormButtons = {
    position: "absolute",
    bottom: "0",
    right: "10px",
    background: "#fafafa",
    width: "100%",
  };

  const editOrDeleteButtons = {
    display: "flex",
    gap: "10px",
  };

  const deleteButton = {
    backgroundColor: "error.dark",
    "&:hover": {
      backgroundColor: "error.main",
    },
  };
  return (
    <>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "10px",
        }}
      >
        <span style={{ fontSize: "1.5rem" }}>Client Information</span>
        {isDisabled ? (
          <Box sx={editOrDeleteButtons}>
            <Button
              onClick={handleEdit}
              variant="contained"
              sx={{ backgroundColor: "primary.light" }}
            >
              Edit
            </Button>
            <Button
              onClick={handleClickOpen}
              variant="contained"
              sx={deleteButton}
            >
              Delete
            </Button>
          </Box>
        ) : null}
      </DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <ClientFormField client={client} disabled={isDisabled} />

          <DialogActions sx={editFormButtons}>
            {isDisabled ? null : (
              <>
                <Button onClick={handleEdit}>Cancel</Button>
                <Button type="submit">Submit</Button>
              </>
            )}
          </DialogActions>
        </Box>
      </DialogContent>
      <ClientDetailDelete
        open={open}
        handleClose={handleClose}
        clientId={client.id}
      />
    </>
  );
};

export default ClientDetailTabBarInformation;
