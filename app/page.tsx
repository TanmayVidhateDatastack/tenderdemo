"use client";

import DsApplication from "@/Elements/ERPComponents/DsApplicationComponents/DsApplication";
import DsNavTo from "@/Elements/ERPComponents/DsNavigationComponent/DsNavTo";
import styles from "./page.module.css";
// import DsFilterActions from "@/TenderComponents/TenderLogComponents/DsFilterActions";
import DsTenderTable from "@/TenderComponents/TenderLogComponents/DsTenderTable";
import DsFilterActions from "@/TenderComponents/TenderLogComponents/DsFilterActions";

export default function Home() {
  // const [data, setData];
  return (
    <>
      <DsApplication
        appTitle="Tender"
        appMenu={
          <div className={styles.filterNavBar}>
            <DsFilterActions />
            {/* <DsFilterActions
              data={data}
              setFilteredData={setPrevData}
            ></DsFilterActions> */}
            <DsNavTo label="New" location="Tender/New" />
          </div>
        }
      >
        <DsTenderTable />
      </DsApplication>
    </>
  );
}
