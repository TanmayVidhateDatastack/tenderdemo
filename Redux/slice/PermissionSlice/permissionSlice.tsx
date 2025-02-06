// import { DsStatus } from "@/helpers/constant";
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
  underApprovalButtonVisible: false
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
          state.newButtonVisible = true;
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
    // setVisibilityByStatus: (
    //   state,
    //   action: PayloadAction<{ role: string; orderStatus: string }>
    // ) => {
    //   const { role, orderStatus } = action.payload;
    //   state.signOrderVisible = false;
    //   state.signInvoiceVisible = false;
    //   state.saveButtonVisible = false;
    //   state.viewInvoiceVisible = false;

    //   if (role === "DEPOMANAGER" && orderStatus === DsStatus.APRV) {
    //     state.signOrderVisible = true;
    //     state.signInvoiceVisible = true;
    //   } else if (
    //     orderStatus === DsStatus.OPEN ||
    //     orderStatus === DsStatus.DRFT ||
    //     orderStatus === DsStatus.DVPN ||
    //     orderStatus === DsStatus.CNCL
    //   ) {
    //     state.saveButtonVisible = true;
    //   } else if (
    //     (role === "DEPOUSER" || role === "HOUSER") &&
    //     (orderStatus === DsStatus.APRV || orderStatus === DsStatus.DSPT)
    //   ) {
    //     state.viewInvoiceVisible = true;
    //   }
    // }
  }
});

export const { setVisibilityByRole } = permissionsSlice.actions;
export default permissionsSlice.reducer;
