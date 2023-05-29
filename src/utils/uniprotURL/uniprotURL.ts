export enum UNIPROT_URL {
  BASE = "https://rest.uniprot.org/uniprotkb/",
  FIELDS = "accession,id,gene_names,organism_name,length,cc_subcellular_location",
  FACETS = "model_organism,proteins_with,annotation_score",
}
export const FACETS_URL =
  UNIPROT_URL.BASE + "search?facets=" + UNIPROT_URL.FACETS + "&query=";
