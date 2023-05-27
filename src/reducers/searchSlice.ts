import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UNIPROT_URL } from "../utils/uniprotURL/uniprotURL";
interface SearchState {
  data: any[];
  searchTerm: string;
  filters: string;
  isLoading: boolean;
  error: string | null;
}

const initialState: SearchState = {
  data: [],
  searchTerm: "",
  filters: "",
  isLoading: true,
  error: null,
};
export const fetchData = createAsyncThunk(
  "search/fetchData",
  async (searchQuery: string) => {
    try {
      const response = await fetch(
        `${UNIPROT_URL.BASE}search?fields=${UNIPROT_URL.FIELDS}&query=(${searchQuery})`
      );
      if (response.ok) {
        const data = await response.json();
        const headers = {
          link: response.headers.get("link"),
          totalResults: response.headers.get("X-Total-Results"),
          // Add other headers you want to access
        };

        console.log(headers);
        const result = data.results;
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
        state.data = action.payload;
        state.searchTerm = action.meta.arg;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch data";
      });
  },
});
export const { setFilters } = searchSlice.actions;
export const { reducer: searchReducer } = searchSlice;
