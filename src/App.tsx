import InitialPage from "./pages/InitialPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

import { Routes, Route, useNavigate } from "react-router-dom";

import { Fragment, useEffect } from "react";

import "./App.css";
import {
  useAppDispatch,
  useAppSelector,
} from "../src/hooks/typedReduxHooks/typedReduxHooks";
import Home from "../src/components/home/Home";
import Protein from "./components/protein/Protein";
import ProtectedRoute from "../src/components/auth/protectedRoute/ProtectedRoute";
import { logIn } from "../src/reducers/authSlice";
// import useAuth from "../src/hooks/checkLocalStorage/useAuth";
const App = () => {
  // useAuth();
  const isAuth = useAppSelector((state) => {
    return state.authState.isLogged;
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    const user = localStorage.getItem("userData");

    if (user) {
      const userData = JSON.parse(user);
      dispatch(logIn({ ...userData, isLogged: true }));
    }

    if (isAuth) {
      navigate("/search", { replace: true });
    }
  }, []);

  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<InitialPage />}></Route>
        <Route path="/auth/login" element={<LoginPage />}></Route>
        <Route path="/auth/signup" element={<SignUpPage />}></Route>
        <Route
          path="/search"
          element={<ProtectedRoute isAuth={isAuth}> {<Home />}</ProtectedRoute>}
        ></Route>
        <Route
          path="/protein/:proteinId/*"
          element={
            <ProtectedRoute isAuth={isAuth}> {<Protein />}</ProtectedRoute>
          }
        ></Route>
      </Routes>
    </Fragment>
  );
};

export default App;
