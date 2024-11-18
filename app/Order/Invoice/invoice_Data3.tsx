import DsTableComponent from "@/app/Elements/Components/DsTablecomponent/DsTableComponent";
import {
  tcolumn,
  trow,
} from "@/app/Elements/Components/DsTablecomponent/helpers/types";

const Invoice_Data: React.FC = () => {
  // Define column headers using tcolumn class
  const columns: tcolumn[] = [
    { columnIndex: 1, columnHeader: "Type" },
    { columnIndex: 2, columnHeader: "Doc. Number" },
    { columnIndex: 3, columnHeader: "Doc Date" },
    { columnIndex: 4, columnHeader: "Amt.(₹)" },
  ];

  // Define row data using trow and cellData classes
  const rows: trow[] = [
    {
      rowIndex: 1,
      content: [
        { columnIndex: 1, content: "C" },
        { columnIndex: 2, content: "PC4000517" },
        { columnIndex: 3, content: "06/07/2024" },
        { columnIndex: 4, content: "1800.00" },
      ],
    },
    {
      rowIndex: 2,
      content: [
        { columnIndex: 1, content: "C" },
        { columnIndex: 2, content: "OG4000483" },
        { columnIndex: 3, content: "04/07/2024" },
        { columnIndex: 4, content: "12959.00" },
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
