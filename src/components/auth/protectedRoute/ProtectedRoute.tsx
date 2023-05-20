import { Route, Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  path: string;
  element: React.ReactNode;
  isAuth: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  path,
  element,
  isAuth,
}) => {
  return (
    <Route
      path={path}
      element={
        isAuth ? (
          <Route path={path} element={element} />
        ) : (
          <Navigate to="/login" replace />
        )
      }
    />
  );
};

export default ProtectedRoute;
