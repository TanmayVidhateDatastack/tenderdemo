
import DsTextField from "@/Elements/DsComponents/DsInputs/dsTextField";
import lprSelectedSVG from "@/Common/TenderIcons/smallIcons/lprSelected.svg";
import lprSVG from "@/Common/TenderIcons/smallIcons/lpr.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Company, datalistOptions } from "@/Common/helpers/types";
import { createContext } from "@/Elements/DsComponents/dsContextHolder/dsContextHolder";
import CompanySearch from "./companySearch";
import styles from "../../AddUpdateTenderComponents/BasicDetailComponents/tender.module.css";
import DsIconButton from "@/Elements/DsComponents/DsButtons/dsIconButton";
import IconFactory from "@/Elements/IconComponent";
 
export interface CustomerLPRProps {
  index: number;
  lprValue?: number;
  lprTo?: Company;
  onValueChange?: (value: string) => void;
  onCompanyChange?: (company: Company) => void;
}
const DsCustomerLPR: React.FC<CustomerLPRProps> = ({
  index,
  lprValue,
  lprTo,
  onValueChange,
  onCompanyChange,
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
  }, [index,lprTo]);
  useEffect(()=>{
    if(lprTo?.name){
      setIsLpr(true)
    }
  },[lprTo])
  return (
    <div className={styles.LPR} id={"Lpr" + index}>
      <DsTextField
        id={"LprValue" + index}
        initialValue={lprValue ? lprValue.toString() : ""}
        onChange={(e) => {
          if (e.target.value && onValueChange) onValueChange(e.target.value);
        }}
      />
      <DsIconButton
                  startIcon={<div
                    style={{
                      position: "relative",
                      height: "0.23em", width: "0.5.5em",
                    }}
                    
                  >
                   {isLPR ? (
                    <>
                    <div className={styles.lprwitharrow}>
              <Image src={lprSelectedSVG} alt="LPR To" /> <IconFactory name="dropDownArrow" />
              </div>
              </>
            ) : (
              <>
               <div className={styles.lprwitharrow}> <Image src={lprSVG} alt="LPR To" />
              <IconFactory name="dropDownArrow" /> </div>
             
              </>
            )} </div>}
                  
                />
               
</div>
  );
};
export default DsCustomerLPR;
 
 