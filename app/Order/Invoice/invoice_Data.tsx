import DsTableComponent from "@/app/Elements/Components/DsTablecomponent/DsTableComponent";
import {
  tcolumn,
  trow,
} from "@/app/Elements/Components/DsTablecomponent/helpers/types";

const Invoice_Data: React.FC = () => {
  // Define column headers using tcolumn class
  const columns: tcolumn[] = [
    { columnIndex: 1, columnHeader: "Prod Code" },
    { columnIndex: 2, columnHeader: "Product Name" },
    { columnIndex: 3, columnHeader: "HSN" },
    { columnIndex: 4, columnHeader: "Qty" },
    { columnIndex: 5, columnHeader: "D.Qty" },
    { columnIndex: 6, columnHeader: "S/N" },
    { columnIndex: 7, columnHeader: "Mfg. By" },
    { columnIndex: 8, columnHeader: "Batch No." },
    { columnIndex: 9, columnHeader: "Mfg" },
    { columnIndex: 10, columnHeader: "Expiry" },
    { columnIndex: 11, columnHeader: "MRP" },
    { columnIndex: 12, columnHeader: "PTR" },
    { columnIndex: 13, columnHeader: "PTS" },
    { columnIndex: 14, columnHeader: "Amt." },
    { columnIndex: 15, columnHeader: "D.Amt" },
    { columnIndex: 16, columnHeader: "CD.Amt" },
    { columnIndex: 17, columnHeader: "Taxab" },
    { columnIndex: 18, columnHeader: "GST" },
    { columnIndex: 19, columnHeader: "CGST" },
    { columnIndex: 20, columnHeader: "SGST" },
    { columnIndex: 21, columnHeader: "Inv. Val" },
  ];

  // Define row data using trow and cellData classes
  const rows: trow[] = [
    {
      rowIndex: 1,
      content: [
        { columnIndex: 1, content: "EKO04" },
        { columnIndex: 2, content: "Glyree-3 10s" },
        { columnIndex: 3, content: "30043190" },
        { columnIndex: 4, content: "90" },
        { columnIndex: 5, content: "100" },
        { columnIndex: 6, content: "N" },
        { columnIndex: 7, content: "IPCA" },
        { columnIndex: 8, content: "30049099" },
        { columnIndex: 9, content: "07/23" },
        { columnIndex: 10, content: "07/23" },
        { columnIndex: 11, content: "132.60" },
        { columnIndex: 12, content: "85.25" },
        { columnIndex: 13, content: "85.25" },
        { columnIndex: 14, content: "852.50" },
        { columnIndex: 15, content: "0" },
        { columnIndex: 16, content: "0.00" },
        { columnIndex: 17, content: "852.50" },
        { columnIndex: 18, content: "12" },
        { columnIndex: 19, content: "51.15" },
        { columnIndex: 20, content: "51.15" },
        { columnIndex: 21, content: "954.80" },
      ],
    },
    {
      rowIndex: 2,
      content: [
        { columnIndex: 1, content: "GXC01" },
        { columnIndex: 2, content: "Rxtor-5 10s" },
        { columnIndex: 3, content: "30049190" },
        { columnIndex: 4, content: "20" },
        { columnIndex: 5, content: "20" },
        { columnIndex: 6, content: "N" },
        { columnIndex: 7, content: "IPCA" },
        { columnIndex: 8, content: "30049099" },
        { columnIndex: 9, content: "03/26" },
        { columnIndex: 10, content: "03/26" },
        { columnIndex: 11, content: "103.65" },
        { columnIndex: 12, content: "66.64" },
        { columnIndex: 13, content: "66.64" },
        { columnIndex: 14, content: "1332.80" },
        { columnIndex: 15, content: "0" },
        { columnIndex: 16, content: "0.00" },
        { columnIndex: 17, content: "1332.80" },
        { columnIndex: 18, content: "12" },
        { columnIndex: 19, content: "79.97" },
        { columnIndex: 20, content: "79.97" },
        { columnIndex: 21, content: "1492.74" },
      ],
    },
    {
      rowIndex: 3,
      content: [
        { columnIndex: 1, content: "SHL01" },
        { columnIndex: 2, content: "Suitglip" },
        { columnIndex: 3, content: "30049190" },
        { columnIndex: 4, content: "9" },
        { columnIndex: 5, content: "9" },
        { columnIndex: 6, content: "N" },
        { columnIndex: 7, content: "MSNL" },
        { columnIndex: 8, content: "30049099" },
        { columnIndex: 9, content: "09/25" },
        { columnIndex: 10, content: "09/25" },
        { columnIndex: 11, content: "65.95" },
        { columnIndex: 12, content: "42.40" },
        { columnIndex: 13, content: "42.40" },
        { columnIndex: 14, content: "381.60" },
        { columnIndex: 15, content: "0" },
        { columnIndex: 16, content: "0.00" },
        { columnIndex: 17, content: "381.60" },
        { columnIndex: 18, content: "12" },
        { columnIndex: 19, content: "22.90" },
        { columnIndex: 20, content: "22.90" },
        { columnIndex: 21, content: "427.40" },
      ],
    },
    {
      rowIndex: 4,
      content: [
        { columnIndex: 1, content: "Total of CARDIMET", colSpan: 14 },
        { columnIndex: 2, content: "0.00", colSpan: 1 },
        { columnIndex: 3, content: "0.00", colSpan: 1 },
        { columnIndex: 4, content: "2566.90", colSpan: 1 },
        { columnIndex: 5, content: "154.02", colSpan: 2 },
        { columnIndex: 6, content: "154.02", colSpan: 1 },
        { columnIndex: 7, content: "2874.94", colSpan: 1 },
      ],
    },
    {
      rowIndex: 5,
      content: [
        { columnIndex: 1, content: "EHL01" },
        { columnIndex: 2, content: "Solvin Nasal" },
        { columnIndex: 3, content: "30049190" },
        { columnIndex: 4, content: "9" },
        { columnIndex: 5, content: "0" },
        { columnIndex: 6, content: "N" },
        { columnIndex: 7, content: "MSNL" },
        { columnIndex: 8, content: "30049099" },
        { columnIndex: 9, content: "09/25" },
        { columnIndex: 10, content: "09/25" },
        { columnIndex: 11, content: "65.95" },
        { columnIndex: 12, content: "42.40" },
        { columnIndex: 13, content: "42.40" },
        { columnIndex: 14, content: "381.60" },
        { columnIndex: 15, content: "0" },
        { columnIndex: 16, content: "0.00" },
        { columnIndex: 17, content: "381.60" },
        { columnIndex: 18, content: "12" },
        { columnIndex: 19, content: "22.90" },
        { columnIndex: 20, content: "22.90" },
        { columnIndex: 21, content: "427.40" },
      ],
    },
    {
      rowIndex: 6,
      content: [
        { columnIndex: 1, content: "Total of ACTINOVA", colSpan: 14 },
        { columnIndex: 2, content: "0.00", colSpan: 1 },
        { columnIndex: 3, content: "0.00", colSpan: 1 },
        { columnIndex: 4, content: "22566.90", colSpan: 1 },
        { columnIndex: 5, content: "1323.02", colSpan: 2 },
        { columnIndex: 6, content: "1323.02", colSpan: 1 },
        { columnIndex: 7, content: "28704.94", colSpan: 1 },
      ],
    },
    {
      rowIndex: 7,
      content: [
        { columnIndex: 1, content: "RPZ01" },
        { columnIndex: 2, content: "REvelol 25H Ta" },
        { columnIndex: 3, content: "30049190" },
        { columnIndex: 4, content: "9" },
        { columnIndex: 5, content: "0" },
        { columnIndex: 6, content: "N" },
        { columnIndex: 7, content: "MSNL" },
        { columnIndex: 8, content: "30049099" },
        { columnIndex: 9, content: "09/25" },
        { columnIndex: 10, content: "09/25" },
        { columnIndex: 11, content: "65.95" },
        { columnIndex: 12, content: "42.40" },
        { columnIndex: 13, content: "42.40" },
        { columnIndex: 14, content: "381.60" },
        { columnIndex: 15, content: "0" },
        { columnIndex: 16, content: "0.00" },
        { columnIndex: 17, content: "381.60" },
        { columnIndex: 18, content: "12" },
        { columnIndex: 19, content: "22.90" },
        { columnIndex: 20, content: "22.90" },
        { columnIndex: 21, content: "427.40" },
      ],
    },
  ];

  return (
    <>
      <DsTableComponent
        className={" "}
        id={" "}
        columns={columns}
        rows={rows}
        alignment={"center"}
        isFooterRequired={false}
      ></DsTableComponent>
    </>
  );
};

export default Invoice_Data;
