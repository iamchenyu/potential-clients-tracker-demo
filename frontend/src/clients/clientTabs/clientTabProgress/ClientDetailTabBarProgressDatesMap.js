import * as React from "react";
import "./progress.css";
import {
  Divider,
  Dialog,
  DialogContent,
  DialogContentText,
  Typography,
  DialogActions,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import $ from "jquery";
import PotentialClientTrackerApi from "../../../helper/api";
import ClientDetailTabBarProgressAddDatesForm from "./ClientDetailTabBarProgressAddDatesForm";
import AlertBanner from "../../../components/AlertBanner";
import errMapping from "../../../helper/errorMsg";
import dayjs from "dayjs";

const ClientDetailTabBarProgressDatesMap = ({
  s,
  client,
  updateClient,
  statusMapping,
}) => {
  const [clientDetails, setClientDetails] = React.useState(client);
  const [dummy, setDummy] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [openConfirmation, setOpenConfirmation] = React.useState(false);
  const [id, setId] = React.useState(null);
  const [statusId, setStatusId] = React.useState(null);
  const [err, setErr] = React.useState(null);

  const handleClickOpen = (e) => {
    let idStatus;
    if (!$(e.target)[0].id) {
      idStatus = $($(e.target)[0].parentElement)[0].id;
    } else {
      idStatus = $(e.target)[0].id;
    }
    const id = idStatus.split("-")[0];
    setOpen(true);
    setStatusId(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseConfirmation = () => {
    setOpenConfirmation(false);
    setId(null);
  };

  React.useEffect(() => {
    $(".stepper_item").map((item, idx) => {
      if ($(idx).siblings().children().length !== 0) {
        $(idx).addClass("success");
      }
      if ($(idx).siblings().children().length === 0) {
        $(idx).removeClass("success");
      }
    });
  });

  React.useEffect(() => {
    const fetchClient = async (id) => {
      const { data } = await PotentialClientTrackerApi.getClient(id);
      setClientDetails(data.client);
      updateClient(data.client);
    };
    fetchClient(client.id);
  }, [dummy]);

  const handleDateDeleteConfirmation = (e) => {
    let id;
    if (!$(e.target)[0].id) {
      id = $($(e.target)[0].parentElement)[0].id;
    } else {
      id = $(e.target)[0].id;
    }
    setOpenConfirmation(true);
    setId(id);
  };

  const handleDateDelete = async () => {
    try {
      await PotentialClientTrackerApi.deleteStatus(id);
      setDummy(!dummy);
    } catch (e) {
      setErr(
        errMapping[e.response.data.error.message] || "Something went wrong"
      );
      console.log(e.response.data.error.message);
    }
    setOpenConfirmation(false);
  };

  const confirmMsg = {
    mt: 3,
    letterSpacing: "0.5px",
    fontWeight: "500",
  };

  const chipstyle = {
    cursor: "pointer",
    backgroundColor: "#FFCF1C",
    minWidth: "120px",
    fontSize: "0.9rem",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    height: "32px",
    color: "rgba(0, 0, 0, 0.87)",
    borderRadius: "16px",
  };

  var utc = require("dayjs/plugin/utc");
  var timezone = require("dayjs/plugin/timezone"); // dependent on utc plugin
  dayjs.extend(utc);
  dayjs.extend(timezone);
  const tzToDisplay = "America/New_York";

  return (
    <>
      {err ? (
        <AlertBanner
          severity="error"
          title="Failed"
          msg={`${err} - please try again`}
          setErr={setErr}
        />
      ) : null}
      <div className="stepper_item_date">
        <div
          className="stepper_item "
          onClick={handleClickOpen}
          id={`${s.value}-status`}
        >
          <div className="stepper_title">{s.label}</div>
        </div>
        <div className="stepper_date">
          {clientDetails.status_updated_dates
            ? clientDetails.status_updated_dates.map((date) => {
                if (statusMapping[date.status_id] === s.label) {
                  return (
                    <div
                      style={chipstyle}
                      onClick={handleDateDeleteConfirmation}
                      id={date.id}
                      key={date.id}
                    >
                      {dayjs
                        .tz(date.update_date, tzToDisplay)
                        .format("MM/DD/YYYY")}

                      <CloseIcon fontSize="sm" sx={{ marginTop: "2px" }} />
                    </div>
                  );
                }
              })
            : null}
        </div>
      </div>
      <Divider />
      <ClientDetailTabBarProgressAddDatesForm
        open={open}
        handleClose={handleClose}
        client={clientDetails}
        statusId={statusId}
        statusMapping={statusMapping}
        setClientDetails={setClientDetails}
        updateClient={updateClient}
        setErr={setErr}
      />
      <Dialog open={openConfirmation} onClose={handleCloseConfirmation}>
        <DialogContent sx={{ py: "10px" }}>
          <DialogContentText sx={{ py: "10px" }}>
            <Typography variant="h7" sx={confirmMsg}>
              Are you sure you want to delete this date?
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseConfirmation}
            autoFocus
            sx={{ py: "0px" }}
          >
            No
          </Button>
          <Button onClick={handleDateDelete} sx={{ py: "0px" }}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ClientDetailTabBarProgressDatesMap;
