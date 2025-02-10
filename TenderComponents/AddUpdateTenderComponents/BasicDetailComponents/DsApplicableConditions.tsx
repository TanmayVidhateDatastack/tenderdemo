import styles from "./deposite.module.css";
import Image from "next/image";
import downarrow from "@/Icons/smallIcons/verticleArrow.svg";
import { useState, useEffect } from "react";
import React from "react";
import Ds_checkbox from "@/Elements/DsComponents/DsCheckbox/dsCheckbox";
import { createContext } from "@/Elements/DsComponents/dsContextHolder/dsContextHolder";
import {
  displayContext,
  closeContext
} from "@/Elements/DsComponents/dsContextHolder/dsContextHolder";
import { DsSelectOption } from "@/helpers/types";
import DsButton from "@/Elements/DsComponents/DsButtons/dsButton";
import DsCsvUpload from "@/Elements/DsComponents/DsButtons/dsCsvUpload";
import TextArea from "@/Elements/DsComponents/DsInputs/dsTextArea";
import { useTenderData } from "../TenderDataContextProvider";

export interface ApplicableConditionsProps {
  applicableConditions: DsSelectOption[] | [];
}

const DsApplicableConditions: React.FC<ApplicableConditionsProps> = ({
  applicableConditions
}) => {
  const { updateTenderFee } = useTenderData();

  const contextMenuId = "context-display-11";
  const [context, setContext] = useState(false);
  const [embossmentTableVisible, setEmbossmentTebleVisible] = useState(false);
  const [logogramVisible, setLogogramVisible] = useState(false);
  const [barcodingVisible, setBarCodingVisible] = useState(false);
  const [printingVisible, setPrintingVisible] = useState(false);
  const [applicableCheckboxes, setApplicableCheckboxes] = useState<
    DsSelectOption[]
  >([]);

  function handleonclick(e) {
    setContext(true);
    console.log("context : ", context);
    displayContext(e, contextMenuId);
  }

  useEffect(() => {
    if (applicableConditions && applicableConditions.length > 0) {
      console.log("000 : ", applicableConditions);
      const mappedConditions = applicableConditions.map((conditions) => ({
        label: conditions.label,
        value: conditions.value
      }));
      console.log("mapped Conditions:", mappedConditions);

      setApplicableCheckboxes(mappedConditions);
    }
  }, [applicableConditions]);

  const handleAdd = (e) => {
    applicableCheckboxes.forEach((opt) => {
      const id = opt.value.toString();
      if ((document.getElementById(id) as HTMLInputElement)?.checked) {
        if (id == "embossmentTablet") {
          setEmbossmentTebleVisible(true);
        } else if (id == "logogram") {
          setLogogramVisible(true);
        } else if (id == "barCoding") {
          setBarCodingVisible(true);
        } else if (id == "printing") {
          setPrintingVisible(true);
        }
      } else {
        if (id == "embossmentTablet") {
          setEmbossmentTebleVisible(false);
        } else if (id == "logogram") {
          setLogogramVisible(false);
        } else if (id == "barCoding") {
          setBarCodingVisible(false);
        } else if (id == "printing") {
          setPrintingVisible(false);
        }
      }
    });
  };

  useEffect(() => {
    createContext(
      contextMenuId,
      <>
        <div>
          {applicableCheckboxes.map((checkbox, index) => (
            <Ds_checkbox
              key={index} // Unique key
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
          className={styles.addBtn}
          buttonSize="btnLarge"
          onClick={(e) => handleAdd(e)}
        />{" "}
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
  }, [applicableCheckboxes]);
  return (
    <div className={styles.container}>
      <div className={styles.emdContainerHead2}>
        <DsButton
          buttonViewStyle="btnText"
          className={styles.optionBtn + " " + styles.depositsBtn}
          label="Applicable Supply Conditions"
          endIcon={<Image src={downarrow} alt="downarrow" />}
          onClick={(e) => handleonclick(e)}
        />
      </div>
      {embossmentTableVisible && (
        <div className={styles.emdContainer}>
          <div className={styles.emdContainerHead}>
            <div>Embossment on Table</div>
          </div>
          <div className={styles.notes}>
            <h4>Notes</h4>
            <TextArea placeholder="Please type here" disable={false} />
          </div>
          <div className={styles.attachFileBtn}>
            <DsCsvUpload
              id="upload1"
              label="Attach File"
              buttonViewStyle="btnText"
              buttonSize="btnSmall"
            ></DsCsvUpload>
          </div>
        </div>
      )}
      {logogramVisible && (
        <div className={styles.emdContainer}>
          <div className={styles.emdContainerHead}>
            <div>Logogram</div>
          </div>

          <div className={styles.notes}>
            <h4>Notes</h4>
            <TextArea placeholder="Please type here" disable={false} />
          </div>
          <div>
            <DsCsvUpload
              id="upload2"
              label="Attach File"
              buttonViewStyle="btnText"
              buttonSize="btnSmall"
            ></DsCsvUpload>
          </div>
        </div>
      )}
      {barcodingVisible && (
        <div className={styles.emdContainer}>
          <div className={styles.emdContainerHead}>
            <div>Bar Coding</div>
          </div>

          <div className={styles.notes}>
            <h4>Notes</h4>
            <TextArea placeholder="Please type here" disable={false} />
          </div>
          <div>
            <DsCsvUpload
              id="upload3"
              label="Attach File"
              buttonViewStyle="btnText"
              buttonSize="btnSmall"
            ></DsCsvUpload>
          </div>
        </div>
      )}
      {printingVisible && (
        <div className={styles.emdContainer}>
          <div className={styles.emdContainerHead}>
            <div>Printing</div>
          </div>

          <div className={styles.notes}>
            <h4>Notes</h4>
            <TextArea placeholder="Please type here" disable={false} />
          </div>
          <div>
            <DsCsvUpload
              id="upload4"
              label="Attach File"
              buttonViewStyle="btnText"
              buttonSize="btnSmall"
            ></DsCsvUpload>
          </div>
        </div>
      )}
    </div>
  );
};
export default DsApplicableConditions;
