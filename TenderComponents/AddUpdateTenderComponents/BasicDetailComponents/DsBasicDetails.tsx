import { useEffect, useState } from "react";
import DsTenderDetails from "./DsTenderDetails";
import { getAllMetaData, searchCustomerURL } from "@/helpers/constant";
import fetchData from "@/helpers/Method/fetchData";
import {
  tenderDetails,
  applierSupplierDetails,
  supplyDetails,
} from "../../../helpers/types";
import DsApplierSupplierDetails from "./DsApplierSupplierDetails";
import DsSupplyDetails from "./DsSupplyDetails";
import PaneOpenButton from "@/Elements/DsComponents/DsPane/PaneOpenButton";

const DsBasicDetails: React.FC = () => {
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

  const handleFetch = async () => {
    try {
      await fetchData({ url: getAllMetaData }).then((res) => {
        if ((res.code = 200)) {
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

  return (
    <>
      <DsTenderDetails tenderDetails={tenderDetails} />
      <div>
        <DsApplierSupplierDetails
          applierSupplierDetails={applierSupplierDetails}    
        />
      </div>
      <div>
        <DsSupplyDetails supplyDetails={supplyDetails} />
      </div>
    </>
  );
};

export default DsBasicDetails;
