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
import SpotlightSearch from "./Elements/Components/dsSpotlightSearch/dsSpotlightSearch";
import searchIcon from "../app/Elements/Icons/searchicon.svg";
import TextField from "./Elements/Components/DsTextField/DsTextField";
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
        columnHeader: " CUSTOMER NAME",
        isHidden: false,
        sort: "ASC",
        columnContentType: "string",
      },
      {
        columnIndex: 1,
        className: "header-column",
        columnHeader: "SUBMISSION DATE",
        isHidden: false,
        sort: "ASC",
        columnContentType: "date",
      },
      {
        columnIndex: 2,
        className: "header-column",
        columnHeader: "DAYS TO SUBMIT",
        isHidden: false,
        sort: "ASC",
        columnContentType: "string",
      },
      {
        columnIndex: 3,
        className: "header-column",
        columnHeader: "TENDER ID",
        isHidden: false,
        sort: "ASC",
        columnContentType: "string",
      },
      {
        columnIndex: 4,
        className: "header-column",
        columnHeader: "TENDER TYPE",
        isHidden: false,
        sort: "ASC",
        columnContentType: "string",
      },
      {
        columnIndex: 5,
        className: "header-column",
        columnHeader: "DEPOT",
        isHidden: false,
        sort: "ASC",
        columnContentType: "string",
      },
      {
        columnIndex: 6,
        className: "header-column",
        columnHeader: "APPLIED BY",
        isHidden: false,
        sort: "ASC",
        columnContentType: "string",
      },
      {
        columnIndex: 7,
        className: "header-column",
        columnHeader: "SUPPLIED BY",
        isHidden: false,
        sort: "ASC",
        columnContentType: "string",
      },
      {
        columnIndex: 8,
        className: "header-column",
        columnHeader: "PREPARED BY",
        isHidden: false,
        sort: "ASC",
        columnContentType: "string",
      },
      {
        columnIndex: 9,
        className: "header-column",
        columnHeader: "VALUE (₹)",
        isHidden: false,
        sort: "NONE",
        columnContentType: "string",
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
            content: "Directorate of Health Services",
            contentType: "string",
          },
          {
            columnIndex: 1,
            className: "cell",
            content: "28/11/2024",
            contentType: "date",
          },
          {
            columnIndex: 2,
            className: "cell",
            content: "16 days left",
            contentType: "string",
            textColor: "#CC8400",
          },
          {
            columnIndex: 3,
            className: "cell",
            content: "...00001",
            contentType: "string",
          },
          {
            columnIndex: 4,
            className: "cell",
            content: "single-delivery",
            contentType: "number",
          },
          {
            columnIndex: 5,
            className: "cell",
            content: "Pune",
            contentType: "string",
          },
          {
            columnIndex: 6,
            className: "cell",
            content: "IPCA",
            contentType: "number",
          },
          {
            columnIndex: 7,
            className: "cell",
            content: "spare-India",
            contentType: "string",
          },
          {
            columnIndex: 8,
            className: "cell",
            content: "Rajat Sharma",
            contentType: "string",
          },
          {
            columnIndex: 9,
            className: "cell",
            content: "1,30,65,999",
            contentType: "string",
          },
          {
            className: "cell",
            content: (
              <DsStateChange
                className={styles.statusIndicator}
                type="system_default"
                id="state1"
                status="DRAFT"
                label="Draft"
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
            content: "Joint Director (M...",
            contentType: "string",
          },
          {
            columnIndex: 1,
            className: "cell",
            content: "30/11/2024",
            contentType: "date",
          },
          {
            columnIndex: 2,
            className: "cell",
            content: "18 days left",
            contentType: "string",
            textColor: "#CC8400",
          },
          {
            columnIndex: 3,
            className: "cell",
            content: "...00002",
            contentType: "string",
          },
          {
            columnIndex: 4,
            className: "cell",
            content: "Multi-delivery",
            contentType: "number",
          },
          {
            columnIndex: 5,
            className: "cell",
            content: "Ahmedabad",
            contentType: "string",
          },
          {
            columnIndex: 6,
            className: "cell",
            content: "IPCA",
            contentType: "number",
          },
          {
            columnIndex: 7,
            className: "cell",
            content: "VR chemicals",
            contentType: "string",
          },
          {
            columnIndex: 8,
            className: "cell",
            content: "Rajesh Dhan",
            contentType: "string",
          },
          {
            columnIndex: 9,
            className: "cell",
            content: "2,20,65,900",
            contentType: "string",
          },
          {
            className: "cell",
            content: (
              <DsStateChange
                className={styles.statusIndicator}
                type="system_default"
                id="state1"
                status="DRAFT"
                label="Draft"
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
            content: "J.K.M.S.C.L",
            contentType: "string",
          },
          {
            columnIndex: 1,
            className: "cell",
            content: "13/10/2024",
            contentType: "date",
          },
          {
            columnIndex: 2,
            className: "cell",
            content: "0 days left",
            contentType: "string",
          },
          {
            columnIndex: 3,
            className: "cell",
            content: "...00003",
            contentType: "string",
          },
          {
            columnIndex: 4,
            className: "cell",
            content: "Multi-delivery",
            contentType: "number",
          },
          {
            columnIndex: 5,
            className: "cell",
            content: "Siliguri Depot",
            contentType: "string",
          },
          {
            columnIndex: 6,
            className: "cell",
            content: "Flarer S.A.",
            contentType: "number",
          },
          {
            columnIndex: 7,
            className: "cell",
            content: "VR chemicals",
            contentType: "string",
          },
          {
            columnIndex: 8,
            className: "cell",
            content: "Kapil Kalkar",
            contentType: "string",
          },
          {
            columnIndex: 9,
            className: "cell",
            content: "3,40,56,798",
            contentType: "string",
          },
          {
            className: "cell",
            content: (
              <DsStateChange
                className={styles.statusIndicator}
                type="system_default"
                id="state1"
                status="Awarded"
                label="Awarded"
                // status_icon={<Image src={commentIcon} alt="icon" />}
                // comment="Justification and Comments"
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

  const data: string[] = [
    "Document",
    "Spreadsheet",
    "Presentation",
    "Report",
    "Meeting Notes",
  ];

  const totalTenders = "13";
  const totalValues = "40,63,71,58";
  return (
    <Application
      appTitle="Tender"
      appMenu={
        <>
          <TextField
            placeholder="Search Tender by Id, Name and Value"
            id="userSelect"
            dataListId="user-list"
            showshadow="shadow"
            disable={false}
            className={styles.datalist}
            iconEnd={<Image src={searchIcon} alt="search icon" />}
            options={[
              { attributes: { key: "key1" }, id: "emp1", value: "emp1" },
              { attributes: { key: "key2" }, id: "emp2", value: "emp2" },
              { attributes: { key: "key3" }, id: "emp3", value: "emp3" },
              { attributes: { key: "key4" }, id: "emp4", value: "emp4" },
              { attributes: { key: "key5" }, id: "emp5", value: "emp5" },
            ]}
          ></TextField>
          <DSButton
            id="filterBtn1"
            type="round"
            buttonColor="btnPrimary"
            className={btnStyles.btnOutlined}
            tooltip="variants : btnPrimary, btnOutlined, btnMedium"
            label="Near Submission"
          />
          <DSButton
            id="filterBtn1"
            type="round"
            buttonColor="btnPrimary"
            className={btnStyles.btnOutlined}
            tooltip="variants : btnPrimary, btnOutlined, btnMedium"
            label="Fees Pending"
          />
          <DSButton
            id="filterBtn2"
            type="round"
            buttonColor="btnPrimary"
            className={btnStyles.btnOutlined}
            tooltip="variants : btnPrimary, btnOutlined, btnMedium"
            label="Approval"
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
          <NavTo
            id="actionBtn"
            buttonColor="btnPrimary"
            className={btnStyles.btnOutlined}
            handleOnHover={(e) => changeImage(e, whiteadd)}
            handleMouseLeave={(e) => changeImage(e, addIcon)}
            startIcon={<Image src={iconSrc} alt="Add icon" />}
            tooltip="variants : btnPrimary, btnOutlined, btnMedium"
            label="Tender New"
            handleOnClick={(e) => clickHandler(e)}
            location="/Tender/New"
          />
        </>
      }
    >
      <div className={styles.container + " " + styles["flex-column"]}>
        <div className={styles.tenderHeader}>
          Total Tenders : {totalTenders} Total Values: {totalValues}
        </div>
        <div className={styles.container}>
          {" "}
          <div className={styles.tableContainer}>
            <DsTableComponent
              className={styles.table}
              id={""}
              alignment={"left"}
              isFooterRequired={true}
              columns={tempTableData.columns}
              rows={tempTableData.rows}
            ></DsTableComponent>
          </div>
        </div>
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
