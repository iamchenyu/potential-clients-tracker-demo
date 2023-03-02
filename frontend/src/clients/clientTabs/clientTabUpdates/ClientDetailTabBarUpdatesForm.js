import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import AppContext from "../../../AppContext";
import PotentialClientTrackerApi from "../../../api";

const ClientDetailTabBarUpdatesForm = ({ client, dummy, setDummy, setErr }) => {
  const [update, setUpdate] = useState(null);

  const { user } = useContext(AppContext);

  const handleChange = (e) => {
    setUpdate(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { clientId: client.id, userId: user.id, comment: update };
    try {
      await PotentialClientTrackerApi.addComment(formData);
      setDummy(!dummy);
    } catch (e) {
      setErr(e.response.data.error.message);
      console.log(e.response.data.error.message);
    }
  };

  return (
    <Box
      component="form"
      sx={{
        width: "90%",
        margin: "20px 20px 0 20px",
        height: "20vh",
      }}
    >
      <TextField
        label="Comments"
        placeholder="What's going on with the client?"
        fullWidth
        required
        id="update"
        color="primary"
        value={update}
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
    </Box>
  );
};

export default ClientDetailTabBarUpdatesForm;
