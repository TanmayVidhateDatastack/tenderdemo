// "use client";
// import { useEffect, useState } from "react";
// import DsApplication from "@/Elements/ERPComponents/DsApplicationComponents/DsApplication";
// import fetchData from "@/Common/helpers/Method/fetchData";
// import { DsTableRow, tableData, Tender } from "@/Common/helpers/types";
// import { getAllTenders } from "@/Common/helpers/constant";
// import DsTableComponent from "@/Elements/DsComponents/DsTablecomponent/DsTableComponent";
// import institutional from "@/Common/TenderIcons/institutional.svg";
// import corporate from "@/Common/TenderIcons/corporate.svg";
// import Image from "next/image";
// import AdvancedFilterComponent from "@/Elements/DsComponents/AdvancedFilterComponent/AdvancedFilterComponent";
// import DsPane, { ClosePane } from "@/Elements/DsComponents/DsPane/DsPane";
// import DsStatusIndicator from "@/Elements/DsComponents/dsStatus/dsStatusIndicator";
// import styles from "./filteractions.module.css";

// interface DsTenderTableProps {
//   data: Tender[];
//   filteredData: Tender[];
//   setData: React.Dispatch<React.SetStateAction<Tender[]>>;
// }

// const DsTenderTable: React.FC<DsTenderTableProps> = ({
//   data,
//   filteredData,
//   setData,
// }) => {
//   const [tempTableData, setTempTableData] = useState<tableData>({
//     className: "sample-table",
//     type: "InterActive",
//     id: "table-1",
//     isSortable: true,
//     hasSearch: false,
//     columns: [
//       {
//         columnIndex: 0,
//         className: "  cell-customer cellfontsize text-dark-2 ",
//         columnHeader: "CUSTOMER NAME",
//         isHidden: false,
//         sort: "ASC",
//         columnContentType: "string",
//       },
//       {
//         columnIndex: 1,
//         className: "  cell-submissiondate cellfontsize text-dark-2 ",
//         columnHeader: "SUBMISSION DATE",
//         isHidden: false,
//         sort: "ASC",
//         columnContentType: "DATE",
//       },
//       {
//         columnIndex: 2,
//         className: "cell-days-to-submit cellfontsize text-dark-2 ",
//         columnHeader: "DAYS TO SUBMIT",
//         isHidden: false,
//         sort: "ASC",
//         columnContentType: "string",
//       },
//       {
//         columnIndex: 3,
//         className: "header-column cell-tenderid cellfontsize text-dark-2 ",
//         columnHeader: "TENDER ID",
//         isHidden: false,
//         sort: "ASC",
//         columnContentType: "number",
//       },
//       {
//         columnIndex: 4,
//         className: " cell-tendertype cellfontsize  text-dark-2 ",
//         columnHeader: "TENDER TYPE",
//         isHidden: false,
//         sort: "ASC",
//         columnContentType: "string",
//       },
//       {
//         columnIndex: 5,
//         className: " cell-depot cellfontsize  text-dark-2 ",
//         columnHeader: "DEPOT",
//         isHidden: false,
//         sort: "ASC",
//         columnContentType: "string",
//       },
//       {
//         columnIndex: 6,
//         className: "cell-appliedby cellfontsize text-dark-2 ",
//         columnHeader: "APPLIED BY",
//         isHidden: false,
//         sort: "ASC",
//         columnContentType: "string",
//       },
//       {
//         columnIndex: 7,
//         className: " cell-suppliedby cellfontsize text-dark-2 ",
//         columnHeader: "SUPPLIED BY",
//         isHidden: false,
//         sort: "ASC",
//         columnContentType: "string",
//       },
//       {
//         columnIndex: 8,
//         className: "cell-preparedby cellfontsize text-dark-2 ",
//         columnHeader: "PREPARED BY",
//         isHidden: false,
//         sort: "ASC",
//         columnContentType: "string",
//       },
//       {
//         columnIndex: 9,
//         className: " cell-value cellfontsize  text-dark-2 ",
//         columnHeader: "VALUE",
//         isHidden: false,
//         sort: "ASC",
//         columnContentType: "number",
//       },
//       {
//         columnIndex: 10,
//         className: " cell-status cellfontsize text-dark-2 ",
//         columnHeader: "STATUS",
//         isHidden: false,
//         sort: "NONE",
//         columnContentType: "reactNode",
//       },
//     ],
//     rows: [],
//   });

//   const calculateDueStatus = (submissionDate: string) => {
//     if (!submissionDate) return "-"; // Handle empty values

//     const dateParts = submissionDate.split("/");
//     if (dateParts.length !== 3) return "-"; // Invalid format

//     const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
//     const subDate = new Date(formattedDate);
//     const currentDate = new Date();

//     if (isNaN(subDate.getTime())) return "-"; // Invalid date

//     const diffTime = subDate.getTime() - currentDate.getTime();
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

//     const result = diffDays < 0 ? `Overdue by ${Math.abs(diffDays)} days` : ` ${diffDays} Days to Left`;
//     console.log(`Submission Date: ${submissionDate}, Status: ${result}`);

//     return result;
//   };

//   useEffect(() => {
//     if (filteredData && filteredData.length >= 0) {
//       console.log("filter data in tabel : ", filteredData);
//       const transformedRows: DsTableRow[] = filteredData.map((item, index) => ({
//         rowIndex: index,
//         className: "cellRow logRow",
//         rowIcon:
//           item?.type === "institutional" ? (
//             <div
//               style={{
//                 width: "1.4rem",
//                 height: "1.4rem",
//                 position: "relative",
//               }}
//             >
//               <Image
//                 src={institutional}
//                 alt="institutional"
//                 layout="fill"
//               objectFit="cover"
//               />
//             </div>
//           ) : (
//             <div
//               style={{
//                 width: "1.4rem",
//                 height: "1.4rem",
//                 position: "relative",
//               }}
//             >
//               <Image src={corporate} alt="corporate"
//               layout="fill"
//               objectFit="cover" />
//             </div>
//           ),
//         customAttributes: { iconValue: item?.type?.toString() ?? "" },
//         content: [
//           {
//             columnIndex: 0,
//             className: "cell-customer cellfontsize  text-dark-2 ",
//             content: item.customerName || "-",
//             filterValue: item.customerName || "-",
//             contentType: "string",
//           },
//           {
//             columnIndex: 1,
//             className: "cell-submissiondate cellfontsize",
//             content: item.submittionDate || "-",
//             filterValue: item.submittionDate || "-",
//             contentType: "string",
//           },
//           {
//             columnIndex: 2,
//             className: "cell-days-to-submit cellfontsize",
//             content: item.daystosubmit || "-",
//             filterValue: item.daystosubmit || "-",
//             contentType: "string",
//           },
//           {
//             columnIndex: 3,
//             className: "cell-tenderid cellfontsize",
//             content: item.tenderId || "-",
//             filterValue: item.tenderId || "-",
//             contentType: "string",
//           },
//           {
//             columnIndex: 4,
//             className: "cell-tendertype cellfontsize  text-dark-2 ",
//             content: item.tenderType || "-",
//             filterValue: item.tenderType || "-",
//             contentType: "string",
//           },
//           {
//             columnIndex: 5,
//             className: "cell-depot cellfontsize  text-dark-2 ",
//             content: item.depot || "-",
//             filterValue: item.depot || "-",
//             contentType: "string",
//           },
//           {
//             columnIndex: 6,
//             className: "cell-appliedby cellfontsize",
//             content: item.appliedBy || "-",
//             filterValue: item.appliedBy || "-",
//             contentType: "string",
//           },
//           {
//             columnIndex: 7,
//             className: "cell-suppliedby cellfontsize",
//             content: item.suppliedBy || "-",
//             filterValue: item.suppliedBy || "-",
//             contentType: "string",
//           },
//           {
//             columnIndex: 8,
//             className: "cell-preparedby cellfontsize",
//             content: item.preparedBy || "-",
//             filterValue: item.preparedBy || "-",
//             contentType: "string",
//           },
//           {
//             columnIndex: 9,
//             className: "cell-value cellfontsize  text-dark-2 ",
//             content: item.value || "-",
//             filterValue: parseFloat(item.value.replaceAll(",", "") ?? ""),
//             contentType: "number",
//           },
//           {
//             columnIndex: 10,
//             className: "cell-status cellfontsize",
//             // content: item.status.tenderStatus || "-",
//             content: (
//               <DsStatusIndicator
//                 type="user_defined"
//                 label={item.status.tenderStatus + " "}
//                 className={`${
//                   item?.status?.tenderStatus
//                     ? styles[
//                         item?.status?.tenderStatus
//                           ?.replace(" ", "_")
//                           .toLowerCase()
//                       ]
//                     : ""
//                 }`}
//                 comment={
//                   item.status?.message
//                     ? typeof item.status.message === "object"
//                       ? JSON.stringify(item.status.message)
//                       : item.status.message.toString()
//                     : ""
//                 }
//               />
//             ),
//             filterValue: item.status.tenderStatus,
//             contentType: "reactNode",
//           },
//         ],
//       }));

//       console.log("Final Transformed Rows:", transformedRows);

//       setTimeout(() => {
//         setTempTableData((data) => ({ ...data, rows: transformedRows }));
//       }, 1);
//     }
//   }, [filteredData]);

//   const flterTypes = [
//     {
//       columnIndex: 0,
//       columnHeader: "Customer name",
//       filterType: "CSV",
//     },
//     {
//       columnIndex: 1,
//       columnHeader: "Date ",
//       filterType: "DATE",
//     },
//     {
//       columnIndex: 4,
//       columnHeader: "Supply type",
//       filterType: "MULTISELECT",
//     },
//     {
//       columnIndex: -1,
//       columnHeader: "TYPE",
//       filterType: "ICONVALUE",
//     },
//     {
//       columnIndex: 5,
//       columnHeader: "Depot",
//       filterType: "MULTISELECT",
//     },

//     {
//       columnIndex: 6,
//       columnHeader: "Applied type",
//       filterType: "MULTISELECT",
//     },
//     {
//       columnIndex: 7,
//       columnHeader: "Supplied type",
//       filterType: "MULTISELECT",
//     },

//     {
//       columnIndex: 9,
//       columnHeader: "VALUE",
//       filterType: "INPUTTYPERANGE",
//     },
//     {
//       columnIndex: 10,
//       columnHeader: "STATUS",
//       filterType: "MULTISELECT",
//     },
//   ];
//   const handleFetch = async () => {
//     await fetchData({ url: getAllTenders })
//       .then((res) => {
//         console.log("Fetched Response:", res); // Log the fetched response
//         if (res?.code === 200 && Array.isArray(res?.result)) {
//           setData(res.result); // Update the state
//         } else {
//           console.error("Error: Invalid data format or empty result");
//         }
//       })
//       .catch((err) => {
//         console.error("Error fetching data:", err);
//       });
//   };

//   const addTableData = (tender: Tender[]) => {
//     console.log("Adding table data:", tender);
//     const newRows: DsTableRow[] = tender.map((t, index) => ({
//       rowIndex: index,
//       className: "cellRow ",
//       rowIcon:
//         t?.type === "institutional" ? (
//           <Image
//             src={institutional}
//             alt={"institutional"}
//             width={50}
//             height={50}
//           />
//         ) : (
//           <Image src={corporate} alt={"corporate"} width={50} height={50} />
//         ),
//       customAttributes: { iconValue: t?.type?.toString() ?? "" },
//       content: [
//         {
//           columnIndex: 0,
//           className: "cell-customer cellfontsize  text-dark-2 ",
//           content: t.customerName,
//           filterValue: t.customerName,
//           contentType: "string",
//         },
//         {
//           columnIndex: 1,
//           className: "cell-submissiondate cellfontsize",
//           content: t.submittionDate,
//           filterValue: t.submittionDate,
//           contentType: "string",
//         },
//         {
//           columnIndex: 2,
//           className: "cell-days-to-submit cellfontsize",
//           content: t.submittionDate ? calculateDueStatus(t.submittionDate) : "-",
//           filterValue: t.submittionDate ? calculateDueStatus(t.submittionDate) : "-",
//           contentType: "string",
//         },
//         {
//           columnIndex: 3,
//           className: "cell-tenderid cellfontsize",
//           content: t.tenderId,
//           filterValue: t.tenderId,
//           contentType: "string",
//         },
//         {
//           columnIndex: 4,
//           className: "cell-tendertype cellfontsize text-dark-2 ",
//           content: t.tenderType,
//           filterValue: t.tenderType,
//           contentType: "string",
//         },
//         {
//           columnIndex: 5,
//           className: "cell-depot cellfontsize text-dark-2 ",
//           content: t.depot,
//           filterValue: t.depot,
//           contentType: "string",
//         },
//         {
//           columnIndex: 6,
//           className: "cell-appliedby cellfontsize",
//           content: t.appliedBy,
//           filterValue: t.appliedBy,
//           contentType: "string",
//         },
//         {
//           columnIndex: 7,
//           className: "cell-suppliedby cellfontsize",
//           content: t.suppliedBy,
//           filterValue: t.suppliedBy,
//           contentType: "string",
//         },
//         {
//           columnIndex: 8,
//           className: "cell-preparedby cellfontsize",
//           content: t.preparedBy,
//           filterValue: t.preparedBy,
//           contentType: "string",
//         },
//         {
//           columnIndex: 9,
//           className: "cell-value cellfontsize text-dark-2 ",
//           content: t.value,
//           filterValue: parseFloat(t.value.replaceAll(",", "") ?? 0),
//           contentType: "number",
//         },
//         {
//           columnIndex: 10,
//           className: "cell-status cellfontsize",

//           content: t.status ? (
//             <DsStatusIndicator
//               type="user_defined"
//               className={`${
//                 t?.status?.tenderStatus
//                   ? styles[
//                       t?.status?.tenderStatus
//                         ?.replaceAll(" ", "_")
//                         .toLowerCase()
//                     ]
//                   : ""
//               }`}
//               label={t.status.tenderStatus + " "}
//               comment={
//                 t.status?.message
//                   ? typeof t.status.message === "object"
//                     ? JSON.stringify(t.status.message)
//                     : t.status.message.toString()
//                   : ""
//               }
//             />
//           ) : (
//             "No Status"
//           ),
//           filterValue: t.status?.tenderStatus ?? "Unknown",
//           contentType: "reactNode",
//         },
//       ],
//     }));

//     console.log("New Rows:", newRows);

//     setTempTableData((prevData) => ({
//       ...prevData,
//       rows: newRows,
//     }));
//   };

//   useEffect(() => {
//     handleFetch();
//   }, []);

//   useEffect(() => {});

//   useEffect(() => {
//     console.log("Data updated:", data);
//     if (data.length > 0) {
//       addTableData(data);
//     }
//   }, [data]);

//   const applyFilter = (
//     e: React.MouseEvent<HTMLElement>,
//     filteredRows: DsTableRow[]
//   ) => {
//     setTempTableData((data) => ({ ...data, rows: filteredRows }));
//     ClosePane(e);
//   };

//   return (
//     <>
//       <DsApplication appTitle=" " pageName={""}>
//         <DsTableComponent
//           className={tempTableData.className}
//           id={tempTableData.id}
//           hasSearch={tempTableData.hasSearch}
//           columns={tempTableData.columns}
//           hasIcons={true}
//           isSelectAble={false}
//           rows={tempTableData.rows}
//           isFooterRequired={true}
//           isSortable={true}

//         />
//       </DsApplication>
//       <DsPane id="y" side="right" title="Filter">
//         <AdvancedFilterComponent
//           id="a"
//           rows={tempTableData.rows}
//           filterTypes={flterTypes}
//           handleApplyFilter={applyFilter}
//         />
//       </DsPane>
//     </>
//   );
// };

// export default DsTenderTable;
