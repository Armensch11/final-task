import {
  Icon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/typedReduxHooks/typedReduxHooks";
import { v4 as uuidv4 } from "uuid";
import SortIcon from "../../assets/sort-Icon.svg";
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
            <TableCell className="column-name entry">
              <div className="header-cell">
                <Typography>Entry</Typography>
                <Icon>
                  <img src={SortIcon} alt="Filter Icon" />
                </Icon>
              </div>
            </TableCell>
            <TableCell className="column-name entryName">
              <div className="header-cell">
                <Typography>Entry Name</Typography>
                <Icon>
                  <img src={SortIcon} alt="Filter Icon" />
                </Icon>
              </div>
            </TableCell>
            <TableCell className="column-name gene">
              <div className="header-cell">
                <Typography>Gene</Typography>
                <Icon>
                  <img src={SortIcon} alt="Filter Icon" />
                </Icon>
              </div>
            </TableCell>
            <TableCell className="column-name organism">
              <div className="header-cell">
                <Typography>Organism</Typography>
                <Icon>
                  <img src={SortIcon} alt="Filter Icon" />
                </Icon>
              </div>
            </TableCell>
            <TableCell className="column-name location">
              <div className="header-cell">
                <Typography> Subcellular Location</Typography>
                <Icon>
                  <img src={SortIcon} alt="Filter Icon" />
                </Icon>
              </div>
            </TableCell>
            <TableCell className="column-name length">
              <div className="header-cell">
                <Typography>Length</Typography>
                <Icon>
                  <img src={SortIcon} alt="Filter Icon" />
                </Icon>
              </div>
            </TableCell>
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
