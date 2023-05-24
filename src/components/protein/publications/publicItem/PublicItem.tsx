import { Button, Link, Typography } from "@mui/material";
import { FC } from "react";
import "./PublicItem.css";

import { PUBL_URL } from "../../../../utils/publivationsURL/publicationsURL";

type Link = {
  database: string;
  id: string;
};

type PublicItemProps = {
  title: string;
  authors: string[];
  categories?: string[];
  citied?: string[];
  source?: string;
  links?: Link[];
  link3Title?: string;
};

const PublicItem: FC<PublicItemProps> = ({
  title,
  authors,
  categories,
  citied,
  source,
  links,
  link3Title,
}) => {
  return (
    <>
      <div className="publication-container">
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: "bold", color: "#000000" }}
        >
          {title}
        </Typography>
        <Typography variant="body2" mb={2}>
          {authors?.join(",")}
        </Typography>
        <Typography variant="body2">{`Categories: ${categories?.join(
          ", "
        )}`}</Typography>
        <Typography variant="body2">{`Citied for: ${citied?.join(
          ", "
        )}`}</Typography>
        <Typography variant="body2">{`Source: ${source}`}</Typography>
        <div className="links-container">
          <Button variant="outlined" sx={{ height: 24, width: 88 }}>
            <Link
              underline="none"
              href={links ? `${PUBL_URL.PRO_MED}${links[0].id}` : "#"}
              target="_blank"
              rel="noreferrer"
              sx={{ fontSize: "12px", fontWeight: "600" }}
            >
              PubMed
            </Link>
          </Button>

          <Button variant="outlined" sx={{ height: 24, width: 128 }}>
            <Link
              underline="none"
              href={links ? `${PUBL_URL.EUR_PMC}${links[0]?.id}` : "#"}
              target="_blank"
              rel="noreferrer"
              sx={{ fontSize: "12px", fontWeight: "600" }}
            >
              Europe PMC
            </Link>
          </Button>

          <Button variant="outlined" sx={{ height: 24, width: 230 }}>
            <Link
              underline="none"
              href={links ? `${PUBL_URL.DOI}${links[1]?.id}` : "#"}
              target="_blank"
              rel="noreferrer"
              sx={{ fontSize: "12px", fontWeight: "600" }}
            >
              {link3Title}
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default PublicItem;
