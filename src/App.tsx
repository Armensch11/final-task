import InitialPage from "./pages/InitialPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

import { Routes, Route } from "react-router-dom";

import "./App.css";
import { useAppSelector } from "src/hooks/typedReduxHooks/typedReduxHooks";
import Home from "src/components/home/Home";
import Protein from "./components/protein/Protein";
import ProtectedRoute from "src/components/auth/protectedRoute/ProtectedRoute";

import Page404 from "src/components/404/Page404";

const App = (): JSX.Element => {
  const isAuth = useAppSelector((state) => {
    return state.authState.isLogged;
  });

  return (
    <>
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
        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
};

export default App;
