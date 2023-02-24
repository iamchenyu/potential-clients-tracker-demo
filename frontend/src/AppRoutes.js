import * as React from "react";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Home from "./Home";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function AppRoutes() {
  let id;
  console.log(Cookies.get("access_token"));
  if (Cookies.get("access_token")) {
    id = Cookies.get("access_token").slice(
      Cookies.get("access_token").indexOf('"id"') + 5,
      Cookies.get("access_token").indexOf("}")
    );
    console.log("here: ", id);
  } else {
    id = null;
  }

  const [userId, setUserId] = React.useState(id);
  const navigate = useNavigate();

  console.log(userId);

  const handleLogin = (id, remember) => {
    setUserId(id);
    if (remember) {
      localStorage.setItem("userId", JSON.stringify(id));
    }
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
