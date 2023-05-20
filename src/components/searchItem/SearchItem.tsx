import { Typography } from "@mui/material";
import { FC } from "react";
import { Link } from "react-router-dom";

type SearchItemProps = {
  entry: string;
  entryName: string;
  gene: string;
  organism: string;
  location: string;
  length: string;
};

const SearchItem: FC<SearchItemProps> = ({
  entry,
  entryName,
  gene,
  organism,
  location,
  length,
}) => {
  return (
    <>
      <div className="searchItem-container">
        <Link to="/search/">{entry}</Link>
        <Typography>{entryName}</Typography>
        <Typography>{gene}</Typography>
        <Typography>{organism}</Typography>
        <Typography>{location}</Typography>
        <Typography>{length}</Typography>
      </div>
    </>
  );
};

export default SearchItem;
