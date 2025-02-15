import { useEffect, useState } from "react";
import {
  useParams,
  Link as RouterLink,
  Outlet,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Details from "./details/Details";
import Feature from "./feature/Feature";
import Publics from "./publications/Publics";

import { Button, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useAppDispatch } from "src/hooks/typedReduxHooks/typedReduxHooks";
import "./Protein.css";
import { setProteinInfo } from "src/reducers/proteinSlice";
import { UNIPROT_URL } from "src/utils/uniprotURL/uniprotURL";
import { TEXT_BG } from "src/utils/colorConsts";

interface ProteinData {
  uniProtkbId: string;
  organism: { scientificName: string };
  features: [{ description: string }];
  genes: [{ geneName: { value: string } }];
  geneType: string;
}

const Protein = (): JSX.Element => {
  const { proteinId } = useParams();
  const [protein, setProtein] = useState<ProteinData | null>(null);
  const dispatch = useAppDispatch();
  const [activeLink, setActiveLink] = useState("");

  const getProteinData = async (): Promise<void> => {
    try {
      const response = await fetch(`${UNIPROT_URL.BASE}${proteinId}`);
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
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  };

  const onLinkClick = (link: string): void => {
    setActiveLink(link);
  };

  useEffect(() => {
    getProteinData();
  }, [proteinId]);
  const navigate = useNavigate();

  const onGoBack = (): void => {
    navigate("/search"); // Navigate to another route
  };

  return (
    <div className="protein-info-container">
      <Button
        onClick={() => {
          onGoBack();
        }}
        sx={{ marginBottom: "24px", marginLeft: "-60px" }}
      >
        <ArrowBackIosNewIcon />
      </Button>
      <div className="protein-info-header">
        <Typography variant="h5">
          {proteinId + " / " + protein?.uniProtkbId}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            backgroundColor: TEXT_BG,
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
          {protein?.genes[0]?.geneName?.value}
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
        <Route index element={<Details />} />
        <Route path="details" element={<Details />} />
        <Route path="feature" element={<Feature />} />
        <Route path="publications" element={<Publics />} />
      </Routes>
    </div>
  );
};

export default Protein;
