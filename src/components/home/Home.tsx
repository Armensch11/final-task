import {
  Button,
  IconButton,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import "./Home.css";
import {
  useAppDispatch,
  useAppSelector,
} from "../../hooks/typedReduxHooks/typedReduxHooks";
import { logOut } from "../../reducers/authSlice";
import filterIcon from "../../assets/filter-Icon.svg";
import SearchResult from "../../components/searchResult/SearchResult";

const StyledButton = styled(Button)({
  fontSize: "14px",
  textDecoration: "none",
  textTransform: "none",
});

const Home = () => {
  const userEmail = useAppSelector((state) => state.authState.userEmail);
  const dispatch = useAppDispatch();

  const onLogout = () => {
    dispatch(logOut());
    localStorage.clear();
  };

  return (
    <>
      <div className="home-container"></div>
      <div className="homePage-header">
        <Typography>{userEmail}</Typography>
        <StyledButton onClick={onLogout}>{"Log out"}</StyledButton>
      </div>
      <hr className="blue-line" />
      <div className="homePage-search">
        <TextField
          type={"search"}
          sx={{ width: "80%", minWidth: "500px" }}
          InputProps={{ sx: { height: 40 } }}
        ></TextField>
        <Button
          sx={{
            width: "180px",
            borderRadius: "8px",
            backgroundColor: "rgba(60, 134, 244, 0.2)",
          }}
        >
          {"Search"}
        </Button>
        <IconButton
          sx={{
            borderRadius: "8px",
            backgroundColor: "rgba(60, 134, 244, 0.2)",
          }}
        >
          <img src={filterIcon} alt="filter icon" />
        </IconButton>
      </div>
      <SearchResult />
    </>
  );
};

export default Home;
