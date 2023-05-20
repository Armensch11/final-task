import "./SearchResult.css";

const SearchResult = () => {
  const result: string[] = [];
  const searchPlaceholder = (
    <div className="searchResult-placeholder">
      <p>No data to display</p> <p>Please start search to display results</p>{" "}
    </div>
  );
  return (
    <>
      {result.length
        ? result.map((item) => {
            return "result:" + item;
          })
        : searchPlaceholder}
    </>
  );
};

export default SearchResult;
