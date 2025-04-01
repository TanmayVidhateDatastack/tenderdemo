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

const DsAddTenderDocumentPane: React.FC = () => {
  const [openAccordion, setOpenAccordion] = useState<string | null |number>(null);
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

  const handleAccordionToggle = (type: string | number) => {
    setOpenAccordion((prevType) => (prevType === type ? null : type));
  };

  const handleCheckboxChange = (doc: documents) => {
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
        contextDoc.documents.some((d) => d.documentName === doc.documentName)
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
            documentName: string;
            isVisible: boolean;
            documentPath: string;
          }[];
        }[] = [...prevData]; // Explicit type declaration

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

        // Remove documents that are not in selectedDocuments
        updatedData = updatedData.map((group) => {
          return {
            ...group,
            documents: group.documents.filter((doc) =>
              selectedDocuments.some((selectedDoc) =>
                selectedDoc.documentName === doc.documentName && selectedDoc.type === group.type
              )
            ),
          };
        }).filter(group => group.documents.length > 0);

        console.log("Updated Document Context:", updatedData); 

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
                  id={doc.id.toString()}
                  name={doc.documentName} 
                  value={doc.id.toString()}
                  label={doc.documentName}
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