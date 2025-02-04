import TableComponent from "@/Elements/DsComponents/DsTablecomponent/DsTableComponent";
import { tableData } from "@/helpers/types";
import { useEffect, useState } from "react";

const DsProductTable: React.FC = ({ prodcutList, setTenderProductData }) => {
  const [tenderProductTable, setTenderProductTable] = useState<tableData>();

  useEffect(()=>{
    
  },[prodcutList])
  return (
    tenderProductTable && (
      <TableComponent
        className={""}
        id={""}
        columns={tenderProductTable.columns}
        rows={tenderProductTable.rows}
      ></TableComponent>
    )
  );
};

export default DsProductTable;
