"use client";
import styles from "../order.module.css";
import pagestyles from "../../page.module.css";

// import Image from "next/image";
import Application from "@/app/ElProComponents/ApplicationComponents/Application";
import TabView from "@/app/Components/dsTabs/TabView";

export default function Home() {
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
            <div className={styles.container}>canl</div>
          </div>
        </TabView>
      </Application>
    </>
  );
}
