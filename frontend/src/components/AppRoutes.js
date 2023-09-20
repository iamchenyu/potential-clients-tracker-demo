import * as React from "react";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Home from "../components/Home";
import ForgotPassword from "../auth/ForgotPassword";
import ResetPassword from "../auth/ResetPassword";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

function AppRoutes() {
  const [userId, setUserId] = React.useState(
    JSON.parse(localStorage.getItem("userId"))
  );
  const navigate = useNavigate();

  // if the user didn't opt in "remember me", we will check if his login time has exceeded 1 day
  // if so, we will erase his login information so that he needs to authenticate again
  // if not, do nothing and proceed to the homepage
  React.useEffect(() => {
    if (
      localStorage.getItem("initDate") &&
      new Date().getTime() >
        JSON.parse(localStorage.getItem("initDate")) + 24 * 3600000
    ) {
      console.log("user has been logged out");
      localStorage.removeItem("userId");
      localStorage.removeItem("initDate");
      window.location.reload(false);
    }
  }, []);

  // when a user login, we will save his user info to the local storage -> permenate until erased manually
  // if the use didn't choose "remember me", set up an initial date to check if it has exceeded 1 day next time when he logs in
  const handleLogin = (id, remember = false) => {
    setUserId(id);
    if (!remember) {
      localStorage.setItem("initDate", JSON.stringify(new Date().getTime()));
    }
    localStorage.setItem("userId", JSON.stringify(id));
    navigate("/");
  };

  const handleLogout = () => {
    setUserId(null);
    localStorage.removeItem("userId");
    localStorage.removeItem("initDate");
    navigate("/login");
  };

  return (
    <Routes>
      {userId ? (
        <>
          <Route
            path="/"
            element={<Home userId={userId} handleLogout={handleLogout} />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </>
      ) : (
        <>
          <Route
            path="/register"
            element={<Register handleLogin={handleLogin} />}
          />
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </>
      )}
    </Routes>
  );
}

export default AppRoutes;
