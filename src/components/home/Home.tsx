import { Button, TextField, Typography } from "@mui/material";
import "./Home.css";
import { useAppSelector } from "../../hooks/typedReduxHooks/typedReduxHooks";
const Home = () => {
  const userEmail = useAppSelector((state) => state.authState.userEmail);
  return (
    <>
      <div className="home-container"></div>
      <div className="homePage-header">
        <Typography>{userEmail}</Typography>
        <Button>{"Logout"}</Button>
      </div>
      <hr className="blue-line" />
      <div className="homePage-search">
        <TextField
          type={"search"}
          sx={{ width: "80%" }}
          InputProps={{ sx: { height: 40 } }}
        ></TextField>
        <Button>{"Search"}</Button>
        <Button>{"filterIcon"}</Button>
      </div>
      <main className="homePage-main"></main>
    </>
  );
};

export default Home;
