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
import "./SearchTable.css";

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
    <div className="table-container">
      <Table>
        <TableHead>
          <TableRow className="table-row">
            <TableCell className="column-name index">#</TableCell>
            <TableCell className="column-name entry">Entry</TableCell>
            <TableCell className="column-name entryName">Entry Name</TableCell>
            <TableCell className="column-name gene">Gene</TableCell>
            <TableCell className="column-name organism">Organism</TableCell>
            <TableCell className="column-name location">
              Subcellular Location
            </TableCell>
            <TableCell className="column-name length">Length</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {searchData.map((item, index) => (
            <TableRow key={uuidv4()} className="table-row">
              <TableCell className=" index">{index + 1}</TableCell>
              <TableCell className=" entry">
                <Link to={`/protein/${item.primaryAccession}`}>
                  {item.primaryAccession}
                </Link>
              </TableCell>
              <TableCell className=" entryName">{item.uniProtkbId}</TableCell>
              <TableCell className=" gene">
                {item.genes ? item.genes[0]?.geneName?.value : "no genes data "}
              </TableCell>
              <TableCell className=" organism">
                {item.organism.scientificName}
              </TableCell>
              <TableCell className=" location">
                {item.comments
                  ? item.comments[0]?.subcellularLocations[0]?.location.value
                  : "no location data"}
              </TableCell>
              <TableCell className=" length">{item.sequence.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SearchTable;
