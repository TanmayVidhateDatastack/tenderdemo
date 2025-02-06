import { useEffect, useState } from "react";
import DsDepositeDocuments, { DepositDocument } from "./DsDepositeDocuments";
import fetchData from "@/helpers/Method/fetchData";
import { getAllMetaData } from "@/helpers/constant";
import DsApplicableConditions from "./DsApplicableConditions";

// interface DepositeDocument {
//   value: string;
//   label: string;
// }

interface MetadataItem {
  depositeDocument: DepositDocument[];
}

const DsBasicDetails: React.FC = () => {
  const [depositeDocument, setDepositeDocuments] = useState<DepositDocument[]>(
    []
  );
  const [metadata, setMetadata] = useState<MetadataItem[]>([]); // Correct type

  const handleFetch = async () => {
    try {
      await fetchData({ url: getAllMetaData }).then((res) => {
        if ((res.code = 200)) {
          setMetadata(res.result);
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
    if (metadata.length > 0 && metadata[0]?.depositeDocument) {
      setDepositeDocuments(metadata[0].depositeDocument);
    }
  }, [metadata]);

  return (
    <>
      <div>
        <DsDepositeDocuments
          setDepositeDocuments={(docs) => {
            setDepositeDocuments(docs);
          }}
          depositeDocument={depositeDocument}
        />
      </div>
      <div>
        <DsApplicableConditions />
      </div>
    </>
  );
};

export default DsBasicDetails;
