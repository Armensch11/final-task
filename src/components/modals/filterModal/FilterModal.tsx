import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import "./FilterModal.css";
import { useCallback, useEffect, useState } from "react";
import { fetchFilterOptions } from "../../../utils/fetchFilterOptions";
import { useAppDispatch } from "../../../hooks/typedReduxHooks/typedReduxHooks";
import { setFilters } from "../../../reducers/searchSlice";
// import { setApplyButtonStatus } from "../../../utils/validations";
interface Option {
  value: string;
  label?: string;
  count: number;
}

const FilterModal = ({
  showHideFilter,
  searchTerm,
}: {
  showHideFilter: () => void;
  searchTerm: string;
}) => {
  const [options, setOptions] = useState<Record<string, Option[]>>();

  const [gene, setGene] = useState<string>("");
  const [organismName, setOrganismName] = useState<string>("");
  const [annotationScore, setAnnotationScore] = useState<string>("");
  const [proteinWith, setProteinWith] = useState<string>("");
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");
  const isActive =
    gene ||
    organismName ||
    annotationScore ||
    proteinWith ||
    (fromValue && toValue);

  const dispatch = useAppDispatch();

  const filterValues = {
    gene,
    model_organism: organismName,
    length:
      +fromValue >= 401 && +toValue <= 600
        ? `[${fromValue} TO ${toValue}]`
        : "",
    annotation_score: annotationScore,
    proteins_with: proteinWith,
  };

  const extractOptions = useCallback(async () => {
    if (searchTerm) {
      const optionsData = await fetchFilterOptions(searchTerm);
      setOptions(optionsData);
    }
  }, [searchTerm]);

  useEffect(() => {
    extractOptions();
  }, [searchTerm, extractOptions]);

  return (
    <>
      <div className="filter-modal-container">
        <Box className="filter-modal__body">
          <Typography variant="h6" sx={{ fontWeight: "bold" }} mb={2}>
            Filters
          </Typography>

          <Box>
            <Typography sx={{ fontWeight: "bold" }}>Gene Name</Typography>
            <TextField
              label="Enter Gene Name"
              fullWidth
              sx={{
                bgcolor: "#F5F5F5",
              }}
              value={gene}
              onChange={(e) => {
                setGene(e.target.value);
              }}
            ></TextField>
          </Box>
          <Box>
            <FormControl fullWidth>
              <Typography sx={{ fontWeight: "bold" }}>Organism</Typography>
              <Select
                value={organismName}
                onChange={(e) => {
                  setOrganismName(e.target.value);
                }}
                sx={{ bgcolor: "#F5F5F5" }}
              >
                {options?.organism.map((option) => (
                  <MenuItem
                    key={option.value + option.label}
                    value={option.value}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box>
            <Typography sx={{ fontWeight: "bold" }}>Sequence length</Typography>
            <Stack direction="row" spacing={2} justifyContent={"space-between"}>
              <TextField
                label="From"
                sx={{ width: "35%", bgcolor: "#F5F5F5" }}
                value={fromValue}
                placeholder="401"
                onChange={(e) => {
                  setFromValue(e.target.value);
                }}
                onBlur={() => {
                  if (+fromValue < 401) {
                    setFromValue("401");
                  }
                  if (toValue && +toValue <= +fromValue) {
                    setFromValue((+toValue - 1).toString());
                  }
                }}
              ></TextField>
              <div className="divider" />
              <TextField
                label="To"
                sx={{ width: "35%", bgcolor: "#F5F5F5" }}
                value={toValue}
                placeholder="600"
                onChange={(e) => {
                  setToValue(e.target.value);
                }}
                onBlur={() => {
                  if (+toValue > 600) {
                    setToValue("600");
                  }
                  if (fromValue && +toValue <= +fromValue) {
                    setToValue((+fromValue + 1).toString());
                  }
                }}
              ></TextField>
            </Stack>
          </Box>
          <Box>
            <FormControl fullWidth>
              <Typography sx={{ fontWeight: "bold" }}>
                Annotation score
              </Typography>
              <Select
                value={annotationScore}
                onChange={(e) => {
                  setAnnotationScore(e.target.value);
                }}
                sx={{ bgcolor: "#F5F5F5" }}
              >
                {options?.annotation.map((option) => (
                  <MenuItem
                    key={option.value + option.value}
                    value={option.value}
                  >
                    {option.value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box>
            <FormControl fullWidth>
              <Typography sx={{ fontWeight: "bold" }}>Protein with</Typography>
              <Select
                value={proteinWith}
                onChange={(e) => {
                  setProteinWith(e.target.value);
                }}
                sx={{ bgcolor: "#F5F5F5" }}
              >
                {options?.protein.map((option) => (
                  <MenuItem
                    key={option.value + option.label}
                    value={option.value}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Stack direction="row" spacing={2} justifyContent="space-between">
            <Button
              onClick={(e) => {
                e.preventDefault();
                showHideFilter();
              }}
              sx={{ width: "50%" }}
            >
              Cancel
            </Button>
            <Button
              sx={{ width: "50%", bgcolor: "rgba(60, 134, 244, 0.2)" }}
              disabled={!isActive}
              onClick={() => {
                const filters = Object.entries(filterValues).reduce(
                  (acc, item) => {
                    if (item[1] !== "") {
                      return acc + ` AND (${item[0]}:${item[1]})`;
                    } else {
                      return acc + "";
                    }
                  },
                  ""
                );
                if (filters.length) {
                  dispatch(setFilters({ filters }));
                }
                showHideFilter();
              }}
            >
              Apply Filters
            </Button>
          </Stack>
        </Box>
      </div>
    </>
  );
};

export default FilterModal;
