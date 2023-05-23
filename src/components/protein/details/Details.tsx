import { useRef, useState } from "react";
import { Alert, IconButton, Snackbar, Typography } from "@mui/material";
import useCopyToClipboard from "../../../hooks/copyToClipboard/useCopyToClipboard";
import { useAppSelector } from "../../../hooks/typedReduxHooks/typedReduxHooks";
import copyIcon from "../../../assets/copy-Icon.svg";
import "./Details.css";

const Details = () => {
  const sequenceRef = useRef<HTMLDivElement>(null);
  const [_, copyToClipboard] = useCopyToClipboard();
  const proteinData = useAppSelector((state) => state.proteinState);
  const [open, setOpen] = useState<boolean>(false);

  const copySequence = () => {
    if (sequenceRef.current) {
      const sequenceText = sequenceRef.current.innerText;
      copyToClipboard(sequenceText);
      setOpen(!!sequenceText);
    }
  };

  return (
    <>
      <div className="details-container">
        <div className="title">
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            Sequence
          </Typography>
        </div>
        <div className="desc-container">
          <div className="desc__left">
            <Typography sx={{ color: "#616161", fontSize: "12px" }}>
              Length
            </Typography>
            <Typography sx={{ color: "#616161", fontSize: "12px" }} mb={1}>
              {proteinData.sequence.length}
            </Typography>
            <Typography sx={{ color: "#616161", fontSize: "12px" }}>
              Mass(Da)
            </Typography>
            <Typography sx={{ color: "#616161", fontSize: "12px" }}>
              {proteinData.sequence.molWeight}
            </Typography>
          </div>
          <div className="desc__right">
            <Typography sx={{ color: "#616161", fontSize: "12px" }}>
              Last Updated
            </Typography>
            <Typography sx={{ color: "#616161", fontSize: "12px" }} mb={1}>
              {proteinData.lastUpdate}
            </Typography>
            <Typography sx={{ color: "#616161", fontSize: "12px" }}>
              Checksum
            </Typography>
            <Typography sx={{ color: "#616161", fontSize: "12px" }}>
              {proteinData.sequence.checksum}
            </Typography>
          </div>
        </div>
        <div className="sequence-container">
          <IconButton
            onClick={copySequence}
            sx={{ borderRadius: "8px", marginBottom: "8px" }}
          >
            <img src={copyIcon} alt="copy Icon" />
          </IconButton>
          <Typography
            ref={sequenceRef}
            sx={{
              backgroundColor: "#F2F2F2",
              borderRadius: "8px",
              fontSize: "12px",
              padding: "8px 16px",
            }}
          >
            {proteinData.sequence.value}
          </Typography>
        </div>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        autoHideDuration={1500}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          copied!
        </Alert>
      </Snackbar>
    </>
  );
};

export default Details;
