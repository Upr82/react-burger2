import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

type TPRE = {
  element: JSX.Element
}

const ProtectedRouteElement = ({ element }: TPRE): JSX.Element => {

  const getLoggedIn = (state: any) => state.user.loggedIn;
  const loggedIn: boolean = useSelector(getLoggedIn);
  const location = useLocation();

  return loggedIn ? element : <Navigate to="/login" replace state={{ from: location }}/>;
}

export default ProtectedRouteElement;
