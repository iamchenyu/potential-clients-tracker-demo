import * as React from "react";
import { Alert, AlertTitle } from "@mui/material";

export default function AlertBanner({ severity, title, msg, setErr }) {
  return (
    <Alert
      severity={severity}
      onClose={() => {
        setErr(null);
      }}
    >
      <AlertTitle>{title}</AlertTitle>
      <strong>{msg}</strong>
    </Alert>
  );
}
