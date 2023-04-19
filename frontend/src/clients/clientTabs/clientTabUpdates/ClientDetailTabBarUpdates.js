import React, { useEffect, useState } from "react";
import PotentialClientTrackerApi from "../../../api";
import List from "@mui/material/List";

import ClientDetailTabBarUpdatesList from "./ClientDetailTabBarUpdatesList";
import { Box, DialogTitle, ListItem } from "@mui/material";
import ClientDetailTabBarUpdatesForm from "./ClientDetailTabBarUpdatesForm";
import AlertBanner from "../../../AlertBanner";
import SignpostOutlinedIcon from "@mui/icons-material/SignpostOutlined";

const ClientDetailTabBarUpdates = ({ client }) => {
  const [updates, setUpdates] = useState(null);
  const [err, setErr] = useState(null);
  const [dummy, setDummy] = useState(true);

  useEffect(() => {
    const fetchUpdates = async (id) => {
      const { data } = await PotentialClientTrackerApi.getUpdatesByClient(id);
      setUpdates(data.updates);
    };
    fetchUpdates(client.id);
  }, [dummy]);

  return (
    <>
      {updates ? (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {err ? (
            <AlertBanner
              severity="error"
              title="Add updates Failed"
              msg={`${err} - please try again`}
              setErr={setErr}
            />
          ) : null}
          <DialogTitle sx={{ fontSize: "1.5rem", marginTop: "15px" }}>
            Client Updates
          </DialogTitle>
          <ClientDetailTabBarUpdatesForm
            client={client}
            setErr={setErr}
            dummy={dummy}
            setDummy={setDummy}
          />
          <SignpostOutlinedIcon
            color="primary"
            fontSize="large"
            sx={{ margin: "auto" }}
          />
          <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            {updates.length === 0 ? (
              <ListItem alignItems="center" sx={{ py: "20px" }}>
                No Comments Yet.
              </ListItem>
            ) : (
              updates.map((update) => (
                <ClientDetailTabBarUpdatesList
                  key={update.id}
                  update={update}
                  setErr={setErr}
                  dummy={dummy}
                  setDummy={setDummy}
                />
              ))
            )}
          </List>
        </Box>
      ) : (
        "Loading..."
      )}
    </>
  );
};

export default ClientDetailTabBarUpdates;
