import { Button, IconButton, TextField } from "@mui/material";
import "./Home.css";
import { useAppDispatch } from "../../hooks/typedReduxHooks/typedReduxHooks";

import filterIcon from "../../assets/filter-Icon.svg";
import SearchResult from "../../components/searchResult/SearchResult";
import { useEffect, useState } from "react";
import { fetchData } from "../../reducers/searchSlice";
import { useSearchParams } from "react-router-dom";

const Home = () => {
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [_, setSearchParams] = useSearchParams({
    query: searchTerm,
  });

  useEffect(() => {
    dispatch(fetchData("n/a"));
    setSearchParams({ query: "n/a" });
  }, []);

  return (
    <>
      <div className="homePage-search">
        <TextField
          type={"search"}
          value={searchTerm}
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
          onClick={() => {
            setSearchTerm("");
          }}
          sx={{ width: "80%", minWidth: "500px" }}
          InputProps={{ sx: { height: 40 } }}
        ></TextField>
        <Button
          onClick={() => {
            if (!searchTerm) {
              dispatch(fetchData("n/a"));
              setSearchParams({ query: "n/a" });
            } else {
              dispatch(fetchData(searchTerm));
              setSearchParams({ query: searchTerm });
            }
          }}
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
