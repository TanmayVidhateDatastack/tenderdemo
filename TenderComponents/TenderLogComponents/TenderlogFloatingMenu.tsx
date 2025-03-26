"use client";
import DsButton from "@/Elements/DsComponents/DsButtons/dsButton";
import { FloatingMenu, displayTableMenu } from "@/Elements/DsComponents/FloatingMenu/dsFloatingMenu";
import { useEffect, useState } from "react";
import Image from "next/image";
import cancle from "@/Common/TenderIcons/smallIcons/cancle.svg";
import lost from "@/Common/TenderIcons/smallIcons/lost.svg";
import awarded from "@/Common/TenderIcons/smallIcons/awarded.svg";
 import version  from "@/Common/TenderIcons/smallIcons/V.svg";
import { changeImage } from "@/Common/helpers/Method/conversion";
// import cancle from "@/Common/TenderIcons/smallIcons/cancle.svg";


interface DsTenderTableFloatingMenuProps {
  e: React.MouseEvent<HTMLElement>;
  rowIndex: number;
  statuscell: string;
}

export const DsTenderTableFloatingMenu: React.FC<DsTenderTableFloatingMenuProps> = ({ e, rowIndex, statuscell }) => {
  console.log("statuscell", statuscell);
  
  const [isFloatingMenuVisible, setIsFloatingMenuVisible] = useState(false);
  const [isCancelBtnVisible, setIsCancelBtnVisible] = useState(false);
  const [isLostBtnVisible, setLostBtnVisible] = useState(false);
  const [isPartiallyAwardedBtnVisible, setIsPartiallyAwardedBtnVisible] = useState(false);
  const [isAwardedBtnVisible, setIsAwardedBtnVisible] = useState(false);
  const [isNewVersionBtnVisible, setIsNewVersionBtnVisible] = useState(false);
  const [isSubmitVisible, setIsSubmitVisible] = useState(false);

  useEffect(() => {
    console.log("statuscell on load:", statuscell); // Debugging
  
    if (statuscell === "CANCELLED" || statuscell === "TENDERLOST") {
      setIsFloatingMenuVisible(false);
      setIsCancelBtnVisible(false);
    } else {
      setIsFloatingMenuVisible(true);
      setIsCancelBtnVisible(true);

    }
  
    if (statuscell === "SUBMITTED") {
      setLostBtnVisible(true);
      setIsPartiallyAwardedBtnVisible(true);
      setIsAwardedBtnVisible(true);
      setIsNewVersionBtnVisible(true);

    } else {
      setLostBtnVisible(false);
      setIsPartiallyAwardedBtnVisible(false);
      setIsAwardedBtnVisible(false);
      setIsNewVersionBtnVisible(false);
      setIsSubmitVisible(false);
    }
  }, [statuscell]);
  
  useEffect(() => {
    if (isFloatingMenuVisible) {
      console.log("Displaying floating menu on page load for row:", rowIndex);
      displayTableMenu(e, String(rowIndex), "bottom", "center");
    }
  }, [isFloatingMenuVisible, e, rowIndex]);
  

  const handleClose = () => {
    console.log("close");
    setIsFloatingMenuVisible(false);
  };


  return (
    <FloatingMenu selected={isFloatingMenuVisible ? 1 : 0} id={String(rowIndex)} onCloseClick={handleClose}>

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
          // onHover={(e) => {
          //   changeImage(e, addIconWhite);
          // }}
          onMouseLeave={(e) => {
            changeImage(e, cancle);
          }}
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
          // onHover={(e) => {
          //   changeImage(e, addIconWhite);
          // }}
          onMouseLeave={(e) => {
            changeImage(e, lost);
          }}
          
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
          // onHover={(e) => {
          //   changeImage(e, addIconWhite);
          // }}
          onMouseLeave={(e) => {
            changeImage(e, awarded);
          }}
          
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
          // onHover={(e) => {
          //   changeImage(e, addIconWhite);
          // }}
          onMouseLeave={(e) => {
            changeImage(e, awarded);
          }}
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
          // onHover={(e) => {
          //   changeImage(e, addIconWhite);
          // }}
          onMouseLeave={(e) => {
            changeImage(e, version);
          }}
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
          // onHover={(e) => {
          //   changeImage(e, addIconWhite);
          // }}
          onMouseLeave={(e) => {
            changeImage(e, lost);
          }}
          label="Customer Submission Done" />
        )}
      </>
    </FloatingMenu>
  );
};

export default DsTenderTableFloatingMenu;
