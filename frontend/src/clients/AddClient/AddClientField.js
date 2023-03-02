import * as React from "react";
import { TextField, MenuItem, Box } from "@mui/material";
import { citizenship, channels } from "../../helper/formSelectOptions";

const initialFormValues = {
  firstName: "",
  lastName: "",
  dob: "",
  phone: "",
  email: "",
  address: "",
  channel: channels[0].value,
  citizenship: citizenship[0].value,
  medicaid: true,
  daycare: true,
  physician: "",
  diagnosis: "",
  note: "",
};

export default function AddClientField({ setFormData }) {
  const [formFields, setFormFields] = React.useState(initialFormValues);

  const handleFieldChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value });
    setFormData(formFields);
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <TextField
          margin="normal"
          id="firstName"
          label="First Name"
          name="firstName"
          value={formFields.firstName}
          onChange={handleFieldChange}
          autoFocus
          sx={{ width: "30%" }}
        />
        <TextField
          margin="normal"
          id="lastName"
          label="Last Name"
          name="lastName"
          value={formFields.lastName}
          onChange={handleFieldChange}
          sx={{ width: "30%" }}
        />
        <TextField
          margin="normal"
          id="dob"
          label="Date of Birth"
          name="dob"
          value={formFields.dob}
          onChange={handleFieldChange}
          sx={{ width: "30%" }}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <TextField
          margin="normal"
          id="phone"
          label="Phone Number"
          name="phone"
          value={formFields.phone}
          onChange={handleFieldChange}
          sx={{ width: "45%" }}
        />
        <TextField
          margin="normal"
          id="email"
          label="Email Address"
          name="email"
          value={formFields.email}
          onChange={handleFieldChange}
          sx={{ width: "45%" }}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <TextField
          margin="normal"
          id="address"
          label="Address"
          name="address"
          value={formFields.address}
          onChange={handleFieldChange}
          sx={{ width: "45%" }}
        />
        <TextField
          margin="normal"
          select
          id="channel"
          label="How did you hear about us?"
          name="channel"
          value={formFields.channel}
          onChange={handleFieldChange}
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
          label="Citizenship"
          name="citizenship"
          value={formFields.citizenship}
          onChange={handleFieldChange}
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
          label="Medicaid Eligibility"
          name="medicaid"
          value={formFields.medicaid}
          onChange={handleFieldChange}
          sx={{ width: "30%" }}
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
          value={formFields.daycare}
          onChange={handleFieldChange}
          sx={{ width: "30%" }}
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
        value={formFields.physician}
        onChange={handleFieldChange}
      />
      <TextField
        margin="normal"
        fullWidth
        id="diagnosis"
        label="Diagnosis"
        name="diagnosis"
        value={formFields.diagnosis}
        onChange={handleFieldChange}
      />
      <TextField
        margin="normal"
        fullWidth
        id="note"
        label="Note"
        name="note"
        value={formFields.note}
        onChange={handleFieldChange}
      />
    </>
  );
}
