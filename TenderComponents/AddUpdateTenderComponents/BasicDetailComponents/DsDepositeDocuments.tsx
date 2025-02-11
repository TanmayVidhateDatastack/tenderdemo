import styles from "./deposite.module.css";
import Image from "next/image";
import downarrow from "@/Icons/smallIcons/verticleArrow.svg";
import { useEffect, useState } from "react";
import {
  closeAllContext,
  createContext
} from "@/Elements/DsComponents/dsContextHolder/dsContextHolder";
import React from "react";
import Ds_checkbox from "@/Elements/DsComponents/DsCheckbox/dsCheckbox";
import {
  displayContext,
  closeContext
} from "@/Elements/DsComponents/dsContextHolder/dsContextHolder";
import { DsSelectOption } from "@/helpers/types";
import DsButton from "@/Elements/DsComponents/DsButtons/dsButton";
import DsFeesDocument from "./DsFeesDocument";
import { useTenderData } from "../TenderDataContextProvider";

export interface DepositDocument {
  modes: DsSelectOption[];
  paidBy: DsSelectOption[];
}

export interface FeesDocument {
  applicableDeposits: DsSelectOption[];
}

export interface DepositeDocumentsProps {
  setDepositeDocuments: (depositeDocuments: DepositDocument[]) => void;
  depositeDocument: DepositDocument[] | null;
  applicableDeposits: DsSelectOption[] | [];
}

const DsDepositeDocuments: React.FC<DepositeDocumentsProps> = ({
  depositeDocument,
  applicableDeposits
}) => {
  const contextMenuId = "context-display-10";
  const { addTenderFee, removeTenderFeeByType } = useTenderData();
  const [mode, setMode] = useState<DsSelectOption[]>([]);
  const [paidBy, setPaidBy] = useState<DsSelectOption[]>([]);
  const [applicablefees, SetApplicablefees] = useState<DsSelectOption[]>([]);
  const [feeVisibility, setFeeVisibility] = useState<Record<string, boolean>>(
    {}
  );

  useEffect(() => {
    if (depositeDocument) {
      const modesData = depositeDocument[0]?.modes || [];
      const paidByData = depositeDocument[0]?.paidBy || [];

      setMode(modesData);
      setPaidBy(paidByData);
    }
    if (applicableDeposits && applicableDeposits.length > 0) {
      console.log("000 : ", applicableDeposits);
      const mappedDeposits = applicableDeposits.map((deposit) => ({
        label: deposit.label,
        value: deposit.value
      }));

      SetApplicablefees(mappedDeposits);
      const options: Record<string, boolean> = mappedDeposits.reduce<
        Record<string, boolean>
      >((acc, opt) => {
        const val = opt.value;

        if (typeof val === "string") {
          acc[val] = false; // Add string keys directly to the object
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

  function handleonclick(e) {
    displayContext(e, contextMenuId, "vertical", "center");
  }

  const selectedFees = new Set(); // 🔥 Store selected checkboxes globally

  const handleAdd = (e) => {
    applicablefees.forEach((opt) => {
      const id = opt.value.toString();
      const checkbox = document.getElementById(id) as HTMLInputElement;

      if (checkbox?.checked) {
        selectedFees.add(id); // 🔥 Add to Set (prevents duplicates)
        feeVisibility[id] = true;
        addTenderFee(id);
      } else {
        selectedFees.delete(id); // 🔥 Remove if unchecked
        feeVisibility[id] = false;
        removeTenderFeeByType(id);
      }
    });
    closeAllContext();
    console.log("Currently Selected:", Array.from(selectedFees)); // Debugging output
  };

  // const handleAdd = (e) => {
  //   const selectedFees = { ...feeVisibility }; // 🔥 Preserve existing selections

  //   applicablefees.forEach((opt) => {
  //     const id = opt.value.toString();
  //     const checkbox = document.getElementById(id) as HTMLInputElement;

  //     if (checkbox?.checked) {
  //       selectedFees[id] = true;
  //       addTenderFee(id);

  //       // 🔥 Send existing + new selections
  //       updateTenderFee(id, "amount", Object.keys(selectedFees));
  //     } else {
  //       selectedFees[id] = false;
  //       removeTenderFeeByType(id);
  //     }
  //   });

  //   // 🔥 Update feeVisibility globally
  //   Object.assign(feeVisibility, selectedFees);
  // };

  useEffect(() => {
    console.log("feevisibility : ", feeVisibility);
  }, [feeVisibility]);

  useEffect(() => {
    createContext(
      contextMenuId,
      <>
        <div>
          {applicablefees.map((checkbox, index) => (
            <Ds_checkbox
              key={index}
              id={checkbox.value.toString()}
              name={checkbox.label}
              value={checkbox.value.toString()}
              label={checkbox.label}
            />
          ))}
        </div>
        <DsButton
          label="Add"
          buttonViewStyle="btnContained"
          buttonSize="btnLarge"
          className={styles.addBtn}
          onClick={handleAdd}
        />
      </>,
      true
    );
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
    const handleScroll = (event) => {
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
            label="Application Deposits"
            className={styles.optionBtn + " " + styles.depositsBtn}
            endIcon={<Image src={downarrow} alt="downarrow" />}
            onClick={(e) => handleonclick(e)}
          />
        </div>
      </div>
      {/* {/*  */}
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
                />
              </div>
            )
          );
      })}

      {/* // */}
    </div>
  );
};

export default DsDepositeDocuments;
