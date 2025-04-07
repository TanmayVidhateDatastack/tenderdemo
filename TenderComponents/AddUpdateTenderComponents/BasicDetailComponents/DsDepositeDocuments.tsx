import styles from "./deposite.module.css";
import Image from "next/image";
import downarrow from "@/Common/TenderIcons/smallIcons/verticleArrow.svg";
import { useEffect, useState } from "react";
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
import fetchData from "@/Common/helpers/Method/fetchData";
import { paidByIPCA } from "@/Common/helpers/constant";

export interface DepositDocument {
  modes: DsSelectOption[];
  // paidBy: DsSelectOption[];
}
export interface Deposit {
  paidBy: DsSelectOption[];
}

export interface FeesDocument {
  applicableDeposits: DsSelectOption[];
}

export interface DepositeDocumentsProps {
  setDepositeDocuments: (depositeDocuments: DepositDocument[]) => void;
  depositeDocument: DepositDocument[] | null;
  applicableDeposits: DsSelectOption[] | [];
  role: string;
}

const DsDepositeDocuments: React.FC<DepositeDocumentsProps> = ({
  depositeDocument,
  applicableDeposits,
  role,
}) => {
  const contextMenuId = "context-display-10";
  const { addTenderFee, removeTenderFeeByType } = useTenderData();
  const [mode, setMode] = useState<DsSelectOption[]>([]);
  const [paidBy, setPaidBy] = useState<DsSelectOption[]>([]);
  const [applicablefees, SetApplicablefees] = useState<DsSelectOption[]>([]);
  const [paymentCheckVisible, setPaymentCheckVisible] =
    useState<boolean>(false);
  const [feeVisibility, setFeeVisibility] = useState<Record<string, boolean>>({
    "": true,
  });

  useEffect(() => {
    if (role == "MAKER" || role == "CHECKER") {
      setPaymentCheckVisible(false);
    } else {
      setPaymentCheckVisible(true);
    }
  }, [role]);

  useEffect(() => {
    if (depositeDocument) {
      const modesData = depositeDocument[0]?.modes || [];
      // const paidByData = depositeDocument[0]?.paidBy || [];

      setMode(modesData);
      // setPaidBy(paidByData);
    }
    if (applicableDeposits && applicableDeposits.length > 0) {
      // console.log("000 : ", applicableDeposits);
      const mappedDeposits = applicableDeposits.map((deposit) => ({
        label: deposit.label,
        value: deposit.value,
      }));

      SetApplicablefees(mappedDeposits);
      const options: Record<string, boolean> = mappedDeposits.reduce<
        Record<string, boolean>
      >((acc, opt) => {
        const val = opt.value;

        if (typeof val === "string") {
          acc[val] = true;
        }

        return acc;
      }, {});

      setFeeVisibility(options);
    }
  }, [depositeDocument, applicableDeposits]);

  useEffect(() => {
    if (applicablefees) {
      console.log("applicable fees : ", applicablefees);
    }
  }, [applicablefees]);

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
    applicablefees.forEach((opt) => {
      const id = opt.value.toString();
      const checkbox = document.getElementById(id) as HTMLInputElement;

      if (checkbox?.checked) {
        selectedFees.add(id);
        feeVisibility[id] = true;
        addTenderFee(id);
      } else {
        selectedFees.delete(id);
        feeVisibility[id] = false;
        removeTenderFeeByType(id);
      }
    });
    closeAllContext();
    // console.log("Currently Selected:", Array.from(selectedFees));
  };

  // useEffect(() => {
  //   applicablefees.forEach((opt) => {
  //     const id = opt.value.toString();
  //     const checkbox = document.getElementById(id) as HTMLInputElement;
  //     selectedFees.add(id);
  //     feeVisibility[id] = true;
  //     addTenderFee(id);
  //     if (checkbox?.checked) {
  //       selectedFees.add(id);
  //       feeVisibility[id] = true;
  //       addTenderFee(id);
  //     } else if (checkbox) {
  //       selectedFees.add(id);
  //       feeVisibility[id] = true;
  //       addTenderFee(id);
  //     } else {
  //       selectedFees.delete(id);
  //       feeVisibility[id] = false;
  //       removeTenderFeeByType(id);
  //     }
  //   })
  // }, [applicablefees])

  // useEffect(() => {
  //   console.log("feevisibility : ", feeVisibility);
  // }, [feeVisibility]);

  useEffect(() => {
    // createContext(
    //   contextMenuId,
    //   <>
    //     <div className={styles.feesCheckboxes}>
    //       {applicablefees.map((checkbox, index) => (
    //         <Ds_checkbox
    //           key={index}
    //           id={checkbox.value.toString()}
    //           name={checkbox.label}
    //           value={checkbox.value.toString()}
    //           label={checkbox.label}
    //           defaultChecked={true}
    //         />
    //       ))}
    //     </div>
    //     <DsButton
    //       label="Add"
    //       buttonViewStyle="btnContained"
    //       buttonSize="btnLarge"
    //       className={styles.addBtn}
    //       onClick={handleAdd}
    //     />
    //   </>,
    //   true
    // );
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

  const [depositeDocuments, setDepositeDocuments] = useState<Deposit>({
    paidBy:[]
  });
  const handleAppliedSuppliedFetch = async () => {
    try {
      const res = await fetchData({ url: paidByIPCA });
      if (res.code === 200) {
        const result = res.result;

        console.log("appliedbysuppliedby : ", result);

        const paidbys = {
          paidBy: result.paidBy.map((item: any) => ({
            value: item.codeValue,  
            label: item.codeDescription,
          })),
          
        };
        setDepositeDocuments(paidbys); 
      } else {
        console.error("Error fetching data: ", res.message || "Unknown error");
      }
    } catch (error) {
      console.error("Fetch error: ", error);     
    } 
  };

  useEffect(() => {
    handleAppliedSuppliedFetch();
  }, []);   

  return (
    <div className={styles.container}>
      <div className={styles.containerHead}>
        <div>Deposits</div>
        <div className={styles.applicationDeposits}>
          <DsButton
            id="optionBtn"
            label="Applicable Deposits"
            className={styles.optionBtn + " " + styles.depositsBtn}
            endIcon={<Image src={downarrow} alt="downarrow" />}
            onClick={(e) => handleonclick(e)}
          />
        </div>
      </div>
      {applicableDeposits.map((deposit) => {
        if (typeof deposit.value == "string")
          return (
            feeVisibility[deposit.value] && (
              <div className={styles.emdContainer2}>
                <DsFeesDocument
                  title={deposit.label}
                  id={deposit.value + "DocumentView"}
                  mode={mode}
                  paidBy={paidBy}
                  downloadVisible={true}
                  paymentCompletedVisible={paymentCheckVisible}
                />
              </div>
            )
          );
      })}
      <ContextMenu
        id={contextMenuId}
        content={
          <>
            <div className={styles.feesCheckboxes}>
              {applicablefees.map((checkbox, index) => (
                <Ds_checkbox
                  key={index}
                  id={checkbox.value.toString()}
                  name={checkbox.label}
                  value={checkbox.value.toString()}
                  label={checkbox.label}
                  defaultChecked={true}
                />
              ))}
            </div>
            <DsButton
              label="Add"
              buttonViewStyle="btnContained"
              buttonSize="btnMedium"
              className={styles.addBtn}
              onClick={handleAdd}
            />
          </>
        }
        showArrow={true}
      />
    </div>
  );
};
export default DsDepositeDocuments;
