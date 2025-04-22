import { useEffect, useState } from "react";
import { getAllMetaData, getTenderUserRoles } from "@/Common/helpers/constant";
import fetchData from "@/Common/helpers/Method/fetchData";
import {
  tenderDetails,
  // applierSupplierDetsails,
  supplyDetails,
  DsSelectOption,
} from "@/Common/helpers/types";
import DsDepositeDocuments, { DepositDocument } from "./DsDepositeDocuments";
import styles from "@/app/Tender/[TenderId]/tenderOrder.module.css";
import DsApplierSupplierDetails from "./DsApplierSupplierDetails ";
import DsTenderDetails from "./DsTenderDetails ";
import DsSupplyDetails from "./DsSupplyDetails";
import DsApplicableConditions from "./DsApplicableConditions";

const metaDataTypes = [
  "TENDER_TYPE",
  "SUBMISSION_MODE",
  "SUPPLY_POINT",
  "TEST_REPORT_REQUIREMENT",
  "ELIGIBILITY",
  "FEES_TYPE",
  "TENDER_SUPPLY_CONDITION",
  "PAYMENT_MODE",

];
export interface Deposit {
  paidBy: DsSelectOption[];
}


const DsBasicDetails = () => {
  const [tenderDetails, setTenderDetails] = useState<tenderDetails>({
    tenderType: [],
    submissionMode: [],
  });
  // const [applierSupplierDetails, setApplierSupplierDetails] =
  //   useState<applierSupplierDetails>({
  //     appliedBy: [],
  //     suppliedBy: [],
  //     depot: [],
  //   });
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
 
  const [depositeDocument, setDepositeDocuments] = useState<DepositDocument[]>([]);
  const [applicableDocuments, setApplicableDocuments] = useState<
    DsSelectOption[]
  >([]);
  const [applicableSupplyConditions, setApplicableSupplyConditions] = useState<
    DsSelectOption[]
  >([]);
  const [metadata, setMetadata] = useState<MetadataItem[]>([]);
  const [role, setRole] = useState<string>("");
 
  const handleFetch = async () => {
    try {   
      const res = await fetchData({ url:getAllMetaData,method:"GET",headers:{
        "Content-Type": "application/json",
        "Tender-Codes": JSON.stringify(metaDataTypes), 
      }});
      if (res.code === 200) {
        const result = res.result;
        console.log("GetAllMetaData",result); 
        setMetadata(result);
       
        // Tender Details
        const tenderDetailsData = {
          tenderType: result.tenderType.map((item: any) => ({
            value: item.codeValue,
            label: item.codeDescription,
          })),
          submissionMode: result.submissionMode.map((item: any) => ({
            value: item.codeValue,
            label: item.codeDescription,
          })),
        };
        setTenderDetails(tenderDetailsData);
 
        // ApplierSupplierDetails: Data navin JSON madhye nahiye,
        // Tar mag tyacha nava source ahe ka? Ki static thevaychay? Let me know.
        // Supply Details
 
        const supplyDetailsData = {
          supplyPoints: result.supplyPoint.map((item: any) => ({
            value: item.codeValue,
            label: item.codeDescription,
          })),
          reportRequirements: result.testReportRequirement.map((item: any) => ({
            value: item.codeValue,
            label: item.codeDescription,
          })),
          eligibility: result.eligibility.map((item: any) => ({
            value: item.codeValue,
            label: item.codeDescription,
          })),
        };
        setSupplyDetails(supplyDetailsData);
 
        // Applicable Deposits
        const applicableDeposits = result.feesType.map((item: any) => ({
          value: item.codeValue,
          label: item.codeDescription,
        }));
        setApplicableDocuments(applicableDeposits);
 
        // Applicable Supply Conditions
        const applicableSupplyCond = result.tenderSupplyCondition.map(
          (item: any) => ({
            value: item.codeValue,
            label: item.codeDescription,
          })
        );
        setApplicableSupplyConditions(applicableSupplyCond);
 
        // Deposit Document Modes (Assuming paymentMode == modes)
        const depositDocData = [
          {
            modes: result.paymentMode.map((item: any) => ({
              value: item.codeValue, // Optional: Lowercase if needed
              label: item.codeDescription,
            })),
          },
        ];
        setDepositeDocuments(depositDocData);
      } else {
        console.error("Error fetching data: ", res.message || "Unknown error");
      }
    } catch (error) {
      console.error("Fetch error: ", error);
    }
  };
 
  const handleRoleFetch = async () => {
    try {
      const res = await fetchData({ url: getTenderUserRoles });
      if (res.code === 200) {
        const result = res.result;
        setRole(result.roleName);
        // console.log("result teder role : ", result);
      } else {
        console.error("Error fetching data: ", res.message || "Unknown error");
      }
    } catch (error) {
      console.error("Fetch error: ", error);
    }
  };
 
  useEffect(() => {
    handleFetch();
    handleRoleFetch();
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
        <DsTenderDetails tenderDetails={tenderDetails} />
      </div>
      <span className={styles.Seperator}></span>
      <div>
        <DsApplierSupplierDetails
        />
      </div>
      <span className={styles.Seperator}></span>
      <div>
        <DsDepositeDocuments
          setDepositeDocuments={(docs) => {
            setDepositeDocuments(docs);
          } }
          depositeDocument={depositeDocument}
          applicableDeposits={applicableDocuments}
          role={role}         />
      </div>
      <span className={styles.Seperator}></span>
      <div>
        <DsSupplyDetails supplyDetails={supplyDetails} />  
      </div>
      <span className={styles.Seperator}></span>
      <div>
        <DsApplicableConditions applicableConditions={applicableSupplyConditions}
        />
      </div>
    </>
  );
};
export default DsBasicDetails;
 
 