import { TableCell, styled } from "@mui/material";
import { TABLE_HEADER_CELL_BG } from "../../utils/colorConsts";

export const CustomTableCell = styled(TableCell)({
  backgroundColor: TABLE_HEADER_CELL_BG,
  borderRadius: "4px",
});
