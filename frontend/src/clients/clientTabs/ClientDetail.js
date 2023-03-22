import * as React from "react";
import {
  Dialog,
  Slide,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AlertBanner from "../../AlertBanner";
import ClientDetailTabBar from "./ClientDetailTabBar";
import ClientDetailTabBarInformation from "./clientTabInformation/ClientTabInformation";
import ClientDetailTabBarProgress from "./clientTabProgress/ClientDetailTabBarProgress";
import ClientDetailTabBarUpdates from "./clientTabUpdates/ClientDetailTabBarUpdates";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ClientDetail({ open, handleCancel, client }) {
  const [err, setErr] = React.useState(null);
  const [tab, setTab] = React.useState("updates");

  const handleTabChange = (value) => {
    setTab(value);
  };

  const getErr = (msg) => {
    setErr(msg);
  };

  const renderDialogContent = () => {
    if (tab === "information") {
      return <ClientDetailTabBarInformation client={client} getErr={getErr} />;
    } else if (tab === "progress") {
      return <ClientDetailTabBarProgress client={client} getErr={getErr} />;
    } else if (tab === "updates") {
      return <ClientDetailTabBarUpdates client={client} getErr={getErr} />;
    }
  };

  const clientName = {
    minWidth: "fit-content",
    fontSize: "0.9rem",
    marginRight: "10px",
    "@media (max-width: 500px)": {
      display: "none",
    },
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
          <ClientDetailTabBar handleTabChange={handleTabChange} />
          <Typography variant="caption" sx={clientName}>
            Client - {`${client.first_name} ${client.last_name}`}
          </Typography>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => window.location.reload(false)}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {err ? (
        <AlertBanner
          severity="error"
          title="Update Client Information Failed"
          msg={`${err} - please try again`}
          setErr={setErr}
        />
      ) : null}
      {renderDialogContent()}
    </Dialog>
  );
}
