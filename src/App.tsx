import InitialPage from "./pages/InitialPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

import { Routes, Route } from "react-router-dom";

import { Fragment } from "react";

import "./App.css";
import { useAppSelector } from "../src/hooks/typedReduxHooks/typedReduxHooks";
import Home from "../src/components/home/Home";
import Protein from "./components/protein/Protein";
import ProtectedRoute from "../src/components/auth/protectedRoute/ProtectedRoute";

const App = () => {
  const isAuth = useAppSelector((state) => {
    return state.authState.isLogged;
  });

  return (
    <Fragment>
      <Routes>
        <Route index element={<InitialPage />}></Route>
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
