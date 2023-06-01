import DESC_ICON from "src/assets/desc-Icon.png";
import ASC_ICON from "src/assets/asc-Icon.png";
import NO_SORT_ICON from "src/assets/noSort-Icon.png";

type SortIcons = {
  desc: string;
  asc: string;
  default: string;
  [key: string]: string; // Index signature
};
export const sortIcons: SortIcons = {
  desc: DESC_ICON,
  asc: ASC_ICON,
  default: NO_SORT_ICON,
};

type IconType = {
  accession: string;
  id: string;
  gene: string;
  organism_name: string;
  length: string;
};

export const setIconsToDefault = (obj: IconType) => {
  for (let key in obj) {
    obj[key as keyof typeof obj] = "default";
  }
};
