import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  Box,
  DialogContent,
  Slide,
  AppBar,
  Toolbar,
  IconButton,
  Tabs,
  Tab,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";
import PotentialClientTrackerApi from "../../helper/api";
import AlertBanner from "../../components/AlertBanner";
import AddClientField from "./AddClientField";
import errMapping from "../../helper/errorMsg";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddClient({ open, handleCancel }) {
  const [err, setErr] = React.useState(null);
  const [formData, setFormData] = React.useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await PotentialClientTrackerApi.addClient(formData);
      window.location.reload(false);
    } catch (e) {
      setErr(
        errMapping[e.response.data.error.message] || "Something went wrong"
      );
      console.log(e.response.data.error.message);
    }
  };

  const editFormButtons = {
    position: "absolute",
    bottom: "0",
    right: "10px",
    background: "#fafafa",
    width: "100%",
  };
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleCancel}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <Tabs
            value="1"
            textColor="secondary"
            indicatorColor="secondary"
            sx={{ ml: 2, flex: 1 }}
          >
            <Tab
              value="1"
              label="CCACC Potential Clients Tracker"
              sx={{ color: "#fff" }}
            />
          </Tabs>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleCancel}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {err ? (
        <AlertBanner
          severity="error"
          title="Add Client Failed"
          msg={`${err} - please try again`}
          setErr={setErr}
        />
      ) : null}
      <DialogTitle sx={{ fontSize: "1.5rem", marginTop: "15px" }}>
        Add New Client
      </DialogTitle>
      <DialogContent>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ marginBottom: "30px" }}
        >
          <AddClientField setFormData={setFormData} />

          <DialogActions sx={editFormButtons}>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button type="submit">Submit</Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
