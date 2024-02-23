import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRouteElement = ({ element }) => {
  const loggedIn = useSelector(state => state.user.loggedIn);
  const location = useLocation();

  return loggedIn ? element : <Navigate to="/login" replace state={{ from: location }}/>;
}

export default ProtectedRouteElement;
