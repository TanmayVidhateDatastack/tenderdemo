"use client";
import { useContext, useEffect, useState } from "react";
import styles from "./document.module.css";
import DocumentSelector from "@/Elements/DsComponents/dsDocumentSelector/dsDocumentSelector";
import { DocumentContext, DocumentType } from "./DocumentsContextProvider";
import { useTenderData } from "../TenderDataContextProvider";
import { downloadDocumentUrl } from "@/Common/helpers/constant";
// import { documents } from "@/Common/helpers/types"; // ✅ Import correct type

const DocumentSelectorArea: React.FC = () => {
  const documentContext = useContext(DocumentContext);
  if (!documentContext) {
    throw new Error(
      "DocumentSelectorArea must be used within a DocumentContext"
    );
  }

  const { documentData } = documentContext;

  const { metaData, tenderData } = useTenderData();

  const handleRemoveDocument = (documentName: string) => {
    if (!documentContext) return;

    // ✅ Remove document from context
    documentContext.setDocumentData((prevData) =>
      prevData
        .map((group) => ({ 
          ...group, 
          documents: group.documents.filter(
            (d) => d.document.documentName !== documentName
          ),
        }))
        .filter((group) => group.documents.length > 0)
    );

    // ✅ Remove from selectedDocuments & force update
    documentContext.setSelectedDocuments((prev) => {
      const updatedSelection = prev.filter(
        (d) => d.document.documentName !== documentName
      );
      return updatedSelection;
    });
  };

  // const handleRemoveDocument = (documentName: string) => {
  //   if (!documentContext) return;

  //   console.log(" Removing document:", documentName);

  //   //  Step 1: Update documentData functionally
  //   documentContext.setDocumentData((prevData) => {
  //     console.log(" Before Remove - documentData:", prevData);

  //     const updatedData = prevData
  //       .map((group) => ({
  //         ...group,
  //         documents: group.documents.filter(
  //           (d) => d.document.documentName !== documentName
  //         ),
  //       }))
  //       .filter((group) => group.documents.length > 0); // Remove groups with no documents

  //     console.log(" After Remove - documentData:", updatedData);
  //     return updatedData;
  //   });

  //   //  Step 2: Update selectedDocuments functionally
  //   documentContext.setSelectedDocuments((prevSelected) => {
  //     const updatedSelection = prevSelected.filter(
  //       (d) => d.document.documentName !== documentName
  //     );

  //     console.log("Updated selectedDocuments:", updatedSelection);
  //     return updatedSelection;
  //   });
  // };



  const [totalSelectedDocuments, setTotalSelectedDocuments] = useState(0);
  const [title, setTitle] = useState({});
  const [updatedDocumentsData, setUpdatedDocumentData] = useState<DocumentType[]>([]);

  useEffect(() => {
    setUpdatedDocumentData(documentData);
  }, [documentData]);

  useEffect(() => {
    console.log("Document Data Updated:", documentData); // Debugging Log
    const totalCount = documentData.reduce(
      (acc, { documents }) => acc + documents.length,
      0
    );
    setTotalSelectedDocuments(totalCount);
  }, [documentData]); // Runs whenever documentData changes

  useEffect(() => {
    if (metaData.tenderDocument) {
      const labelMap = {};

      documentData.forEach(({ type }) => {
        const typeDescription = metaData.tenderDocument.find(item => item.value === type);
        if (typeDescription) {
          labelMap[type] = typeDescription.label;
        }
      });
      setTitle(labelMap);
    }
  }, [documentData, metaData.tenderDocument]);



  const handleDownloadDocument = (type, docId) => {
    const doc = tenderData.tenderDocuments?.find(
      (x) =>
        x.documentCategory === "TENDER_DOCUMENT" &&
        x.documentType === type &&
        x.documentId === docId
    );

    if (!doc) {
      console.log("Document not found for ID:", docId);
      return;
    }

    // return { fileDownloadHref: downloadDocumentUrl(tenderData.id, doc.id) };

    const fileDownloadHref = downloadDocumentUrl(tenderData.id, doc.id);

    const link = document.createElement("a");
    link.href = fileDownloadHref;
    link.download = doc.documentName || `Document_${doc.id}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  // const handleDownloadDocument = (type, e) => {
  //   const target = e.target.value;
  //   console.log("e target :", e); // Debugging Log
  //   const documentsToDownload =
  //     tenderData.tenderDocuments?.filter(
  //       (x) =>
  //         x.documentCategory === "TENDER_DOCUMENT" &&
  //         x.documentType === type
  //     ).map((x) => {
  //       return {
  //         ...x,
  //         fileDownloadHref: downloadDocumentUrl(tenderData.id, x.id),
  //       };
  //     }) || [];

  //   console.log("Documents to Download:", documentsToDownload);

  //   // Programmatically trigger downloads
  //   documentsToDownload.forEach((doc) => {
  //     const link = document.createElement("a");
  //     link.href = doc.fileDownloadHref;
  //     link.download = doc.documentName || `Document_${doc.documentId}`; // fallback filename
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //   });
  // };



  return (
    <>
      {documentData.map(({ type, documents }) =>
        documents.length > 0 ? (
          <div key={type} className={styles.documentsDivs}>
            <DocumentSelector
              headerTitle={title[type] || type}
              headerNumber={documents.length.toString()}
              initialDocuments={documents.map((x) => x.document.documentName)}
              handleOnRemoveClick={(docName) => handleRemoveDocument(docName)}
              // onClick={(docName) => {
              //   const docObj = documents.find((x) => x.document.documentName === docName);
              //   if (!docObj) return;

              //   handleDownloadDocument(type, docObj.document.documentId);
              // }}
              onClick={(docName) => {
                const match = documents.find(
                  (x) => x.document.documentName === docName
                );
                if (!match) return;
                handleDownloadDocument(type, match.document.documentId);
              }}
            />
          </div>
        ) : null
      )}

      {/*{updatedDocumentsData.map(({ type, documents }) =>
        documents.length > 0 ? (
          <div key={`${type}-${documents.map(d => d.document.documentName).join('-')}`} className={styles.documentsDivs}>
            <DocumentSelector
              key={`${type}-${documents.map(d => d.document.documentName).join('-')}`}
              headerTitle={title[type] || type}
              headerNumber={documents.length.toString()}
              initialDocuments={documents.map((x) => x.document.documentName)}
              handleOnRemoveClick={(docName) => handleRemoveDocument(docName)}
              onClick={(docName) => {
                const match = documents.find(
                  (x) => x.document.documentName === docName
                );
                if (!match) return;
                handleDownloadDocument(type, match.document.documentId);
              }}
            />
          </div>
        ) : null
      )}*/}

    </>
  );
};

export default DocumentSelectorArea;
