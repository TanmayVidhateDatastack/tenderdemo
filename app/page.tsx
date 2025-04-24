"use client";

import DsApplication from "@/Elements/ERPComponents/DsApplicationComponents/DsApplication";
import DsNavTo from "@/Elements/ERPComponents/DsNavigationComponent/DsNavTo";
import styles from "./page.module.css";
import DsFilterActions from "@/TenderComponents/TenderLogComponents/DsFilterActions";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  CodeItem,
  datalistOptions,
  DsTableRow,
  tableData,
  Tender,
} from "@/Common/helpers/types";
import DsTotalTenders from "@/TenderComponents/TenderLogComponents/DsTotalTender";
import DsTotalValues from "@/TenderComponents/TenderLogComponents/DsTotalValues";
import DsButton from "@/Elements/DsComponents/DsButtons/dsButton";
import ContextMenu, {
  displayContext,
} from "@/Elements/DsComponents/dsContextHolder/dsContextHolder";

import DsStatusIndicator from "@/Elements/DsComponents/dsStatus/dsStatusIndicator";
import {
  getAllDepots,
  getAllMetaData,
  getAllTenders,
  getApplierSupplierDetails,
  searchCustomerURL,
} from "@/Common/helpers/constant";
import fetchData from "@/Common/helpers/Method/fetchData";
import DsTableComponent from "@/Elements/DsComponents/DsTablecomponent/DsTableComponent";
import { useRouter } from "next/navigation";

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
import Toaster from "@/Elements/DsComponents/DsToaster/DsToaster";

const metaDataTypes = ["TENDER_TYPE", "CUSTOMER_TYPE", "TENDER_STATUS"];

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
};

export default function Home() {
  const [data, setData] = useState<Tender[]>([]); //for table data
  const [searchQuery, setSearchQuery] = useState(""); //for search query
  const [selectedStatus, setSelectedStatus] = useState(""); //for quickfilter
  const [advFilter, setAdvFilter] = useState<Record<string, React.ReactNode>>(
    {}
  );
  const [isFilterActive, setIsFilterActive] = useState(true);
  // const [enrichedTenders, setEnrichedTenders] = useState<Tender[]>([]);
  // const [filteredData, setFilteredData] = useState<Tender[]>([]); //for filtered table data
  const [tenderMetadataFilters, setTenderMetadataFilters] = useState<{
    userId: number;
    metaDataTypes: string[];
  }>({
    userId: 3,
    metaDataTypes: [],
  });
  const [fetchedMetadata, setFetchedMetadata] = useState<Metadata>({});
  // console.log(isFilterActive);
  const [isAddWhite, setIsAddWhite] = useState<boolean>(false);

  const [tenderType, setTenderType] = useState<CodeItem[]>([]);
  const [customerType, setCustomerType] = useState<CodeItem[]>([]);

  const [tenderStatus, setTenderStatus] = useState<CodeItem[]>([]);
  const [applierSupplier, setApplierSupplier] = useState<CodeItem[]>([]);
  const [depotList, setDepotList] = useState<Depot[]>([]);
  // const [uniqueAppliers, setUniqueAppliers] = useState<{ label: string; value: string }[]>([]);

  const permissions = useAppSelector((state: RootState) => state.permissions);

  const { newButtonVisible } = permissions;

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
        sort: "CLEAR",
        columnContentType: "reactNode",
        hasSort: true,
      },
    ],
    rows: [],
  });

  const calculateDueStatus = (submittionDate: string) => {
    if (!submittionDate) return "-"; // Handle empty values

    let subDate = new Date(submittionDate);

    // If parsing fails, try manual parsing
    if (isNaN(subDate.getTime())) {
      // Handle formats like "DD/MM/YYYY"
      const dateParts = submittionDate.split(/[\/\-\.]/);
      if (dateParts.length === 3) {
        let day, month, year;

        if (submittionDate.includes("/")) {
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
    const todayUTC = new Date(
      Date.UTC(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate()
      )
    );

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
      userId: 3,
      pageNo: 0,
      pageSize: 0,
      quickFilter: selectedStatus,
    };
    const onlySearch = {
      userId: 3,
      pageNo: 0,
      pageSize: 0,
      searchTerm: searchQuery,
    };
    const statusAndSearch = {
      userId: 3,
      pageNo: 0,
      pageSize: 0,
      quickFilter: selectedStatus,
      searchTerm: searchQuery,
    };
    const advanceFilter = {
      userId: 3,
      pageNo: 0,
      pageSize: 0,
      filters: advFilter,
    };
    const advanceAndSearch = {
      userId: 3,
      pageNo: 0,
      pageSize: 0,
      filters: advFilter,
      searchTerm: searchQuery,
    };
    const tenderFilters =
      advFilter && Object.keys(advFilter).length > 0 && searchQuery
        ? advanceAndSearch
        : advFilter && Object.keys(advFilter).length > 0
        ? advanceFilter
        : selectedStatus && searchQuery
        ? statusAndSearch
        : selectedStatus
        ? onlyStatus
        : searchQuery
        ? onlySearch
        : { userId: 3, pageNo: 0, pageSize: 0 };
    // console.log("json object :", JSON.stringify(tenderFilters));
    await fetchData({
      url: getAllTenders,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-tender-filters": JSON.stringify(tenderFilters),
      },
    })
      .then((res) => {
        // console.log("objevct to be send", tenderFilters);

        if (res?.code === 200 && Array.isArray(res?.result)) {
          console.log("getAllTenders:", res);
          const formattedData = formatTenders(res?.result);
          // console.log("formatted data:", formattedData);
          setData(formattedData);
          // addOrder(formattedData);
        } else {
          setData([]);
        }
      })
      .catch((error) => {
        // console.error("Error fetching orders:", error);
      });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formatTenders = (tenders: any[]): Tender[] => {
    return tenders.map((item) => ({

      customerName: item.customerName,
      submissionDate: item.submissionDate,
      daysToSubmit: item.daysToSubmit ?? "N/A",
      tenderId: item.tenderId.toString(),
      tenderNumber: item.tenderNumber.toString(),
      customerType: item.customerType,
      tenderType: item.tenderType,
      depot: item.shippingLocations
        .map((loc: { name: string; id: number }) => loc.name)
        .join(", "),
      appliedBy: item.applierName,
      suppliedBy: item.supplierName,
      preparedBy: item.preparedBy,
      value: item.value.toString(),
      status: {
        tenderStatus: item.status?.tenderStatus ?? "-",
        message: item.status?.message ?? "-",
        statusDescription: item.status?.tenderStatusDescription ?? "-",
      },
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
    setAdvFilter(apiFilter);
    setIsFilterActive(false);
  };

  const [uniqueAppliers, setUniqueAppliers] = useState<
    { label: string; value: string }[]
  >([]);
  const [applierDetails, setApplierDetails] = useState<string[]>([]);
  const [supplierDetails, setSupplierDetails] = useState<string[]>([]);
  const [selectedRow, setSelectedRow] = useState<{
    e?: React.MouseEvent<HTMLElement>;
    rowIndex?: number;
    statuscell?: string;
    tenderId?: number;
  } | null>(null);

  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      const names1 = data.map((item) => item.appliedBy);
      setApplierDetails(names1);

      const name2 = data.map((item) => item.suppliedBy);
      setSupplierDetails(name2);
    } else {
      setUniqueAppliers([]);
    }
  }, [data]);

  useEffect(() => {
    const filteredMetaData = metaDataTypes.filter(
      (key) => advFilter?.[key] !== undefined
    );

    setTenderMetadataFilters({ userId: 3, metaDataTypes: filteredMetaData });
  }, [advFilter]);

  useEffect(() => {
    if (fetchedMetadata) {
      if (fetchedMetadata.tenderType) setTenderType(fetchedMetadata.tenderType);
      if (fetchedMetadata.tenderStatus)
        setTenderStatus(fetchedMetadata.tenderStatus);
      if (fetchedMetadata.customerType)
        setCustomerType(fetchedMetadata.customerType);
    }
  }, [fetchedMetadata]);

  const handleFetchMetaData = async () => {
    await fetchData({
      url: getAllMetaData,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-tender-codes": JSON.stringify(metaDataTypes),
      },
    })
      .then((res) => {
        if (res?.code === 200 && res?.result) {
          // if(res?.c)

          setFetchedMetadata(res.result); // Store only tenderType
          // console.log("Stored Tender Type:", res.result);
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
      url: getAllDepots,
    })
      .then((res) => {
        if (res?.code === 200 && res?.result) {
          // if(res?.c)
          setDepotList(res.result);
          // console.log("stored depot result:", res.result);
        } else {
          console.error("Error: Invalid data format or empty depot");
        }
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  };

  const handleFetchApplierSupplier = async () => {
    await fetchData({
      url: getApplierSupplierDetails,
    })
      .then((res) => {
        if (res?.code === 200 && res?.result) {
          // if(res?.c)
          setApplierSupplier(res.result?.appliedBySuppliedBy);
          // console.log("stored applier supplier  result:", res.result);
        } else {
          // console.error("Error: Invalid data format or empty depot");
        }
      })
      .catch((err) => {
        // console.error("Error fetching data:", err);
      });
  };

  useEffect(() => {
    // handleFetch();
    handleFetchMetaData();
    handleFetchDepot();
    handleFetchApplierSupplier();
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

    const matchedItem = fetchedMetadata.tenderType?.find(
      (type) => type.codeValue === tenderType
    );

    if (matchedItem) {
      // console.log("Selected Tender Type:", matchedItem.codeDescription);
      return matchedItem.codeDescription;
    }
  };

  const addTableData = (tender: Tender[]) => {
    // console.log("Adding table data:", tender);
    const newRows: DsTableRow[] = tender.map((t, index) => {
      let rowIcon: "instituitional" | "corporate" = "corporate";
      if (t.type == "INSTITUTION") rowIcon = "instituitional";
      return {
        rowIndex: index,
        customAttributes: { tenderId: t.tenderId },
        className: "cellRow",
        rowIcon: (
          <div
            style={{
              width: "1em",
              height: "1em",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "black",
            }}
          >
            <IconFactory key={rowIcon} name={rowIcon} />
          </div>
        ),
        content: [
          {
            columnIndex: 0,
            className: " cell cell-customer text-dark-1 ",
            content: (
              <DsName
                id={t.tenderId + "customerName"}
                name={t.customerName || "-"}
              />
            ),
            filterValue: t.customerName,
            customAttributes: { tenderId: t.tenderId },
            contentType: "string",
          },
          {
            columnIndex: 1,
            className: " cell cell-submissiondate text-dark-0 ",
            content: (
              <DsName
                id={t.tenderId + "submittionDate"}
                name={new Date(t.submissionDate).toLocaleDateString("en-GB")}
              />
            ),
            filterValue: t.submissionDate,
            customAttributes: { tenderId: t.tenderId },
            contentType: "string",
          },
          {
            columnIndex: 2,
            className: " cell cell-days-to-submit ",
            content: (
              <DsName id={t.tenderId + "daystosubmit"} name={t.submissionDate}>
                {t.submissionDate ? calculateDueStatus(t.submissionDate) : "-"}
              </DsName>
            ),
            filterValue: t.submissionDate,
            contentType: "string",
          },
          {
            columnIndex: 3,
            className: " cell cell-tenderid text-dark-0 ",
            content: (
              <DsName
                id={t.tenderId + "tenderId"}
                name={t.tenderNumber || "-"}
              />
            ),
            filterValue: t.tenderNumber,
            customAttributes: { tenderId: t.tenderId },
            contentType: "string",
          },

          {
            columnIndex: 4,
            className: "cell cell-tendertype text-dark-1",
            // content: <DsName id={t.tenderId + "tenderType"} name={t.tenderType || "-"} />,
            content: (
              <DsName
                id={t.tenderId + "tenderType"}
                name={getTenderTypeDescription(t.tenderType) || ""}
              />
            ),
            filterValue: t.tenderType,
            customAttributes: { tenderId: t.tenderId },
            contentType: "string",
          },

          {
            columnIndex: 5,
            className: " cell cell-depot text-dark-1 ",
            content: <DsName id={t.tenderId + "depot"} name={t.depot || "-"} />,
            filterValue: t.depot,
            customAttributes: { tenderId: t.tenderId },
            contentType: "string",
          },
          {
            columnIndex: 6,
            className: " cell cell-appliedby text-dark-0 ",
            content: (
              <DsName id={t.tenderId + "appliedBy"} name={t.appliedBy || "-"} />
            ),
            filterValue: t.appliedBy,
            customAttributes: { tenderId: t.tenderId },
            contentType: "string",
          },
          {
            columnIndex: 7,
            className: " cell cell-suppliedby text-dark-0 ",
            content: (
              <DsName
                id={t.tenderId + "suppliedBy"}
                name={t.suppliedBy || "-"}
              />
            ),
            filterValue: t.suppliedBy,
            customAttributes: { tenderId: t.tenderId },
            contentType: "string",
          },
          {
            columnIndex: 8,
            className: " cell cell-preparedby text-dark-0 ",
            content: (
              <DsName
                id={t.tenderId + "preparedBy"}
                name={t.preparedBy || "-"}
              />
            ),
            filterValue: t.preparedBy,
            customAttributes: { tenderId: t.tenderId },
            contentType: "string",
          },
          {
            columnIndex: 9,
            className: " cell cell-value  text-dark-1 ",
            content: (
              <DsCurrency
                format={"IND"}
                id={"value"}
                amount={parseFloat(t.value)}
                type={"short"}
              />
            ),
            filterValue: t.value,
            customAttributes: { tenderId: t.tenderId },
            contentType: "number",
          },
          {
            columnIndex: 10,
            className: " cell cell-status ",
            customAttributes: { tenderId: t.tenderId },
            content: t.status ? (
              <DsStatusIndicator
                type="user_defined"
                className={`${
                  t?.status?.statusDescription
                    ? styles[
                        t?.status?.statusDescription
                          ?.replaceAll(" ", "_")
                          .toLowerCase()
                      ]
                    : ""
                }`}
                status={t.status.statusDescription}
                label={t.status.statusDescription}
                status_icon={
                  <div style={{ width: "0.7em", height: "0.5em" }}>
                    <IconFactory name={"comment"}></IconFactory>
                  </div>
                }
                comment={t.status?.message}
                handleOnClick={(e) => e.stopPropagation()}
                handleClickableOnClick={(e) => e.stopPropagation()}
              />
            ) : (
              "No Status"
            ),
            filterValue: t.status?.tenderStatus ?? "Unknown",
            contentType: "reactNode",
          },
        ],
      };
    });

    // console.log("New Rows:", newRows);

    setTempTableData((prevData) => ({
      ...prevData,
      rows: newRows,
    }));
  };

  const router = useRouter();
  const goTo = (tenderId: number, status?: string) => {
    const location = `/Tender/${tenderId}`;
    if (status) sessionStorage.setItem("tenderStatus", status);
    else {
      const storedStatus = sessionStorage.getItem("tenderStatus");
      if (storedStatus) {
        sessionStorage.removeItem("tenderStatus");
      }
    }
    if (location) {
      router.push(location); // Navigate to the dynamic route
    }
  };
  const handelRowClick = (
    e: React.MouseEvent<HTMLElement>,
    rowIndex: number
  ) => {
    const row = tempTableData.rows[rowIndex];

    // Convert statuscell to string if it's not already one
    const statuscell = String(
      row?.content?.find((cell) => cell?.columnIndex === 10)?.filterValue ?? ""
    );
    const tenderId = Number(row?.content?.[0]?.customAttributes?.tenderId || 0);

    // console.log("statuscellintable", statuscell);

    // Store selected row data
    setSelectedRow((prev) => {
      if (prev?.tenderId === tenderId) {
        // Reset if the same row is clicked
        return null;
        // {
        //   e: undefined,
        //   rowIndex: undefined,
        //   statuscell: undefined,
        //   tenderId: undefined,
        // };
      } else {
        // Set new row data
        return { e, rowIndex, statuscell, tenderId };
      }
    });
  };
  const handleRowDoubleClick = (
    e: React.MouseEvent<HTMLElement>,
    rowIndex: number
  ) => {
    const row = tempTableData?.rows?.find((row) => row.rowIndex === rowIndex);

    const tenderId = row?.content?.[0]?.customAttributes?.tenderId || "New";

    if (tenderId) {
      goTo(Number(tenderId));
      console.log("TenderId:", tenderId);
    } else {
      console.warn("TenderId not found on double-clicked row");
    }
  };

  useEffect(() => {
    // console.log("Data updated:", data);
    // if (data.length > 0) {
    addTableData(data);
    // }
  }, [data]);

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
              setSelectedStatus={setSelectedStatus}
            />
            {newButtonVisible && (
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
              />
            )}
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
              className={styles.tendertable}
              id={tempTableData.id}
              hasSearch={tempTableData.hasSearch}
              columns={tempTableData.columns}
              hasIcons={true}
              isSelectAble={false}
              rows={tempTableData.rows}
              isFooterRequired={true}
              isSortable={true}
              handleRowDoubleClick={handleRowDoubleClick}
              handleRowClick={(e, rowIndex) => {
                handelRowClick(e, rowIndex);
              }}
            />
          </div>
          {/* {selectedRow && ( */}
            <DsTenderTableFloatingMenu
              e={selectedRow?.e}
              rowIndex={selectedRow?.rowIndex}
              statuscell={selectedRow?.statuscell}
              handleFetch={handleFetch}
              tenderId={selectedRow?.tenderId}
              goTo={goTo}
            />
          {/* )} */}
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
            minValue: new Date(2025, 9, 21).toLocaleDateString("en-GB"),
            maxValue: new Date(2050, 11, 26).toLocaleDateString("en-GB"),
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
            multiSelectOptions: applierSupplier.map((item) => ({
              label: item.codeDescription,
              value: item.codeValue,
            })),

            // multiSelectOptions:
            //   [
            //     { label: "Ipca", value: "IPCA" },
            //     { label: "Stockist", value: "stockist" },
            //   ]
          },
          {
            filterId: "5",
            filterFor: "Supplied by",
            filterType: "MultiSelection",
            multiSelectOptions: applierSupplier.map((item) => ({
              label: item.codeDescription,
              value: item.codeValue,
            })),
            // multiSelectOptions:
            //   [
            //     { label: "Ipca", value: "IPCA" },
            //     { label: "Stockist", value: "stockist" },
            //   ]
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
            maxValue: 4000000,
            minValue: 0,
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

<Toaster
            id="fetchCustomer"
            type="success"
            message="The information has been fetched"
            duration={2000}
            position={"top"}
            handleClose={() => {}}
          />
    </>
  );
}
