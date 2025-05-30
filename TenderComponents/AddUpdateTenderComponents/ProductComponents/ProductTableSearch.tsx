"use client";
import DsInfoDisplay from "@/Elements/ERPComponents/DsInfoDisplay/DsInfoDisplay";
import { getProductURL, searchProductsURL } from "@/Common/helpers/constant";
// import { TenderProduct } from "@/Common/helpers/types";
import { useEffect, useState } from "react";
import { areSearchProduct } from "./productSearch";
import DsSearchComponent from "@/Elements/DsComponents/DsSearch/searchComponent";
import { TenderProduct } from "../TenderDataContextProvider";
import { TenderProductWithRowId } from "./DsProductTable";
import { on } from "events";
import { useTableContext } from "@/Elements/DsComponents/NewDsTable/TableProvider";
import fetchData from "@/Common/helpers/Method/fetchData";

interface TableSearchProps {
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
  rowId,
  setLocalProducts,
  // setHasChanges,
  initialValue,
  onBlur,
  autofocus = false,
}) => {
  const { updateCell, data } = useTableContext();

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
          const selected = productOptions.find(
            (p) => p.id.toString() == option.id
          );
          if (selected?.id) {
            const productUrl = getProductURL(
              selected?.id,
              data.find((p) => p.rowId === rowId)?.product?.requestedQuantity ||
                0
            );
            const product = await fetchData({
              url: productUrl,

              // getProductURL + selectedProductId + "?requestedQuantity=" + quantity,
            });
            if (product?.code === 200) {
              setLocalProducts((prev) =>
                prev.map((p) =>
                  p.rowId === rowId
                    ? {
                        ...p,
                        productId: product.result.id,
                        lastQuotedRate: 50,
                        lastPurchaseRate: 50,
                        product: {
                          ...p.product,
                          productName: product.result.name,
                          productPackingSize: product.result.packingSize,
                          mrp: product.result.mrpRate,
                          ptr: product.result.priceToRetailer,
                          directCost: product.result.basicRate,
                        },
                      }
                    : p
                )
              );
              setTimeout(() => {
                updateCell(rowId, "productId", product.result.id);
                updateCell(rowId, "lastQuotedRate", 50);
                updateCell(rowId, "lastPurchaseRate", 50);
                updateCell(rowId, "product.productName", product.result.name);
                updateCell(
                  rowId,
                  "product.productPackingSize",
                  product.result.packingSize
                );
                updateCell(rowId, "product.mrp", product.result.mrpRate);
                updateCell(
                  rowId,
                  "product.ptr",
                  product.result.priceToRetailer
                );
                updateCell(
                  rowId,
                  "product.directCost",
                  product.result.basicRate
                );
              }, 10);
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
      onClick={(e) => e?.stopPropagation()}
      initialValue={val}
      onBlur={onBlur}
    />
  );
};
export default ProductTableSearch;
