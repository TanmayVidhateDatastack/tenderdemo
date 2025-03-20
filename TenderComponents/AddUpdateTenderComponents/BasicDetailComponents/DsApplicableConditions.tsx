import styles from "./deposite.module.css";
import Image from "next/image";
import downarrow from "@/Icons/smallIcons/verticleArrow.svg";
import { useState, useEffect } from "react";
import React from "react";
import Ds_checkbox from "@/Elements/DsComponents/DsCheckbox/dsCheckbox";
import {
  closeAllContext,
  createContext
} from "@/Elements/DsComponents/dsContextHolder/dsContextHolder";
import {
  displayContext,
  closeContext
} from "@/Elements/DsComponents/dsContextHolder/dsContextHolder";
import { DsSelectOption } from "@/helpers/types";
import DsButton from "@/Elements/DsComponents/DsButtons/dsButton";

import DsSupplyConditions from "./DsSupplyConditions";
import { useTenderData } from "../TenderDataContextProvider";

export interface ApplicableConditionsProps {
  applicableConditions: DsSelectOption[] | [];
}

const DsApplicableConditions: React.FC<ApplicableConditionsProps> = ({
  applicableConditions
}) => {
  const contextMenuId = "context-display-11";
  const [context, setContext] = useState(false);
  const [applicableCheckboxes, setApplicableCheckboxes] = useState<
    DsSelectOption[]
  >([]);
  const { addApplicableCondition, removeApplicableCondition } = useTenderData();

  const [conditionsVisibility, setConditionsVisibility] = useState<
    Record<string, boolean>
  >({});

  function handleonclick(e: React.MouseEvent<HTMLElement, MouseEvent> | React.FocusEvent<HTMLElement, Element> | FocusEvent) {
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

      const options: Record<string, boolean> = mappedConditions.reduce<
        Record<string, boolean>
      >((acc, opt) => {
        const val = opt.value;

        if (typeof val === "string") {
          acc[val] = false; // Add string keys directly to the object
        }

        return acc;
      }, {});

      setConditionsVisibility(options);
    }
  }, [applicableConditions]);

  // useEffect(() => {
  //   console.log(
  //     "feevisibility in applicable condition : ",
  //     conditionsVisibility
  //   );
  // }, [conditionsVisibility]);

  const selectedConditions = new Set(); // 🔥 Store selected checkboxes globally

  const handleAdd = () => {
    applicableCheckboxes.forEach((opt) => {
      const id = opt.value.toString();
      const checkbox = document.getElementById(id) as HTMLInputElement;

      if (checkbox?.checked) {
        selectedConditions.add(id); // 🔥 Add to Set (prevents duplicates)
        conditionsVisibility[id] = true;

        addApplicableCondition(id);
      } else {
        selectedConditions.delete(id); // 🔥 Remove if unchecked
        conditionsVisibility[id] = false;
        removeApplicableCondition(id);
      }
    });
    closeAllContext();
    // console.log("Currently Selected:", Array.from(selectedConditions)); // Debugging output
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
          onClick={() => handleAdd()}
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
      {applicableConditions.map((conditions) => {
        if (typeof conditions.value == "string")
          return (
            conditionsVisibility[conditions.value] && (
              <div className={styles.emdContainer2}>
                <DsSupplyConditions
                  title={conditions.label}
                  id={conditions.value + "conditionsView"}
                />
              </div>
            )
          );
      })}
    </div>
  );
};
export default DsApplicableConditions;
