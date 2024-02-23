import React from "react";
import { Navigate, useLocation } from "react-router";
import { useSelector } from "react-redux";


const LoggedClose = ({element}) => {

  const location = useLocation();
  const { from } = location.state || {from: { pathname: "/" }};
  const loggedIn = useSelector(state => state.user.loggedIn);

  return loggedIn ? <Navigate to={from} /> : element;

}

export default LoggedClose;
