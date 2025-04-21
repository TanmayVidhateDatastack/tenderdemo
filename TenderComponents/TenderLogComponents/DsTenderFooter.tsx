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
  notiMsg: string | React.ReactNode = "";
  showNotification: boolean = false;
  isOkayButtonVisible?: boolean = false;
}

export const DSTendrFooter: React.FC = ({
}) => {
  const dispatch = useAppDispatch<AppDispatch>();  
  const role = useAppSelector((state: RootState) => state.user.role);
  const [toasterVisible, setToasterVisible] = useState<boolean>(false);
const {
  setActionStatusValues,
  saveTender,
  tenderData,
  updateTender,

}=useTenderData()
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
 
      const validateFields = () => {
        const errors: string[] = []; 
 
        if (tenderData?.customerId == null || tenderData?.customerId == undefined||tenderData.customerId==0) {
          errors.push("Please select a customer.");
        }
        if (tenderData?.customerAddressId == 0 ) { 
          errors.push("Please select a customer address.");
        }
        if (tenderData?.tenderNumber?.trim() === "") { 
          errors.push("Please enter a tender no.");
        }
        if (tenderData?.tenderType === "") {
          errors.push("Please enter a tendr type.");
        } 
        if (tenderData?.issueDate === "") {
          errors.push("Please enter a tender issue date."); 
        }
        const todaysdate = new Date(); 
        if (tenderData?.issueDate && new Date(tenderData.issueDate) > todaysdate) { 
          errors.push("Tender issue date should not be greater than today's date.");
        } 
        if (tenderData?.lastPurchaseDate === "") { 
          errors.push("Please enter a last purchase date.");
        }
        if (
          tenderData?.lastPurchaseDate &&
          new Date(tenderData.lastPurchaseDate) < todaysdate
        ) {
          errors.push("Last Purchase date should not be less than today's date.");
        }
        if (tenderData?.submissionDate === "") {
          errors.push("Please enter a submission date.");
        }
        if (
          tenderData?.submissionDate &&
          new Date(tenderData.submissionDate) < todaysdate
        ) {
          errors.push("Submission  date should not be less than today's date.");
        }
        if (tenderData?.submissionMode?.trim() === "") {
          errors.push("Please select a submission Mode.");
        }

        const urlPattern =/^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/;
        const tenderURL = tenderData?.tenderUrl?.trim() ?? ""; 
        if (tenderURL === "") {
          errors.push("Please enter the tender URL.");
        } else if (!urlPattern.test(tenderURL)) { 
          errors.push("Please enter a valid URL."); 
        }
        if (tenderData?.applierType?.trim() === "") {
          errors.push("Please select a applier Type."); 
        }
        if (tenderData?.supplierType?.trim() === "") {
          errors.push("Please select a supplierType Type.");
        }
        if (tenderData?.shippingLocations?.length === 0) {
          console.log(tenderData)
          errors.push("Please select a shippingLocations");
        }

        if (tenderData?.supplierDiscount === 0) {
          errors.push("Please enter a supplierDiscount.");
        }

        const fees = tenderData?.tenderFees ?? [];
        const todaysDate = new Date();

        fees.forEach((fee, index) => {
          if (fee.status == "ACTV") {
            if (!fee.feesType?.toString().trim()) {
              errors.push(`${fee.feesType}: Please select a fee type.`);
            }

            if (fee.amount == null || fee.amount === 0) {
              errors.push(`${fee.feesType}: Please enter a amount.`);
            }

            if (!fee.currency?.trim()) {
              errors.push(`${fee.feesType}: Currency is required.`);
            }

            if (!fee.paidBy?.trim()) {
              errors.push(`${fee.feesType}: Please select who paid the fee.`);
            }

            if (!fee.paymentDueDate?.trim()) {
              errors.push(`${fee.feesType}: Payment due date is required.`);
            } else if (new Date(fee.paymentDueDate) < todaysDate) {
              errors.push(
                `${fee.feesType}: Payment due date should not be in the past.`
              );
            }

            if (!fee.instructionNotes?.trim()) {
              errors.push(`${fee.feesType} ${index + 1}: Please enter instruction notes.`);
            }
          }
        });

        if (tenderData?.tenderSupplyConditions[0]?.supplyPoint?.trim() === "") {
          errors.push("Please select a supplyPoint ");
        }
        if (tenderData?.tenderSupplyConditions[0]?.consigneesCount === 0) {
          errors.push("Please enter a consigneesCount.");
        }
        if (tenderData?.tenderSupplyConditions[0]?.testReportRequired?.trim() === "") {
          errors.push("Please select a test Report Required field.");
        }
        if (tenderData?.tenderSupplyConditions[0]?.eligibility.length == 0) {
          errors.push("Please select a eligibility field.");
        } 
        
        const applicableConditions =tenderData?.tenderSupplyConditions[0]?.applicableConditions ?? [];
        applicableConditions.forEach((condition, index) => {
          if(condition.status == "ACTV"){
            if (condition.type?.toString().trim()=="") {
              errors.push(`${condition.type} : Type is required.`);
            }
            if (condition.notes?.trim()=="") {
              errors.push(`${condition.type}: Notes are required.`);
            }
          }
        }); 
        return errors;
      }; 
  
      const validateAndSaveTender = () => {
      const validate = validateFields();
      if (validate.length === 0) {
        saveTender("Draft");
      } else {  
        const message = ( 
          <> 
            <div className={styles["toaster-message-grid"]}>
              {validate.map((ms, index) => (  
                <div key={index} className={styles["toaster-item"]}>
                  {ms} 
                </div>
              ))}
            </div>
          </>
        ); 
        console.log("Validation Errors:", validate);
        setActionStatusValues({
          notiMsg: message,
          notiType: "info",
          showNotification: true, 
          isOkayButtonVisible: true,
        });  
        showToaster("create-order-toaster"); 
      }
    };
    const validateAndUpdateTender = () => {
      const validate = validateFields();
      if (validate.length === 0 ) {
        updateTender("Draft");
      } else {
        const message = (
          <>
            <div className={styles["toaster-message-grid"]}>
              {validate.map((ms, index) => (
                <div key={index} className={styles["toaster-item"]}>
                  {ms}
                </div>
              ))}
            </div>
          </>
        ); 
        setActionStatusValues({ 
          notiMsg: message,
          notiType: "info",  
          showNotification: true,
          isOkayButtonVisible: true,
        });
        showToaster("create-order-toaster");
      }
    };

  useEffect(() => {
    if (role && role !== "") {
      dispatch(setVisibilityByRole(role)); 
      console.log("Role=", role);
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
            // if (saveTender) validateAndSaveTender();
            // if (saveTender) saveTender("Draft");
            if(tenderData?.id ){  
              validateAndUpdateTender(); 
              // updateTender("Draft")
            }
            else{
              validateAndSaveTender();
              // saveTender("Draft");
            }
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
        setActionStatus={setActionStatusValues}
      />

      <DsApprovalPopup
        id="popup2"
        types={[]}
        popupType="Revise"
        buttonColor="btnPrimary"
        position="center"
        toasterMessage={"The Tender has been sent for Revision "}
        setActionStatus={setActionStatusValues}
      />
      <DsApprovalPopup
        id="popup3"
        types={[]}
        popupType="Reject"
        buttonColor="btnDanger"
        position="center"
        toasterMessage={"The Tender has been Rejected & also note has sent "}
        setActionStatus={setActionStatusValues}
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