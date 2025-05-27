import DsTextField from "@/Elements/DsComponents/DsInputs/dsTextField";
import { useEffect, useRef, useCallback } from "react";
import { Company, datalistOptions } from "@/Common/helpers/types";
import ContextMenu, { closeContext, displayContext } from "@/Elements/DsComponents/dsContextHolder/dsContextHolder";
import CompanySearch from "./companySearch";
import styles from "../../AddUpdateTenderComponents/BasicDetailComponents/tender.module.css";
import DsButton from "@/Elements/DsComponents/DsButtons/dsButton";
import IconFactory from "@/Elements/IconComponent";

export interface CustomerLPRProps {
  index: number;
  lprValue?: number;
  lprTo?: Company;
  onValueChange?: (value: string) => void;
  onCompanyChange?: (company: Company) => void;
  disable?: boolean;
  autofocus?: boolean;
  onBlur?: (e?: React.FocusEvent<HTMLElement>) => void;
  onCommit?: () => void;
}

const DsCustomerLPR: React.FC<CustomerLPRProps> = ({
  index,
  lprValue,
  lprTo,
  onValueChange,
  onCompanyChange,
  disable = false,
  autofocus = false,
  onBlur,
  onCommit,
}) => {
  const lprRef = useRef<HTMLDivElement>(null);

  // Only call onCommit if focus leaves the .lpr container
  const handleBlur = useCallback((e: React.FocusEvent<HTMLElement>) => {
    const relatedTarget = e.relatedTarget as HTMLElement | null;
    if (
      relatedTarget &&
      lprRef.current &&
      lprRef.current.contains(relatedTarget)
    ) {
      // Focus is still inside .lpr, do not commit
      return;
    }
    if (onBlur) onBlur(e);
    if (onCommit) onCommit();
  }, [onBlur, onCommit]);

  useEffect(() => {
    // Optionally, focus management logic here
  }, [lprTo]);

  return (
    <div
      className={`${styles.LPR} lpr`}
      id={"Lpr" + index}
      ref={lprRef}
      tabIndex={0} // Make container focusable for accessibility
      onBlur={handleBlur}
      onClick={e => e.stopPropagation()}
      style={{ outline: "none" }} // Remove default outline if you style focus
    >
      {!disable ? (
        <DsTextField
          id={"LprValue" + index}
          inputType="positive"
          initialValue={lprValue ? lprValue.toString() : ""}
          tabIndex={0} // Input is in tab order
          onBlur={handleBlur}
          autofocus={autofocus}
          onClick={e => e.stopPropagation()}
          onChange={e => {
            if (onValueChange) onValueChange(e.target.value);
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
        }}
      >
        <div
          className={styles.lprwitharrow}
          tabIndex={0} // Make the icon button focusable
          onClick={e => {
            e.stopPropagation();
            if (!disable) {
              displayContext(e, "LprTo" + index, "horizontal", "right");
            }
          }}
        >
          <div style={{ height: "1em", width: "1em" }}>
            <IconFactory name={lprTo?.name ? "personSearch" : "person1"} />
          </div>
          <div style={{ height: lprTo?.name ? "1em" : "0.875em", width: lprTo?.name ? "1em" : "0.875em" }}>
            <IconFactory name="dropDownArrow" />
          </div>
        </div>
      </div>
      <ContextMenu
        id={"LprTo" + index}
        showArrow={true}
        content={
          <div className={styles.competitorContainer} tabIndex={0}>
            <CompanySearch
              lprTo={lprTo?.name}
              setSelectedCompany={option => {
                if (option?.value && onCompanyChange) {
                  onCompanyChange({ id: option.id, name: option.value });
                }
              }}
            />
            <div className={styles.competitorSaveContainer}>
              <DsButton
                id="competitorSave"
                label="Save"
                buttonViewStyle="btnContained"
                buttonColor="btnPrimary"
                buttonSize="btnSmall"
                className={styles.competitorSave}
                onClick={() => closeContext("LprTo" + index)}
                tabIndex={0}
              />
            </div>
          </div>
        }
      />
    </div>
  );
};

export default DsCustomerLPR;
