import * as React from "react";
import theme from "./Theme";
import { ThemeProvider } from "@mui/material/styles";
import AppRoutes from "./components/AppRoutes";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <AppRoutes />
      </div>
    </ThemeProvider>
  );
}

export default App;
