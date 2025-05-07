import React, { createContext, useState, ReactNode, Dispatch, SetStateAction, useEffect } from "react";
import { TenderDocument } from "../TenderDataContextProvider";

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
  }, [documentData]);

  useEffect(() => {
    // console.log("Context Updated SelectedDocuments:", selectedDocuments);
  }, [selectedDocuments]); // ✅ Debugging


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
