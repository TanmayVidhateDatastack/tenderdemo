import DsInfoDisplay from "@/Elements/ERPComponents/DsInfoDisplay/DsInfoDisplay";
import { searchProductsURL } from "@/Common/helpers/constant";
// import { TenderProduct } from "@/Common/helpers/types";
import { useState } from "react";
import { areSearchProduct } from "./productSearch";
import DsSearchComponent from "@/Elements/DsComponents/DsSearch/searchComponent";
import { TenderProduct } from "../TenderDataContextProvider";

interface TableSearchProps {
  tableRowIndex: number;
  setLocalProducts: React.Dispatch<React.SetStateAction<TenderProduct[]>>;
  setHasChanges: React.Dispatch<React.SetStateAction<boolean>>;
  initialValue: string;
}
const ProductTableSearch: React.FC<TableSearchProps> = ({
  tableRowIndex,
  setLocalProducts,
  setHasChanges,
  initialValue,
}) => {
  const handleProductSelect = (
    index: number,
    id: number,
    name: string,
    packSize: string
  ) => {
    setLocalProducts((prev) =>
      prev.map((p, i) =>
        i === index
          ? {
              ...p,
              productId: id,
              product: {
                ...p.product,
                productName: name,
                productPackingSize: packSize,
              },
            }
          : p
      )
    );
    setHasChanges(true);
  };

  const [productOptions, setProductOptions] = useState<
    { id: number; name: string; packSize: string }[]
  >([]);
  return (
    <DsSearchComponent
      id={`ProductTableSearch${tableRowIndex + 1}`}
      dataListId={`ProductTableSearchOptions${tableRowIndex + 1}`}
      options={productOptions.map((opt) => ({
        value: opt.name,
        id: opt.id.toString(),
        attributes: {},
        secondaryValue: (
          <DsInfoDisplay detailOf="PackSize">{opt.packSize}</DsInfoDisplay>
        ),
      }))}
      setSelectedOption={(option) => {
        if (option) {
          const selected = productOptions.find(
            (p) => p.id.toString() == option.id
          );
          if (selected?.id)
            handleProductSelect(
              tableRowIndex - 1,
              selected.id,
              selected.name,
              selected.packSize
            );
        }
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
      initialValue={initialValue}
    />
  );
};
export default ProductTableSearch;
