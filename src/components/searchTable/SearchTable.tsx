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
} from "src/hooks/typedReduxHooks/typedReduxHooks";
import { v4 as uuidv4 } from "uuid";

import { Dna } from "react-loader-spinner";
import "./SearchTable.css";
import React, {
  ReactNode,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";
import { fetchData, fetchSortedData } from "src/reducers/searchSlice";
import { CustomTableCell } from "./styled";
import { sortIcons, setIconsToDefault } from "src/utils/sortIconHandle";
interface CustomTableRowProps
  extends React.HTMLAttributes<HTMLTableRowElement> {
  children: ReactNode;
}

export const CustomTableRow = forwardRef<
  HTMLTableRowElement,
  CustomTableRowProps
>(({ children, ...props }, ref) => (
  <TableRow ref={ref} {...props}>
    {children}
  </TableRow>
));

//wrapped it in forward ref in order to provide ref property, as the default tableRow does not support it

const SearchTable: React.FC = React.memo(() => {
  const searchData = useAppSelector((state) => {
    return state.searchState.data;
  });
  const isLoading = useAppSelector((state) => state.searchState.isLoading);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastElementRef = useRef<HTMLTableRowElement | null>(null);
  //const searchTerm = useAppSelector((state) => state.searchState.searchTerm);
  const nextLink = useAppSelector((state) => state.searchState.nextLink);
  const dispatch = useAppDispatch();

  const [sortOrder, setSortOrder] = useState<string | null>(null);
  //experiment with sort
  const searchTerm = useAppSelector((state) => state.searchState.searchTerm);
  const filters = useAppSelector((state) => state.searchState.filters);

  const [sortIcon, setSortIcon] = useState({
    accession: "default",
    id: "default",
    gene: "default",
    organism_name: "default",
    length: "default",
  });

  const handleSortIconClick = (sortField: string): void => {
    if (sortOrder === "asc") {
      dispatch(
        fetchSortedData({
          searchTerm: searchTerm,
          filters: filters,
          sortField: sortField,
          sortOrder: "desc",
          isExpandResult: false,
        })
      );
      setSortIcon((prevState) => {
        setIconsToDefault(prevState);
        const newState = { ...prevState, [sortField]: "desc" };
        return newState;
      });
      setSortOrder("desc");
    } else if (sortOrder === "desc") {
      dispatch(
        fetchSortedData({
          searchTerm: searchTerm,
          filters: filters,
          sortField: "",
          sortOrder: null,
          isExpandResult: false,
        })
      );
      setSortIcon((prevState) => {
        setIconsToDefault(prevState);
        const newState = { ...prevState, [sortField]: "default" };
        return newState;
      });
      setSortOrder(null);
    } else {
      dispatch(
        fetchSortedData({
          searchTerm: searchTerm,
          filters: filters,
          sortField: sortField,
          sortOrder: "asc",
          isExpandResult: false,
        })
      );
      setSortIcon((prevState) => {
        setIconsToDefault(prevState);
        const newState = { ...prevState, [sortField]: "asc" };
        return newState;
      });
      setSortOrder("asc");
    }
  };
  //experiment with sort
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]): void => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (nextLink) {
            dispatch(
              fetchData({ searchQuery: "", nextLink, isExpandResult: true })
            );
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    if (lastElementRef.current) {
      observer.observe(lastElementRef.current);
    }

    return () => {
      if (lastElementRef.current) {
        observer.unobserve(lastElementRef.current);
      }
    };
  }, [searchData]);

  return (
    <>
      {isLoading && !nextLink ? (
        <div className="result-list-expand-loader">
          <Dna
            visible={true}
            height="80"
            width="80"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />
        </div>
      ) : (
        <div className="table-container" ref={containerRef}>
          <Table stickyHeader>
            <TableHead>
              <TableRow className="table-row">
                <CustomTableCell className="column-name index" width="40">
                  #
                </CustomTableCell>
                <CustomTableCell width="150" >
                  <div className="header-cell">
                    <Typography>Entry</Typography>
                    <Icon
                      onClick={() => {
                        handleSortIconClick("accession");
                      }}
                    >
                      <img
                        src={sortIcons[sortIcon.accession]}
                        alt="Filter Icon"
                      />
                    </Icon>
                  </div>
                </CustomTableCell>
                <CustomTableCell className="column-name entryName" width="150">
                  <div className="header-cell">
                    <Typography>Entry Name</Typography>
                    <Icon
                      onClick={() => {
                        handleSortIconClick("id");
                      }}
                    >
                      <img src={sortIcons[sortIcon.id]} alt="Filter Icon" />
                    </Icon>
                  </div>
                </CustomTableCell>
                <CustomTableCell className="column-name gene" width="150">
                  <div className="header-cell">
                    <Typography>Gene</Typography>
                    <Icon
                      onClick={() => {
                        handleSortIconClick("gene");
                      }}
                    >
                      <img src={sortIcons[sortIcon.gene]} alt="Filter Icon" />
                    </Icon>
                  </div>
                </CustomTableCell>
                <CustomTableCell className="column-name organism" width="220">
                  <div className="header-cell">
                    <Typography>Organism</Typography>
                    <Icon
                      onClick={() => {
                        handleSortIconClick("organism_name");
                      }}
                    >
                      <img
                        src={sortIcons[sortIcon.organism_name]}
                        alt="Filter Icon"
                      />
                    </Icon>
                  </div>
                </CustomTableCell>
                <CustomTableCell className="column-name location" width="150">
                  <div className="header-cell">
                    <Typography> Subcellular Location</Typography>
                 
                  </div>
                </CustomTableCell>
                <CustomTableCell className="column-name length" width="100">
                  <div className="header-cell">
                    <Typography>Length</Typography>
                    <Icon
                      onClick={() => {
                        handleSortIconClick("length");
                      }}
                    >
                      <img src={sortIcons[sortIcon.length]} alt="Filter Icon" />
                    </Icon>
                  </div>
                </CustomTableCell>
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
                      <TableCell width="40">{index + 1}</TableCell>
                      <TableCell width="150">
                        <Link to={`/protein/${item.primaryAccession}`}>
                          {item.primaryAccession}
                        </Link>
                      </TableCell>
                      <TableCell width="150">{item.uniProtkbId}</TableCell>
                      <TableCell width="150">
                        {item.genes
                          ? item.genes[0]?.geneName?.value
                          : "no genes data "}
                      </TableCell>
                      <TableCell width="220">
                        {item.organism.scientificName}
                      </TableCell>
                      <TableCell width="150">
                        {item.comments
                          ? item.comments[0]?.subcellularLocations[0]?.location
                              .value
                          : "no location data"}
                      </TableCell>
                      <TableCell width="100">{item.sequence.length}</TableCell>
                    </CustomTableRow>
                  );
                } else {
                  return (
                    <TableRow key={uuidv4()} className="table-row">
                      <TableCell width="40">{index + 1}</TableCell>
                      <TableCell width="150">
                        <Link to={`/protein/${item.primaryAccession}`}>
                          {item.primaryAccession}
                        </Link>
                      </TableCell>
                      <TableCell width="150">{item.uniProtkbId}</TableCell>
                      <TableCell width="150">
                        {item.genes
                          ? item.genes[0]?.geneName?.value
                          : "no genes data "}
                      </TableCell>
                      <TableCell width="220">
                        {item.organism.scientificName}
                      </TableCell>
                      <TableCell width="150">
                        {item.comments
                          ? item.comments[0]?.subcellularLocations[0]?.location
                              .value
                          : "no location data"}
                      </TableCell>
                      <TableCell width="100">{item.sequence.length}</TableCell>
                    </TableRow>
                  );
                }
              })}
            </TableBody>
            {/* </div> */}
          </Table>
          {isLoading && (
            <div className="result-list-expand-loader">
              <Dna
                visible={true}
                height="80"
                width="80"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
              />
            </div>
          )}
        </div>
      )}
    </>
  );
});

export default SearchTable;
