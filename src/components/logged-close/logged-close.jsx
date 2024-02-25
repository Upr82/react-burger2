import React from "react";
import { Navigate, useLocation } from "react-router";
import { useSelector } from "react-redux";


const LoggedClose = ({element}) => {

  const location = useLocation();
  const { from } = location.state || {from: { pathname: "/" }};

  const getLoggedIn = state => state.user.loggedIn;
  const loggedIn = useSelector(getLoggedIn);

  return loggedIn ? <Navigate to={from} /> : element;

}

export default LoggedClose;
