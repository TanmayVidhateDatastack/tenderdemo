import DsTextField from "@/Elements/DsComponents/DsInputs/dsTextField";
import lprSelectedSVG from "@/Common/TenderIcons/smallIcons/lprSelected.svg";
import lprSVG from "@/Common/TenderIcons/smallIcons/lpr.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Company, datalistOptions } from "@/Common/helpers/types";
import ContextMenu, {
  closeContext,
  createContext,
  displayContext,
} from "@/Elements/DsComponents/dsContextHolder/dsContextHolder";
import CompanySearch from "./companySearch";
import styles from "../../AddUpdateTenderComponents/BasicDetailComponents/tender.module.css";

import DsIconButton from "@/Elements/DsComponents/DsButtons/dsIconButton";
import IconFactory from "@/Elements/IconComponent";
import DsButton from "@/Elements/DsComponents/DsButtons/dsButton";

export interface CustomerLPRProps {
  index: number;
  lprValue?: number;
  lprTo?: Company;
  onValueChange?: (value: string) => void;
  onCompanyChange?: (company: Company) => void;
  disable: boolean;
}
const DsCustomerLPR: React.FC<CustomerLPRProps> = ({
  index,
  lprValue,
  lprTo,
  onValueChange,
  onCompanyChange,
  disable,
}) => {
  const [isLPR, setIsLpr] = useState<boolean>(false);

  const setSelectedCompany = (option: datalistOptions | undefined) => {
    if (option?.value && onCompanyChange) {
      onCompanyChange({ id: option.id, name: option.value });
      setIsLpr(true);
    } else {
      setIsLpr(false);
    }
  };

  // useEffect(() => {
  //   createContext("LprTo" + index);
  // }, [index, lprTo]);
  useEffect(() => {
    if (lprTo?.name) {
      setIsLpr(true);
    }
  }, [lprTo]);
  return (
    <div className={styles.LPR} id={"Lpr" + index}>
      {!disable ? (
        <DsTextField
          id={"LprValue" + index}
          initialValue={lprValue ? lprValue.toString() : ""}
          onBlur={(e) => {
            if ((e.target as HTMLInputElement).value && onValueChange) onValueChange((e.target as HTMLInputElement).value);
          }}
        />
      ) : lprValue ? (
        lprValue.toString()
      ) : (
        ""
      )}

      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",

          // height: "1em"
          // width: "1em",
        }}
      >
        {isLPR ? (
          <>
            <div
              className={styles.lprwitharrow}
              onClick={(e) => {
                if (!disable) {
                  displayContext(e, "LprTo" + index, "horizontal", "right");
                }
              }}
            >
              <div style={{ height: "1em", width: "1em" }}>
                <IconFactory name="personSearch" />
              </div>
              <div style={{ height: "1em", width: "1em" }}>
                <IconFactory name="dropDownArrow" />
              </div>
            </div>
          </>
        ) : (
          <>
            <div
              className={styles.lprwitharrow}
              onClick={(e) =>
                displayContext(e, "LprTo" + index, "horizontal", "right")
              }
            >
              <div style={{ height: "1.225em", width: "1.225em" }}>
                <IconFactory name="person1" />
              </div>
              <div style={{ height: "0.875em", width: "0.875em" }}>
                <IconFactory name="dropDownArrow" />
              </div>
            </div>
          </>
        )}{" "}
      </div>
      <ContextMenu
        id={"LprTo" + index}
        showArrow={true}
        content={
          // <div
          //   style={{
          //     display: "flex",
          //     padding: "0.5em",
          //     flexDirection: "column",
          //     // gap: "0.5em",
          //   }}
          // >
          //   <DsTextField id="customerlpr" label="Write Competiter name" />

          //   <DsButton
          //     id="competitorSave"
          //     label="Save"
          //     buttonViewStyle="btnContained"
          //     buttonColor="btnPrimary"
          //     buttonSize="btnSmall"
          //     className={styles.competitorSave}
          //   />
          // </div>
          <div className={styles.competitorContainer}>
            <CompanySearch
              lprTo={lprTo?.name}
              setSelectedCompany={setSelectedCompany}
            />
            <div className={styles.competitorSaveContainer}>
              <DsButton
                id="competitorSave"
                label="Save"
                buttonViewStyle="btnContained"
                buttonColor="btnPrimary"
                buttonSize="btnSmall"
                className={styles.competitorSave}
                onClick={() => {
                  closeContext("LprTo" + index);
                  // if(onCompanyChange) {
                  //   onCompanyChange(lprTo as Company);
                  // setIsLpr(true);
                }}
              />
            </div>
          </div>
        }
      />
    </div>
  );
};
export default DsCustomerLPR;
