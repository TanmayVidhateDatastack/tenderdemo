"use client";
import React, {
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  createContext,
} from "react";

// 1. Define the context types
interface DocumentContextType {
  selectedDocumentId: string[];
  setSelectedDocumentId: Dispatch<SetStateAction<string[]>>;
  selectedFiles: Record<string, string>[];
  // setSelectedFiles: Dispatch<SetStateAction<string[]>> ;
  setSelectedFiles: Dispatch<SetStateAction<Record<string, string>[]>>;
  //   setTabs: Dispatch<SetStateAction<string>>;
}

// 2. Create the context with a default value of `undefined` for initial typing
export const DocumentContext = createContext<DocumentContextType | undefined>(
  undefined
);

// 3. Define the provider's props
interface DocumentsProviderProps {
  children: ReactNode;
}

// 4. Define the provider component
export const DocumentProvider: React.FC<DocumentsProviderProps> = ({
  children,
}) => {
  const [selectedDocumentId, setSelectedDocumentId] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<Record<string, string>[]>(
    []
  );

  const contextValue: DocumentContextType = {
    selectedDocumentId,
    setSelectedDocumentId,
    selectedFiles,

    setSelectedFiles,
  };
  //   };

  return (
    <DocumentContext.Provider value={contextValue}>
      {children}
    </DocumentContext.Provider>
  );
};
export default DocumentProvider;
