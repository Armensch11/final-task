import InitialPage from "./pages/InitialPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
// import HomePage from "./pages/HomePage";

import { Routes, Route } from "react-router-dom";

import { Fragment } from "react";

import "./App.css";
import { useAppSelector } from "../src/hooks/typedReduxHooks/typedReduxHooks";
import Home from "../src/components/home/Home";
import ProtectedRoute from "../src/components/auth/protectedRoute/ProtectedRoute";

const App = () => {
  const isAuth = useAppSelector((state) => {
    return state.authState.isLogged;
  });

  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<InitialPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signup" element={<SignUpPage />}></Route>
        <ProtectedRoute
          path="/home"
          element={<Home />}
          isAuth={isAuth}
        ></ProtectedRoute>
      </Routes>
    </Fragment>
  );
};

export default App;
