import * as React from "react";
import { TextField, MenuItem, Box } from "@mui/material";
import { citizenship, channels } from "../../helper/formSelectOptions";

export default function AddClientField() {
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <TextField
          margin="normal"
          id="firstName"
          label="First Name"
          name="firstName"
          autoFocus
          sx={{ width: "30%" }}
        />
        <TextField
          margin="normal"
          id="lastName"
          label="Last Name"
          name="lastName"
          sx={{ width: "30%" }}
        />
        <TextField
          margin="normal"
          id="phone"
          label="Phone Number"
          name="phone"
          sx={{ width: "30%" }}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <TextField
          margin="normal"
          select
          id="citizenship"
          label="Citizenship"
          name="citizenship"
          sx={{ width: "30%" }}
          value={citizenship[0].value}
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
          label="Medicaid Eligibility"
          name="medicaid"
          sx={{ width: "30%" }}
          value={true}
        >
          <MenuItem value={true}>Yes</MenuItem>
          <MenuItem value={false}>No</MenuItem>
        </TextField>
        <TextField
          margin="normal"
          select
          id="daycare"
          label="Daycare Eligibility"
          name="daycare"
          sx={{ width: "30%" }}
          value={true}
        >
          <MenuItem value={true}>Yes</MenuItem>
          <MenuItem value={false}>No</MenuItem>
        </TextField>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <TextField
          margin="normal"
          id="email"
          label="Email Address"
          name="email"
          sx={{ width: "45%" }}
        />

        <TextField
          margin="normal"
          id="address"
          label="Address"
          name="address"
          sx={{ width: "45%" }}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <TextField
          margin="normal"
          select
          id="channel"
          label="How did you hear about us?"
          name="channel"
          sx={{ width: "45%" }}
          value={channels[0].value}
        >
          {channels.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          margin="normal"
          select
          id="isEnrolled"
          label="Is Enrolled?"
          name="isEnrolled"
          sx={{ width: "45%" }}
          value={false}
        >
          <MenuItem value={true}>Yes</MenuItem>
          <MenuItem value={false}>No</MenuItem>
        </TextField>
      </Box>
      <TextField
        margin="normal"
        fullWidth
        id="physician"
        label="Physician"
        name="physician"
      />
      <TextField
        margin="normal"
        fullWidth
        id="diagnosis"
        label="Diagnosis"
        name="diagnosis"
      />
      <TextField margin="normal" fullWidth id="note" label="Note" name="note" />
    </>
  );
}
