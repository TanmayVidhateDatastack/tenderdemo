import DsInfoDisplay from "@/Elements/ERPComponents/DsInfoDisplay/DsInfoDisplay";
import { DsStatus, searchProductsURL } from "@/helpers/constant";
import { product, datalistOptions } from "@/helpers/types";
import DsSearchComponent from "../../../Elements/ERPComponents/DsSearchComponent/searchComponent";
import { Dispatch, SetStateAction, useState } from "react";
export interface ProductSearchProps {
  // initialValue?:string;
  orderStatus?: string;
  setSelectedProductId: Dispatch<SetStateAction<number | undefined>>;
  setSelectedProductBatchId: Dispatch<SetStateAction<number | undefined>>;
}
 
export function isSearchProduct(value: unknown): value is product {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "name" in value &&
    "code" in value &&
    "batchId" in value &&
    "batchNumber" in value &&
    "quantity" in value &&
    typeof (value as unknown as product).id === "number" &&
    typeof (value as unknown as product).name === "string" &&
    typeof (value as unknown as product).code === "string" &&
    typeof (value as unknown as product).batchId === "number" &&
    typeof (value as unknown as product).batchNumber === "string" &&
    typeof (value as unknown as product).quantity === "number"
  );
}
export function areSearchProduct(value: unknown): value is product[] {
  return Array.isArray(value) && value.every(isSearchProduct);
}
const ProductSearch: React.FC<ProductSearchProps> = ({
  orderStatus,
  setSelectedProductId,
  setSelectedProductBatchId,
}) => {
  const [products, setProducts] = useState<datalistOptions[]>();

  const setOptions = (values: product[]) => {
    if (areSearchProduct(values)) {
      const products: datalistOptions[] = values.map(
        (x: {
          batchId?: number;
          batchNumber?: string;
          id: number;
          code?: string;
          name?: string;
          quantity?: number;
        }) => {
          return {
            id: x.id.toString(),
            value: x.code + " - " + x.name,
            attributes: {
              "batch-id": x.batchId?.toString() || "",
              "product-id": x.id.toString(),
            },
            secondaryValue: (
              <>
                <DsInfoDisplay detailOf="Batch No">
                  {x.batchNumber}
                </DsInfoDisplay>
                <DsInfoDisplay detailOf="Qty">{x.quantity || 0}</DsInfoDisplay>
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
      setOptions={setOptions}
      setSearchUrl={ (searchTerm: string)=> {
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
 
 