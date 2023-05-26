import { Button, Typography, styled } from "@mui/material";
import "./UserLayout.css";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../hooks/typedReduxHooks/typedReduxHooks";
import { logOut } from "../../../reducers/authSlice";
import { ReactNode, FC } from "react";

type UserLayoutProps = {
  children: ReactNode;
};

const StyledButton = styled(Button)({
  fontSize: "14px",
  textDecoration: "none",
  textTransform: "none",
});

const UserLayout: FC<UserLayoutProps> = ({ children }) => {
  const userEmail = useAppSelector((state) => state.authState.userEmail);
  const dispatch = useAppDispatch();

  const onLogout = () => {
    dispatch(logOut());
    localStorage.clear();
  };

  return (
    <>
      <div className="homePage-header-container">
        <div className="homePage-header">
          <Typography>{userEmail}</Typography>
          <StyledButton onClick={onLogout}>{"Log out"}</StyledButton>
        </div>
        <hr className="blue-line" />
      </div>

      <div className="content">{children}</div>
    </>
  );
};

export default UserLayout;
