import * as React from "react";
import { TextField, MenuItem, Box } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import formatDate from "../../helper/dateConverter";
import {
  citizenship,
  channels,
  gender,
  marital,
  medicaid,
  daycare,
} from "../../helper/formSelectOptions";

const initialFormValues = {
  firstName: "",
  lastName: "",
  gender: gender[0].value,
  marital: marital[0].value,
  contact: "",
  relationship: "",
  initialContactDate: dayjs(new Date()).format("YYYY/MM/DD"),
  dob: dayjs(new Date("1900/01/01")).format("YYYY/MM/DD"),
  phone: "",
  email: "",
  address: "",
  channel: channels[0].value,
  citizenship: citizenship[0].value,
  medicaid: medicaid[0].value,
  daycare: daycare[0].value,
  physician: "",
  diagnosis: "",
  notes: "",
};

export default function AddClientField({ setFormData }) {
  const [formFields, setFormFields] = React.useState(initialFormValues);

  const handleFieldChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value });
    setFormData({
      ...formFields,
      [e.target.name]: e.target.value,
    });
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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            id="dob"
            label="Date of Birth"
            name="dob"
            value={dayjs(formFields.dob)}
            slotProps={{
              textField: {
                error: false,
              },
            }}
            onChange={(value) => {
              value = formatDate(dayjs(value).format("YYYY/MM/DD"));
              setFormFields({ ...formFields, dob: value });
              setFormData({ ...formFields, dob: value });
            }}
            sx={{ width: "30%", marginTop: "16px", marginBottom: "8px" }}
          />
        </LocalizationProvider>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <TextField
          margin="normal"
          select
          id="gender"
          label="Gender"
          name="gender"
          value={formFields.gender}
          onChange={handleFieldChange}
          sx={{ width: "30%" }}
        >
          {gender.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          margin="normal"
          select
          id="marital"
          label="Marital Status"
          name="marital"
          value={formFields.marital}
          onChange={handleFieldChange}
          sx={{ width: "30%" }}
        >
          {marital.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          margin="normal"
          select
          id="channel"
          label="How did you hear about us?"
          name="channel"
          value={formFields.channel}
          onChange={handleFieldChange}
          sx={{ width: "30%" }}
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
          id="contact"
          label="Contact Person"
          name="contact"
          value={formFields.contact}
          onChange={handleFieldChange}
          sx={{ width: "30%" }}
        />
        <TextField
          margin="normal"
          id="relationship"
          label="Relationship"
          name="relationship"
          value={formFields.relationship}
          onChange={handleFieldChange}
          sx={{ width: "30%" }}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            id="initialContactDate"
            label="Initial Contact Date"
            name="initialContactDate"
            value={dayjs(formFields.initialContactDate)}
            onChange={(value) => {
              value = formatDate(dayjs(value).format("YYYY/MM/DD"));
              setFormFields({ ...formFields, initialContactDate: value });
              setFormData({ ...formFields, initialContactDate: value });
            }}
            sx={{ width: "30%", marginTop: "16px", marginBottom: "8px" }}
          />
        </LocalizationProvider>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <TextField
          margin="normal"
          id="phone"
          label="Phone Number"
          name="phone"
          value={formFields.phone}
          onChange={handleFieldChange}
          sx={{ width: "30%" }}
        />
        <TextField
          margin="normal"
          id="email"
          label="Email Address"
          name="email"
          value={formFields.email}
          onChange={handleFieldChange}
          sx={{ width: "30%" }}
        />
        <TextField
          margin="normal"
          id="address"
          label="Address"
          name="address"
          value={formFields.address}
          onChange={handleFieldChange}
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
          label="Medicaid Category"
          name="medicaid"
          value={formFields.medicaid}
          onChange={handleFieldChange}
          sx={{ width: "30%" }}
        >
          {medicaid.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
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
          {daycare.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
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
        id="notes"
        label="Notes"
        name="notes"
        value={formFields.notes}
        onChange={handleFieldChange}
      />
    </>
  );
}
