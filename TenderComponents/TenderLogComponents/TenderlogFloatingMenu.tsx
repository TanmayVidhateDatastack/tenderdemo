"use client";
import DsButton from "@/Elements/DsComponents/DsButtons/dsButton";
import { FloatingMenu, displayTableMenu } from "@/Elements/DsComponents/FloatingMenu/dsFloatingMenu";
import { useEffect, useState } from "react";

interface DsTenderTableFloatingMenuProps {
  e: React.MouseEvent<HTMLElement>;
  rowIndex: number;
  statuscell: string;
}

export const DsTenderTableFloatingMenu: React.FC<DsTenderTableFloatingMenuProps> = ({ e, rowIndex, statuscell }) => {
  console.log("statuscell", statuscell);

  const [isCancelBtnVisible, setIsCancelBtnVisible] = useState(false);
  const [isLostBtnVisible, setLostBtnVisible] = useState(false);
  const [isPartiallyAwardedBtnVisible, setIsPartiallyAwardedBtnVisible] = useState(false);
  const [isAwardedBtnVisible, setIsAwardedBtnVisible] = useState(false);
  const [isNewVersionBtnVisible, setIsNewVersionBtnVisible] = useState(false);
  const [isSubmitVisible, setIsSubmitVisible] = useState(false);

  useEffect(() => {
    if (statuscell === "DRAFT") {
      setIsCancelBtnVisible(true);
      setLostBtnVisible(true);
      setIsPartiallyAwardedBtnVisible(true);
      setIsAwardedBtnVisible(true);
      setIsNewVersionBtnVisible(true);
      setIsSubmitVisible(true);
    } else {
      setIsCancelBtnVisible(false);
      setLostBtnVisible(false);
      setIsPartiallyAwardedBtnVisible(false);
      setIsAwardedBtnVisible(false);
      setIsNewVersionBtnVisible(false);
      setIsSubmitVisible(false);
    }
  }, [statuscell]);
  
  useEffect(() => {
    console.log("Mouse Event:", e);
    console.log("Calling displayTableMenu for id:", rowIndex);
    displayTableMenu(e, String(rowIndex), "bottom", "center");
  }, [e, rowIndex]);
  

  return (
    <FloatingMenu selected={1} id={String(rowIndex)}
    
    
    >
      <>
        {isCancelBtnVisible && (
          <DsButton id="deleteBtn" buttonColor="btnWarning" buttonViewStyle="btnContained" label="Tender Cancelled" />
        )}
        {isLostBtnVisible && (
          <DsButton id="Signbtn" buttonColor="btnPrimary" buttonViewStyle="btnContained" label="Tender Lost" />
        )}
        {isPartiallyAwardedBtnVisible && (
          <DsButton id="InvoiceBtn" buttonColor="btnPrimary" buttonViewStyle="btnContained" label="Partially Awarded" />
        )}
        {isAwardedBtnVisible && (
          <DsButton id="packinglistBtn" buttonColor="btnPrimary" buttonViewStyle="btnContained" label="Awarded" />
        )}
        {isNewVersionBtnVisible && (
          <DsButton id="BillBtn" buttonColor="btnPrimary" buttonViewStyle="btnContained" label="Create New Version" />
        )}
        {isSubmitVisible && (
          <DsButton id="submit" buttonColor="btnPrimary" buttonViewStyle="btnContained" label="Customer Submission Done" />
        )}
      </>
    </FloatingMenu>
  );
};

export default DsTenderTableFloatingMenu;
