import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UNIPROT_URL } from "../utils/uniprotURL/uniprotURL";
import { SearchResponse, ResultsItem, Headers } from "../api/interfaces";
import { extractNextLink } from "../utils/extractNextLink";
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
type RequestSearch = {
  searchQuery: string;
  nextLink?: string;
};
export const fetchData = createAsyncThunk(
  "search/fetchData",

  async ({
    searchQuery,
    nextLink,
  }: RequestSearch): Promise<SearchResult|undefined> => {
    try {
      const response = await fetch(
        nextLink
          ? nextLink
          : `${UNIPROT_URL.BASE}search?fields=${UNIPROT_URL.FIELDS}&query=(${searchQuery})`
      );
      if (response.ok) {
        const data: SearchResponse = await response.json();

        const linkHeader = extractNextLink(response.headers.get("link"));

        const headers: Headers = {
          link: linkHeader ? linkHeader : null,
          totalResults: response.headers.get("X-Total-Results"),
        };

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
    setSearchInStore: (state, action) => {
      state.searchTerm = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = action.payload.filters;
    },
    resetPrevResults: (state, action) => {
      state.data = action.payload.data;
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
        // state.searchTerm = action.meta.arg.searchQuery;
        state.totalResults = action.payload.headers.totalResults;
        state.nextLink = action.payload.headers.link;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch data";
      });
  },
});
export const { setSearchInStore, setFilters, resetPrevResults } =
  searchSlice.actions;
export const { reducer: searchReducer } = searchSlice;
