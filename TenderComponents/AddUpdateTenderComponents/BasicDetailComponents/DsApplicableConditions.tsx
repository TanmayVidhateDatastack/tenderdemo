import styles from "./deposite.module.css";
import Image from "next/image";
import downarrow from "@/Common/TenderIcons/smallIcons/verticleArrow.svg";
import { useState, useEffect } from "react";
import React from "react";
import Ds_checkbox from "@/Elements/DsComponents/DsCheckbox/dsCheckbox";
import ContextMenu, {
  closeAllContext,
  createContext
} from "@/Elements/DsComponents/dsContextHolder/dsContextHolder";
import {
  displayContext,
  closeContext
} from "@/Elements/DsComponents/dsContextHolder/dsContextHolder";
import { DsSelectOption } from "@/Common/helpers/types";
import DsButton from "@/Elements/DsComponents/DsButtons/dsButton";

import DsSupplyConditions from "./DsSupplyConditions";
import { useTenderData } from "../TenderDataContextProvider";
import IconFactory from "@/Elements/IconComponent";

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
  
  const { addApplicableCondition, removeApplicableCondition,tenderDataCopy,tenderData,updateApplicableCondition } = useTenderData();
  const [conditionsVisibility, setConditionsVisibility] = useState<
    Record<string, boolean>
  >({});

  function handleonclick(e: React.MouseEvent<HTMLElement, MouseEvent> | React.FocusEvent<HTMLElement, Element> | FocusEvent) {
    setContext(true);
    displayContext(e, contextMenuId);
  }
  
  const selectedConditions = new Set(); // 🔥 Store selected checkboxes globally

  const handleAdd = () => {
    applicableCheckboxes.forEach((opt) => { 
      const id = opt.value.toString(); 
      const checkbox = document.getElementById(id) as HTMLInputElement;
      if (checkbox?.checked) { 
        selectedConditions.add(id); // 🔥 Add to Set (prevents duplicates)
        conditionsVisibility[id] = true;
        if (tenderData.tenderSupplyConditions[0].applicableConditions.some((ac) => ac.type == id))
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
    if (applicableConditions && applicableConditions.length > 0) {
      const mappedConditions = applicableConditions.map((conditions) => ({
        label: conditions.label,
        value: conditions.value
      })); 
      setApplicableCheckboxes(mappedConditions);

      const options: Record<string, boolean> = mappedConditions.reduce<
        Record<string, boolean>
      >((acc, opt) => { 
        const val = opt.value;  
        if (typeof val === "string") {
          acc[val] = tenderDataCopy.id?tenderDataCopy.tenderSupplyConditions[0].applicableConditions.some(
            (ac) => ac.type == opt.value && ac.status == "ACTV"
          ):true; // Add string keys directly to the object
        }

        return acc;
      }, {});

      setConditionsVisibility(options);
    }
  }, [applicableConditions,tenderDataCopy]);

  useEffect(() => {
    applicableConditions.forEach((opt) => {
      const id = opt.value.toString();
      // if(tenderData.tenderFees.find((x)=> x.feesType==id)?.status=="INAC"){
      //   console.log("Inactive ",id);
      // }
      // else if (tenderData.tenderFees.find((x)=> x.feesType==id)?.status=="ACTV"){
      //   console.log("active ",id);
      // }
      const checkbox = document.getElementById(id) as HTMLInputElement;
      selectedConditions.add(id);
      conditionsVisibility[id] = true;
      // addTenderFee(id);
      if (checkbox?.checked) {
        selectedConditions.add(id);
        conditionsVisibility[id] = true;
        console.log(id);
        if (tenderData.tenderFees.some((fee) => fee.feesType == id))
          updateApplicableCondition(id, "status", "ACTV");
        else addApplicableCondition(id);
      } else if (checkbox) {
        selectedConditions.add(id);
        conditionsVisibility[id] = true;
        console.log(id);
        if (tenderData.tenderFees.some((fee) => fee.feesType == id)) 
          updateApplicableCondition(id, "status", "ACTV");
        // else addApplicableCondition(id);
      } else {
        selectedConditions.delete(id);
        conditionsVisibility[id] = false;
        if (tenderData.tenderFees.some((fee) => fee.feesType == id))
          updateApplicableCondition(id, "status", "INAC");

      }
    });
  }, [applicableConditions,tenderDataCopy.id]);
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
    <div className={styles.container}>
      <div className={styles.emdContainerHead2}>
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
      {applicableConditions.map((conditions) => { 
        if (typeof conditions.value == "string") 
          return ( 
            conditionsVisibility[conditions.value] && (
              <div className={styles.emdContainer2}>
                <DsSupplyConditions
                  type={conditions.value.toString()}
                  title={conditions.label} 
                  id={conditions.value + "conditionsView"} 
                /> 
              </div> 
            )  
          );   
      })} 
      <ContextMenu id={contextMenuId} content={
        <> 
        <div className={styles.applicableDeposit}>
          {applicableCheckboxes.map((checkbox, index) => (  
            <Ds_checkbox
              key={index} // Unique key
              id={checkbox.value.toString()}
              name={checkbox.label}
              value={checkbox.value.toString()}
              label={checkbox.label}
              defaultChecked={tenderDataCopy.id? tenderDataCopy?.tenderSupplyConditions[0].applicableConditions?.some(
                (ac) => ac.type == checkbox.value
              ):true}
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
      } showArrow={true}/>
    </div>
  );
};
export default DsApplicableConditions;
