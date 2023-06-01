import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UNIPROT_URL } from "src/utils/uniprotURL/uniprotURL";
import { SearchResponse, ResultsItem, Headers } from "src/api/interfaces";
import { extractNextLink } from "src/utils/extractNextLink";
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
  totalResults: null,
  nextLink: null,
  isLoading: true,
  error: null,
};
interface SearchResult {
  result: ResultsItem[];
  headers: Headers;
  isExpandResult: boolean;
}
type RequestSearch = {
  searchQuery: string;
  nextLink?: string;
  isExpandResult: boolean;
};
type RequestSortedSearch = {
  searchTerm: string;
  filters: string;
  sortField: string;
  sortOrder: string | null;
  isExpandResult: boolean;
};
export const fetchData = createAsyncThunk(
  "search/fetchData",

  async ({
    searchQuery,
    nextLink,
    isExpandResult,
  }: RequestSearch): Promise<SearchResult | null> => {
    try {
      const response = await fetch(
        nextLink
          ? nextLink
          : `${UNIPROT_URL.BASE}search?fields=${UNIPROT_URL.FIELDS}&query=(${searchQuery})`
      );

      if (!response.ok) {
        return {
          result: [],
          headers: { link: "", totalResults: "0" },
          isExpandResult: isExpandResult,
        };
      }

      const data: SearchResponse = await response.json();

      const linkHeader = extractNextLink(response.headers.get("link"));

      const headers: Headers = {
        link: linkHeader ? linkHeader : null,
        totalResults: response.headers.get("X-Total-Results"),
      };

      const result = {
        result: data.results,
        headers,
        isExpandResult: isExpandResult,
      };
      return result;
    } catch (error) {
      throw new Error("Failed to fetch data");
    }
  }
);
export const fetchSortedData = createAsyncThunk(
  "search/fetchSortedData",

  async ({
    searchTerm,
    filters,
    sortField,
    sortOrder,
    isExpandResult,
  }: RequestSortedSearch): Promise<SearchResult | null> => {
    try {
      const response = await fetch(
        sortField && sortOrder
          ? `${UNIPROT_URL.BASE}search?fields=${UNIPROT_URL.FIELDS}&query=(${searchTerm})${filters}&sort=${sortField} ${sortOrder}`
          : `${UNIPROT_URL.BASE}search?fields=${UNIPROT_URL.FIELDS}&query=(${searchTerm})${filters}`
      );

      if (!response.ok) {
        return {
          result: [],
          headers: { link: "", totalResults: "0" },
          isExpandResult: isExpandResult,
        };
      }

      const data: SearchResponse = await response.json();

      const linkHeader = extractNextLink(response.headers.get("link"));

      const headers: Headers = {
        link: linkHeader ? linkHeader : null,
        totalResults: response.headers.get("X-Total-Results"),
      };

      const result = {
        result: data.results,
        headers,
        isExpandResult: isExpandResult,
      };

      return result;
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
        // @ts-ignore
        state.data = action.payload?.isExpandResult
          ? [...state.data, ...action.payload.result]
          : // @ts-ignore
          action.payload?.result.length
          ? [...action.payload.result]
          : [];
        // state.searchTerm = action.meta.arg.searchQuery;
        state.totalResults = action.payload
          ? action.payload.headers.totalResults
          : null;
        state.nextLink = action.payload ? action.payload.headers.link : null;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.isLoading = false;
        state.data = [];
        state.error = action.error.message || "Failed to fetch data";
      })
      //sorted data reducer
      .addCase(fetchSortedData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload?.isExpandResult
          ? [...state.data, ...action.payload.result]
          : // @ts-ignore
            [...action.payload.result];
        state.nextLink = action.payload ? action.payload.headers.link : null;
        // Rest of the code remains the same
      });
  },
});
export const { setSearchInStore, setFilters, resetPrevResults } =
  searchSlice.actions;
export const { reducer: searchReducer } = searchSlice;
