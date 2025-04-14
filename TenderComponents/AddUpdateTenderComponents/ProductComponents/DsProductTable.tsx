import React, { useEffect, useMemo, useState } from "react";
import TableComponent from "@/Elements/DsComponents/DsTablecomponent/DsTableComponent";
import { tableData, tcolumn, DsTableRow } from "@/Common/helpers/types";
import { TenderProduct, useTenderData } from "../TenderDataContextProvider";
import DsTextField from "@/Elements/DsComponents/DsInputs/dsTextField";
import DsCustomerLPR from "./CustomerLpr";

import ProductTableSearch from "./ProductTableSearch";

import styles from "@/app/page.module.css";
import IconFactory from "@/Elements/IconComponent";

interface DsProductTableProps {
  version: number;
}

const DsProductTable: React.FC<DsProductTableProps> = ({ version }) => {
  const { tenderData, updateTenderProduct } = useTenderData();
  const [tenderProductTable, setTenderProductTable] = useState<
    tableData | undefined
  >();
  const [localProducts, setLocalProducts] = useState<TenderProduct[]>(
    tenderData.tenderRevisions?.filter((x) => x.version == version)[0]
      ?.tenderItems || []
  );
  const [hasChanges, setHasChanges] = useState(false);

  const calculatedProducts = useMemo(() => {
    return localProducts.map((tenderproduct) => {
      const calculated: TenderProduct = { ...tenderproduct };
      if (tenderproduct.proposedRate && tenderproduct.requestedQuantity)
        calculated.product.totalCost =
          tenderproduct.requestedQuantity * tenderproduct.proposedRate;
      if (tenderproduct.proposedRate && tenderproduct.product.directCost) {
        calculated.product.marginValue =
          Number(tenderproduct.proposedRate) -
          Number(tenderproduct.product.directCost);
        calculated.product.marginPercent =
          (calculated.product.marginValue /
            Number(tenderproduct.product.directCost)) *
            100 || 0;
      }
      if (tenderproduct.ptrPercent && tenderproduct.product.ptr)
        calculated.supplierDiscount =
          Number(tenderproduct.product.ptr) * (tenderproduct.ptrPercent / 100);
      calculated.product.netValue =
        (calculated.product.totalCost || 0) +
        (calculated.product.marginValue || 0);
      console.log("In product table");
      return calculated;
    });
  }, [localProducts]);

  const handleFieldChange = (
    index: number,
    field: keyof TenderProduct | `product.${keyof TenderProduct["product"]}`,
    value: string | number
  ) => {
    // .map(
    //   (item) =>
    //     item.id === id || item.productId === id
    //       ? key.startsWith("product.")
    //         ? {
    //             ...item,
    //             product: {
    //               ...item.product,
    //               [key.split(".")[1]]: value, // Update the nested product field
    //             },
    //           }
    //         : { ...item, [key]: value } // Update the top-level field
    //       : item
    // ),

    setLocalProducts((prev) =>
      prev.map((p, i) =>
        i === index
          ? field.startsWith("product.")
            ? {
                ...p,
                product: {
                  ...p.product,
                  [field.split(".")[1]]: value, // Update the nested product field
                },
              }
            : { ...p, [field]: value }
          : p
      )
    );
    setHasChanges(true);
  };

  const handleSave = () => {
    calculatedProducts.forEach((product) => {
      if (product.id) {
        updateTenderProduct(
          1,
          product.id,
          "product.name",
          product.product.name || ""
        );
        updateTenderProduct(
          1,
          product.id,
          "requestedQuantity",
          product.requestedQuantity || 0
        );
        updateTenderProduct(
          1,
          product.id,
          "requestedPackingSize",
          product.requestedPackingSize || ""
        );
        updateTenderProduct(
          1,
          product.id,
          "product.totalCost",
          product.product.totalCost || 0
        );
        updateTenderProduct(
          1,
          product.id,
          "product.marginValue",
          product.product.marginValue || 0
        );
        updateTenderProduct(
          1,
          product.id,
          "product.marginPercent",
          product.product.marginPercent || 0
        );
        updateTenderProduct(
          1,
          product.id,
          "product.netValue",
          product.product.netValue || 0
        );
      }
    });
    setHasChanges(false);
  };

  const columns: tcolumn[] = useMemo(
    () => [
      {
        columnIndex: 1,
        columnHeader: "Generic Name",
        className: styles.cellgenericname,
      },
      {
        columnIndex: 2,
        columnHeader: "Quantity",
        className: styles.cellquantity,
      },
      {
        columnIndex: 3,
        columnHeader: "Packing Size",
        className: styles.cellpackingsize,
      },
      {
        columnIndex: 4,
        columnHeader: "Product Name",
        className: styles.cellproductname,
      },
      {
        columnIndex: 5,
        columnHeader: "Product Packing Size",
        className: styles.cellproductpakingsize,
      },
      { columnIndex: 6, columnHeader: "MRP", className: styles.cellmrp },
      { columnIndex: 7, columnHeader: "PTR", className: styles.cellptr },
      {
        columnIndex: 8,
        columnHeader: "Direct Cost",
        className: styles.celldirectcost,
      },
      { columnIndex: 9, columnHeader: "IP LQR", className: styles.celllqr },
      {
        columnIndex: 10,
        columnHeader: "Customer LPR",
        className: styles.celllpr,
      },
      {
        columnIndex: 11,
        columnHeader: "Proposed Rate",
        className: styles.cellproposedrate,
      },
      { columnIndex: 12, columnHeader: "PTR %", className: styles.cellptr },
      {
        columnIndex: 13,
        columnHeader: "Discount",
        className: styles.celldiscount,
      },
      {
        columnIndex: 14,
        columnHeader: "Total Cost",
        className: styles.celltotalcost,
      },
      { columnIndex: 15, columnHeader: "Margin", className: styles.cellmargin },
      {
        columnIndex: 16,
        columnHeader: "Margin %",
        className: styles.cellmarginper,
      },
      {
        columnIndex: 17,
        columnHeader: "Net Value",
        className: styles.cellnetvalue,
      },
    ],
    []
  );

  const rows: DsTableRow[] = useMemo(
    () =>
      calculatedProducts.map((tenderproduct, index) => ({
        rowIndex: index + 1,
        content: [
          {
            columnIndex: 1,
            content:
              tenderproduct.product.dataSource === "fetch" ? (
                <DsTextField
                  initialValue={tenderproduct.requestedGenericName || ""}
                  onChange={(e) =>
                    handleFieldChange(
                      index,
                      "requestedGenericName",
                      e.target.value
                    )
                  }
                />
              ) : (
                tenderproduct.requestedGenericName || "-"
              ),
            className: styles.cellgenericname,
          },

          {
            columnIndex: 2,
            content:
              tenderproduct.product.dataSource === "csv" ? (
                tenderproduct.requestedQuantity || "-"
              ) : (
                <DsTextField
                  initialValue={
                    tenderproduct.requestedQuantity?.toString() || ""
                  }
                  onBlur={(e) =>
                    handleFieldChange(
                      index,
                      "requestedQuantity",
                      Number((e.target as HTMLInputElement).value)
                    )
                  }
                />
              ),

            className: styles.cellquantity,
          },

          {
            columnIndex: 3,
            content:
              tenderproduct.product.dataSource === "fetch" ? (
                <DsTextField
                  initialValue={tenderproduct.requestedPackingSize || ""}
                  onChange={(e) =>
                    handleFieldChange(
                      index,
                      "requestedPackingSize",
                      e.target.value
                    )
                  }
                />
              ) : (
                tenderproduct.requestedPackingSize || "-"
              ),
            className: styles.cellpackingsize,
          },

          {
            columnIndex: 4,
            content:
              tenderproduct.product.dataSource === "csv" ? (
                <ProductTableSearch
                  tableRowIndex={index + 1}
                  setLocalProducts={setLocalProducts}
                  setHasChanges={setHasChanges}
                />
              ) : (
                tenderproduct.product.name || "-"
              ),

            className: styles.cellproductname,
          },
          {
            columnIndex: 5,
            content:
              tenderproduct.product.dataSource === "csv" ? (
                tenderproduct.product.productPackingSize || "-"
              ) : (
                <DsTextField
                  initialValue={tenderproduct.product.productPackingSize || ""}
                  onChange={(e) =>
                    handleFieldChange(
                      index,
                      "product.productPackingSize",
                      e.target.value
                    )
                  }
                />
              ),
            className: styles.cellproductpakingsize,
          },

          {
            columnIndex: 6,
            content:
              tenderproduct.product?.dataSource == "saved"
                ? tenderproduct.product.mrp?.toString() || "-"
                : "-",
            className: styles.cellmrp,
          },
          {
            columnIndex: 7,
            content:
              tenderproduct.product?.dataSource == "saved"
                ? tenderproduct.product.ptr?.toString() || "-"
                : "-",
            className: styles.cellptr,
          },
          {
            columnIndex: 8,
            content:
              tenderproduct.product?.dataSource == "saved"
                ? tenderproduct.product.directCost?.toString() || "-"
                : "-",
            className: styles.celldirectcost,
          },
          {
            columnIndex: 9,
            content:
              tenderproduct.product?.dataSource == "saved"
                ? tenderproduct.product.lqr?.toString() || "-"
                : "-",
            className: styles.celllqr,
          },
          {
            columnIndex: 10,
            content:
              tenderproduct.product?.dataSource == "saved" ? (
                <DsCustomerLPR
                  index={index + 1}
                  lprValue={tenderproduct.lpr}
                  lprTo={{
                    id: tenderproduct.competitorId.toString(),
                    name: tenderproduct.product.competitorName || "",
                  }}
                  onValueChange={(value) =>
                    handleFieldChange(index, "lpr", Number(value))
                  }
                  onCompanyChange={(company) => {
                    handleFieldChange(index, "competitorId", company.id);
                    handleFieldChange(
                      index,
                      "product.competitorName",
                      company.name
                    );
                  }}
                />
              ) : (
                "-"
              ),
            className: styles.celllpr,
          },
          {
            columnIndex: 11,
            content:
              tenderproduct.product?.dataSource == "saved" ? (
                <DsTextField
                  inputType="number"
                  initialValue={tenderproduct.proposedRate?.toString() || ""}
                  onChange={(e) =>
                    handleFieldChange(
                      index,
                      "proposedRate",
                      Number(e.target.value)
                    )
                  }
                />
              ) : (
                "-"
              ),
            className: styles.cellproposedrate,
          },
          {
            columnIndex: 12,
            content:
              tenderproduct.product?.dataSource == "saved" ? (
                <DsTextField
                  inputType="number"
                  initialValue={tenderproduct.ptrPercent?.toString() || ""}
                  onChange={(e) =>
                    handleFieldChange(
                      index,
                      "ptrPercent",
                      Number(e.target.value)
                    )
                  }
                />
              ) : (
                "-"
              ),
            className: styles.cellptr,
          },
          {
            columnIndex: 13,
            content:
              tenderproduct.product?.dataSource == "saved" ? (
                <DsTextField
                  inputType="number"
                  initialValue={
                    tenderproduct.supplierDiscount?.toFixed(2) || ""
                  }
                  onChange={(e) =>
                    handleFieldChange(
                      index,
                      "supplierDiscount",
                      Number(e.target.value)
                    )
                  }
                />
              ) : (
                "-"
              ),
            className: styles.celldiscount,
          },
          {
            columnIndex: 14,
            content:
              tenderproduct.product?.dataSource == "saved"
                ? tenderproduct.product.totalCost?.toFixed(2) || "-"
                : "-",
            className: styles.celltotalcost,
          },
          {
            columnIndex: 15,
            content:
              tenderproduct.product?.dataSource == "saved"
                ? tenderproduct.product.marginValue?.toFixed(2) || "-"
                : "-",
            className: styles.cellmargin,
          },
          {
            columnIndex: 16,
            content:
              tenderproduct.product?.dataSource == "saved"
                ? tenderproduct.product.marginPercent?.toFixed(2) + "%" || "-"
                : "-",
            className: styles.cellmarginper,
          },
          {
            columnIndex: 17,
            content:
              tenderproduct.product?.dataSource == "saved"
                ? tenderproduct.product.netValue?.toFixed(2) || "-"
                : "-",
            className: styles.cellnetvalue,
          },
        ],
      })),
    [calculatedProducts]
  );
  useEffect(() => {

    setLocalProducts(
      tenderData.tenderRevisions.filter((x) => x.version == version)[0]
        ?.tenderItems||[]
    );
  }, [
    tenderData.tenderRevisions.filter((x) => x.version == version)[0]
      ?.tenderItems||[],
  ]);

  // useEffect(() => {
  //   const revision = tenderData.tenderRevisions.find(
  //     (rev) => rev.version === version
  //   );
  //   if (revision) {
  //     setLocalProducts(revision.tenderItems);
  //   }
  // }, [version, tenderData]);

  useEffect(() => {
    setTenderProductTable({
      className: styles["tender-product-table"],
      id: "productTable",
      type: "InterActive",
      isSortable: false,
      hasSearch: false,
      columns,
      rows,
    });
  }, [columns, rows]);

  return (
    <>
      <div className="tender-product-container">
        {tenderProductTable && (
          <TableComponent
            className={tenderProductTable.className}
            id={tenderProductTable.id}
            columns={tenderProductTable.columns}
            rows={tenderProductTable.rows}
            isSelectAble={true}
          />
        )}

        {tenderProductTable?.rows.length == 0 && (
          <div className={styles.noDataFound}>
            <div></div>
            <div className={styles.noData}>
              <IconFactory name={"emptyHourGlass"} />
              <div>Products Not Available</div>
            </div>
            <div className={styles.noDataBorders}></div>
          </div>
        )}
      </div>
    </>
  );
};

export default DsProductTable;
