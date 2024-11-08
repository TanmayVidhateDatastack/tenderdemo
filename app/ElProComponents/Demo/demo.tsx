"use client";
import { useState } from "react";
import DSButton from "../../Components/dsButton/dsButton";
import styles from "../../page.module.css";
import buttonStyles from "../../Components/dsButton/dsButton.module.css";
import PaneStyles from "../../Components/dsPane/dsPane.module.css";
// import addIcon from "./Icons/add.svg";
// import DSButton from "./Components/DsButton/DsButton";
// import ButtonLibrary from "./Components/dsButton/DS_ButtonLibrary";
import Toaster from "../../Components/DsToaster/DsToaster";
// import SaveButton from "./Components/DsButton/Ds_SaveBtn";
// import DsPane from "../../Components/dsPane/dsPane";
import Application from "../../ElProComponents/ApplicationComponents/Application";
import DsPopup from "../../Components/dsPopup/dsPopup";
import PopupOpenButton from "../../Components/dsPopup/popupOpenButton";
// import ButtonLibrary from "./Components/dsButton/DS_ButtonLibrary";
import DemoButtons from "../../Components/dsButton/dsDemoButtons";
import Image from "next/image";
import PopUpContext from "../../Components/dscontext/dscontext";
// import SaveButton from "./Components/DsButton/Ds_SaveBtn";
import DsTableComponent from "../../Components/DsTablecomponent/DsTableComponent";
import DemoSelect from "@/app/Components/dsSelect/dsDemoSelect";
import DemoContext from "@/app/Components/dsContextHolder/dsDemoContextHolder";
import DemoPane from "@/app/Components/dsPane/dsDemoPane";
import DemoTextField from "@/app/Components/DsTextField/dsDemoTextField";
import DemoLayout from "./demoLayout";
import DemoDeviation from "@/app/Components/DsDeviations/demoDeviation";
import DemoUserProfile from "@/app/Components/DsUserProfile/demoUserProfile";
import DsDemoStatusIndocator from "@/app/Components/DsStatusIndicator/dsDemoStatusIndicator";
import TabContainer from "@/app/Components/dsTabs/TabContainer";
import TabView from "@/app/Components/dsTabs/TabView";
import DemoSummaryCount from "@/app/Components/DsSummaryCount/demoSummaryCount";
import DsPane from "@/app/Components/dsPane/dsPane";
import DsStateChange from "@/app/Components/DsStatusIndicator/dsStatusIndicator";
import commentIcon from "../../Icons/smallIcons/commenticon.svg";

export default function Demo() {
  const tempTableData = {
    className: "sample-table",
    id: "table-1",
    columns: [
      {
        columnIndex: 0,
        className: "header-column",
        columnHeader: "ORDER ID",
        isHidden: false,
        sort: "ASC",
        columnContentType: "number",
      },
      {
        columnIndex: 1,
        className: "header-column",
        columnHeader: "DATE",
        isHidden: false,
        sort: "ASC",
        columnContentType: "date",
      },
      {
        columnIndex: 2,
        className: "header-column",
        columnHeader: "CUSTOMER ID",
        isHidden: false,
        sort: "ASC",
        columnContentType: "string",
      },
      {
        columnIndex: 3,
        className: "header-column",
        columnHeader: "CUSTOMER",
        isHidden: false,
        sort: "ASC",
        columnContentType: "string",
      },
      {
        columnIndex: 4,
        className: "header-column",
        columnHeader: "QTY",
        isHidden: false,
        sort: "ASC",
        columnContentType: "number",
      },
      {
        columnIndex: 5,
        className: "header-column",
        columnHeader: "NET VALUE (₹)",
        isHidden: false,
        sort: "ASC",
        columnContentType: "number",
      },
      {
        columnIndex: 6,
        className: "header-column",
        columnHeader: "GROSS VALUE (₹)",
        isHidden: false,
        sort: "ASC",
        columnContentType: "number",
      },
      {
        columnIndex: 7,
        className: "header-column",
        columnHeader: "STATUS",
        isHidden: false,
        sort: "NONE",
        columnContentType: "reactNode",
      },
    ],
    rows: [
      {
        rowIndex: 0,
        className: "row",
        content: [
          {
            columnIndex: 0,
            className: "cell",
            content: 20240199900001,
            contentType: "number",
          },
          {
            columnIndex: 1,
            className: "cell",
            content: "24/09/2022",
            contentType: "date",
          },
          {
            columnIndex: 2,
            className: "cell",
            content: "DF09",
            contentType: "string",
          },
          {
            columnIndex: 3,
            className: "cell",
            content: "Medplus Health Services",
            contentType: "string",
          },
          {
            columnIndex: 4,
            className: "cell",
            content: 400,
            contentType: "number",
          },
          {
            columnIndex: 5,
            className: "cell",
            content: "12,00,000",
            contentType: "string",
          },
          {
            columnIndex: 6,
            className: "cell",
            content: "12,02,000",
            contentType: "number",
          },
          {
            columnIndex: 7,
            className: "cell",
            content: (
              <DsStateChange
                className={styles.statusIndicator}
                type="user_defined"
                id="state1"
                status="Approved"
                label="approved"
                status_icon={<Image src={commentIcon} alt="icon" />}
                comment="Justification and Comments"
              />
            ),
            contentType: "reactNode",
          },
        ],
      },
      {
        rowIndex: 1,
        className: "row",
        content: [
          {
            columnIndex: 0,
            className: "cell",
            content: 20240199900002,
            contentType: "number",
          },
          {
            columnIndex: 1,
            className: "cell",
            content: "24/09/2024",
            contentType: "date",
          },
          {
            columnIndex: 2,
            className: "cell",
            content: "CD34",
            contentType: "string",
          },
          {
            columnIndex: 3,
            className: "cell",
            content: "Apollo Pharmacy",
            contentType: "string",
          },
          {
            columnIndex: 4,
            className: "cell",
            content: 1200,
            contentType: "number",
          },
          {
            columnIndex: 5,
            className: "cell",
            content: "13,00,900",
            contentType: "string",
          },
          {
            columnIndex: 6,
            className: "cell",
            content: "13,03,900",
            contentType: "number",
          },
          {
            columnIndex: 7,
            className: "cell",
            content: (
              <DsStateChange
                className={styles.statusIndicator}
                type="system_default"
                id="state8"
                status="Pending"
                label="Deviation Pending"
                btn_label="Check Failed"
              />
            ),
            contentType: "reactNode",
          },
        ],
      },
      {
        rowIndex: 2,
        className: "row",
        content: [
          {
            columnIndex: 0,
            className: "cell",
            content: 20240199900003,
            contentType: "number",
          },
          {
            columnIndex: 1,
            className: "cell",
            content: "24/09/2024",
            contentType: "date",
          },
          {
            columnIndex: 2,
            className: "cell",
            content: "HJ65",
            contentType: "string",
          },
          {
            columnIndex: 3,
            className: "cell",
            content: "Hetero Drugs Ltd.",
            contentType: "string",
          },
          {
            columnIndex: 4,
            className: "cell",
            content: 8000,
            contentType: "number",
          },
          {
            columnIndex: 5,
            className: "cell",
            content: "12,00,000",
            contentType: "string",
          },
          {
            columnIndex: 6,
            className: "cell",
            content: "12,04,000",
            contentType: "number",
          },
          {
            columnIndex: 7,
            className: "cell",
            content: (
              <DsStateChange
                className={styles.statusIndicator}
                type="system_default"
                id="state2"
                status="Cancelled"
                label="cancelled"
              />
            ),
            contentType: "reactNode",
          },
        ],
      },
      {
        rowIndex: 3,
        className: "row",
        content: [
          {
            columnIndex: 0,
            className: "cell",
            content: 20240199900004,
            contentType: "number",
          },
          {
            columnIndex: 1,
            className: "cell",
            content: "24/09/2024",
            contentType: "date",
          },
          {
            columnIndex: 2,
            className: "cell",
            content: "OP65",
            contentType: "string",
          },
          {
            columnIndex: 3,
            className: "cell",
            content: "Mediwell Diagnostics",
            contentType: "string",
          },
          {
            columnIndex: 4,
            className: "cell",
            content: 3400,
            contentType: "number",
          },
          {
            columnIndex: 5,
            className: "cell",
            content: "11,00,000",
            contentType: "string",
          },
          {
            columnIndex: 6,
            className: "cell",
            content: "11,03,000",
            contentType: "number",
          },
          {
            columnIndex: 7,
            className: "cell",
            content: (
              <DsStateChange
                className={styles.statusIndicator}
                type="user_defined"
                id="state2"
                status="Cancelled"
                label="Rejected"
                status_icon={<Image src={commentIcon} alt="icon" />}
                comment="Reason of Rejection"
              />
            ),
            contentType: "reactNode",
          },
        ],
      },
      {
        rowIndex: 4,
        className: "row",
        content: [
          {
            columnIndex: 0,
            className: "cell",
            content: 20240199900007,
            contentType: "number",
          },
          {
            columnIndex: 1,
            className: "cell",
            content: "24/09/2024",
            contentType: "date",
          },
          {
            columnIndex: 2,
            className: "cell",
            content: "HB08",
            contentType: "string",
          },
          {
            columnIndex: 3,
            className: "cell",
            content: "Vikram Medical Agency",
            contentType: "string",
          },
          {
            columnIndex: 4,
            className: "cell",
            content: 500,
            contentType: "number",
          },
          {
            columnIndex: 5,
            className: "cell",
            content: "10,000",
            contentType: "string",
          },
          {
            columnIndex: 6,
            className: "cell",
            content: "25,200",
            contentType: "number",
          },

          {
            columnIndex: 7,
            className: "cell",
            content: (
              <DsStateChange
                className={styles.statusIndicator}
                id="state3"
                type="system_default"
                status="Pending"
                label="pending"
              />
            ),
            contentType: "reactNode",
          },
        ],
      },
      {
        rowIndex: 5,
        className: "row",
        content: [
          {
            columnIndex: 0,
            className: "cell",
            content: 20240199900006,
            contentType: "number",
          },
          {
            columnIndex: 1,
            className: "cell",
            content: "24/09/2024",
            contentType: "date",
          },
          {
            columnIndex: 2,
            className: "cell",
            content: "MN04",
            contentType: "string",
          },
          {
            columnIndex: 3,
            className: "cell",
            content: "Sree Mookambika Agency",
            contentType: "string",
          },
          {
            columnIndex: 4,
            className: "cell",
            content: 4000,
            contentType: "number",
          },
          {
            columnIndex: 5,
            className: "cell",
            content: "1,00,900",
            contentType: "string",
          },
          {
            columnIndex: 6,
            className: "cell",
            content: "3,900",
            contentType: "number",
          },
          {
            columnIndex: 7,
            className: "cell",
            content: (
              <DsStateChange
                className={styles.statusIndicator}
                type="system_default"
                id="state4"
                status="Submitted"
                label="submitted"
              />
            ),
            contentType: "reactNode",
          },
        ],
      },
      {
        rowIndex: 6,
        className: "row",
        content: [
          {
            columnIndex: 0,
            className: "cell",
            content: 20220199900007,
            contentType: "number",
          },
          {
            columnIndex: 1,
            className: "cell",
            content: "24/09/2024",
            contentType: "date",
          },
          {
            columnIndex: 2,
            className: "cell",
            content: "GH67",
            contentType: "string",
          },
          {
            columnIndex: 3,
            className: "cell",
            content: "Bharat Serums Ltd.",
            contentType: "string",
          },
          {
            columnIndex: 4,
            className: "cell",
            content: 8000,
            contentType: "number",
          },
          {
            columnIndex: 5,
            className: "cell",
            content: "12,00,000",
            contentType: "string",
          },
          {
            columnIndex: 6,
            className: "cell",
            content: "12,04,000",
            contentType: "number",
          },
          {
            columnIndex: 7,
            className: "cell",
            content: (
              <DsStateChange
                className={styles.statusIndicator}
                type="system_default"
                id="state4"
                status="Submitted"
                label="Open"
                btn_label="Partial qty awail"
              />
            ),
            contentType: "reactNode",
          },
        ],
      },
      {
        rowIndex: 7,
        className: "row",
        content: [
          {
            columnIndex: 0,
            className: "cell",
            content: 20240199900008,
            contentType: "number",
          },
          {
            columnIndex: 1,
            className: "cell",
            content: "24/09/2024",
            contentType: "date",
          },
          {
            columnIndex: 2,
            className: "cell",
            content: "TR65",
            contentType: "string",
          },
          {
            columnIndex: 3,
            className: "cell",
            content: "Sulekha Healthcare",
            contentType: "string",
          },
          {
            columnIndex: 4,
            className: "cell",
            content: 3400,
            contentType: "number",
          },
          {
            columnIndex: 5,
            className: "cell",
            content: "11,00,000",
            contentType: "string",
          },
          {
            columnIndex: 6,
            className: "cell",
            content: "11,03,000",
            contentType: "number",
          },
          {
            columnIndex: 7,
            className: "cell",
            content: (
              <DsStateChange
                className={styles.statusIndicator}
                type="system_default"
                id="state4"
                status="Submitted"
                label="Open"
                btn_label="Quantity unavailable"
              />
            ),
            contentType: "reactNode",
          },
        ],
      },
      {
        rowIndex: 8,
        className: "row",
        content: [
          {
            columnIndex: 0,
            className: "cell",
            content: 20240199900009,
            contentType: "number",
          },
          {
            columnIndex: 1,
            className: "cell",
            content: "24/09/2024",
            contentType: "date",
          },
          {
            columnIndex: 2,
            className: "cell",
            content: "PU78",
            contentType: "string",
          },
          {
            columnIndex: 3,
            className: "cell",
            content: "Lupin Limited",
            contentType: "string",
          },
          {
            columnIndex: 4,
            className: "cell",
            content: 2340,
            contentType: "number",
          },
          {
            columnIndex: 5,
            className: "cell",
            content: "22,000",
            contentType: "string",
          },
          {
            columnIndex: 6,
            className: "cell",
            content: "22,06,000",
            contentType: "number",
          },
          {
            columnIndex: 7,
            className: "cell",
            content: (
              <DsStateChange
                className={styles.statusIndicator}
                type="system_default"
                id="state5"
                status="underApproval"
                label="under approvel"
              />
            ),
            contentType: "reactNode",
          },
        ],
      },
      {
        rowIndex: 9,
        className: "row",
        content: [
          {
            columnIndex: 0,
            className: "cell",
            content: 20240199900010,
            contentType: "number",
          },
          {
            columnIndex: 1,
            className: "cell",
            content: "24/09/2024",
            contentType: "date",
          },
          {
            columnIndex: 2,
            className: "cell",
            content: "UT60",
            contentType: "string",
          },
          {
            columnIndex: 3,
            className: "cell",
            content: "Lupin Limited",
            contentType: "string",
          },
          {
            columnIndex: 4,
            className: "cell",
            content: 8756,
            contentType: "number",
          },
          {
            columnIndex: 5,
            className: "cell",
            content: "12,90,900",
            contentType: "string",
          },
          {
            columnIndex: 6,
            className: "cell",
            content: "12,99,900",
            contentType: "number",
          },
          {
            columnIndex: 7,
            className: "cell",
            content: (
              <DsStateChange
                className={styles.statusIndicator}
                type="system_default"
                id="state6"
                status="underReview"
                label="under review"
              />
            ),
            contentType: "reactNode",
          },
        ],
      },
      {
        rowIndex: 10,
        className: "row",
        content: [
          {
            columnIndex: 0,
            className: "cell",
            content: 20240199900011,
            contentType: "number",
          },
          {
            columnIndex: 1,
            className: "cell",
            content: "24/09/2024",
            contentType: "date",
          },
          {
            columnIndex: 2,
            className: "cell",
            content: "AB43",
            contentType: "string",
          },
          {
            columnIndex: 3,
            className: "cell",
            content: "Lupin Limited",
            contentType: "string",
          },
          {
            columnIndex: 4,
            className: "cell",
            content: 1100,
            contentType: "number",
          },
          {
            columnIndex: 5,
            className: "cell",
            content: "11,09,000",
            contentType: "string",
          },
          {
            columnIndex: 6,
            className: "cell",
            content: "11,11,000",
            contentType: "number",
          },
          {
            columnIndex: 7,
            className: "cell",
            content: (
              <DsStateChange
                className={styles.statusIndicator}
                type="system_default"
                id="state7"
                status="InProcess"
                label="In Process"
              />
            ),
            contentType: "reactNode",
          },
        ],
      },
      {
        rowIndex: 11,
        className: "row",
        content: [
          {
            columnIndex: 0,
            className: "cell",
            content: 20240199900012,
            contentType: "number",
          },
          {
            columnIndex: 1,
            className: "cell",
            content: "24/09/2024",
            contentType: "date",
          },
          {
            columnIndex: 2,
            className: "cell",
            content: "SF45",
            contentType: "string",
          },
          {
            columnIndex: 3,
            className: "cell",
            content: "Lupin Limited",
            contentType: "string",
          },
          {
            columnIndex: 4,
            className: "cell",
            content: 12341,
            contentType: "number",
          },
          {
            columnIndex: 5,
            className: "cell",
            content: "10,02,000",
            contentType: "string",
          },
          {
            columnIndex: 6,
            className: "cell",
            content: "10,22,000",
            contentType: "number",
          },
          {
            columnIndex: 7,
            className: "cell",
            content: (
              <DsStateChange
                className={styles.statusIndicator}
                type="user_defined"
                id="state1"
                status="Approved"
                label="approved"
                status_icon={<Image src={commentIcon} alt="icon" />}
                comment="Justification and Comments"
              />
            ),
            contentType: "reactNode",
          },
        ],
      },
      {
        rowIndex: 12,
        className: "row",
        content: [
          {
            columnIndex: 0,
            className: "cell",
            content: 20240199900013,
            contentType: "number",
          },
          {
            columnIndex: 1,
            className: "cell",
            content: "24/09/2024",
            contentType: "date",
          },
          {
            columnIndex: 2,
            className: "cell",
            content: "GR65",
            contentType: "string",
          },
          {
            columnIndex: 3,
            className: "cell",
            content: "Lupin Limited",
            contentType: "string",
          },
          {
            columnIndex: 4,
            className: "cell",
            content: 2000,
            contentType: "number",
          },
          {
            columnIndex: 5,
            className: "cell",
            content: "20,03,000",
            contentType: "string",
          },
          {
            columnIndex: 6,
            className: "cell",
            content: "20,08,000",
            contentType: "number",
          },
          {
            columnIndex: 7,
            className: "cell",
            content: (
              <DsStateChange
                className={styles.statusIndicator}
                type="user_defined"
                id="state1"
                status="Approved"
                label="approved"
                status_icon={<Image src={commentIcon} alt="icon" />}
                comment="Justification and Comments"
              />
            ),
            contentType: "reactNode",
          },
        ],
      },
      {
        rowIndex: 13,
        className: "row",
        content: [
          {
            columnIndex: 0,
            className: "cell",
            content: 20240199900014,
            contentType: "number",
          },
          {
            columnIndex: 1,
            className: "cell",
            content: "24/09/2024",
            contentType: "date",
          },
          {
            columnIndex: 2,
            className: "cell",
            content: "MX09",
            contentType: "string",
          },
          {
            columnIndex: 3,
            className: "cell",
            content: "Pharma XYZ",
            contentType: "string",
          },
          {
            columnIndex: 4,
            className: "cell",
            content: 500,
            contentType: "number",
          },
          {
            columnIndex: 5,
            className: "cell",
            content: "15,05,000",
            contentType: "string",
          },
          {
            columnIndex: 6,
            className: "cell",
            content: "15,08,000",
            contentType: "number",
          },
          {
            columnIndex: 7,
            className: "cell",
            content: (
              <DsStateChange
                className={styles.statusIndicator}
                type="user_defined"
                id="state1"
                status="Approved"
                label="approved"
                status_icon={<Image src={commentIcon} alt="icon" />}
                comment="Justification and Comments"
              />
            ),
            contentType: "reactNode",
          },
        ],
      },
      {
        rowIndex: 14,
        className: "row",
        content: [
          {
            columnIndex: 0,
            className: "cell",
            content: 20240199900015,
            contentType: "number",
          },
          {
            columnIndex: 1,
            className: "cell",
            content: "24/09/2024",
            contentType: "date",
          },
          {
            columnIndex: 2,
            className: "cell",
            content: "MX09",
            contentType: "string",
          },
          {
            columnIndex: 3,
            className: "cell",
            content: "Medicare Pharma Ltd.",
            contentType: "string",
          },
          {
            columnIndex: 4,
            className: "cell",
            content: 500,
            contentType: "number",
          },
          {
            columnIndex: 5,
            className: "cell",
            content: "15,05,000",
            contentType: "string",
          },
          {
            columnIndex: 6,
            className: "cell",
            content: "15,08,000",
            contentType: "number",
          },
          {
            columnIndex: 7,
            className: "cell",
            content: (
              <DsStateChange
                className={styles.statusIndicator}
                type="user_defined"
                id="state1"
                status="Approved"
                label="approved"
                status_icon={<Image src={commentIcon} alt="icon" />}
                comment="Justification and Comments"
              />
            ),
            contentType: "reactNode",
          },
        ],
      },
    ],
  };

  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [pos, setPos] = useState<
    | "top"
    | "topleft"
    | "topright"
    | "middle"
    | "bottom"
    | "bottomleft"
    | "bottomright"
  >("bottom");
  const [notiType, setNotiType] = useState<
    "success" | "bonus" | "info" | "error"
  >("info");
  return (
    <>
      <Application
        appTitle="Sales Order"
        appMenu={
          <div className={styles.container}>
            <PopupOpenButton
              id="actionBtn"
              buttonClass={buttonStyles.action_btn}
              popupId="test"
              // handleOnClick={handleActionClick}
              // handleOnHover={handleMouseHover}
              buttonText="Popup"
            />
          </div>
        }
      >
        <div className={styles.fluidContainer}>
          <DsPane
            id="PaneInset"
            title="Toaster"
            type="inset"
            side={PaneStyles.left}
          >
            <DemoLayout title={"Toaster (DsToaster)"}>
              <div className={styles.btn}>
                <DSButton
                  id="actionBtn"
                  className={styles.action_btn}
                  handleOnClick={() => {
                    setShowNotification(true);
                    setPos("top");
                    setNotiType("info");
                  }}
                  // handleOnClick={handleActionClick}
                  // handleOnHover={handleMouseHover}
                  // beforeIcon={<Image className="add" src={addIcon} alt="Add Icon" />}
                  label="info-top"
                />

                <DSButton
                  id="actionBtn"
                  className={styles.action_btn}
                  handleOnClick={() => {
                    setShowNotification(true);
                    setPos("bottom");
                    setNotiType("info");
                  }}
                  // handleOnClick={handleActionClick}
                  // handleOnHover={handleMouseHover}
                  // beforeIcon={<Image className="add" src={addIcon} alt="Add Icon" />}
                  label="info-bottom"
                />
                <DSButton
                  id="actionBtn"
                  className={styles.action_btn}
                  handleOnClick={() => {
                    setShowNotification(true);
                    setPos("middle");
                    setNotiType("bonus");
                  }}
                  // handleOnClick={handleActionClick}
                  // handleOnHover={handleMouseHover}
                  // beforeIcon={<Image className="add" src={addIcon} alt="Add Icon" />}
                  label="bonuns-middle"
                />

                <DSButton
                  id="actionBtn"
                  className={styles.action_btn}
                  handleOnClick={() => {
                    setShowNotification(true);
                    setPos("bottomleft");
                    setNotiType("bonus");
                  }}
                  // handleOnClick={handleActionClick}
                  // handleOnHover={handleMouseHover}
                  // beforeIcon={<Image className="add" src={addIcon} alt="Add Icon" />}
                  label="bonus-bottomleft"
                />
                <DSButton
                  id="actionBtn"
                  className={styles.action_btn}
                  handleOnClick={() => {
                    setShowNotification(true);
                    setPos("bottomright");
                    setNotiType("success");
                  }}
                  // handleOnClick={handleActionClick}
                  // handleOnHover={handleMouseHover}
                  // beforeIcon={<Image className="add" src={addIcon} alt="Add Icon" />}
                  label="success-bottomright"
                />

                <DSButton
                  id="actionBtn"
                  className={styles.action_btn}
                  handleOnClick={() => {
                    setShowNotification(true);
                    setPos("topright");
                    setNotiType("success");
                  }}
                  // handleOnClick={handleActionClick}
                  // handleOnHover={handleMouseHover}
                  // beforeIcon={<Image className="add" src={addIcon} alt="Add Icon" />}
                  label="success-topright"
                />
                <DSButton
                  id="actionBtn"
                  className={styles.action_btn}
                  handleOnClick={() => {
                    setShowNotification(true);
                    setPos("topleft");
                    setNotiType("error");
                  }}
                  // handleOnClick={handleActionClick}
                  // handleOnHover={handleMouseHover}
                  // beforeIcon={<Image className="add" src={addIcon} alt="Add Icon" />}
                  label="error-topleft"
                />
              </div>
            </DemoLayout>
          </DsPane>
          <div className={styles.container + " " + styles["flex-column"]}>
            <TabContainer
              selectedTabId={"1"}
              tabs={[
                { tabId: "1", tabName: "Button" },
                { tabId: "2", tabName: "Context" },
                { tabId: "3", tabName: "Panel" },
                { tabId: "4", tabName: "Dropdown" },
                { tabId: "5", tabName: "Text Field" },
                { tabId: "6", tabName: "Deviation" },
                { tabId: "7", tabName: "User Profile" },
                { tabId: "8", tabName: "Summary Count" },
                { tabId: "9", tabName: "Table" },
              ]}
            >
              <TabView tabId={"1"}>
                <DemoButtons />
              </TabView>
              <TabView tabId={"2"}>
                <DemoContext></DemoContext>
              </TabView>
              <TabView tabId={"3"}>
                <DemoPane></DemoPane>
              </TabView>
              <TabView tabId={"4"}>
                <DemoSelect></DemoSelect>
              </TabView>
              <TabView tabId={"5"}>
                <DemoTextField />
              </TabView>
              <TabView tabId={"6"}>
                <DemoDeviation></DemoDeviation>
              </TabView>
              <TabView tabId={"7"}>
                <DemoUserProfile></DemoUserProfile>
              </TabView>
              <TabView tabId="8">
                <DemoSummaryCount></DemoSummaryCount>
              </TabView>

              <TabView tabId={"9"}>
                <DsTableComponent
                  className={tempTableData.className}
                  id={tempTableData.id}
                  columns={tempTableData.columns}
                  rows={tempTableData.rows}
                ></DsTableComponent>
              </TabView>
            </TabContainer>
          </div>
        </div>
      </Application>
      <DsPopup
        id={"test"}
        /*position="center" type="document"*/ title={"Popup"}
      >
        <div className={buttonStyles.btn}>
          <DSButton
            id="actionBtn"
            className={buttonStyles.action_btn}
            // handleOnHover={handleMouseHover}
            // startIcon={<Image className="add" src={addIcon} alt="Add Icon" />}
            label="New"
          />
        </div>
      </DsPopup>
      <DsPane id="PaneRight" side={"right"} title="Status">
        <DsDemoStatusIndocator></DsDemoStatusIndocator>
      </DsPane>
      {showNotification && (
        <Toaster
          handleClose={() => setShowNotification(false)}
          type={notiType}
          message={`This is simple ${notiType} msg.!`}
          position={pos}
          duration={3000}
        />
      )}
      {/* <PopUpContext id={contextMenuId} content={comment} containerId={""} /> */}
    </>
  );
}
