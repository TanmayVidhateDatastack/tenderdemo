"use client";
import { useState } from "react";
import DSButton from "./Components/dsButton/DsButton";
import styles from "./page.module.css";
import buttonStyles from "./Components/dsButton/dsButton.module.css";
import PaneStyles from "./Components/Dspane/DsPane.module.css";
// import addIcon from "./Icons/add.svg";
// import DSButton from "./Components/DsButton/DsButton";
// import ButtonLibrary from "./Components/dsButton/DS_ButtonLibrary";
import Toaster from "./Components/DsToaster/DsToaster";
// import SaveButton from "./Components/DsButton/Ds_SaveBtn";
import Image from "next/image";
import addIcon from "./Icons/smallIcons/add.svg";
// import Image from "next/image";
import TextField from "./Components/DsTextField/DsTextField";
import DsPane from "./Components/DsPane/DsPane";
import PaneOpenButton from "./Components/DsPane/PaneOpenButton";
import Application from "./ElProComponents/ApplicationComponents/Application";
import DsPopup from "./Components/dsPopup/dsPopup";
import PopupOpenButton from "./Components/dsPopup/popupOpenButton";
// import ButtonLibrary from "./Components/dsButton/DS_ButtonLibrary";
import DemoButtons from "./Components/dsButton/dsDemoButtons";
import DsSelect from "./Components/dsSelect/dsSelect";
import PopUPContext from "./Components/dscontext/dscontext";

// import SaveButton from "./Components/DsButton/Ds_SaveBtn";
import DsTableComponent from "./Components/DsTablecomponent/DsTableComponent";
import DsDemoStatusIndocator from "./Components/DsStatusIndicator/dsDemoStatusIndicator";

export default function Home() {
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
            content: "2014-12-02",
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
            content: "2014-11-02",
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
            content: "2011-10-02",
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
  const options = ["option1", "option2", "option3", "option4", "option5"];

  const [showNotification, setShowNotification] = useState<boolean>(false);

  return (
    <>
      <Application
        appTitle="Sales and Order"
        appMenu={
          <div className={styles.container}>
            <PaneOpenButton
              id="actionBtn"
              buttonClass={buttonStyles.action_btn}
              paneId="PaneInset"
              // handleOnClick={handleActionClick}
              // handleOnHover={handleMouseHover}
              beforeIcon={
                <Image className="add" src={addIcon} alt="Add Icon" />
              }
              buttonText="Inset"
            />
            <PaneOpenButton
              id="actionBtn"
              buttonClass={buttonStyles.action_btn}
              paneId="PaneRight"
              // handleOnClick={handleActionClick}
              // handleOnHover={handleMouseHover}
              beforeIcon={
                <Image className="add" src={addIcon} alt="Add Icon" />
              }
              buttonText="Overlay"
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
            <div className={styles.btn}>
              <DSButton
                id="actionBtn"
                buttonClass={styles.action_btn}
                handleOnClick={() => setShowNotification(true)}
                // handleOnClick={handleActionClick}
                // handleOnHover={handleMouseHover}
                // beforeIcon={<Image className="add" src={addIcon} alt="Add Icon" />}
                label="show notification "
              />

              {showNotification && (
                <Toaster
                  handleClose={() => setShowNotification(false)}
                  type="success"
                  message="this is simple error msg you cant acess this side now .............!"
                  position="bottomright"
                  duration={3000}
                />
              )}
            </div>
          </DsPane>
          <div className={styles.container + " " + styles["flex-column"]}>
            <DsSelect
              options={options}
              placeholder="Click me to select"
              label="multiselect"
            ></DsSelect>
            <PopUPContext />

            <PaneOpenButton
              id="actionBtn"
              buttonClass={buttonStyles.action_btn}
              paneId="PaneInset"
              // handleOnClick={handleActionClick}
              // handleOnHover={handleMouseHover}
              beforeIcon={
                <Image className="add" src={addIcon} alt="Add Icon" />
              }
              buttonText="Inset"
            />
            <PaneOpenButton
              id="actionBtn"
              buttonClass={buttonStyles.action_btn}
              paneId="PaneRight"
              // handleOnClick={handleActionClick}
              // handleOnHover={handleMouseHover}
              beforeIcon={
                <Image className="add" src={addIcon} alt="Add Icon" />
              }
              buttonText="Overlay"
            />
            <PopupOpenButton
              id="actionBtn"
              buttonClass={buttonStyles.action_btn}
              popupId="test"
              // handleOnClick={handleActionClick}
              // handleOnHover={handleMouseHover}
              beforeIcon={
                <Image className="add" src={addIcon} alt="Add Icon" />
              }
              buttonText="Popup"
            />
            <DsTableComponent
              className={tempTableData.className}
              id={tempTableData.id}
              columns={tempTableData.columns}
              rows={tempTableData.rows}
            ></DsTableComponent>

            <DemoButtons />
            <div className={buttonStyles.btn}>
              <DsDemoStatusIndocator />
            </div>
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
      <DsPane id="PaneRight" side={"right"}>
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
    </>
  );
}
