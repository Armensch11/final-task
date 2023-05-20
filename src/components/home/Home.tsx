import { Button, TextField, Typography } from "@mui/material";

const Home = () => {
  const userEmail = "user@mailru";
  return (
    <>
      <div className="homePage-header">
        <Typography>{userEmail}</Typography>
        <Button>{"Logout"}</Button>
      </div>
      <div className="homePage-search">
        <TextField type={"search"}></TextField>
        <Button>{"Search"}</Button>
        <Button>{"filterIcon"}</Button>
      </div>
      <main className="homePage-main"></main>
    </>
  );
};

export default Home;
