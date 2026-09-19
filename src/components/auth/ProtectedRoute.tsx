import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../custom/AuthContext";

export const ProtectedRoute = () => {
  const { state } = useAuth();

  if (!state) {
    return <Navigate to="/sign-in" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
