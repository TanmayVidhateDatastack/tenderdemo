import { useContext, useEffect, useState } from "react";
import styles from "./document.module.css";
import DocumentSelector from "@/Elements/DsComponents/dsDocumentSelector/dsDocumentSelector";
import { DocumentContext } from "./DocumentsContextProvider";
// import { documents } from "@/Common/helpers/types"; // ✅ Import correct type

const DocumentSelectorArea: React.FC = () => {
  const documentContext = useContext(DocumentContext);
  if (!documentContext) {
    throw new Error("DocumentSelectorArea must be used within a DocumentContext");
  }

  const { documentData } = documentContext;

  const handleRemoveDocument = (documentName: string) => {
    if (!documentContext) return;

    // ✅ Remove document from context   
    documentContext.setDocumentData((prevData) =>
      prevData
        .map((group) => ({
          ...group,
          documents: group.documents.filter((d) => d.documentName !== documentName),
        }))
        .filter((group) => group.documents.length > 0)
    );

    // ✅ Remove from selectedDocuments & force update
    documentContext.setSelectedDocuments((prev) => {
      const updatedSelection = prev.filter((d) => d.documentName !== documentName);
      console.log("Updated selectedDocuments:", updatedSelection); // Debugging Log
      return updatedSelection;
    });
  };

  const [totalSelectedDocuments, setTotalSelectedDocuments] = useState(0);

  useEffect(() => {
    const totalCount = documentData.reduce((acc, { documents }) => acc + documents.length, 0);
    setTotalSelectedDocuments(totalCount);
  }, [documentData]); // Runs whenever documentData changes

  useEffect(() => {
    console.log("total selected documents : ", totalSelectedDocuments);
  }, [totalSelectedDocuments]);


  return (
    <>
      {documentData.map(({ type, documents }) =>
        documents.length > 0 ? (
          <div key={type} className={styles.documentsDivs}>
            <DocumentSelector
              headerTitle={type}
              headerNumber={documents.length.toString()}
              initialDocuments={documents.map((doc) => doc.documentName)}
              handleOnRemoveClick={(docName) => handleRemoveDocument(docName)}
            />
          </div>
        ) : null
      )}
       </>

  );
};

export default DocumentSelectorArea;