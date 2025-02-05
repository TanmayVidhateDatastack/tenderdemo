"use client";

import TableComponent from "@/Elements/DsComponents/DsTablecomponent/DsTableComponent";
import DsApplication from "@/Elements/ERPComponents/DsApplicationComponents/DsApplication";
import DsNavTo from "@/Elements/ERPComponents/DsNavigationComponent/DsNavTo";
import styles from "./page.module.css";
import DsFilterActions from "@/TenderComponents/TenderLogComponents/DsFilterActions";
import DsPane from "@/Elements/DsComponents/DsPane/DsPane";
import DsAdvancedFilterPane from "@/TenderComponents/TenderLogComponents/DsAdvancedFilterPane";
import DsTenderTable from "@/TenderComponents/TenderLogComponents/DsTenderTable";

export default function Home() {
  return (
    <>
      <DsApplication
        appTitle="Tender"
        appMenu={
          <div className={styles.filterNavBar}>
            <DsFilterActions />
            <DsNavTo label="New" location="Tender/New" />
          </div>
        }
      >
        <DsTenderTable />
      </DsApplication>
    </>
  );
}
