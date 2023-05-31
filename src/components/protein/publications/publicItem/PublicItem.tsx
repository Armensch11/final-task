import { styled, Link, Typography, Icon } from "@mui/material";
import { FC } from "react";
import "./PublicItem.css";

import { PUBL_URL } from "../../../../utils/publivationsURL/publicationsURL";
import linkIcon from "../../../../assets/external-link-Icon.svg";

type LinkType = {
  database: string;
  id: string;
};

type PublicItemProps = {
  title: string;
  authors: string[];
  categories?: string[];
  citied?: string[];
  source?: string;
  links?: LinkType[];
  link3Title?: string;
};
const StyledLink = styled(Link)({
  height: 24,

  fontSize: "12px",
  fontWeight: "600",
  border: "1px solid #3C86F4",
  borderRadius: "4px",
  textAlign: "center",

  lineHeight: "22px",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  columnGap: "8px",
  padding: "0px 4px",
});
const PublicItem: FC<PublicItemProps> = ({
  title,
  authors,
  categories,
  citied,
  source,
  links,
  link3Title,
}): JSX.Element => {
  const isLinkActive = (href: string): boolean => href.length > 0;
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
          <StyledLink
            underline="none"
            href={links ? `${PUBL_URL.PUB_MED}${links[0].id}` : "#"}
            target="_blank"
            rel="noreferrer"
          >
            <Typography variant="body2">Pub Med</Typography>
            <Icon sx={{ height: "28px" }}>
              <img src={linkIcon} alt="external link icon" />
            </Icon>
          </StyledLink>

          <StyledLink
            underline="none"
            href={links ? `${PUBL_URL.EUR_PMC}${links[0]?.id}` : "#"}
            target="_blank"
            rel="noreferrer"
          >
            <Typography variant="body2">Europe PMC</Typography>
            <Icon sx={{ height: "28px" }}>
              <img src={linkIcon} alt="external link icon" />
            </Icon>
          </StyledLink>

          <StyledLink
            underline="none"
            href={links && links[1] ? `${PUBL_URL.DOI}${links[1].id}` : "#"}
            target="_blank"
            rel="noreferrer"
            style={{
              pointerEvents: isLinkActive(
                links && links[1] ? `${PUBL_URL.DOI}${links[1].id}` : ""
              )
                ? "auto"
                : "none",
              border: isLinkActive(
                links && links[1] ? `${PUBL_URL.DOI}${links[1].id}` : ""
              )
                ? "1px solid #3C86F4"
                : "1px solid grey",
              color: isLinkActive(
                links && links[1] ? `${PUBL_URL.DOI}${links[1].id}` : ""
              )
                ? "#3C86F4"
                : "grey",
            }}
          >
            <Typography variant="body2">{link3Title}</Typography>
            <Icon sx={{ height: "28px" }}>
              <img src={linkIcon} alt="external link icon" />
            </Icon>
          </StyledLink>
        </div>
      </div>
    </>
  );
};

export default PublicItem;
