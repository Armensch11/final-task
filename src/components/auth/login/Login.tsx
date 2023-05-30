import { useEffect, useState } from "react";
import { TextField, Button, Typography, Link } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../services/firebase";
import { emailFormat } from "../../../utils/validations";

import "./Login.css";
import { FirebaseError } from "firebase/app";
import { useAppDispatch } from "../../../hooks/typedReduxHooks/typedReduxHooks";
import { logIn } from "../../../reducers/authSlice";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (e.target.value.match(emailFormat)) {
      setEmailError(null);
    } else {
      setEmailError("Please enter a valid email");
    }
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (e.target.value?.length >= 6) {
      setPasswordError(null);
    } else {
      setPasswordError("Password is too short");
    }
  };

  const onUserLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (emailError || passwordError) {
      return;
    }
    try {
      if (email && password) {
        const { user } = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        const token = await auth.currentUser?.getIdToken(false);

        dispatch(logIn({ isLogged: true, email, uid: user.uid }));
        localStorage.setItem(
          "userData",
          JSON.stringify({ email, token, uid: user.uid })
        );
        navigate("/search");
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        const errorMessage = error.code;
        errorMessage === "auth/user-not-found"
          ? setEmailError("user does not exist")
          : setPasswordError("check whether password typed correctly");
        throw new Error("Authentication error: " + errorMessage);
      } else {
        throw new Error("An error occurred:" + error);
      }
    }
  };
  const onPressEnter = async () => {
    if (emailError || passwordError) {
      return;
    }
    try {
      if (email && password) {
        const { user } = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        const token = await auth.currentUser?.getIdToken(false);

        dispatch(logIn({ isLogged: true, email, uid: user.uid }));
        localStorage.setItem(
          "userData",
          JSON.stringify({ email, token, uid: user.uid })
        );
        navigate("/search");
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        const errorMessage = error.code;
        errorMessage === "auth/user-not-found"
          ? setEmailError("user does not exist")
          : setPasswordError("check whether password typed correctly");
        throw new Error("Authentication error: " + errorMessage);
      } else {
        throw new Error("An error occurred:" + error);
      }
    }
  };
  useEffect(() => {
    setIsDisabled(!!emailError || !!passwordError || !email || !password);
  }, [emailError, passwordError, email, password]);

  useEffect(() => {
    const user = localStorage.getItem("userData");

    if (user) {
      const userData = JSON.parse(user);
      dispatch(logIn({ ...userData, isLogged: true }));
      navigate("/search", { replace: true });
    }
  }, []);
  return (
    <>
      <div className="login">
        <Typography variant="h5" sx={{ color: "black", fontWeight: "bold" }}>
          Login
        </Typography>
        <TextField
          required
          id="login-email"
          label="Email"
          value={email}
          onChange={onEmailChange}
          fullWidth={true}
          error={!!emailError}
          helperText={emailError}
        />
        <TextField
          required
          id="login-password"
          label="Password"
          value={password}
          onChange={onPasswordChange}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              onPressEnter();
            }
          }}
          fullWidth={true}
          type="password"
          error={!!passwordError}
          helperText={passwordError}
        />
        <Button
          fullWidth={true}
          sx={{ backgroundColor: "#D8E7FF" }}
          onClick={onUserLogin}
          disabled={isDisabled}
        >
          {"Login"}
        </Button>
        <Typography
          variant="subtitle2"
          sx={{ color: "black", fontSize: "14px" }}
        >
          {"Don’t have an account? "}
          <Link
            href="#"
            underline="hover"
            sx={{ color: "black", fontSize: "16px", fontWeight: "bold" }}
            component={RouterLink}
            to="/auth/signup"
          >
            {"Sign up"}
          </Link>
        </Typography>
      </div>
    </>
  );
};
export default Login;
