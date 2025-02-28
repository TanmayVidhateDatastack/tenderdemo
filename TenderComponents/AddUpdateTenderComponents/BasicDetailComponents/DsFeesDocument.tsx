// import DsButton from "@/Elements/DsComponents/DsButtons/dsButton";
// import DsCsvUpload from "@/Elements/DsComponents/DsButtons/dsCsvUpload";
// import Ds_checkbox from "@/Elements/DsComponents/DsCheckbox/dsCheckbox";
// import DsTextField from "@/Elements/DsComponents/DsInputs/dsTextField";
// import DsSingleSelect from "@/Elements/DsComponents/dsSelect/dsSingleSelect";
// import Image from "next/image";
// import downarrow from "@/Icons/smallIcons/verticleArrow.svg";
// import styles from "./deposite.module.css";
// import calender from "@/Icons/smallIcons/calender.svg";
// import eleStyles from "./tender.module.css";
// import { DsSelectOption } from "@/helpers/types";

// export type tenderDocument = {
//   name: string;
//   document: File; 
// };

// export type tenderFee = {
//   type: string;
//   amount: number;
//   currency: string;
//   paidBy: string;
//   paymentMode: string;
//   paymentDueDate: string;
//   notes: string;
//   documents: tenderDocument[];
// };

// export interface DsFeesProps {
//   title: string;
//   id: string;
//   mode: DsSelectOption[];
//   paidBy: DsSelectOption[];
//   downloadVisible: boolean;
// }

// const DsFeesDocument: React.FC<DsFeesProps> = ({
//   title,
//   id,
//   mode,
//   paidBy,
//   downloadVisible = false
// }) => {
//   return (
//     <>
//       <div>
//         <div>
//           <div className={styles.emdContainerHead} id={id}>
//             <div>{title}</div>
//             {downloadVisible && (
//               <DsButton
//                 label="Download Reciept"
//                 disable={true}
//                 startIcon={<Image src={downarrow} alt="downarrow" />}
//               />
//             )}
//           </div>
//           <div>
//             <div>
//               <Ds_checkbox
//                 id={"payment"}
//                 name={"Payment Completed"}
//                 value={"Payment Completed"}
//                 label={"Payment Completed"}
//               />
//             </div>
//           </div>
//         </div>
//         <div className={eleStyles.inputDetails}>
//           <DsTextField
//             className={styles.fieldColors}
//             label={"Amount"}
//             placeholder="Please type here"
//           ></DsTextField>
//           <DsSingleSelect
//             className={styles.fieldColors}
//             id={id + "_paidType1"}
//             options={paidBy}
//             label="Paid by"
//             placeholder={"Please select here"}
//           ></DsSingleSelect>
//           <DsSingleSelect
//             className={styles.fieldColors}
//             id={id + "_modes1"}
//             options={mode}
//             label="Modes"
//             placeholder={"Please search and select here"}
//           ></DsSingleSelect>
//           <DsTextField
//             className={styles.fieldColors}
//             label="Due Date"
//             placeholder="DD/MM/YYYY"
//             iconEnd={<Image src={calender} alt="icon" />}
//           ></DsTextField>
//         </div>

//         <div className={styles.notes}>
//           <h4>Notes</h4>
//           <DsTextField
//             className={styles.fieldColors}
//             placeholder="Please type here"
//             disable={false}
//           />
//         </div>
//         <div>
//           <DsCsvUpload
//             id="upload"
//             label="Attach File"
//             buttonViewStyle="btnText"
//             buttonSize="btnSmall"
//           ></DsCsvUpload>
//         </div>
//       </div>
//     </>
//   );
// };

// export default DsFeesDocument;
