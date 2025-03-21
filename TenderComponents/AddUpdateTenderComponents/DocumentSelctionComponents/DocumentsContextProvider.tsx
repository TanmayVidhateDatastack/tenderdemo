import React, { createContext, useState, ReactNode, Dispatch, SetStateAction, useEffect } from "react";

interface Document {
  documentName: string;
  isVisible: boolean;
  documentPath: string;
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
  toggleDocumentVisibility: (type: string, documentName: string) => void;
}

export const DocumentContext = createContext<DocumentContextType | undefined>(undefined);

interface DocumentProviderProps {
  children: ReactNode;
}

export const DocumentProvider: React.FC<DocumentProviderProps> = ({ children }) => {
  const [documentData, setDocumentData] = useState<DocumentType[]>([]);
  const [selectedDocuments, setSelectedDocuments] = useState<Document[]>([]);

  const toggleDocumentVisibility = (type: string, documentName: string) => {
    setDocumentData((prevData) =>
      prevData.map((docType) =>
        docType.type === type
          ? {
              ...docType,
              documents: docType.documents.map((doc) =>
                doc.documentName === documentName ? { ...doc, isVisible: !doc.isVisible } : doc
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
          group.documents.some((d) => d.documentName === doc.documentName)
        )
      )
    );
  }, [documentData]);
  
  useEffect(() => {
    console.log("Context Updated SelectedDocuments:", selectedDocuments);
  }, [selectedDocuments]); // ✅ Debugging
  
  const contextValue: DocumentContextType = {
    documentData,
    setDocumentData,
    selectedDocuments,
    setSelectedDocuments,
    toggleDocumentVisibility,
  };
  return <DocumentContext.Provider value={contextValue}>{children}</DocumentContext.Provider>;
};
export default DocumentProvider;
