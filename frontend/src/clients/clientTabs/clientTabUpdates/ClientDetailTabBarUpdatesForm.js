import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import AppContext from "../../../helper/AppContext";
import PotentialClientTrackerApi from "../../../helper/api";
import errMapping from "../../../helper/errorMsg";

const ClientDetailTabBarUpdatesForm = ({ client, dummy, setDummy, setErr }) => {
  const [update, setUpdate] = useState(null);
  const [isSubmit, setIsSubmit] = useState(false);

  const { user } = useContext(AppContext);

  const handleChange = (e) => {
    setUpdate(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      clientId: client.id,
      userId: user.id,
      comment: update,
    };
    try {
      await PotentialClientTrackerApi.addComment(formData);
      setUpdate(null);
      setDummy(!dummy);
      setIsSubmit(true);
    } catch (e) {
      setErr(
        errMapping[e.response.data.error.message] || "Something went wrong"
      );
      console.error(e.response.data.error.message);
    }
  };
  const commentForm = {
    width: "90%",
    margin: "20px 20px 30px 20px",
    height: "20vh",
    "@media (max-width: 500px)": {
      height: "100%",
    },
  };

  return (
    <Box component="form" sx={commentForm}>
      <TextField
        label="Comments"
        placeholder="What's going on with the client?"
        fullWidth
        required
        id="update"
        color="primary"
        value={isSubmit ? "" : update}
        multiline
        rows={2}
        onChange={handleChange}
      />
      <Button
        variant="contained"
        sx={{ marginTop: "20px" }}
        onClick={handleSubmit}
      >
        Submit
      </Button>
      <Typography
        variant="subtitle2"
        display="block"
        gutterBottom
        sx={{ marginTop: "10px", fontStyle: "italic" }}
      >
        * All users will receive an email notification regarding the update
      </Typography>
    </Box>
  );
};

export default ClientDetailTabBarUpdatesForm;
