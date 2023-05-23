import { useEffect, useState } from "react";
import {
  useParams,
  Link as RouterLink,
  Outlet,
  Routes,
  Route,
} from "react-router-dom";
import Feature from "./feature/Feature";
import Details from "./details/Details";
import { Typography } from "@mui/material";
import { useAppDispatch } from "../../hooks/typedReduxHooks/typedReduxHooks";
import "./Protein.css";
import { setProteinInfo } from "../../reducers/proteinSlice";

interface ProteinData {
  uniProtkbId: string;
  organism: { scientificName: string };
  features: [{ description: string }];
  genes: [{ geneName: { value: string } }];
  geneType: string;
}

const Publications = () => {
  const { proteinId } = useParams();

  return (
    <div>
      <h1>Publications for Protein {proteinId}</h1>
    </div>
  );
};

const Protein = () => {
  const { proteinId } = useParams();
  const [protein, setProtein] = useState<ProteinData | null>(null);
  const dispatch = useAppDispatch();
  const [activeLink, setActiveLink] = useState("");

  const getProteinData = async () => {
    try {
      const response = await fetch(
        `https://rest.uniprot.org/uniprotkb/${proteinId}`
      );
      const proteinInfo = await response.json();
      // console.log(proteinInfo);
      setProtein(proteinInfo);
      const pickProteinData = {
        primaryAccession: proteinInfo.primaryAccession,
        lastUpdate: proteinInfo.entryAudit.lastSequenceUpdateDate,

        sequence: {
          value: proteinInfo.sequence.value,
          length: proteinInfo.sequence.length,
          molWeight: proteinInfo.sequence.molWeight,
          checksum: proteinInfo.sequence.crc64,
        },
      };
      dispatch(setProteinInfo(pickProteinData));
    } catch (error) {
      console.error("Error fetching protein data:", error);
    }
  };

  const onLinkClick = (link: string) => {
    setActiveLink(link);
  };

  useEffect(() => {
    getProteinData();
  }, [proteinId]);

  return (
    <div className="protein-info-container">
      <div className="protein-info-header">
        <Typography variant="h5">
          {proteinId + " / " + protein?.uniProtkbId}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            backgroundColor: "#D8E7FF",
            borderRadius: "12px",
            padding: "2px 12px",
            fontSize: "14px",
          }}
        >
          {protein?.organism.scientificName}
        </Typography>
      </div>
      <div className="protein-info-subheader">
        <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
          Protein
        </Typography>
        <Typography variant="subtitle2">
          {protein?.features[0]?.description}
        </Typography>
        <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
          Gene
        </Typography>
        <Typography variant="subtitle2">
          {protein?.genes[0].geneName.value}
        </Typography>
      </div>
      <div className="protein-info-main">
        <RouterLink
          to={`./details`}
          className={`link ${activeLink === "details" ? "active" : ""}`}
          onClick={() => onLinkClick("details")}
        >
          Details
        </RouterLink>
        <RouterLink
          to={`./feature`}
          className={`link ${activeLink === "feature" ? "active" : ""}`}
          onClick={() => onLinkClick("feature")}
        >
          Feature Viewer
        </RouterLink>
        <RouterLink
          to={`./publications`}
          className={`link ${activeLink === "publications" ? "active" : ""}`}
          onClick={() => onLinkClick("publications")}
        >
          Publications
        </RouterLink>
      </div>
      <Outlet />
      <Routes>
        <Route path="details" element={<Details />} />
        <Route path="feature" element={<Feature />} />
        <Route path="publications" element={<Publications />} />
      </Routes>
    </div>
  );
};

export default Protein;
