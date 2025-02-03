import { DsStatus } from "@/helpers/constant";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PermissionState = {
  myApprovalButtonVisible: boolean;
  approvedButtonVisible: boolean;
  dispatchButtonVisible: boolean;
  filterButtonVisible: boolean;
  newButtonVisible: boolean;
  searchSoSearchVisible: boolean;
  depotNameDropdownVisible: boolean;
  editAdjustmentTableVisible: boolean;
  signOrderVisible: boolean;
  signInvoiceVisible: boolean;
  saveButtonVisible: boolean;
  viewInvoiceVisible: boolean;
};

const initialState: PermissionState = {
  myApprovalButtonVisible: false,
  approvedButtonVisible: false,
  dispatchButtonVisible: false,
  filterButtonVisible: false,
  newButtonVisible: false,
  searchSoSearchVisible: false,
  depotNameDropdownVisible: false,
  editAdjustmentTableVisible: true,
  signOrderVisible: false,
  signInvoiceVisible: false,
  saveButtonVisible: false,
  viewInvoiceVisible: false,
};

const permissionsSlice = createSlice({
  name: "permissions",
  initialState,
  reducers: {
    setVisibilityByRole: (state, action: PayloadAction<string>) => {
      const role = action.payload;

      state.myApprovalButtonVisible = false;
      state.approvedButtonVisible = false;
      state.dispatchButtonVisible = false;
      state.filterButtonVisible = false;
      state.newButtonVisible = false;
      state.searchSoSearchVisible = false;
      state.depotNameDropdownVisible = false;
      state.editAdjustmentTableVisible = false;

      state.signOrderVisible = false;
      state.signInvoiceVisible = false;
      state.saveButtonVisible = false;
      state.viewInvoiceVisible = false;

      switch (role) {
        case "DEPOUSER":
          state.searchSoSearchVisible = true;
          state.approvedButtonVisible = true;
          state.filterButtonVisible = true;
          state.newButtonVisible = true;
          state.dispatchButtonVisible = true;
          state.viewInvoiceVisible = true;
          state.saveButtonVisible = true;
          break;

        case "DEPOMANAGER":
          state.searchSoSearchVisible = true;
          state.myApprovalButtonVisible = true;
          state.approvedButtonVisible = true;
          state.dispatchButtonVisible = true;
          state.filterButtonVisible = true;
          state.newButtonVisible = true;
          state.editAdjustmentTableVisible = true;
          state.signOrderVisible = true;
          state.signInvoiceVisible = true;
          state.saveButtonVisible = true;
          break;

        case "HOMANAGER":
          state.searchSoSearchVisible = true;
          state.depotNameDropdownVisible = true;
          state.filterButtonVisible = true;
          state.newButtonVisible = true;
          state.viewInvoiceVisible = true;
          break;

        case "HOUSER":
          state.viewInvoiceVisible = true;
          break;
        default:
          break;
      }
      return state;
    },
    setVisibilityByStatus: (
      state,
      action: PayloadAction<{ role: string; orderStatus: string }>
    ) => {
      const { role, orderStatus } = action.payload;
      state.signOrderVisible = false;
      state.signInvoiceVisible = false;
      state.saveButtonVisible = false;
      state.viewInvoiceVisible = false;

      if (role === "DEPOMANAGER" && orderStatus === DsStatus.APRV) {
        state.signOrderVisible = true;
        state.signInvoiceVisible = true;
      } else if (
        orderStatus === DsStatus.OPEN ||
        orderStatus === DsStatus.DRFT ||
        orderStatus === DsStatus.DVPN ||
        orderStatus === DsStatus.CNCL
      ) {
        state.saveButtonVisible = true;
      } else if (
        (role === "DEPOUSER" || role === "HOUSER") &&
        (orderStatus === DsStatus.APRV || orderStatus === DsStatus.DSPT)
      ) {
        state.viewInvoiceVisible=true;
      }
    },
  },
});

export const { setVisibilityByRole,setVisibilityByStatus } = permissionsSlice.actions;
export default permissionsSlice.reducer;
