import TableComponent from "@/Elements/DsComponents/DsTablecomponent/DsTableComponent";
import { tableData, tcolumn, DsTableRow, cellData } from "@/helpers/types";
import { SetStateAction, useEffect, useState } from "react";
import { useTenderData } from "../TenderDataContextProvider";
import ProductSearch from "./productSearch";

const DsProductTable: React.FC = () => {
  // const { tenderData,addTenderProduct } = useTenderData();
  const { tenderData,updateTenderData } = useTenderData();
  const [tenderProductTable, setTenderProductTable] = useState<tableData>();

  useEffect(() => {
    if (tenderData.products.length > 0) {
      // Define table columns
      const columns: tcolumn[] = [
        { columnIndex: 1, columnHeader: "Generic Name" },
        { columnIndex: 2, columnHeader: "Quantity"},
        { columnIndex: 3, columnHeader: "Packing Size"},
        { columnIndex: 4, columnHeader: "Product Name" },
        { columnIndex: 5, columnHeader: "Product Packing Size" },
        { columnIndex: 6, columnHeader: "MRP" },
        { columnIndex: 7, columnHeader: "PTR" },
        { columnIndex: 8, columnHeader: "Direct Cost" },
        { columnIndex: 9, columnHeader: "IP" },
      ];

      // Map products to table rows
      const rows: DsTableRow[] = tenderData.products.map((product, index) => {
        const cells: cellData[] = [
          { columnIndex: 1, content: product.name || "-" },
          { columnIndex: 2, content: product.id || "-" },
          { columnIndex: 3, content: product.packSize || "-" },
          { columnIndex: 4, content: <ProductSearch setSelectedProductId={(id)=>{setProductRowData(id,index)}}></ProductSearch> }, // Editable Product Name
          { columnIndex: 5, content: "-" }, // Product Packing Size
          { columnIndex: 6, content: "-" }, // MRP
          { columnIndex: 7, content: "-" }, // PTR
          { columnIndex: 8, content: "-" }, // Direct Cost
          { columnIndex: 9, content: "-" }, // IP
        ];

        return {
          rowIndex: index + 1,
          content: cells,
        };
      });

      // Update table data
      setTenderProductTable({
        className: "tender-product-table",
        id: "productTable",
        type: "InterActive",
        isSortable: false,
        hasSearch: false,
        columns,
        rows,
      });
    }
  }, [tenderData.products]);

  return (
    tenderProductTable && (
      <TableComponent
        className={tenderProductTable.className}
        id={tenderProductTable.id}
        columns={tenderProductTable.columns}
        rows={tenderProductTable.rows}
      ></TableComponent>
    )
  );
};

export default DsProductTable;
