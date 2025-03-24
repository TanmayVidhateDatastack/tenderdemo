"use client";
import React, { useEffect, useState } from "react";
import Ds_SummaryCount from "@/Elements/DsComponents/DsSummaryCount/DsSummaryCount";
import { Tender } from "@/Common/helpers/types";
import {
  closeContext,
  createContext,
  displayContext,
} from "@/Elements/DsComponents/dsContextHolder/dsContextHolder";
import DsInfoDisplay from "@/Elements/ERPComponents/DsInfoDisplay/DsInfoDisplay";
import styles from "./filteractions.module.css"

interface TotalValuesProps {
  data: Tender[]; 
}

const DsTotalValues: React.FC<TotalValuesProps> = React.memo(({ data }) => {
  const [totalValue, setTotalValue] = useState<string>("0.00");

  useEffect(() => {
    if (Array.isArray(data)) {
      const netValues: Record<string, number> = {};

      data.forEach((tender: Tender) => {
        const statusValue = tender.status?.tenderStatus ?? "Unknown";

        const rawValue = tender.value ?? "0"; 
        const cleanedValue = Number(rawValue.toString().replace(/,/g, "")); 

        if (!isNaN(cleanedValue)) {
          netValues[statusValue] = (netValues[statusValue] || 0) + cleanedValue;
        }
      });

      const formattedValues = Object.entries(netValues).map(
        ([status, value]) => ({
          status,
          value: value.toFixed(2),
        })
      );

      const total = formattedValues
        .reduce((sum, item) => sum + parseFloat(item.value), 0)
        .toFixed(2);

      setTotalValue(total);

      createContext(
        "TotalValues",
        <Ds_SummaryCount
        Title="Total Values"
        Value={`${Number(total).toFixed(0)}`}
        statusValues={formattedValues.map(item => ({ ...item, value: Number(item.value).toFixed(0) }))}
      />,
        true
      );
    }
  }, [data]);

  console.log("total values", data);

  return (
    <div
      onMouseOver={(e) => {
        e.preventDefault();
        displayContext(e, "TotalValues", "vertical", "right");
      }}
      onMouseOut={() => {
        closeContext("TotalValues");
      }}
    >
      {/* <DsInfoDisplay detailOf="Total Values (₹)" value={Number(totalValue).toFixed(0)} /> */}
      <DsInfoDisplay detailOf="Total Values (₹)" className={styles.totalorder}>
        {Number(totalValue).toFixed(0)}
      </DsInfoDisplay>
    </div>
  );
});

DsTotalValues.displayName = "DsTotalValues";

export default DsTotalValues;
