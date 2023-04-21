import * as React from "react";
import PropTypes from "prop-types";
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
  TableSortLabel,
  TextField,
  InputAdornment,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import AddIcon from "@mui/icons-material/Add";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ClientsTableRow from "./ClientsTableRow";
import AddClient from "../AddClient/AddClient";
import AlertBanner from "../../AlertBanner";
import AppContext from "../../AppContext";
import PotentialClientTrackerApi from "../../api";
import "./ClientsTable.css";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "last_name",
    label: "Name",
  },
  {
    id: "current_status_name",
    label: "Status",
  },
  {
    id: "from_channel_name",
    label: "Channel",
  },
  {
    id: "created_at",
    label: "Days",
  },
  {
    id: "is_enrolled",
    label: "Is Enrolled?",
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow
        sx={{
          fontWeight: "bold",
          backgroundColor: "rgba(243, 180, 39, 0.6)",
          borderBottomColor: "rgba(107, 85, 148)",
        }}
      >
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
              sx={{ fontSize: "1rem" }}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default function ClientsTable() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("id");
  const [open, setOpen] = React.useState(false);
  const [err, setErr] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { user, clients } = React.useContext(AppContext);
  const [searchClients, setSearchClients] = React.useState(clients);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

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

  const handleSubmitSearchClientForm = async (e) => {
    e.preventDefault();
    const { data } = await PotentialClientTrackerApi.searchClient({
      searchTerm: e.target.value,
    });
    setSearchClients(data.client);
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
      <Box sx={{ display: "flex", justifyContent: "space-between", my: 3 }}>
        <TextField
          id="search"
          label="Search by name"
          variant="standard"
          onChange={handleSubmitSearchClientForm}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
          className="search-input"
        />

        <Button
          variant="contained"
          sx={{ my: 3 }}
          onClick={handleClickOpen}
          id="search-button"
        >
          <AddIcon />
          New Client
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={
              searchClients
                ? searchClients.length
                : clients
                ? clients.length
                : 0
            }
          />
          <TableBody>
            {searchClients ? (
              searchClients.length === 0 ? (
                <TableRow>
                  <TableCell
                    sx={{ fontSize: "1rem", color: "red", fontStyle: "italic" }}
                  >
                    No Clients Found. Please try again.
                  </TableCell>
                </TableRow>
              ) : (
                (rowsPerPage > 0
                  ? stableSort(
                      searchClients,
                      getComparator(order, orderBy)
                    ).slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : stableSort(searchClients, getComparator(order, orderBy))
                ).map((client) => (
                  <ClientsTableRow key={client.id} client={client} />
                ))
              )
            ) : clients ? (
              (rowsPerPage > 0
                ? stableSort(clients, getComparator(order, orderBy)).slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : stableSort(clients, getComparator(order, orderBy))
              ).map((client) => (
                <ClientsTableRow key={client.id} client={client} />
              ))
            ) : null}

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
