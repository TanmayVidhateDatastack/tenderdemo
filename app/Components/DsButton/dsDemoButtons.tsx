"use client";
import Image from "next/image";
import addIcon from "../../Icons/add.svg";
import filter from "../../Icons/filtericon.svg";
import trashbtn from "../../Icons/trashbtn.svg";
import deviation from "../../Icons/deviation.svg";
import update from "../../Icons/update.svg";
import btnStyles from "./dsButton.module.css";
import whiteupdate from "../../Icons/whiteupdate.svg";
import whiteadd from "../../Icons/whiteadd.svg";
import spliticon from "../../Icons/downarrowwhite.svg";
import notificationicon from "../../Icons/notificationbell.svg";
import chat from "../../Icons/chat.svg";
import leftarrow from "../../Icons/grayleftarrow.svg";
import darkleftarrow from "../../Icons/darkleftarrow.svg";
import upload from "../../Icons/uploadicon.svg";
import { useState } from "react";
import { ImgProps } from "next/dist/shared/lib/get-img-props";
import DSButton from "./dsButton";

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
    <div className={btnStyles.btn_div + " " + btnStyles.flex}>
      <DSButton
        id="actionBtn"
        buttonColor="btnPrimary"
        buttonClass={btnStyles.btnOutlined}
        handleOnHover={(e) => changeImage(e, whiteadd)}
        handleMouseLeave={(e) => changeImage(e, addIcon)}
        startIcon={<Image src={addIcon} alt="icon" />}
        label="New"
        handleOnClick={(e) => clickHandler(e)}
      />
      <DSButton
        id="closeBtn"
        buttonColor="btnDark"
        buttonClass={btnStyles.btnOutlined}
        handleOnClick={(e) => clickHandler(e)}
        label="Close"
      />
      <DSButton
        id="iconfilterBtn"
        buttonColor="btnPrimary"
        buttonClass={btnStyles.btnText + " " + btnStyles.btnTextPrimary}
        handleOnClick={(e) => clickHandler(e)}
        startIcon={<Image src={filter} alt="icon" />}
        label="Filter"
      />
      <DSButton
        id="deleteBtn"
        buttonColor="btnDanger"
        buttonSize="btnSmall"
        buttonClass={btnStyles.btnOutlined}
        handleOnClick={(e) => clickHandler(e)}
        label="Delete"
      />
      <DSButton
        id="cancelBtn"
        buttonColor="btnDark"
        buttonSize="btnSmall"
        // buttonClass={btnStyles.btnSmall}
        handleOnClick={(e) => clickHandler(e)}
        label="Cancel"
      />
      <DSButton
        id="loginBtn"
        buttonColor="btnInfo"
        buttonSize="btnLarge"
        buttonClass={btnStyles.btnContained + " " + btnStyles.btnAutoWidth}
        handleOnClick={(e) => clickHandler(e)}
        label="Login"
      />
      <DSButton
        id="backBtn"
        buttonColor="btnSecondary"
        buttonClass={btnStyles.btnText}
        handleOnClick={(e) => clickHandler(e)}
        label="Back"
      />
      <DSButton
        id="ewaybillBtn"
        buttonColor="btnPrimary"
        buttonClass={btnStyles.btnContained}
        handleOnClick={(e) => clickHandler(e)}
        label="E-Way Bill"
      />
      <DSButton
        id="deleteBtn"
        buttonColor="btnWarning"
        buttonClass={btnStyles.btnText}
        handleOnClick={(e) => clickHandler(e)}
        startIcon={<Image src={trashbtn} alt="icon" />}
        label="Delete"
      />
      <DSButton
        id="deviationBtn"
        buttonColor="btnDanger"
        buttonClass={btnStyles.btnContained}
        buttonSize="btnMedium"
        handleOnClick={(e) => clickHandler(e)}
        endIcon={<Image src={deviation} alt="icon" />}
        label="Deviation Failed "
      />
      <DSButton
        id="filterBtn"
        buttonColor="btnPrimary"
        buttonClass={btnStyles.btnOutlined}
        handleOnClick={(e) => clickHandler(e)}
        label="Apply Filter"
      />
      <DSButton
        id="invoiceBtn"
        buttonColor="btnPrimary"
        buttonSize="btnLarge"
        buttonClass={btnStyles.btnContained}
        handleOnClick={(e) => clickHandler(e)}
        label="View Invoice"
      />
      <DSButton
        id="logoutBtn"
        buttonColor="btnDark"
        buttonClass={btnStyles.btnOutlined}
        handleOnClick={(e) => clickHandler(e)}
        label="Log Out"
      />
      <DSButton
        id="updateBtn"
        buttonColor="btnPrimary"
        buttonClass={btnStyles.btnContained + " " + btnStyles.btnSecondary}
        handleOnClick={(e) => clickHandler(e)}
        handleOnHover={(e) => changeImage(e, whiteupdate)}
        handleMouseLeave={(e) => changeImage(e, update)}
        startIcon={<Image src={update} alt="icon" />}
        label="Update"
      />
      <DSButton
        id="autoWidthBtn"
        buttonColor="btnPrimary"
        buttonClass={btnStyles.btnContained + " " + btnStyles.btnAutoWidth}
        handleOnClick={(e) => clickHandler(e)}
        label="Apply"
      />

      <DSButton
        id="saveBtn"
        buttonColor="btnPrimary"
        type="split"
        buttonClass={btnStyles.btnContained}
        handleOnClick={(e) => clickHandler(e)}
        label="Save"
        spliticon={<Image src={spliticon} alt="icon" />}
      />

      <DSButton
        id="toggleBtn"
        type="toggle"
        buttonClass={`${btnStyles.toggle_btn} ${
          toggled ? btnStyles.toggled : ""
        }`}
        handleOnClick={() => setToggled(!toggled)}
      />

      <DSButton
        id="uploadBtn"
        type="upload"
        buttonSize="btnSmall"
        buttonClass={btnStyles.btnText + " " + btnStyles.btnTextPrimary}
        handleOnClick={(e) => clickHandler(e)}
        startIcon={<Image src={upload} alt="icon" />}
        label="CSV File"
      />

      <DSButton
        id="notificationBtn"
        type="icon_image"
        buttonSize="btnSmall"
        // buttonClass={btnStyles.btnSmall + " " + btnStyles.icon_image}
        handleOnClick={(e) => clickHandler(e)}
        startIcon={<Image src={notificationicon} alt="icon" />}
        tooltip="Notification"
      />
      <DSButton
        id="chatBtn"
        type="icon_image"
        buttonSize="btnSmall"
        // buttonClass={btnStyles.btnSmall + " " + btnStyles.icon_image}
        handleOnClick={(e) => clickHandler(e)}
        startIcon={<Image src={chat} alt="icon" />}
        tooltip="Chat"
      />

      <DSButton
        id="leftarrowBtn"
        type="button_icon"
        // buttonClass={btnStyles.icon_btn}
        handleOnClick={(e) => clickHandler(e)}
        handleOnHover={(e) => changeImage(e, darkleftarrow)}
        handleMouseLeave={(e) => changeImage(e, leftarrow)}
        startIcon={<Image src={leftarrow} alt="icon" />}
        tooltip="Back"
      />
    </div>
  );
};

export default DemoButtons;
