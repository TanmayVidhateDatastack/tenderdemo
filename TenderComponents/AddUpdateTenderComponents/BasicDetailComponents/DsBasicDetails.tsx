import { useEffect, useState } from "react";
import fetchData from "@/Common/helpers/Method/fetchData";
import {
  tenderDetails,
  supplyDetails,
  DsSelectOption,
} from "@/Common/helpers/types";
import DsDepositeDocuments from "./DsDepositeDocuments";
import styles from "@/app/Tender/[TenderId]/tenderOrder.module.css";
import DsApplierSupplierDetails from "./DsApplierSupplierDetails ";
import DsTenderDetails from "./DsTenderDetails ";
import DsSupplyDetails from "./DsSupplyDetails";
import DsApplicableConditions from "./DsApplicableConditions";
import { useTenderData } from "../TenderDataContextProvider";

export interface Deposit {
  paidBy: DsSelectOption[];
}

const DsBasicDetails = () => {
  const { fetchMetaData } = useTenderData();

  useEffect(() => {
    fetchMetaData();
  }, []);

  return (
    <>
      <div className={styles.container}>
        <DsTenderDetails />
      </div>
      <span className={styles.Seperator}></span>
      <div className={styles.container}>
        <DsApplierSupplierDetails />
      </div>
      <span className={styles.Seperator}></span>
      <div className={styles.container}>
        <DsDepositeDocuments />
      </div>
      <span className={styles.Seperator}></span>
      <div className={styles.container}>
        <DsSupplyDetails />
        {/* </div>
      <span className={styles.Seperator}></span>
      <div> */}
        <DsApplicableConditions />
      </div>
    </>
  );
};
export default DsBasicDetails;
