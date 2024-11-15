"use client";
// import Demo from "@/app/Elements/ElProComponents/Demo/demo";
// import NavTo from "@/app/Elements/ElProComponents/NavigationComponent/navTo";

// export default function Home() {
//   return (
//     <>
//       <NavTo location="Order/New">New</NavTo>
//       <NavTo location="Order/Bill">Bill</NavTo>
//       <NavTo location="Order/Cancelation">Cancelation</NavTo>
//       <Demo></Demo>
//     </>
//   );
// }

import DSButton from "@/app/Elements/Components/dsButton/dsButton";
// import DSButtonGroup from "@/app/Elements/Components/dsButton/dsButtonGroup";
import React, { useState } from "react";
import DataList from "@/app/Elements/Components/dsDatalist/dsDatalist";
import Application from "@/app/Elements/ElProComponents/ApplicationComponents/Application";
import btnStyles from "@/app/Elements/Components/dsButton/dsButton.module.css";
import addIcon from "@/app/Elements/Icons/smallIcons/add.svg";
import filter from "@/app/Elements/Icons/smallIcons/filtericon.svg";
import whiteadd from "@/app/Elements/Icons/smallIcons/whiteadd.svg";
import commentIcon from "@/app/Elements/Icons/smallIcons/commenticon.svg";
import Image from "next/image";
import DsStateChange from "@/app/Elements/Components/DsStatusIndicator/dsStatusIndicator";
import DsTableComponent from "@/app/Elements/Components/DsTablecomponent/DsTableComponent";
// import styles from "@/app/Elements/Components/DsStatusIndicator/dsstatusIndicator.module.css";
import styles from "./page.module.css";
import NavTo from "./Elements/ElProComponents/NavigationComponent/navTo";
import TabView from "./Elements/Components/dsTabs/TabView";
export default function Home() {
  const [iconSrc, setIconSrc] = useState(addIcon);
  const tempTableData = {
    className: "sample-table",
    id: "table-1",
    alignment: "left",
    sortable: true,
    searchAvailable: false,
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
          // {
          //   columnIndex: 0,
          //   className: "cell",
          //   content: 20240199900003,
          //   contentType: "number",
          // },
          // {
          //   columnIndex: 1,
          //   className: "cell",
          //   content: "24/09/2024",
          //   contentType: "date",
          // },
          // {
          //   columnIndex: 2,
          //   className: "cell",
          //   content: "HJ65",
          //   contentType: "string",
          // },
          // {
          //   columnIndex: 3,
          //   className: "cell",
          //   content: "Hetero Drugs Ltd.",
          //   contentType: "string",
          // },
          {
            columnIndex: 4,
            className: "cell",
            content: 8000,
            contentType: "number",
            colSpan: 8,
          },
          // {
          //   columnIndex: 5,
          //   className: "cell",
          //   content: "12,00,000",
          //   contentType: "string",
          // },
          // {
          //   columnIndex: 6,
          //   className: "cell",
          //   content: "12,04,000",
          //   contentType: "number",
          // },
          // {
          //
          //   className: "cell",
          //   content: (
          //     <DsStateChange
          //       className={styles.statusIndicator}
          //       type="system_default"
          //       id="state2"
          //       status="Cancelled"
          //       label="cancelled"
          //     />
          //   ),
          //   contentType: "reactNode",
          // },
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
  const clickHandler = (e: React.MouseEvent<HTMLElement>) => {
    console.log((e.target as HTMLElement).tagName);
  };

  const changeImage = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    imgSrc: string
  ) => {
    setIconSrc(imgSrc);
  };

  return (
    <Application
      appTitle="Sales Order"
      appMenu={
        <>
          <DataList
            placeholder="Search"
            label="label"
            inputId="userSelect"
            dataListId="user-list"
            disable={false}
            options={[
              { attributes: { key: "key1" }, id: "emp1", value: "emp1" },
              { attributes: { key: "key2" }, id: "emp2", value: "emp2" },
              { attributes: { key: "key3" }, id: "emp3", value: "emp3" },
              { attributes: { key: "key4" }, id: "emp4", value: "emp4" },
              { attributes: { key: "key5" }, id: "emp5", value: "emp5" },
            ]}
            className={""}
          />
          <DSButton
            id="filterBtn1"
            type="round"
            buttonColor="btnPrimary"
            className={btnStyles.btnOutlined}
            tooltip="variants : btnPrimary, btnOutlined, btnMedium"
            label="Approved"
          />
          <DSButton
            id="filterBtn2"
            type="round"
            buttonColor="btnPrimary"
            className={btnStyles.btnOutlined}
            tooltip="variants : btnPrimary, btnOutlined, btnMedium"
            label="Dispatch"
          />
          <DSButton
            id="iconfilterBtn"
            buttonColor="btnPrimary"
            buttonViewStyle="btnText"
            className={btnStyles.btnTextPrimary}
            handleOnClick={clickHandler}
            startIcon={<Image src={filter} alt="Filter icon" />}
            tooltip="variants : btnPrimary, btnText, btnMedium"
            label="Filter"
          />
          <NavTo
            id="actionBtn"
            buttonColor="btnPrimary"
            className={btnStyles.btnOutlined}
            handleOnHover={(e) => changeImage(e, whiteadd)}
            handleMouseLeave={(e) => changeImage(e, addIcon)}
            startIcon={<Image src={iconSrc} alt="Add icon" />}
            tooltip="variants : btnPrimary, btnOutlined, btnMedium"
            label="New"
            handleOnClick={(e) => clickHandler(e)}
            location="/Order/New"
          />
        </>
      }
      tabs={[
        { tabId: "0", tabName: "Total" },
        { tabId: "1", tabName: "Institutional" },
        { tabId: "2", tabName: "Corporate" },
        { tabId: "3", tabName: "New" }
      ]}
      selectedTabId="0"
      isDataTable={true}
    >
      <div className={styles.container + " " + styles["flex-column"]}>
 
        {/* <div>
 
          <DSButtonGroup id="btngroup1" className={btnStyles.btngroup}>
            <DSButton
              id="button1"
              type="count"
              buttonViewStyle="btnText"
              className={`${btnStyles.btngroupcontained} ${btnStyles.group_btn}`}
              label="Trade"
              count="25"
              tooltip="variants: btngroupcontained"
            />
            <DSButton
              id="button2"
              type="count"
              buttonViewStyle="btnText"
              className={`${btnStyles.btngroupcontained} ${btnStyles.group_btn}`}
              label="Institutional"
              count="12"
              tooltip="variants: btngroupcontained"
            />
            <DSButton
              id="button3"
              type="count"
              buttonViewStyle="btnText"
              className={`${btnStyles.btngroupcontained} ${btnStyles.group_btn}`}
              label="Corporate"
              count="08"
              tooltip="variants: btngroupcontained"
            />
            <DSButton
              id="button4"
              type="count"
              buttonViewStyle="btnText"
              className={`${btnStyles.btngroupcontained} ${btnStyles.group_btn}`}
              label="New"
              count="00"
              tooltip="variants: btngroupcontained"
            />
          </DSButtonGroup>
        </div> */}
        <TabView tabId="0">
            <div className={styles.container}> <div className={styles.tableContainer}>
 
              <DsTableComponent className={""} id={""} alignment={"lef"} isFooterRequired={false} columns={tempTableData.columns} rows={tempTableData.rows}              
              ></DsTableComponent>
            </div></div>
        </TabView>
        <TabView tabId="1">
            <div className={styles.container}> <div className={styles.tableContainer}>
 
              <DsTableComponent className={""} id={""} alignment={"left"} isFooterRequired={false} columns={tempTableData.columns} rows={tempTableData.rows}            
              ></DsTableComponent>
            </div></div>
        </TabView>
        <TabView tabId="2">
            <div className={styles.container}> <div className={styles.tableContainer}>
 
              <DsTableComponent className={""} id={""} alignment={"left"} isFooterRequired={false} columns={tempTableData.columns} rows={tempTableData.rows}                
              ></DsTableComponent>
            </div></div>
        </TabView>
        <TabView tabId="3">
            <div className={styles.container}> <div className={styles.tableContainer}>
 
              <DsTableComponent className={""} id={""} alignment={"left"} isFooterRequired={false} columns={tempTableData.columns} rows={tempTableData.rows}              
              ></DsTableComponent>
            </div></div>
        </TabView>
      </div>
 
    
      {/* <div className={styles.container + " " + styles["flex-column"]}>
        <div>
          <DSButtonGroup id="btngroup1" className={btnStyles.btngroup}>
            <DSButton
              id="button1"
              type="count"
              buttonViewStyle="btnText"
              className={`${btnStyles.btngroupcontained} ${btnStyles.group_btn}`}
              label="Trade"
              count="25"
              tooltip="variants: btngroupcontained"
            />
            <DSButton
              id="button2"
              type="count"
              buttonViewStyle="btnText"
              className={`${btnStyles.btngroupcontained} ${btnStyles.group_btn}`}
              label="Institutional"
              count="12"
              tooltip="variants: btngroupcontained"
            />
            <DSButton
              id="button3"
              type="count"
              buttonViewStyle="btnText"
              className={`${btnStyles.btngroupcontained} ${btnStyles.group_btn}`}
              label="Corporate"
              count="08"
              tooltip="variants: btngroupcontained"
            />
            <DSButton
              id="button4"
              type="count"
              buttonViewStyle="btnText"
              className={`${btnStyles.btngroupcontained} ${btnStyles.group_btn}`}
              label="New"
              count="00"
              tooltip="variants: btngroupcontained"
            />
          </DSButtonGroup>
        </div>
        <div className={styles.tableContainer}>
          <DsTableComponent
            className={tempTableData.className}
            id={tempTableData.id}
            alignment={tempTableData.alignment.toString()}
            hasSearch={tempTableData.searchAvailable}
            columns={tempTableData.columns}
            rows={tempTableData.rows}
            isFooterRequired={false}
          ></DsTableComponent>
        </div>
      </div> */}
    </Application>
  );
}
