import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Button,
  TablePagination,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ClientsTableRow from "./ClientsTableRow";
import AddClient from "../AddClient/AddClient";
import AlertBanner from "../../AlertBanner";
import AppContext from "../../AppContext";

export default function ClientsTable() {
  const [open, setOpen] = React.useState(false);
  const [err, setErr] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { user, clients } = React.useContext(AppContext);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - clients.length) : 0;

  const handleClickOpen = () => {
    if (user.role === "viewer") {
      setErr("You don't have permission to add a new client");
    } else {
      setOpen(true);
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box>
      {err ? (
        <AlertBanner
          severity="error"
          title="Add Failed"
          msg={`${err} - please try again`}
          setErr={setErr}
        />
      ) : null}
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button variant="contained" sx={{ my: 3 }} onClick={handleClickOpen}>
          <AddIcon />
          New Client
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow
              sx={{
                fontWeight: "bold",
                borderBottomColor: "rgba(107, 85, 148)",
              }}
            >
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Channel</TableCell>
              <TableCell align="center">Days</TableCell>
              <TableCell align="center">Is Enrolled?</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients
              ? (rowsPerPage > 0
                  ? clients.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : clients
                ).map((client) => (
                  <ClientsTableRow key={client.id} client={client} />
                ))
              : null}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {clients ? (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={clients.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      ) : null}

      <AddClient open={open} handleCancel={handleCancel} />
    </Box>
  );
}
