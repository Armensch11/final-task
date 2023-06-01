import { createSlice } from "@reduxjs/toolkit";

interface ProteinState {
  primaryAccession: string;
  lastUpdate: string;
  sequence: {
    value: string;
    length: number;
    molWeight: number;
    checksum: string;
  };
}

const initialState: ProteinState = {
  primaryAccession: "",
  lastUpdate: "",
  sequence: {
    value: "",
    length: 0,
    molWeight: 0,
    checksum: "",
  },
};

const proteinSlice = createSlice({
  name: "protein",
  initialState,
  reducers: {
    setProteinInfo: (state, action) => {
      state.primaryAccession = action.payload.primaryAccession;
      state.lastUpdate = action.payload.lastUpdate;
      state.sequence.value = action.payload.sequence.value;
      state.sequence.length = action.payload.sequence.length;
      state.sequence.molWeight = action.payload.sequence.molWeight;
      state.sequence.checksum = action.payload.sequence.checksum;
    },
  },
});
export const { setProteinInfo } = proteinSlice.actions;
export default proteinSlice.reducer;
