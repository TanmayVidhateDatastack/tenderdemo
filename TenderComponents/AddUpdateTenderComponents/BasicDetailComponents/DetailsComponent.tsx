// import { useEffect, useState } from "react";
// import DsDepositeDocuments, { DepositDocument } from "./DsDepositeDocuments";
// import fetchData from "@/helpers/Method/fetchData";
// import { getAllMetaData } from "@/helpers/constant";
// import DsApplicableConditions from "./DsApplicableConditions";
// import { DsSelectOption } from "@/helpers/types";
 
// interface MetadataItem {
//   depositeDocument: DepositDocument[];
//   applicableDeposits: DsSelectOption[];
//   applicableSupplyConditions: DsSelectOption[];
// }
 
// const DetailsComponent: React.FC = () => {
//   const [depositeDocument, setDepositeDocuments] = useState<DepositDocument[]>(
//     []
//   );
//   const [applicableDocuments, setApplicableDocuments] = useState<
//     DsSelectOption[]
//   >([]);
//   const [applicableSupplyConditions, setApplicableSupplyConditions] = useState<
//     DsSelectOption[]
//   >([]);
//   const [metadata, setMetadata] = useState<MetadataItem[]>([]);
 
//   const handleFetch = async () => {
//     try {
//       await fetchData({ url: getAllMetaData }).then((res) => {
//         if ((res.code = 200)) {
//           setMetadata(res.result);
//         } else {
//           console.error(
//             "Error fetching data: ",
//             res.message || "Unknown error"
//           );
//         }
//       });
//     } catch (error) {
//       console.error("Fetch error: ", error);
//     }
//   };
 
//   useEffect(() => {
//     handleFetch();
//   }, []);
 
//   useEffect(() => {
//     // console.log("metadata : ", metadata);
//     if (metadata.length > 0 && metadata[0]?.depositeDocument) {
//       setDepositeDocuments(metadata[0].depositeDocument);
//       setApplicableDocuments(metadata[0].applicableDeposits);
//       setApplicableSupplyConditions(metadata[0].applicableSupplyConditions);
//     }
//   }, [metadata]);
 
//   return (
//     <>
//       <div>
//         <DsDepositeDocuments
//           setDepositeDocuments={(docs) => {
//             setDepositeDocuments(docs);
//           }}
//           depositeDocument={depositeDocument}
//           applicableDeposits={applicableDocuments}
//         />
//       </div>
//       <div>
//         <DsApplicableConditions
//           applicableConditions={applicableSupplyConditions}
//         />
//       </div>
//     </>
//   );
// };
 
// export default DetailsComponent;
 
   