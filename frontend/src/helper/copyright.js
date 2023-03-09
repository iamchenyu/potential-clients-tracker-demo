import { Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const copyrightLink = {
  textDecoration: "none",
  fontStyle: "italic",
  fontSize: "small",
  "&:hover": {
    textDecoration: "underline",
  },
};

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link
        component={RouterLink}
        color="inherit"
        to="https://github.com/iamchenyu"
        target="_blank"
        sx={copyrightLink}
      >
        CHENYU/WANG
      </Link>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
}

export default Copyright;
