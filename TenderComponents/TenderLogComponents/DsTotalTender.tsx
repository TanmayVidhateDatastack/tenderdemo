import React, { useEffect, useState } from "react";
import {
  closeContext,
  createContext,
  displayContext,
} from "@/Elements/DsComponents/dsContextHolder/dsContextHolder";
import DsInfoDisplay from "@/Elements/ERPComponents/DsInfoDisplay/DsInfoDisplay";
 
import { Tender } from "@/helpers/types";
import Image from "next/image";
import institutionalimg from "@/Icons/institutional.svg";
import corporateimag from "@/Icons/corporate.svg";
import Ds_SummaryCount from "@/Elements/DsComponents/DsSummaryCount/DsSummaryCount";
 
interface TotalTendersProps {
  data: Tender[]; // Updated to match your actual API response
}
 
const DsTotalTenders: React.FC<TotalTendersProps> = React.memo(({ data }) => {
  const [totalTenders, setTotalTenders] = useState<number>(0);
  const [institutionalCount, setInstitutionalCount] = useState<number>(0);
  const [corporateCount, setCorporateCount] = useState<number>(0);
 
  useEffect(() => {
    console.log("Type of data:", typeof data);
    console.log("Actual data:", data);
 
    if (!data || !Array.isArray(data)) {
      console.warn("Invalid data format:", data);
      return;
    }
 
    let institutional = 0;
    let corporate = 0;
 
    data.forEach((tender) => {
      if (!tender.type) {
        console.warn("Missing type for tender:", tender);
        return;
      }
 
      if (tender.type === "institutional") {
        institutional++;
      } else if (tender.type === "corporate") {
        corporate++;
      }
    });
 
    console.log(
      "Institutional Count:",
      institutional,
      "Corporate Count:",
      corporate
    );
 
    setTotalTenders(data.length);
    setInstitutionalCount(institutional);
    setCorporateCount(corporate);
   
    createContext(
      "TotalTenders",
      <Ds_SummaryCount
        Title="Total Tenders"
        Value={`${data.length}`}
        statusValues={[
          {
            addimage: (
              <div style={{ width: "1rem", height: "1rem", position: "relative" }}>
              <Image
                src={institutionalimg}
                alt={"Institutional"}
                 layout="fill"
                 objectFit="cover"
              />
              </div>
            ),
            status: "Institutional",
            value: institutional.toString(),
          },
          {
            addimage: (
 
 
<div style={{ width: "1rem", height: "1rem", position: "relative" }}>
            <Image
             src={corporateimag}
              layout="fill"
              objectFit="cover"
              alt="corporateimag"
 
            />
          </div>
 
            ),
            status: "Corporate",
            value: corporate.toString(),
          },
        ]}
      />,
 
      true
    );
  }, [data]);
 
  return (
    <div
      onMouseOver={(e) => {
        displayContext(e, "TotalTenders", "vertical", "center", 150);
      }}
      // onMouseOut={() => {
      //   closeContext("TotalTenders");
      // }}
    >
      <DsInfoDisplay detailOf="Total Tenders" value={totalTenders} />
    </div>
  );
});
 
DsTotalTenders.displayName = "DsTotalTenders";
 
export default DsTotalTenders;
 
 