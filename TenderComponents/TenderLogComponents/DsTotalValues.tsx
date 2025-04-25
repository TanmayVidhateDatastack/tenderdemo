"use client";
import React, { useEffect, useState } from "react";
import Ds_SummaryCount from "@/Elements/DsComponents/DsSummaryCount/DsSummaryCount";
import { Tender } from "@/Common/helpers/types";
import ContextMenu, {
  closeContext,
  displayContext,
} from "@/Elements/DsComponents/dsContextHolder/dsContextHolder";
import DsInfoDisplay from "@/Elements/ERPComponents/DsInfoDisplay/DsInfoDisplay";
import styles from "./filteractions.module.css";
import DsCurrency, {
  getFormatCurrency,
} from "@/Elements/DsComponents/dsCurrency/dsCurrency";

interface TotalValuesProps {
  data: Tender[];
}

const DsTotalValues: React.FC<TotalValuesProps> = React.memo(({ data }) => {
  const [totalValue, setTotalValue] = useState<string>("0.00");
  const [formattedValues, setFormattedValues] = useState<
    { status: string; value: string | number }[]
  >([]);

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
          //  value:<DsCurrency format={"IND"} id={""} amount={value} type={"short"}/>,
        })
      );
      setFormattedValues(formattedValues);
      const total = formattedValues
        .reduce((sum, item) => sum + parseFloat(item.value), 0)
        .toFixed(2);

      setTotalValue(total);
    }
  }, [data]);

  // console.log("total values", data);

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
      <DsInfoDisplay detailOf="Total Values (₹)" className={styles.totalorder}>
        {/* <DsCurrency format={"IND"} id={""} amount={Number(totalValue)} type={"short"}/> */}
        {getFormatCurrency(Number(totalValue), "short", "IND")}
      </DsInfoDisplay>
      <ContextMenu
        id={"TotalValues"}
        showArrow={false}
        content={
          <Ds_SummaryCount
            title="Total Values"
            value={getFormatCurrency(Number(totalValue), "short", "IND")}
            // statusValues={formattedValues.map(item => ({ ...item, value: Number(item.value).toFixed(0) }))}
            statusValue={formattedValues.map((item) => ({
              ...item,
              value: getFormatCurrency(Number(item.value), "short", "IND"),
            }))}
          />
        }
      />
    </div>
  );
});

DsTotalValues.displayName = "DsTotalValues";

export default DsTotalValues;
