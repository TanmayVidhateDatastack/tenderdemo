"use client";
 
import DsApplication from "@/Elements/ERPComponents/DsApplicationComponents/DsApplication";
import DsNavTo from "@/Elements/ERPComponents/DsNavigationComponent/DsNavTo";
import styles from "./page.module.css";
import DsFilterActions from "@/TenderComponents/TenderLogComponents/DsFilterActions";
import addIconWhite from "@/Icons/smallIcons/whiteadd.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import { DsTableRow, filterType, tableData, Tender } from "@/helpers/types";
import DsTotalTenders from "@/TenderComponents/TenderLogComponents/DsTotalTender";
import DsTotalValues from "@/TenderComponents/TenderLogComponents/DsTotalValues";
import DsButton from "@/Elements/DsComponents/DsButtons/dsButton";
import ContextMenu, { displayContext } from "@/Elements/DsComponents/dsContextHolder/dsContextHolder";
import { changeImage } from "@/helpers/Method/conversion";
import institutional from "@/Icons/institutional.svg";
 import corporate from  "@/Icons/corporate.svg";
import DsStatusIndicator from "@/Elements/DsComponents/dsStatus/dsStatusIndicator";
import { getAllTenders } from "@/helpers/constant";
import fetchData from "@/helpers/Method/fetchData";
import DsTableComponent from "@/Elements/DsComponents/DsTablecomponent/DsTableComponent";
import DsPane, { ClosePane } from "@/Elements/DsComponents/DsPane/DsPane";
import AdvancedFilterComponent from "@/Elements/DsComponents/AdvancedFilterComponent/AdvancedFilterComponent";
import DsCurrency from "@/Elements/DsComponents/dsCurrency/dsCurrency";
import addIcon from "../Icons/smallIcons/add.svg";
import DsName from "@/Elements/DsComponents/DsName/dsName";
 
export default function Home() { 
  const [data, setData] = useState<Tender[]>([]); //for table data
  const [filteredData, setFilteredData] = useState<Tender[]>([]); //for filtered table data
  const [iconSrc, setIconSrc] = useState(addIcon);
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
          hasSort:true,

      
        },
        {
          columnIndex: 1,
          className: "  cell-submissiondate text-dark-0   ",
          columnHeader: "SUBMISSION DATE",
          isHidden: false,
          sort: "ASC",
          columnContentType: "DATE",
          hasSort:true,
        },
        {
          columnIndex: 2,
          className: "cell-days-to-submit  ",
          columnHeader: "DAYS TO SUBMIT",
          isHidden: false,
          sort: "ASC",
          columnContentType: "string",
          hasSort:true,
        },
        {
          columnIndex: 3,
          className: " cell-tenderid text-dark-0  ",
          columnHeader: "TENDER ID",
          isHidden: false,
          sort: "ASC",
          columnContentType: "number",
               hasSort:true,
        },
        {
          columnIndex: 4,
          className: " cell-tendertype text-dark-1  ",
          columnHeader: "TENDER TYPE",
          isHidden: false,
          sort: "ASC",
          columnContentType: "string",
          hasSort:true,
        },
        {
          columnIndex: 5,
          className: " cell-depot text-dark-1 ",
          columnHeader: "DEPOT",
          isHidden: false,
          sort: "ASC",
          columnContentType: "string",
          hasSort:true,
        },
        {
          columnIndex: 6,
          className: "cell-appliedby text-dark-0 ",
          columnHeader: "APPLIED BY",
          isHidden: false,
          sort: "ASC",
          columnContentType: "string",
          hasSort:true,
        },
        {
          columnIndex: 7,
          className: " cell-suppliedby text-dark-0 ",
          columnHeader: "SUPPLIED BY",
          isHidden: false,
          sort: "ASC",
          columnContentType: "string",
          hasSort:true,
        },
        {
          columnIndex: 8,
          className: "cell-preparedby text-dark-0   ",
          columnHeader: "PREPARED BY",
          isHidden: false,
          sort: "ASC",
          columnContentType: "string",
          hasSort:true,
        },
        {
          columnIndex: 9,
          className: " cell-value text-dark-1 ",
          columnHeader: "VALUE (₹)",
          isHidden: false,
          sort: "ASC",
          columnContentType: "number",
          hasSort:true,
        },
        {
          columnIndex: 10,
          className: " cell-status  ",
          columnHeader: "STATUS",
          isHidden: false,
          sort: "NONE",
          columnContentType: "reactNode",
          hasSort:true,
        },
      ],
      rows: [],
    });
  
    setIconSrc(addIcon);

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
  
      console.log(`Submission Date: ${submissionDate}, Parsed: ${subDate.toISOString()}, Status: ${result}`);
  
      // Apply color coding
      let className = styles.blackText;
      if (diffDays <= 0) className = styles.zeroText;
      else if (diffDays <= 20) className = styles.orangeText;
  
      return <span className={className}>{result}</span>;
  };
  
  
   
    useEffect(() => {
      if (filteredData && filteredData.length >= 0) {
        console.log("filter data in tabel : ", filteredData);
        const transformedRows: DsTableRow[] = filteredData.map((item, index) => ({
          rowIndex: index,
          className: "cellRow logRow",
          rowIcon:
            item?.type === "institutional" ? (
              <div
                style={{
                  width: "0.875em",
                  height: "0.875em",
                  position: "relative",
                }}
              >
                <Image
                  src={institutional}
                  alt="institutional"
                  layout="fill"
                objectFit="cover"
                />
              </div>
            ) : (
              <div
                style={{
                  width: "0.875em",
                  height: "0.875em",
                  position: "relative",
                }}
              >
                <Image src={corporate} alt="corporate"
                layout="fill"
                objectFit="cover" />
              </div>
            ),
          customAttributes: { iconValue: item?.type?.toString() ?? "" },
        
          content: [
            {
              columnIndex: 0,
              className: "cell cell-customer text-dark-1",
              content: <DsName id={item.tenderId+"customerName "} name={item.customerName || "-"} />,
              filterValue:<DsName id={item.tenderId+"customerName "} name={item.customerName || "-"} />,
      
              contentType: "string",
  
            },
            {
              columnIndex: 1,
              className: " cell  cell-submissiondate text-dark-0 ",
              content: item.submittionDate || "-",
              filterValue: item.submittionDate || "-",
              contentType: "string",

            },
            {
              columnIndex: 2,
              className: " cell  cell-days-to-submit ",
              content: item.submittionDate ? calculateDueStatus(item.submittionDate) : "-",
              filterValue: item.submittionDate ? calculateDueStatus(item.submittionDate) : "-",
              contentType: "string",
       
            },
            {
              columnIndex: 3,
              className: " cell  cell-tenderid text-dark-0 ",
              content: item.tenderId || "-",
              filterValue: item.tenderId || "-",
              contentType: "string",
            },
            {
              columnIndex: 4,
              className: " cell cell-tendertype text-dark-1  ",
              content: item.tenderType || "-",
              filterValue: item.tenderType || "-",
              contentType: "string",
            },
            {
              columnIndex: 5,
              className: " cell cell-depot text-dark-1",
      
              content: <DsName id={item.tenderId+"depot"} name={item.depot|| "-"} />,
              filterValue:<DsName id={item.tenderId+"depot"} name={item.depot|| "-"} />,
              contentType: "string",
            },
            {
              columnIndex: 6,
              className: " cell cell-appliedby text-dark-0 ",
              content: <DsName id={item.tenderId+"appliedBy"} name={item.appliedBy|| "-"} />,
              filterValue: <DsName id={item.tenderId+"appliedBy"} name={item.appliedBy|| "-"} />,
              contentType: "string",
            },
            {
              columnIndex: 7,
              className: " cell cell-suppliedby text-dark-0 ",
              content: <DsName id={item.tenderId+"suppliedBy"} name={item.suppliedBy|| "-"} />,
              filterValue: <DsName id={item.tenderId+"suppliedBy"} name={item.suppliedBy|| "-"} />,
              contentType: "string",
            },
            {
              columnIndex: 8,
              className: " cell cell-preparedby text-dark-0 ",
              content: <DsName id={item.tenderId+"preparedBy"} name={item.preparedBy || "-"} />,
              filterValue: <DsName id={item.tenderId+"preparedBy"} name={item.preparedBy || "-"} />,
              contentType: "string",
            },
            {
              columnIndex: 9,
              className: " cell cell-value text-dark-1 ",
            
              content: <DsCurrency format={"IND"} id={"value"} amount={parseInt(item.value)} type={"short"}/>,
              filterValue:item.value,
              contentType: "number",
            },
            {
              columnIndex: 10,
              className: " cell cell-status ",
       
              content: item.status ? (
                <DsStatusIndicator
                  type="user_defined"
                  className={`${
                    item?.status?.tenderStatus
                      ? styles[
                        item?.status?.tenderStatus
                            ?.replaceAll(" ", "_")
                            .toLowerCase()
                        ]
                      : ""
                  }`}
                status={item.status.tenderStatus }
                label={item.status.tenderStatus }
                  comment={
                    item.status?.message
                      ? typeof item.status.message === "object"
                        ? JSON.stringify(item.status.message)
                        : item.status.message.toString()
                      : ""
                  }
                />
              ) : 
              (
                "No Status"
              ),
              filterValue: item.status.tenderStatus,
              contentType: "reactNode",
            },
          ],
        }));
  
        console.log("Final Transformed Rows:", transformedRows);
  
        setTimeout(() => {
          setTempTableData((data) => ({ ...data, rows: transformedRows }));
        }, 1);
      }
    }, [filteredData]);
  
    const flterTypes = [
      {
        columnIndex: 0,
        columnHeader: "Customer name",
        filterType: "CSV",
      },
      {
        columnIndex: 1,
        columnHeader: "Sub Date ",
        filterType: "DATE",
      },
      {
        columnIndex: -1,
        columnHeader: "TYPE",
        filterType: "ICONVALUE",
      },
      {
        columnIndex: 4,
        columnHeader: "Supply type",
        filterType: "MULTISELECT",
      },
    
      {
        columnIndex: 6,
        columnHeader: "Applied by",
        filterType: "MULTISELECT",
      },
      {
        columnIndex: 7,
        columnHeader: "Supplied by",
        filterType: "MULTISELECT",
      },
      {
        columnIndex: 5,
        columnHeader: "Depot",
        filterType: "MULTISELECT",
      },
  
      {
        columnIndex: 9,
        columnHeader: "VALUE",
        filterType: "INPUTTYPERANGE",
      },
      {
        columnIndex: 10,
        columnHeader: "STATUS",
        filterType: "MULTISELECT",
      },
    ];
    console.log(filterType);
  
     const handleFetch = async () => {
      await fetchData({ url: getAllTenders })
        .then((res) => {
          console.log("Fetched Response:", res); // Log the fetched response
          if (res?.code === 200 && Array.isArray(res?.result)) {
            setData(res.result); // Update the state
          } else {
            console.error("Error: Invalid data format or empty result");
          }
        })
        .catch((err) => {
          console.error("Error fetching data:", err);
        });
    };
  //   const handleFetch = async () => {
  //     try {
  //         const res = await fetchData({ url: getAllTenders });
  
  //         console.log("Fetched Response:", res); 
  

  //         if (res?.code === 200 && Array.isArray(res?.result)) {
  //             const mappedData: Tender[] = res.result.map((item: any) => ({
  //                 customerName: item.customerName,
  //                 submittionDate: item.submissionDate,
  //                 daystosubmit: item.daysToSubmit ?? "N/A",
  //                 tenderId: item.tenderId.toString(),
  //                 type: item.tenderType,
  //                 tenderType: item.tenderType,
  //                 depot: item.shippingLocations.map((loc: any) => loc.name).join(", "), 
  //                 appliedBy: item.applierName,
  //                 suppliedBy: item.supplierName,
  //                 preparedBy: item.preparedBy,
  //                 value: item.value.toString(),
  //                 status: {
  //                     tenderStatus: item.status?.tenderStatus ?? "null",
  //                     message: item.status?.message ?? "No message",
  //                 },
  //                 customAttributes: { iconValue: "defaultIcon" }, 
  //             }));
  
  //             setData(mappedData);
  //         } else {
  //             console.error("Error: Invalid response format or empty result", res);
  //         }
  //     } catch (error) {
  //         console.error("Error fetching data:", error);
  //     }
  // };
  
    const addTableData = (tender: Tender[]) => {
      console.log("Adding table data:", tender);
      const newRows: DsTableRow[] = tender.map((t, index) => ({
        rowIndex: index,
        className: "cellRow ",
        rowIcon:
          t?.type === "institutional" ? (
            <div
            style={{
              width: "0.875em",
              height: "0.875em",
              position: "relative",
            }}
          >
            <Image
              src={institutional}
              alt="institutional"
              layout="fill"
            objectFit="cover"
            />
          </div>
        ) : (
          <div
            style={{
              width: "0.875em",
              height: "0.875em",
              position: "relative",
            }}
          >
            <Image src={corporate} 
            alt="corporate"
            layout="fill"
            objectFit="cover" />
          </div>
          ),
        customAttributes: { iconValue: t?.type?.toString() ?? "" },
        content: [
          {
            columnIndex: 0,
            className: " cell cell-customer text-dark-1 " ,
            content: <DsName id={t.tenderId+"customerName"} name={t.customerName || "-"} />,
            filterValue:<DsName id={t.tenderId+"customerName"} name={t.customerName || "-"} />,
            contentType: "string",
          },
          {
            columnIndex: 1,
            className: " cell cell-submissiondate text-dark-0 ",
            content: t.submittionDate,
            filterValue: t.submittionDate,
            contentType: "string",
          },
          {
            columnIndex: 2,
            className: " cell cell-days-to-submit ",
            content: t.submittionDate ? calculateDueStatus(t.submittionDate) : "-",
            filterValue: t.submittionDate ? calculateDueStatus(t.submittionDate) : "-",
            contentType: "string",
          },
          {
            columnIndex: 3,
            className: " cell cell-tenderid text-dark-0 ",
            content: t.tenderId,
            filterValue: t.tenderId,
            contentType: "string",
          },
          {
            columnIndex: 4,
            className: " cell cell-tendertype text-dark-1 ",
            content: t.tenderType,
            filterValue: t.tenderType,
            contentType: "string",
          },
          {
            columnIndex: 5,
            className: " cell cell-depot text-dark-1 ",
   
            content: <DsName id={t.tenderId+"depot"} name={t.depot || "-"} />,
            filterValue: <DsName id={t.tenderId+"depot"} name={t.depot || "-"} />,
           
            contentType: "string",
          },
          {
            columnIndex: 6,
            className: " cell cell-appliedby text-dark-0 ",
        
            content: <DsName id={t.tenderId+"appliedBy"} name={t.appliedBy || "-"} />,
            filterValue: <DsName id={t.tenderId+"appliedBy"} name={t.appliedBy || "-"} />,
         
            contentType: "string",
          },
          {
            columnIndex: 7,
            className: " cell cell-suppliedby text-dark-0 ",
  
            content: <DsName id={t.tenderId+"suppliedBy"} name={t.suppliedBy || "-"} />,
            filterValue: <DsName id={t.tenderId+"suppliedBy"} name={t.suppliedBy || "-"} />,
        
            contentType: "string",
          },
          {
            columnIndex: 8,
            className: " cell cell-preparedby text-dark-0 ",
        
            content: <DsName id={t.tenderId+"preparedBy"} name={t.preparedBy || "-"} />,
            filterValue: <DsName id={t.tenderId+"preparedBy"} name={t.preparedBy || "-"} />,

            contentType: "string",
          },
          {
            columnIndex: 9,
            className: " cell cell-value  text-dark-1 ",
            content: <DsCurrency format={"IND"} id={"value"} amount={parseInt(t.value)} type={"short"}/>,
            filterValue: t.value,
            contentType: "number",
          },
          {
            columnIndex: 10,
            className: " cell cell-status ",
  
            content: t.status ? (
              <DsStatusIndicator
                type="user_defined"
                className={`${
                  t?.status?.tenderStatus
                    ? styles[
                        t?.status?.tenderStatus
                          ?.replaceAll(" ", "_")
                          .toLowerCase()
                      ]
                    : ""
                }`}
              status={t.status.tenderStatus }
              label={t.status.tenderStatus }
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
      handleFetch();
    }, []);
  
  
    useEffect(() => {
      console.log("Data updated:", data);
      if (data.length > 0) {
        addTableData(data);
      }
    }, [data]);
      const applyFilter = (
        e: React.MouseEvent<HTMLElement>,
        filteredRows: DsTableRow[]
      ) => {
   setTempTableData((data) => ({ ...data, rows: filteredRows }));
        ClosePane(e);
      };
    
return (
  <>
    <DsApplication
      appTitle="Tenders"
      appMenu={
        <>
         <DsFilterActions data={data} setFilteredData={setFilteredData}/>
       
         <DsButton
                id="actionBtn"
                buttonColor="btnPrimary"
                className={styles.newbutton1}
                 buttonViewStyle="btnOutlined"
                startIcon={
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
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
              />   
          </>
      }
      pageName="LogPage"    
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
        />
          </div>
          </div>
     
  

      
    </DsApplication>
    <DsPane id="tenderFilter" side="right" title="Filter">
      <AdvancedFilterComponent
          id="a"
          rows={tempTableData.rows}
          filterTypes={flterTypes}
          handleApplyFilter={applyFilter}
        />
      </DsPane>

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
 
 