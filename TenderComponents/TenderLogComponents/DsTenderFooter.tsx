"use client";
import DsButton from "@/Elements/DsComponents/DsButtons/dsButton";
import React, { useEffect, useState } from "react";

import btnStyles from "@/Elements/DsComponents/DsButtons/dsButton.module.css";
import ContextMenu, {
  createContext,
  displayContext,
} from "@/Elements/DsComponents/dsContextHolder/dsContextHolder";
import { showToaster } from "@/Elements/DsComponents/DsToaster/DsToaster";
import PopupOpenButton from "@/Elements/DsComponents/dsPopup/popupOpenButton";
import { AppDispatch, RootState } from "@/Redux/store/store";
import { useAppDispatch, useAppSelector } from "@/Redux/hook/hook";
import { setVisibilityByRole } from "@/Redux/slice/PermissionSlice/permissionSlice";
import { setUserRole } from "@/Redux/slice/UserSlice/userSlice";
import fetchData from "@/Common/helpers/Method/fetchData";
import { dsStatus, getTenderUserRoles } from "@/Common/helpers/constant";
import DsNavTo from "@/Elements/ERPComponents/DsNavigationComponent/DsNavTo";
import DsSplitButton from "@/Elements/DsComponents/DsButtons/dsSplitButton";
import DsApprovalPopup from "@/Elements/ERPComponents/DsApprovalPopups/DsApprovalPopups";
import Toaster from "@/Elements/DsComponents/DsToaster/DsToaster";
import styles from "@/app/Tender/[TenderId]/tenderOrder.module.css"
import { useTenderData } from "../AddUpdateTenderComponents/TenderDataContextProvider";
import {TenderData} from "@/TenderComponents/AddUpdateTenderComponents/TenderDataContextProvider"


class ActionStatus {
  notiType: "success" | "bonus" | "info" | "error" | "cross" = "success";
  notiMsg: string = "";
  showNotification: boolean = false;
}
interface dsTenderfooter {
  setActionStatus: (actionStatus: ActionStatus) => void; 
  saveTender?: (status: dsStatus) => Promise<void>;
  tenderData:TenderData | null;
  // originalData: TenderData | null | undefined;
}

export const DSTendrFooter: React.FC<dsTenderfooter> = ({
  setActionStatus,
  saveTender,
  tenderData,
}) => {
  const dispatch = useAppDispatch<AppDispatch>();  
  const role = useAppSelector((state: RootState) => state.user.role);
  const [toasterVisible, setToasterVisible] = useState<boolean>(false);

  const handleFetch = async () => {
    try {
      const res = await fetchData({ url: getTenderUserRoles });
      if (res.code === 200) {
        dispatch(setUserRole(res.result.roleName));
      } else {
        console.error("Error fetching data: ", res.message || "Unknown error");
      }
    } catch (error) {
      console.error("Fetch error: ", error);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);
 
  // const validateFields = () => {
  //   const errors: string[] = [];

  //   if (tenderData?.customerId == null || tenderData?.customerId == undefined) {
  //     errors.push("Please select a customer.");
  //   }
  //   if (tenderData?.customerAddressId === 0){
  //     errors.push("Please select a customer address.")
  //   }
    
  //   if (tenderData?.tenderNumber?.trim() === "") {
  //     errors.push("Please enter a tender no.");
  //   }
  //   if (tenderData?.tenderType === "") {
  //     errors.push("Please enter a tendr type.");
  //   }
  //   if (tenderData?.issueDate === ""){
  //     errors.push("Please enter a tender issue date.")
  //   }
  //     // Ensure todaysdate is a Date object
  //   const todaysdate = new Date();
  //     // Check if Tender issue is greater than today's date
  //   if (
  //      tenderData?.issueDate &&
  //      new Date(tenderData.issueDate) > todaysdate
  //    ) {
  //      errors.push(
  //      "Tender issue date should not be greater than today's date."
  //     );
  //    }
  //   if (tenderData?.lastPurchaseDate === ""){
  //       errors.push("Please enter a last purchase date.")
  //   }
  //   if (
  //       tenderData?.lastPurchaseDate &&
  //       new Date(tenderData.lastPurchaseDate) < todaysdate
  //     ) {
  //       errors.push(
  //         "Last Purchase date should not be less than today's date."
  //       );
  //   }
  //   if (tenderData?.submissionDate === ""){
  //       errors.push("Please enter a submission date.")
  //   }
  //   if (
  //       tenderData?.submissionDate &&
  //       new Date(tenderData.submissionDate) < todaysdate
  //     ) {
  //       errors.push(
  //         "Submission  date should not be less than today's date."
  //       );
  //   }
  //   if (tenderData?.rateContractValidity?.trim() === "") {
  //     errors.push("Please enter a rate contract validity.");
  //   }
  //   if (tenderData?.submissionMode?.trim() === "") {
  //     errors.push("Please select a submission Mode.");
  //   } 

      //   const urlPattern = /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/;

      // if (tenderData?.tenderUrl?.trim() === "") {
      //   errors.push("Please enter the tender URL.");
      // } else if (!urlPattern.test(tenderData.tenderUrl.trim())) {
      //   errors.push("Please enter a valid URL.");
      // }
 
  //   if (isRecordDuplicate) {
  //     errors.push("Purchase order number is already present");
  //   }
  //   if (
  //     ((tenderData?.purchaseOrderNumber?.length ?? 0) > 50 ||
  //       (tenderData?.purchaseOrderNumber?.length ?? 0) < 3) &&
  //       tenderData?.purchaseOrderNumber.trim() !== ""
  //   ) {
  //     errors.push(
  //       "Purchase order number length should be between 3 to 50 characters."
  //     );
  //   }
 
  
  //   if (!tenderData?.orderItems || tenderData?.orderItems?.length === 0) {
  //     errors.push("Please add atleast one product.");
  //   }
  //   if (
  //     (tenderData?.orderItems?.filter(
  //       (x) => x.requestedExpiryInDays < 30 || x.requestedExpiryInDays > 180
  //     ).length ?? 0) >= 1
  //   ) {
  //     errors.push("Requested expiry should be between 30 to 180 days.");
  //   }
  //   if (
  //     (tenderData?.orderItems?.filter((x) => x.requestedQuantity <= 0)
  //       .length ?? 0) >= 1
  //   ) {
  //     errors.push("Requested quantity should be greater than 0.");
  //   }
  //   if (
  //     (tenderData?.orderItems?.filter((x) => (x.orderQuantity ?? 1) <= 0)
  //       .length ?? 0) >= 1
  //   ) {
  //     errors.push("Order quantity should be greater than 0.");
  //   }
  //   if (
  //     (tenderData?.orderItems?.filter(
  //       (x) => (x.orderQuantity ?? 1) > x.requestedQuantity
  //     ).length ?? 0) >= 1
  //   ) {
  //     errors.push(
  //       "Order quantity should not be greater than requested quantity."
  //     );
  //   }
  //   if (tenderData?.shipToAddressId === 0) {
  //     errors.push("Please enter a shipping address.");
  //   }
  //   if (tenderData?.billToAddressId === 0) {
  //     errors.push("Please enter a billing address.");
  //   }

  //   // Convert transportationDate once for comparison
  //   const transportationDate = new Date(tenderData?.transportationDate ?? "");
  //   // const originalTransportationDate = new Date(
  //   //   originalData?.transportationDate ?? ""
  //   // );

  //   transportationDate.setHours(0, 0, 0, 0);
  //   todaysdate.setHours(0, 0, 0, 0);

  //   // Check if transportationDate is earlier than today's date and has changed from originalData
  //   if (
  //     transportationDate &&
  //     transportationDate.getTime() < todaysdate.getTime()
  //     // &&
  //     // transportationDate.getTime() !== originalTransportationDate.getTime()
  //   ) {
  //     errors.push(
  //       "Transportation date should not be earlier than today's date."
  //     );
  //   }

  //   return errors;
  // };




  useEffect(() => {
    if (role && role !== "") {
      dispatch(setVisibilityByRole(role));
      // console.log("Role=", role);
      let contextContent: React.ReactElement | null = null;
      
      if (role === "ACCOUNTANCE") {
        contextContent = (
          <DsButton
            label="Submit Receipt"
            buttonSize="btnSmall"
            buttonViewStyle="btnText"
            className={btnStyles.btnTextPrimary}
            onClick={() => showToaster("toaster1")}
          />
        );
      } else if (role === "HOMANAGER") {
        contextContent = (
          <>
            <PopupOpenButton
              popupId="popup1"
              buttonSize="btnSmall"
              buttonText="Approve"
              buttonViewStyle="btnText"
              className={btnStyles.btnTextPrimary}
            />
            <PopupOpenButton
              popupId="popup2"
              buttonSize="btnSmall"
              buttonText="Revise"
              buttonViewStyle="btnText"
              className={btnStyles.btnTextPrimary}
            />
            <PopupOpenButton
              popupId="popup3"
              buttonSize="btnSmall"
              buttonText="Reject"
              buttonViewStyle="btnText"
              className={btnStyles.btnTextPrimary}
            />
          </>
        );
      } else if (role === "CHECKER") {
        contextContent = (
          <>
           <PopupOpenButton
              popupId="popup1"
              buttonSize="btnSmall"
              buttonText="Approve"
              buttonViewStyle="btnText"
              className={btnStyles.btnTextPrimary}
            />
            <PopupOpenButton
              popupId="popup2"
              buttonSize="btnSmall"
              buttonText="Revise"
              buttonViewStyle="btnText"
              className={btnStyles.btnTextPrimary}
            /><PopupOpenButton
            popupId="popup3"
            buttonSize="btnSmall"
            buttonText="Reject"
            buttonViewStyle="btnText"
            className={btnStyles.btnTextPrimary}
          />
          </>
        );
      } else if (role === "MAKER") {
        contextContent = (
          <DsButton
            label="Submit for Review"
            buttonSize="btnSmall"
            buttonViewStyle="btnText"
            className={btnStyles.btnTextPrimary}
            onClick={() => showToaster("toaster1")}
          />
        );
      }

      if (contextContent) {
        createContext("contextMenuId4", <div>{contextContent}</div>, true);
      }
    }
  }, [role]);

  return (
    <>
      <div className={styles.footer}>
        <DsNavTo
          id="closeBtn"
          location=""
          label="Close"
          buttonSize="btnLarge"
          className={btnStyles.btnOutlined}
          buttonColor="btnDark"
          buttonViewStyle="btnOutlined"
          disable={false}
        />

        <DsSplitButton
          buttonViewStyle="btnContained"
          onClick={() => {
            if (saveTender) saveTender("Draft");
          }}
          onSplitClick={(e) =>
            displayContext(e, "contextMenuId4", "top", "center")
          }
          buttonSize="btnLarge"
        >
          Save
        </DsSplitButton>
      </div>

      <DsApprovalPopup
        id="popup1"
        types={[]}
        popupType="Approve"
        buttonColor="btnPrimary"
        position="center"
        toasterMessage={
          role === "HOMANAGER"
            ? "The Tender has been Approved"
            : role === "CHECKER"
            ? "The Tender has been successfully moved to under approval state"
            : "The action was successful!"
        }
        setActionStatus={setActionStatus}
      />

      <DsApprovalPopup
        id="popup2"
        types={[]}
        popupType="Revise"
        buttonColor="btnPrimary"
        position="center"
        toasterMessage={"The Tender has been sent for Revision "}
        setActionStatus={setActionStatus}
      />
      <DsApprovalPopup
        id="popup3"
        types={[]}
        popupType="Reject"
        buttonColor="btnDanger"
        position="center"
        toasterMessage={"The Tender has been Rejected & also note has sent "}
        setActionStatus={setActionStatus}
      />
      <Toaster
        id={"toaster1"}
        message={
          role === "ACCOUNTANCE"
            ? "The Data has been Submitted by Review "
            : role === "MAKER"
            ? "The receipt has been submitted successfully"
            : "The action was successful!"
        }
        type={"success"}
        position={"top"}
        duration={4000}
        handleClose={() => setToasterVisible(false)}
      />
      {/* <ContextMenu id={"contextMenuId4"} showArrow={true} content={<div>{contextContent}</div>}/> */}
    </>
  );
};

export default DSTendrFooter;
