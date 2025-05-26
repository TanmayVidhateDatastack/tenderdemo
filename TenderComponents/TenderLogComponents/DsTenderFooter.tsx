"use client";
import DsButton from "@/Elements/DsComponents/DsButtons/dsButton";
import React, { useEffect, useState } from "react";

import btnStyles from "@/Elements/DsComponents/DsButtons/dsButton.module.css";
import ContextMenu, {
  closeAllContext,
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
import {
  dsStatus,
  getTenderUserRoles,
  DsStatus,
} from "@/Common/helpers/constant";
import DsNavTo from "@/Elements/ERPComponents/DsNavigationComponent/DsNavTo";
import DsSplitButton from "@/Elements/DsComponents/DsButtons/dsSplitButton";

import Toaster from "@/Elements/DsComponents/DsToaster/DsToaster";
import styles from "@/app/Tender/[TenderId]/tenderOrder.module.css";
import { useTenderData } from "../AddUpdateTenderComponents/TenderDataContextProvider";
import { TenderData } from "@/TenderComponents/AddUpdateTenderComponents/TenderDataContextProvider";
import { getYesterdayDate } from "@/Common/helpers/Method/conversion";
import ApprovalPopup from "../AddUpdateTenderComponents/Approvelpopup/ApprovelPopup";
import { ContractStatuses } from "../AddUpdateTenderComponents/CustomTabViews/ContractView";
import { ClosePopup } from "@/Elements/DsComponents/dsPopup/dsPopup";
import { useSearchParams } from "next/navigation";


class ActionStatus {
  notiType: "success" | "bonus" | "info" | "error" | "cross" = "success";
  notiMsg: string | React.ReactNode = "";
  showNotification: boolean = false;
  isOkayButtonVisible?: boolean = false;
}

export const DSTendrFooter: React.FC = ({ }) => {
  const dispatch = useAppDispatch<AppDispatch>();
  const role = useAppSelector((state: RootState) => state.user.role);
  const [toasterVisible, setToasterVisible] = useState<boolean>(false);
  const [splitButtonDisableState, setSplitButtonDisbale] =
    useState<boolean>(false);
  const [saveTenderClicked, setSaveTenderClicked] = useState<boolean>(false);
  const [contextContent, setContextContext] = useState<React.ReactElement<
    any,
    string | React.JSXElementConstructor<any>
  > | null>();
  const {
    setActionStatusValues,
    saveTender,
    tenderData,
    tenderDataCopy,
    updateTender,
    updateContractDetails,
  } = useTenderData();
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

  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "institutional" || "corporate";

  const permissions = useAppSelector((state: RootState) => state.permissions);
  const {
    saveButtonDisabled,
    searchCustomerDisable,
    customerLocationDisable,
    tenderNumberDisable,
    tenderTypeDisable,
    tenderIssueDateDisable,
    lastPurchaseDateDisable,
    submissionDateDisable,
    rateContractvalidityDisable,
    submissionModeDisable,
    deliveryPeriodDisable,
    extendedDeliveryPeriodDisable,
    penaltyLastDeliveryDisable,
    tenderUrlDisable,
    appliedByDisable,
    suppliedDisable,
    depotDisable,
    stockistNameDisable,
    stockistDiscountDisable,
    applicableDepositButtonDisable,
    amountDisable,
    paidByDisable,
    modesDisable,
    refundEligibilityDisable,
    PaymentdueDateDisable,
    instructionNotesDisable,
    attachFileButtonDisable,
    supplypointDisable,
    consignessCountDisable,
    testreportRequiredDisable,
    eligibilityDisable,
    applicableConditionButtonDisable,
    condtionNotesDisable,
    attachFileConditionButtonDisable,
    paymentcompletedDisable,
    addDocumentTypeSlectDisable,
    addDocumentTypeButtonDisable,
    uploadFileButtonDisabled,
    transactionIdDisable,
    recieptIdDisable,
    paymentRecoveredDisable,
    recoveredNotesDisable,
    paymentRecoverdDateDisable,
    recoveredAttachFileButton,
    ContractTypeDisable,

    //product Tab
    productTableDisable,
  } = permissions;
  useEffect(() => {
    handleFetch();
  }, []);

  const validateFields = (tenderData: TenderData) => {
    const errors: string[] = [];
    if (
      tenderData.status.toLowerCase() == DsStatus.AWRD.toLowerCase() ||
      tenderData.status.toLowerCase() == DsStatus.PAWRD.toLowerCase() ||
      tenderData.status.toLowerCase() == DsStatus.LOST.toLowerCase() ||
      tenderData.status.toLowerCase() == DsStatus.CNCL.toLowerCase()
    ) {
      if (
        tenderData.tenderContract?.contractStatus !== "DRAFT" ||
        tenderData.status.toLowerCase() == DsStatus.CNCL.toLowerCase()
      ) {
        if (tenderData?.tenderContract?.contractJustification == undefined) {
          errors.push(
            `Please select a Tender ${tenderData.status ? ContractStatuses[tenderData.status] : " "
            }Justification.`
          );
        }
        if (
          tenderData?.tenderContract?.contractStatusNotes == undefined ||
          tenderData?.tenderContract?.contractStatusNotes == ""
        ) {
          errors.push(`Please enter Supporting Notes.`);
        }
        if (
          tenderData.tenderContract?.tenderRevisions?.[0].tenderItems?.find(
            (x) =>
              x.product.awardedToName == undefined ||
              x.product.awardedToName == "" ||
              x.awardedRate == undefined ||
              x.awardedQuantity == undefined
          )
        ) {
          errors.push(
            `Please fill the every field in Product Award Details Table.`
          );
        }
        if (
          !(
            tenderData.tenderDocuments &&
            tenderData.tenderDocuments.filter(
              (x) => x.documentCategory == "TENDER_CONTRACT_DOCUMENT"
            ).length > 0
          )
        ) {
          errors.push(`Please attach at least one file`);
        }
      }
    } else {
      if (!searchCustomerDisable && (
        tenderData?.customerId == null ||
        tenderData?.customerId == undefined ||
        tenderData.customerId == 0)
      ) {
        errors.push("Please select a customer.");
      }
      // if (
      //   tenderData?.tenderContract != undefined &&
      //   tenderData?.tenderContract.contractJustification == undefined
      // ) {
      //   //Gaurav Changed
      //   errors.push("Please select a customer address.");
      // }
      if (!tenderNumberDisable && tenderData?.tenderNumber?.trim() === "") {
        errors.push("Please enter a tender number.");
      }
      if (!tenderTypeDisable && tenderData?.tenderType === "") {
        errors.push("Please enter a tender type.");
      }
      if (!tenderIssueDateDisable && tenderData?.issueDate === "") {
        errors.push("Please enter the tender issue date.");
      }
      const todaysdate = new Date();
      // todaysdate.setHours(0, 0, 0, 0);

      if (!tenderIssueDateDisable &&
        tenderData?.issueDate &&
        new Date(tenderData.issueDate) > todaysdate
      ) {
        errors.push(
          "The tender issue date should not be later than today's date."
        );
      }
      if (!lastPurchaseDateDisable && tenderData?.lastPurchaseDate === "") {
        errors.push("Please enter the last purchase date.");
      }
      if (!lastPurchaseDateDisable &&
        tenderData?.lastPurchaseDate &&
        new Date(tenderData.lastPurchaseDate) < getYesterdayDate()
      ) {
        errors.push(
          "The last purchase date should not be earlier than today's date."
        );
      }
      if (!submissionDateDisable && tenderData?.submissionDate === "") {
        errors.push("Please enter the submission date.");
      }
      if (!submissionDateDisable &&
        tenderData?.submissionDate &&
        new Date(tenderData.submissionDate) < getYesterdayDate()
      ) {
        errors.push(
          "The submission date should not be earlier than today's date."
        );
      }
      if (!submissionModeDisable && tenderData?.submissionMode?.trim() === "") {
        errors.push("Please select a submission mode.");
      }

      const urlPattern =
        /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/;
      const tenderURL = tenderData?.tenderUrl?.trim() ?? "";
      if (!tenderUrlDisable && tenderURL === "") {
        errors.push("Please enter the tender URL.");
      } else if (!tenderUrlDisable && !urlPattern.test(tenderURL)) {
        errors.push("Please enter a valid tender URL.");
      }
      if (!appliedByDisable && tenderData?.applierType?.trim() === "") {
        errors.push("Please select an applier type.");
      }
      if (!suppliedDisable && tenderData?.supplierType?.trim() === "") {
        errors.push("Please select a supplier type.");
      }
      if (!depotDisable && tenderData?.shippingLocations?.length === 0) {
        console.log(tenderData);
        errors.push("Please select at least one shipping location.");
      }

      if (!stockistDiscountDisable && tenderData?.supplierDiscount === 0) {
        errors.push("Please enter the supplier discount.");
      }

      const fees = tenderData?.tenderFees ?? [];
      fees.forEach((fee, index) => {
        if (fee.status == "ACTV") {

          if (
            type === "institutional" &&
            tenderData.applierType === "STOCKIST" &&
            tenderData.supplierType === "STOCKIST"
          ) {
            return;
          }

          if (!fee.feesType?.toString().trim()) {
            errors.push(`${fee.feesType}: Please select a fee type.`);
          }

          if (!amountDisable && (fee.amount == null || fee.amount === 0)) {
            errors.push(`${fee.feesType}: Please enter an amount.`);
          }

          if (!fee.currency?.trim()) {
            errors.push(`${fee.feesType}:  Please select a currency.`);
          }

          if (!paidByDisable && !fee.paidBy?.trim()) {
            errors.push(`${fee.feesType}: Please specify who paid the fee.`);
          }

          if (!PaymentdueDateDisable && !fee.paymentDueDate?.trim()) {
            errors.push(`${fee.feesType}: Payment due date is required.`);
          } else if (!PaymentdueDateDisable && new Date(fee.paymentDueDate) < getYesterdayDate()) {
            errors.push(
              `${fee.feesType}:  The payment due date cannot be in the past.`
            );
          }

          if (!instructionNotesDisable && !fee.instructionNotes?.trim()) {
            errors.push(
              `${fee.feesType} ${index + 1}:  Please enter instruction notes.`
            );
          }
        }
      });

      if (!supplypointDisable && tenderData?.tenderSupplyCondition?.supplyPoint?.trim() === "") {
        errors.push("Please select a supply point.");
      }
      if (!consignessCountDisable && tenderData?.tenderSupplyCondition?.consigneesCount === 0) {
        errors.push("Please enter the number of consignees.");
      }
      if (
        !testreportRequiredDisable && tenderData?.tenderSupplyCondition?.testReportRequired?.trim() === ""
      ) {
        errors.push("Please specify whether a test report is required.");
      }
      if (!eligibilityDisable && tenderData?.tenderSupplyCondition?.eligibility.length == 0) {
        errors.push("Please select at least one eligibility criterion.");
      }


      const applicableConditions =
        tenderData?.tenderSupplyCondition?.applicableConditions ?? [];
      applicableConditions.forEach((condition, index) => {
        if (condition.status == "ACTV") {
          if (condition.type?.toString().trim() == "") {
            errors.push(`${condition.type} :Please select a type.`);
          }
          if (!condtionNotesDisable && condition.notes?.trim() == "") {
            errors.push(`${condition.type}: Please enter notes.`);
          }
        }
      });
      if (tenderData.tenderRevisions.length > 0 && !productTableDisable) {
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
    }
    return errors;
  };

  const validateAndSaveTender = () => {
    console.log(tenderData);
    const validate = validateFields(tenderData);
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
    // console.log(tenderData);
    // updateTender(tenderData.status);

    const validate = validateFields(tenderData);
    if (validate.length === 0) {
      updateTender(tenderData.status);
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

      if (role === "ACCOUNTANCE" || role === "FINANCE") {
        setContextContext(
          <DsButton
            label="Submit Receipt"
            buttonSize="btnSmall"
            buttonViewStyle="btnText"
            className={btnStyles.btnTextPrimary}
            onClick={() => {
              showToaster("toaster1");
              tenderData.status = "Fees_Pending";
              updateTender(tenderData.status);
            }}
          />
        );
      } else if (role === "CHECKER") {
        setContextContext(
          <>
            <PopupOpenButton
              popupId="reviewedPopup"
              buttonSize="btnSmall"
              buttonText="Reviewed "
              buttonViewStyle="btnText"
              className={btnStyles.btnTextPrimary}
            />
            <PopupOpenButton
              popupId="rejectPopup"
              buttonSize="btnSmall"
              buttonText="Revise"
              buttonViewStyle="btnText"
              className={btnStyles.btnTextPrimary}
            />
          </>
        );
      } else if (role === "HOMANAGER") {
        setContextContext(
          <>
            <PopupOpenButton
              popupId="approvalPopup"
              buttonSize="btnSmall"
              buttonText="Approve"
              buttonViewStyle="btnText"
              className={btnStyles.btnTextPrimary}
              onClick={(e) => closeAllContext()}
            />
            <PopupOpenButton
              popupId="rejectPopup"
              buttonSize="btnSmall"
              buttonText="Revise"
              buttonViewStyle="btnText"
              className={btnStyles.btnTextPrimary}
            />
            <PopupOpenButton
              popupId="revisePopup"
              buttonSize="btnSmall"
              buttonText="Reject"
              buttonViewStyle="btnText"
              className={btnStyles.btnTextPrimary}
            />
          </>
        );
      } else if (role === "MAKER") {
        if (
          tenderData.status == "AWARDED" ||
          tenderData.status == "PARTIALLY_AWARDED" ||
          tenderData.status == "LOST"
        )
          setContextContext(
            <DsButton
              label="Submit"
              buttonSize="btnSmall"
              buttonViewStyle="btnText"
              className={btnStyles.btnTextPrimary}
              onClick={() => {
                // if (
                //   tenderData.status == "AWARDED" ||
                //   tenderData.status == "PARTIALLY_AWARDED" ||
                //   tenderData.status == "LOST"
                // )
                if (tenderDataCopy?.id) {
                  // if (saveTender) validateAndSaveTender();
                  // if (saveTender) saveTender("Draft");
                  updateContractDetails("contractStatus", "SUBMITTED");
                  setSaveTenderClicked(true)
                  setTimeout(() => {
                    validateAndUpdateTender();
                  }, 0);
                  // updateTender("Draft")
                }
                // showToaster("toaster1");
              }}
            />
          );
        else {
          setContextContext(
            <DsButton
              label="Submit for Review"
              buttonSize="btnSmall"
              buttonViewStyle="btnText"
              className={btnStyles.btnTextPrimary}
            // onClick={() => showToaster("toaster1")}
            />
          );
        }
      }

      // setContextContext(contextContent);
      // if (contextContent && !document.getElementById("SubmissionContext")) {
      //   createContext(
      //     "SubmissionContext",
      //     <div onClick={() => closeContext("SubmissionContext")}>
      //       {contextContent}
      //     </div>,
      //     true
      //   );
      // }
    }
  }, [role, tenderData.status]);
  useEffect(() => {
    const splitButtonDisable = false;
    // tenderData.status == "DRAFT"
    //   ? false
    //   : !(
    //       tenderData.tenderContract?.contractStatus == "DRAFT" ||
    //       tenderData.status == "AWARDED" ||
    //       tenderData.status == "PARTIALLY_AWARDED" ||
    //       tenderData.status == "LOST" ||
    //       tenderData.tenderContract?.contractStatus == undefined ||
    //       tenderData.tenderContract?.contractStatus == null
    //     );

    setSplitButtonDisbale(splitButtonDisable);
  }, [tenderData.id]);
  useEffect(() => {
    if (saveTenderClicked) {

      if (tenderDataCopy?.id) {
        // if (saveTender) validateAndSaveTender();
        // if (saveTender) saveTender("Draft");
        validateAndUpdateTender();
        // updateTender("Draft")
      } else {
        validateAndSaveTender();
        // saveTender("Draft"); 
      }
      setSaveTenderClicked(false);
    }
  }, [saveTenderClicked])
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
        {tenderData.status == "AWARDED" ||
          tenderData.status == "PARTIALLY_AWARDED" ||
          tenderData.status == "LOST" ||
          tenderData.status == "DRAFT" ? (
          <DsSplitButton
            //  disable={true}
            buttonViewStyle="btnContained"
            onClick={() => {
              if (
                tenderData.status == "AWARDED" ||
                tenderData.status == "PARTIALLY_AWARDED" ||
                tenderData.status == "LOST"
              )
                updateContractDetails("contractStatus", "DRAFT");
              setSaveTenderClicked(true);
            }}
            onSplitClick={(e) =>
              displayContext(e, "SubmissionContext", "top", "right")
            }
            buttonSize="btnLarge"
            // disable={splitButtonDisableState}
            disable={saveButtonDisabled}
          >
            Save
          </DsSplitButton>
        ) : (
          <DsButton
            disable={saveButtonDisabled}
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
            buttonSize="btnLarge"
          // disable={tenderData.status !== "CANCELLED"}
          >
            {tenderData.status !== "CANCELLED" ? "Save" : "Submit"}
          </DsButton>
        )}
      </div>
      <ApprovalPopup
        id="approvalPopup"
        types={[]}
        popupType="Approve"
        tenderId={tenderData.id}
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
        id="rejectPopup"
        types={[]}
        tenderId={tenderData.id}
        popupType="Revise"
        buttonColor="btnPrimary"
        position="center"
        toasterMessage={"The Tender has been sent for Revision "}
        setActionStatus={setActionStatusValues}
      />
      <ApprovalPopup
        id="revisePopup"
        types={[]}
        popupType="Reject"
        tenderId={tenderData.id}
        buttonColor="btnDanger"
        position="center"
        toasterMessage={"The Tender has been Rejected & also note has sent "}
        setActionStatus={setActionStatusValues}
      />
      <ApprovalPopup
        id="reviewedPopup"
        types={[]}
        popupType="Reviewed"
        tenderId={tenderData.id}
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

      <Toaster
        id={"toaster1"}
        message={
          role === "ACCOUNTANCE" || role === "FINANCE"
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
      <ContextMenu
        id={"SubmissionContext"}
        showArrow={true}
        content={<div>{contextContent}</div>}
      />
    </>
  );
};

export default DSTendrFooter;
function useCallBack(arg0: () => void, arg1: TenderData[]) {
  throw new Error("Function not implemented.");
}