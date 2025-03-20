"use client";
import React, { createContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

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
  toggleDocumentVisibility: (type: string, documentName: string) => void; 
} 
                                            
export const DocumentContext = createContext<DocumentContextType | undefined>(undefined);                      
 
interface DocumentProviderProps {
  children: ReactNode; 
} 
export const DocumentProvider: React.FC<DocumentProviderProps> = ({ children }) => {
  const [documentData, setDocumentData] = useState<DocumentType[]>([
    {
      type: "Financial Documents",
      documents: [
        { documentName: "Bank Statement", isVisible: true, documentPath: "/documents/bank.pdf" },
        { documentName: "Tax Returns", isVisible: false, documentPath: "/documents/tax.pdf" },
      ],
    },
    {
      type:"fda", 
      documents:[
        {documentName:"doc1", isVisible:false,documentPath:"xyz"},
        {documentName:"doc3", isVisible:false,documentPath:"xyz/1"} 
      ]
    }
  ]);
   const updateTenderData =( 
    data :DocumentType[],    
    newDocs:{type:"string",name:"string",path:"string"} 
   ) => {
    return data.map((group) => {  
      if(group.type === newDocs.type){   
        group.documents.push({documentName:newDocs.name,isVisible:false,documentPath:newDocs.path});
      } 
      else{
        [...data,{type:newDocs.type, documents:[{documentName:newDocs.name ,isVisible:false,documentPath:newDocs.type}]}];
      }
    });    
   } 
//  {                     
//   type="fda",
//   name="doc4",
//   path="xyz/l"
//  }

  const toggleDocumentVisibility = (type: string, documentName: string) => {
    setDocumentData((prevData) =>
      prevData.map((docType) =>
        docType.type === type
          ? { 
              ...docType, 
              documents: docType.documents.map((doc) => 
                doc.documentName === documentName 
                  ? { ...doc, isVisible: !doc.isVisible }
                  : doc
              ),
            }
          : docType
      )
    );
  };

  const contextValue: DocumentContextType = {
    documentData,
    setDocumentData,
    toggleDocumentVisibility,
  };

  return (
    <DocumentContext.Provider value={contextValue}>{children}</DocumentContext.Provider>
  );
};
export default DocumentProvider;