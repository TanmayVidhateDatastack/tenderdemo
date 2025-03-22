"use client";

import DsApplication from "@/Elements/ERPComponents/DsApplicationComponents/DsApplication";
import DsNavTo from "@/Elements/ERPComponents/DsNavigationComponent/DsNavTo";
import styles from "./page.module.css";
import DsFilterActions from "@/TenderComponents/TenderLogComponents/DsFilterActions";
import addIconWhite from "@/Icons/smallIcons/whiteadd.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CodeItem, DsTableRow, tableData, Tender } from "@/helpers/types";
import DsTotalTenders from "@/TenderComponents/TenderLogComponents/DsTotalTender";
import DsTotalValues from "@/TenderComponents/TenderLogComponents/DsTotalValues";
import DsButton from "@/Elements/DsComponents/DsButtons/dsButton";
import ContextMenu, { displayContext } from "@/Elements/DsComponents/dsContextHolder/dsContextHolder";
import { changeImage } from "@/helpers/Method/conversion";
import institutional from "@/Icons/institutional.svg";
import corporate from "@/Icons/corporate.svg";
import DsStatusIndicator from "@/Elements/DsComponents/dsStatus/dsStatusIndicator";
import { getAllMetaData, getAllTenders } from "@/helpers/constant";
import fetchData from "@/helpers/Method/fetchData";
import DsTableComponent from "@/Elements/DsComponents/DsTablecomponent/DsTableComponent";

import { filterTypes } from "@/Elements/DsComponents/AdvancedFilterComponent/AdvancedFilterComponent";
import DsCurrency from "@/Elements/DsComponents/dsCurrency/dsCurrency";
import addIcon from "../Icons/smallIcons/add.svg";
import { RootState } from "@/Redux/store/store";
import { useAppSelector } from "@/Redux/hook/hook";
import DsName from "@/Elements/DsComponents/DsName/DsName";
 import btnStyles from "@/Elements/DsComponents/DsButtons/dsButton.module.css";
import DsTenderTableFloatingMenu from "@/TenderComponents/TenderLogComponents/TenderlogFloatingMenu";
import DsAdvanceFilterPane from "@/TenderComponents/TenderLogComponents/DsAdvanceFilterPane";




export default function Home() {
  const [data, setData] = useState<Tender[]>([]); //for table data
  const [metaData, setMetaData] = useState<CodeItem[]>([]);
  const [searchQuery, setSearchQuery] = useState(""); //for search query
  const [selectedStatus, setSelectedStatus] = useState(""); //for quickfilter
  const [advFilter, setAdvFilter] = useState<Record<string, any>>({});
  // const [enrichedTenders, setEnrichedTenders] = useState<Tender[]>([]);
  // const [filteredData, setFilteredData] = useState<Tender[]>([]); //for filtered table data
  const [iconSrc] = useState(addIcon);
  const permissions = useAppSelector((state: RootState) => state.permissions);

  const {
    newButtonVisible

  } = permissions;

  const [tempTableData, setTempTableData] = useState<tableData>({
    className: "sample-table",
    type: "InterActive",
    id: "table-1",
    isSortable: true,
    hasSearch: false,
    columns: [
      {
        columnIndex: 0,
        className: "cell-customer text-dark-1",
        columnHeader: "CUSTOMER NAME",
        isHidden: false,
        sort: "ASC",
        columnContentType: "string",
        hasSort: true,


      },
      {
        columnIndex: 1,
        className: "  cell-submissiondate text-dark-0   ",
        columnHeader: "SUBMISSION DATE",
        isHidden: false,
        sort: "ASC",
        columnContentType: "DATE",
        hasSort: true,
      },
      {
        columnIndex: 2,
        className: "cell-days-to-submit  ",
        columnHeader: "DAYS TO SUBMIT",
        isHidden: false,
        sort: "ASC",
        columnContentType: "string",
        hasSort: true,
      },
      {
        columnIndex: 3,
        className: " cell-tenderid text-dark-0  ",
        columnHeader: "TENDER ID",
        isHidden: false,
        sort: "ASC",
        columnContentType: "number",
        hasSort: true,
      },
      {
        columnIndex: 4,
        className: " cell-tendertype text-dark-1  ",
        columnHeader: "TENDER TYPE",
        isHidden: false,
        sort: "ASC",
        columnContentType: "string",
        hasSort: true,
      },
      {
        columnIndex: 5,
        className: " cell-depot text-dark-1 ",
        columnHeader: "DEPOT",
        isHidden: false,
        sort: "ASC",
        columnContentType: "string",
        hasSort: true,
      },
      {
        columnIndex: 6,
        className: "cell-appliedby text-dark-0 ",
        columnHeader: "APPLIED BY",
        isHidden: false,
        sort: "ASC",
        columnContentType: "string",
        hasSort: true,
      },
      {
        columnIndex: 7,
        className: " cell-suppliedby text-dark-0 ",
        columnHeader: "SUPPLIED BY",
        isHidden: false,
        sort: "ASC",
        columnContentType: "string",
        hasSort: true,
      },
      {
        columnIndex: 8,
        className: "cell-preparedby text-dark-0   ",
        columnHeader: "PREPARED BY",
        isHidden: false,
        sort: "ASC",
        columnContentType: "string",
        hasSort: true,
      },
      {
        columnIndex: 9,
        className: " cell-value text-dark-1 ",
        columnHeader: "VALUE (₹)",
        isHidden: false,
        sort: "ASC",
        columnContentType: "number",
        hasSort: true,
      },
      {
        columnIndex: 10,
        className: " cell-status  ",
        columnHeader: "STATUS",
        isHidden: false,
        sort: "NONE",
        columnContentType: "reactNode",
        hasSort: true,
      },
    ],
    rows: [],
  });

  const calculateDueStatus = (submissionDate: string) => {
    if (!submissionDate) return "-"; // Handle empty values

    let subDate = new Date(submissionDate);

    // If parsing fails, try manual parsing
    if (isNaN(subDate.getTime())) {
      // Handle formats like "DD/MM/YYYY"
      const dateParts = submissionDate.split(/[\/\-\.]/);
      if (dateParts.length === 3) {
        let day, month, year;

        if (submissionDate.includes("/")) {
          // Assuming "DD/MM/YYYY" format
          day = parseInt(dateParts[0], 10);
          month = parseInt(dateParts[1], 10) - 1;
          year = parseInt(dateParts[2], 10);
        } else {
          // Assuming "YYYY-MM-DD" format
          year = parseInt(dateParts[0], 10);
          month = parseInt(dateParts[1], 10) - 1;
          day = parseInt(dateParts[2], 10);
        }

        subDate = new Date(year, month, day);
      }
    }

    // Validate parsed date
    if (isNaN(subDate.getTime())) return "-";

    // Get today's date in UTC (ignoring time)
    const currentDate = new Date();
    const todayUTC = new Date(Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()));

    // Calculate difference in days
    const diffTime = subDate.getTime() - todayUTC.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Determine result
    const result = diffDays <= 0 ? "0 Days Left" : `${diffDays} Days Left`;

    // console.log(`Submission Date: ${submissionDate}, Parsed: ${subDate.toISOString()}, Status: ${result}`);

    // Apply color coding
    let className = styles.blackText;
    if (diffDays <= 0) className = styles.zeroText;
    else if (diffDays <= 20) className = styles.orangeText;

    return <span className={className}>{result}</span>;
  };


  // useEffect(() => {
  //   if (filteredData && filteredData.length >= 0) {
  //     console.log("filter data in tabel : ", filteredData);
  //     const transformedRows: DsTableRow[] = filteredData.map((item, index) => ({
  //       rowIndex: index,
  //       className: "cellRow logRow",
  //       rowIcon:
  //         item?.type === "institutional" ? (
  //           <div
  //             style={{
  //               width: "0.875em",
  //               height: "0.875em",
  //               position: "relative",
  //             }}
  //           >
  //             <Image
  //               src={institutional}
  //               alt="institutional"
  //               layout="fill"
  //               objectFit="cover"
  //             />
  //           </div>
  //         ) : (
  //           <div
  //             style={{
  //               width: "0.875em",
  //               height: "0.875em",
  //               position: "relative",
  //             }}
  //           >
  //             <Image src={corporate} alt="corporate"
  //               layout="fill"
  //               objectFit="cover" />
  //           </div>
  //         ),
  //       customAttributes: { iconValue: item?.type?.toString() ?? "" },

  //       content: [
  //         {
  //           columnIndex: 0,
  //           className: "cell cell-customer text-dark-1",
  //           content: <DsName id={item.tenderId + "customerName "} name={item.customerName || "-"} />,
  //           filterValue: item.customerName || "-",
  //           // content:item.customerName || "-",
  //           contentType: "string",
  //         },
  //         {
  //           columnIndex: 1,
  //           className: " cell  cell-submissiondate text-dark-0 ",
  //           content: <DsName id={item.tenderId + "submittionDate"} name={formatDate(item.submittionDate)} />,
  //           filterValue: item.submittionDate || "-",
  //           contentType: "string",
  //         },
  //         {
  //           columnIndex: 2,
  //           className: " cell  cell-days-to-submit ",
  //           content: <DsName id={item.tenderId + "daystosubmit"} name={item.submittionDate ? calculateDueStatus(item.submittionDate) : "-"} />,
  //           filterValue: item.submittionDate ? calculateDueStatus(item.submittionDate) : "-",
  //           contentType: "string",
  //         },
  //         {
  //           columnIndex: 3,
  //           className: " cell  cell-tenderid text-dark-0 ",
  //           content: <DsName id={item.tenderId + "tenderId"} name={item.tenderId || "-"} />,
  //           filterValue: item.tenderId || "-",
  //           contentType: "string",
  //         },
  //         {
  //           columnIndex: 4,
  //           className: " cell cell-tendertype text-dark-1  ",
  //           content: <DsName id={item.tenderId + "tenderType"} name={getTenderTypeDescription(item.tenderType)} />,
  //           filterValue: getTenderTypeDescription(item.tenderType),
  //           contentType: "string",
  //         },
  //         {
  //           columnIndex: 5,
  //           className: " cell cell-depot text-dark-1",
  //           // content: item.depot || "-",
  //           content: <DsName id={item.tenderId + "depot"} name={item.depot || "-"} />,
  //           filterValue: item.depot || "-",
  //           contentType: "string",
  //         },
  //         {
  //           columnIndex: 6,
  //           className: " cell cell-appliedby text-dark-0 ",
  //           // content: item.appliedBy || "-",
  //           content: <DsName id={item.tenderId + "appliedBy"} name={item.appliedBy || "-"} />,
  //           filterValue: item.appliedBy || "-",
  //           contentType: "string",
  //         },
  //         {
  //           columnIndex: 7,
  //           className: " cell cell-suppliedby text-dark-0 ",
  //           // content: item.suppliedBy || "-",
  //           content: <DsName id={item.tenderId + "suppliedBy"} name={item.suppliedBy || "-"} />,
  //           filterValue: item.suppliedBy || "-",
  //           contentType: "string",
  //         },
  //         {
  //           columnIndex: 8,
  //           className: " cell cell-preparedby text-dark-0 ",
  //           // content: item.preparedBy || "-",
  //           content: <DsName id={item.tenderId + "preparedBy"} name={item.preparedBy || "-"} />,
  //           filterValue: item.preparedBy || "-",
  //           contentType: "string",
  //         },
  //         {
  //           columnIndex: 9,
  //           className: " cell cell-value text-dark-1 ",

  //           content: <DsCurrency format={"IND"} id={"value"} amount={parseInt(item.value)} type={"short"} />,
  //           filterValue: item.value,
  //           contentType: "number",
  //         },
  //         {
  //           columnIndex: 10,
  //           className: " cell cell-status ",

  //           content: item.status ? (
  //             <DsStatusIndicator
  //               type="user_defined"
  //               className={`${item?.status?.tenderStatus
  //                 ? styles[
  //                 item?.status?.tenderStatus
  //                   ?.replaceAll(" ", "_")
  //                   .toLowerCase()
  //                 ]
  //                 : ""
  //                 }`}
  //               status={item.status.tenderStatus}
  //               label={item.status.tenderStatus}
  //               comment={
  //                 item.status?.message
  //                   ? typeof item.status.message === "object"
  //                     ? JSON.stringify(item.status.message)
  //                     : item.status.message.toString()
  //                   : ""
  //               }
  //             />
  //           ) :
  //             (
  //               "No Status"
  //             ),
  //           filterValue: item.status.tenderStatus,
  //           contentType: "reactNode",
  //         },
  //       ],

  //     }));

  //     console.log("Final Transformed Rows:", transformedRows);

  //     setTimeout(() => {
  //       setTempTableData((data) => ({ ...data, rows: transformedRows }));
  //     }, 1);
  //   }
  // }, [filteredData]);


  // const handleFetch = async () => {
  //   try {
  //     const res = await fetchData({ url: getAllTenders });


  //     console.log("Fetched Response:", res);


  //     if (res?.code === 200 && Array.isArray(res?.result)) {
  //       const mappedData: Tender[] = res.result.map((item: Tender) => ({
  //         customerName: item.customerName,
  //         submittionDate: item.submissionDate,
  //         daystosubmit: item.daysToSubmit ?? "N/A",
  //         tenderId: item.tenderId.toString(),
  //         type: item.customerType,
  //         tenderType: item.tenderType,
  //         depot: item.shippingLocations.map((loc: Tender) => loc.name).join(", "),
  //         appliedBy: item.applierName,
  //         suppliedBy: item.supplierName,
  //         preparedBy: item.preparedBy,
  //         value: item.value.toString(),
  //         status: {
  //           tenderStatus: item.status?.tenderStatus ?? "null",
  //           message: item.status?.message ?? "No message",
  //         },
  //         customAttributes: { iconValue: "defaultIcon" },
  //       }));

  //       setData(mappedData);
  //     } else {
  //       console.error("Error: Invalid response format or empty result", res);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };


  const handleFetch = async () => {
    const onlyStatus = {
      "userId": 3,
      "pageNo": 0,
      "pageSize": 0,
      "quickFilter": selectedStatus,
    }
    const onlySearch = {
      "userId": 3,
      "pageNo": 0,
      "pageSize": 0,
      "searchTerm": searchQuery
    }
    const statusAndSearch = {
      "userId": 3,
      "pageNo": 0,
      "pageSize": 0,
      "quickFilter": selectedStatus,
      "searchTerm": searchQuery,
    }
    const advanceFilter = {
      "userId": 3,
      "pageNo": 0,
      "pageSize": 0,
      "filters": advFilter,
    }
    const advanceAndSearch = {
      "userId": 3,
      "pageNo": 0,
      "pageSize": 0,
      "filters": advFilter,
      "searchTerm": searchQuery,
    }
    const tenderFilters = advFilter && Object.keys(advFilter).length > 0 && searchQuery
      ? advanceAndSearch
      : advFilter && Object.keys(advFilter).length > 0
        ? advanceFilter
        : selectedStatus && searchQuery
          ? statusAndSearch
          : selectedStatus
            ? onlyStatus
            : searchQuery
              ? onlySearch
              : { "userId": 3, "pageNo": 0, "pageSize": 0 };
      console.log("json object :",JSON.stringify(tenderFilters));
    await fetchData({
      url: getAllTenders,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Tenders-Filters": JSON.stringify(tenderFilters),
      },
    })
      .then((res) => {
        console.log("objevct to be send", tenderFilters);
        console.log("Response RESULT:", res.result);

        if (res?.code === 200 && Array.isArray(res?.result)) {
          const formattedData = formatTenders (res?.result);
          console.log("formatted data:", formattedData);
          setData(formattedData);
          // addOrder(formattedData);
        }
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });

  };

  const formatTenders = (tenders: Tender[]): Tender[] => {
    return tenders.map((item) => ({
      ...tenders,
    
      customerName: item.customerName,
              submittionDate: item.submissionDate,
              daystosubmit: item.daysToSubmit ?? "N/A",
              tenderId: item.tenderId.toString(),
              type: item.customerType,
              tenderType: item.tenderType,
              depot: item.shippingLocations.map((loc: Tender) => loc.name).join(", "),
              appliedBy: item.applierName,
              suppliedBy: item.supplierName,
              preparedBy: item.preparedBy,
              value: item.value.toString(),
              status: {
                tenderStatus: item.status?.tenderStatus ?? "null",
                message: item.status?.message ?? "No message",
              },
              customAttributes: { iconValue: "defaultIcon" },


    }));
  };

  const handleFiltersApplied = (apiFilter: Record<string, any>) => {
    console.log("Received apiFilter in parent:", apiFilter);
    // Use apiFilter to make API calls or update state
    setAdvFilter(apiFilter);
    console.log("advvvvvvvv", advFilter);
  };


  const handleFetchMetaData = async () => {
    await fetchData({ url: getAllMetaData })
      .then((res) => {
        console.log("Meta Fetched Response:", res); // Log the fetched response

        if (res?.code === 200 && res?.result?.tenderType && Array.isArray(res.result.tenderType)) {
          setMetaData(res.result.tenderType); // Store only tenderType
          console.log("Stored Tender Type:", res.result.tenderType);
        } else {
          console.error("Error: Invalid data format or empty tenderType");
        }
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  };





  const [filters, setFilters] = useState<filterTypes[]>([]);
  useEffect(() => {
    const fetchFilters = async () => {
      try {

        const updatedFilters: filterTypes[] = [
    

          { filterId: "0", filterFor: "Customer", filterType: "SearchAndMultiSelect"},
          { filterId: "1", filterFor: "Date", filterType: "DateRange", maxValue: new Date(2025, 9, 21).getTime(), minValue: new Date(2050, 11, 26).getTime() },
          { filterId: "2", filterFor: "Type", filterType: "MultiSelection", multiSelectOptions:  [
            { label: "Institutional", value: "institutional" },
            { label: "corporate", value: "corporate" },
          ]
        },
          { filterId: "3", filterFor: "Supply type", filterType: "MultiSelection", multiSelectOptions:  [
            { label: "Multi-delivery", value: "multidelivery" },
            { label: "single-delivery", value: "singledelivery" },
          ]
        },
          { filterId: "4", filterFor: "Applied by", filterType: "MultiSelection", multiSelectOptions: [
            { label: "Ipca", value: "Ipca" },
            { label: "Stockist", value: "stockist" },
          ]
        },
          { filterId: "5", filterFor: "Supplied by", filterType: "MultiSelection", multiSelectOptions:  [
            { label: "Ipca", value: "Ipca" },
            { label: "Stockist", value: "stockist" },
          ]
        }, 
          { filterId: "6", filterFor: "Depot", filterType: "MultiSelection", multiSelectOptions:  [
            { label: "pune", value: "pune" },
            { label: "satara", value: "satara" },
          ]
        },
          { filterId: "7", filterFor: "Supply type", filterType: "MultiSelection", multiSelectOptions: [
            { label: "abc", value: "abc" },
            { label: "abc", value:"abc" },
          ]
        },
          { filterId: "8", filterFor: "Value", filterType: "RangeSlider", maxValue: 4000000, minValue: 0 },
          { filterId: "9", filterFor: "Status", filterType: "MultiSelection", multiSelectOptions:  [
            { label: "Apporavl", value: "Approval" },
            { label: "cancelled", value: "cancelled" },
          ]
        },


          // { filterId: "0", filterFor: "Customer", filterType: "SearchAndMultiSelect"},
          // { filterId: "1", filterFor: "Date", filterType: "DateRange", maxValue: new Date(2025, 9, 21).getTime(), minValue: new Date(2050, 11, 26).getTime() },
          // { filterId: "2", filterFor: "Type", filterType: "MultiSelection", multiSelectOptions: sourceOptions },
          // { filterId: "3", filterFor: "Supply type", filterType: "MultiSelection", multiSelectOptions: statusOptions },
          // { filterId: "4", filterFor: "Applied by", filterType: "MultiSelection", multiSelectOptions: statusOptions }, 
          // { filterId: "5", filterFor: "Supplied by", filterType: "MultiSelection", multiSelectOptions: statusOptions },
          // { filterId: "6", filterFor: "Depot", filterType: "MultiSelection", multiSelectOptions: statusOptions },
          // { filterId: "7", filterFor: "Supply type", filterType: "MultiSelection", multiSelectOptions: statusOptions },
          // { filterId: "8", filterFor: "Value", filterType: "RangeSlider", maxValue: 4000000, minValue: 0 },
          // { filterId: "9", filterFor: "Status", filterType: "MultiSelection", multiSelectOptions: statusOptions },        
        ];

        setFilters(updatedFilters);
        console.log("updatedfilters",filters);

      } catch (error) {
        console.error("Error fetching filter data:", error);
      }
    };

    fetchFilters();
  }, []);
  
  useEffect(() => {
    handleFetch();
    handleFetchMetaData();


  }, []);
  useEffect(() => {
    handleFetch();
  }, [selectedStatus, searchQuery, advFilter]);

  useEffect(() => {
    console.log("Updated MetaData:", metaData);
  }, [metaData]);


  const getTenderTypeDescription = (tenderType?: string) => {
    if (!tenderType || !metaData || metaData.length === 0) return "no found";

    // console.log("Meta Data:", metaData); 

    const matchedItem = metaData.find((item) => item?.codeValue === tenderType);

    if (matchedItem) {
      // console.log("Selected Tender Type:", matchedItem.codeDescription);
      return matchedItem.codeDescription;
    } else {
      console.log("No matching tender type found.");

    }
  };
  function formatDate(isoString) {
    if (!isoString) return "-"; // Handle empty or undefined values
    const date = new Date(isoString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}


  const addTableData = (tender: Tender[]) => {
    console.log("Adding table data:", tender);
    const newRows: DsTableRow[] = tender.map((t, index) => ({
      rowIndex: index,
      className: "cellRow",
      rowIcon:
        t?.type === "institutional" ? (
          <div style={{ width: "0.875em", height: "0.875em", position: "relative" }}>
            <Image src={institutional} alt="institutional" layout="fill" objectFit="cover" />
          </div>
        ) : (
          <div style={{ width: "0.875em", height: "0.875em", position: "relative" }}>
            <Image src={corporate} alt="corporate" layout="fill" objectFit="cover" />
          </div>
        ),
      customAttributes: { iconValue: t?.type?.toString() ?? "" },
      content: [
        {
          columnIndex: 0,
          className: " cell cell-customer text-dark-1 ",
          content: <DsName id={t.tenderId + "customerName"} name={t.customerName || "-"} />,
          filterValue: t.customerName,
          contentType: "string",
        },
        {
          columnIndex: 1,
          className: " cell cell-submissiondate text-dark-0 ",
          content: <DsName id={t.tenderId + "submittionDate"} name={formatDate(t.submittionDate)} />,
          filterValue: t.submittionDate,
          contentType: "string",
        },
        {
          columnIndex: 2,
          className: " cell cell-days-to-submit ",
          content: <DsName id={t.tenderId + "daystosubmit"} name={t.submittionDate ? calculateDueStatus(t.submittionDate) : "-"} />,
          filterValue: t.submittionDate ? calculateDueStatus(t.submittionDate) : "-",
          contentType: "string",
        },
        {
          columnIndex: 3,
          className: " cell cell-tenderid text-dark-0 ",
          content: <DsName id={t.tenderId + "tenderId"} name={t.tenderId || "-"} />,
          filterValue: t.tenderId,
          contentType: "string",
        },


        {
          columnIndex: 4,
          className: "cell cell-tendertype text-dark-1",
          content: <DsName id={t.tenderId + "tenderType"} name={getTenderTypeDescription(t.tenderType)} />,
          filterValue: getTenderTypeDescription(t.tenderType),
          contentType: "string",
        },

        {
          columnIndex: 5,
          className: " cell cell-depot text-dark-1 ",
          // content: t.depot,
          content: <DsName id={t.tenderId + "depot"} name={t.depot || "-"} />,
          filterValue: t.depot,
          contentType: "string",
        },
        {
          columnIndex: 6,
          className: " cell cell-appliedby text-dark-0 ",
          // content: t.appliedBy,
          content: <DsName id={t.tenderId + "appliedBy"} name={t.appliedBy || "-"} />,
          filterValue: t.appliedBy,
          contentType: "string",
        },
        {
          columnIndex: 7,
          className: " cell cell-suppliedby text-dark-0 ",
          // content: t.suppliedBy,
          content: <DsName id={t.tenderId + "suppliedBy"} name={t.suppliedBy || "-"} />,
          filterValue: t.suppliedBy,
          contentType: "string",
        },
        {
          columnIndex: 8,
          className: " cell cell-preparedby text-dark-0 ",
          // content: t.preparedBy,
          content: <DsName id={t.tenderId + "preparedBy"} name={t.preparedBy || "-"} />,
          filterValue: t.preparedBy,
          contentType: "string",
        },
        {
          columnIndex: 9,
          className: " cell cell-value  text-dark-1 ",
          content: <DsCurrency format={"IND"} id={"value"} amount={parseInt(t.value)} type={"short"} />,
          filterValue: t.value,
          contentType: "number",
        },
        {
          columnIndex: 10,
          className: " cell cell-status ",
   
          content: t.status ? (
            <DsStatusIndicator
              type="user_defined"
              className={`${t?.status?.tenderStatus
                ? styles[
                t?.status?.tenderStatus
                  ?.replaceAll(" ", "_")
                  .toLowerCase()
                ]
                : ""
                }`}
              status={t.status.tenderStatus}
              label={t.status.tenderStatus}
              comment={
                t.status?.message
                  ? typeof t.status.message === "object"
                    ? JSON.stringify(t.status.message)
                    : t.status.message.toString()
                  : ""
              }
            />
          ) :
            (
              "No Status"
            ),
          filterValue: t.status?.tenderStatus ?? "Unknown",
          contentType: "reactNode",
        },
      ],

    }));

    console.log("New Rows:", newRows);

    setTempTableData((prevData) => ({
      ...prevData,
      rows: newRows,
    }));
  };

  useEffect(() => {
    console.log("Data updated:", data);
    if (data.length > 0) {
      addTableData(data);
    }
  }, [data]);

  const [selectedRow, setSelectedRow] = useState<{ e: React.MouseEvent<HTMLElement>; rowIndex: number; statuscell: string } | null>(null);

  return (
    <>
      <DsApplication
        appTitle="Tenders"
        appMenu={
          <>
            <DsFilterActions
             searchQuery={searchQuery}
             setSearchQuery={setSearchQuery}
             selectedStatus={selectedStatus}
             setSelectedStatus={setSelectedStatus}   />
            {newButtonVisible &&
    
              <DsButton
              id="actionBtn"
              buttonColor="btnPrimary"
              className={btnStyles.btnOutlined}
              startIcon={
                <div
                  style={{
                    width: "0.875em",
                    height: "0.875em",
                    position: "relative",
                  }}
                >
                  <Image
                    src={iconSrc}
                    alt="Add Icon"
                    layout="fill"
                    objectFit="cover"
                  />
                  </div>
                }
                onClick={(e) =>
                  displayContext(e, "CreateNewActions", "vertical", "right")
                }
                onHover={(e) => {
                  changeImage(e, addIconWhite);
                }}
                onMouseLeave={(e) => {
                  changeImage(e, addIcon);
                }}
                tooltip="variants : btnPrimary, btnOutlined, btnMedium"
                label="New"
                iconSize="iconMedium"
              />}

          </>
        }

      >
        <div className={styles.totalCal}>
          <DsTotalTenders data={data} />
          <DsTotalValues data={data} />
        </div>
        <div className={styles.container}>
          {" "}
          <div className={tempTableData.className}>
            <DsTableComponent
              className={tempTableData.className}
              id={tempTableData.id}
              hasSearch={tempTableData.hasSearch}
              columns={tempTableData.columns}
              hasIcons={true}
              isSelectAble={false}
              rows={tempTableData.rows}
              isFooterRequired={true}
              isSortable={true}
              handleRowClick={(e, rowIndex) => {
                const row = tempTableData.rows[rowIndex];
              
                // Convert statuscell to string if it's not already one
                const statuscell = String(
                  row?.content?.find((cell) => cell?.columnIndex === 10)?.filterValue ?? ""
                );
              
                console.log("statuscellintable", statuscell);
              
                // Store selected row data
                setSelectedRow({ e, rowIndex, statuscell });
              }}
              
              
            />
          </div>
          {selectedRow && (
          <DsTenderTableFloatingMenu
            e={selectedRow.e}
            rowIndex={selectedRow.rowIndex}
            statuscell={selectedRow.statuscell}
          />
)}
        </div>

      </DsApplication>
      {/* <DsPane id="tenderFilter" side="right" title="Filter"> */}
      <DsAdvanceFilterPane
        filters={filters}
        onFiltersApplied={handleFiltersApplied}
      />
      {/* </DsPane> */}

      <ContextMenu
        id={"CreateNewActions"}
        showArrow={true}
        content={
          <div className={styles.ContextCreateNew}>
            <DsNavTo
              id="institutional"
              buttonColor="btnPrimary"
              buttonViewStyle="btnText"
              className={styles.MenuBtn}
              location="Tender/TenderId"
              label="Institutional"
            />
            <DsNavTo
              id="corporate"
              buttonColor="btnPrimary"
              buttonViewStyle="btnText"
              className={styles.MenuBtn}
              location="/Tender/New"
              label="Corporate"
            />
          </div>


        }
      ></ContextMenu>
    </>
  );
}

