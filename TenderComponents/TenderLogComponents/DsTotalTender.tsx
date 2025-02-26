"use client";
import React, { useEffect, useState } from "react";
import {
  closeAllContext,
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
import styles from "./filteractions.module.css";

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
              <div>
              <div style={{ width: "1.5rem", height: "1.5rem", position: "relative" }}>
              <Image
                src={institutionalimg}
                alt={"Institutional"}
                 layout="fill"
                 objectFit="cover"
              />
              </div>
              </div>
            ),
            status: "Institutional",
            value: institutional.toString(),
          },
          {
            addimage: (
<div>
<div style={{ width: "1.5rem", height: "1.5rem", position: "relative" }}>
            <Image
             src={corporateimag}
              layout="fill"
              objectFit="cover"
              alt="corporateimag"

            />
          </div>
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
      //   closeAllContext();
      // }}
    >
      <DsInfoDisplay detailOf="Total Tenders" value={totalTenders} />
    </div>
  );
});

DsTotalTenders.displayName = "DsTotalTenders";

export default DsTotalTenders;


/* eslint-disable react/display-name */
// "use client";
// import React, { useEffect, useState } from "react";
// import Ds_SummaryCount from "@/Elements/DsComponents/DsSummaryCount/DsSummaryCount";
// import { Tender} from "@/helpers/types";
// import {
//   closeContext,
//   createContext,
//   displayContext,
// } from "@/Elements/DsComponents/dsContextHolder/dsContextHolder";
// import DsInfoDisplay from "@/Elements/ERPComponents/DsInfoDisplay/DsInfoDisplay";
// import Image from "next/image";
// import institutionalimg from "@/Icons/institutional.svg";
// import corporateimag from "@/Icons/corporate.svg";
// import styles from "./filteractions.module.css";

// interface TotalTendersProps {
//   data: Tender[]; // Updated to match your actual API response
// }

// const DsTotalOrders: React.FC<TotalTendersProps> = React.memo(({ data }) => {
//    const [totalTenders, setTotalTenders] = useState<number>(0);
//   const [institutionalCount, setInstitutionalCount] = useState<number>(0);
//   const [corporateCount, setCorporateCount] = useState<number>(0);
//   let institutional = 0;
//           let corporate = 0;

//   useEffect(() => {

//   }, []);

//   useEffect(() => {
//     if (!data || !Array.isArray(data)) {
//             console.warn("Invalid data format:", data);
//             return;
//           }
      
        
      
//           data.forEach((tender) => {
//             if (!tender.type) {
//               console.warn("Missing type for tender:", tender);
//               return;
//             }
      
//             if (tender.type === "institutional") {
//               institutional++;
//             } else if (tender.type === "corporate") {
//               corporate++;
//             }
//           });
      
//           console.log(
//             "Institutional Count:",
//             institutional,
//             "Corporate Count:",
//             corporate
//           );
      
//           setTotalTenders(data.length);
//           setInstitutionalCount(institutional);
//           setCorporateCount(corporate);
          
//   }, [data]);

//   useEffect(() => {
    
//     createContext(
//       "TotalTenders",
//       <Ds_SummaryCount
//         Title="Total Orders"
//         Value={`${data?.length}`}
//         statusValues={[
//                     {
//                       addimage: (
//                         <div style={{ width: "1.5rem", height: "1.5rem", position: "relative" }}>
//                         <Image
//                           src={institutionalimg}
//                           alt={"Institutional"}
//                            layout="fill"
//                            objectFit="cover"
//                         />
//                         </div>
//                       ),
//                       status: "Institutional",
//                       value: institutional.toString(),
//                     },
//                     {
//                       addimage: (
          
          
//           <div style={{ width: "1.5rem", height: "1.5rem", position: "relative" }}>
//                       <Image
//                        src={corporateimag}
//                         layout="fill"
//                         objectFit="cover"
//                         alt="corporateimag"
          
//                       />
//                     </div>
          
//                       ),
//                       status: "Corporate",
//                       value: corporate.toString(),
//                     },
//                   ]}
//       />,
//       true
//     );
//     setTimeout(() => {
//       const bankdetailsId = document.getElementById("TotalOrders");

//       const handleMouseOut = (e: MouseEvent) => {
//         const mouseX = e.clientX;
//         const mouseY = e.clientY;

//         const boundingBox = bankdetailsId?.getBoundingClientRect();
//         const MX = (e.target as HTMLElement).getBoundingClientRect();
//         const targetY = MX.y;
//         const targetHeight = MX.height;

//         const x = boundingBox?.x;
//         const y = boundingBox?.y;
//         const width = boundingBox?.width;
//         const height = boundingBox?.height;

//         if (targetY && targetHeight && x && y && width && height) {

//           const endHeight = targetY + targetHeight;
//           const endWidth = x + width;
//           if ((x < mouseX && mouseX < endWidth && y < mouseY && mouseY < endHeight)) {

//             setTimeout(() => closeContext("TotalOrders"), 2)
//           }
//         }

//         console.log(`X: ${x}, Y: ${y}, Width: ${width}, Height: ${height}`);
//       };

//       bankdetailsId?.addEventListener("mouseout", handleMouseOut);

//       return () => {
//         bankdetailsId?.removeEventListener("mouseout", handleMouseOut);
//       };
//     }, 30);

//   }, [institutionalCount, corporateCount,data]);
//   return (
//     <div
//       onMouseOver={(e) => {
//         displayContext(e, "TotalTenders", "vertical", "center");
//       }}

//       onMouseOut={(e) => {
//         closeContext("TotalTenders")

//       }}
//     // onMouseOut={() => {
//     //   closeContext("TotalOrders");
//     // }}
//     >
//       <DsInfoDisplay
//         detailOf="TotalTenders"

//         className={styles.totalorder}
//       >{totalTenders}</DsInfoDisplay>
//     </div>
//   );
// });
// export default DsTotalOrders;