import { Button, Typography } from "@mui/material";
import { FC } from "react";
import "./PublicItem.css";

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
};

const PublicItem: FC<PublicItemProps> = ({
  title,
  authors,
  categories,
  citied,
  source,
  links,
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
          <Button></Button>
          <Button></Button>
          <Button></Button>
        </div>
      </div>
    </>
  );
};

export default PublicItem;
