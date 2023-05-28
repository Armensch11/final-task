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
import {
  useAppDispatch,
  useAppSelector,
} from "../../hooks/typedReduxHooks/typedReduxHooks";
import { v4 as uuidv4 } from "uuid";
import SortIcon from "../../assets/sort-Icon.svg";
import { Dna } from "react-loader-spinner";
import "./SearchTable.css";
import React, { ReactNode, forwardRef, useEffect, useRef } from "react";
import { fetchData } from "../../reducers/searchSlice";

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
interface CustomTableRowProps
  extends React.HTMLAttributes<HTMLTableRowElement> {
  children: ReactNode;
}

const CustomTableRow = forwardRef<HTMLTableRowElement, CustomTableRowProps>(
  ({ children, ...props }, ref) => (
    <TableRow ref={ref} {...props}>
      {children}
    </TableRow>
  )
);

const SearchTable: React.FC = () => {
  const searchData = useAppSelector((state) => {
    return state.searchState.data;
  });
  const isLoading = useAppSelector((state) => state.searchState.isLoading);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastElementRef = useRef<HTMLTableRowElement | null>(null);
  const searchTerm = useAppSelector((state) => state.searchState.searchTerm);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const options = {
      root: null, // Use the viewport as the root
      rootMargin: "0px",
      threshold: 0.5, // Trigger the callback when the element is at least 50% visible
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // The last element is now visible
          console.log("Last element is visible");
          console.log(searchTerm);
          dispatch(fetchData(searchTerm));
        } else {
          // The last element is not visible
          console.log("Last element is not visible");
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    if (lastElementRef.current) {
      observer.observe(lastElementRef.current);
    }

    // Cleanup by disconnecting the observer when component unmounts
    return () => {
      if (lastElementRef.current) {
        observer.unobserve(lastElementRef.current);
      }
    };
  }, [searchData]);

  return (
    <>
      {isLoading ? (
        <div className="spinner-container">
          {
            <Dna
              visible={true}
              height="80"
              width="80"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper"
            />
          }
        </div>
      ) : (
        <div className="table-container" ref={containerRef}>
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
            {/* <div style={{ overflow: "auto" }} ref={containerRef}> */}
            <TableBody className="results-table">
              {searchData.map((item, index) => {
                if (searchData.length === index + 1) {
                  return (
                    <CustomTableRow
                      key={uuidv4()}
                      className="table-row"
                      ref={lastElementRef}
                    >
                      <TableCell className=" index">{index + 1}</TableCell>
                      <TableCell className=" entry">
                        <Link to={`/protein/${item.primaryAccession}`}>
                          {item.primaryAccession}
                        </Link>
                      </TableCell>
                      <TableCell className=" entryName">
                        {item.uniProtkbId}
                      </TableCell>
                      <TableCell className=" gene">
                        {item.genes
                          ? item.genes[0]?.geneName?.value
                          : "no genes data "}
                      </TableCell>
                      <TableCell className=" organism">
                        {item.organism.scientificName}
                      </TableCell>
                      <TableCell className=" location">
                        {item.comments
                          ? item.comments[0]?.subcellularLocations[0]?.location
                              .value
                          : "no location data"}
                      </TableCell>
                      <TableCell className=" length">
                        {item.sequence.length}
                      </TableCell>
                    </CustomTableRow>
                  );
                } else {
                  return (
                    <TableRow key={uuidv4()} className="table-row">
                      <TableCell className=" index">{index + 1}</TableCell>
                      <TableCell className=" entry">
                        <Link to={`/protein/${item.primaryAccession}`}>
                          {item.primaryAccession}
                        </Link>
                      </TableCell>
                      <TableCell className=" entryName">
                        {item.uniProtkbId}
                      </TableCell>
                      <TableCell className=" gene">
                        {item.genes
                          ? item.genes[0]?.geneName?.value
                          : "no genes data "}
                      </TableCell>
                      <TableCell className=" organism">
                        {item.organism.scientificName}
                      </TableCell>
                      <TableCell className=" location">
                        {item.comments
                          ? item.comments[0]?.subcellularLocations[0]?.location
                              .value
                          : "no location data"}
                      </TableCell>
                      <TableCell className=" length">
                        {item.sequence.length}
                      </TableCell>
                    </TableRow>
                  );
                }
              })}
            </TableBody>
            {/* </div> */}
          </Table>
        </div>
      )}
    </>
  );
};

export default React.memo(SearchTable);
