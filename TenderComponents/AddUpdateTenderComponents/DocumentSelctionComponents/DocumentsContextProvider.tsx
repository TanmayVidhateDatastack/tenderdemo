import React, { createContext, useState, ReactNode, Dispatch, SetStateAction, useEffect } from "react";
import { TenderDocument, updateDocuments, useTenderData } from "../TenderDataContextProvider";

export interface Document {
  document: TenderDocument;
  isVisible: boolean;
}

interface DocumentType {
  type: string;
  documents: Document[];
}

interface DocumentContextType {
  documentData: DocumentType[];
  setDocumentData: Dispatch<SetStateAction<DocumentType[]>>;
  selectedDocuments: Document[];
  setSelectedDocuments: Dispatch<SetStateAction<Document[]>>;
  totalSelectedDocuments: number;
  toggleDocumentVisibility: (type: string, documentName: string) => void;
}
export interface DocumentSelectorProps {
  headerTitle: string;
  headerNumber: string;
  initialDocuments: Document[];
  handleOnRemoveClick?: (doc: string) => void;
}
export const DocumentContext = createContext<DocumentContextType | undefined>(undefined);

interface DocumentProviderProps {
  children: ReactNode;
}

export const DocumentProvider: React.FC<DocumentProviderProps> = ({ children }) => {
  const [documentData, setDocumentData] = useState<DocumentType[]>([]);
  const [selectedDocuments, setSelectedDocuments] = useState<Document[]>([]);
  const [totalSelectedDocuments, setTotalSelectedDocuments] = useState(0);
  const { tenderData, removeTenderDocument,
    addNewTenderDocument } = useTenderData();
  const toggleDocumentVisibility = (type: string, documentName: string) => {
    setDocumentData((prevData) =>
      prevData.map((docType) =>
        docType.type === type
          ? {
            ...docType,
            documents: docType.documents.map((doc) =>
              doc.document.documentName === documentName ? { ...doc, isVisible: !doc.isVisible } : doc
            ),
          }
          : docType
      )
    );
  };
  // ✅ Automatically remove deselected documents from selectedDocuments
  useEffect(() => {
    setSelectedDocuments((prevSelected) =>
      prevSelected.filter((doc) =>
        documentData.some((group) =>
          group.documents.some((d) => d.document.documentName === doc.document.documentName)
        )
      )
    );
  }, [documentData]);

  // ✅ Update totalSelectedDocuments count when documentData changes
  useEffect(() => {
    const totalCount = documentData.reduce((acc, { documents }) => acc + documents.length, 0);
    setTotalSelectedDocuments(totalCount);
    const types = Array.from(new Set(documentData.map((x) => x.type)));
    types.forEach((documentType) => {
      const typeDocuments =
        tenderData.tenderDocuments?.filter(

          (x) =>
            x.documentCategory == "TENDER_DOCUMENT" &&
            x.documentType == documentType
          // x.documentType == "FDA_DOCUMENT"
          // Object.keys(groupedDocuments).includes(x.documentType)
        ) || [];
      const document = documentData.filter((doc) => doc.type === documentType).flatMap((doc) => doc.documents.map((d) => { return { ...d.document, id: d.document.documentId } }));
      updateDocuments(
        document,
        typeDocuments,
        removeTenderDocument,
        addNewTenderDocument,
        // type + "_TENDER_DOCUMENT",
        // "FDA_DOCUMENT",
        documentType,
        "TENDER_DOCUMENT"
      );
    });
  }, [documentData]);

  useEffect(() => {
    // console.log("Context Updated SelectedDocuments:", selectedDocuments);
  }, [selectedDocuments]); // ✅ Debugging

  //fetch documents from the server
  useEffect(() => {
    if (tenderData.tenderDocuments) {
      // Group documents by type
      const groupedDocuments = tenderData.tenderDocuments.reduce((acc: DocumentType[], doc) => {
        // Filter out documents that are type "TENDER_DOCUMENT"
        const { documentType } = doc;
        if (doc.documentCategory !== "TENDER_DOCUMENT") return acc;
        // Check if the document type already exists in the accumulator
        const existingGroup = acc.find((group) => group.type === documentType);
        if (existingGroup) {
          // If it exists, push the document to the existing group's documents array
          existingGroup.documents.push({ document: doc, isVisible: true });
        } else {
          // If it doesn't exist, create a new group and add the document
          acc.push({ type: documentType, documents: [{ document: doc, isVisible: true }] });
        }
        //return the accumulator with the new document
        return acc;
      }, []);
      setDocumentData(groupedDocuments);
    }
  }, [tenderData.tenderDocuments]);
 

  const contextValue: DocumentContextType = {
    totalSelectedDocuments,
    documentData,
    setDocumentData,
    selectedDocuments,
    setSelectedDocuments,
    toggleDocumentVisibility,
  };
  return <DocumentContext.Provider value={contextValue}>{children}</DocumentContext.Provider>;
};
export default DocumentProvider;
