import * as React from "react";
import "./progress.css";
import { status } from "../../../helper/formSelectOptions";
import { DialogTitle, DialogContent } from "@mui/material";
import ClientDetailTabBarProgressDatesMap from "./ClientDetailTabBarProgressDatesMap";

const ClientDetailTabBarProgressDates = ({
  statusMapping,
  client,
  updateClient,
}) => {
  return (
    <>
      <DialogTitle sx={{ fontSize: "1.5rem", marginTop: "15px" }}>
        Client Progress
      </DialogTitle>
      <DialogContent className="deal-view">
        <div className="stepper">
          {status.map((s) => (
            <ClientDetailTabBarProgressDatesMap
              key={s.id}
              s={s}
              client={client}
              updateClient={updateClient}
              statusMapping={statusMapping}
            />
          ))}
        </div>
      </DialogContent>
    </>
  );
};

export default ClientDetailTabBarProgressDates;
