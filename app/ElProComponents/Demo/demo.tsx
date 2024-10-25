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
import Image from "next/image";
import addIcon from "../../Icons/add.svg";
// import Image from "next/image";
import TextField from "../../Components/DsTextField/DsTextField";
import DsPane from "../../Components/dsPane/dsPane";
import Application from "../../ElProComponents/ApplicationComponents/Application";
import DsPopup from "../../Components/dsPopup/dsPopup";
import PopupOpenButton from "../../Components/dsPopup/popupOpenButton";
// import ButtonLibrary from "./Components/dsButton/DS_ButtonLibrary";
import DemoButtons from "../../Components/dsButton/dsDemoButtons";

// import SaveButton from "./Components/DsButton/Ds_SaveBtn";
import DsTableComponent from "../../Components/DsTablecomponent/DsTableComponent";
import DemoSelect from "@/app/Components/dsSelect/dsDemoSelect";
import DemoContext from "@/app/Components/dscontext/dsDemoContext";
import DemoPane from "@/app/Components/dsPane/dsDemoPane";
import DemoTextField from "@/app/Components/DsTextField/dsDemoTextField";
import DemoLayout from "./demoLayout";
import DemoDeviation from "@/app/Components/DsDeviations/demoDeviation";
import DemoUserProfile from "@/app/Components/DsUserProfile/demoUserProfile";

export default function Demo() {
  const tempTableData = {
    className: "sample-table",
    id: "table-1",
    columns: [
      {
        columnIndex: 0,
        className: "header-column",
        columnHeader: "ID",
        isHidden: false,
        sort: "ASC",
        columnContentType: "number",
      },
      {
        columnIndex: 1,
        className: "header-column",
        columnHeader: "Name",
        isHidden: false,
        sort: "NONE",
        columnContentType: "string",
      },
      {
        columnIndex: 2,
        className: "header-column",
        columnHeader: "Age",
        isHidden: false,
        sort: "DESC",
        columnContentType: "number",
      },
      {
        columnIndex: 3,
        className: "header-column",
        columnHeader: "Date of birth",
        isHidden: false,
        sort: "NONE",
        columnContentType: "date",
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
            content: "1",
            contentType: "number",
          },
          {
            columnIndex: 1,
            className: "cell",
            content: "John Doe",
            contentType: "string",
          },
          {
            columnIndex: 2,
            className: "cell",
            content: "28",
            contentType: "number",
          },
          {
            columnIndex: 3,
            className: "cell",
            content: "19-12-2022",
            contentType: "date",
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
            content: "2",
            contentType: "number",
          },
          {
            columnIndex: 1,
            className: "cell",
            content: "Jane Smith",
            contentType: "string",
          },
          {
            columnIndex: 2,
            className: "cell",
            content: "34",
            contentType: "number",
          },
          {
            columnIndex: 3,
            className: "cell",
            content: "17-11-2023",
            contentType: "date",
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
            content: "3",
            contentType: "number",
          },
          {
            columnIndex: 1,
            className: "cell",
            content: "Alice Johnson",
            contentType: "string",
          },
          {
            columnIndex: 2,
            className: "cell",
            content: "25",
            contentType: "number",
          },
          {
            columnIndex: 3,
            className: "cell",
            content: "22-08-2024",
            contentType: "date",
          },
        ],
      },
    ],
  };

  // let minValue = 0;
  // let maxValue = 0;

  // const getLowestBiggestValue = (columnIndex: number) => {
  //   tempTableData.rows.map((row) =>
  //     row.content.forEach((cell) => {
  //       if (cell.columnIndex == columnIndex) {
  //         minValue = Number(cell.content);
  //       }
  //     })
  //   );

  //   tempTableData.columns.map((col: tcolumn) => {
  //     tempTableData.rows.map((row) => {
  //       row.content.forEach((cell) => {
  //         if (
  //           col.columnIndex == columnIndex &&
  //           col.columnIndex == row.content[0].columnIndex &&
  //           Number(cell.content) < minValue
  //         ) {
  //           minValue = Number(cell.content);
  //         }
  //         if (
  //           col.columnIndex == columnIndex &&
  //           Number(cell.content) > maxValue
  //         ) {
  //           maxValue = Number(cell.content);
  //         }
  //       });
  //     });
  //   });
  // };

  // getLowestBiggestValue(2);
  // const handleMouseHover = (e) => {
  //   const button = e.target;
  //   if (button) {
  //     const icon = button.querySelector(".add") as HTMLImageElement;
  //     if (icon) {
  //       icon.src = addIconHover;
  //       console.log(addIconHover);
  //     }
  //   }
  // };
  // const handleActionClick = () => {
  //   console.log("Action button clicked");
  // };

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
          <DsPane id="PaneInset" type="inset" side={PaneStyles.left}>
            <TextField
              placeholder="placeholder"
              label="label"
              disable={false}
              // onClick={false}
              type="multiline"
              icon="📋"
              iconEnd="📋"
            />
            <DemoLayout title={"Toaster (DsToaster)"}>
              <div className={styles.btn}>
                <DSButton
                  id="actionBtn"
                  buttonClass={styles.action_btn}
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
                  buttonClass={styles.action_btn}
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
                  buttonClass={styles.action_btn}
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
                  buttonClass={styles.action_btn}
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
                  buttonClass={styles.action_btn}
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
                  buttonClass={styles.action_btn}
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
                  buttonClass={styles.action_btn}
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
            <DemoButtons />
            <DemoContext></DemoContext>
            <DemoPane></DemoPane>
            <DemoSelect></DemoSelect>
            <DemoTextField />
            <DemoDeviation></DemoDeviation>
            <DemoUserProfile></DemoUserProfile>
            <DsTableComponent
              className={tempTableData.className}
              id={tempTableData.id}
              columns={tempTableData.columns}
              rows={tempTableData.rows}
            ></DsTableComponent>
          </div>
        </div>
      </Application>
      <DsPopup
        id={"test"}
        /*position="center" type="document"*/ title={"check"}
      >
        <div className={buttonStyles.btn}>
          <DSButton
            id="actionBtn"
            buttonClass={buttonStyles.action_btn}
            // handleOnHover={handleMouseHover}
            startIcon={<Image className="add" src={addIcon} alt="Add Icon" />}
            label="New"
          />
        </div>
      </DsPopup>
      <DsPane id="PaneRight" side={"right"} title="Filter">
        <div className={buttonStyles.btn}>
          <DSButton
            id="actionBtn"
            buttonClass={buttonStyles.action_btn}
            // handleOnHover={handleMouseHover}
            startIcon={<Image className="add" src={addIcon} alt="Add Icon" />}
            label="New"
          />
        </div>
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
    </>
  );
}
