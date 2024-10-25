"use client";

import DsTableComponent from "../../Components/DsTablecomponent/DsTableComponent";
import Application from "../ApplicationComponents/Application";

export default function Demo() {
  const tempTableData = {
    className: "sample-table",
    id: "table-1",
    columns: [
      {
        columnIndex: 0,
        className: "header-column",
        columnHeader: "ORDER ID",
        isHidden: false,
        sort: "ASC",
        columnContentType: "number",
      },
      {
        columnIndex: 1,
        className: "header-column",
        columnHeader: "DATE",
        isHidden: false,
        sort: "ASC",
        columnContentType: "date",
      },
      {
        columnIndex: 2,
        className: "header-column",
        columnHeader: "CUSTOMER ID",
        isHidden: false,
        sort: "ASC",
        columnContentType: "string",
      },
      {
        columnIndex: 3,
        className: "header-column",
        columnHeader: "CUSTOMER",
        isHidden: false,
        sort: "ASC",
        columnContentType: "string",
      },
      {
        columnIndex: 4,
        className: "header-column",
        columnHeader: "QTY",
        isHidden: false,
        sort: "ASC",
        columnContentType: "number",
      },
      {
        columnIndex: 5,
        className: "header-column",
        columnHeader: "NET VALUE (₹)",
        isHidden: false,
        sort: "ASC",
        columnContentType: "number",
      },
      {
        columnIndex: 6,
        className: "header-column",
        columnHeader: "GROSS VALUE (₹)",
        isHidden: false,
        sort: "ASC",
        columnContentType: "number",
      },
    ],
    rows: [
      {
        rowIndex: 0,
        className: "row",
        content: [
          {
            columnIndex: 0,
            className: "cell",
            content: 20240199900001,
            contentType: "number",
          },
          {
            columnIndex: 1,
            className: "cell",
            content: "24/09/2024",
            contentType: "date",
          },
          {
            columnIndex: 2,
            className: "cell",
            content: "DF09",
            contentType: "string",
          },
          {
            columnIndex: 3,
            className: "cell",
            content: "Medplus Health Services",
            contentType: "string",
          },
          {
            columnIndex: 4,
            className: "cell",
            content: 400,
            contentType: "number",
          },
          {
            columnIndex: 5,
            className: "cell",
            content: "12,00,000",
            contentType: "string",
          },
          {
            columnIndex: 6,
            className: "cell",
            content: "12,02,000",
            contentType: "number",
          },
        ],
      },
      {
        rowIndex: 1,
        className: "row",
        content: [
          {
            columnIndex: 0,
            className: "cell",
            content: 20240199900002,
            contentType: "number",
          },
          {
            columnIndex: 1,
            className: "cell",
            content: "24/09/2024",
            contentType: "date",
          },
          {
            columnIndex: 2,
            className: "cell",
            content: "CD34",
            contentType: "string",
          },
          {
            columnIndex: 3,
            className: "cell",
            content: "Apollo Pharmacy",
            contentType: "string",
          },
          {
            columnIndex: 4,
            className: "cell",
            content: 1200,
            contentType: "number",
          },
          {
            columnIndex: 5,
            className: "cell",
            content: "13,00,900",
            contentType: "string",
          },
          {
            columnIndex: 6,
            className: "cell",
            content: "13,03,900",
            contentType: "number",
          },
        ],
      },
      {
        rowIndex: 2,
        className: "row",
        content: [
          {
            columnIndex: 0,
            className: "cell",
            content: 20240199900003,
            contentType: "number",
          },
          {
            columnIndex: 1,
            className: "cell",
            content: "24/09/2024",
            contentType: "date",
          },
          {
            columnIndex: 2,
            className: "cell",
            content: "HJ65",
            contentType: "string",
          },
          {
            columnIndex: 3,
            className: "cell",
            content: "Hetero Drugs Ltd.",
            contentType: "string",
          },
          {
            columnIndex: 4,
            className: "cell",
            content: 8000,
            contentType: "number",
          },
          {
            columnIndex: 5,
            className: "cell",
            content: "12,00,000",
            contentType: "string",
          },
          {
            columnIndex: 6,
            className: "cell",
            content: "12,04,000",
            contentType: "number",
          },
        ],
      },
      {
        rowIndex: 3,
        className: "row",
        content: [
          {
            columnIndex: 0,
            className: "cell",
            content: 20240199900004,
            contentType: "number",
          },
          {
            columnIndex: 1,
            className: "cell",
            content: "24/09/2024",
            contentType: "date",
          },
          {
            columnIndex: 2,
            className: "cell",
            content: "OP65",
            contentType: "string",
          },
          {
            columnIndex: 3,
            className: "cell",
            content: "Mediwell Diagnostics",
            contentType: "string",
          },
          {
            columnIndex: 4,
            className: "cell",
            content: 3400,
            contentType: "number",
          },
          {
            columnIndex: 5,
            className: "cell",
            content: "11,00,000",
            contentType: "string",
          },
          {
            columnIndex: 6,
            className: "cell",
            content: "11,03,000",
            contentType: "number",
          },
        ],
      },
      {
        rowIndex: 4,
        className: "row",
        content: [
          {
            columnIndex: 0,
            className: "cell",
            content: 20240199900007,
            contentType: "number",
          },
          {
            columnIndex: 1,
            className: "cell",
            content: "24/09/2024",
            contentType: "date",
          },
          {
            columnIndex: 2,
            className: "cell",
            content: "HB08",
            contentType: "string",
          },
          {
            columnIndex: 3,
            className: "cell",
            content: "Vikram Medical Agency",
            contentType: "string",
          },
          {
            columnIndex: 4,
            className: "cell",
            content: 500,
            contentType: "number",
          },
          {
            columnIndex: 5,
            className: "cell",
            content: "10,000",
            contentType: "string",
          },
          {
            columnIndex: 6,
            className: "cell",
            content: "25,200",
            contentType: "number",
          },
        ],
      },
      {
        rowIndex: 5,
        className: "row",
        content: [
          {
            columnIndex: 0,
            className: "cell",
            content: 20240199900006,
            contentType: "number",
          },
          {
            columnIndex: 1,
            className: "cell",
            content: "24/09/2024",
            contentType: "date",
          },
          {
            columnIndex: 2,
            className: "cell",
            content: "MN04",
            contentType: "string",
          },
          {
            columnIndex: 3,
            className: "cell",
            content: "Sree Mookambika Agency",
            contentType: "string",
          },
          {
            columnIndex: 4,
            className: "cell",
            content: 4000,
            contentType: "number",
          },
          {
            columnIndex: 5,
            className: "cell",
            content: "1,00,900",
            contentType: "string",
          },
          {
            columnIndex: 6,
            className: "cell",
            content: "3,900",
            contentType: "number",
          },
        ],
      },
      {
        rowIndex: 6,
        className: "row",
        content: [
          {
            columnIndex: 0,
            className: "cell",
            content: 20220199900007,
            contentType: "number",
          },
          {
            columnIndex: 1,
            className: "cell",
            content: "24/09/2024",
            contentType: "date",
          },
          {
            columnIndex: 2,
            className: "cell",
            content: "GH67",
            contentType: "string",
          },
          {
            columnIndex: 3,
            className: "cell",
            content: "Bharat Serums Ltd.",
            contentType: "string",
          },
          {
            columnIndex: 4,
            className: "cell",
            content: 8000,
            contentType: "number",
          },
          {
            columnIndex: 5,
            className: "cell",
            content: "12,00,000",
            contentType: "string",
          },
          {
            columnIndex: 6,
            className: "cell",
            content: "12,04,000",
            contentType: "number",
          },
        ],
      },
      {
        rowIndex: 7,
        className: "row",
        content: [
          {
            columnIndex: 0,
            className: "cell",
            content: 20240199900008,
            contentType: "number",
          },
          {
            columnIndex: 1,
            className: "cell",
            content: "24/09/2024",
            contentType: "date",
          },
          {
            columnIndex: 2,
            className: "cell",
            content: "TR65",
            contentType: "string",
          },
          {
            columnIndex: 3,
            className: "cell",
            content: "Sulekha Healthcare",
            contentType: "string",
          },
          {
            columnIndex: 4,
            className: "cell",
            content: 3400,
            contentType: "number",
          },
          {
            columnIndex: 5,
            className: "cell",
            content: "11,00,000",
            contentType: "string",
          },
          {
            columnIndex: 6,
            className: "cell",
            content: "11,03,000",
            contentType: "number",
          },
        ],
      },
      {
        rowIndex: 8,
        className: "row",
        content: [
          {
            columnIndex: 0,
            className: "cell",
            content: 20240199900009,
            contentType: "number",
          },
          {
            columnIndex: 1,
            className: "cell",
            content: "24/09/2024",
            contentType: "date",
          },
          {
            columnIndex: 2,
            className: "cell",
            content: "PU78",
            contentType: "string",
          },
          {
            columnIndex: 3,
            className: "cell",
            content: "Lupin Limited",
            contentType: "string",
          },
          {
            columnIndex: 4,
            className: "cell",
            content: 2340,
            contentType: "number",
          },
          {
            columnIndex: 5,
            className: "cell",
            content: "22,000",
            contentType: "string",
          },
          {
            columnIndex: 6,
            className: "cell",
            content: "22,06,000",
            contentType: "number",
          },
        ],
      },
      {
        rowIndex: 9,
        className: "row",
        content: [
          {
            columnIndex: 0,
            className: "cell",
            content: 20240199900010,
            contentType: "number",
          },
          {
            columnIndex: 1,
            className: "cell",
            content: "24/09/2024",
            contentType: "date",
          },
          {
            columnIndex: 2,
            className: "cell",
            content: "UT60",
            contentType: "string",
          },
          {
            columnIndex: 3,
            className: "cell",
            content: "Lupin Limited",
            contentType: "string",
          },
          {
            columnIndex: 4,
            className: "cell",
            content: 8756,
            contentType: "number",
          },
          {
            columnIndex: 5,
            className: "cell",
            content: "12,90,900",
            contentType: "string",
          },
          {
            columnIndex: 6,
            className: "cell",
            content: "12,99,900",
            contentType: "number",
          },
        ],
      },
      {
        rowIndex: 10,
        className: "row",
        content: [
          {
            columnIndex: 0,
            className: "cell",
            content: 20240199900011,
            contentType: "number",
          },
          {
            columnIndex: 1,
            className: "cell",
            content: "24/09/2024",
            contentType: "date",
          },
          {
            columnIndex: 2,
            className: "cell",
            content: "AB43",
            contentType: "string",
          },
          {
            columnIndex: 3,
            className: "cell",
            content: "Lupin Limited",
            contentType: "string",
          },
          {
            columnIndex: 4,
            className: "cell",
            content: 1100,
            contentType: "number",
          },
          {
            columnIndex: 5,
            className: "cell",
            content: "11,09,000",
            contentType: "string",
          },
          {
            columnIndex: 6,
            className: "cell",
            content: "11,11,000",
            contentType: "number",
          },
        ],
      },
      {
        rowIndex: 11,
        className: "row",
        content: [
          {
            columnIndex: 0,
            className: "cell",
            content: 20240199900012,
            contentType: "number",
          },
          {
            columnIndex: 1,
            className: "cell",
            content: "24/09/2024",
            contentType: "date",
          },
          {
            columnIndex: 2,
            className: "cell",
            content: "SF45",
            contentType: "string",
          },
          {
            columnIndex: 3,
            className: "cell",
            content: "Lupin Limited",
            contentType: "string",
          },
          {
            columnIndex: 4,
            className: "cell",
            content: 12341,
            contentType: "number",
          },
          {
            columnIndex: 5,
            className: "cell",
            content: "10,02,000",
            contentType: "string",
          },
          {
            columnIndex: 6,
            className: "cell",
            content: "10,22,000",
            contentType: "number",
          },
        ],
      },
      {
        rowIndex: 12,
        className: "row",
        content: [
          {
            columnIndex: 0,
            className: "cell",
            content: 20240199900013,
            contentType: "number",
          },
          {
            columnIndex: 1,
            className: "cell",
            content: "24/09/2024",
            contentType: "date",
          },
          {
            columnIndex: 2,
            className: "cell",
            content: "GR65",
            contentType: "string",
          },
          {
            columnIndex: 3,
            className: "cell",
            content: "Lupin Limited",
            contentType: "string",
          },
          {
            columnIndex: 4,
            className: "cell",
            content: 2000,
            contentType: "number",
          },
          {
            columnIndex: 5,
            className: "cell",
            content: "20,03,000",
            contentType: "string",
          },
          {
            columnIndex: 6,
            className: "cell",
            content: "20,08,000",
            contentType: "number",
          },
        ],
      },
      {
        rowIndex: 13,
        className: "row",
        content: [
          {
            columnIndex: 0,
            className: "cell",
            content: 20240199900014,
            contentType: "number",
          },
          {
            columnIndex: 1,
            className: "cell",
            content: "24/09/2024",
            contentType: "date",
          },
          {
            columnIndex: 2,
            className: "cell",
            content: "MX09",
            contentType: "string",
          },
          {
            columnIndex: 3,
            className: "cell",
            content: "Pharma XYZ",
            contentType: "string",
          },
          {
            columnIndex: 4,
            className: "cell",
            content: 500,
            contentType: "number",
          },
          {
            columnIndex: 5,
            className: "cell",
            content: "15,05,000",
            contentType: "string",
          },
          {
            columnIndex: 6,
            className: "cell",
            content: "15,08,000",
            contentType: "number",
          },
        ],
      },
      {
        rowIndex: 14,
        className: "row",
        content: [
          {
            columnIndex: 0,
            className: "cell",
            content: 20240199900015,
            contentType: "number",
          },
          {
            columnIndex: 1,
            className: "cell",
            content: "24/09/2024",
            contentType: "date",
          },
          {
            columnIndex: 2,
            className: "cell",
            content: "MX09",
            contentType: "string",
          },
          {
            columnIndex: 3,
            className: "cell",
            content: "Medicare Pharma Ltd.",
            contentType: "string",
          },
          {
            columnIndex: 4,
            className: "cell",
            content: 500,
            contentType: "number",
          },
          {
            columnIndex: 5,
            className: "cell",
            content: "15,05,000",
            contentType: "string",
          },
          {
            columnIndex: 6,
            className: "cell",
            content: "15,08,000",
            contentType: "number",
          },
        ],
      },
    ],
  };

  return (
    <>
      <Application appTitle="Sales and Order">
        <DsTableComponent
          className={tempTableData.className}
          id={tempTableData.id}
          columns={tempTableData.columns}
          rows={tempTableData.rows}
        ></DsTableComponent>
      </Application>
    </>
  );
}
