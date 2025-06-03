"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { TenderProduct, useTenderData } from "../TenderDataContextProvider";
import DsTextFieldEditor from "@/Elements/DsComponents/DsInputs/dsTextField";
import ProductTableSearch from "./ProductTableSearch";
import DsCustomerLPR from "./CustomerLpr";
import {
  TableProvider,
  useTableContext,
} from "@/Elements/DsComponents/NewDsTable/TableProvider";
// import {
//   TableProvider,
//   useTableContext,
// } from "@/Elements/DsComponents/NewDsTable/TableProvider";
import Table from "@/Elements/DsComponents/NewDsTable/Table";
import { TableColumn } from "@/Elements/DsComponents/NewDsTable/types";
import styles from "@/app/page.module.css";
import FloatingMenu, {
  displayTableMenu,
} from "@/Elements/DsComponents/FloatingMenu/dsFloatingMenu";
import DsButton from "@/Elements/DsComponents/DsButtons/dsButton";
import IconFactory from "@/Elements/IconComponent";
import ContextMenu, {
  closeContext,
  displayContext,
} from "@/Elements/DsComponents/dsContextHolder/dsContextHolder";
import trashbtn from "@/Common/TenderIcons/smallIcons/trashbtn.svg";

import whitetrashbtn from "@/Common/TenderIcons/smallIcons/whitetrash.svg";
import Image from "next/image";
import {
  marginPercentLimit,
  TenderProductDiscountPercentage,
} from "@/Common/helpers/constant";
import { v4 as uuidv4 } from "uuid";
import clsx from "clsx";
import { useAppSelector } from "@/Redux/hook/hook";
import { RootState } from "@/Redux/store/store";

interface DsProductTableProps {
  productList: TenderProduct[];
  version: number;
}
export type TenderProductWithRowId = TenderProduct & { rowId: number | string };
type TenderProductColumnKey =
  | keyof TenderProduct
  | `product.${keyof TenderProduct["product"] & string}`;
function isTenderProductColumnKey(
  col: string,
  product: TenderProduct
): col is TenderProductColumnKey {
  if (col in product) return true;
  if (col.startsWith("product.")) {
    const key = col.slice(8);
    return key in product.product;
  }
  return false;
}
const DsProductTable: React.FC<DsProductTableProps> = ({
  productList,
  version,
}) => {
  const {
    tenderData,
    updateTenderProduct,
    removeTenderProduct,
    tenderDataCopy,
  } = useTenderData();

  const permissions = useAppSelector((state: RootState) => state.permissions);
  const { productTableDisable } = permissions;
  const latestVersion =
    tenderData.tenderRevisions.reduce((maxObj, currentObj) =>
      currentObj.version > maxObj.version ? currentObj : maxObj
    )?.version || 1;
  // const isTableEditable=version===latestVersion;
  const isTableEditable = productTableDisable
    ? true
    : version === latestVersion;
  // const [tenderProductTable, setTenderProductTable] = useState<
  //   tableData | undefined
  // >();

  const [localProducts, setLocalProducts] = useState<TenderProductWithRowId[]>(
    []
  );
  const [productIds, setProductIds] = useState<number[]>([]);
  const [selectedProductName, setSelectedProductName] = useState<
    string | undefined
  >();
  const [selectedRowIndices, setSelectedRowIndices] = useState<number[]>([]);

  // Calculate derived fields for each row
  const calculatedProducts = useMemo(() => {
    return localProducts.map((tenderproduct) => {
      const calculated: TenderProductWithRowId = { ...tenderproduct };
      if (tenderproduct.product.directCost) {
        const ptrTemp = tenderproduct.product.ptr;
        const ptr =
          ptrTemp !== undefined
            ? typeof ptrTemp == "number"
              ? parseFloat(Number(ptrTemp).toFixed(2))
              : parseFloat(Number(ptrTemp).toFixed(2))
            : 1;

        calculated.ptrPercentage = parseFloat(
          (
            100 -
            parseFloat(
              (((tenderproduct.proposedRate || 0) / ptr) * 100).toFixed(2)
            )
          ).toFixed(2)
        );
        const discount = tenderproduct.stockistDiscountValue
          ? parseFloat(Number(tenderproduct.stockistDiscountValue).toFixed(2))
          : parseFloat(
              (
                Number(
                  Number(tenderproduct.proposedRate || 0) *
                    Number(TenderProductDiscountPercentage)
                ) / 100
              ).toFixed(2)
            );

        calculated.product.totalCost = parseFloat(
          (Number(tenderproduct.product.directCost) + Number(discount)).toFixed(
            2
          )
        );
        calculated.product.marginValue = parseFloat(
          (
            Number(tenderproduct.proposedRate) -
            Number(calculated.product.totalCost)
          ).toFixed(2)
        );
        calculated.product.marginPercent =
          tenderproduct.proposedRate !== 0 &&
          tenderproduct.proposedRate !== undefined &&
          tenderproduct.proposedRate !== null
            ? parseFloat(
                Number(
                  Number(
                    Number(calculated.product.marginValue) /
                      Number(tenderproduct.proposedRate)
                  ) * 100 || 0
                ).toFixed(2)
              )
            : 0;
      }
      if (calculated.product)
        calculated.product.netValue = parseFloat(
          (
            Number(calculated.proposedRate || 0) *
            Number(calculated.requestedQuantity || 0)
          ).toFixed(2)
        );
      if (tenderproduct.product.dataSource === "csv") {
        calculated.productId = tenderproduct.productId;
        calculated.product.productName = tenderproduct.product.productName;
        calculated.product.productPackingSize =
          tenderproduct.product.productPackingSize;
      }
      return calculated;
    });
  }, [localProducts]);
  // useEffect(() => {
  //   console.log(calculatedProducts);
  // }, [calculatedProducts]);
  // Handle cell update from inline editing
  const handleUpdateCell = useCallback(
    (rowId, changesOrColumnId, value?) => {
      setLocalProducts((prev) => {
        const updatedProducts = prev.map((row) => {
          if (row.rowId !== rowId) return row;
          if (typeof changesOrColumnId === "object") {
            // Batch update (object of changes)
            return { ...row, ...changesOrColumnId };
          } else {
            // Single field update
            return { ...row, [changesOrColumnId]: value };
          }
        });
        const rowIndex = updatedProducts.findIndex(
          (row) => row.rowId === rowId
        );
        const product = updatedProducts[rowIndex];

        if (product) {
          if (typeof changesOrColumnId === "object") {
            Object.entries(changesOrColumnId).forEach(([col, val]) => {
              return updateTenderProduct(
                version,
                col as TenderProductColumnKey,
                val as string | number,
                product.id,
                product.productId,
                product.requestedGenericName
              );
            });
          } else {
            updateTenderProduct(
              version,
              changesOrColumnId,
              value,
              product.id,
              product.productId,
              product.requestedGenericName
            );
          }
        }
        return updatedProducts;
      });
    },
    [tenderData]
  );

  // const handleSelectionChange = (
  //   ids: Set<string | number>,
  //   rows: TenderProduct[]
  // ) => {
  //   setSelectedIds(new Set(ids));
  //   setSelectedRows(rows);
  // };

  // Table columns definition
  const columns: TableColumn<TenderProduct>[] = useMemo(
    () => [
      {
        id: "requestedGenericName",
        header: "Generic Name",
        accessor: "requestedGenericName",
        editable: isTableEditable,
        editorComponent: DsTextFieldEditor,
        editorProps: { autofocus: true },
        className: styles.cellgenericname,
        // cellStyle: { minWidth: 150 },
        // sortable: true,
      },
      {
        id: "requestedQuantity",
        header: "Quantity",
        accessor: "requestedQuantity",
        editable: isTableEditable,
        editorComponent: DsTextFieldEditor,
        editorProps: { inputType: "positiveInteger", autofocus: true },
        align: "right",
        className: styles.cellquantity,
        // cellStyle: { minWidth: 100 },
        // sortable: true,
      },
      {
        id: "requestedPackingSize",
        header: "Packing Size",
        accessor: "requestedPackingSize",
        editable: isTableEditable,
        editorComponent: DsTextFieldEditor,
        className: styles.cellpackingsize,
        editorProps: { autofocus: true },
        // cellStyle: { minWidth: 100 },
      },
      {
        id: "productName",
        header: "Product Name",
        accessor: (row) => row.product?.productName,
        editable: isTableEditable,
        editor: (row, onCommit) => (
          <ProductTableSearch
            rowId={row.rowId}
            setLocalProducts={setLocalProducts}
            initialValue={row.product?.productName || ""}
            onBlur={(e) => {
              if (onCommit) onCommit();
            }}
            version={version}
            autofocus
          />
        ),
        className: styles.cellproductname,
        editorProps: {},
        // cellStyle: { minWidth: 200 },
      },
      {
        id: "productPackingSize",
        header: "Pack Size",
        accessor: (row) => row.product?.productPackingSize,
        editable: false,
        align: "right",
        className: styles.cellproductpakingsize,
        // cellStyle: { minWidth: 100 },
      },
      {
        id: "mrp",
        header: "MRP",
        accessor: (row) => row.product?.mrp,
        editable: false,
        align: "right",
        className: styles.cellmrp,
        // cellStyle: { minWidth: 100 },
      },
      {
        id: "ptr",
        header: "PTR",
        accessor: (row) => row.product?.ptr,
        editable: false,
        align: "right",
        className: styles.cellptr,
        // cellStyle: { minWidth: 100 },
      },
      {
        id: "directCost",
        header: "Direct Cost",
        accessor: (row) => row.product?.directCost,
        editable: false,
        align: "right",
        className: styles.celldirectcost,
        // cellStyle: { minWidth: 100 },
      },
      {
        id: "lastQuotedRate",
        header: "LQR",
        accessor: "lastQuotedRate",
        editable: isTableEditable,
        editorComponent: DsTextFieldEditor,
        editorProps: { inputType: "positive", autofocus: true },
        align: "right",
        className: styles.celllqr,
        // cellStyle: { minWidth: 100 },
      },
      {
        id: "lastPurchaseRate",
        header: "Customer LPR",
        accessor: "lastPurchaseRate",
        editable: isTableEditable,
        cellRenderer: (value, row, rowIndex) => (
          <DsCustomerLPR
            index={rowIndex + 1}
            lprValue={row.lastPurchaseRate}
            lprTo={{
              id: row.competitorId || 0,
              name: row.product.competitorName || "",
            }}
            disable={latestVersion != version}
            onValueChange={(value) => {
              if (!value) value = "0";
              if (handleUpdateCell)
                handleUpdateCell(row.rowId, "lastPurchaseRate", Number(value));
              // if (onChange) onChange(value);
            }}
            onCompanyChange={(company) => {
              if (handleUpdateCell) {
                handleUpdateCell(row.rowId, "competitorId", company.id);
                handleUpdateCell(
                  row.rowId,
                  "product.competitorName",
                  company.name
                );
                // if (onCommit) onCommit();
              }
            }}
            // onBlur={(e) => {
            //   const value = (e?.target as HTMLInputElement).value;
            //   // setTimeout(() => {
            //     if (cellEdit)
            //       cellEdit(row.rowId, "lastPurchaseRate", Number(value));

            //   //   if (onCommit) onCommit();
            //   // }, 100);
            //   if (onCommit) onCommit();
            // }}
            // onCommit={() => {
            // if (onCommit) onCommit();
            // }}
            // onBlur={(e) => {
            autofocus={true}
            // disable={latestVersion != version}
          />
        ),
        className: styles.celllpr,
        // cellStyle: { minWidth: 120 },
      },
      {
        id: "proposedRate",
        header: "Proposed Rate",
        accessor: "proposedRate",
        editable: isTableEditable,
        editor: (row, onCommit, onChange, cellEdit) => (
          <DsTextFieldEditor
            autofocus
            initialValue={row.proposedRate || ""}
            onChange={(e) => {
              if (onChange) onChange(e.target.value);
            }}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                (e.target as HTMLElement).blur();
              }
            }}
            // onChange={(e) => {
            onBlur={(e) => {
              if (onChange) onChange(e.target.value);

              const proposedRate = parseFloat(
                Number((e.target as HTMLInputElement).value).toFixed(2)
              );
              // if (row.proposedRate !== proposedRate) {
              const ptrTemp = row.product.ptr;
              const ptr =
                ptrTemp !== undefined
                  ? typeof ptrTemp == "number"
                    ? parseFloat(Number(ptrTemp).toFixed(2))
                    : parseFloat(Number(ptrTemp).toFixed(2))
                  : 1;
              const ptrPer = parseFloat(
                (100 - Number(((proposedRate / ptr) * 100).toFixed(2))).toFixed(
                  2
                )
              );
              const discount = parseFloat(
                (
                  (proposedRate * TenderProductDiscountPercentage) /
                  100
                ).toFixed(2)
              );
              // console.log(proposedRate);
              // console.log(ptrPer);
              // console.log(discount);
              if (cellEdit) {
                cellEdit(row.rowId, {
                  proposedRate: proposedRate,
                  ptrPercentage: ptrPer,
                  stockistDiscountValue: discount,
                });
              }
              // }
              // }}
              if (onCommit) onCommit();
            }}
            inputType="number"

            // maximumNumber={1000000}
          />
        ),
        align: "right",
        className: styles.cellproposedrate,
        // cellStyle: { minWidth: 120 },
      },
      {
        id: "ptrPercentage",
        header: "PTR %",
        accessor: "ptrPercentage",
        editable: isTableEditable,
        editor: (row, onCommit, onChange, cellEdit) => (
          <DsTextFieldEditor
            autofocus
            inputType="number"
            maximumNumber={100.0}
            initialValue={
              Number(row.ptrPercentage?.toFixed(2)).toString() || ""
            }
            onChange={(e) => {
              if (onChange) onChange(e.target.value);
            }}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                (e.target as HTMLElement).blur();
              }
            }}
            onClick={(e) => e.stopPropagation()}
            // onChange={(e) => {
            onBlur={(e) => {
              if (onChange) onChange(e.target.value);

              const ptrPer = parseFloat(
                Number((e.target as HTMLInputElement).value).toFixed(2)
              );
              // if (row.ptrPercentage !== ptrPer) {
              const ptrTemp = row.product.ptr;
              const ptr =
                ptrTemp !== undefined
                  ? typeof ptrTemp == "number"
                    ? parseFloat(Number(ptrTemp).toFixed(2))
                    : parseFloat(Number(ptrTemp).toFixed(2))
                  : 1;

              const proposedRate = parseFloat(
                (((100 - ptrPer) * ptr) / 100).toFixed(2)
              );

              const discount = parseFloat(
                (
                  (proposedRate * TenderProductDiscountPercentage) /
                  100
                ).toFixed(2)
              );
              // console.log(proposedRate);
              // console.log(ptrPer);
              // console.log(discount);
              // if (cellEdit) {
              //   cellEdit(
              //     row.rowId,
              //     "ptrPercentage",
              //     parseFloat(ptrPer.toFixed(2))
              //   );
              //   cellEdit(row.rowId, "proposedRate", proposedRate);
              //   cellEdit(row.rowId, "stockistDiscountValue", discount);
              // }
              if (cellEdit) {
                cellEdit(row.rowId, {
                  proposedRate: proposedRate,
                  ptrPercentage: ptrPer,
                  stockistDiscountValue: discount,
                });
              }
              // handleUpdateCell(row.rowId, {
              //   proposedRate,
              //   ptrPercentage: ptrPer,
              //   stockistDiscountValue: discount,
              // });
              // }
              // }}
              // (e.target as HTMLInputElement).value = ptrPer.toFixed(2);
              if (onCommit) onCommit();
            }}
            className={`${
              (row.ptrPercentage || 0) <= 0 ? styles.warningAlert : ""
            }`}
          />
        ),
        cellRenderer: (cellValue, row, rowIndex) => (
          <span className={clsx((cellValue || 0) <= 0 && styles.warningAlert)}>
            {cellValue}
          </span>
        ),
        align: "right",
        className: styles.cellptrpercentage,
        // cellStyle: { minWidth: 100 },
      },
      {
        id: "stockistDiscountValue",
        header: "Discount",
        accessor: "stockistDiscountValue",
        editable: isTableEditable,
        editor: (row, onCommit, onChange, cellEdit) => (
          <DsTextFieldEditor
            autofocus
            inputType="number"
            initialValue={
              (
                ((row.proposedRate || 0) * TenderProductDiscountPercentage) /
                100
              ).toFixed(2) || ""
            }
            onChange={(e) => {
              if (onChange) onChange(e.target.value);
            }}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                (e.target as HTMLElement).blur();
              }
            }}
            onClick={(e) => e.stopPropagation()}
            onBlur={(e) => {
              if (onChange) onChange(e.target.value);
              // onChange={(e) => {
              const discount = parseFloat(
                Number((e.target as HTMLInputElement).value).toFixed(2)
              );
              // if (row.stockistDiscountValue !== discount) {
              const proposedRate = parseFloat(
                ((discount * 100) / TenderProductDiscountPercentage).toFixed(2)
              );
              const ptrTemp = row.product.ptr;
              const ptr =
                ptrTemp !== undefined
                  ? typeof ptrTemp == "number"
                    ? parseFloat(Number(ptrTemp).toFixed(2))
                    : parseFloat(Number(ptrTemp).toFixed(2))
                  : 1;

              const ptrPer = parseFloat(
                (100 - Number(((proposedRate / ptr) * 100).toFixed(2))).toFixed(
                  2
                )
              );
              // console.log(proposedRate);
              // console.log(ptrPer);
              // console.log(discount);
              // if (cellEdit) {
              //   cellEdit(
              //     row.rowId,
              //     "stockistDiscountValue",
              //     parseFloat(discount.toFixed(2))
              //   );
              //   cellEdit(row.rowId, "proposedRate", proposedRate);
              //   cellEdit(row.rowId, "ptrPercentage", ptrPer);
              // }
              if (cellEdit) {
                cellEdit(row.rowId, {
                  proposedRate: proposedRate,
                  ptrPercentage: ptrPer,
                  stockistDiscountValue: discount,
                });
              }
              // handleUpdateCell(row.rowId, {
              //   proposedRate,
              //   ptrPercentage: ptrPer,
              //   stockistDiscountValue: discount,
              // });
              // }
              // }}
              // (e.target as HTMLInputElement).value = discount.toFixed(2);
              if (onCommit) onCommit();
            }}
          />
        ),
        className: styles.celldiscount,
        align: "right",

        // cellStyle: { minWidth: 100 },
      },
      {
        id: "totalCost",
        header: "Total Cost",
        accessor: (row) => row.product?.totalCost,
        editable: false,
        className: styles.celltotalcost,
        align: "right",

        // cellStyle: { minWidth: 100 },
      },
      {
        id: "marginValue",
        header: "Margin",
        accessor: (row) => row.product?.marginValue,
        editable: false,
        className: styles.cellmargin,
        align: "right",
        // cellStyle: { minWidth: 100 },
      },
      {
        id: "marginPercent",
        header: "Margin %",
        accessor: (row) => row.product?.marginPercent,
        editable: false,
        cellRenderer: (cellValue, row, rowIndex) => (
          <span
            className={clsx(
              (cellValue || 0) <= marginPercentLimit && styles.warningAlert
            )}
          >
            {(cellValue || 0).toFixed(2)}%{/* {cellValue} */}
          </span>
        ),
        align: "right",
        // cellRenderer: (value) => `${(value || 0).toFixed(2)}%`,
        className: styles.cellmarginper,
        // cellStyle: { minWidth: 100 },
      },
      {
        id: "netValue",
        header: "Net Value",
        accessor: (row) => row.product?.netValue,
        editable: false,
        align: "right",
        className: styles.cellnetvalue,
        // cellStyle: { minWidth: 100 },
      },
    ],
    []
  );

  // Load data on mount or when dependencies change
  useEffect(() => {
    console.log(tenderData);
    setLocalProducts(
      (
        tenderData.tenderRevisions.find((x) => x.version == version)
          ?.tenderItems || []
      ).map((row) => ({
        ...row,
        rowId: uuidv4(),
      }))
    );
  }, [tenderData, productList, version]);

  // Handle row selection for floating menu, context menu, etc.
  // (You can use the selectionState from TableProvider context for this in the new system)

  // Render
  // if (calculatedProducts.length === 0) {
  //   return <div className={styles.noDataFound}>Loading products...</div>;
  // }

  return (
    <div className="tender-product-container" style={{ overflowY: "hidden" }}>
      <TableProvider
        data={calculatedProducts}
        columns={columns}
        onCellEdit={handleUpdateCell}
        isEditable={isTableEditable}
        // onSelectionChange={handleSelectionChange}

        // Optionally: onRowClick, onRowDoubleClick, etc.
      >
        <Table />
        <SelectionComponent version={version} />
      </TableProvider>

      {/* {calculatedProducts.length === 0 && (
        <div className={styles.noDataFound}>
          <div className={styles.noData}>
            <div style={{ width: "2em", height: "3em" }}>
              <IconFactory name={"emptyHourGlass"} />
            </div>
            <div>Products Not Available</div>
          </div>
          <div className={styles.noDataBorders}></div>
        </div>
      )} */}

      {/* FloatingMenu and ContextMenu logic can remain as before, using selection from context */}
    </div>
  );
};
const SelectionComponent: React.FC<{ version: number }> = ({ version }) => {
  const { removeTenderProduct } = useTenderData();
  const { selectionState, clearSelection, data } = useTableContext();

  // Always derive selectedIds and selectedRows from context
  const selectedIds = Array.from(selectionState.selectedRowIds);
  const selectedRows = data.filter((row) =>
    selectedIds.includes(row.rowId || 0)
  );

  useEffect(() => {
    if (selectedIds.length > 0) {
      displayTableMenu(
        new MouseEvent("click"),
        "sales-product",
        "bottom",
        "center"
      );
    } else {
      closeContext("sales-product");
      closeContext("delete-menu");
    }
  }, [selectedIds.length]);

  return (
    <>
      <FloatingMenu
        selected={selectedIds.length}
        id={"sales-product"}
        onCloseClick={() => {
          clearSelection();
          closeContext("sales-product");
          closeContext("delete-menu");
        }}
      >
        <DsButton
          id="deleteBtn"
          buttonColor="btnWarning"
          buttonViewStyle="btnContained"
          onClick={(e) => {
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
                  {selectedRows.length === 1
                    ? selectedRows[0]?.product?.productName ||
                      selectedRows[0]?.requestedGenericName
                    : `${selectedRows.length} products`}
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
                  onClick={() => closeContext("delete-menu")}
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
                    if (selectedIds.length > 0) {
                      selectedIds.forEach((id) => {
                        const row = selectedRows.find((r) => r.rowId === id);
                        removeTenderProduct(
                          version,
                          row?.productId,
                          row?.requestedGenericName
                        );
                      });
                      clearSelection();
                    }
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
      />
    </>
  );
};

export default DsProductTable;
