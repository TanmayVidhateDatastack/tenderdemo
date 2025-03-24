// import { DsStatus } from "@/Common/helpers/constant";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PermissionState = {
  tenderDatalistVisible: boolean;
  nearSubmissionButtonVisible: boolean;
  feesPendingButtonVisible: boolean;
  approvalButtonVisible: boolean;
  newButtonVisible: boolean;
  filterButtonVisible: boolean;
  underReviewButtonVisible: boolean;
  underApprovalButtonVisible: boolean;
};

const initialState: PermissionState = {
  tenderDatalistVisible: false,
  nearSubmissionButtonVisible: false,
  feesPendingButtonVisible: false,
  approvalButtonVisible: false,
  newButtonVisible: false,
  filterButtonVisible: false,
  underReviewButtonVisible: false,
  underApprovalButtonVisible: false,

};

const permissionsSlice = createSlice({
  name: "permissions",
  initialState,
  reducers: {
    setVisibilityByRole: (state, action: PayloadAction<string>) => {
      const role = action.payload;

      state.tenderDatalistVisible = false;
      state.approvalButtonVisible = false;
      state.nearSubmissionButtonVisible = false;
      state.filterButtonVisible = false;
      state.newButtonVisible = false;
      state.feesPendingButtonVisible = false;
      state.underReviewButtonVisible = false;
      state.underApprovalButtonVisible = false;

      switch (role) {
        case "MAKER":
          state.tenderDatalistVisible = true;
          state.nearSubmissionButtonVisible = true;
          state.filterButtonVisible = true;
          state.newButtonVisible = true;
          state.feesPendingButtonVisible = true;
          state.approvalButtonVisible = true;
          break;

        case "CHECKER":
          state.tenderDatalistVisible = true;
          state.underReviewButtonVisible = true;
          state.filterButtonVisible = true;
          // state.newButtonVisible = true;
          break;

        case "HOMANAGER":
          state.tenderDatalistVisible = true;
          state.nearSubmissionButtonVisible = true;
          state.filterButtonVisible = true;
          state.feesPendingButtonVisible = true;
          state.underApprovalButtonVisible = true;
          state.approvalButtonVisible = true;
          break;

        case "ACCOUNTANCE":
          state.tenderDatalistVisible = true;
          state.filterButtonVisible = true;
          break;
        default:
          break;
      }
      return state;
    }
   
  }
});

export const { setVisibilityByRole } = permissionsSlice.actions;
export default permissionsSlice.reducer;
