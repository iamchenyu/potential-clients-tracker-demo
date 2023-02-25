import * as React from "react";
import { TextField, MenuItem, Box } from "@mui/material";
import { citizenship, channels } from "../../../helper/formSelectOptions";

export default function ClientFormField({ client, disabled }) {
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <TextField
          margin="normal"
          disabled={disabled}
          id="firstName"
          label="First Name"
          name="firstName"
          defaultValue={client.first_name}
          sx={{ width: "30%" }}
        />
        <TextField
          margin="normal"
          disabled={disabled}
          id="lastName"
          label="Last Name"
          name="lastName"
          defaultValue={client.last_name}
          sx={{ width: "30%" }}
        />
        <TextField
          margin="normal"
          disabled={disabled}
          id="dob"
          label="Date of Birth"
          name="dob"
          defaultValue={client.dob}
          sx={{ width: "30%" }}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <TextField
          margin="normal"
          disabled={disabled}
          id="phone"
          label="Phone Number"
          name="phone"
          defaultValue={client.phone}
          sx={{ width: "45%" }}
        />
        <TextField
          margin="normal"
          disabled={disabled}
          id="email"
          label="Email Address"
          name="email"
          defaultValue={client.email}
          sx={{ width: "45%" }}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <TextField
          margin="normal"
          disabled={disabled}
          id="address"
          label="Address"
          name="address"
          defaultValue={client.address}
          sx={{ width: "45%" }}
        />
        <TextField
          margin="normal"
          select
          id="channel"
          disabled={disabled}
          label="How did you hear about us?"
          name="channel"
          defaultValue={client.from_channel}
          sx={{ width: "45%" }}
        >
          {channels.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <TextField
          margin="normal"
          select
          id="citizenship"
          disabled={disabled}
          label="Citizenship"
          name="citizenship"
          defaultValue={client.citizenship}
          sx={{ width: "30%" }}
        >
          {citizenship.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          margin="normal"
          select
          id="medicaid"
          disabled={disabled}
          label="Medicaid Eligibility"
          name="medicaid"
          defaultValue={client.medicaid}
          sx={{ width: "30%" }}
        >
          <MenuItem value={true}>Yes</MenuItem>
          <MenuItem value={false}>No</MenuItem>
        </TextField>
        <TextField
          margin="normal"
          select
          id="daycare"
          disabled={disabled}
          label="Daycare Eligibility"
          name="daycare"
          defaultValue={client.daycare}
          sx={{ width: "30%" }}
        >
          <MenuItem value={true}>Yes</MenuItem>
          <MenuItem value={false}>No</MenuItem>
        </TextField>
      </Box>

      <TextField
        margin="normal"
        disabled={disabled}
        fullWidth
        id="physician"
        label="Physician"
        name="physician"
        defaultValue={client.physician}
      />
      <TextField
        margin="normal"
        disabled={disabled}
        fullWidth
        id="diagnosis"
        label="Diagnosis"
        name="diagnosis"
        defaultValue={client.diagnosis}
      />
      <TextField
        margin="normal"
        disabled={disabled}
        fullWidth
        id="note"
        label="Note"
        name="note"
        defaultValue={client.note}
      />
    </>
  );
}
