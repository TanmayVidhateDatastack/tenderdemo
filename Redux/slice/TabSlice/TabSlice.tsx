import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TabState {
  [pageName: string]: string;
}

const initialState: TabState = {};

const tabSlice = createSlice({
  name: "tab",
  initialState,
  reducers: {
    setSelectedTabId: (
      state,
      action: PayloadAction<{ pageName: string; tabId: string }>
    ) => {
      const { pageName, tabId } = action.payload;
      state[pageName] = tabId;
    },
  },
});

export const { setSelectedTabId } = tabSlice.actions;
export default tabSlice.reducer;
