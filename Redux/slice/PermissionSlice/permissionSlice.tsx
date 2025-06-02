// import { DsStatus } from "@/Common/helpers/constant";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PermissionState = {
  tenderDatalistVisible: boolean;
  nearSubmissionButtonVisible: boolean;
  feesPendingButtonVisible: boolean;
  approvalButtonVisible: boolean;
  newButtonVisible: boolean;
  filterButtonVisible: boolean;
  myApprovalButtonVisible: boolean;
  fetchCustomerButtonVisible: boolean;
  paymentCompletedVisible: boolean;
  paymentRecoveryVisible: boolean;
  disable: boolean;
  // myApprovalButtonVisible: boolean;
  searchCustomerDisable: boolean;
  customerLocationDisable: boolean;
  tenderNumberDisable: boolean;
  tenderTypeDisable: boolean;
  tenderIssueDateDisable: boolean;
  lastPurchaseDateDisable: boolean;
  submissionDateDisable: boolean;
  rateContractvalidityDisable: boolean;
  submissionModeDisable: boolean;
  deliveryPeriodDisable: boolean;
  extendedDeliveryPeriodDisable: boolean;
  penaltyLastDeliveryDisable: boolean;
  tenderUrlDisable: boolean;
  appliedByDisable: boolean;
  suppliedDisable: boolean;
  depotDisable: boolean;
  stockistNameDisable: boolean;
  stockistDiscountDisable: boolean;
  applicableDepositButtonDisable: boolean;
  amountDisable: boolean;
  paidByDisable: boolean;
  modesDisable: boolean;
  refundEligibilityDisable: boolean;
  PaymentdueDateDisable: boolean;
  instructionNotesDisable: boolean;
  attachFileButtonDisable: boolean;
  supplypointDisable: boolean;
  consignessCountDisable: boolean;
  testreportRequiredDisable: boolean;
  eligibilityDisable: boolean;
  applicableConditionButtonDisable: boolean;
  condtionNotesDisable: boolean;
  attachFileConditionButtonDisable: boolean;
  paymentcompletedDisable: boolean;
  addDocumentTypeSlectDisable: boolean;
  addDocumentTypeButtonDisable: boolean;
  uploadFileButtonDisabled: boolean;
  transactionIdDisable: boolean;
  recieptIdDisable: boolean;
  paymentRecoveredDisable: boolean;
  paymentRecoverdDateDisable: boolean;
  recoveredNotesDisable: boolean;
  recoveredAttachFileButton: boolean;
  saveButtonDisabled: boolean;
  ContractTypeDisable: boolean;

  //Product Tab
  productSearchDisable: boolean;
  productquantityDisable: boolean;
  addProductBtnDisable: boolean;
  productTableDisable: boolean;
};

const initialState: PermissionState = {
  tenderDatalistVisible: false,
  nearSubmissionButtonVisible: false,
  feesPendingButtonVisible: false,
  approvalButtonVisible: false,
  newButtonVisible: false,
  filterButtonVisible: false,
  myApprovalButtonVisible: false,
  fetchCustomerButtonVisible: false,
  paymentCompletedVisible: false,
  paymentRecoveryVisible: false,
  disable: false,
  // myApprovalButtonVisible: false,
  searchCustomerDisable: true,
  customerLocationDisable: true,
  tenderNumberDisable: true,
  tenderTypeDisable: true,
  tenderIssueDateDisable: true,
  lastPurchaseDateDisable: true,
  submissionDateDisable: true,
  rateContractvalidityDisable: true,
  submissionModeDisable: true,
  deliveryPeriodDisable: true,
  extendedDeliveryPeriodDisable: true,
  penaltyLastDeliveryDisable: true,
  tenderUrlDisable: true,
  appliedByDisable: true,
  suppliedDisable: true,
  depotDisable: true,
  stockistNameDisable: true,
  stockistDiscountDisable: true,
  applicableDepositButtonDisable: true,
  amountDisable: true,
  paidByDisable: true,
  modesDisable: true,
  refundEligibilityDisable: true,
  PaymentdueDateDisable: true,
  instructionNotesDisable: true,
  attachFileButtonDisable: true,
  supplypointDisable: true,
  consignessCountDisable: true,
  testreportRequiredDisable: true,
  eligibilityDisable: true,
  applicableConditionButtonDisable: true,
  condtionNotesDisable: true,
  attachFileConditionButtonDisable: true,
  paymentcompletedDisable: true,
  addDocumentTypeSlectDisable: true,
  addDocumentTypeButtonDisable: true,
  uploadFileButtonDisabled: true,
  transactionIdDisable: true,
  recieptIdDisable: true,
  paymentRecoveredDisable: true,
  recoveredNotesDisable: true,
  paymentRecoverdDateDisable: true,
  recoveredAttachFileButton: true,
  saveButtonDisabled: true,
  ContractTypeDisable: true,
  //product tab
  productSearchDisable: true,
  productquantityDisable: true,
  addProductBtnDisable: true,
  productTableDisable: true,
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
      state.myApprovalButtonVisible = false;
      state.fetchCustomerButtonVisible = false;
      state.disable = false;

      switch (role) {
        case "MAKER":
          state.tenderDatalistVisible = true;
          state.nearSubmissionButtonVisible = true;
          state.filterButtonVisible = true;
          state.newButtonVisible = true;
          state.feesPendingButtonVisible = false;
          state.approvalButtonVisible = true;
          state.fetchCustomerButtonVisible = true;
          break;

        case "CHECKER":
          state.tenderDatalistVisible = true;
          state.nearSubmissionButtonVisible = true;
          state.myApprovalButtonVisible = true; //replaced with underReviewButtonVisible
          state.filterButtonVisible = true;
          // state.newButtonVisible = true;
          break;

        case "HOMANAGER":
          state.tenderDatalistVisible = true;
          state.nearSubmissionButtonVisible = true;
          state.filterButtonVisible = true;
          state.feesPendingButtonVisible = true;
          state.myApprovalButtonVisible = true; //replaced with underApprovalButtonVisible
          state.approvalButtonVisible = true;

          break;
        case "ACCOUNTANCE":
          state.tenderDatalistVisible = true;
          state.filterButtonVisible = true;
          state.paymentCompletedVisible = true;
          state.paymentRecoveryVisible = true;
          state.disable = true;
          break;
        case "FINANCE":
          state.tenderDatalistVisible = true;
          state.filterButtonVisible = true;
          state.paymentCompletedVisible = true;
          state.paymentRecoveryVisible = true;
          state.disable = true;
          break;
        default:
          break;
      }

      return state;
    },

    setDisabledByStatusAndRole: (
      state,
      action: PayloadAction<{ role: string; status: string }>
    ) => {
      const { role, status } = action.payload;
      state.searchCustomerDisable = true;
      state.customerLocationDisable = true;
      state.tenderNumberDisable = true;
      state.tenderTypeDisable = true;
      state.tenderIssueDateDisable = true;
      state.lastPurchaseDateDisable = true;
      state.submissionDateDisable = true;
      state.rateContractvalidityDisable = true;
      state.ContractTypeDisable = true;
      state.submissionModeDisable = true;
      state.deliveryPeriodDisable = true;
      state.extendedDeliveryPeriodDisable = true;
      state.penaltyLastDeliveryDisable = true;
      state.tenderUrlDisable = true;
      state.appliedByDisable = true;
      state.suppliedDisable = true;
      state.depotDisable = true;
      state.stockistNameDisable = true;
      state.stockistDiscountDisable = true;
      state.applicableDepositButtonDisable = true;
      state.amountDisable = true;
      state.paidByDisable = true;
      state.modesDisable = true;
      state.refundEligibilityDisable = true;
      state.PaymentdueDateDisable = true;
      state.instructionNotesDisable = true;
      state.attachFileButtonDisable = true;
      state.supplypointDisable = true;
      state.consignessCountDisable = true;
      state.testreportRequiredDisable = true;
      state.eligibilityDisable = true;
      state.applicableConditionButtonDisable = true;
      state.condtionNotesDisable = true;
      state.paymentcompletedDisable = true;
      state.addDocumentTypeSlectDisable = true;
      state.addDocumentTypeButtonDisable = true;
      state.uploadFileButtonDisabled = true;
      state.transactionIdDisable = true;
      state.recieptIdDisable = true;
      state.paymentRecoveredDisable = true;
      state.paymentRecoverdDateDisable = true;
      state.recoveredNotesDisable = true;
      state.recoveredAttachFileButton = true;
      state.attachFileConditionButtonDisable = true;
      state.saveButtonDisabled = true;
      state.disable = true;
      //product tab
      state.productSearchDisable = true;
      state.productquantityDisable = true;
      state.addProductBtnDisable = true;
      state.productTableDisable = true;
      switch (status) {
        case "DRAFT":
          switch (role) {
            case "MAKER":
              state.searchCustomerDisable = false;
              state.customerLocationDisable = false;
              state.tenderNumberDisable = false;
              state.tenderTypeDisable = false;
              state.tenderIssueDateDisable = false;
              state.lastPurchaseDateDisable = false;
              state.submissionDateDisable = false;
              state.ContractTypeDisable = false;
              state.rateContractvalidityDisable = false;
              state.submissionModeDisable = false;
              state.deliveryPeriodDisable = false;
              state.extendedDeliveryPeriodDisable = false;
              state.penaltyLastDeliveryDisable = false;
              state.tenderUrlDisable = false;
              state.appliedByDisable = false;
              state.suppliedDisable = false;
              state.depotDisable = false;
              state.stockistNameDisable = false;
              state.stockistDiscountDisable = false;
              state.applicableDepositButtonDisable = false;
              state.amountDisable = false;
              state.paidByDisable = false;
              state.modesDisable = false;
              state.refundEligibilityDisable = false;
              state.PaymentdueDateDisable = false;
              state.instructionNotesDisable = false;
              state.attachFileButtonDisable = false;
              state.supplypointDisable = false;
              state.consignessCountDisable = false;
              state.testreportRequiredDisable = false;
              state.eligibilityDisable = false;
              state.applicableConditionButtonDisable = false;
              state.condtionNotesDisable = false;
              state.attachFileConditionButtonDisable = false;
              state.saveButtonDisabled = false;
              state.disable = false;
              //product tab
              state.productSearchDisable = false;
              state.productquantityDisable = false;
              state.addProductBtnDisable = false;
              state.productTableDisable = false;

              break;
            case "CHECKER":
              state.productTableDisable = false;
              //
              break;
            case "HOMANAGER":
              state.productTableDisable = false;

              break;
          }
          break;
        case "APPROVALPENDING":
          state.productTableDisable = false;

        case "APPROVED":
          if (role === "ACCOUNTANCE" || role === "FINANCE") {
            state.paymentcompletedDisable = false;
            state.addDocumentTypeSlectDisable = false;
            state.addDocumentTypeButtonDisable = false;
            state.uploadFileButtonDisabled = false;
            state.transactionIdDisable = false;
            state.recieptIdDisable = false;
            state.saveButtonDisabled = false;
          }
          break;
        case "LOST":
        case "CANCELLED":
        case "AWARDED":
          if (role === "ACCOUNTANCE" || role === "FINANCE") {
            state.paymentRecoveredDisable = false;
            state.paymentRecoverdDateDisable = false;
            state.recoveredNotesDisable = false;
            state.recoveredAttachFileButton = false;
            state.saveButtonDisabled = false;
          }
          if(role=="MAKER"){
            state.saveButtonDisabled = false;
          }
          break;
        case "UNDER_APPROVAL":
          if (role === "HOMANAGER") {
            // case "HOMANAGER":
            state.saveButtonDisabled = false;
            break;
          }
      }
      return state;
    },
  },
});

export const { setVisibilityByRole, setDisabledByStatusAndRole } =
  permissionsSlice.actions;
export default permissionsSlice.reducer;
