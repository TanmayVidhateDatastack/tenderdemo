"use client";

import DsApplication from "@/Elements/ERPComponents/DsApplicationComponents/DsApplication";
import DsNavTo from "@/Elements/ERPComponents/DsNavigationComponent/DsNavTo";
import styles from "./page.module.css";
import DsFilterActions from "@/TenderComponents/TenderLogComponents/DsFilterActions";


import { useEffect, useState } from "react";
import { CodeItem, datalistOptions, DsTableRow, tableData, Tender } from "@/Common/helpers/types";
import DsTotalTenders from "@/TenderComponents/TenderLogComponents/DsTotalTender";
import DsTotalValues from "@/TenderComponents/TenderLogComponents/DsTotalValues";
import DsButton from "@/Elements/DsComponents/DsButtons/dsButton";
import ContextMenu, { displayContext } from "@/Elements/DsComponents/dsContextHolder/dsContextHolder";

import DsStatusIndicator from "@/Elements/DsComponents/dsStatus/dsStatusIndicator";
import { getAllDepots, getAllMetaData, getAllTenders, searchCustomerURL } from "@/Common/helpers/constant";
import fetchData from "@/Common/helpers/Method/fetchData";
import DsTableComponent from "@/Elements/DsComponents/DsTablecomponent/DsTableComponent";


import DsCurrency from "@/Elements/DsComponents/dsCurrency/dsCurrency";

import { RootState } from "@/Redux/store/store";
import { useAppSelector } from "@/Redux/hook/hook";
import DsName from "@/Elements/DsComponents/DsName/DsName";
import btnStyles from "@/Elements/DsComponents/DsButtons/dsButton.module.css";
import DsTenderTableFloatingMenu from "@/TenderComponents/TenderLogComponents/TenderlogFloatingMenu";
import DsAdvanceFilterPane from "@/TenderComponents/TenderLogComponents/DsAdvanceFilterPane";
import style from "./page.module.css";
import IconFactory from "@/Elements/IconComponent";
import { areSearchCustomers } from "@/TenderComponents/AddUpdateTenderComponents/BasicDetailComponents/customerSearch";

const metaDataTypes = [
  "TENDER_TYPE",
  "CUSTOMER_TYPE",
  "TENDER_STATUS",
];

//valid code types for metadata
// const validCodesTypes = [
//   "PAYMENT_MODE",
//   "TENDER_TYPE",
//   "CUSTOMER_TYPE",
//   "SUBMISSION_MODE",
//   "SUPPLY_POINT",
//   "TEST_REPORT_REQUIREMENT",
//   "ELIGIBILITY",
//   "FEES_TYPE",
//   "TENDER_SUPPLY_CONDITION",
//   "DOCUMENT_TYPE",
//   "TENDER_STATUS",
//   "JUSTIFICATION_APPROVE_TYPE",
//   "JUSTIFICATION_REVISE_TYPE",
//   "JUSTIFICATION_REJECT_TYPE"
// ];

interface Metadata {
  documentType?: CodeItem[];
  eligibility?: CodeItem[];
  feesType?: CodeItem[];
  paymentMode?: CodeItem[];
  submissionMode?: CodeItem[];
  supplyPoint?: CodeItem[];
  tenderSupplyCondition?: CodeItem[];
  tenderType?: CodeItem[];
  testReportRequirement?: CodeItem[];
  tenderStatus?: CodeItem[];
  justificationApproveType?: CodeItem[];
  justificationReviseType?: CodeItem[];
  justificationRejectType?: CodeItem[];
  customerType?: CodeItem[];
}

type Depot = {
  id: number;
  name: string;
  code: string;
}


export default function Home() {
  const [data, setData] = useState<Tender[]>([]); //for table data
  const [searchQuery, setSearchQuery] = useState(""); //for search query
  const [selectedStatus, setSelectedStatus] = useState(""); //for quickfilter
  const [advFilter, setAdvFilter] = useState<Record<string, React.ReactNode>>({});
  const [isFilterActive, setIsFilterActive] = useState(true);
  // const [enrichedTenders, setEnrichedTenders] = useState<Tender[]>([]);
  // const [filteredData, setFilteredData] = useState<Tender[]>([]); //for filtered table data
  const [tenderMetadataFilters, setTenderMetadataFilters] = useState<{ userId: number; metaDataTypes: string[] }>({
    userId: 3,
    metaDataTypes: [],
  });
  const [fetchedMetadata, setFetchedMetadata] = useState<Metadata>({})
  // console.log(isFilterActive);
  const [isAddWhite, setIsAddWhite] = useState<boolean>(false);


  // const [paymentMode, setPaymentMode] = useState<CodeItem[]>([]);
  const [tenderType, setTenderType] = useState<CodeItem[]>([]);
  const [customerType, setCustomerType] = useState<CodeItem[]>([]);
  // const [submissionMode, setSubmissionMode] = useState<CodeItem[]>([]);
  // const [supplyPoint, setSupplyPoint] = useState<CodeItem[]>([]);
  // const [testReportRequirement, setTestReportRequirement] = useState<CodeItem[]>([]);
  // const [eligibility, setEligibility] = useState<CodeItem[]>([]);
  // const [feesType, setFeesType] = useState<CodeItem[]>([]);
  // const [tenderSupplyCondition, setTenderSupplyCondition] = useState<CodeItem[]>([]);
  // const [documentType, setDocumentType] = useState<CodeItem[]>([]);
  const [tenderStatus, setTenderStatus] = useState<CodeItem[]>([]);
  const [depotList, setDepotList] = useState<Depot[]>([]);


  const permissions = useAppSelector((state: RootState) => state.permissions);


  const {
    newButtonVisible

  } = permissions;

  const [tempTableData, setTempTableData] = useState<tableData>({
    className: style.tenderTable,
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

    return getStyledDueStatus(result, diffDays);
  };

  const getStyledDueStatus = (result: string, diffDays: number) => {
    let className = styles.blackText;
    if (diffDays <= 0) className = styles.zeroText;
    else if (diffDays <= 20) className = styles.orangeText;

    return <span className={className}>{result}</span>;
  };




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
    // console.log("json object :", JSON.stringify(tenderFilters));
    await fetchData({
      url: getAllTenders,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Tenders-Filters": JSON.stringify(tenderFilters),
      },
    })
      .then((res) => {
        // console.log("objevct to be send", tenderFilters);
        console.log("Response RESULT:", res.result);

        if (res?.code === 200 && Array.isArray(res?.result)) {
          const formattedData = formatTenders(res?.result);
          // console.log("formatted data:", formattedData);
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

  const [searchOptions, setSearchOptions] = useState<datalistOptions[]>([]);
  function setOptions(values: unknown) {
    if (areSearchCustomers(values)) {
      const customers: datalistOptions[] = values.map(
        (x: { id: number; code: string; name: string }) => {
          return {
            id: x?.id?.toString(),
            label: x?.code.toUpperCase() + " - " + x.name,
            value: x?.code.toUpperCase() + " - " + x.name,
            attributes: { "customer-id": x.id.toString() },
          };
        }
      );
      return customers;
    } else return [];
  }

  const handleFiltersApplied = (apiFilter: Record<string, React.ReactNode>) => {
    // console.log("Received apiFilter in parent:", apiFilter);
    // Use apiFilter to make API calls or update state
    setAdvFilter(apiFilter);
    setIsFilterActive(false);
    // console.log("advv filter", advFilter);
  };

  useEffect(() => {
    // Filtering only valid metadata keys from advFilter
    const filteredMetaData = metaDataTypes.filter((key) => advFilter?.[key] !== undefined);

    // Updating state with filtered metadata
    setTenderMetadataFilters({ userId: 3, metaDataTypes: filteredMetaData });

    // console.log("Filtered Metadata Filters:", { userId: 3, metaDataTypes: filteredMetaData });

  }, [advFilter])

  useEffect(() => {
    // console.log("fetched metadata : ", fetchedMetadata);
    if (fetchedMetadata) {
      // if (fetchedMetadata.documentType) setDocumentType(fetchedMetadata.documentType);
      // if (fetchedMetadata.eligibility) setEligibility(fetchedMetadata.eligibility);
      // if (fetchedMetadata.feesType) setFeesType(fetchedMetadata.feesType);
      // if (fetchedMetadata.paymentMode) setPaymentMode(fetchedMetadata.paymentMode);
      // if (fetchedMetadata.submissionMode) setSubmissionMode(fetchedMetadata.submissionMode);
      // if (fetchedMetadata.supplyPoint) setSupplyPoint(fetchedMetadata.supplyPoint);
      // if (fetchedMetadata.tenderSupplyCondition) setTenderSupplyCondition(fetchedMetadata.tenderSupplyCondition);
      if (fetchedMetadata.tenderType) setTenderType(fetchedMetadata.tenderType);
      // if (fetchedMetadata.testReportRequirement) setTestReportRequirement(fetchedMetadata.testReportRequirement);
      if (fetchedMetadata.tenderStatus) setTenderStatus(fetchedMetadata.tenderStatus);
      if (fetchedMetadata.customerType) setCustomerType(fetchedMetadata.customerType);
    }
  }, [fetchedMetadata])

  const handleFetchMetaData = async () => {
    await fetchData({
      url: getAllMetaData,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Tender-Codes": JSON.stringify(metaDataTypes),
      },
    })
      .then((res) => {
        console.log("Meta Fetched Response:", res); // Log the fetched response

        if (res?.code === 200 && res?.result) {
          // if(res?.c)
          setFetchedMetadata(res.result); // Store only tenderType
          console.log("Stored Tender Type:", res.result);
        } else {
          console.error("Error: Invalid data format or empty tenderType");
        }
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  };


  const handleFetchDepot = async () => {
    await fetchData({
      url: getAllDepots
    })
      .then((res) => {
        console.log("depot fetched response :", res); // Log the fetched response

        if (res?.code === 200 && res?.result) {
          // if(res?.c)
          setDepotList(res.result);
          console.log("stored depot result:", res.result);
        } else {
          console.error("Error: Invalid data format or empty depot");
        }
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  };


  // const [filters, setFilters] = useState<filterTypes[]>([]);
  // useEffect(() => {
  //   const fetchFilters = async () => {
  //     try {

  //       const updatedFilters: filterTypes[] = [


  //         { filterId: "0", filterFor: "customer", filterType: "SearchAndMultiSelect"},
  //         { filterId: "1", filterFor: "date", filterType: "DateRange", maxValue: new Date(2025, 9, 21).getTime(), minValue: new Date(2050, 11, 26).getTime() },
  //         { filterId: "2", filterFor: "customerTypes", filterType: "MultiSelection", multiSelectOptions:  [
  //           { label: "Institutional", value: "institutional" },
  //           { label: "corporate", value: "corporate" },
  //         ]
  //       },
  //         { filterId: "3", filterFor: "tenderTypes", filterType: "MultiSelection", multiSelectOptions:  [
  //           { label: "Multi-delivery", value: "multidelivery" },
  //           { label: "single-delivery", value: "singledelivery" },
  //         ]
  //       },
  //         { filterId: "4", filterFor: "Applied by", filterType: "MultiSelection", multiSelectOptions: [
  //           { label: "Ipca", value: "Ipca" },
  //           { label: "Stockist", value: "stockist" },
  //         ]
  //       },
  //         { filterId: "5", filterFor: "Supplied by", filterType: "MultiSelection", multiSelectOptions:  [
  //           { label: "Ipca", value: "Ipca" },
  //           { label: "Stockist", value: "stockist" },
  //         ]
  //       }, 
  //         { filterId: "6", filterFor: "Depot", filterType: "MultiSelection", multiSelectOptions:  [
  //           { label: "pune", value: "pune" },
  //           { label: "satara", value: "satara" },
  //         ]
  //       },

  //         { filterId: "7", filterFor: "Value", filterType: "RangeSlider", maxValue: 4000000, minValue: 0 },
  //         { filterId: "8", filterFor: "Status", filterType: "MultiSelection", multiSelectOptions:  [
  //           { label: "Apporavl", value: "Approval" },
  //           { label: "cancelled", value: "cancelled" },
  //         ]
  //       },


  //       ];

  //       setFilters(updatedFilters);
  //       console.log("updatedfilters",filters);

  //     } catch (error) {
  //       console.error("Error fetching filter data:", error);
  //     }
  //   };

  //   fetchFilters();
  // }, []);

  useEffect(() => {
    handleFetch();
    handleFetchMetaData();
    handleFetchDepot();

  }, []);
  useEffect(() => {
    handleFetch();
  }, [selectedStatus, searchQuery, advFilter]);

  // useEffect(() => {
  //   console.log("Updated MetaData:", metaData);
  // }, [metaData]);


  const getTenderTypeDescription = (tenderType?: string) => {
    if (!tenderType || !fetchedMetadata) return "no found";

    // console.log("Meta Data:", metaData); 

    const matchedItem = fetchedMetadata.tenderType?.find((type) => type.codeValue === tenderType);

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
    // console.log("Adding table data:", tender);
    const newRows: DsTableRow[] = tender.map((t, index) => ({
      rowIndex: index,
      className: "cellRow ",
      rowIcon:
        t?.type === "INSTITUTION" ? (
          <div style={{ width: "0.875em", height: "0.875em", position: "relative" }}>
            {/* <Image src={institutional} alt="institutional" layout="fill" objectFit="cover" /> */}
            <IconFactory name={"instituitional"} />
          </div>
        ) : (
          <div style={{ width: "0.875em", height: "0.875em", position: "relative" }}>
            {/* <Image src={corporate} alt="corporate" layout="fill" objectFit="cover" /> */}
            <IconFactory name={"corporate"} />
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
          filterValue: t.submittionDate,
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
          // content: <DsName id={t.tenderId + "tenderType"} name={t.tenderType || "-"} />,
          content: <DsName id={t.tenderId + "tenderType"} name={getTenderTypeDescription(t.tenderType)} />,
          filterValue: t.tenderType,
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
          content: <DsCurrency format={"IND"} id={"value"} amount={parseFloat(t.value)} type={"short"} />,
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
    // console.log("Data updated:", data);
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
              setSelectedStatus={setSelectedStatus} />
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
                    {/* <Image
                    src={iconSrc}
                    alt="Add Icon"
                    layout="fill"
                    objectFit="cover"
                  /> */}
                    <IconFactory name="add" isWhite={isAddWhite} />
                  </div>
                }
                onClick={(e) =>
                  displayContext(e, "CreateNewActions", "vertical", "right")
                }
                onHover={() => {
                  setIsAddWhite(true);
                  // changeImage(e, addIconWhite);
                }}
                onMouseLeave={() => {
                  setIsAddWhite(false);

                  // changeImage(e, addIcon);
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

                // console.log("statuscellintable", statuscell);

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

      <DsAdvanceFilterPane
        filters={[
          {
            filterId: "0",
            filterFor: "Customers",
            filterType: "SearchAndMultiSelect",
            multiSearchData: {
              options: searchOptions,
              setOptions: (options) => {
                const customers = setOptions(options);
                setSearchOptions(customers);
              },
              setSearchUrl: (term) => {
                return searchCustomerURL + term;
              },
            },


          },
          {
            filterId: "1",
            filterFor: "Date",
            filterType: "DateRange",
            maxValue: new Date(2025, 9, 21).getTime(),
            minValue: new Date(2050, 11, 26).getTime()
          },

          {
            filterId: "2",
            filterFor: "Customer Types",
            filterType: "MultiSelection",
            multiSelectOptions: customerType.map((item) => ({
              label: item.codeDescription,
              value: item.codeValue,
            })),
          },
          {
            filterId: "3",
            filterFor: "Tender Types",
            filterType: "MultiSelection",
            multiSelectOptions: tenderType.map((item) => ({
              label: item.codeDescription,
              value: item.codeValue,
            })),
          },

          {
            filterId: "4",
            filterFor: "Applied by",
            filterType: "MultiSelection",
            multiSelectOptions:
              [
                { label: "Ipca", value: "IPCA" },
                { label: "Stockist", value: "stockist" },
              ]
          },
          {
            filterId: "5",
            filterFor: "Supplied by",
            filterType: "MultiSelection",
            multiSelectOptions:
              [
                { label: "Ipca", value: "IPCA" },
                { label: "Stockist", value: "stockist" },
              ]
          },
          {
            filterId: "6",
            filterFor: "Depot",
            filterType: "MultiSelection",
            multiSelectOptions: depotList.map((item) => ({
              label: item.name,
              value: item.id.toString(),
            })),
          },

          {
            filterId: "7",
            filterFor: "Value",
            filterType: "RangeSlider",
            maxValue: 4000000, minValue: 0

          },
          {
            filterId: "8",
            filterFor: "Status",
            filterType: "MultiSelection",
            multiSelectOptions: tenderStatus.map((item) => ({
              label: item.codeDescription,
              value: item.codeValue,
            })),
          },

        ]}
        onFiltersApplied={handleFiltersApplied}
        setIsQuickFilter={setIsFilterActive}
      />


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

