import React, { useState } from "react";
import moment from "moment";
import {
  Container,
  Typography,
  Box,
  Divider,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import ClientsTable from "./clients/clientsTable/ClientsTable";
import PotentialClientTrackerApi from "./api";
import "./Home.css";
import Copyright from "./helper/copyright";
import HomepageLogo from "./HomepageLogo.png";
import AppContext from "./AppContext";

const Home = ({ userId, handleLogout }) => {
  const [user, setUser] = useState(null);
  const [clients, setClients] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  React.useEffect(() => {
    const fetchUser = async (id) => {
      try {
        const res = await PotentialClientTrackerApi.getUser(id);
        setUser(res.data.user);
      } catch (e) {
        console.log(e);
      }
    };
    const fetchClients = async () => {
      try {
        const res = await PotentialClientTrackerApi.getAllClients();
        setClients(res.data.clients);
      } catch (e) {
        console.log(e);
      }
    };
    fetchClients();
    fetchUser(userId);
  }, []);

  const homeContainer = {
    marginTop: 5,
    width: "80%",
    mx: "auto",
  };

  const homeHeaderContainer = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: "0 !important",
    paddingRight: "0 !important",
  };

  const homeCopyright = {
    position: "fixed",
    left: "0",
    bottom: "0",
    width: "100%",
    textAlign: "center",
    marginTop: "20px",
    backgroundColor: "white",
    py: "20px",
  };

  const handleUsernameClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = async () => {
    try {
      await PotentialClientTrackerApi.logout();
      handleLogout();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AppContext.Provider value={{ user, clients }}>
      <div className="home-wrap">
        <div className="home-imagewrapper">
          <div className="learntocodecontent">
            <img
              src={HomepageLogo}
              className="home-imagewrapper-logo"
              alt="ccacc logo"
            />
            <h3 className="home-imagewrapper-title">
              Potential Clients Tracker
            </h3>
          </div>
          <svg
            width="100%"
            height="150"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            id="home-svg"
          >
            <path
              id="wavepath"
              d="M0,0  L110,0C35,150 35,0 0,100z"
              fill="#472B7A"
            ></path>
          </svg>
        </div>
        <Box component="main" sx={homeContainer}>
          <Container sx={homeHeaderContainer}>
            <Typography variant="h2" id="home-welcome">
              Welcome Back, <br />
              <span className="home-username" onClick={handleUsernameClick}>
                {user ? user.first_name : "CCACC"}!
              </span>
            </Typography>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  ml: 1,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: "30px",
                    right: "115px",
                    width: "12px",
                    height: "15px",
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "left", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "center" }}
            >
              <MenuItem onClick={handleLogoutClick}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
            <Box id="home-calender">
              Today is {moment().format("MMMM Do YYYY")}.
              <Box sx={{ my: 1 }} />
              Have a great {moment().format("dddd")}!
            </Box>
          </Container>
          <Divider sx={{ marginTop: 5, marginBottom: 0 }} />
          <ClientsTable />
        </Box>
      </div>
      <Copyright sx={homeCopyright} />
    </AppContext.Provider>
  );
};

export default Home;
