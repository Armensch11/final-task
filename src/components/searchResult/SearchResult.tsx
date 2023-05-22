import SearchTable from "../searchTable/SearchTable";
import { useAppSelector } from "../../hooks/typedReduxHooks/typedReduxHooks";
import "./SearchResult.css";

const SearchResult = () => {
  const result = useAppSelector((state) => {
    return state.searchState.data;
  });
  const searchPlaceholder = (
    <div className="searchResult-placeholder">
      <p>No data to display</p> <p>Please start search to display results</p>{" "}
    </div>
  );

  return <>{result.length ? <SearchTable /> : searchPlaceholder}</>;
};

export default SearchResult;
