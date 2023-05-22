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
import "./Protein.css";

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

  const getProteinData = async () => {
    try {
      const response = await fetch(
        `https://rest.uniprot.org/uniprotkb/${proteinId}`
      );
      const proteinInfo = await response.json();
      setProtein(proteinInfo);
      console.log(proteinInfo);
    } catch (error) {
      console.error("Error fetching protein data:", error);
    }
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
        <RouterLink to={`./details`} className="link">Details</RouterLink>
        <RouterLink to={`./features`} className="link">Feature Viewer</RouterLink>
        <RouterLink to={`./publications`} className="link">Publications</RouterLink>
      </div>
      <Outlet />
      <Routes>
        <Route path="details" element={<Details />} />
        <Route path="features" element={<Feature />} />
        <Route path="publications" element={<Publications />} />
      </Routes>
    </div>
  );
};

export default Protein;
