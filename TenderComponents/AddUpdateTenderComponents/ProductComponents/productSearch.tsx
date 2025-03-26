import DsInfoDisplay from "@/Elements/ERPComponents/DsInfoDisplay/DsInfoDisplay";
import { DsStatus, searchProductsURL } from "@/Common/helpers/constant";
import { TenderProduct, datalistOptions } from "@/Common/helpers/types";
import DsSearchComponent from "@/Elements/ERPComponents/DsSearchComponent/searchComponent";
import { Dispatch, SetStateAction, useState } from "react";
export interface ProductSearchProps {
  // initialValue?:string;
  orderStatus?: string;
  setSelectedProductId: Dispatch<SetStateAction<number | undefined>>;
  setSelectedProductBatchId: Dispatch<SetStateAction<number | undefined>>;
}
 
export function isSearchProduct(value: unknown): value is TenderProduct {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "name" in value &&
    "packSize" in value &&
    typeof (value as unknown as TenderProduct).id === "number" &&
    typeof (value as unknown as TenderProduct).name === "string" &&
    typeof (value as unknown as TenderProduct).packSize === "string"
  );
}
export function areSearchProduct(value: unknown): value is TenderProduct[] {
  return Array.isArray(value) && value.every(isSearchProduct);
}
const ProductSearch: React.FC<ProductSearchProps> = ({
  orderStatus,
  setSelectedProductId,
  setSelectedProductBatchId,
}) => {
  const [products, setProducts] = useState<datalistOptions[]>();
 
  const setOptions = (values: unknown) => {
    if (areSearchProduct(values)) {
      const products: datalistOptions[] = values.map(
        (x: { id?: number; name?: string; packSize?: string }) => {
          return {
            id: x.id?.toString() || "0",
            value: x.name,
            attributes: {
              "product-id": x.id?.toString() || "0",
            },
            secondaryValue: (
              <>
                <DsInfoDisplay detailOf="Pack Size">
                  {x.packSize || 0}
                </DsInfoDisplay>
              </>
            ),
          };
        }
      );
      setProducts(products);
    } else {
      console.log("product values are = ", values);
    }
  };
 
  const setSelectedOption = (option: datalistOptions) => {
    {
      const selectedProductId = option.attributes["batch-id"];
      const selectedProductBatchId = option.attributes["product-id"];
 
      if (selectedProductId) {
        setSelectedProductId(parseInt(selectedProductId));
      }
      if (selectedProductBatchId) {
        setSelectedProductBatchId(parseInt(selectedProductBatchId));
      }
    }
  };
  return (
    <DsSearchComponent
      id="productSearch"
      // initialValue={initialValue}
      dataListId="productSearchDatalist"
      label={"Product"}
      placeholder={"Add product & qty & hit enter"}
      options={products ? products : undefined}
      setOptions={(value) => setOptions(value)}
      setSearchUrl={(searchTerm: string) => {
        return searchProductsURL + "name=" + searchTerm;
      }}
      //   setOnSelectUrl={function (selectedOptionId: string): string {
      //     return getCustomerURL + selectedOptionId;
      //   }}
      setSelectedOption={setSelectedOption}
      disable={orderStatus === DsStatus.APRV ? true : false}
    />
  );
};
export default ProductSearch;
 
 