"use client";
import React, { useEffect, useState } from "react";
import ContextMenu, {

  closeContext,
 displayContext,
} from "@/Elements/DsComponents/dsContextHolder/dsContextHolder";
import DsInfoDisplay from "@/Elements/ERPComponents/DsInfoDisplay/DsInfoDisplay";
import { Tender } from "@/Common/helpers/types";
import Image from "next/image";
import institutionalimg from "@/Common/TenderIcons/institutional.svg";
import corporateimag from "@/Common/TenderIcons/corporate.svg";
import Ds_SummaryCount from "@/Elements/DsComponents/DsSummaryCount/DsSummaryCount";
import styles from "./filteractions.module.css";


interface TotalTendersProps {
  data: Tender[];
}

const DsTotalTenders: React.FC<TotalTendersProps> = React.memo(({ data }) => {
  const [totalTenders, setTotalTenders] = useState<number>(0);
  const [institutionalCount, setInstitutionalCount] = useState<number>(0);
  const [corporateCount, setCorporateCount] = useState<number>(0);

  useEffect(() => {


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

      if (tender.type === "INSTITUTION") {
        institutional++;
      } else if (tender.type === "CORPORATE") {
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


  }, [data]);


  return (
    <div
      onMouseOver={(e) => {
        displayContext(e, "TotalTenders", "vertical", "center");

      }}

      onMouseOut={(e) => {
        closeContext("TotalTenders")

      }}

    >
      <DsInfoDisplay
        detailOf="Total Tenders"

        className={styles.totalorder}
      >{totalTenders}</DsInfoDisplay>
      <ContextMenu id={"TotalTenders"} showArrow={false} content={<Ds_SummaryCount
        title="Total Tenders"
        value={`${data.length}`}
        statusValue={[
          {
            addimage: (

              <div style={{ width: "0.875em", height: "0.875em", position: "relative" }}>
                <Image
                  src={institutionalimg}
                  alt={"Institutional"}
                  layout="fill"
                  objectFit="cover"
                />
              </div>

            ),
            status: "Institutional",
            value: institutionalCount.toString(),
          },
          {
            addimage: (

              <div style={{ width: "0.875em", height: "0.875em", position: "relative" }}>
                <Image
                  src={corporateimag}
                  layout="fill"
                  objectFit="cover"
                  alt="corporateimag"

                />
              </div>

            ),
            status: "Corporate",
            value: corporateCount.toString().padStart(2, "0"),
          },
        ]}
      />} />
    </div>
  );
});
DsTotalTenders.displayName = "DsTotalTenders";
export default DsTotalTenders;


