import styles from "./deposite.module.css";
import Image from "next/image";
import downarrow from "@/Icons/smallIcons/verticleArrow.svg";
import { useEffect, useState } from "react";
import { createContext } from "@/Elements/DsComponents/dsContextHolder/dsContextHolder";
import React from "react";
import Ds_checkbox from "@/Elements/DsComponents/DsCheckbox/dsCheckbox";
import {
  displayContext,
  closeContext
} from "@/Elements/DsComponents/dsContextHolder/dsContextHolder";
import { CheckboxProp, DsSelectOption } from "@/helpers/types";
import DsButton from "@/Elements/DsComponents/DsButtons/dsButton";
import DsFeesDocument from "./DsFeesDocument";
import { useTenderData } from "../TenderDataContextProvider";

export interface DepositDocument {
  modes: DsSelectOption[];
  paidBy: DsSelectOption[];
  applicableDeposits: DsSelectOption[];
}

export interface DepositeDocumentsProps {
  setDepositeDocuments: (depositeDocuments: DepositDocument[]) => void;
  depositeDocument: DepositDocument[] | null;
}

const DsDepositeDocuments: React.FC<DepositeDocumentsProps> = ({
  depositeDocument
}) => {
  const contextMenuId = "context-display-10";
  const { addTenderFee, removeTenderFeeByType } = useTenderData();
  const [context, setContext] = useState(false);
  const [psecurityVisible, setPsecurityVisible] = useState(false);
  const [tenderFeesVisible, setTenderFeesVisible] = useState(false);
  const [mode, setMode] = useState<DsSelectOption[]>([]);
  const [paidBy, setPaidBy] = useState<DsSelectOption[]>([]);
  const feeVisibility: Record<string, boolean> = {};

  const checkboxOptions: CheckboxProp[] = [
    {
      label: "EMD",
      id: "emd",
      name: "EMD",
      value: "EMD"
    },
    {
      label: "Tender Fees",
      id: "tenderFees",
      name: "Tender Fees",
      value: "Tender Fees"
    },
    {
      label: "Performance Security",
      id: "psecurity",
      name: "Performance Security",
      value: "Performance Security"
    }
  ];

  useEffect(() => {
    if (depositeDocument) {
      const modesData = depositeDocument[0]?.modes || [];
      const paidByData = depositeDocument[0]?.paidBy || [];
      setMode(modesData);
      setPaidBy(paidByData);
    }
  }, [depositeDocument]);

  function handleonclick(e) {
    displayContext(e, contextMenuId, "vertical", "center");
  }

  const handleAdd = (e) => {
    checkboxOptions.forEach((opt) => {
      if ((document.getElementById(opt.id) as HTMLInputElement)?.checked) {
        feeVisibility[opt.id] = true;
        addTenderFee(opt.id);
      } else {
        feeVisibility[opt.id] = true;
        removeTenderFeeByType(opt.id);
      }
    });
  };

  useEffect(() => {
    createContext(
      contextMenuId,
      <>
        <div>
          {checkboxOptions.map((checkbox, index) => (
            <Ds_checkbox
              key={index}
              id={checkbox.id}
              name={checkbox.name}
              value={checkbox.value}
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
  }, []);

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
      {feeVisibility[value] && (
        <div className={styles.emdContainer2}>
          <DsFeesDocument
            title={label}
            id={value}
            mode={mode}
            paidBy={paidBy}
            downloadVisible={true}
          />
        </div>
      )}
      {tenderFeesVisible && (
        <div className={styles.emdContainer2}>
          <DsFeesDocument
            title={"Tender Fees"}
            id={"tenderFees"}
            mode={mode}
            paidBy={paidBy}
            downloadVisible={false}
          />
        </div>
      )}
      {psecurityVisible && (
        <div className={styles.emdContainer2}>
          <DsFeesDocument
            title={"Performance Security"}
            id={"performanceSecurity"}
            mode={mode}
            paidBy={paidBy}
            downloadVisible={false}
          />
        </div>
      )}
    </div>
  );
};

export default DsDepositeDocuments;
