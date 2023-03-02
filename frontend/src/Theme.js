import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#472B7A",
      light: "#6B5594",
      dark: "#311E55",
      contrastText: "#fff",
    },
    secondary: {
      main: "#FFCF1C",
      light: "#FFD849",
      dark: "#B29013",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
  },
  typography: {
    fontFamily: "Raleway",
  },
});

export default theme;
