import { FC } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  isAuth: boolean;
  children: React.ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({
  isAuth,
  children,
}): React.ReactElement | null => {
  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
