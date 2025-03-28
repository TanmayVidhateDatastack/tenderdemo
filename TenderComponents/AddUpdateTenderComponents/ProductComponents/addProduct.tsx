import ProductSearch from "@/TenderComponents/AddUpdateTenderComponents/ProductComponents/productSearch";
import styles from "@/app/Tender/[TenderId]/tenderOrder.module.css";

import { getProductURL, DsStatus } from "@/Common/helpers/constant";
import fetchData from "@/Common/helpers/Method/fetchData";
import { TenderProduct } from "@/Common/helpers/types";
import DsButton from "../../../Elements/DsComponents/DsButtons/dsButton";
import DsTextField from "../../../Elements/DsComponents/DsInputs/dsTextField";
import { useState } from "react";

 
export interface addProductProps {
  orderStatus?: string;
  setProductList: (product: TenderProduct) => void;
}
 
const DsAddProduct: React.FC<addProductProps> = ({
  orderStatus,
  setProductList,
}) => {
  console.log("Add product ",orderStatus);
  const [selectedProductId, setSelectedProductId] = useState<number>();
 
  const [qtyInputVal, setQtyInputVal] = useState<string>("");
 
  const selectProduct = async () => {
    const quantity = (document.querySelector("#qty") as HTMLInputElement)
      ?.value;
    console.log("selected product id = ", quantity);
 
    if (selectedProductId) {
      const product = await fetchData({
        url:
          getProductURL + selectedProductId + "?requestedQuantity=" + quantity,
      });
      if (product.statusCode === 200) {
        setProductList(product.result);
        console.log("product in add product file :",product.result);
        setSelectedProductId(0);
        setQtyInputVal("");
      }
      console.log(product);
      console.log("product ",product);
    }
  };
 
  return (
    <div className={styles.input}>
      <ProductSearch
        orderStatus={orderStatus}
        setSelectedProductId={(id) => setSelectedProductId(id)}
        setSelectedProductBatchId={(id)=>setSelectedProductId(id)}
      ></ProductSearch>
   
      <DsTextField
        label={"+ Qty"}
        initialValue={qtyInputVal}
        onChange={(e) => setQtyInputVal(e.target.value)}
        id="qty"
        disable={orderStatus === DsStatus.APRV ? true : false}
      ></DsTextField>
    
     
      <DsButton
        buttonSize="btnLarge"
        onClick={selectProduct}
        disable={orderStatus === DsStatus.APRV ? true : false}
      >
        Add
      </DsButton>
    </div>
  );
};

export default DsAddProduct;
 
 