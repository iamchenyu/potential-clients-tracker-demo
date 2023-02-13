import { Typography, Link } from "@mui/material";

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
        color="inherit"
        href="https://github.com/iamchenyu"
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
