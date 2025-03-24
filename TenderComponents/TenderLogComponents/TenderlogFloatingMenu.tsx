"use client";
import DsButton from "@/Elements/DsComponents/DsButtons/dsButton";
import { FloatingMenu, displayTableMenu } from "@/Elements/DsComponents/FloatingMenu/dsFloatingMenu";
import { useEffect, useState } from "react";
import Image from "next/image";
import cancle from "@/Icons/smallIcons/cancle.svg";
import lost from "@/Icons/smallIcons/lost.svg";
import awarded from "@/Icons/smallIcons/awarded.svg";
 import version  from "@/Icons/smallIcons/V.svg";
// import cancle from "@/Icons/smallIcons/cancle.svg";


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
    if (statuscell === "CANCELLED" || statuscell === "TENDERLOST") {
      setIsCancelBtnVisible(false);
    } else {
      setIsCancelBtnVisible(true);
    }
  
    if (statuscell === "Submit ") {
      setLostBtnVisible(true);
      setIsPartiallyAwardedBtnVisible(true);
      setIsAwardedBtnVisible(true);
      setIsNewVersionBtnVisible(true);
      setIsSubmitVisible(true);
    } else {
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
  const handleClose = () => {
    console.log("close");
  };
  

  return (
    <FloatingMenu selected={1} id={String(rowIndex)}
    
    onCloseClick={handleClose}
    >
      <>
        {isCancelBtnVisible && (
          <DsButton id="deleteBtn" buttonColor="btnWarning" buttonViewStyle="btnContained" 
          startIcon={
            <div
              style={{
                width: "1.125em",
                height: "1.125em",
                position: "relative",
              }}
            >
              <Image
                src={cancle}
                alt="Add Icon"
                layout="fill"
                objectFit="cover"
              />
            </div>
          }
          label="Tender Cancelled" />
        )}
        {isLostBtnVisible && (
          <DsButton id="Signbtn" buttonColor="btnPrimary" buttonViewStyle="btnContained" 
          startIcon={
            <div
              style={{
                width: "1.125em",
                height: "1.125em",
                position: "relative",
              }}
            >
              <Image
                src={lost}
                alt="Add Icon"
                layout="fill"
                objectFit="cover"
              />
            </div>
          }
          
          
          label="Tender Lost" />
        )}
        {isPartiallyAwardedBtnVisible && (
          <DsButton id="InvoiceBtn"     buttonColor="btnPrimary"
        buttonViewStyle="btnText"
          startIcon={
            <div
              style={{
                width: "1.125em",
                height: "1.125em",
                position: "relative",
              }}
            >
              <Image
                src={awarded}
                alt="Add Icon"
                layout="fill"
                objectFit="cover"
              />
            </div>
          }
          
          label="Partially Awarded" />
        )}
        {isAwardedBtnVisible && (
          <DsButton id="packinglistBtn"     buttonColor="btnPrimary"
        buttonViewStyle="btnText"
          startIcon={
            <div
              style={{
                width: "1.125em",
                height: "1.125em",
                position: "relative",
              }}
            >
              <Image
                src={awarded}
                alt="Add Icon"
                layout="fill"
                objectFit="cover"
              />
            </div>
          }
          
          label="Awarded" />
        )}
        {isNewVersionBtnVisible && (
          <DsButton id="BillBtn"     buttonColor="btnPrimary"
        buttonViewStyle="btnText"
          startIcon={
            <div
              style={{
                width: "1.125em",
                height: "1.125em",
                position: "relative",
              }}
            >
              <Image
                src={version}
                alt="Add Icon"
                layout="fill"
                objectFit="cover"
              />
            </div>
          }
          
          label="Create New Version" />
        )}
        {isSubmitVisible && (
          <DsButton id="submit"     buttonColor="btnPrimary"
        buttonViewStyle="btnText"
          startIcon={
            <div
              style={{
                width: "1.125em",
                height: "1.125em",
                position: "relative",
              }}
            >
              <Image
                src={lost}
                alt="Add Icon"
                layout="fill"
                objectFit="cover"
              />
            </div>
          }
          label="Customer Submission Done" />
        )}
      </>
    </FloatingMenu>
  );
};

export default DsTenderTableFloatingMenu;
