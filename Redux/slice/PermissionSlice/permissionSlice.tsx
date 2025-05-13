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
  fetchCustomerButtonVisible:boolean,
  paymentCompletedVisible:boolean,
  paymentRecoveryVisible:boolean,
  disable:boolean,
  // myApprovalButtonVisible: boolean;
  searchCustomerDisable:boolean;
  customerLocationDisable:boolean;
  tenderNumberDisable:boolean;
  tenderTypeDisable:boolean;
  tenderIssueDateDisable:boolean;
  lastPurchaseDateDisable:boolean;
  submissionDateDisable:boolean;
  rateContractvalidityDisable:boolean;
  submissionModeDisable:boolean;
  deliveryPeriodDisable:boolean;
  extendedDeliveryPeriodDisable:boolean;
  penaltyLastDeliveryDisable:boolean;
  tenderUrlDisable:boolean;
  appliedByDisable:boolean;
  suppliedDisable:boolean;
  depotDisable:boolean;
  stockistNameDisable:boolean;
  stockistDiscountDisable:boolean;
  applicableDepositButtonDisable:boolean;
  amountDisable:boolean; 
  paidByDisable:boolean;
  modesDisable:boolean;
  refundEligibilityDisable:boolean;
  PaymentdueDateDisable:boolean;
  instructionNotesDisable:boolean;
  attachFileButtonDisable:boolean;
  supplypointDisable:boolean;
  consignessCountDisable:boolean;
  testreportRequiredDisable:boolean;
  eligibilityDisable:boolean;
  applicableConditionButtonDisable:boolean;
  condtionNotesDisable:boolean;
  attachFileConditionButtonDisable:boolean;
  paymentcompletedDisable:boolean;
  addDocumentTypeSlectDisable:boolean,
  addDocumentTypeButtonDisable:boolean,
  uploadFileButtonDisabled:boolean,
  transactionIdDisable:boolean,  
  recieptIdDisable:boolean,
  paymentRecoveredDisable:boolean;
  recoveredNotesDisable:boolean;
  recoveredAttachFileButton:boolean;
  
};

const initialState: PermissionState = {
  tenderDatalistVisible: false,
  nearSubmissionButtonVisible: false,
  feesPendingButtonVisible: false,
  approvalButtonVisible: false, 
  newButtonVisible: false,
  filterButtonVisible: false,
  myApprovalButtonVisible: false,
  fetchCustomerButtonVisible:false,
  paymentCompletedVisible:false,
  paymentRecoveryVisible:false,
  disable:false,
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
  attachFileConditionButtonDisable:true,
  paymentcompletedDisable:true, 
  addDocumentTypeSlectDisable:true,
  addDocumentTypeButtonDisable:true,
  uploadFileButtonDisabled:true,
  transactionIdDisable:true,
  recieptIdDisable:true,
  paymentRecoveredDisable:true, 
  recoveredNotesDisable:true,
  recoveredAttachFileButton:true, 
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
      state.disable=false 
 
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
          state.myApprovalButtonVisible = true;//replaced with underReviewButtonVisible
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
          state.paymentCompletedVisible =true;
          state.paymentRecoveryVisible =true;
          state.disable = true;
          break;
        default:
          break;
      }
      
      return state;
    },

     setDisabledByStatusAndRole: (state, action: PayloadAction<{role:string,status:string}>) => {
      const {role,status} = action.payload;
        state.searchCustomerDisable = true;
        state.customerLocationDisable = true;
        state.tenderNumberDisable = true;
        state.tenderTypeDisable = true;
        state.tenderIssueDateDisable = true; 
        state.lastPurchaseDateDisable = true;
        state.submissionDateDisable = true;
        state.rateContractvalidityDisable = true; 
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
        state.paymentcompletedDisable =true;  
        state.addDocumentTypeSlectDisable=true;
        state.addDocumentTypeButtonDisable=true;  
        state.uploadFileButtonDisabled=true;
        state.transactionIdDisable=true;
        state.recieptIdDisable=true;
        state.paymentRecoveredDisable=true;
        state.recoveredNotesDisable=true;
        state.recoveredAttachFileButton=true;
        state.disable=true

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
                state.attachFileConditionButtonDisable=false;
                state.disable = false;
                break;

              case "CHECKER":
                break;

              case "HOMANAGER":
                break;
            } 
            break;

          case "APPROVED": 
          case "APPROVALPENDING":
            if (role === "ACCOUNTANCE") {
              state.paymentcompletedDisable = false;
              state.addDocumentTypeSlectDisable=false,
              state.addDocumentTypeButtonDisable=false,
              state.uploadFileButtonDisabled=false,
              state.transactionIdDisable = false;
              state.recieptIdDisable = false;
            }
            break;

          case "LOST":  
          case "CANCELLED":
          case "AWARDED":
            if (role === "ACCOUNTANCE") {
              state.paymentRecoveredDisable = true; 
              state.recoveredNotesDisable = true; 
              state.recoveredAttachFileButton = true; 
            }
            break;
        }  
      return state;   
    }   
  } 
});  

export const { setVisibilityByRole,setDisabledByStatusAndRole } = permissionsSlice.actions;
export default permissionsSlice.reducer; 