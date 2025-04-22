import React, { useState } from "react";
import DsButton from "@/Elements/DsComponents/DsButtons/dsButton";
import style from "./deposite.module.css";
import { DsTableRow, tableData, tcolumn } from "@/Common/helpers/types";
import DsTableComponent from "@/Elements/DsComponents/DsTablecomponent/DsTableComponent";
import { closeContext } from "@/Elements/DsComponents/dsContextHolder/dsContextHolder";
import btnStyles from "@/Elements/DsComponents/DsButtons/dsButton.module.css";


export interface FetchCustomerProps {
  customerName: string;
}

const FetchCustomer: React.FC<FetchCustomerProps> = ({ customerName }) => {
    
    const [fetchTenderData, setFetchTenderData] = useState<tableData>({

       className:"",

        type: "InterActive",
    
        id: "Tender",
    
        isSortable: true,
    
        hasSearch: false,
    
        columns: [
    
            { columnIndex: 1, columnHeader: "Tender ID"},
    
            {
    
              columnIndex: 2,
    
              columnHeader: "Supplier Name",
    
            },
    
            { columnIndex: 3, columnHeader: "Delivery Date", },
    
          ],
    
         rows: [
    
          {
    
            rowIndex: 0,
    
            className: "row",
    
            content: [
    
              {
    
                columnIndex: 1,
    
                className: "cell",
    
                content: "20240199900001",
    
                rowSpan: 2,
    
                filterValue: 20240199900001,
    
                contentType: "number",
    
              },
    
              {
    
                columnIndex: 2,
    
                className: "cell",
    
                content: "Spare India",
    
                filterValue: "DF09 - DR Distributer",
    
                contentType: "string",
    
              },
    
              {
    
                columnIndex: 3,
    
                className: "cell",
    
                content:"22/07/2020",
    
                filterValue: "MUMBAI",
    
                contentType: "reactNode",
    
              },
    
            ],
    
          },
    
              {
    
            rowIndex: 1,
    
            className: "row",
    
            content: [
    
              {
    
                columnIndex: 1,
    
                className: "cell",
    
                content: 300165852100004,
    
                rowSpan: 2,
    
                filterValue: 20240199900001,
    
                contentType: "number",
    
              },
    
              {
    
                columnIndex: 2,
    
                className: "cell",
    
                content: "S.S.P PTV.LTD",
    
                filterValue: "DF09 - DR Distributer",
    
                contentType: "string",
    
              },
    
              {
    
                columnIndex: 3,
    
                className: "cell",
    
                content:"18/06/2023",
    
                filterValue: "MUMBAI",
    
                contentType: "reactNode",
    
              },
    
            ],
    
          },
    
        ],
    
      });
     
   
  return (
    <>
    <div className={style.fetcustomerContainer}>
        
      <div className={style.fetchInfo}>
        <strong>Fetch Information:</strong> {customerName}
      </div>
      <div className={style.fetchMessage}>
         Do you want to fetch information from previous tender.Please select below <br>
         </br>to copy the information.
      </div>
      <DsTableComponent 
      className={style.fetchTable} id={""} columns={fetchTenderData.columns} rows={fetchTenderData.rows}>
        
      </DsTableComponent>
 
      <div className={style.fetchButtons}>
        <DsButton label="Cancel" 
          className={btnStyles.btnOutlined}
          buttonColor="btnDark"
          buttonViewStyle="btnOutlined"
          disable={false}

        // className={style.}
        onClick={()=>{closeContext("contextMenuId5")} }/>

        <DsButton label="Fetch" 
        />
      </div>
      

    </div>
    </>
  );
};

export default FetchCustomer;
