import DsTableComponent from "@/app/Elements/Components/DsTablecomponent/DsTableComponent";
import {
  tcolumn,
  trow,
} from "@/app/Elements/Components/DsTablecomponent/helpers/types";

const Invoice_Data: React.FC = () => {
  // Define column headers using tcolumn class
  const columns: tcolumn[] = [
    { columnIndex: 1, columnHeader: "Tax Per" },
    { columnIndex: 2, columnHeader: "Taxable Value" },
    { columnIndex: 3, columnHeader: "ISGT" },
    { columnIndex: 4, columnHeader: "CGST" },
    { columnIndex: 5, columnHeader: "SGST" },
    { columnIndex: 6, columnHeader: "Total Tax" },
  ];

  // Define row data using trow and cellData classes
  const rows: trow[] = [
    {
      rowIndex: 1,
      content: [
        { columnIndex: 1, content: "5" },
        { columnIndex: 2, content: "8030.40" },
        { columnIndex: 3, content: "0.00" },
        { columnIndex: 4, content: "200.77" },
        { columnIndex: 5, content: "200.77" },
        { columnIndex: 6, content: "401.54" },
      ],
    },
    {
      rowIndex: 2,
      content: [
        { columnIndex: 1, content: "12" },
        { columnIndex: 2, content: "86497.25" },
        { columnIndex: 3, content: "0.00" },
        { columnIndex: 4, content: "5189.84" },
        { columnIndex: 5, content: "5189.84" },
        { columnIndex: 6, content: "N10379.68" },
      ],
    },
    {
      rowIndex: 3,
      content: [
        { columnIndex: 1, content: "18" },
        { columnIndex: 2, content: "1976.90" },
        { columnIndex: 3, content: "0.00" },
        { columnIndex: 4, content: "177.92" },
        { columnIndex: 5, content: "177.92" },
        { columnIndex: 6, content: "355.84" },
      ],
    },
    {
      rowIndex: 4,
      content: [
        { columnIndex: 1, content: "", colSpan: 1 },
        { columnIndex: 2, content: "96504.55", colSpan: 1 },
        { columnIndex: 3, content: "0.00", colSpan: 1 },
        { columnIndex: 4, content: "5568.53", colSpan: 1 },
        { columnIndex: 5, content: "5568.53", colSpan: 1 },
        { columnIndex: 6, content: "11137.06", colSpan: 1 },
      ],
    },
    {
      rowIndex: 5,
      content: [
        {
          columnIndex: 1,
          content:
            "Certified that the particulars given above are true & correct and the amount indicated above represent the price actually charged and that there is no additional consideration flowing directly or indirectly for such cases from the buyer.",
          colSpan: 6,
        },
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
