export interface SearchResponse {
  results: ResultsItem[];
}

export interface ResultsItem {
  comments: CommentItem[];
  genes: GeneItem[];
  organism: Organism;
  primaryAccession: string;
  sequence: Sequence;
  uniProtkbId: string;
}

interface CommentItem {
  commentType: string;
  subcellularLocations: Location[];
}

interface GeneItem {
  geneName: GeneName;
}

interface GeneName {
  evidences?: string[];
  value: string;
}

interface Organism {
  commonName: string;
  scientificName: string;
  taxonId: number;
  lineage?: string[];
}

interface Sequence {
  length: number;
}

interface Location {
  location: LocationValue;
}

interface LocationValue {
  value: string;
  id: string;
}
export interface Headers {
  link: string | null;
  totalResults: string | null;
}
