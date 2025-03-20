import { useEffect, useState } from "react";
import { getAllMetaData, searchCustomerURL } from "@/helpers/constant";
import fetchData from "@/helpers/Method/fetchData";
import { tenderDetails,applierSupplierDetails,supplyDetails, DsSelectOption} from "../../../helpers/types";
import PaneOpenButton from "@/Elements/DsComponents/DsPane/PaneOpenButton";
import DocumentSelector from "@/Elements/DsComponents/dsDocumentSelector/dsDocumentSelector";
import styles from "./document.module.css";
import DsTabButton from "@/Elements/DsComponents/DsButtons/dsTabButton";
import Documents from "./DsDocumentSelectionArea";

const DsDocumentSelection =() => {
 
  return (
    <>   
    <div className={styles.docs}> 
      <DsTabButton className={styles.btn} count="09" label="Selected Documents" ></DsTabButton>
        <PaneOpenButton className={styles.pane} id="document" paneId="h" label="Add Documents" />
    </div>
    {/* <DocumentSelector headerTitle={"FDA Documents"} headerNumber={"09"} initialDocuments={[""]}/>  */}
    {/* <Documents></Documents> */}
    
    </>
  );
};
export default DsDocumentSelection;  