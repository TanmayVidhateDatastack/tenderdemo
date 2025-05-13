import styles from "./deposite.module.css";
import Image from "next/image";
import downarrow from "@/Common/TenderIcons/smallIcons/verticleArrow.svg";
import { useDebugValue, useEffect, useState } from "react";
import ContextMenu, {
  closeAllContext,
  createContext,
} from "@/Elements/DsComponents/dsContextHolder/dsContextHolder";
import React from "react";
import Ds_checkbox from "@/Elements/DsComponents/DsCheckbox/dsCheckbox";
import {
  displayContext,
  closeContext,
} from "@/Elements/DsComponents/dsContextHolder/dsContextHolder";
import { DsSelectOption } from "@/Common/helpers/types";
import DsButton from "@/Elements/DsComponents/DsButtons/dsButton";
import DsFeesDocument from "./DsFeesDocument";
import { useTenderData } from "../TenderDataContextProvider";

import IconFactory from "@/Elements/IconComponent";
import DsTenderDetails from "./DsTenderDetails ";
import { useAppSelector } from "@/Redux/hook/hook";
import { RootState } from "@/Redux/store/store";

//  interface DepositDocument {
//   modes: DsSelectOption[];
//   refunds:DsSelectOption[];
//   // paidBy: DsSelectOption[];
// }
// export interface Deposit {
//   paidBy: DsSelectOption[];
// }

//  interface FeesDocument {
//   applicableDeposits: DsSelectOption[];
// }
//  interface DepositeDocumentsProps {
//   setDepositeDocuments: (depositeDocuments: DepositDocument[]) => void;
//   depositeDocument: DepositDocument[] | null;
//   applicableDeposits: DsSelectOption[] | [];
//   role: string;
// }
const DsDepositeDocuments: React.FC = () => {
  const contextMenuId = "context-display-10";
  const {
    addTenderFee,
    removeTenderFeeByType,
    tenderData,
    tenderDataCopy,
    updateTenderFee,
    metaData,
  } = useTenderData();
  const [documentTypeOptions, setDocumentTypeOptions] = useState<
    Record<string, DsSelectOption[]>
  >({});
  const [mode, setMode] = useState<DsSelectOption[]>([]);
  const [refund, setRefund] = useState<DsSelectOption[]>([]);
  const [paidBy, setPaidBy] = useState<DsSelectOption[]>([]);
  const [applicablefees, SetApplicablefees] = useState<DsSelectOption[]>([]);
  const [paymentCheckVisible, setPaymentCheckVisible] =
    useState<boolean>(false);
  const [recoveryPaymentVisible, setrecoveryPaymentVisible] =
    useState<boolean>(false);
  const [feeVisibility, setFeeVisibility] = useState<Record<string, boolean>>({
    "": true,
  });
  const permissions = useAppSelector((state: RootState) => state.permissions);
  const {
 applicableDepositButtonDisable
  } = permissions;


  // const [feeVisibility1, setFeeVisibility1] = useState<Record<string, boolean>>({"": true,});

  const role = useAppSelector((state: RootState) => state.user.role);

  useEffect(() => {
    if (role == "MAKER" || role == "CHECKER" || role == "HOMANAGER") {

      setPaymentCheckVisible(false);
    } else {
      setPaymentCheckVisible(true);
    }
    if (
      role === "ACCOUNTANCE" &&
      (tenderData.status === "AWARDED" ||
        tenderData.status === "LOST" ||
        tenderData.status === "CANCELLED")
    ) {
      setrecoveryPaymentVisible(true);
    } else {
      setrecoveryPaymentVisible(false);
    }
    if (
      metaData.tenderEmdPayment &&
      metaData.tenderFeesPayment &&
      metaData.tenderPsdPayment
    ) {
      setDocumentTypeOptions({
        TENDER_EMD: metaData.tenderEmdPayment,
        TENDER_PSD: metaData.tenderPsdPayment,
        TENDER_FEES: metaData.tenderFeesPayment,
      });
    }
  }, [role, metaData]);
  useEffect(() => {
    if (metaData) {
      const modesData = metaData.paymentModes || [];
      // const paidByData = depositeDocument[0]?.paidBy || [];
      const refundData = metaData.refundEligibility || [];
      setMode(modesData);
      setRefund(refundData);
      // setPaidBy(paidByData);
    }
    if (metaData.feesType && metaData.feesType.length > 0) {
      // console.log("000 : ", applicableDeposits);
      const mappedDeposits = metaData.feesType.map((deposit) => ({
        label: deposit.label,
        value: deposit.value,
      }));
      console.log("mappedDeposits", mappedDeposits);
      SetApplicablefees(mappedDeposits);
      const options: Record<string, boolean> = mappedDeposits.reduce<
        Record<string, boolean>
      >((acc, opt) => {
        const val = opt.value;

        if (typeof val === "string") {
          acc[val] = tenderData.tenderFees.some(
            (fee) => fee.feesType == opt.value && fee.status == "ACTV"
          );
        }
        return acc;
      }, {});
      setFeeVisibility(options);
    }
  }, [metaData, tenderDataCopy.tenderFees]);

  function handleonclick(
    e:
      | React.MouseEvent<HTMLElement, MouseEvent>
      | React.FocusEvent<HTMLElement, Element>
      | FocusEvent
  ) {
    displayContext(e, contextMenuId, "vertical", "center");
  }
  const selectedFees = new Set();
  const handleAdd = () => {
    const checkFeeVisible = { ...feeVisibility };

    applicablefees.forEach((opt) => {
      const id = opt.value.toString();
      const checkbox = document.getElementById(id) as HTMLInputElement;

      if (checkbox?.checked) {
        selectedFees.add(id);
        checkFeeVisible[id] = true;
        if (tenderData.tenderFees.some((fee) => fee.feesType == id))
          updateTenderFee(id, "status", "ACTV");
        else addTenderFee(id);
      } else {
        selectedFees.delete(id);
        checkFeeVisible[id] = false;
        updateTenderFee(id, "status", "INAC");
      }
    });
    setFeeVisibility(checkFeeVisible);

    closeAllContext();
    // console.log("Currently Selected:", Array.from(selectedFees));
  };

  useEffect(() => {
    const checkFeeVisible = { ...feeVisibility };

    applicablefees.forEach((opt) => {
      const id = opt.value.toString();
      // if(tenderData.tenderFees.find((x)=> x.feesType==id)?.status=="INAC"){
      //   console.log("Inactive ",id);
      // }
      // else if (tenderData.tenderFees.find((x)=> x.feesType==id)?.status=="ACTV"){
      //   console.log("active ",id);
      // }
      const checkbox = document.getElementById(id) as HTMLInputElement;
      selectedFees.add(id);
      checkFeeVisible[id] = true;
      // addTenderFee(id);
      if (checkbox?.checked) {
        selectedFees.add(id);
        checkFeeVisible[id] = true;
        if (tenderData.tenderFees.some((fee) => fee.feesType == id))
          updateTenderFee(id, "status", "ACTV");
        else addTenderFee(id);
      } else if (tenderData.id == undefined) {
        selectedFees.add(id);
        checkFeeVisible[id] = true;
        if (tenderData.tenderFees.some((fee) => fee.feesType == id))
          updateTenderFee(id, "status", "ACTV");
        else addTenderFee(id);
      } else {
        selectedFees.delete(id);
        checkFeeVisible[id] = false;
        updateTenderFee(id, "status", "INAC");
      }
    });
    setFeeVisibility(checkFeeVisible);
  }, [applicablefees, tenderData.id]);

  // useEffect(() => {
  //   console.log("feevisibility : ", feeVisibility);
  // }, [feeVisibility]);

  useEffect(() => {
    window.addEventListener("click", (e) => {
      const target = (e.target as HTMLElement).closest(
        `.${styles["depositsBtn"]}`
      );
      const target2 = (e.target as HTMLElement).closest(`#${contextMenuId}`);
      if (!target && !target2) {
        closeContext(contextMenuId);
        return;
      }
    });
    return () => {
      window.removeEventListener("click", (e) => {
        const target = (e.target as HTMLElement).closest(
          `.${styles["depositsBtn"]}`
        );
        const target2 = (e.target as HTMLElement).closest(`#${contextMenuId}`);
        if (!target && !target2) {
          closeContext(contextMenuId);
          return;
        }
      });
    };
  }, [applicablefees]);

  useEffect(() => {
    const handleScroll = (event: any) => {
      const excludedElement = document.getElementById("optionBtn");
      if (excludedElement && excludedElement.contains(event.target)) {
        closeContext(contextMenuId);
        return;
      }
    };
    window.addEventListener("scroll", handleScroll, true);
    return () => {
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.containerHead}>
        <div>Deposits</div>
        <div className={styles.applicationDeposits}>
          <DsButton
            id="optionBtn"
            label="Applicable Deposits"
            disable={applicableDepositButtonDisable}
            className={styles.optionBtn + " " + styles.depositsBtn}
            onClick={(e) => handleonclick(e)}
            endIcon={
              <div
                style={{
                  position: "relative",
                  width: "0.8375em",
                  height: "0.491875em",
                }}
                className={styles.DownArrow}
              >
                <IconFactory name="dropDownArrow"  disabled={applicableDepositButtonDisable}/>
              </div>
            }
          />
        </div>
      </div>

      {(metaData.feesType || []).map((deposit) => {
        if (typeof deposit.value === "string") {
          const currentFee = tenderData?.tenderFees?.find(
            (f) => f.feesType === deposit.value
          );
          console.log("deposite.value", currentFee);
          const isEmpty =
            !currentFee ||
            (!currentFee.amount &&
              !currentFee.paymentMode &&
              !currentFee.paidBy &&
              !currentFee.instructionNotes &&
              !currentFee.paymentDueDate &&
              !currentFee.refundEligibility &&
              !currentFee.paymentStatus &&
              !currentFee.paymentDate &&
              !currentFee.paymentTransactionId &&
              !currentFee.paymentReceiptId &&
              !currentFee.paymentTransactionId &&
              !currentFee.fundTransferConfirmationId &&
              !currentFee.paymentRefundDate &&
              !currentFee.refundNotes);
          if (feeVisibility[deposit.value] &&  (tenderData.id === undefined ||!isEmpty)) {
            return (
              <div className={styles.emdContainer2} key={deposit.value}>
                <DsFeesDocument
                  optionlist={documentTypeOptions[deposit.value]}
                  type={deposit.value}
                  title={deposit.label}
                  id={deposit.value + "DocumentView"}
                  mode={mode}
                  paidBy={paidBy}
                  downloadVisible={true}
                  refund={refund}
                  completedpayment={paymentCheckVisible}
                  recoverycheckvisibible={recoveryPaymentVisible}
                />
              </div>
            );
          }
        }
        return null;
      })}
      <ContextMenu
        id={contextMenuId}
        className={styles.applicableDeposite}
        content={
          <>
            <div className={styles.applicableDeposit}>
              <div className={styles.feesCheckboxes}>
               {applicablefees.map((checkbox, index) => (
                  <Ds_checkbox
                    key={index}
                    containerClassName={styles.feesCheckboxContainer}
                    id={checkbox.value.toString()}
                    name={checkbox.label}
                    value={checkbox.value.toString()}
                    label={checkbox.label}
                    defaultChecked={
                      
                      tenderDataCopy.id
                        ? tenderDataCopy?.tenderFees?.some(
                            (fee) => fee.feesType == checkbox.value
                          ) 
                        : true
                    }
                  />
                ))}
              </div>
              <DsButton
                label="Add"
                buttonViewStyle="btnContained"
                buttonSize="btnSmall"
                className={styles.addBtn}
                onClick={handleAdd}
              />
            </div>
          </>
        }
        showArrow={true}
      />
    </div>
  );
};
export default DsDepositeDocuments;
