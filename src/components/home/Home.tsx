import { Button, IconButton, TextField } from "@mui/material";
import "./Home.css";
import {
  useAppDispatch,
  useAppSelector,
} from "src/hooks/typedReduxHooks/typedReduxHooks";

import filterIcon from "src/assets/filter-Icon.svg";
import SearchResult from "src/components/searchResult/SearchResult";
import { useEffect, useRef, useState, KeyboardEvent } from "react";
import {
  fetchData,
  setFilters,
  // resetPrevResults,
  setSearchInStore,
} from "src/reducers/searchSlice";
import { useSearchParams } from "react-router-dom";
import FilterModal from "../modals/filterModal/FilterModal";
import { BUTTON_BG } from "src/utils/colorConsts";
interface Position {
  left: string;
  top: string;
}

const Home = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [_, setSearchParams] = useSearchParams({
    query: searchTerm,
  });
  const filters = useAppSelector((state) => state.searchState.filters);

  const [show, setShow] = useState(false);

  const filterButtonRef = useRef<HTMLButtonElement>(null);
  const [filterButtonPosition, setFilterButtonPosition] = useState<Position>({
    left: "0",
    top: "0",
  });

  const showHideFilter = (): void => {
    setShow((prev) => {
      return !prev;
    });
  };
  const onPressEnter = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "Enter") {
      // dispatch(resetPrevResults({ data: [] }));

      searchTerm
        ? dispatch(setSearchInStore(searchTerm))
        : dispatch(setSearchInStore("n/a"));
      dispatch(
        fetchData({
          searchQuery: searchTerm
            ? encodeURIComponent(`${searchTerm}${filters}`)
            : encodeURIComponent("n/a"),
          isExpandResult: false,
        })
      );
      setSearchParams({
        query: searchTerm
          ? encodeURIComponent(`${searchTerm}${filters}`)
          : encodeURIComponent(`n/a`),
      });
    }
  };

  useEffect(() => {
    // dispatch(fetchData("n/a"));
    // setSearchParams({ query: "n/a" });

    const handleResize = (): void => {
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
  useEffect(() => {
    dispatch(setFilters({ filters: "" }));
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);
  return (
    <>
      <div className="homePage-search">
        {!!filters.length && <div className="filter-indicator"></div>}
        <TextField
          type={"search"}
          value={searchTerm}
          inputRef={searchInputRef}
          onKeyDown={onPressEnter}
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
          onClick={() => {
            dispatch(setFilters({ filters: "" }));
          }}
          sx={{ width: "80%", minWidth: "150px", height: "40px" }}
          InputProps={{ sx: { height: 40 } }}
        ></TextField>

        <Button
          onClick={() => {
            if (!searchTerm) {
              dispatch(
                fetchData({ searchQuery: "n/a", isExpandResult: false })
              );
              dispatch(setSearchInStore("n/a"));
              setSearchParams({ query: "n/a" });
            } else {
              //dispatch(resetPrevResults({ data: [] }));
              dispatch(setSearchInStore(searchTerm));
              dispatch(
                fetchData({
                  searchQuery: encodeURIComponent(`${searchTerm}${filters}`),
                  isExpandResult: false,
                })
              );
              setSearchParams({
                query: encodeURIComponent(`${searchTerm}${filters}`),
              });
            }
          }}
          sx={{
            width: "180px",
            borderRadius: "8px",
            backgroundColor: BUTTON_BG,
          }}
        >
          {"Search"}
        </Button>
        <IconButton
          ref={filterButtonRef}
          onClick={showHideFilter}
          sx={{
            borderRadius: "8px",
            backgroundColor: BUTTON_BG,
            position: "relative",
          }}
        >
          <img src={filterIcon} alt="filter icon" />
        </IconButton>
      </div>

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
