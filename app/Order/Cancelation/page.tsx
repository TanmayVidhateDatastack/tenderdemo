"use client";
import styles from "../order.module.css";
import pagestyles from "../../page.module.css";

// import Image from "next/image";
import Application from "@/app/Elements/ElProComponents/ApplicationComponents/Application";
import TabView from "@/app/Elements/Components/dsTabs/TabView";
import DSButton from "@/app/Elements/Components/dsButton/dsButton";
import DsSelect from "@/app/Elements/Components/dsSelect/dsSelect";
import TextField from "@/app/Elements/Components/DsTextField/DsTextField";
import Detail from "@/app/Elements/ElProComponents/DetailComponent/Detail";

export default function Home() {
  const UpdatedBy = "Tanmay Patil (Emp ID:1311)";
  return (
    <>
      <Application
        appTitle={"Order"}
        hasPrevious={true}
        tabs={[
          { tabId: "0", tabName: "Details" },
          { tabId: "1", tabName: "Cancelation" },
        ]}
        selectedTabId="0"
      >
        <TabView tabId="0">
          <div className={pagestyles.container}>
            <div className={styles.container}>deta</div>
          </div>
        </TabView>
        <TabView tabId="1">
          <div className={pagestyles.container}>
            <div className={styles.container}>
              <div className={styles.subtitle}>
                Order Cancellation Justification
              </div>
              <DsSelect
                id={"Justification"}
                options={[]}
                type={"single"}
                placeholder={""}
              ></DsSelect>
              <div className={styles.subtitle}>Supporting Notes</div>
              <TextField type="multiline" minRows={20}></TextField>
              <DSButton type="upload" buttonViewStyle="btnText">
                Attach File
              </DSButton>
              <Detail detailOf="Updated By" className={styles.subtitle}>
                {UpdatedBy}
              </Detail>
              
            </div>
          </div>
        </TabView>
        <div className={styles.footer}>
          <DSButton buttonSize="btnLarge" buttonColor="btnDark">Close</DSButton>
          <DSButton type="split" buttonViewStyle="btnContained">Save</DSButton>
        </div>

      </Application>
    </>
  );
}
