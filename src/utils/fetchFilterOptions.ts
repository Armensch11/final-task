const FACET_URL =
  "https://rest.uniprot.org/uniprotkb/search?facets=model_organism,proteins_with,annotation_score&query=";

interface Option {
  value: string;
  label?: string;
  count: number;
}
export const fetchFilterOptions = async (query: string) => {
  let organism: Option[];
  let protein: Option[];
  let annotation: Option[];
  try {
    const response = await fetch(`${FACET_URL}(${query})`);
    const optionsData = await response.json();
    organism = [...optionsData.facets[0].values];
    protein = [...optionsData.facets[1].values];
    annotation = [...optionsData.facets[2].values];
    console.log(organism, protein, annotation);
    return { organism, protein, annotation };
  } catch (error: any) {
    throw new Error(error.message);
  }
};
