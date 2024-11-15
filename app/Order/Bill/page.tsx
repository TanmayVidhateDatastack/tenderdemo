"use client";
import styles from "./packing.module.css";
import buttonStyles from "../../Elements/Components/dsButton/dsButton.module.css";
import statusStyles from "../../Elements/Components/DsStatusIndicator/dsstatusIndicator.module.css";
import Image from "next/image";
import mailIcon from "../../Elements/Icons/smallIcons/mailIcon.svg";
import desktop from "../../Elements/Icons/smallIcons/desktop.svg";
import print from "../../Elements/Icons/smallIcons/printIcon.svg";
import whatsappIcon from "../../Elements/Icons/smallIcons/whatsapp.svg";
import PackingList from "./packingList";
import { useEffect, useState } from "react";
import DsStateChange from "@/app/Elements/Components/DsStatusIndicator/dsStatusIndicator";
import Application from "@/app/Elements/ElProComponents/ApplicationComponents/Application";
import DSButton from "@/app/Elements/Components/dsButton/dsButton";

export default function Home() {
  const orderNo = "202401999900007 (B2B)";

  const [pageStatus, setPageStatus] = useState<boolean>(false);

  useEffect(() => {
    function handlePageChange() {
      setPageStatus(!pageStatus);
    }
    const toggleId = document.getElementById("toggleBtn");
    toggleId?.addEventListener("click", handlePageChange);

    return () => {
      toggleId?.removeEventListener("click", handlePageChange);
    };
  }, [pageStatus]);

  return (
    <>
      <Application
        appTitle={"Order - " + orderNo}
        hasPrevious={true}
        appMenu={
          <>
            <div className={styles.buttonDiv}>
              <DsStateChange
                className={statusStyles.statusIndicator}
                type="user_defined"
                id="state1"
                status="Approved"
                label="Approved"
              />
              <DSButton
                id="ewaybillBtn"
                buttonColor="btnPrimary"
                buttonViewStyle="btnContained"
                // className={btnStyles.btnContained}
                //   handleOnClick={(e) => clickHandler(e)}
                tooltip="variants : btnPrimary, btnContained, btnMedium"
                label="E-Way Bill"
              />
            </div>
          </>
        }
      >
        {/* <div className={pagestyles.container}> */}
        <div className={styles.semiContainer2}>
          <div className={styles.semiContainer2_Head}>
            <div className={styles.packingList}>
              <span>Invoice</span>
              <DSButton
                id="toggleBtn"
                buttonSize="btnSmall"
                // handleOnClick={() => handlePageChange()}
                type="toggle"
                tooltip="variants: toggle_btn"
              />
              <span>Packing List</span>
            </div>
            <div className={styles.packingIcons}>
              <DSButton
                id="mail"
                type="icon_image"
                buttonSize="btnSmall"
                className={styles.icons}
                tooltip="varients: Mail"
                // startIcon={<Image src={mailIcon} alt="icon" />}
              >
                {<Image src={mailIcon} alt="icon" />}
              </DSButton>
              <DSButton
                id="whatsapp"
                type="icon_image"
                buttonSize="btnSmall"
                className={styles.icons}
                tooltip="varients: Whatsapp"
                // startIcon={<Image src={whatsappIcon} alt="icon" />}
              >
                {<Image src={whatsappIcon} alt="icon" />}
              </DSButton>
              <DSButton
                id="mail"
                type="icon_image"
                buttonSize="btnSmall"
                className={styles.icons}
                tooltip="varients: desktop"
                // startIcon={<Image src={desktop} alt="icon" />}
              >
                {<Image src={desktop} alt="icon" />}
              </DSButton>
              <div className={buttonStyles.left_separator}>
                <DSButton
                  id="mail"
                  type="icon_image"
                  buttonSize="btnSmall"
                  className={styles.icons}
                  tooltip="varients: print"
                  // startIcon={<Image src={print} alt="icon" />}
                >
                  {<Image src={print} alt="icon" />}
                </DSButton>
              </div>
            </div>
          </div>

          {pageStatus && (
            <div className={styles.container3}>
              <PackingList />
            </div>
          )}
          {/* {pageStatus ? (
            <div className={styles.container3}>
              <PackingList />
            </div>
          ) : (
            <PackingData />
          )} */}
          {/* </div> */}
        </div>
        {/* </div> */}
      </Application>
    </>
  );
}
