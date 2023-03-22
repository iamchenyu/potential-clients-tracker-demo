import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

export default function ClientDetailTabBar({ handleTabChange }) {
  const [value, setValue] = React.useState("updates");

  const handleChange = (event, newValue) => {
    setValue(newValue);
    handleTabChange(newValue);
  };

  const tabColors = {
    color: "#fff",
    "@media (max-width: 500px)": {
      padding: "12px 5px",
      fontSize: "small",
    },
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
      >
        <Tab value="updates" label="Updates" sx={tabColors} />
        <Tab value="progress" label="Progress" sx={tabColors} />
        <Tab value="information" label="Information" sx={tabColors} />
      </Tabs>
    </Box>
  );
}
