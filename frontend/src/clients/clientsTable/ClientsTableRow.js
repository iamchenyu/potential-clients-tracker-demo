import * as React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import ClientDetail from "../clientTabs/ClientDetail";
import moment from "moment";
import "./ClientsTableRow.css";

export default function ClientsTableRow({ client }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <TableRow className="client-table-row" onClick={handleClickOpen}>
        <TableCell component="th" scope="row" align="center">
          {client.first_name + " " + client.last_name}
        </TableCell>
        <TableCell align="center">{client.current_status_name}</TableCell>
        <TableCell align="center">{client.from_channel_name}</TableCell>
        <TableCell align="center">
          {moment(new Date()).diff(moment(client.created_at), "days")}
        </TableCell>
        <TableCell align="center">
          {client.is_enrolled === false ? "No" : "Yes"}
        </TableCell>
      </TableRow>
      <ClientDetail open={open} handleCancel={handleCancel} client={client} />
    </>
  );
}
