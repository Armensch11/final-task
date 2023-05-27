import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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
  isLoading: false,
  error: null,
};
export const fetchData = createAsyncThunk(
  "search/fetchData",
  async (searchQuery: string, ) => {
    try {
     
      const response = await fetch(
        `https://rest.uniprot.org/uniprotkb/search?fields=accession,id,gene_names,organism_name,length,cc_subcellular_location&query=${searchQuery}`
      );
      const data = await response.json();

      const result = data.results;
      // console.log(result);
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
    setFilters: (state, action) => {
      state.filters = action.payload.filters;
      console.log(state.filters);
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
