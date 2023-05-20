import { FC } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/typedReduxHooks/typedReduxHooks";
import { v4 as uuidv4 } from "uuid";

type TableData = {
  entry: string;
  entryName: string;
  gene: string;
  organism: string;
  location: string;
  length: string;
  id: string;
};

type SearchTableProps = {
  data: TableData[];
};

const SearchTable = () => {
  const searchData = useAppSelector((state) => {
    return state.searchState.data;
  });

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Entry</TableCell>
          <TableCell>Entry Name</TableCell>
          <TableCell>Gene</TableCell>
          <TableCell>Organism</TableCell>
          <TableCell>Location</TableCell>
          <TableCell>Length</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {searchData.map((item) => (
          <TableRow key={uuidv4()}>
            <TableCell>
              <Link to="/search/">{item.primaryAccession}</Link>
            </TableCell>
            <TableCell>{item.uniProtkbId}</TableCell>
            <TableCell>
              {item.genes ? item.genes[0]?.geneName?.value : "no genes data "}
            </TableCell>
            <TableCell>{item.organism.scientificName}</TableCell>
            <TableCell>
              {item.comments[0]?.subcellularLocations[0]?.location.value}
            </TableCell>
            <TableCell>{item.sequence.length}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SearchTable;
