"use client";
import { use, useContext, useEffect, useState } from "react";
import Accordion from "@/Elements/DsComponents/dsAccordion/accordion";
import Ds_checkbox from "@/Elements/DsComponents/DsCheckbox/dsCheckbox";
import DsButton from "@/Elements/DsComponents/DsButtons/dsButton";
import styles from "./document.module.css";
import DsDataList from "@/Elements/DsComponents/DsInputs/dsDatalist";
import Image from "next/image";
import search from "@/Common/TenderIcons/searchicon.svg"
import fetchData from "@/Common/helpers/Method/fetchData";
import { DocumentContext } from "./DocumentsContextProvider";
import { getTenderTabsDocuments } from "@/Common/helpers/constant";
import buttonstyle from "@/Elements/DsComponents/DsButtons/dsButton.module.css"
import { TenderDocument, useTenderData } from "../TenderDataContextProvider";
import { ClosePane } from "@/Elements/DsComponents/DsPane/DsPane";
import { showToaster } from "@/Elements/DsComponents/DsToaster/DsToaster";


class ActionStatus {
  notiType: "success" | "bonus" | "info" | "error" | "cross" = "success";
  notiMsg: string | React.ReactNode = "";
  showNotification: boolean = false;
  isOkayButtonVisible?: boolean = false;
}

const DsAddTenderDocumentPane: React.FC = () => {
  const [openAccordion, setOpenAccordion] = useState<string | null | number>(null);
  const [groupedDocuments, setGroupedDocuments] = useState<Record<string, TenderDocument[]>>({});
  const [selectedDocuments, setSelectedDocuments] = useState<TenderDocument[]>([]);
  const [filterDocuments, setFilterDocuments] = useState(groupedDocuments);
  const [searchText, setSearchText] = useState("");
  const [title, setTitle] = useState({});


  // const [isApplyDisabled, setIsApplyDisabled] = useState(true);

  const {
    metaData,
    setActionStatusValues
  } = useTenderData();

  const documentContext = useContext(DocumentContext);

  useEffect(() => {
    handleFetch();
  }, []);

  const handleFetch = async () => {
    try {
      const res = await fetchData({ url: getTenderTabsDocuments });
      if (res.code === 200) {
        const tenderDocuments = res.result.filter(
          (doc: TenderDocument) => doc.documentCategory === "TENDER_DOCUMENT"//doc.documentType === "TENDER_DOCUMENT" to doc.documentCategory === "TENDER_DOCUMENT"
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
        documentContext?.setFetchedDocuments(grouped);

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
        contextDoc.documents.some((d) => d.document.documentName === doc.documentName)
      )
    );

    setSelectedDocuments(updatedSelectedDocuments);

    const groupedDocs = Object.values(filterDocuments).flat();
    // console.log("Flat Grouped Docs:", groupedDocs);

    const contextDocs = documentContext?.documentData?.flatMap(cd => cd.documents) || [];
    // console.log("Context Docs:", contextDocs);

    const updatedGroupedDocuments = groupedDocs.filter((doc) =>
      contextDocs.some((d) => {
        // console.log(`Comparing context id ${d.document.id} with doc id ${doc.id}`);
        return d.document.documentId === doc.id;
      })
    );

    // console.log("Updated Grouped Documents:", updatedGroupedDocuments);

    setSelectedDocuments(updatedGroupedDocuments);

  }, [documentContext]);




  const handledocument = () => {
    if (searchText.length > 0) {
      setSearchText("");
    }
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
            if (!existingType.documents.some((d) => d.document.documentName === doc.documentName)) {

              const newdocs = {
                documentName: doc.documentName,
                documentType: doc.documentType,
                documentCategory: "TENDER_DOCUMENT",
                id: 0,
                documentId: doc?.id,
                isVisible: false,
              } as TenderDocument;

              existingType.documents.push({
                document: newdocs,
                isVisible: false,
              });
            }
          } else {
            //manually modified for tender document
            const newdocs = {
              documentName: doc.documentName,
              documentType: doc.documentType,
              documentCategory: "TENDER_DOCUMENT",
              id: 0,
              documentId: doc?.id,
              isVisible: false,
            } as TenderDocument;

            // console.log("New Document:", newdocs);

            updatedData.push({
              type: doc.documentType,
              documents: [
                { document: newdocs, isVisible: false },
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
                selectedDoc.documentName === doc.document.documentName && selectedDoc.documentType === group.type
              )
            ),
          };
        }).filter(group => group.documents.length > 0);
        // console.log("Updated Document Context:", updatedData); 
        if (updatedData.length > 0) {
          setActionStatusValues({
            notiMsg: "The documents has been successfully added",
            notiType: "success",
            showNotification: true,
          });
          showToaster("create-order-toaster");
        }
        return updatedData;

      });

    }

  };

  useEffect(() => {
    if (groupedDocuments) {
      // console.log("Grouped Documents:", groupedDocuments);
      setFilterDocuments(groupedDocuments);
    }

  }, [groupedDocuments]);

  const handleSearch = (text: string) => {
    setSearchText(text); // Store search text

    if (!text.trim()) {
      // Show all documents if search is empty
      setFilterDocuments(groupedDocuments);
      return;
    }

    const filteredDocs = {};

    Object.entries(groupedDocuments).forEach(([type, docs]) => {
      const matchingDocs = docs.filter((doc) =>
        doc.documentName.toLowerCase().includes(text.toLowerCase())
      );
      if (matchingDocs.length > 0) {
        filteredDocs[type] = matchingDocs;
      }
    });

    setFilterDocuments(filteredDocs);

    // auto-open the only matching accordion
    if (Object.keys(filteredDocs).length === 1) {
      setOpenAccordion(Object.keys(filteredDocs)[0]);
    }
  };

  useEffect(() => {
    if (metaData.tenderDocument) {
      const labelMap = {};
      Object.entries(filterDocuments).forEach(([type]) => {
        const typeDescription = metaData.tenderDocument.find(item => item.value === type);
        if (typeDescription) {
          labelMap[type] = typeDescription.label;
        }
      });
      setTitle(labelMap);
    }
  }, [metaData.tenderDocument]);

  return (
    <>
      <div className={styles.documentsSelection}>
        <DsDataList
          id="documentOpt"
          dataListId="documents"
          label="Search Document Here"
          iconEnd={<Image src={search} alt="search" />}
          options={[]}
          onChange={(e) => handleSearch(e?.target.value||"")}
          className={styles.searchDocument}
        />
        {Object.entries(filterDocuments).map(([type, docs]) => (
          <Accordion
            key={type}
            id={type}
            title={title[type] || type}
            isOpen={openAccordion === type}
            onToggle={handleAccordionToggle}
          >
            <div className={styles.documents}>
              {docs.map((doc) => (
                <Ds_checkbox
                  className={styles.documentsCkechS}
                  key={doc.id}
                  id={doc.id?.toString() || doc.documentName}
                  name={doc.documentName}
                  value={doc.id?.toString() || doc.documentName}
                  label={doc.documentName}
                  onChange={() => handleCheckboxChange(doc)}
                  isChecked={selectedDocuments.some((d) => d.id === doc.id)}
                // isChecked={selectedDocuments.some((d) => d.id === doc.documentId)}

                />
              ))}
            </div>
          </Accordion>
        ))}
        <DsButton
          buttonViewStyle="btnContained"
          className={buttonstyle.btnAutoWidth + " " + styles.SaveBtn}
          label="Save"
          onClick={(e) => {
            handledocument();
            ClosePane(e);
            // setSearchText("ABC"); // Clear search text
            // console.log(" Search text:", searchText);
          }}
        />
      </div>
    </>
  );
};

export default DsAddTenderDocumentPane;