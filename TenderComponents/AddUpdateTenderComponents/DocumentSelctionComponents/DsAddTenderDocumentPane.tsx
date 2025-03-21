import { useContext, useEffect, useState } from "react";
import Accordion from "@/Elements/DsComponents/dsAccordion/accordion";
import Ds_checkbox from "@/Elements/DsComponents/DsCheckbox/dsCheckbox";
import DsButton from "@/Elements/DsComponents/DsButtons/dsButton";
import styles from "./document.module.css";
import fetchData from "@/helpers/Method/fetchData";
import { documents } from "@/helpers/types";
import { getAllDocuments } from "@/helpers/constant";
import { DocumentContext } from "./DocumentsContextProvider";

const DsAddTenderDocumentPane: React.FC = () => {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [groupedDocuments, setGroupedDocuments] = useState<Record<string, documents[]>>({});
  const [selectedDocuments, setSelectedDocuments] = useState<documents[]>([]);

  const documentContext = useContext(DocumentContext);

  useEffect(() => {
    handleFetch();
  }, []);

  const handleFetch = async () => {
    try {
      const res = await fetchData({ url: getAllDocuments });
      if (res.code === 200) {
        const tenderDocuments = res.result.Documents.filter(
          (doc: documents) => doc.category === "TenderDocument"
        );

        const grouped = tenderDocuments.reduce(
          (acc: Record<string, documents[]>, doc: documents) => {
            if (!acc[doc.type]) {
              acc[doc.type] = [];
            }
            acc[doc.type].push(doc);
            return acc;
          },
          {}
        );

        setGroupedDocuments(grouped);
      } else {
        console.error("Error fetching data: ", res.message || "Unknown error");
      }
    } catch (error) {
      console.error("Fetch error: ", error);
    }
  };

  const handleAccordionToggle = (type: string) => {
    setOpenAccordion((prevType) => (prevType === type ? null : type));
  };

  const handleCheckboxChange = (doc: documents) => {
    setSelectedDocuments((prev) => {
      const alreadySelected = prev.some((d) => d.id === doc.id);
      
      const updatedSelection = alreadySelected
        ? prev.filter((d) => d.id !== doc.id) 
        : [...prev, doc]; 
  
      console.log("Updated selectedDocuments:", updatedSelection); 
  
      return updatedSelection;
    });
  };
  
  const handledocument = () => {
    if (documentContext) {
      documentContext.setDocumentData((prevData) => {
        const updatedData = [...prevData];
  
        selectedDocuments.forEach((doc) => {
          const existingType = updatedData.find((group) => group.type === doc.type);
          if (existingType) {
            if (!existingType.documents.some((d) => d.documentName === doc.documentName)) {
              existingType.documents.push({
                documentName: doc.documentName,
                isVisible: false,
                documentPath: doc.documentPath || "",
              });
            }
          } else {
            updatedData.push({
              type: doc.type,
              documents: [
                { documentName: doc.documentName, isVisible: false, documentPath: doc.documentPath || "" },
              ],
            });
          }
        });
  
        console.log("Updated Document Context:", updatedData); // ✅ Debugging output
  
        return updatedData;
      });
    }
  };
  
  return (
    <>
      <div className={styles.padd}>
        {Object.entries(groupedDocuments).map(([type, docs]) => (
          <Accordion
            key={type}
            id={type}
            title={type}
            isOpen={openAccordion === type}
            onToggle={handleAccordionToggle} // ✅ Corrected function call
          >
            <div className={styles.documents}>
              {docs.map((doc) => (
                <Ds_checkbox
                key={doc.id}
                id={doc.id.toString()}
                name={doc.documentName}
                value={doc.id.toString()}
                label={doc.documentName}
                onChange={() => handleCheckboxChange(doc)}
                isChecked={selectedDocuments.some((d) => d.id === doc.id)} // ✅ Fix
               />
              ))}
            </div>
          </Accordion>
        ))}
        <div className={styles.SaveBtn}>
          <DsButton className={styles.savebtn} label="Save" onClick={handledocument} />
        </div>
      </div>
    </>
  );
};

export default DsAddTenderDocumentPane;
