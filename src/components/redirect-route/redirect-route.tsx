import React, { FC } from "react";
import { Navigate, useLocation } from "react-router";
import { useSelector } from "react-redux";

type TRedirectRoute = {
  element: JSX.Element
}

const RedirectRoute: FC<TRedirectRoute> = ({element}) => {

  const location = useLocation();
  const { from } = location.state || {from: { pathname: "/" }};

  const getLoggedIn = (state: any) => state.user.loggedIn;
  const loggedIn = useSelector(getLoggedIn);

  return loggedIn ? <Navigate to={from} /> : element;

}

export default RedirectRoute;
