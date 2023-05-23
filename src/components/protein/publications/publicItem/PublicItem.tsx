import { Button, Typography } from "@mui/material";
import { FC } from "react";

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
        <Typography>{title}</Typography>
        <Typography>{authors?.join(",")}</Typography>
        <Typography>{`Categories: ${categories?.join(", ")}`}</Typography>
        <Typography>{`Citied for: ${citied?.join(", ")}`}</Typography>
        <Typography>{`Source: ${source}`}</Typography>
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
