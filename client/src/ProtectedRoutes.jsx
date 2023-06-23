import { Outlet, Navigate  } from "react-router-dom";
import Login from "./components/Login";

import React, { useContext } from "react";
import AuthContext from "./context/AuthProvider";

const ProtectedRoutes = () => {
  const { state, dispatch } = useContext(AuthContext);
  console.log(state);

  const isAuth = state.isAuthorized;
  return (
    <div>
      {isAuth ? <Outlet /> : <Navigate  to="/login" />}
    </div>
  );
};

export default ProtectedRoutes;
