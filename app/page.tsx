"use client";
 
import DsApplication from "@/Elements/ERPComponents/DsApplicationComponents/DsApplication";
import DsNavTo from "@/Elements/ERPComponents/DsNavigationComponent/DsNavTo";
import styles from "./page.module.css";
import DsFilterActions from "@/TenderComponents/TenderLogComponents/DsFilterActions";
import add from "@/Icons/smallIcons/add.svg";
import addIconWhite from "@/Icons/smallIcons/whiteadd.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import { generatePatchDocument } from "@/helpers/Method/UpdatePatchObjectCreation";
import { DsTableRow, tableData, Tender } from "@/helpers/types";
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
 
export default function Home() { 
  const [data, setData] = useState<Tender[]>([]); //for table data
  const [filteredData, setFilteredData] = useState<Tender[]>([]); //for filtered table data
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
        },
        {
          columnIndex: 1,
          className: "  cell-submissiondate text-dark-0   ",
          columnHeader: "SUBMISSION DATE",
          isHidden: false,
          sort: "ASC",
          columnContentType: "DATE",
        },
        {
          columnIndex: 2,
          className: "cell-days-to-submit  ",
          columnHeader: "DAYS TO SUBMIT",
          isHidden: false,
          sort: "ASC",
          columnContentType: "string",
        },
        {
          columnIndex: 3,
          className: " cell-tenderid text-dark-0  ",
          columnHeader: "TENDER ID",
          isHidden: false,
          sort: "ASC",
          columnContentType: "number",
        },
        {
          columnIndex: 4,
          className: " cell-tendertype text-dark-1  ",
          columnHeader: "TENDER TYPE",
          isHidden: false,
          sort: "ASC",
          columnContentType: "string",
        },
        {
          columnIndex: 5,
          className: " cell-depot text-dark-1 ",
          columnHeader: "DEPOT",
          isHidden: false,
          sort: "ASC",
          columnContentType: "string",
        },
        {
          columnIndex: 6,
          className: "cell-appliedby text-dark-0 ",
          columnHeader: "APPLIED BY",
          isHidden: false,
          sort: "ASC",
          columnContentType: "string",
        },
        {
          columnIndex: 7,
          className: " cell-suppliedby text-dark-0 ",
          columnHeader: "SUPPLIED BY",
          isHidden: false,
          sort: "ASC",
          columnContentType: "string",
        },
        {
          columnIndex: 8,
          className: "cell-preparedby text-dark-0   ",
          columnHeader: "PREPARED BY",
          isHidden: false,
          sort: "ASC",
          columnContentType: "string",
        },
        {
          columnIndex: 9,
          className: " cell-value text-dark-1 ",
          columnHeader: "VALUE (₹)",
          isHidden: false,
          sort: "ASC",
          columnContentType: "number",
        },
        {
          columnIndex: 10,
          className: " cell-status  ",
          columnHeader: "STATUS",
          isHidden: false,
          sort: "NONE",
          columnContentType: "reactNode",
        },
      ],
      rows: [],
    });
  
    const [originalTabledata, setoriginalTableData] = useState<tableData>({
      className: "sample-table",
      type: "InterActive",
      id: "table-1",
      isSortable: true,
      hasSearch: false,
      columns: [
        {
          columnIndex: 0,
          className:" cell cell-customer text-dark-1",
          columnHeader: "CUSTOMER NAME",
          isHidden: false,
          sort: "ASC",
          columnContentType: "string",
        },
        {
          columnIndex: 1,
          className: "  cell  cell-submissiondate text-dark-0  ",
          columnHeader: "SUBMISSION DATE",
          isHidden: false,
          sort: "ASC",
          columnContentType: "DATE",
        },
        {
          columnIndex: 2,
          className: " cell  cell-days-to-submit  ",
          columnHeader: "DAYS TO SUBMIT",
          isHidden: false,
          sort: "ASC",
          columnContentType: "string",
        },
        {
          columnIndex: 3,
          className: " cell  cell-tenderid  text-dark-0 ",
          columnHeader: "TENDER ID",
          isHidden: false,
          sort: "ASC",
          columnContentType: "number",
        },
        {
          columnIndex: 4,
          className: " cell  cell-tendertype text-dark-1 ",
          columnHeader: "TENDER TYPE",
          isHidden: false,
          sort: "ASC",
          columnContentType: "string",
        },
        {
          columnIndex: 5,
          className: " cell  cell-depot text-dark-1",
          columnHeader: "DEPOT",
          isHidden: false,
          sort: "ASC",
          columnContentType: "string",
        },
        {
          columnIndex: 6,
          className: " cell cell-appliedby text-dark-0 ",
          columnHeader: "APPLIED BY",
          isHidden: false,
          sort: "ASC",
          columnContentType: "string",
        },
        {
          columnIndex: 7,
          className: "   cell cell-suppliedby text-dark-0  ",
          columnHeader: "SUPPLIED BY",
          isHidden: false,
          sort: "ASC",
          columnContentType: "string",
        },
        {
          columnIndex: 8,
          className: " cell cell-preparedby text-dark-0  ",
          columnHeader: "PREPARED BY",
          isHidden: false,
          sort: "ASC",
          columnContentType: "string",
        },
        {
          columnIndex: 9,
          className: "  cell cell-value text-dark-1",
          columnHeader: "VALUE(₹)",
          isHidden: false,
          sort: "ASC",
          columnContentType: "number",
        },
        {
          columnIndex: 10,
          className: " cell  cell-status  ",
          columnHeader: "STATUS",
          isHidden: false,
          sort: "NONE",
          columnContentType: "reactNode",
        },
      ],
      rows: [],
    });


    const calculateDueStatus = (submissionDate: string) => {
      if (!submissionDate) return "-"; // Handle empty values
    
      const dateParts = submissionDate.split("/");
      if (dateParts.length !== 3) return "-"; // Invalid format
    
      const day = parseInt(dateParts[0], 10);
      const month = parseInt(dateParts[1], 10) - 1; // JavaScript months are 0-based
      const year = parseInt(dateParts[2], 10);
    
      // Create submission date in UTC
      const subDate = new Date(Date.UTC(year, month, day));
      
      // Get today's date in UTC (ignoring time)
      const currentDate = new Date();
      const todayUTC = new Date(Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()));
    
      if (isNaN(subDate.getTime())) return "-"; // Handle invalid date
    
      const diffTime = subDate.getTime() - todayUTC.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
      // Corrected logic: If diffDays <= 0, show "0 Days Left"
      const result = diffDays <= 0 ? "0 Days Left" : `${diffDays} Days Left`;
    
      console.log(`Submission Date: ${submissionDate}, Status: ${result}`);
      let className = styles.blackText; // Default (greater than 20 days)
      if (result === "0 Days Left") className = styles.zeroText;
      else if (diffDays <= 20) className = styles.orangeText;
      console.log(className);
    
    
      // return result;
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
                  width: "1.4rem",
                  height: "1.4rem",
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
                  width: "1.4rem",
                  height: "1.4rem",
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
              className: "  cell cell-customer text-dark-1 ",
              content: item.customerName || "-",
              filterValue: item.customerName || "-",
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
              content: item.depot || "-",
              filterValue: item.depot || "-",
              contentType: "string",
            },
            {
              columnIndex: 6,
              className: " cell cell-appliedby text-dark-0 ",
              content: item.appliedBy || "-",
              filterValue: item.appliedBy || "-",
              contentType: "string",
            },
            {
              columnIndex: 7,
              className: " cell cell-suppliedby text-dark-0 ",
              content: item.suppliedBy || "-",
              filterValue: item.suppliedBy || "-",
              contentType: "string",
            },
            {
              columnIndex: 8,
              className: " cell cell-preparedby text-dark-0 ",
              content: item.preparedBy || "-",
              filterValue: item.preparedBy || "-",
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
        columnHeader: "Date ",
        filterType: "DATE",
      },
      {
        columnIndex: 4,
        columnHeader: "Supply type",
        filterType: "MULTISELECT",
      },
      {
        columnIndex: -1,
        columnHeader: "TYPE",
        filterType: "ICONVALUE",
      },
      {
        columnIndex: 5,
        columnHeader: "Depot",
        filterType: "MULTISELECT",
      },
  
      {
        columnIndex: 6,
        columnHeader: "Applied type",
        filterType: "MULTISELECT",
      },
      {
        columnIndex: 7,
        columnHeader: "Supplied type",
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
  
    const addTableData = (tender: Tender[]) => {
      console.log("Adding table data:", tender);
      const newRows: DsTableRow[] = tender.map((t, index) => ({
        rowIndex: index,
        className: "cellRow ",
        rowIcon:
          t?.type === "institutional" ? (
            <Image
              src={institutional}
              alt={"institutional"}
              width={50}
              height={50}
            />
          ) : (
            <Image src={corporate} alt={"corporate"} width={50} height={50} />
          ),
        customAttributes: { iconValue: t?.type?.toString() ?? "" },
        content: [
          {
            columnIndex: 0,
            className: " cell cell-customer text-dark-1 " ,
            content: t.customerName,
            filterValue: t.customerName,
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
            content: t.depot,
            filterValue: t.depot,
            contentType: "string",
          },
          {
            columnIndex: 6,
            className: " cell cell-appliedby text-dark-0 ",
            content: t.appliedBy,
            filterValue: t.appliedBy,
            contentType: "string",
          },
          {
            columnIndex: 7,
            className: " cell cell-suppliedby text-dark-0 ",
            content: t.suppliedBy,
            filterValue: t.suppliedBy,
            contentType: "string",
          },
          {
            columnIndex: 8,
            className: " cell cell-preparedby text-dark-0 ",
            content: t.preparedBy,
            filterValue: t.preparedBy,
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
      setoriginalTableData((prevData) => ({
        ...prevData,
        rows: newRows,
      }))
    };
  
    useEffect(() => {
      handleFetch();
    }, []);
  
    useEffect(() => {});
  
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
        setoriginalTableData((data) => ({ ...data, rows: filteredRows }));
        ClosePane(e);
      };
    
     
  
  return (
    <>
      <DsApplication
        appTitle="Tenders"
        //className={styles.appmenuTitle}
        appMenu={
      <>
          <div className={styles.filterNavBar}>

            <DsFilterActions data={data} setFilteredData={setFilteredData}/>
             </div>
            <DsButton
            label="New"
            startIcon={<div className={styles.newbutton} style={{ width: "1.05rem", height: "1.4rem", position: "relative"}}>
            <Image
              src={add}
              layout="intrinsic"
              objectFit="cover"
              alt="Image"
            />
          </div>
 }          onHover={(e)=>{changeImage(e,addIconWhite)}}
            onClick={(e) => displayContext(e, "CreateNewActions", "vertical", "center")}
             />

         
          </>
        }
        pageName="LogPage"  
      >
        <div className={styles.totalCal}>
        <DsTotalTenders data={data}/>
        <DsTotalValues data={data}/>
        </div>
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

      </DsApplication>
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
              location="Tender"
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
      <DsPane id="y" side="right" title="Filter">
        <AdvancedFilterComponent
          id="a"
          rows={originalTabledata.rows}
          filterTypes={flterTypes}
          handleApplyFilter={applyFilter}
        />
      </DsPane>
     
    </>
  );
}
 
 
 