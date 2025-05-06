"use client";
import DsButton from "@/Elements/DsComponents/DsButtons/dsButton";
import React, { useEffect, useState } from "react";

import btnStyles from "@/Elements/DsComponents/DsButtons/dsButton.module.css";
import ContextMenu, {
  closeContext,
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

import Toaster from "@/Elements/DsComponents/DsToaster/DsToaster";
import styles from "@/app/Tender/[TenderId]/tenderOrder.module.css";
import { useTenderData } from "../AddUpdateTenderComponents/TenderDataContextProvider";
import { TenderData} from "@/TenderComponents/AddUpdateTenderComponents/TenderDataContextProvider";
import { getYesterdayDate } from "@/Common/helpers/Method/conversion";
import ApprovalPopup from "../AddUpdateTenderComponents/Approvelpopup/ApprovelPopup";

class ActionStatus {
  notiType: "success" | "bonus" | "info" | "error" | "cross" = "success";
  notiMsg: string | React.ReactNode = "";
  showNotification: boolean = false;
  isOkayButtonVisible?: boolean = false;
}

export const DSTendrFooter: React.FC = ({}) => {
  const dispatch = useAppDispatch<AppDispatch>();
  const role = useAppSelector((state: RootState) => state.user.role);
  const [toasterVisible, setToasterVisible] = useState<boolean>(false);
  const { setActionStatusValues, saveTender, tenderData,tenderDataCopy, updateTender } =
    useTenderData();
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

    if (
      tenderData?.customerId == null ||
      tenderData?.customerId == undefined ||
      tenderData.customerId == 0
    ) {
      errors.push("Please select a customer.");
    }
    if (tenderData?.customerAddressId == 0) {
      errors.push("Please select a customer address.");
    }
    if (tenderData?.tenderNumber?.trim() === "") {
      errors.push("Please enter a tender number.");
    }
    if (tenderData?.tenderType === "") {
      errors.push("Please enter a tender type.");
    }
    if (tenderData?.issueDate === "") {
      errors.push("Please enter the tender issue date.");
    }
    const todaysdate = new Date();
    // todaysdate.setHours(0, 0, 0, 0);

    if (tenderData?.issueDate && new Date(tenderData.issueDate) > todaysdate) {
      errors.push(
        "The tender issue date should not be later than today's date."
      );
    }
    if (tenderData?.lastPurchaseDate === "") {
      errors.push("Please enter the last purchase date.");
    }
    if (
      tenderData?.lastPurchaseDate &&
      new Date(tenderData.lastPurchaseDate) < getYesterdayDate()
    ) {
      errors.push(
        "The last purchase date should not be earlier than today's date."
      );
    }
    if (tenderData?.submissionDate === "") {
      errors.push("Please enter the submission date.");
    }
    if (
      tenderData?.submissionDate &&
      new Date(tenderData.submissionDate) < getYesterdayDate()
    ) {
      errors.push(
        "The submission date should not be earlier than today's date."
      );
    }
    if (tenderData?.submissionMode?.trim() === "") {
      errors.push("Please select a submission mode.");
    }

    const urlPattern =
      /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/;
    const tenderURL = tenderData?.tenderUrl?.trim() ?? "";
    if (tenderURL === "") {
      errors.push("Please enter the tender URL.");
    } else if (!urlPattern.test(tenderURL)) {
      errors.push("Please enter a valid tender URL.");
    }
    if (tenderData?.applierType?.trim() === "") {
      errors.push("Please select an applier type.");
    }
    if (tenderData?.supplierType?.trim() === "") {
      errors.push("Please select a supplier type.");
    }
    if (tenderData?.shippingLocations?.length === 0) {
      console.log(tenderData);
      errors.push("Please select at least one shipping location.");
    }

    if (tenderData?.supplierDiscount === 0) {
      errors.push("Please enter the supplier discount.");
    }

    const fees = tenderData?.tenderFees ?? [];
    const todaysDate = new Date();
    // todaysdate.setHours(0, 0, 0, 0);

    fees.forEach((fee, index) => {
      if (fee.status == "ACTV") {
        if (!fee.feesType?.toString().trim()) {
          errors.push(`${fee.feesType}: Please select a fee type.`);
        }

        if (fee.amount == null || fee.amount === 0) {
          errors.push(`${fee.feesType}: Please enter an amount.`);
        }

        if (!fee.currency?.trim()) {
          errors.push(`${fee.feesType}:  Please select a currency.`);
        }

        if (!fee.paidBy?.trim()) {
          errors.push(`${fee.feesType}: Please specify who paid the fee.`);
        }

        if (!fee.paymentDueDate?.trim()) {
          errors.push(`${fee.feesType}: Payment due date is required.`);
        } else if (new Date(fee.paymentDueDate) < getYesterdayDate()) {
          errors.push(
            `${fee.feesType}:  The payment due date cannot be in the past.`
          );
        }

        if (!fee.instructionNotes?.trim()) {
          errors.push(
            `${fee.feesType} ${index + 1}:  Please enter instruction notes.`
          );
        }
      }
    });

    if (tenderData?.tenderSupplyCondition?.supplyPoint?.trim() === "") {
      errors.push("Please select a supply point.");
    }
    if (tenderData?.tenderSupplyCondition?.consigneesCount === 0) {
      errors.push("Please enter the number of consignees.");
    }
    if (
      tenderData?.tenderSupplyCondition?.testReportRequired?.trim() === "" 
    ) {
      errors.push("Please specify whether a test report is required.");
    }
    if (tenderData?.tenderSupplyCondition?.eligibility.length == 0) {
      errors.push("Please select at least one eligibility criterion.");
    }

    const applicableConditions =
      tenderData?.tenderSupplyCondition?.applicableConditions ?? [];
    applicableConditions.forEach((condition, index) => {
      if (condition.status == "ACTV") {
        if (condition.type?.toString().trim() == "") {
          errors.push(`${condition.type} :Please select a type.`);
        }
        if (condition.notes?.trim() == "") {
          errors.push(`${condition.type}: Please enter notes.`);
        }
      }
    });
    if (tenderData.tenderRevisions.length > 0) {
      const latestRevision = tenderData.tenderRevisions.reduce(
        (prev, current) => {
          return prev.version > current.version ? prev : current;
        }
      );
      if (latestRevision.tenderItems.length > 0) {
        latestRevision.tenderItems.forEach((item, index) => {
          if (item.product.dataSource === "fetch") {
            if (
              item.requestedGenericName === "" ||
              item.requestedGenericName === undefined ||
              item.requestedGenericName === null
            ) {
              errors.push(
                `Product ${item.product.productName}: Generic name is required.`
              );
            }
            if (
              item.requestedQuantity === null ||
              item.requestedQuantity === undefined ||
              item.requestedQuantity <= 0
            ) {
              errors.push(
                `Product ${item.product.productName}: Product quantity is required and should be greater than 0.`
              );
            }
            if (
              item.requestedPackingSize === "" ||
              item.requestedPackingSize === undefined ||
              item.requestedPackingSize === null
            ) {
              errors.push(
                `Product ${item.product.productName}: Packing size is required.`
              );
            }
          }
          if (item.product.dataSource === "csv") {
            if (item.productId === undefined || item.productId === null) {
              errors.push(
                `Product ${item.requestedGenericName}: Please select corresponding product.`
              );
            }
          }
          if (item.product.dataSource === "saved") {
            if (
              item.proposedRate === undefined ||
              item.proposedRate <= 0 ||
              item.proposedRate === null
            ) {
              errors.push(
                `Product ${item.requestedGenericName}: Proposed rate is required and should be greater than 0.`
              );
            }
            if (
              item.ptrPercentage === undefined ||
              // item.ptrPercentage <= 0 ||
              item.ptrPercentage === null
            ) {
              errors.push(
                `Product ${item.requestedGenericName}: PTR% is required.`
              );
            }
            if (
              item.stockistDiscountValue === undefined ||
              item.stockistDiscountValue <= 0 ||
              item.stockistDiscountValue === null
            ) {
              errors.push(
                `Product ${item.requestedGenericName}: Discount is required.`
              );
            }
          }
        });
      }
    }
    return errors;
  };

  const validateAndSaveTender = () => {
    // console.log(tenderData);
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
    console.log(tenderData);
    // updateTender("Draft");
    const validate = validateFields();
    if (validate.length === 0) {
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
      } else if (role === "CHECKER") {
        contextContent = (
          <>
            <PopupOpenButton
              popupId="popup1"
              buttonSize="btnSmall"
              buttonText="Reviewed "
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
          </>
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
              onClick={() =>closeContext("SubmissionContext")}
            />
            <PopupOpenButton
              popupId="popup2"
              buttonSize="btnSmall"
              buttonText="Revise"
              buttonViewStyle="btnText"
              className={btnStyles.btnTextPrimary}
              onClick={() =>closeContext("SubmissionContext")}
            />
            <PopupOpenButton
              popupId="popup3"
              buttonSize="btnSmall"
              buttonText="Reject"
              buttonViewStyle="btnText"
              className={btnStyles.btnTextPrimary}
              onClick={() =>closeContext("SubmissionContext")}
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
        createContext("SubmissionContext", <div>{contextContent}</div>, true);
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
            if (tenderDataCopy?.id) {
              validateAndUpdateTender();
              // updateTender("Draft")
            } else {
              validateAndSaveTender();
              // saveTender("Draft");
            }
          }}
          onSplitClick={(e) =>
            displayContext(e, "SubmissionContext", "top", "right")
          }
          buttonSize="btnLarge" >
          Save
        </DsSplitButton>
      </div>
      <ApprovalPopup
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
      <ApprovalPopup
        id="popup2"
        types={[]}
        popupType="Revise"
        buttonColor="btnPrimary"
        position="center"
        toasterMessage={"The Tender has been sent for Revision "}
        setActionStatus={setActionStatusValues}
      />
      <ApprovalPopup
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
      {/* <ContextMenu id={"SubmissionContext"} showArrow={true} content={<div>{contextContent}</div>}/> */}
    </>
  );
};

export default DSTendrFooter;
