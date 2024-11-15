import Image from "next/image";
import correctSign from "@/app/Elements/Icons/smallIcons/correctsign.svg";
import DsTableComponent from "@/app/Elements/Components/DsTablecomponent/DsTableComponent";
import {
  tcolumn,
  trow,
} from "@/app/Elements/Components/DsTablecomponent/helpers/types";

const PackingData: React.FC = () => {
  // Define column headers using tcolumn class
  const columns: tcolumn[] = [
    { columnIndex: 1, columnHeader: "Prod Code" },
    { columnIndex: 2, columnHeader: "Product Name" },
    { columnIndex: 3, columnHeader: "Mfg. By" },
    { columnIndex: 4, columnHeader: "Batch No." },
    { columnIndex: 5, columnHeader: "Mfg" },
    { columnIndex: 6, columnHeader: "Expiry" },
    { columnIndex: 7, columnHeader: "Qty" },
    { columnIndex: 8, columnHeader: "Carton Size" },
    { columnIndex: 9, columnHeader: "Scheme & Bonus" },
    { columnIndex: 10, columnHeader: "Picked" },
    { columnIndex: 11, columnHeader: "Packed" },
  ];

  // Define row data using trow and cellData classes
  const rows: trow[] = [
    {
      rowIndex: 1,
      content: [
        { columnIndex: 1, content: "EKO04" },
        { columnIndex: 2, content: "Glyree-3 10s" },
        { columnIndex: 3, content: "IPCA" },
        { columnIndex: 4, content: "30049091" },
        { columnIndex: 5, content: "07/23" },
        { columnIndex: 6, content: "07/25" },
        { columnIndex: 7, content: 10 },
        { columnIndex: 8, content: 20 },
        { columnIndex: 9, content: "" },
        { columnIndex: 10, content: <Image src={correctSign} alt="icon" /> },
        { columnIndex: 11, content: <Image src={correctSign} alt="icon" /> },
      ],
    },
    {
      rowIndex: 2,
      content: [
        { columnIndex: 1, content: "GXC01" },
        { columnIndex: 2, content: "Rxtor-5 10s" },
        { columnIndex: 3, content: "IPCA" },
        { columnIndex: 4, content: "30049092" },
        { columnIndex: 5, content: "03/24" },
        { columnIndex: 6, content: "03/27" },
        { columnIndex: 7, content: 19 },
        { columnIndex: 8, content: 20 },
        { columnIndex: 9, content: "" },
        { columnIndex: 10, content: <Image src={correctSign} alt="icon" /> },
        { columnIndex: 11, content: <Image src={correctSign} alt="icon" /> },
      ],
    },
    {
      rowIndex: 3,
      content: [
        { columnIndex: 1, content: "SHL01" },
        { columnIndex: 2, content: "Suitglip 25 10s" },
        { columnIndex: 3, content: "MSNL" },
        { columnIndex: 4, content: "30049099" },
        { columnIndex: 5, content: "09/24" },
        { columnIndex: 6, content: "09/26" },
        { columnIndex: 7, content: 9 },
        { columnIndex: 8, content: 10 },
        { columnIndex: 9, content: "" },
        { columnIndex: 10, content: <Image src={correctSign} alt="icon" /> },
        { columnIndex: 11, content: <Image src={correctSign} alt="icon" /> },
        // { columnIndex: 11, content: <TextField /> },
      ],
    },
    {
      rowIndex: 4,
      content: [{ columnIndex: 1, content: "CARDIMET", colSpan: 11 }],
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

export default PackingData;
