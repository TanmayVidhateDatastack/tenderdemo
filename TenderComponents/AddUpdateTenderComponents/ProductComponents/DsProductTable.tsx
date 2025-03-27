import React, { useEffect, useMemo, useState } from "react";
import TableComponent from "@/Elements/DsComponents/DsTablecomponent/DsTableComponent";
import { tableData, tcolumn, DsTableRow, TenderProduct } from "@/Common/helpers/types";
import { useTenderData } from "../TenderDataContextProvider";
import DsTextField from "@/Elements/DsComponents/DsInputs/dsTextField";
import DsCustomerLPR from "./CustomerLpr";
import DsButton from "@/Elements/DsComponents/DsButtons/dsButton";
import ProductTableSearch from "./ProductTableSearch";
import Image from "next/image";
import EmptyHour from "@/Common/TenderIcons/mediumIcons/emptyHourglass.svg";
import styles from "@/app/page.module.css";

 
const DsProductTable: React.FC = () => {
  const { tenderData, updateTenderProduct } = useTenderData();
  const [tenderProductTable, setTenderProductTable] = useState<tableData | undefined>();
  const [localProducts, setLocalProducts] = useState<TenderProduct[]>(tenderData.products);
  const [hasChanges, setHasChanges] = useState(false);
 
  const calculatedProducts = useMemo(() => {
    return localProducts.map((product) => {
      const calculated: TenderProduct = { ...product };
      if (product.proposedRate && product.quantity) calculated.totalCost = product.quantity * product.proposedRate;
      if (product.proposedRate && product.directCost) {
        calculated.marginValue = Number(product.proposedRate) - Number(product.directCost);
        calculated.marginPercent = (calculated.marginValue / Number(product.directCost)) * 100 || 0;
      }
      if (product.PTRpercent && product.ptr) calculated.stockistDiscount = Number(product.ptr) * (product.PTRpercent / 100);
      calculated.netValue = (calculated.totalCost || 0) + (calculated.marginValue || 0);
      console.log("In product table");
      return calculated;
    });
  }, [localProducts]);
 
  const handleFieldChange = (index: number, field: keyof TenderProduct, value: string | number) => {
    setLocalProducts((prev) => prev.map((p, i) => (i === index ? { ...p, [field]: value } : p)));
    setHasChanges(true);
  };
 
 
  const handleSave = () => {
    calculatedProducts.forEach((product) => {
      if (product.id) {
        updateTenderProduct(product.id, "name", product.name || "");
        updateTenderProduct(product.id, "quantity", product.quantity || 0);
        updateTenderProduct(product.id, "packingSize", product.packingSize || "");
        updateTenderProduct(product.id, "totalCost", product.totalCost || 0);
        updateTenderProduct(product.id, "marginValue", product.marginValue || 0);
        updateTenderProduct(product.id, "marginPercent", product.marginPercent || 0);
        updateTenderProduct(product.id, "netValue", product.netValue || 0);
      }
    });
    setHasChanges(false);
  };
 
  const columns: tcolumn[] = useMemo(() => [
    { columnIndex: 1, columnHeader: "Generic Name" },
    { columnIndex: 2, columnHeader: "Quantity" },
    { columnIndex: 3, columnHeader: "Packing Size" },
    { columnIndex: 4, columnHeader: "Product Name" },
    { columnIndex: 5, columnHeader: "MRP" },
    { columnIndex: 6, columnHeader: "PTR" },
    { columnIndex: 7, columnHeader: "Direct Cost" },
    { columnIndex: 8, columnHeader: "IP LQR" },
    { columnIndex: 9, columnHeader: "Customer LPR" },
    { columnIndex: 10, columnHeader: "Proposed Rate" },
    { columnIndex: 11, columnHeader: "PTR %" },
    { columnIndex: 12, columnHeader: "Discount" },
    { columnIndex: 13, columnHeader: "Total Cost" },
    { columnIndex: 14, columnHeader: "Margin" },
    { columnIndex: 15, columnHeader: "Margin %" },
    { columnIndex: 16, columnHeader: "Net Value" },
  ], []);
 
  const rows: DsTableRow[] = useMemo(() => calculatedProducts.map((product, index) => ({
    rowIndex: index + 1,
    content: [
      {
        columnIndex: 1,
        content: (product.dataSource === "fetch") ? <DsTextField initialValue={product.genericName || ""} onChange={(e) => handleFieldChange(index, "genericName", e.target.value)} /> : product.genericName || "-"
      },
 
      {
        columnIndex: 2,
        content: <DsTextField initialValue={product.quantity?.toString() || ""} onChange={(e) => handleFieldChange(index, "quantity", Number(e.target.value))} />,
        alignment: "right"
      },
 
      {
        columnIndex: 3,
        content: product.dataSource === "fetch" ? "-" : product.packingSize || "-",
        alignment: "left"
      },
 
      {
        columnIndex: 4,
        content: product.dataSource === "csv" ?
          <ProductTableSearch tableRowIndex={index + 1} setLocalProducts={setLocalProducts} setHasChanges={setHasChanges} />
          : product.name || "-",
        alignment: "left"
      },
      { columnIndex: 5, content: product?.dataSource == "saved" ? product.mrpRate?.toString() || "-" : "-" },
      { columnIndex: 6, content: product?.dataSource == "saved" ? product.ptr?.toString() || "-" : "-" },
      { columnIndex: 7, content: product?.dataSource == "saved" ? product.directCost?.toString() || "-" : "-" },
      { columnIndex: 8, content: product?.dataSource == "saved" ? product.LQR?.toString() || "-" : "-" },
      {
        columnIndex: 9, content: product?.dataSource == "saved" ?
          <DsCustomerLPR index={index + 1} lprValue={product.customerLprValue} lprTo={product.customerLprTo} onValueChange={(value) => handleFieldChange(index, "customerLprValue", Number(value))} onCompanyChange={(company) => handleFieldChange(index, "customerLprTo", company.id)} /> : "-"
      },
      {
        columnIndex: 10, content: product?.dataSource == "saved" ?
          <DsTextField inputType="number" initialValue={product.proposedRate?.toString() || ""} onChange={(e) => handleFieldChange(index, "proposedRate", Number(e.target.value))} /> : "-"
      },
      {
        columnIndex: 11, content: product?.dataSource == "saved" ?
          <DsTextField inputType="number" initialValue={product.PTRpercent?.toString() || ""} onChange={(e) => handleFieldChange(index, "PTRpercent", Number(e.target.value))} /> : "-"
      },
      {
        columnIndex: 12, content: product?.dataSource == "saved" ?
          <DsTextField inputType="number" initialValue={product.stockistDiscount?.toFixed(2) || ""} onChange={(e) => handleFieldChange(index, "stockistDiscount", Number(e.target.value))} /> : "-"
      },
      { columnIndex: 13, content: product?.dataSource == "saved" ? product.totalCost?.toFixed(2) || "-" : "-" },
      { columnIndex: 14, content: product?.dataSource == "saved" ? product.marginValue?.toFixed(2) || "-" : "-" },
      { columnIndex: 15, content: product?.dataSource == "saved" ? product.marginPercent?.toFixed(2) + "%" || "-" : "-" },
      { columnIndex: 16, content: product?.dataSource == "saved" ? product.netValue?.toFixed(2) || "-" : "-" },
    ],
  })), [calculatedProducts]);
 
  useEffect(() => {
    setTenderProductTable({ className: "tender-product-table", id: "productTable", type: "InterActive", isSortable: false, hasSearch: false, columns, rows });
  }, [columns, rows]);
 
  return (
    <>
    <div className="tender-product-container">
      {tenderProductTable &&
       <TableComponent className={tenderProductTable.className} 
       id={tenderProductTable.id}
        columns={tenderProductTable.columns}
         rows={tenderProductTable.rows}
    
         />}
        
           {tenderProductTable?.rows.length == 0 && (
                  <div className={styles.noDataFound}>
                    <div></div>
                    <div className={styles.noData}>
                      <Image src={EmptyHour} alt="-"></Image>
                      <div>Products Not Available</div>
                    </div>
                    <div className={styles.noDataBorders}></div>
                  </div>
                )
              }
      <div className="table-actions">
        <DsButton onClick={handleSave} disable={!hasChanges} className="save-button">Save Changes</DsButton>
      </div>
    </div>
    </>
  );
};
 
export default DsProductTable;
 
 