import * as React from "react";
import "./progress.css";
import { DialogTitle, DialogContent } from "@mui/material";
import moment from "moment";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Check from "@mui/icons-material/Check";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#6B5594",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#6B5594",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const QontoStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  color: "#eaeaf0",
  display: "flex",
  height: 22,
  alignItems: "center",
  ...(ownerState.active && {
    color: "#6B5594",
  }),
  "& .QontoStepIcon-completedIcon": {
    color: "#6B5594",
    zIndex: 1,
    fontSize: 18,
  },
  "& .QontoStepIcon-circle": {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

const journeyWrapper = {
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  height: "25%",
  padding: "0",
  "@media (max-width: 415px)": {
    height: "10%",
  },
};

const ClientDetailTabBarProgressJourney = ({
  clientDetails,
  statusMapping,
}) => {
  return (
    <>
      <DialogTitle sx={{ fontSize: "1.5rem", marginTop: "15px" }}>
        Client Journey
      </DialogTitle>
      <DialogContent sx={journeyWrapper}>
        {clientDetails ? (
          <Stepper
            alternativeLabel
            activeStep={clientDetails.status_updated_dates.length - 1}
            connector={<QontoConnector />}
          >
            {clientDetails.status_updated_dates.map((date) => (
              <Step key={date.id}>
                <StepLabel StepIconComponent={QontoStepIcon}>
                  {statusMapping[date.status_id]}
                  <br />
                  <em>({moment(date.update_date).fromNow()})</em>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        ) : null}
      </DialogContent>
    </>
  );
};

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
};

export default ClientDetailTabBarProgressJourney;
