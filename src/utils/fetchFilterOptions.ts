import { FACETS_URL } from "./uniprotURL/uniprotURL";

interface Option {
  value: string;
  label?: string;
  count: number;
}
export const fetchFilterOptions = async (
  query: string
): Promise<{ organism: Option[]; protein: Option[]; annotation: Option[] }> => {
  let organism: Option[];
  let protein: Option[];
  let annotation: Option[];
  try {
    const response = await fetch(`${FACETS_URL}(${query})`);
    const optionsData = await response.json();
    organism = [...optionsData.facets[0].values];
    protein = [...optionsData.facets[1].values];
    annotation = [...optionsData.facets[2].values];
    // console.log(organism, protein, annotation);
    return { organism, protein, annotation };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Unknown error occurred");
    }
  }
};
