import { trow } from "@/app/Components/DsTablecomponent/helpers/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type InitState = {
  rows: trow[];
};

export const initialState: InitState = {
  rows: [],
};
// Redux Slice
export const activeObjectSlice = createSlice({
  name: "active",
  initialState,
  reducers: {
    setRows: (state, action: PayloadAction<trow[]>) => {
      state.rows = action.payload;
      return state;
    },
  },
});

export const { setRows } = activeObjectSlice.actions;

export default activeObjectSlice.reducer;
