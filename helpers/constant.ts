// import { addressProps } from "./Components/dsDoubleText/dsDoubleText";

///Statuses Universal
// export const underReview = "underReview";
// export const Approved = "Approved";
// export const RedyD = "Ready For Dispatch";
// export const Open = "Open";
// export const underApproval = "underApproval";
// export const Cancelled = "Cancelled";
// export const Submitted = "Submitted";
// export const Pending = "Pending";
// export const InProcess = "InProcess";
// export const Inactive = "INAC";
// export const Active = "ACTV";
// export const Complete = "CMPL";
// export const Submit = "SUBMIT";
// export const Processing = "PROC";
// export const Review_Pending = "REVP";
// export const Review_Done = "REVD";
// export const RejectedAndBackToEdit = "RJED";
// export const Rejected = "RJCT";
// export const Revalidation = "RJVD";
// export const Validation_Pending = "VALP";
// export const Validation_Done = "VALD";
// export const Approval_Pending = "APRP";
// export const Approval_Done = "APRV";
// export const Locked = "LOCK";
// export const Completed = "CMPL";
// export const Invalidate = "INVL";
// export const NotRequired = "NREQ";
// export const Required = "REQ";
// export const Abort = "ABRT";
// export const Ackownledged = "ACKN";
// export const changed = "CHANGED";
// export const DRAFT = "DRAFT";
// export const Awarded = "Awarded";

///Host urls Universal
export const demoHostUrl = "http://172.203.226.112:3000";
export const apiLocalUrl = "http://localhost:7002";
export const apiServerUrl = "http://172.145.1.102:7002";
// export const apiHostUrl = apiLocalUrl;
export const apiHostUrl = apiServerUrl;
export const devHostUrl = "http://localhost:3000";
 
///Urls application Level
export const hostUrl = devHostUrl;
export const Component_Library = hostUrl + "/ComponentsLibrary";
export const salesOUrl = hostUrl + "/";

///universal Apis

export const getUserRoles = apiHostUrl + "/depousers/2";
// export const getUserRoles = apiHostUrl+"/depomanager/2";
// export const getUserRoles =apiHostUrl+"/homanager/3";
// export const getUserRoles = "http://localhost:5155/homanager/1";

///Apis
export const getAllInstitutionalOrders = apiHostUrl + "/institutional";
export const getInstitutionalOrderById = apiHostUrl + "/institutional/1";
export const getAllDepot = apiHostUrl + "/depot";
export const getInstitutionalAddress = apiHostUrl + "/institutional/address/1";
export const getpackingListbyId = apiHostUrl + "/packingList/1";
export const getFooterAddress = apiHostUrl + "/footerAddress";
export const searchCustomerURL = apiHostUrl + "/customers/filter?name=";
export const getCustomerURL = apiHostUrl + "/customers/";
export const searchProductsURL = apiHostUrl + "/products/filter?";
export const getProductURL = apiHostUrl + "/products/";
export const getOrderListURL = apiHostUrl + "/orders/consolidatedOrders?ids=";
export const getInvoiceById = apiHostUrl + "/invoice/1";
export const getAllCustomerLocationsURL = apiHostUrl + "/customers/address/";
export const getOrderById = apiHostUrl + "/orders/cmpl/5775F";
// export const SearchCoustomers="";
export const getConsolidatedOrder =
  apiHostUrl + "/orders/consolidatedOrders?ids=";
export const createOrder = apiHostUrl + "/order";
export const getAllOrdersURL = apiHostUrl + "/orders";
export const searchTransporterURL = apiHostUrl + "/customers/filter?name=";
export const getTransporterURL = apiHostUrl + "/customers/";
export const getAllStatusLogURL = apiHostUrl + "/status";

export const getAllTenders = apiHostUrl + "/tenders";
export const getAllMetaData = apiHostUrl + "/tenderMetadata";
export const getAllDocuments = apiLocalUrl + "/tender/docs";

//Tender User Roles
export const getTenderUserRoles = apiHostUrl + "/maker";
// export const getTenderUserRoles = apiHostUrl + "/checker";
// export const getTenderUserRoles = apiHostUrl + "/homanager";
// export const getTenderUserRoles = apiHostUrl + "/accountance";

export const getTenderSearchProducts =
  apiHostUrl + "/tenderproducts/filter?name=";

export const DsStatus: Record<string, dsStatus> = {
  DRFT: "Draft",
  SBMT: "Submitted",
  DVPN: "Deviation Pending",
  OPEN: "Open",
  APRV: "Approved",
  CNCL: "Cancelled",
  RJCT: "Rejected",
  DSPT: "Ready To Dispatch",
  PFMA: "Proforma",
  CMPL: "Completed",
  UREV: "Under Review",
  UAPR: "Under Approval",
  APRL: "Approval"
};
export type dsStatus =
  | "Draft"
  | "Submitted"
  | "Deviation Pending"
  | "Open"
  | "Approved"
  | "Cancelled"
  | "Rejected"
  | "Ready To Dispatch"
  | "Proforma"
  | "Completed"
  | "Under Review"
  | "Awarded"
  | "Under Approval"
  | "Approval";

export const DsTenderProductStatus: Record<string, dsTenderProductStatus> = {
  CRET: "Create",
  UPDT: "Update"
};
export type dsTenderProductStatus = "Create" | "Update";
// export type bankDetail = {
//   bankName: string;
//   accountNumber: string;
//   ifscCode: string;
//   branchName: string;
// };
// export type location = {
//   id: number;
//   address1: string;
//   address2: string;
//   address3: string;
//   address4: string;
//   city: string;
//   state: string;
//   pinCode: string;
//   isPrimary: string;
// };
// export type customer = {
//   id: number;
//   name: string;
//   code: string;
//   panNumber: string;
//   gstinNumber: string;
//   drugLicenseNumber: string;
//   fdaLicenseNumber: string;
//   fssiLicenseNumber: string;
//   drugExpiryDate: string;
//   fdaExpiryDate: string;
//   fssiExpiryDate: string;
//   address: location;
//   bank: bankDetail;
// };
// export type tieUpProduct = {
//   productId: number;
//   productCode: string;
//   productName: string;
//   batchId: number;
//   batchNumber: string;
//   expiryDate: string;
//   quantity?: number;
// };
// export type product = {
//   productId: number;
//   productCode: string;
//   productName: string;
//   cartonSize?: number;
//   quantity?: number;
//   batchId: number;
//   batchNumber: string;
//   expiryDate: string;
//   basicValue?: number;
//   specialRate?: string;
//   salesQuantity?: number;
//   mrp?: number;
//   netAmount?: number;
//   esvAmount?: number;
//   bonusQuantity?: number;
//   igstValue?: number;
//   cgstValue?: number;
//   sgstValue?: number;
//   hsnCode?: string;
//   isSampleProduct?: string;
//   tieUpProduct?: tieUpProduct;
// };
// export type addressToFrom = {
//   to: location;
//   from: location;
// };
// export type status = {
//   orderStatus: string;
//   messageType: string;
//   message: string;
// };
// export type transport = {
//   transportId: number;
//   mode: string;
//   vehicleType: string;
//   vehicleNumber: string;
//   transporterDocumentNumber: string;
//   transportationDate: string;
// };
// export type licenseExpiry = {
//   customerId: number;
//   licenseNumber: string;
//   expiryDate: string;
//   displayMessage: string;
//   isExpired: boolean;
// };
// export type validations = {
//   basic: {
//     drugLicenseExpiry: licenseExpiry;
//     fdaLicenseExpiry: licenseExpiry;
//     foodLicenseExpiry: licenseExpiry;
//     flag: boolean;
//   };
//   credit: {
//     overDue: {
//       message: string;
//       flag: boolean;
//     };
//     creditLimit: {
//       value: number;
//       limit: number;
//       flag: boolean;
//     };
//   };
// };
// export type order = {
//   orderId: number;
//   orderType: string;
//   orderDate: string;
//   purchaseOrderNumber: string;
//   purchaseOrderDate: string;
//   customer: customer;
//   orderItems: orderItems[];
//   shipping: addressToFrom;
//   billing: addressToFrom;
//   transport?: transport;
//   validations?: validations;
// };
// export type orderItems = {
//   balance?: number;
//   transactionType: "CREATE" | "UPDATE";
//   orderItemId: number;
//   productId: number;
//   productCode: string;
//   productName: string;
//   cartonSize?: number;
//   quantity?: number;
//   batchNumber: string;
//   expiryDate: string;
//   basicValue?: number;
//   specialRate?: string;
//   salesQuantity?: number;
//   dispatchQuantity?:number;
//   mrp?: number;
//   netAmount?: number;
//   esvAmount?: number;
//   bonusQuantity?: number;
//   igstValue?: number;
//   cgstValue?: number;
//   sgstValue?: number;
//   hsnCode?: string;
//   isSampleProduct?: string;
//   tieUpProduct?: tieUpProduct;
//   batchId: number;
//   requestedQuantity: number;
// };
// export type saveOrder = {
//   transaction_type: "CREATE" | "UPDATE";
//   orderId: number;
//   orderType: "TRADE" | "INSTITUTIONAL";
//   customerId: number;
//   customerName: string;
//   purchaseOrderNumber: string;
//   purchaseOrderDate: string;
//   billingAddress: {
//     toLocationId: number;
//     fromLocationId: number;
//   };
//   shippingAddress: {
//     toLocationId: number;
//     fromLocationId: number;
//   };
//   transportDetails?: {
//     transporterId?: number;
//     mode?: string;
//     vehicleType?: string;
//     vehicleNumber?: string;
//     transporterDocumentNumber?: string;
//   };
//   orderItems: orderItems[];
//   deleteOrderItemIds: number[];
// };
