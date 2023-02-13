import * as React from "react";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Home from "./Home";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

function AppRoutes() {
  const [userId, setUserId] = React.useState(
    JSON.parse(localStorage.getItem("userId"))
  );
  const navigate = useNavigate();

  const handleLogin = (id) => {
    setUserId(id);
    localStorage.setItem("userId", JSON.stringify(id));
    navigate("/");
  };

  const handleLogout = () => {
    setUserId(null);
    localStorage.removeItem("userId");
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
          <Route path="*" element={<Navigate to="/login" replace />} />
        </>
      )}
    </Routes>
  );
}

export default AppRoutes;
