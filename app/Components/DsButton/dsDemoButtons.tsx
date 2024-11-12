"use client";
import Image from "next/image";
// import { useRef, useState } from "react";
import { ImgProps } from "next/dist/shared/lib/get-img-props";
import DSButton from "./DsButton";
import btnStyles from "./dsButton.module.css";
import addIcon from "../../Icons/smallIcons/add.svg";
import filter from "../../Icons/smallIcons/filtericon.svg";
import trashbtn from "../../Icons/smallIcons/trashbtn.svg";
import whitetrashbtn from "../../Icons/smallIcons/whitetrash.svg";
import deviation from "../../Icons/mediumIcons/deviation.svg";
import update from "../../Icons/smallIcons/update.svg";
import whiteupdate from "../../Icons/smallIcons/whiteupdate.svg";
import whiteadd from "../../Icons/smallIcons/whiteadd.svg";
import spliticon from "../../Icons/mediumIcons/downarrowwhite.svg";
import notificationicon from "../../Icons/mediumIcons/notificationbell.svg";
import chat from "../../Icons/mediumIcons/chat.svg";
import leftarrow from "../../Icons/mediumIcons/grayleftarrow.svg";
import darkleftarrow from "../../Icons/mediumIcons/darkleftarrow.svg";
import upload from "../../Icons/smallIcons/uploadicon.svg";
import { useState } from "react";
import DemoLayout from "@/app/ElProComponents/Demo/demoLayout";
import DSButtonGroup from "./dsButtonGroup";

const DemoButtons: React.FC = () => {
  const [toggled, setToggled] = useState(false);
  const clickHandler = (e: React.MouseEvent<HTMLElement>) => {
    console.log((e.target as HTMLElement).tagName);
  };
  const changeImage = (e: React.MouseEvent<HTMLElement>, imgSrc: ImgProps) => {
    console.log(imgSrc);
    const icon = (e.target as HTMLElement).querySelector(
      ".icon > img"
    ) as HTMLImageElement;
    if (icon) {
      icon.src = imgSrc.src;
    }
  };

  return (
    <DemoLayout title="Button (DsButton)">
      <div className={btnStyles.btn_div + " " + btnStyles.flex}>
        <DSButton
          id="actionBtn"
          buttonColor="btnPrimary"
          buttonViewStyle="btnOutlined"
          // className={btnStyles.btnOutlined}
          handleOnHover={(e) => changeImage(e, whiteadd)}
          handleMouseLeave={(e) => changeImage(e, addIcon)}
          startIcon={<Image src={addIcon} alt="icon" />}
          tooltip="variants : btnPrimary, btnOutlined, btnMedium"
          label="New"
          handleOnClick={(e) => clickHandler(e)}
        />
        <DSButton
          id="closeBtn"
          buttonColor="btnDark"
          buttonViewStyle="btnOutlined"
          // className={btnStyles.btnOutlined}
          handleOnClick={(e) => clickHandler(e)}
          tooltip="variants : btnDark, btnOutlined, btnMedium"
          label="Close"
        />
        <DSButton
          id="iconfilterBtn"
          buttonColor="btnPrimary"
          buttonViewStyle="btnText"
          className={btnStyles.btnTextPrimary}
          handleOnClick={(e) => clickHandler(e)}
          startIcon={<Image src={filter} alt="icon" />}
          tooltip="variants : btnPrimary, btnText, btnMedium"
          label="Filter"
        />
        <DSButton
          id="deleteBtn"
          buttonColor="btnDanger"
          buttonSize="btnMedium"
          buttonViewStyle="btnContained"
          // className={btnStyles.btnContained}
          handleOnClick={(e) => clickHandler(e)}
          tooltip="variants : btnDanger, btnContained, btnMedium"
          label="Delete"
        />
        <DSButton
          id="cancelBtn"
          buttonColor="btnDark"
          buttonSize="btnSmall"
          buttonViewStyle="btnOutlined"
          // className={btnStyles.btnOutlined}
          handleOnClick={(e) => clickHandler(e)}
          tooltip="variants : btnDark, btnOutlined, btnSmall"
          label="Cancel"
        />
        <DSButton
          id="loginBtn"
          buttonColor="btnInfo"
          buttonSize="btnLarge"
          buttonViewStyle="btnContained"
          className={btnStyles.btnAutoWidth}
          handleOnClick={(e) => clickHandler(e)}
          tooltip="variants : btnInfo, btnContained, btnLarge, btnAutoWidth"
          label="Login"
        />
        <DSButton
          id="backBtn"
          buttonColor="btnSecondary"
          buttonViewStyle="btnText"
          // className={btnStyles.btnText}
          handleOnClick={(e) => clickHandler(e)}
          tooltip="variants : btnSecondary, btnText, btnMedium"
          label="Back"
        />
        <DSButton
          id="ewaybillBtn"
          buttonColor="btnPrimary"
          buttonViewStyle="btnContained"
          // className={btnStyles.btnContained}
          handleOnClick={(e) => clickHandler(e)}
          tooltip="variants : btnPrimary, btnContained, btnMedium"
          label="E-Way Bill"
        />
        <DSButton
          id="deleteBtn"
          buttonColor="btnWarning"
          buttonViewStyle="btnContained"
          handleOnClick={(e) => clickHandler(e)}
          handleOnHover={(e) => changeImage(e, whitetrashbtn)}
          handleMouseLeave={(e) => changeImage(e, trashbtn)}
          startIcon={<Image src={trashbtn} alt="icon" />}
          tooltip="variants : btnWarning, btnContained, btnMedium"
          label="Delete"
        />
        <DSButton
          id="deviationBtn"
          buttonColor="btnDanger"
          buttonViewStyle="btnContained"
          // className={btnStyles.btnContained}
          buttonSize="btnMedium"
          handleOnClick={(e) => clickHandler(e)}
          endIcon={<Image src={deviation} alt="icon" />}
          tooltip="variants : btnDanger, btnContained, btnMedium"
          label="Deviation Failed "
        />
        <DSButton
          id="filterBtn"
          type="tab"
          buttonColor="btnPrimary"
          buttonViewStyle="btnOutlined"
          // className={btnStyles.btnOutlined}
          handleOnClick={(e) => clickHandler(e)}
          tooltip="variants : btnPrimary, btnOutlined, btnMedium"
          label="Apply Filter"
        />
        <DSButton
          id="invoiceBtn"
          buttonColor="btnPrimary"
          buttonSize="btnLarge"
          buttonViewStyle="btnContained"
          // className={btnStyles.btnContained}
          handleOnClick={(e) => clickHandler(e)}
          tooltip="variants : btnPrimary, btnContained, btnLarge"
          label="View Invoice"
        />
        <DSButton
          id="logoutBtn"
          buttonColor="btnPrimary"
          buttonViewStyle="btnOutlined"
          // className={btnStyles.btnOutlined}
          handleOnClick={(e) => clickHandler(e)}
          tooltip="variants : btnPrimary, btnOutlined, btnMedium"
          label="LogOut"
        />
        <DSButton
          id="updateBtn"
          buttonColor="btnPrimary"
          buttonViewStyle="btnContained"
          className={btnStyles.btnSecondary}
          handleOnClick={(e) => clickHandler(e)}
          handleOnHover={(e) => changeImage(e, whiteupdate)}
          handleMouseLeave={(e) => changeImage(e, update)}
          startIcon={<Image src={update} alt="icon" />}
          tooltip="variants : btnPrimary, btnContained, btnMedium"
          label="Update"
        />
        <DSButton
          id="autoWidthBtn"
          buttonColor="btnPrimary"
          buttonViewStyle="btnContained"
          className={btnStyles.btnAutoWidth}
          handleOnClick={(e) => clickHandler(e)}
          tooltip="variants : btnPrimary, btnContained, btnMedium, btnAutoWidth"
          label="Apply"
        />

        <DSButton
          id="saveBtn"
          buttonColor="btnPrimary"
          type="split"
          buttonViewStyle="btnContained"
          // className={btnStyles.btnContained}
          handleOnClick={(e) => clickHandler(e)}
          tooltip="variants : btnPrimary, btnContained, btnMedium, split_btn"
          label="Save"
          spliticon={<Image src={spliticon} alt="icon" />}
        />

        <DSButton
          id="toggleBtn"
          type="toggle"
          className={`${btnStyles.toggle_btn} ${
            toggled ? btnStyles.toggled : ""
          }`}
          handleOnClick={() => setToggled(!toggled)}
          tooltip="variants: toggle_btn"
        />

        <DSButton
          id="uploadBtn"
          type="upload"
          buttonSize="btnSmall"
          buttonViewStyle="btnText"
          className={btnStyles.btnTextPrimary}
          handleOnClick={(e) => clickHandler(e)}
          startIcon={<Image src={upload} alt="icon" />}
          tooltip="variants : btnText, btnSmall, upload_btn"
          label="CSV File"
        />

        <DSButton
          id="notificationBtn"
          type="icon_image"
          buttonSize="btnSmall"
          // className={btnStyles.btnSmall + " " + btnStyles.icon_image}
          handleOnClick={(e) => clickHandler(e)}
          startIcon={<Image src={notificationicon} alt="icon" />}
          tooltip="variants: icon_image, btnSmall"
        />
        <DSButton
          id="chatBtn"
          type="icon_image"
          buttonSize="btnSmall"
          // className={btnStyles.btnSmall + " " + btnStyles.icon_image}
          handleOnClick={(e) => clickHandler(e)}
          startIcon={<Image src={chat} alt="icon" />}
          tooltip="variants: icon_image, btnSmall"
        />

        <DSButton
          id="leftarrowBtn"
          type="button_icon"
          // className={btnStyles.icon_btn}
          handleOnClick={(e) => clickHandler(e)}
          handleOnHover={(e) => changeImage(e, darkleftarrow)}
          handleMouseLeave={(e) => changeImage(e, leftarrow)}
          startIcon={<Image src={leftarrow} alt="icon" />}
          tooltip="variants: Back, button_icon"
        />

        <DSButtonGroup id="btngroup1" className={btnStyles.btngroup}>
          <DSButton
            id="button1"
            type="count"
            className={btnStyles.btngroupcontained + " " + btnStyles.group_btn}
            label="Button 1"
            count="00"
            // handleOnClick={(e) => handleButtonClick(e, "button1")}
            tooltip="variants: btngroupcontained"
          />
          <DSButton
            id="button2"
            type="count"
            className={btnStyles.btngroupcontained + " " + btnStyles.group_btn}
            label="Button 2"
            count="00"
            // handleOnClick={(e) => handleButtonClick(e, "button2")}
            tooltip="variants: btngroupcontained"
          />

          <DSButton
            id="button3"
            type="count"
            className={btnStyles.btngroupcontained + " " + btnStyles.group_btn}
            label="Button 3"
            count="00"
            // handleOnClick={(e) => handleButtonClick(e, "button3")}
            tooltip="variants: btngroupcontained"
          />
          <DSButton
            id="button4"
            type="count"
            className={btnStyles.btngroupcontained + " " + btnStyles.group_btn}
            label="Button 4"
            count="00"
            // handleOnClick={(e) => handleButtonClick(e, "button4")}
            tooltip="variants: btngroupcontained"
          />
        </DSButtonGroup>
      </div>
    </DemoLayout>
  );
};

export default DemoButtons;
