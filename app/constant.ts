export const underReview = "underReview";
export const Approved = "Approved";
export const underApproval = "underApproval";
export const Cancelled = "Cancelled";
export const Submitted = "Submitted";
export const Pending = "Pending";
export const InProcess = "InProcess";
export const Inactive = "INAC";
export const Active = "ACTV";
export const Complete = "CMPL";
export const Submit = "SUBMIT";
export const Processing = "PROC";
export const Review_Pending = "REVP";
export const Review_Done = "REVD";
export const RejectedAndBackToEdit = "RJED";
export const Rejected = "RJCT";
export const Revalidation = "RJVD";
export const Validation_Pending = "VALP";
export const Validation_Done = "VALD";
export const Approval_Pending = "APRP";
export const Approval_Done = "APRV";
export const Locked = "LOCK";
export const Completed = "CMPL";
export const Invalidate = "INVL";
export const NotRequired = "NREQ";
export const Required = "REQ";
export const Abort = "ABRT";
export const Ackownledged = "ACKN";
export const changed = "CHANGED";

type dsStatus =
  | "underReview"
  | "Approved"
  | "underApproval"
  | "Cancelled"
  | "Submitted"
  | "Pending"
  | "InProcess"
  | "INAC"
  | "ACTV"
  | "CMPL"
  | "SUBMIT"
  | "PROC"
  | "REVP"
  | "REVD"
  | "RJED"
  | "RJCT"
  | "RJVD"
  | "VALP"
  | "VALD"
  | "APRP"
  | "APRV"
  | "LOCK"
  | "INVL"
  | "NREQ"
  | "REQ"
  | "ABRT"
  | "ACKN"
  | "CHANGED";
export default dsStatus;
