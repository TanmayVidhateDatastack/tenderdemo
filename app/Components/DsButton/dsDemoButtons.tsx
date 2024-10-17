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
        buttonClass={
          btnStyles.btnMedium +
          " " +
          btnStyles.btnOutlined +
          " " +
          btnStyles.btnPrimary
        }
        handleOnHover={(e) => changeImage(e, whiteadd)}
        handleMouseLeave={(e) => changeImage(e, addIcon)}
        startIcon={<Image src={addIcon} alt="icon" />}
        label="New"
        handleOnClick={(e) => clickHandler(e)}
      />
      <DSButton
        id="closeBtn"
        buttonClass={
          btnStyles.btnMedium +
          " " +
          btnStyles.btnOutlined +
          " " +
          btnStyles.btnDark
        }
        handleOnClick={(e) => clickHandler(e)}
        label="Close"
      />
      <DSButton
        id="iconfilterBtn"
        buttonClass={
          btnStyles.btnText +
          " " +
          btnStyles.btnMedium +
          " " +
          btnStyles.btnFilter
        }
        handleOnClick={(e) => clickHandler(e)}
        startIcon={<Image src={filter} alt="icon" />}
        label="Filter"
      />
      <DSButton
        id="deleteBtn"
        buttonClass={
          btnStyles.btnSmall +
          " " +
          btnStyles.btnOutlined +
          " " +
          btnStyles.btnDanger
        }
        handleOnClick={(e) => clickHandler(e)}
        label="Delete"
      />
      <DSButton
        id="cancelBtn"
        buttonClass={btnStyles.btnSmall + " " + btnStyles.btnDark}
        handleOnClick={(e) => clickHandler(e)}
        label="Cancel"
      />
      <DSButton
        id="loginBtn"
        buttonClass={
          btnStyles.btnLarge +
          " " +
          btnStyles.btnContained +
          " " +
          btnStyles.btnInfo +
          " " +
          btnStyles.btnAutoWidth
        }
        handleOnClick={(e) => clickHandler(e)}
        label="Login"
      />
      <DSButton
        id="backBtn"
        buttonClass={
          btnStyles.btnMedium +
          " " +
          btnStyles.btnText +
          " " +
          btnStyles.btnSecondary
        }
        handleOnClick={(e) => clickHandler(e)}
        label="Back"
      />
      <DSButton
        id="ewaybillBtn"
        buttonClass={
          btnStyles.btnMedium +
          " " +
          btnStyles.btnContained +
          " " +
          btnStyles.btnPrimary
        }
        handleOnClick={(e) => clickHandler(e)}
        label="E-Way Bill"
      />
      <DSButton
        id="deleteBtn"
        buttonClass={
          btnStyles.btnMedium +
          " " +
          btnStyles.btnText +
          " " +
          btnStyles.btnRedWarning
        }
        handleOnClick={(e) => clickHandler(e)}
        startIcon={<Image src={trashbtn} alt="icon" />}
        label="Delete"
      />
      <DSButton
        id="deviationBtn"
        buttonClass={
          btnStyles.btnContained +
          " " +
          btnStyles.btnMedium +
          " " +
          btnStyles.btnDanger
        }
        buttonSize="btnMedium"
        handleOnClick={(e) => clickHandler(e)}
        endIcon={<Image src={deviation} alt="icon" />}
        label="Deviation Failed "
      />
      <DSButton
        id="filterBtn"
        buttonClass={
          btnStyles.btnMedium +
          " " +
          btnStyles.btnOutlined +
          " " +
          btnStyles.btnPrimary
        }
        handleOnClick={(e) => clickHandler(e)}
        label="Apply Filter"
      />
      <DSButton
        id="invoiceBtn"
        buttonClass={
          btnStyles.btnLarge +
          " " +
          btnStyles.btnContained +
          " " +
          btnStyles.btnPrimary
        }
        handleOnClick={(e) => clickHandler(e)}
        label="View Invoice"
      />
      <DSButton
        id="logoutBtn"
        buttonClass={
          btnStyles.btnMedium +
          " " +
          btnStyles.btnOutlined +
          " " +
          btnStyles.btnPrimary
        }
        handleOnClick={(e) => clickHandler(e)}
        label="Log Out"
      />
      <DSButton
        id="updateBtn"
        buttonClass={
          btnStyles.btnMedium +
          " " +
          btnStyles.btnText +
          " " +
          btnStyles.btnPrimary +
          " " +
          btnStyles.btnFilter
        }
        handleOnClick={(e) => clickHandler(e)}
        handleOnHover={(e) => changeImage(e, whiteupdate)}
        handleMouseLeave={(e) => changeImage(e, update)}
        startIcon={<Image src={update} alt="icon" />}
        label="Update"
      />
      <DSButton
        id="autoWidthBtn"
        buttonClass={
          btnStyles.btnContained +
          " " +
          btnStyles.btnMedium +
          " " +
          btnStyles.btnPrimary +
          " " +
          btnStyles.btnAutoWidth
        }
        handleOnClick={(e) => clickHandler(e)}
        label="Apply"
      />

      <DSButton
        id="saveBtn"
        type="split"
        buttonClass={
          btnStyles.btnContained +
          " " +
          btnStyles.btnMedium +
          " " +
          btnStyles.btnPrimary +
          " " +
          btnStyles.spilt_btn
        }
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
    </div>
  );
};

export default DemoButtons;
