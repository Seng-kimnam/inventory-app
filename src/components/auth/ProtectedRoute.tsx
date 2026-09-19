import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../custom/AuthContext";

export const ProtectedRoute = () => {
  const { state } = useAuth();
  const location = useLocation();

  if (!state.user) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
