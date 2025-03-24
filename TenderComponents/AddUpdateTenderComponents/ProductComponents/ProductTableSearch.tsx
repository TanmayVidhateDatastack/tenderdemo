// import DsInfoDisplay from "@/Elements/ERPComponents/DsInfoDisplay/DsInfoDisplay";
// import DsSearchComponent from "@/Elements/ERPComponents/DsSearchComponent/searchComponent";
// import { getTenderSearchProducts } from "@/Common/helpers/constant";
// import {  TenderProduct } from "@/Common/helpers/types";
// import { useState } from "react";
// import { areSearchProduct } from "./companySearch";

// interface TableSearchProps {
//   tableRowIndex: number;
//   setLocalProducts: React.Dispatch<React.SetStateAction<TenderProduct[]>>;
//   setHasChanges: React.Dispatch<React.SetStateAction<boolean>>;
// }
// const ProductTableSearch: React.FC<TableSearchProps> = ({
//   tableRowIndex,
//   setLocalProducts,
//   setHasChanges,
// }) => {
//   const handleProductSelect = (
//     index: number,
//     id: number,
//     name: string,
//     packSize: string
//   ) => {
//     setLocalProducts((prev) =>
//       prev.map((p, i) => (i === index ? { ...p, id, name, packSize } : p))
//     );
//     setHasChanges(true);
//   };

//   const [productOptions, setProductOptions] = useState<
//     { id: number; name: string; packSize: string }[]
//   >([]);
//   return (
//     <DsSearchComponent
//       id={`ProductTableSearch${tableRowIndex + 1}`}
//       dataListId={`ProductTableSearchOptions${tableRowIndex + 1}`}
//       options={productOptions.map((opt) => ({
//         value: opt.name,
//         id: opt.id.toString(),
//         attributes: {},
//         secondaryValue: (
//           <DsInfoDisplay detailOf="PackSize">{opt.packSize}</DsInfoDisplay>
//         ),
//       }))}
//       setSelectedOption={(option) => {
//         if (option) {
//           const selected = productOptions.find(
//             (p) => p.id.toString() == option.id
//           );
//           if (selected?.id && selected?.name && selected.packSize)
//             handleProductSelect(
//               tableRowIndex - 1,
//               selected.id,
//               selected.name,
//               selected.packSize
//             );
//         }
//       }}
//       setOptions={function (values: unknown[]): void {
//         if (areSearchProduct(values)) {
//           setProductOptions(values);
//         }
//       }}
//       setSearchUrl={function (searchTerm: string): string {
//         return getTenderSearchProducts + searchTerm;
//       }}
//     />
//   );
// };
// export default ProductTableSearch;
