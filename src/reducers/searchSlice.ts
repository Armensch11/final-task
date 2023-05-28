import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UNIPROT_URL } from "../utils/uniprotURL/uniprotURL";
import { SearchResponse, ResultsItem, Headers } from "../api/interfaces";
import { extractNextLink } from "../utils/extractNextLInk";
interface SearchState {
  data: ResultsItem[];
  searchTerm: string;
  filters: string;
  totalResults: string | null;
  nextLink: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: SearchState = {
  data: [],
  searchTerm: "",
  filters: "",
  totalResults: "",
  nextLink: "",
  isLoading: true,
  error: null,
};
interface SearchResult {
  result: ResultsItem[];
  headers: Headers;
}
export const fetchData = createAsyncThunk<SearchResult, string>(
  "search/fetchData",
  async (searchQuery: string, { getState }) => {
    const { nextLink } = getState();
    console.log(nextLink);
    try {
      const response = await fetch(
        nextLink
          ? nextLink
          : `${UNIPROT_URL.BASE}search?fields=${UNIPROT_URL.FIELDS}&query=(${searchQuery})`
      );
      if (response.ok) {
        const data: SearchResponse = await response.json();
        console.log(data);
        const headers: Headers = {
          link: response.headers.get("link"),
          totalResults: response.headers.get("X-Total-Results"),
        };

        console.log(headers);
        const result = { result: data.results, headers };
        return result;
      }
    } catch (error) {
      throw new Error("Failed to fetch data");
    }
  }
);
const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload.filters;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = [...state.data, ...action.payload.result];
        state.searchTerm = action.meta.arg;
        state.totalResults = action.payload.headers.totalResults;
        const link = extractNextLink(action.payload.headers.link);
        state.nextLink = link;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch data";
      });
  },
});
export const { setFilters } = searchSlice.actions;
export const { reducer: searchReducer } = searchSlice;
