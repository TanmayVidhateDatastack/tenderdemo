import React, { useCallback, useEffect, useState } from "react";
import DsButton from "@/Elements/DsComponents/DsButtons/dsButton";
import style from "./deposite.module.css";
import { DsTableRow, tableData, tcolumn } from "@/Common/helpers/types";
import DsTableComponent from "@/Elements/DsComponents/DsTablecomponent/DsTableComponent";
import { closeContext } from "@/Elements/DsComponents/dsContextHolder/dsContextHolder";
import btnStyles from "@/Elements/DsComponents/DsButtons/dsButton.module.css";
import RadioButton from "./dsRadioButton";
import fetchData from "@/Common/helpers/Method/fetchData";
import {
  getTenderByTenderId,
  getTendersByCustomerId,
} from "@/Common/helpers/constant";
import Toaster, {
  hideToaster,
  showToaster,
} from "@/Elements/DsComponents/DsToaster/DsToaster";
import { useTenderData } from "../TenderDataContextProvider";

export interface FetchCustomerProps {
  customerName: string;
  customerId: number;
}
const FetchCustomer: React.FC<FetchCustomerProps> = ({
  customerName,
  customerId,
}) => {
  const [fetchTenderData, setFetchTenderData] = useState<tableData>({
    className: "",
    type: "InterActive",
    id: "Tender",
    isSortable: true,
    hasSearch: false,
    columns: [
      { columnIndex: 1, columnHeader: "Tender ID" },
      { columnIndex: 2, columnHeader: "Supplier Name" },
      { columnIndex: 3, columnHeader: "Delivery Date" },
    ],
    rows: [],
  });

  const [selectedTender, setSelectedTender] = useState<any>(null);
  const handleFetch = useCallback(async () => {
    try {
      const response = await fetchData({
        // url: `http://172.145.1.102:7005/api/tenders/${customerId}/pastTenders`,
        url: getTendersByCustomerId(customerId),
        method: "GET",
      });
      if (response.code === 200) {
        const rows = response.result.map((tender: any, index: number) => ({
          tag: [
            <RadioButton
              id={tender.tenderNumber}
              key=""
              label=""
              value=""
              onSelectedRadioButton={() => setSelectedTender(tender)}
            />,
          ],
          rowIndex: index,
          className: "row",
          content: [
            {
              columnIndex: 1,
              className: "cell",
              content: tender.tenderNumber,
              filterValue: tender.tenderNumber,
              contentType: "number",
            },
            {
              columnIndex: 2,
              className: "cell",
              content: tender.supplierName,
              filterValue: tender.supplierName,
              contentType: "string",
            },
            {
              columnIndex: 3,
              className: "cell",
              content: tender.submissionDate,
              filterValue: tender.submissionDate,
              contentType: "reactNode",
            },
          ],
        }));
        setFetchTenderData((prev) => ({ ...prev, rows }));
      } else {
        console.error("Error fetching data", response.message);
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }
  }, [customerId]);

  const { fetchAndSetPreviousTender } = useTenderData();

  useEffect(() => {
    handleFetch();
  }, [handleFetch]);
  return (
    <>
      <div className={style.fetcustomerContainer}>
        <div className={style.fetchInfo}>
          <div className={style.fetchinfolabel}>Fetch Information </div> <div>({customerName})</div>
        </div>
        <div className={style.fetchMessage}>
          Do you want to fetch information from previous tender. Please select
          below <br></br>to copy the information.
        </div>

        <DsTableComponent
          className={style.fetchTable}
          id={""}
          columns={fetchTenderData.columns}
          rows={fetchTenderData.rows}
        ></DsTableComponent>

        <div className={style.fetchButtons}>
          <DsButton
            label="Cancel"
            className={btnStyles.btnOutlined}
            buttonColor="btnDark"
            buttonViewStyle="btnOutlined"
            disable={false}
            onClick={() => {
              closeContext("contextMenuId5");
            }}
          />

          <DsButton
            label="Fetch"
            onClick={() => {
              fetchAndSetPreviousTender(selectedTender.tenderId);
              closeContext("contextMenuId5");
              showToaster("fetchCustomer");
            }}
          />
        </div>
      </div>
    </>
  );
};

export default FetchCustomer;
