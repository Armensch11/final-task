import { Button, IconButton, TextField } from "@mui/material";
import "./Home.css";
import { useAppDispatch } from "../../hooks/typedReduxHooks/typedReduxHooks";

import filterIcon from "../../assets/filter-Icon.svg";
import SearchResult from "../../components/searchResult/SearchResult";
import { useEffect, useRef, useState } from "react";
import { fetchData } from "../../reducers/searchSlice";
import { useSearchParams } from "react-router-dom";
import FilterModal from "../modals/filterModal/FilterModal";

interface Position {
  left: string;
  top: string;
}

const Home = () => {
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [_, setSearchParams] = useSearchParams({
    query: searchTerm,
  });
  const [show, setShow] = useState(false);
  const filterButtonRef = useRef<HTMLButtonElement>(null);
  const [filterButtonPosition, setFilterButtonPosition] = useState<Position>({
    left: "0",
    top: "0",
  });

  const showHideFilter = () => {
    setShow((prev) => {
      return !prev;
    });
  };

  useEffect(() => {
    dispatch(fetchData("n/a"));
    setSearchParams({ query: "n/a" });

    const handleResize = () => {
      if (filterButtonRef.current) {
        const { left, top } = filterButtonRef.current.getBoundingClientRect();
        setFilterButtonPosition({
          left: `${left - 335 + 20}px`,
          top: `${top + 26}px`,
        });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
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
          ref={filterButtonRef}
          onClick={showHideFilter}
          sx={{
            borderRadius: "8px",
            backgroundColor: "rgba(60, 134, 244, 0.2)",
            position: "relative",
          }}
        >
          <img src={filterIcon} alt="filter icon" />
        </IconButton>
      </div>
      {/* {show && <FilterModal show={show} />} */}
      {show && (
        <div
          style={
            filterButtonPosition && {
              position: "absolute",
              ...filterButtonPosition,
              width: "335px",
              height: "600px",
              padding: "12px 18px",
              zIndex: "999",
            }
          }
        >
          <FilterModal
            showHideFilter={showHideFilter}
            searchTerm={searchTerm}
          />
        </div>
      )}
      {show && (
        <div className="filter-modal-overlay" onClick={showHideFilter} />
      )}
      <SearchResult />
    </>
  );
};

export default Home;
