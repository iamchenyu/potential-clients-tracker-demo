import React, { useContext, useState } from "react";
import { ListItem, Box, Button } from "@mui/material";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import moment from "moment";
import DeleteIcon from "@mui/icons-material/Delete";
import PotentialClientTrackerApi from "../../../api";
import AppContext from "../../../AppContext";
import DeleteConfirmation from "../../../DeleteConfirmation";

const ClientDetailTabBarUpdatesList = ({ update, setErr, dummy, setDummy }) => {
  const { user } = useContext(AppContext);
  const [open, setOpen] = useState(false);

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  const fullName = update.user_first_name + " " + update.user_last_name;

  const updateTimestamp = {
    marginLeft: "20px",
    fontSize: "small",
  };

  const updateUsername = {
    fontWeight: "bold",
  };

  const updateComment = {
    marginTop: "10px",
    marginBottom: "0",
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteUpdate = async () => {
    try {
      await PotentialClientTrackerApi.deleteComment(update.id, {
        userId: user.id,
      });
      setDummy(!dummy);
    } catch (e) {
      setErr(e.response.data.error.message);
    }
  };

  console.log(user);

  return (
    <>
      <ListItem alignItems="center" sx={{ py: "20px" }}>
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" sx={{ bgcolor: stringToColor(fullName) }}>
            {update.user_first_name[0].toUpperCase()}
            {update.user_last_name[0].toUpperCase()}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            <React.Fragment>
              <Typography component="span" sx={updateUsername}>
                {fullName}
              </Typography>
              <Typography component="span" sx={updateTimestamp}>
                {moment(update.commented_at).format(
                  "dddd, MMMM Do YYYY, h:mm:ss a"
                )}
              </Typography>
            </React.Fragment>
          }
          secondary={
            <Typography sx={updateComment}>{update.comment}</Typography>
          }
          sx={{ marginBottom: "0" }}
        />

        {user.id == update.user_id || user.role === "admin" ? (
          <Button onClick={() => setOpen(true)}>
            <DeleteIcon />
          </Button>
        ) : null}
      </ListItem>

      <Divider variant="inset" component="li" />

      <DeleteConfirmation
        open={open}
        handleClose={handleClose}
        deleteObject="comment"
        handleDelete={handleDeleteUpdate}
      />
    </>
  );
};

export default ClientDetailTabBarUpdatesList;
