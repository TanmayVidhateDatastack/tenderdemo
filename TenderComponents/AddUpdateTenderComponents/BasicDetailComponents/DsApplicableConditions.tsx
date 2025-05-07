import styles from "./deposite.module.css";
import Image from "next/image";
import downarrow from "@/Common/TenderIcons/smallIcons/verticleArrow.svg";
import { useState, useEffect } from "react";
import React from "react";
import Ds_checkbox from "@/Elements/DsComponents/DsCheckbox/dsCheckbox";
import ContextMenu, {
  closeAllContext,
  createContext,
} from "@/Elements/DsComponents/dsContextHolder/dsContextHolder";
import {
  displayContext,
  closeContext,
} from "@/Elements/DsComponents/dsContextHolder/dsContextHolder";
import { DsSelectOption } from "@/Common/helpers/types";
import DsButton from "@/Elements/DsComponents/DsButtons/dsButton";

import DsSupplyConditions from "./DsSupplyConditions";
import { useTenderData } from "../TenderDataContextProvider";
import IconFactory from "@/Elements/IconComponent";

//  interface ApplicableConditionsProps {
//   applicableConditions: DsSelectOption[] | [];
// }

const DsApplicableConditions: React.FC = () => {
  const contextMenuId = "context-display-11";
  const [context, setContext] = useState(false);
  const [applicableCheckboxes, setApplicableCheckboxes] = useState<
    DsSelectOption[]
  >([]);

  const {
    addApplicableCondition,
    removeApplicableCondition,
    tenderDataCopy,
    tenderData,
    updateApplicableCondition,
    metaData,
  } = useTenderData();
  const [conditionsVisibility, setConditionsVisibility] = useState<
    Record<string, boolean>
  >({});

  function handleonclick(
    e:
      | React.MouseEvent<HTMLElement, MouseEvent>
      | React.FocusEvent<HTMLElement, Element>
      | FocusEvent
  ) {
    setContext(true);
    displayContext(e, contextMenuId, "vertical", "right");
  }

  const selectedConditions = new Set(); // 🔥 Store selected checkboxes globally

  const handleAdd = () => {
    applicableCheckboxes.forEach((opt) => {
      const id = opt.value.toString();
      const checkbox = document.getElementById(id) as HTMLInputElement;
      if (checkbox?.checked) {
        selectedConditions.add(id); // 🔥 Add to Set (prevents duplicates)
        conditionsVisibility[id] = true;
        if (
          tenderData.tenderSupplyCondition.applicableConditions?.some(
            (ac) => ac.type == id
          )
        )
          updateApplicableCondition(id, "status", "ACTV");
        else addApplicableCondition(id);
      } else {
        selectedConditions.delete(id); // 🔥 Remove if unchecked
        conditionsVisibility[id] = false;
        updateApplicableCondition(id, "status", "INAC");
      }
    });
    closeAllContext();
    // console.log("Currently Selected:", Array.from(selectedConditions)); // Debugging output
  };
  // useEffect(() =>{},[handleAdd]);

  useEffect(() => {
    if (
      metaData.applicableSupplyConditions &&
      metaData.applicableSupplyConditions.length > 0
    ) {
      const mappedConditions = metaData.applicableSupplyConditions.map(
        (conditions) => ({
          label: conditions.label,
          value: conditions.value,
        })
      );
      setApplicableCheckboxes(mappedConditions || []);

      const options: Record<string, boolean> = mappedConditions.reduce<
        Record<string, boolean>
      >((acc, opt) => {
        const val = opt.value;
        if (typeof val === "string") {
          acc[val] = tenderData.id
            ? tenderData.tenderSupplyCondition.applicableConditions?.some(
                (ac) => ac.type == opt.value && ac.status == "ACTV"
              )
            : true; // Add string keys directly to the object
        }

        return acc;
      }, {});

      setConditionsVisibility(options);
    }
  }, [
    metaData?.applicableSupplyConditions,
    tenderDataCopy.tenderSupplyCondition,
  ]);

  useEffect(() => {
    const checkConditionVisible = { ...conditionsVisibility };
    (metaData.applicableSupplyConditions || []).forEach((opt) => {
      const id = opt.value.toString();
      // if(tenderData.tenderFees.find((x)=> x.feesType==id)?.status=="INAC"){
      //   console.log("Inactive ",id);
      // }
      // else if (tenderData.tenderFees.find((x)=> x.feesType==id)?.status=="ACTV"){
      //   console.log("active ",id);
      // }
      const checkbox = document.getElementById(id) as HTMLInputElement;
      selectedConditions.add(id);
      checkConditionVisible[id] = true;
      // addTenderFee(id);
      if (checkbox?.checked) {
        selectedConditions.add(id);
        checkConditionVisible[id] = true;
        console.log(id);
        if (
          tenderData.tenderSupplyCondition.applicableConditions.some(
            (ac) => ac.type == id
          )
        )
          updateApplicableCondition(id, "status", "ACTV");
        else addApplicableCondition(id);
      } else if (tenderData.id == undefined) {
        selectedConditions.add(id);
        checkConditionVisible[id] = true;
        console.log(id);
        if (
          tenderData.tenderSupplyCondition.applicableConditions.some(
            (ac) => ac.type == id
          )
        )
          updateApplicableCondition(id, "status", "ACTV");
        // else addApplicableCondition(id);
      } else {
        selectedConditions.delete(id);
        checkConditionVisible[id] = false;
        if (
          tenderData.tenderSupplyCondition.applicableConditions.some(
            (ac) => ac.type == id
          )
        )
          updateApplicableCondition(id, "status", "INAC");
      }
    });
    setConditionsVisibility(checkConditionVisible);
  }, [
    metaData.applicableSupplyConditions,

    tenderData.id,
  ]);
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
  }, [applicableCheckboxes]);
  return (
    <>
      <div className={styles.emdContainer2}>
        <div className={styles.conditionHolder}>
          <DsButton
            buttonViewStyle="btnText"
            className={styles.optionBtn + " " + styles.depositsBtn}
            label="Applicable Supply Conditions"
            endIcon={
              <div
                style={{
                  position: "relative",
                  width: "0.8375em",
                  height: "0.491875em",
                }}
                className={styles.DownArrow}
              >
                <IconFactory name="dropDownArrow" />
              </div>
            }
            onClick={(e) => handleonclick(e)}
          />
        </div>
        {conditionsVisibility &&
          Object.values(conditionsVisibility).filter((x) => x).length > 0 && (
            <div className={styles.conditions}>
              {(metaData.applicableSupplyConditions || []).map((conditions) => {
                if (typeof conditions.value == "string")
                  return (
                    conditionsVisibility[conditions.value] && (
                      <DsSupplyConditions
                        type={conditions.value.toString()}
                        title={conditions.label}
                        id={conditions.value + "conditionsView"}
                      />
                    )
                  );
              })}
            </div>
          )}
      </div>
      <ContextMenu
        id={contextMenuId}
        className={styles.applicableDeposite}
        content={
          <>
            <div className={styles.applicableDeposit}>
              {applicableCheckboxes.map((checkbox, index) => (
                <Ds_checkbox
                  key={index} // Unique key
                  containerClassName={styles.feesCheckboxContainer}
                  id={checkbox.value.toString()}
                  name={checkbox.label}
                  value={checkbox.value.toString()}
                  label={checkbox.label}
                  defaultChecked={
                    conditionsVisibility[checkbox.value.toString()]
                  }
                />
              ))}
              <DsButton
                label="Add"
                buttonViewStyle="btnContained"
                className={styles.addBtn}
                buttonSize="btnSmall"
                onClick={() => handleAdd()}
              />{" "}
            </div>
          </>
        }
        showArrow={true}
      />
    </>
  );
};
export default DsApplicableConditions;
