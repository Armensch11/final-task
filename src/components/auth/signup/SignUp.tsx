import { useEffect, useState } from "react";
import {
  Button,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";

import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { auth } from "src/services/firebase";
import { emailFormat, passwordFormat } from "src/utils/validations";

import "./SignUp.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAppDispatch } from "src/hooks/typedReduxHooks/typedReduxHooks";
import { logIn } from "src/reducers/authSlice";
import { InfinitySpin } from "react-loader-spinner";
import { AUTH_SPINNER } from "src/utils/colorConsts";

const SignUp = (): JSX.Element => {
  // const emailRef = useRef<HTMLInputElement | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordMatchError, setPasswordMatchError] = useState<string | null>(
    null
  );
  const [isDisabled, setIsDisabled] = useState(true);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const showPasswordOnClick = (
    setter: React.Dispatch<React.SetStateAction<boolean>>
  ): void => setter((show) => !show);

  const mouseDownShowPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    event.preventDefault();
  };

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);

    e.target.value.match(emailFormat)
      ? setEmailError(null)
      : setEmailError("Please enter a valid email");
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);

    e.target.value.match(passwordFormat)
      ? setPasswordError(null)
      : setPasswordError(
          "Must contain at least 6 symbols, uppercase/lowercase characters and numbers"
        );
  };
  const validateEmail = async (): Promise<void> => {
    if (email.match(emailFormat)) {
      try {
        const signInMethods = await fetchSignInMethodsForEmail(auth, email);
        if (signInMethods.length > 0) {
          setEmailError("Email is already registered");
        } else {
          setEmailError(null);
        }
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        } else {
          throw new Error("Unknown error occurred");
        }
      }
    }
  };
  const handlePasswordConfirmationChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setPasswordConfirmation(e.target.value);
  };
  const signUpExecutor = async (): Promise<void> => {
    if (!email || !password || !passwordConfirmation) {
      return;
    }

    if (password !== passwordConfirmation) {
      return;
    }
    setIsSigningIn(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      dispatch(
        logIn({
          isLogged: true,
          email: email,
          uid: user.uid,
        })
      );
      setIsSigningIn(false);
      const idToken = await user.getIdToken();
      localStorage.setItem(
        "userData",
        JSON.stringify({
          email: email,
          token: idToken,
          uid: user.uid,
        })
      );

      navigate("/search");
    } catch (error) {
      // console.error("Sign-up error:", error);
      setFormError("An error occurred during sign-up.");
    }
  };
  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();
    await signUpExecutor();
  };
  const onPressEnter = async (): Promise<void> => {
    await signUpExecutor();
  };
  const onEmailBlur = (): void => {
    validateEmail();
  };

  useEffect(() => {
    if (
      password !== passwordConfirmation &&
      passwordConfirmation.length >= password.length
    ) {
      setPasswordMatchError("Еntered passwords do not match");
    } else {
      setPasswordMatchError(null);
    }
  }, [password, passwordConfirmation]);

  useEffect(() => {
    setIsDisabled(
      !!emailError ||
        !!passwordError ||
        !!passwordMatchError ||
        !password ||
        !passwordConfirmation ||
        password.length > passwordConfirmation.length
    );
  }, [
    emailError,
    passwordError,
    passwordMatchError,

    password,
    passwordConfirmation,
  ]);
  useEffect(() => {
    validateEmail();
  }, []);

  useEffect(() => {
    const user = localStorage.getItem("userData");

    if (user) {
      const userData = JSON.parse(user);
      dispatch(logIn({ ...userData, isLogged: true }));
      navigate("/search", { replace: true });
    }
  }, []);
  const loginSpinner = <InfinitySpin width="200" color={AUTH_SPINNER} />;
  return (
    <>
      {isSigningIn ? (
        <div className="signup-spinner">{loginSpinner}</div>
      ) : (
        <div className="signup">
          <Typography variant="h5" sx={{ color: "black", fontWeight: "bold" }}>
            Sign Up
          </Typography>
          <TextField
            required
            id="signup-email"
            label="Email"
            // value={email}
            value={email}
            onChange={onEmailChange}
            onBlur={onEmailBlur}
            fullWidth={true}
            error={!!emailError}
            helperText={emailError}
          ></TextField>
          <TextField
            required
            id="signup-password"
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={onPasswordChange}
            fullWidth={true}
            error={!!passwordError}
            helperText={passwordError}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    tabIndex={-1}
                    aria-label="toggle password visibility"
                    onClick={() => showPasswordOnClick(setShowPassword)}
                    onMouseDown={mouseDownShowPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          ></TextField>
          <TextField
            required
            id="signup-password-confirmation"
            label="Repeat Password"
            type={showPasswordRepeat ? "text" : "password"}
            value={passwordConfirmation}
            onChange={handlePasswordConfirmationChange}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                onPressEnter();
              }
            }}
            fullWidth={true}
            error={!!passwordMatchError}
            helperText={passwordMatchError}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    tabIndex={-1}
                    aria-label="toggle password visibility"
                    onClick={() => showPasswordOnClick(setShowPasswordRepeat)}
                    onMouseDown={mouseDownShowPassword}
                  >
                    {showPasswordRepeat ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          ></TextField>
          <Button
            fullWidth={true}
            sx={{ backgroundColor: "#D8E7FF" }}
            disabled={isDisabled}
            onClick={handleSubmit}
          >
            Create Account
          </Button>
          <Typography
            variant="subtitle2"
            sx={{ color: "black", fontSize: "14px" }}
          >
            {"Already have an account? "}
            <Link
              href="#"
              underline="hover"
              sx={{ color: "black", fontSize: "16px", fontWeight: "bold" }}
              component={RouterLink}
              to="/auth/login"
            >
              {"Login"}
            </Link>
          </Typography>
          {formError && <Typography>{formError}</Typography>}
        </div>
      )}
    </>
  );
};

export default SignUp;
