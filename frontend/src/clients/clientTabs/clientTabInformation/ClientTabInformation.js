import * as React from "react";
import { Button, DialogActions, Box, DialogContent } from "@mui/material";
import PotentialClientTrackerApi from "../../../helper/api";
import DialogTitle from "@mui/material/DialogTitle";
import ClientFormField from "./ClientFormField";
import DeleteConfirmation from "../../../components/DeleteConfirmation";
import AppContext from "../../../helper/AppContext";
import errMapping from "../../../helper/errorMsg";

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

  const handleDelete = async () => {
    await PotentialClientTrackerApi.deleteClient(client.id);
    window.location.reload(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const dobOriginal = document.querySelector("#dob").value.split("/");
    const icdOriginal = document.querySelector("#icd").value.split("/");
    const dobUTC = new Date(
      Date.UTC(+dobOriginal[2], +dobOriginal[0] - 1, +dobOriginal[1])
    );
    const icdUTC = new Date(
      Date.UTC(+icdOriginal[2], +icdOriginal[0] - 1, +icdOriginal[1])
    );
    const editClientFormData = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      dob: dobUTC,
      gender: data.get("gender"),
      marital: data.get("marital"),
      contact: data.get("contact"),
      relationship: data.get("relationship"),
      initialContactDate: icdUTC,
      email: data.get("email"),
      phone: data.get("phone"),
      address: data.get("address"),
      citizenship: data.get("citizenship"),
      channel: data.get("channel"),
      physician: data.get("physician"),
      diagnosis: data.get("diagnosis"),
      notes: data.get("notes"),
      daycare: data.get("daycare"),
      medicaid: data.get("medicaid"),
    };
    console.log(editClientFormData);

    try {
      await PotentialClientTrackerApi.updateClient(
        client.id,
        editClientFormData
      );
      window.location.reload(false);
    } catch (e) {
      getErr(
        errMapping[e.response.data.error.message] || "Something went wrong"
      );
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
    "@media (max-width: 500px)": {
      marginTop: "20px",
    },
  };

  const deleteButton = {
    backgroundColor: "error.dark",
    "&:hover": {
      backgroundColor: "error.main",
    },
  };

  const titleWithButtons = {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
    "@media (max-width: 500px)": {
      flexDirection: "column",
    },
  };

  return (
    <>
      <DialogTitle sx={titleWithButtons}>
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
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 1, mb: "30px" }}
        >
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
      <DeleteConfirmation
        open={open}
        handleClose={handleClose}
        deleteObject="client"
        handleDelete={handleDelete}
      />
    </>
  );
};

export default ClientDetailTabBarInformation;
