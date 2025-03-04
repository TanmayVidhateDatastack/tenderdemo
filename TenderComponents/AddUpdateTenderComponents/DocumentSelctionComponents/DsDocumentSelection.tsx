import { useEffect, useState } from "react";
import { getAllMetaData, searchCustomerURL } from "@/helpers/constant";
import fetchData from "@/helpers/Method/fetchData";
import { tenderDetails,applierSupplierDetails,supplyDetails, DsSelectOption} from "../../../helpers/types";
import styles from "@/app/Tender/[TenderId]/tenderOrder.module.css"
import PaneOpenButton from "@/Elements/DsComponents/DsPane/PaneOpenButton";

const DsDocumentSelection =() => {

//   const handleFetch = async () => {
//     try {
//       await fetchData({ url: getAllMetaData }).then((res) => {
//         if ((res.code = 200)) {
//           setMetadata(res.result);
//           setTenderDetails(res.result[0].tenderDetails[0]);
//           setApplierSupplierDetails(res.result[0].applierSupplierDetails[0]);
//           setSupplyDetails(res.result[0].supplyConditions[0]);
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
 
  return (
    <>   
     Selected Documents
    <PaneOpenButton className={styles.pane} id="document" paneId="h" label="Add Documents" />
    </>
  );
};
export default DsDocumentSelection; 