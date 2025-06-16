"use client";
import DsInfoDisplay from "@/Elements/ERPComponents/DsInfoDisplay/DsInfoDisplay";
import {
  getProductURL,
  getTenderProductHistory,
  searchProductsURL,
} from "@/Common/helpers/constant";
// import { TenderProduct } from "@/Common/helpers/types";
import { useEffect, useState } from "react";
import { areSearchProduct } from "./productSearch";
import DsSearchComponent from "@/Elements/DsComponents/DsSearch/searchComponent";
import { TenderProduct, useTenderData } from "../TenderDataContextProvider";
import { TenderProductWithRowId } from "./DsProductTable";
import { on } from "events";
import { useTableContext } from "@/Elements/DsComponents/NewDsTable/TableProvider";
import fetchData from "@/Common/helpers/Method/fetchData";
import { error } from "console";

interface TableSearchProps {
  version?: number;
  rowId: number;
  setLocalProducts: React.Dispatch<
    React.SetStateAction<TenderProductWithRowId[]>
  >;
  // setHasChanges: React.Dispatch<React.SetStateAction<{index:number, changed:boolean}|undefined>>;
  initialValue: string;
  onBlur?: (e?: React.FocusEvent<HTMLElement>) => void;
  autofocus?: boolean;
}
const ProductTableSearch: React.FC<TableSearchProps> = ({
  version = 1,
  rowId,
  setLocalProducts,
  // setHasChanges,
  initialValue,
  onBlur,
  autofocus = false,
}) => {
  const { tenderData } = useTenderData();
  const { updateCell, data } = useTableContext();
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [productOptions, setProductOptions] = useState<
    { id: number; name: string; packSize: string }[]
  >([]);
  const [val, setVal] = useState(initialValue);
  useEffect(() => {
    setVal(initialValue);
  }, [initialValue]);
  return (
    <DsSearchComponent
      autofocus={autofocus}
      id={`ProductTableSearch${rowId + 1}`}
      dataListId={`ProductTableSearchOptions${rowId + 1}`}
      options={productOptions.map((opt) => ({
        value: opt.name,
        id: opt.id.toString(),
        attributes: {},
        secondaryValue: (
          <DsInfoDisplay detailOf="PackSize">{opt.packSize}</DsInfoDisplay>
        ),
      }))}
      setSelectedOption={async (option) => {
        if (option) {
          console.log(tenderData.tenderRevisions);
          if (initialValue != option.value) {
            if (
              tenderData.tenderRevisions
                .find((t) => t.version === version)
                ?.tenderItems.findIndex(
                  (tp) => tp.productId == Number(option.id)
                ) !== -1
            ) {
              setErrorMessage("Duplicate.");
              setIsError(true);
              return;
            }
          }
          const selected = productOptions.find(
            (p) => p.id.toString() == option.id
          );
          if (selected?.id) {
            const productUrl = getProductURL(
              selected?.id,
              data.find((p) => p.rowId === rowId)?.product?.requestedQuantity ||
                0
            );
            const productHistoryUrl = getTenderProductHistory(
              tenderData.id,
              selected.id
            );
            const product = await fetchData({
              url: productUrl,

              // getProductURL + selectedProductId + "?requestedQuantity=" + quantity,
            });
            if (product?.code === 200) {
              const productHistory = await fetchData({
                url: productHistoryUrl,
              });
              // setLocalProducts((prev) =>
              //   prev.map((p) =>
              //     p.rowId === rowId
              //       ? {
              //           ...p,
              //           productId: product.result.id,
              //           lastQuotedRate: 50,
              //           lastPurchaseRate: 50,
              //           product: {
              //             ...p.product,
              //             productName: product.result.name,
              //             productPackingSize: product.result.packingSize,
              //             mrp: product.result.mrpRate,
              //             ptr: product.result.priceToRetailer,
              //             directCost: product.result.basicRate,
              //           },
              //         }
              //       : p
              //   )
              // );
              // setTimeout(() => {
              if (productHistory.code !== 500)
                updateCell(rowId, {
                  productId: product.result.id,
                  lastQuotedRate: productHistory.result.lastQuotedRate,
                  lastPurchaseRate: productHistory.result.lastPurchaseRate,
                  proposedRate: productHistory.result.lastPurchaseRate,
                  "product.productName": product.result.name,
                  "product.productPackingSize": product.result.packingSize,
                  "product.mrp": product.result.mrpRate,
                  "product.ptr": product.result.priceToRetailer,
                  "product.directCost": product.result.basicRate,
                });
              // updateCell(rowId, "productId", product.result.id);
              // updateCell(rowId, "lastQuotedRate", 50);
              // updateCell(rowId, "lastPurchaseRate", 50);
              // updateCell(rowId, "product.productName", product.result.name);
              // updateCell(
              //   rowId,
              //   "product.productPackingSize",
              //   product.result.packingSize
              // );
              // updateCell(rowId, "product.mrp", product.result.mrpRate);
              // updateCell(
              //   rowId,
              //   "product.ptr",
              //   product.result.priceToRetailer
              // );
              // updateCell(
              //   rowId,
              //   "product.directCost",
              //   product.result.basicRate
              // );
              // }, 10);
            }
          }
        }

        onBlur?.();
      }}
      setOptions={function (values: unknown[]): void {
        if (areSearchProduct(values)) {
          const products = values.map((x) => {
            const id = x.id || 0;
            return { id: id, name: x.name || "", packSize: x.cartonSize || "" };
          });
          setProductOptions(products);
        }
      }}
      setSearchUrl={function (searchTerm: string): string {
        return searchProductsURL + searchTerm;
      }}
      onChange={(e) => {
        if (isError) {
          setIsError(false);
          setErrorMessage("");
        }
      }}
      onClick={(e) => e?.stopPropagation()}
      initialValue={val}
      onBlur={onBlur}
      isError={isError}
      errorMessage={errorMessage}
    />
  );
};
export default ProductTableSearch;
