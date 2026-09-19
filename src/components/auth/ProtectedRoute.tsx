import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../custom/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { state } = useAuth();
  const location = useLocation();

  if (!state.user) {
    // Redirect to /sign-in, preserving current location in state
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
