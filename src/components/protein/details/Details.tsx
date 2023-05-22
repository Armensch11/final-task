import { Typography } from "@mui/material";
import "./Details.css";
const Details = () => {
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
              {" variable"}
            </Typography>
            <Typography sx={{ color: "#616161", fontSize: "12px" }}>
              Mass(Da)
            </Typography>
            <Typography sx={{ color: "#616161", fontSize: "12px" }}>
              {"mass variable"}
            </Typography>
          </div>
          <div className="desc__right">
            <Typography sx={{ color: "#616161", fontSize: "12px" }}>
              Last Updated
            </Typography>
            <Typography sx={{ color: "#616161", fontSize: "12px" }} mb={1}>
              {" updated variable"}
            </Typography>
            <Typography sx={{ color: "#616161", fontSize: "12px" }}>
              Checksum
            </Typography>
            <Typography sx={{ color: "#616161", fontSize: "12px" }}>
              {"checksum variable"}
            </Typography>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
