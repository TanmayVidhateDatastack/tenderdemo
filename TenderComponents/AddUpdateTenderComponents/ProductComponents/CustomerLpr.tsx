// import DsButton from "@/Elements/DsComponents/DsButtons/dsButton";
// import DsTextField from "@/Elements/DsComponents/DsInputs/dsTextField";
// import lprSelectedSVG from "@/Icons/smallIcons/lprSelected.svg";
// import lprSVG from "@/Icons/smallIcons/lpr.svg";
// import Image from "next/image";
// import { useEffect, useState } from "react";
// // import { useTenderData } from "../TenderDataContextProvider";
// import { Company, datalistOptions } from "@/helpers/types";
// import { createContext } from "@/Elements/DsComponents/dsContextHolder/dsContextHolder";
// // import DsSearchComponent from "@/Elements/ERPComponents/DsSearchComponent/searchComponent";
// import CompanySearch from "./companySearch";
// import styles from "../../AddUpdateTenderComponents/BasicDetailComponents/tender.module.css";

// export interface CustomerLPRProps {
//   index: number;
//   lprValue?: number;
//   lprTo?: Company;
//   onValueChange?: (value: string) => void;
//   onCompanyChange?: (company: Company) => void;
// }
// const DsCustomerLPR: React.FC<CustomerLPRProps> = ({
//   index,
//   lprValue,
//   lprTo,
//   onValueChange,
//   onCompanyChange,
// }) => {
//   const [isLPR, setIsLpr] = useState<boolean>(false);

//   const setSelectedCompany = (option: datalistOptions | undefined) => {
//     if (option?.value && onCompanyChange) {
//       onCompanyChange({ id: Number(option.id), name: option.value });
//       setIsLpr(true);
//     } else {
//       setIsLpr(false);
//     }
//   };

//   useEffect(() => {
//     createContext(
//       "LprTo" + index,
//       <div>
//         {/* <DsSearchComponent
//           id={"lprCompany" + index}
//           dataListId={"lprCompanyList" + index}
//           setSearchUrl={(searchTerm) => {
//             return searchLprCompany + searchTerm;
//           }}
//           options={undefined}
//           setOptions={setOp}
//           setSelectedOption={setSelectedOption}
//         />
//         <DsButton /> */}
//         <CompanySearch
//           lprTo={lprTo?.name}
//           setSelectedCompany={setSelectedCompany}
//         />
//       </div>
//     );
//   }, [index,lprTo]);
//   useEffect(()=>{
//     if(lprTo?.name){
//       setIsLpr(true)
//     }
//   },[lprTo])
//   return (
//     <div className={styles.LPR} id={"Lpr" + index}>
//       <DsTextField
//         id={"LprValue" + index}
//         initialValue={lprValue ? lprValue.toString() : ""}
//         onChange={(e) => {
//           if (e.target.value && onValueChange) onValueChange(e.target.value);
//         }}
//       />
//       <DsButton>
//         {isLPR ? (
//           <Image src={lprSelectedSVG} alt="LPR To" />
//         ) : (
//           <Image src={lprSVG} alt="LPR To" />
//         )}
//       </DsButton>
//     </div>
//   );
// };
// export default DsCustomerLPR;
