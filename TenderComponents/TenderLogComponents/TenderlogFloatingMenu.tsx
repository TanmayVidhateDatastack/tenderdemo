"use client";
import DsButton from "@/Elements/DsComponents/DsButtons/dsButton";
import {
  FloatingMenu,
  displayTableMenu,
} from "@/Elements/DsComponents/FloatingMenu/dsFloatingMenu";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import cancle from "@/Common/TenderIcons/smallIcons/cancle.svg";
import lost from "@/Common/TenderIcons/smallIcons/lost.svg";
import awarded from "@/Common/TenderIcons/smallIcons/awarded.svg";
import version from "@/Common/TenderIcons/smallIcons/V.svg";
import { changeImage } from "@/Common/helpers/Method/conversion";
import IconFactory from "@/Elements/IconComponent";
import { closeContext } from "@/Elements/DsComponents/dsContextHolder/dsContextHolder";
import { useTenderData } from "../AddUpdateTenderComponents/TenderDataContextProvider";
import fetchData from "@/Common/helpers/Method/fetchData";
import {
  closeTimeForTender,
  // getCustomerSubmissionDoneByTenderId,
  getTenderByTenderId,
  tenderSubmissionUrl,
} from "@/Common/helpers/constant";
import path from "path";
import style from "./filteractions.module.css";
import { stat } from "fs";
import Toaster, {
  hideToaster,
  showToaster,
} from "@/Elements/DsComponents/DsToaster/DsToaster";
import { error } from "console";

interface DsTenderTableFloatingMenuProps {
  e?: React.MouseEvent<HTMLElement>;
  rowIndex?: number;
  statuscell?: string;
  handleFetch: () => Promise<void>;
  tenderId?: number;
  goTo: (tenderId: number, status?: string) => void;
}

export const DsTenderTableFloatingMenu: React.FC<
  DsTenderTableFloatingMenuProps
> = ({ e, rowIndex, statuscell, handleFetch, tenderId, goTo }) => {
  console.log("statuscell", statuscell);
  const [actionStatus, setActionStatus] = useState<{
    notiType: "bonus" | "error" | "info" | "success" | "cross";
    notiMsg: string;
  } | null>(null);
  const [isFloatingMenuVisible, setIsFloatingMenuVisible] = useState(false);
  const [isCancelBtnVisible, setIsCancelBtnVisible] = useState(false);
  const [isLostBtnVisible, setLostBtnVisible] = useState(false);
  const [isPartiallyAwardedBtnVisible, setIsPartiallyAwardedBtnVisible] =
    useState(false);
  const [isAwardedBtnVisible, setIsAwardedBtnVisible] = useState(false);
  const [isNewVersionBtnVisible, setIsNewVersionBtnVisible] = useState(false);
  const [isSubmitVisible, setIsSubmitVisible] = useState(false);
  const [customerSubmission, setcustomerSubmission] = useState<[]>([]);
  const [isAwardedWhite, setIsAwardedWhite] = useState<boolean>(false);
  const [isParAwardedWhite, setIsParAwardedWhite] = useState<boolean>(false);
  const [isLostWhite, setIsLostWhite] = useState<boolean>(false);
  const [isCancleWhite, setIsCancletWhite] = useState<boolean>(false);
  const [isVersionWhite, setIsVersionWhite] = useState<boolean>(false);
  const [IsSubmissionWhite, setIsSubmissionWhite] = useState<boolean>(false);

  useEffect(() => {
    console.log("statuscell on load:", statuscell); // Debugging

    if (statuscell === "CANCELLED" || statuscell === "LOST") {
      setIsFloatingMenuVisible(false);
    } else {
      if (statuscell !== undefined) {
        setIsFloatingMenuVisible(true);
        setIsCancelBtnVisible(true);
      }
    }

    if (statuscell === "TENDER_SUBMITTED") {
      setIsCancelBtnVisible(true);
      setLostBtnVisible(true);
      setIsPartiallyAwardedBtnVisible(true);
      setIsAwardedBtnVisible(true);
      setIsNewVersionBtnVisible(true);
      setIsSubmitVisible(false);
    } else if (statuscell === "APPROVED") {
      setIsCancelBtnVisible(true);
      setIsPartiallyAwardedBtnVisible(true);
      setIsSubmitVisible(true);
      setLostBtnVisible(false);
      setIsAwardedBtnVisible(false);
      setIsNewVersionBtnVisible(false);
    } else {
      setIsCancelBtnVisible(true);
      setLostBtnVisible(false);
      setIsPartiallyAwardedBtnVisible(false);
      setIsAwardedBtnVisible(false);
      setIsNewVersionBtnVisible(false);
      setIsSubmitVisible(false);
    }
  }, [statuscell]);

  useEffect(() => {
    console.log("tenderId on load:", tenderId); // Debugging
    const row = document.querySelector(".tableRow-" + rowIndex) as HTMLElement;
    // if (isFloatingMenuVisible) {
    if (e && tenderId) {
      displayTableMenu(e, "tenderfloatingmenu", "bottom", "center");
      setIsFloatingMenuVisible(true);
    } else {
      row?.click();
      closeContext("tenderfloatingmenu");
      setIsFloatingMenuVisible(false);
      // }
      // } else {
      // if (row) {
      // row?.click();
      // setIsFloatingMenuVisible(true);
      // }
    }
  }, [e, rowIndex, tenderId]);
  const handleClose = () => {
    console.log("close");
    const row = document.querySelector(".tableRow-" + rowIndex) as HTMLElement;
    const slectedClass = row.classList
      .values()
      ?.find((x) => x.includes("selectedRow"));
      if (row) {
        row.click();
        closeContext("tenderfloatingmenu");
        
        setIsFloatingMenuVisible(false);
      }
      if (slectedClass) row.classList.remove(slectedClass);
    // setIsFloatingMenuVisible(false);
  };

  const SubmitTender = useCallback(async () => {
    const customerSubmission = (userId?: number) => {
      return [
        {
          op: "replace",
          path: "/status",
          value: "TENDER_SUBMITTED",
        },
        {
          op: "replace",
          path: "/lastUpdatedBy",
          value: userId || 3,
        },
      ];
    };
    const submitUrl = tenderSubmissionUrl(tenderId);
    const submissionDoc = customerSubmission();
    await fetchData({
      url: submitUrl,
      method: "PATCH",
      dataObject: submissionDoc,
    })
      .then((res) => {
        if (res?.code === 200 && res?.result) {
          handleFetch();
        } else {
          console.error("Error");
          setActionStatus({
            notiType: "error",
            notiMsg: res?.message || "Error in submission",
          });
          showToaster("tenderSubmissionToaster");
        }
      })
      .catch((err) => {
        setActionStatus({
          notiType: "error",
          notiMsg: err?.message || "Error in submission",
        });
        showToaster("tenderSubmissionToaster");
        console.error("Error fetching data:", err);
      });
    const row = document.querySelector(".tableRow-" + rowIndex) as HTMLElement;

    if (row) {
      row.click();
      closeContext("tenderfloatingmenu");
      setIsFloatingMenuVisible(false);
    } // closeContext("tenderfloatingmenu");
  }, [handleFetch, rowIndex, tenderId]);

  const handleFloatingMenuBtnClick = (status: string) => {
    const Id = tenderId;
    if (tenderId) {
      goTo(Number(tenderId), status);
    } else {
      console.warn("TenderId not found on double-clicked row");
    }
  };

  const handleCreateNewVersion = (tenderId?: number) => {
    if (tenderId != undefined) {
      const Id = tenderId;
      goTo(Number(Id), "newPricingVersion");
    }
  };

  return (
    <>
      <FloatingMenu
        selected={1}
        id={"tenderfloatingmenu"}
        onCloseClick={handleClose}
      >
        <>
          {isCancelBtnVisible && (
            <DsButton
              id="deleteBtn"
              buttonColor="btnWarning"
              buttonViewStyle="btnContained"
              startIcon={
                <div style={{ width: "1em", height: "1em" }}>
                  <IconFactory
                    name={"crossCircle"}
                    isWhite={isCancleWhite}
                    className={style.crosscirclered}
                  ></IconFactory>
                </div>
              }
              onHover={() => {
                setIsCancletWhite(true);
              }}
              onMouseLeave={() => {
                setIsCancletWhite(false);
              }}
              label="Tender Cancelled"
              onClick={() => handleFloatingMenuBtnClick("CANCELLED")}
            />
          )}
          {isLostBtnVisible && (
            <DsButton
              id="Signbtn"
              buttonColor="btnPrimary"
              buttonViewStyle="btnContained"
              className={style.tenderlost}
              startIcon={
                <div style={{ width: "1em", height: "1em" }}>
                  <IconFactory
                    name={"crossCircle"}
                    isWhite={isLostWhite}
                    className={style.crosscircle}
                  ></IconFactory>
                </div>
              }
              onHover={() => {
                setIsLostWhite(true);
              }}
              onMouseLeave={() => {
                setIsLostWhite(false);
              }}
              label="Tender Lost"
              onClick={() => handleFloatingMenuBtnClick("LOST")}
            />
          )}
          {isPartiallyAwardedBtnVisible && (
            <DsButton
              id="InvoiceBtn"
              buttonColor="btnPrimary"
              className={style.awardedbtn}
              buttonViewStyle="btnContained"
              startIcon={
                <div style={{ width: "1em", height: "1em" }}>
                  <IconFactory
                    name={"awarded"}
                    isWhite={isParAwardedWhite}
                  ></IconFactory>
                </div>
              }
              onHover={() => {
                setIsParAwardedWhite(true);
                // changeImage(e, addIconWhite);
              }}
              onMouseLeave={() => {
                setIsParAwardedWhite(false);

                // changeImage(e, addIcon);
              }}
              label="Partially Awarded"
              onClick={() => handleFloatingMenuBtnClick("PARTIALLY_AWARDED")}
            />
          )}
          {isAwardedBtnVisible && (
            <DsButton
              id="packinglistBtn"
              buttonColor="btnPrimary"
              buttonViewStyle="btnContained"
              className={style.awardedbtn}
              startIcon={
                <div style={{ width: "1em", height: "1em" }}>
                  <IconFactory
                    name={"awarded"}
                    isWhite={isAwardedWhite}
                  ></IconFactory>
                </div>
              }
              onHover={() => {
                setIsAwardedWhite(true);
                // changeImage(e, addIconWhite);
              }}
              onMouseLeave={() => {
                setIsAwardedWhite(false);

                // changeImage(e, addIcon);
              }}
              label="Awarded"
              onClick={() => handleFloatingMenuBtnClick("AWARDED")}
            />
          )}
          {isNewVersionBtnVisible && (
            <DsButton
              id="BillBtn"
              buttonColor="btnPrimary"
              buttonViewStyle="btnContained"
              className={style.awardedbtn}
              startIcon={
                <div
                  style={{
                    width: "1.2em",
                    height: "1em",
                    display: "flex",
                    alignItems: "center",
                    marginTop: "0.2em",
                  }}
                >
                  <IconFactory
                    name={"version"}
                    isWhite={isVersionWhite}
                  ></IconFactory>
                </div>
              }
              onHover={() => {
                setIsVersionWhite(true);
                // changeImage(e, addIconWhite);
              }}
              onMouseLeave={() => {
                setIsVersionWhite(false);

                // changeImage(e, addIcon);
              }}
              label="Create New Version"
              onClick={() => handleCreateNewVersion(tenderId)}
            />
          )}
          {isSubmitVisible && (
            <DsButton
              id="submit"
              buttonColor="btnPrimary"
              buttonViewStyle="btnContained"
              className={style.awardedbtn}
              startIcon={
                <div
                  style={{
                    width: "1em",
                    height: "0.5em",
                    display: "flex",
                    alignItems: "center",
                    marginTop: "0.2em",
                  }}
                >
                  <IconFactory
                    name={"tick"}
                    isWhite={IsSubmissionWhite}
                  ></IconFactory>
                </div>
              }
              onHover={() => {
                setIsSubmissionWhite(true);
              }}
              onMouseLeave={() => {
                setIsSubmissionWhite(false);

                // changeImage(e, addIcon);
              }}
              label="Customer Submission Done"
              onClick={SubmitTender}
            />
          )}
        </>
      </FloatingMenu>
      <Toaster
        handleClose={() => {
          hideToaster("tenderSubmissionToaster");
          // setShowNotification(false);
          // if (actionStatus?.notiType == "success")
          // window.location.reload();
        }}
        id={"tenderSubmissionToaster"}
        type={actionStatus?.notiType || "error"}
        message={actionStatus?.notiMsg}
        position={"top"}
        duration={closeTimeForTender}
      />
    </>
  );
};

export default DsTenderTableFloatingMenu;
