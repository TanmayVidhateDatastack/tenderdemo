import React, { useCallback, useEffect, useMemo, useState } from "react";
import TableComponent from "@/Elements/DsComponents/DsTablecomponent/DsTableComponent";
import { tableData, tcolumn, DsTableRow } from "@/Common/helpers/types";
import { TenderProduct, useTenderData } from "../TenderDataContextProvider";
import DsTextField from "@/Elements/DsComponents/DsInputs/dsTextField";
import DsCustomerLPR from "./CustomerLpr";
import ProductTableSearch from "./ProductTableSearch";
import styles from "@/app/page.module.css";
import IconFactory from "@/Elements/IconComponent";
import {
  displayTableMenu,
  FloatingMenu,
} from "@/Elements/DsComponents/FloatingMenu/dsFloatingMenu";
import DsButton from "@/Elements/DsComponents/DsButtons/dsButton";
import Image from "next/image";
import { changeImage } from "@/Common/helpers/Method/conversion";
import ContextMenu, {
  closeContext,
  displayContext,
} from "@/Elements/DsComponents/dsContextHolder/dsContextHolder";
import whitetrashbtn from "@/Common/TenderIcons/smallIcons/whitetrash.svg";
import trashbtn from "@/Common/TenderIcons/smallIcons/trashbtn.svg";
import { TenderProductDiscountPercentage } from "@/Common/helpers/constant";

interface DsProductTableProps {
  version: number;
  // removeTenderProduct: (version: number, id: number) => void;
}

const DsProductTable: React.FC<DsProductTableProps> = ({ version }) => {
  const {
    tenderData,
    updateTenderProduct,
    removeTenderProduct,
    saveTender,
    tenderDataCopy,
  } = useTenderData();
  const [tenderProductTable, setTenderProductTable] = useState<
    tableData | undefined
  >();
  const [localProducts, setLocalProducts] = useState<TenderProduct[]>([]);
  const [hasChanges, setHasChanges] = useState(false);
  const [productIds, setProductIds] = useState<number[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<number | undefined>();
  const [selectedProductName, setSelectedProductName] = useState<
    string | undefined
  >();
  const [selectedRowIndices, setSelectedRowIndices] = useState<number[]>([]);

  const calculatedProducts = useMemo(() => {
    return localProducts.map((tenderproduct) => {
      const calculated: TenderProduct = { ...tenderproduct };
      if (tenderproduct.product.directCost) {
        const ptrTemp = tenderproduct.product.ptr;
        const ptr =
          ptrTemp !== undefined
            ? typeof ptrTemp == "number"
              ? ptrTemp
              : Number(ptrTemp)
            : 1;
        calculated.ptrPercentage = 100 - ((tenderproduct.proposedRate || 0) / ptr) * 100;
        const discount = tenderproduct.stockistDiscountValue
          ? tenderproduct.stockistDiscountValue
          : ((tenderproduct.proposedRate || 0) *
              TenderProductDiscountPercentage) /
            100;

        calculated.product.totalCost =
          Number(tenderproduct.product.directCost) + Number(discount);
        calculated.product.marginValue =
          Number(tenderproduct.proposedRate) - calculated.product.totalCost;
        calculated.product.marginPercent =
          (calculated.product.marginValue /
            Number(tenderproduct.proposedRate)) *
            100 || 0;
        calculated.product.netValue =
          (calculated.proposedRate || 0) * (calculated.requestedQuantity || 0);
      }

      return calculated;
    });
  }, [localProducts]);

  const handleFieldChange = (
    index: number,
    field: keyof TenderProduct | `product.${keyof TenderProduct["product"]}`,
    value: string | number
  ) => {
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
    // setTimeout(() => handleSave(), 2);
  };

  const handleSave = () => {
    calculatedProducts.forEach((product) => {
      if (product.id) {
        updateTenderProduct(
          version,
          product.id,
          "product.productName",
          product.product.productName || ""
        );
        updateTenderProduct(
          version,
          product.id,
          "requestedQuantity",
          product.requestedQuantity || 0
        );
        updateTenderProduct(
          version,
          product.id,
          "requestedPackingSize",
          product.requestedPackingSize || ""
        );
        updateTenderProduct(
          version,
          product.id,
          "product.totalCost",
          product.product.totalCost || 0
        );
        updateTenderProduct(
          version,
          product.id,
          "product.marginValue",
          product.product.marginValue || 0
        );
        updateTenderProduct(
          version,
          product.id,
          "product.marginPercent",
          product.product.marginPercent || 0
        );
        updateTenderProduct(
          version,
          product.id,
          "product.netValue",
          product.product.netValue || 0
        );
        updateTenderProduct(
          version,
          product.id,
          "proposedRate",
          product.proposedRate || 0
        );
        updateTenderProduct(
          version,
          product.id,
          "ptrPercentage",
          product.ptrPercentage || 0
        );
        updateTenderProduct(
          version,
          product.id,
          "stockistDiscountValue",
          product.stockistDiscountValue || 0
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
        customAttributes: {
          genericName: tenderproduct.requestedGenericName || "",
          productId: tenderproduct.productId || 0,
          productName: tenderproduct.product.productName || "",
        },

        content: [
          {
            columnIndex: 1,
            content:
              tenderproduct.product?.dataSource === "fetch" ? (
                <DsTextField
                  initialValue={tenderproduct.requestedGenericName || ""}
                  onBlur={(e) =>
                    handleFieldChange(
                      index,
                      "requestedGenericName",
                      (e.target as HTMLInputElement).value
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
              tenderproduct.product?.dataSource === "csv" ? (
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
              tenderproduct.product?.dataSource === "fetch" ? (
                <DsTextField
                  initialValue={tenderproduct.requestedPackingSize || ""}
                  onBlur={(e) =>
                    handleFieldChange(
                      index,
                      "requestedPackingSize",
                      (e.target as HTMLInputElement).value
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
              tenderproduct.product?.dataSource === "csv" ? (
                <ProductTableSearch
                  tableRowIndex={index + 1}
                  setLocalProducts={setLocalProducts}
                  setHasChanges={setHasChanges}
                  initialValue={tenderproduct.product.productName || ""}
                />
              ) : (
                tenderproduct.product?.productName || "-"
              ),

            className: styles.cellproductname,
          },
          {
            columnIndex: 5,
            content:
              tenderproduct.product?.dataSource === "csv" ? (
                tenderproduct.product.productPackingSize || "-"
              ) : (
                <DsTextField
                  initialValue={tenderproduct.product?.productPackingSize || ""}
                  onBlur={(e) =>
                    handleFieldChange(
                      index,
                      "product.productPackingSize",
                      (e.target as HTMLInputElement).value
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
                    id: tenderproduct.competitorId || 0,
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
                  onBlur={(e) => {
                    const proposedRate = Number(
                      (e.target as HTMLInputElement).value
                    );
                    if (tenderproduct.proposedRate !== proposedRate) {
                      const ptrTemp = tenderproduct.product.ptr;
                      const ptr =
                        ptrTemp !== undefined
                          ? typeof ptrTemp == "number"
                            ? ptrTemp
                            : Number(ptrTemp)
                          : 1;
                      const ptrPer = 100 - (proposedRate / ptr) * 100;
                      const discount =
                        (proposedRate * TenderProductDiscountPercentage) / 100;
                      console.log(proposedRate);
                      console.log(ptrPer);
                      console.log(discount);
                      handleFieldChange(index, "proposedRate", proposedRate);
                      handleFieldChange(index, "ptrPercentage", ptrPer);
                      handleFieldChange(
                        index,
                        "stockistDiscountValue",
                        discount
                      );
                    }
                  }}
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
                  initialValue={tenderproduct.ptrPercentage?.toString() || ""}
                  onBlur={(e) => {
                    const ptrPer = Number((e.target as HTMLInputElement).value);
                    if (tenderproduct.ptrPercentage !== ptrPer) {
                      const ptrTemp = tenderproduct.product.ptr;
                      const ptr =
                        ptrTemp !== undefined
                          ? typeof ptrTemp == "number"
                            ? ptrTemp
                            : Number(ptrTemp)
                          : 1;
                      const proposedRate = ((100 - ptrPer) * ptr) / 100;

                      const discount =
                        (proposedRate * TenderProductDiscountPercentage) / 100;
                      console.log(proposedRate);
                      console.log(ptrPer);
                      console.log(discount);
                      handleFieldChange(index, "ptrPercentage", ptrPer);
                      handleFieldChange(index, "proposedRate", proposedRate);
                      handleFieldChange(
                        index,
                        "stockistDiscountValue",
                        discount
                      );
                    }
                  }}
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
                    (
                      ((tenderproduct.proposedRate || 0) *
                        TenderProductDiscountPercentage) /
                      100
                    ).toFixed(2) || ""
                  }
                  onBlur={(e) => {
                    const discount = Number(
                      (e.target as HTMLInputElement).value
                    );
                    if (tenderproduct.stockistDiscountValue !== discount) {
                      const proposedRate =
                        (discount * 100) / TenderProductDiscountPercentage;
                      const ptrTemp = tenderproduct.product.ptr;
                      const ptr =
                        ptrTemp !== undefined
                          ? typeof ptrTemp == "number"
                            ? ptrTemp
                            : Number(ptrTemp)
                          : 1;
                      const ptrPer = 100 - (proposedRate / ptr) * 100;
                      console.log(proposedRate);
                      console.log(ptrPer);
                      console.log(discount);
                      handleFieldChange(
                        index,
                        "stockistDiscountValue",
                        discount
                      );
                      handleFieldChange(index, "proposedRate", proposedRate);
                      handleFieldChange(index, "ptrPercentage", ptrPer);
                    }
                  }}
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
                ? (tenderproduct.product.marginPercent || 0).toFixed(2) + "%" ||
                  "-"
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
      tenderData.tenderRevisions.find((x) => x.version == version)
        ?.tenderItems || []
    );
  }, [tenderDataCopy.tenderRevisions, version]);

  // useEffect(() => {
  //   const revision = tenderData.tenderRevisions.find(
  //     (rev) => rev.version === version
  //   );
  //   if (revision) {
  //     setLocalProducts(revision.tenderItems);
  //   }
  // }, [version, tenderData]);
  useEffect(() => {
    handleSave();
  }, [calculatedProducts]);
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

  const handleCheckBoxClick = (
    e: React.MouseEvent<HTMLElement>,
    rowIndex: number,
    isChecked: boolean
  ) => {
    e.stopPropagation();

    const table = (e.target as HTMLElement).closest("table");
    if (table) {
      const checkbox = table?.querySelector(
        `.row-checkbox-${rowIndex}`
      ) as HTMLInputElement;

      // if (checkbox) {
      const row = tenderProductTable?.rows?.find(
        (row) => row.rowIndex === rowIndex
      );
      if (row) {
        const productId = row?.customAttributes?.productId;

        if (isChecked === true) {
          setSelectedRowIndices((prev) => [...prev, rowIndex]);
          if (!productIds.includes(Number(productId))) {
            const products = productIds.length + 1;
            //   const productName =
            // row?.customAttributes?.productName?.toString();
            const productName = String(
              row.customAttributes?.productName ||
                row.customAttributes?.genericName ||
                "-"
            );

            setProductIds((prev) => [...prev, Number(productId)]);
            setSelectedProductName(productName);

            if (products !== 0) {
              displayTableMenu(e, "sales-product", "bottom", "center");
            }
          }
        } else {
          setSelectedRowIndices((prev) =>
            prev.filter((index) => index !== rowIndex)
          );
          const updatedProductIds = productIds.filter(
            (pid) => pid !== Number(productId)
          );

          setProductIds(updatedProductIds);
          setSelectedProduct(Number(productId));
        }
      }
    }
  };

  const handleUnselectRows = (e: React.MouseEvent<HTMLElement>) => {
    const checkboxes = document.querySelectorAll(
      `#${tenderProductTable?.id} .table-body-checkboxes:checked`
    );
    if (checkboxes) {
      checkboxes.forEach((ch) => (ch as HTMLInputElement).click());
    }
    closeContext("sales-product");
    closeContext("delete-menu");
  };

  return (
    <>
      <div className="tender-product-container">
        {tenderProductTable && (
          <TableComponent
            className={tenderProductTable.className}
            id={tenderProductTable.id}
            columns={tenderProductTable.columns}
            rows={tenderProductTable.rows}
            handleCheckboxClick={handleCheckBoxClick}
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

        <FloatingMenu
          selected={productIds.length}
          id={"sales-product"}
          onCloseClick={handleUnselectRows}
        >
          <>
            <DsButton
              id="deleteBtn"
              buttonColor="btnWarning"
              buttonViewStyle="btnContained"
              onClick={(e) => {
                changeImage(e, whitetrashbtn);
                displayContext(e, "delete-menu", "vertical", "center");
              }}
              startIcon={
                <div
                  style={{
                    width: "1.0625em",
                    height: "1.195625em",
                    position: "relative",
                  }}
                >
                  <Image
                    src={trashbtn}
                    alt="icon"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              }
              tooltip="variants : btnWarning, btnContained, btnMedium"
              label="Delete"
            />
          </>
        </FloatingMenu>
        <ContextMenu
          id={"delete-menu"}
          showArrow={false}
          className={styles.productContext}
          content={
            <>
              <div className={styles.contextcontainer}>
                <div className={styles.deleteText}>
                  Delete{" "}
                  <span className={styles.selectedProduct}>
                    {" "}
                    {productIds.length === 1
                      ? selectedProductName
                      : `${productIds.length} products`}
                  </span>
                </div>
              </div>
              <p className={styles.confirmationtext}>
                Are you sure you want to delete this product line item?
              </p>

              <div className={styles.btncontext}>
                <div className={styles.delelbtn}>
                  <DsButton
                    id="cancelBtn"
                    buttonColor="btnDark"
                    buttonViewStyle="btnOutlined"
                    onClick={(e) => {
                      // closeContext("contextMenuId4");
                      closeContext("delete-menu");
                    }}
                    tooltip="variants : btnDark, btnOutlined, btnSmall"
                    label="Cancel"
                  />
                </div>

                <div>
                  <DsButton
                    id="deleteBtn"
                    buttonColor="btnDanger"
                    buttonSize="btnMedium"
                    buttonViewStyle="btnContained"
                    onClick={() => {
                      if (productIds.length > 0) {
                        productIds.forEach((id) => {
                          removeTenderProduct(version, id, undefined);
                        });
                      }
                      if (selectedRowIndices.length > 0) {
                        selectedRowIndices.forEach((rowIndex) => {
                          const row = tenderProductTable?.rows?.find(
                            (r) => r.rowIndex === rowIndex
                          );

                          const genericName = String(
                            row?.customAttributes?.genericName
                          );

                          removeTenderProduct(version, undefined, genericName);
                        });
                      }

                      // console.log(productIds.length);
                      setProductIds([]);
                      setSelectedRowIndices([]); // clear selected IDs
                      closeContext("sales-product");
                      closeContext("delete-menu");
                    }}
                    tooltip="variants : btnDanger, btnContained, btnMedium"
                    label="Delete"
                  />
                </div>
              </div>
            </>
          }
        ></ContextMenu>
      </div>
    </>
  );
};

export default DsProductTable;
