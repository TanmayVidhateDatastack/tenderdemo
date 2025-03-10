import { useEffect, useState } from "react";
import { getAllMetaData, searchCustomerURL } from "@/helpers/constant";
import fetchData from "@/helpers/Method/fetchData";
import { tenderDetails,applierSupplierDetails,supplyDetails, DsSelectOption} from "../../../helpers/types";
import DsDepositeDocuments, { DepositDocument } from "./DsDepositeDocuments";
import DsApplicableConditions from "./DsApplicableConditions";
import styles from "@/app/Tender/[TenderId]/tenderOrder.module.css"
import DsApplierSupplierDetails from "./DsApplierSupplierDetails ";
import DsSupplyDetails from "./DsSupplyDetails ";
import DsTenderDetails from "./DsTenderDetails ";

 
const DsBasicDetails =() => {
  const [tenderDetails, setTenderDetails] = useState<tenderDetails>({
    tenderType: [],
    submissionMode: [],
  });
  const [applierSupplierDetails, setApplierSupplierDetails] =
    useState<applierSupplierDetails>({
      appliedBy: [],
      suppliedBy: [],
      depot: [],
    });
  const [supplyDetails, setSupplyDetails] = useState<supplyDetails>({
    supplyPoints: [],
    reportRequirements: [],
    eligibility: [],
  });
 
  //Arun
  interface MetadataItem {
    depositeDocument: DepositDocument[];
    applicableDeposits: DsSelectOption[];
    applicableSupplyConditions: DsSelectOption[];
  }
 
    const [depositeDocument, setDepositeDocuments] = useState<DepositDocument[]>(
      []
    );
    const [applicableDocuments, setApplicableDocuments] = useState<
      DsSelectOption[]
    >([]);
    const [applicableSupplyConditions, setApplicableSupplyConditions] = useState<
      DsSelectOption[]
    >([]);
    const [metadata, setMetadata] = useState<MetadataItem[]>([]);
 
  const handleFetch = async () => {
    try {
      await fetchData({ url: getAllMetaData }).then((res) => {
        if ((res.code = 200)) {
          setMetadata(res.result);
          setTenderDetails(res.result[0].tenderDetails[0]);
          setApplierSupplierDetails(res.result[0].applierSupplierDetails[0]);
          setSupplyDetails(res.result[0].supplyConditions[0]);
        } else {
          console.error(
            "Error fetching data: ",
            res.message || "Unknown error"
          );
        }
      });
    } catch (error) {
      console.error("Fetch error: ", error);
    }
  };
  useEffect(() => {
    handleFetch();
  }, []);
 
  useEffect(() => {
    // console.log("metadata : ", metadata);
    if (metadata.length > 0 && metadata[0]?.depositeDocument) {
      setDepositeDocuments(metadata[0].depositeDocument);
      setApplicableDocuments(metadata[0].applicableDeposits);
      setApplicableSupplyConditions(metadata[0].applicableSupplyConditions);
    }
  }, [metadata]);
 
  return (
    <>  
        <div>
           <DsTenderDetails tenderDetails={tenderDetails}/>
        </div>
        <span className={styles.Seperator}>
        </span>
        <div>
          <DsApplierSupplierDetails
            applierSupplierDetails={applierSupplierDetails}/>
        </div>
        <span className={styles.Seperator}>
        </span>
        <div>
          <DsDepositeDocuments  
            setDepositeDocuments={(docs) => {
              setDepositeDocuments(docs);
            }}
            depositeDocument={depositeDocument}
            applicableDeposits={applicableDocuments}/>
        </div>
        <span className={styles.Seperator}>
        </span>
        <div>  
          <DsSupplyDetails supplyDetails={supplyDetails} />
        </div>
        <span className={styles.Seperator}>
        </span>
        <div >
          <DsApplicableConditions
            applicableConditions={applicableSupplyConditions}/>
        </div>
     
    </>
  );
};
export default DsBasicDetails;
 