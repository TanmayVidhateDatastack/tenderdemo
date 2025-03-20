// "use client";
// import styles from "./document.module.css";
// import pagestyles from "@/app/page.module.css";
// import React, { useContext, useEffect, useState } from "react";
// import Image from "next/image";
// import stampIcon from "@/Icons/mediumIcons/cross.svg";
// import DocumentSelector from "@/Elements/DsComponents/dsDocumentSelector/dsDocumentSelector";
// import { closeAllContext } from "@/Elements/DsComponents/dsContextHolder/dsContextHolder";
// import DsTabButton from "@/Elements/DsComponents/DsButtons/dsTabButton";
// import PaneOpenButton from "@/Elements/DsComponents/DsPane/PaneOpenButton";
// import DocumentProvider, { DocumentContext } from "./DocumentsContextProvider";

// export default function DocumentsSelectionArea() {
//   const [visibleSections, setVisibleSections] = useState<{ [key: string]: boolean }>({});
//   const count = "01";
  
//   const docContext = useContext(DocumentContext);
//   if (!docContext) {
//     throw new Error("DocumentsSelectionArea must be used within a DocumentContext");
//   }
  
//   const { selectedFiles, setSelectedFiles } = docContext;

//   useEffect(() => {
//     const visibilityMap: { [key: string]: boolean } = {};
//     selectedFiles.forEach((sf) => {
//       visibilityMap[sf.docType] = true;
//     });
//     setVisibleSections(visibilityMap);
//   }, [selectedFiles]);

//   const handleRemoveDocument = (docType: string, docValue: string) => {
//     setSelectedFiles((prevFiles) => {
//       const updatedFiles = prevFiles.filter((d) => !(d.docType === docType && d.docvalue === docValue));
//       const checkbox = document.querySelector(
//         prevFiles.find((d) => d.docType === docType && d.docvalue === docValue)?.checkboxId as string
//       ) as HTMLInputElement;
//       if (checkbox) checkbox.checked = false;
//       return updatedFiles;
//     });
//   };

//   const documentCategories = [
//     { type: "product", title: "Product Licenses" },
//     { type: "fda", title: "FDA Documents" },
//     { type: "financial", title: "Financial Documents" },
//     { type: "company", title: "Company Documents" },
//     { type: "miscellaneous", title: "Miscellaneous Annexures and Under..." },
//   ];

//   return (
//     <DocumentProvider>
//       <div className={pagestyles.container} onScroll={closeAllContext}>
//         <div className={styles.Customer}>
//           <div className={styles.container + " " + styles["flex-column"]}>
//             <div className={styles.add_documents}>
//               <div className={styles.count_div}>
//                 <div>Selected Document</div>
//                 <div>
//                   <DsTabButton className={styles.countBtn} count={count} />
//                 </div>
//               </div>
//               <div>
//                 <PaneOpenButton
//                   startIcon={<Image src={stampIcon} alt="stamp" />}
//                   id="actionBtn12"
//                   paneId="myPane"
//                   label="Add Document"
//                 />
//               </div>
//             </div>
//             {documentCategories.map(({ type, title }) => (
//               visibleSections[type] && (
//                 <div key={type} className={styles.documentsDivs}>
//                   <DocumentSelector
//                     headerTitle={title}
//                     headerNumber={selectedFiles.filter((x) => x.docType === type).length.toString()}
//                     initialDocuments={selectedFiles.filter((x) => x.docType === type).map((x) => x.docvalue)}
//                     handleOnRemoveClick={(doc) => handleRemoveDocument(type, doc)}
//                   />
//                 </div>
//               )
//             ))}
//           </div>
//         </div>
//       </div>
//     </DocumentProvider>  
//   );
// }  