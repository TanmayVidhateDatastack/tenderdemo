import { useContext, useEffect, useState } from "react";
import Accordion from "@/Elements/DsComponents/dsAccordion/accordion";
import Ds_checkbox from "@/Elements/DsComponents/DsCheckbox/dsCheckbox";
import DsButton from "@/Elements/DsComponents/DsButtons/dsButton";
import styles from "./document.module.css";
import DsDataList from "@/Elements/DsComponents/DsInputs/dsDatalist";
import Image from "next/image";
import search from "@/Common/TenderIcons/searchicon.svg"
import fetchData from "@/Common/helpers/Method/fetchData";
import { documents } from "@/Common/helpers/types";
import { DocumentContext } from "./DocumentsContextProvider";
import { getAllDocuments } from "@/Common/helpers/constant";
import buttonstyle from "@/Elements/DsComponents/DsButtons/dsButton.module.css"
import { TenderDocument } from "../TenderDataContextProvider";
import { tenderDocument } from "../BasicDetailComponents/DsFeesDocument";

const DsAddTenderDocumentPane: React.FC = () => {
  const [openAccordion, setOpenAccordion] = useState<string | null |number>(null);
  const [groupedDocuments, setGroupedDocuments] = useState<Record<string, TenderDocument[]>>({});
  const [selectedDocuments, setSelectedDocuments] = useState<TenderDocument[]>([]);
                                                                                       
  const documentContext = useContext(DocumentContext);

  useEffect(() => {
    handleFetch();
  }, []);

  const handleFetch = async () => {
    try {
      const res = await fetchData({ url: getAllDocuments });
      if (res.code === 200) {
        const tenderDocuments = res.result.Documents.filter(
          (doc: TenderDocument) => doc.category === "TenderDocument"
        );

        const grouped = tenderDocuments.reduce(
          (acc: Record<string, TenderDocument[]>, doc: TenderDocument) => {
            if (!acc[doc.documentType]) {
              acc[doc.documentType] = []; 
            }
            acc[doc.documentType].push(doc);
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

  const handleAccordionToggle = (type: string | number) => {
    setOpenAccordion((prevType) => (prevType === type ? null : type));
  };

  const handleCheckboxChange = (doc: TenderDocument) => {
    setSelectedDocuments((prev) => {
      const alreadySelected = prev.some((d) => d.id === doc.id);

      const updatedSelection = alreadySelected
        ? prev.filter((d) => d.id !== doc.id)
        : [...prev, doc];

      // console.log("Updated selectedDocuments:", updatedSelection);

      return updatedSelection;
    });
  };



  useEffect(() => {
    if (!documentContext || !documentContext.documentData) return;

    const updatedSelectedDocuments = selectedDocuments.filter((doc) =>
      documentContext.documentData.some((contextDoc) =>
        contextDoc.documents.some((d) => d.document.name === doc.name)
      )
    );

    setSelectedDocuments(updatedSelectedDocuments);



  }, [documentContext]);


  const handledocument = () => {
    if (documentContext) {
      documentContext.setDocumentData((prevData) => {
        let updatedData: {
          type: string;
          documents: {
            document: TenderDocument;
            isVisible: boolean;
          }[];
        }[] = [...prevData]; // Explicit type declaration

        selectedDocuments.forEach((doc) => {
          const existingType = updatedData.find((group) => group.type === doc.documentType);

          if (existingType) {
            if (!existingType.documents.some((d) => d.document.name === doc.name)) {
              existingType.documents.push({
                document: doc,
                isVisible: false,
              });
            }
          } else {
            updatedData.push({
              type: doc.documentType,
              documents: [
                { document: doc, isVisible: false },
              ],
            });
          }
        });

        // Remove documents that are not in selectedDocuments
        updatedData = updatedData.map((group) => {
          return {
            ...group,
            documents: group.documents.filter((doc) =>
              selectedDocuments.some((selectedDoc) =>
                selectedDoc.name === doc.document.name && selectedDoc.documentType === group.type
              )
            ),
          };
        }).filter(group => group.documents.length > 0);

        // console.log("Updated Document Context:", updatedData); 

        return updatedData;
      });
    }
  };


  return (
    <>
      <div className={styles.documentsSelection}>
        <DsDataList
          id="documentOpt"
          dataListId="documents"
          label="Search Document Here"
          iconEnd={<Image src={search} alt="search" />}
          options={[]}
        />
        {Object.entries(groupedDocuments).map(([type, docs]) => (
          <Accordion
            key={type}
            id={type}
            title={type}
            isOpen={openAccordion === type} 
            onToggle={handleAccordionToggle} 
          >
            <div className={styles.documents}>
              {docs.map((doc) => (  
                <Ds_checkbox  
                  className={styles.documentsCkechS}
                  key={doc.id} 
                  id={doc.id?.toString()||doc.name}
                  name={doc.name} 
                  value={doc.id?.toString()||doc.name}
                  label={doc.name}
                  onChange={() => handleCheckboxChange(doc)}  
                  isChecked={selectedDocuments.some((d) => d.id === doc.id)} 
                />
              ))}
            </div>
          </Accordion>
        ))}
          <DsButton buttonViewStyle="btnContained" className={buttonstyle.btnAutoWidth +" "+styles.SaveBtn} label="Save" onClick={handledocument} />
      </div>
    </>
  );
};

export default DsAddTenderDocumentPane;