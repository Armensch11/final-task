import { useRef } from "react";
import { Button, Typography } from "@mui/material";
import useCopyToClipboard from "../../../hooks/copyToClipboard/useCopyToClipboard";
import "./Details.css";
import { useAppSelector } from "../../../hooks/typedReduxHooks/typedReduxHooks";

const Details = () => {
  const sequenceRef = useRef<HTMLDivElement>(null);
  const [_, copyToClipboard] = useCopyToClipboard();
  const proteinData = useAppSelector((state) => state.proteinState);

  const copySequence = () => {
    if (sequenceRef.current) {
      const sequenceText = sequenceRef.current.innerText;
      copyToClipboard(sequenceText);
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
          <Button onClick={copySequence}>Copy</Button>
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
    </>
  );
};

export default Details;
