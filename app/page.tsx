"use client";

import DsApplication from "@/Elements/ERPComponents/DsApplicationComponents/DsApplication";
import DsNavTo from "@/Elements/ERPComponents/DsNavigationComponent/DsNavTo";
import styles from "./page.module.css";
import DsTenderTable from "@/TenderComponents/TenderLogComponents/DsTenderTable";
import DsFilterActions from "@/TenderComponents/TenderLogComponents/DsFilterActions";
import add from "@/Icons/smallIcons/add.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Tender } from "@/helpers/types";

export default function Home() {
  const [data, setData] = useState<Tender[]>([]); //for table data
  const [filteredData, setFilteredData] = useState<Tender[]>([]); //for filtered table data

  // useEffect(() => {
  //   if (data || filteredData) {
  //     console.log("data fetched from table : ", data);
  //     console.log("filtereddata fetched from table : ", filteredData);
  //   }
  // }, [data, filteredData]);

  return (
    <>
      <DsApplication
        appTitle="Tender"
        appMenu={
          <div className={styles.filterNavBar}>
            <DsFilterActions data={data} setFilteredData={setFilteredData} />
            <DsNavTo
              startIcon={<Image src={add} alt="new" />}
              label="New"
              location="Tender/New"
            />
          </div>
        }
      >
        <DsTenderTable
          setData={setData}
          data={data}
          filteredData={filteredData}
        />
      </DsApplication>
    </>
  );
}
