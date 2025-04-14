import DsInfoDisplay from "@/Elements/ERPComponents/DsInfoDisplay/DsInfoDisplay";
import { DsStatus, searchProductsURL } from "@/Common/helpers/constant";
import {  datalistOptions } from "@/Common/helpers/types";
import { Dispatch, SetStateAction, useState } from "react";
import DsSearchComponent from "@/Elements/DsComponents/DsSearch/searchComponent";
import style from "@/TenderComponents/AddUpdateTenderComponents/BasicDetailComponents/tender.module.css";
import IconFactory from "@/Elements/IconComponent";
import { TenderProduct } from "../TenderDataContextProvider";
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
    // "packSize" in value &&
    typeof (value as unknown as TenderProduct).id === "number" &&
    typeof (value as unknown as TenderProduct).product?.name === "string" 
    // typeof (value as unknown as TenderProduct).packSize === "string"
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
  console.log("Product serach",orderStatus);
 
  const setOptions = (values: unknown) => {
    console.log("setOptions called with values:", values);
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
                <DsInfoDisplay detailOf="">
                  {/* {x.packSize || 0} */}
                </DsInfoDisplay>
              </>
            ),
          };
        }
      );

      setProducts(products);
      console.log("Processed products:", products);
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
   console.log("selected product id",selectedProductId);
      }
      if (selectedProductBatchId) {
        setSelectedProductBatchId(parseInt(selectedProductBatchId));
        console.log("selected product batch id",selectedProductBatchId);
      }
    }
  };
  return (
    <div className={style.addproduct}>
    <DsSearchComponent
      id="productSearch"
      dataListId="productSearchDatalist"
      label={"   Add Product & quantity & hit enter"}
      // placeholder={"Add product & qty & hit enter"}
      options={products ? products : undefined}
      setOptions={(value) => setOptions(value)}
      starticon={
        <div style={{ width: "1.125em", height: "1.125em", position: "relative"}}>
          {/* <Image src={searchicon} layout="fill" objectFit="cover" alt="searchicon" /> */}
          <IconFactory name={"search"}/>
        </div>
      }
      setSearchUrl={(searchTerm: string) => {
        console.log("name", searchProductsURL +searchTerm);
        return searchProductsURL +searchTerm;
     
     
      }}
    
 
      setSelectedOption={setSelectedOption}

    
      disable={orderStatus === DsStatus.APRV ? true : false}
    />
    </div>
 
  );
};
export default ProductSearch;
 
 