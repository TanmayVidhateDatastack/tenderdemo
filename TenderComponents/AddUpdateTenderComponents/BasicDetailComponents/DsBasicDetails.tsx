import { useEffect, useState } from "react";
import fetchData from "@/Common/helpers/Method/fetchData";
import {
  // tenderDetails,
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
import { useSearchParams } from "next/navigation";

export interface Deposit {
  paidBy: DsSelectOption[];
}

const DsBasicDetails = () => {
  const { fetchMetaData, tenderData, updateTenderData } = useTenderData();

  useEffect(() => {
    fetchMetaData();
  }, []);
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "institutional" || "corporate";
  
  useEffect(() => {
    if (type === "institutional" &&
      tenderData.applierType === "STOCKIST" &&
      tenderData.supplierType === "STOCKIST") {
      updateTenderData("tenderFees", []);
    }
  }, [type, tenderData.applierType, tenderData.supplierType])

  return (
    <>
      <div className={styles.container}>
        <DsTenderDetails />
      </div>
      <span className={styles.Seperator}></span>
      <div className={styles.container}>
        <DsApplierSupplierDetails />
      </div>
      {!(
        type === "institutional" &&
        tenderData.applierType === "STOCKIST" &&
        tenderData.supplierType === "STOCKIST"
      ) && (
          <>
            <span className={styles.Seperator}></span>
            <div className={styles.container}>
              <DsDepositeDocuments />
            </div>
          </>
        )}
      {type === "institutional" && (
        <>
          <span className={styles.Seperator}></span>
          <div className={styles.container}>
            <DsSupplyDetails />

            <DsApplicableConditions />
          </div>
        </>
      )}
    </>
  );
};
export default DsBasicDetails;