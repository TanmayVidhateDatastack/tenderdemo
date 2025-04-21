import DsTextField from "@/Elements/DsComponents/DsInputs/dsTextField";
import lprSelectedSVG from "@/Common/TenderIcons/smallIcons/lprSelected.svg";
import lprSVG from "@/Common/TenderIcons/smallIcons/lpr.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Company, datalistOptions } from "@/Common/helpers/types";
import ContextMenu, {
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

  useEffect(() => {
    createContext(
      "LprTo" + index,
      <div>
        <CompanySearch
          lprTo={lprTo?.name}
          setSelectedCompany={setSelectedCompany}
        />
      </div>
    );
  }, [index, lprTo]);
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
          onChange={(e) => {
            if (e.target.value && onValueChange) onValueChange(e.target.value);
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
          height: "0.23em",
          width: "0.5.5em",
        }}
      >
        {isLPR ? (
          <>
            <div
              className={styles.lprwitharrow}
              onClick={(e) => {
                if (!disable) {
                  displayContext(e, "customerLpr", "horizontal", "right");
                }
              }}
            >
              <Image src={lprSelectedSVG} alt="LPR To" />
              <div style={{ height: "0.5em", width: "0.5em" }}>
                <IconFactory name="dropDownArrow" />
              </div>
            </div>
          </>
        ) : (
          <>
            <div
              className={styles.lprwitharrow}
              onClick={(e) =>
                displayContext(e, "customerLpr", "horizontal", "right")
              }
            >
              <Image src={lprSVG} alt="LPR To" />
              <div style={{ height: "1em", width: "1em" }}>
                <IconFactory name="dropDownArrow" />
              </div>
            </div>
          </>
        )}{" "}
      </div>
      <ContextMenu
        id="customerLpr"
        showArrow={true}
        content={
          <div
            style={{
              display: "flex",
              padding: "0.5em",
              flexDirection: "column",
            }}
          >
            <DsTextField id="customerlpr" label="Write Competiter name" />

            <DsButton
              id="approveButton"
              label="Save"
              buttonViewStyle="btnContained"
              buttonColor="btnPrimary"
              buttonSize="btnSmall"
            />
          </div>
        }
      />
    </div>
  );
};
export default DsCustomerLPR;
