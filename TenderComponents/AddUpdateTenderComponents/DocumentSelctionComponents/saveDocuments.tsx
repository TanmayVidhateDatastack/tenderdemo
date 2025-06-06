// import { FC, useContext } from "react";
// import React from "react";
// import styles from "./document.module.css";
// import DsButton from "@/Elements/DsComponents/DsButtons/dsButton";
// import { DocumentContext } from "./DocumentsContextProvider";

// interface AddDocumentProps {
//   ""?;
//   // This can be expanded if there are additional props you'd like to pass in
// }

// export const AddDocument: FC<AddDocumentProps> = () => {
//   const docContext = useContext(DocumentContext);

//   if (!docContext) {
//     throw new Error("AddDocument must be used within a DocumentContext");
//   }

//   const { selectedFiles, setSelectedFiles } = docContext;
//   const handleClick = () => {
//     // const { value, checked } = event.target;

//     // Select the pane by its ID
//     const pane = document.querySelector("#myPane");

//     // Within the pane, select all checked checkboxes
//     const checkedCheckboxes = pane?.querySelectorAll(
//       'input[type="checkbox"]:checked'
//     );

//     // Log each checked checkbox
//     setSelectedFiles(() => []);

//     checkedCheckboxes?.forEach((checkbox) => {
//       const cb = checkbox as HTMLInputElement;
//       setSelectedFiles((prev) => [
//         ...prev,
//         {
//           docType: cb.getAttribute("data-document-type-id") || "a",
//           docvalue: cb.value,
//           checkboxId: cb.id,
//         },
//       ]);
//     });
//     console.log("selected files : ", selectedFiles);
//   };

//   return (
//     <div>
//       <DsButton
//         buttonViewStyle="btnContained"
//         buttonColor="btnPrimary"
//         label="Save"
//         className={styles.saveBtn}
//         onClick={(e) => {
//           handleClick(e);
//         }}
//       ></DsButton>
//     </div>
//   );
// };
