import { FC } from "react";
import { Navigate } from "react-router-dom";
import UserLayout from "../../layouts/userLayout/UserLayout";
interface ProtectedRouteProps {
  isAuth: boolean;
  children: React.ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({
  isAuth,
  children,
}): React.ReactElement | null => {
  if (!isAuth) {
    return <Navigate to="/auth/login" replace />;
  }
  return <UserLayout children={children}></UserLayout>;
};

export default ProtectedRoute;
