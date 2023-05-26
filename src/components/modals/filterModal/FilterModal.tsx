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
import { useEffect, useState } from "react";
import { fetchFilterOptions } from "../../../utils/fetchFilterOptions";

interface Option {
  value: string;
  label?: string;
  count: number;
}

const FilterModal = ({
  show,
  searchTerm,
}: {
  show: boolean;
  searchTerm: string;
}) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [options, setOptions] = useState<Record<string, Option[]>>();

  const extractOptions = async () => {
    const optionsData = await fetchFilterOptions(searchTerm);
    setOptions(optionsData);
  };

  useEffect(() => {
    extractOptions();
  }, []);

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
            >
              {" "}
            </TextField>
          </Box>
          <Box>
            <FormControl fullWidth>
              <Typography sx={{ fontWeight: "bold" }}>Organism</Typography>
              <Select
                // onChange={handleChange}
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
              ></TextField>
              <div className="divider" />
              <TextField
                label="To"
                sx={{ width: "35%", bgcolor: "#F5F5F5" }}
              ></TextField>
            </Stack>
          </Box>
          <Box>
            <FormControl fullWidth>
              <Typography sx={{ fontWeight: "bold" }}>
                Annotation score
              </Typography>
              <Select
                value={"5"}
                // onChange={handleChange}
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
                value={"5"}
                // onChange={handleChange}
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
            <Button sx={{ width: "50%" }}>Cancel</Button>
            <Button
              sx={{ width: "50%", bgcolor: "rgba(60, 134, 244, 0.2)" }}
              disabled={!isActive}
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
