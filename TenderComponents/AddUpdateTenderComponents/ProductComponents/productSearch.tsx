import DsInfoDisplay from "@/Elements/ERPComponents/DsInfoDisplay/DsInfoDisplay";
import { DsStatus, searchProductsURL } from "@/helpers/constant";
import { product, datalistOptions } from "@/helpers/types";
import DsSearchComponent from "@/Elements/ERPComponents/DsSearchComponent/searchComponent";
import { Dispatch, SetStateAction, useState } from "react";
export interface ProductSearchProps {
  // initialValue?:string;
  orderStatus?: string;
  setSelectedProductId: Dispatch<SetStateAction<number | undefined>>;
}
 
export function isSearchProduct(value: unknown): value is product {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "name" in value &&
    "packSize" in value &&

    typeof (value as unknown as product).id === "number" &&
    typeof (value as unknown as product).name === "string" &&
    typeof (value as unknown as product).packSize === "string"
   
  );
}
export function areSearchProduct(value: unknown): value is product[] {
  return Array.isArray(value) && value.every(isSearchProduct);
}
const ProductSearch: React.FC<ProductSearchProps> = ({
  orderStatus,
  setSelectedProductId,
}) => {
  const [products, setProducts] = useState<datalistOptions[]>();

  const setOptions = (values: product[]) => {
    if (areSearchProduct(values)) {
      const products: datalistOptions[] = values.map(
        (x: {
          id: number;
          name?: string;
          packSize?: string;
        }) => {
          return {
            id: x.id.toString(),
            value: x.name,
            attributes: {
              "product-id": x.id.toString(),
            },
            secondaryValue: (
              <>
                <DsInfoDisplay detailOf="Pack Size">{x.packSize || 0}</DsInfoDisplay>
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
      const selectedProductId = option.attributes["product-id"];

      if (selectedProductId) {
        setSelectedProductId(parseInt(selectedProductId));
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
 
 