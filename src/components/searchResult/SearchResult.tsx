import SearchTable from "../searchTable/SearchTable";
import { useAppSelector } from "../../hooks/typedReduxHooks/typedReduxHooks";
import "./SearchResult.css";

const SearchResult: React.FC = () => {
  const result = useAppSelector((state) => {
    return state.searchState.data;
  });
  const searchTerm = useAppSelector((state) => {
  
    const term = decodeURIComponent(state.searchState.searchTerm);
  
    return term;
  });

  const searchPlaceholder = (
    <div className="searchResult-placeholder">
      <p>No data to display</p> <p>Please start search to display results</p>{" "}
    </div>
  );
  const hasResult = (
    <div>
      <p
        style={{ marginLeft: "130px" }}
      >{`${result?.length} Search results found for "${searchTerm}" `}</p>
      <SearchTable />
    </div>
  );

  return <>{!!result?.length ? hasResult : searchPlaceholder}</>;
};

export default SearchResult;
