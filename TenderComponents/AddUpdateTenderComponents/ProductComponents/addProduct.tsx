import ProductSearch from "@/TenderComponents/AddUpdateTenderComponents/ProductComponents/productSearch";
import styles from "@/app/Tender/[TenderId]/tenderOrder.module.css";
import { Dispatch, SetStateAction, useState } from "react";
import { getProductURL, DsStatus } from "../../../helpers/constant";
import fetchData from "../../../helpers/Method/fetchData";
import { TenderProduct } from "../../../helpers/types";
import DsButton from "../../../Elements/DsComponents/DsButtons/dsButton";
import DsTextField from "../../../Elements/DsComponents/DsInputs/dsTextField";

export interface addProductProps {
  orderStatus?: string;
  setProductList: Dispatch<SetStateAction<TenderProduct[]>>;
}

const DsAddProduct: React.FC<addProductProps> = ({
  orderStatus,
  setProductList
}) => {
  const [selectedProductId, setSelectedProductId] = useState<number>();


  const [qtyInputVal, setQtyInputVal] = useState<string>("");

  const selectProduct = async () => {
    const quantity = (document.querySelector("#qty") as HTMLInputElement)
      ?.value;
    console.log("selected product id = ", quantity);

    if (selectedProductId ) {
      const product = await fetchData({
        url:
          getProductURL + selectedProductId + "?requestedQuantity=" + quantity
      });
      if (product.statusCode === 200) {
        setProductList((prev) => [...prev, product.result]);
        setSelectedProductId(0);
        setQtyInputVal("");
      }
      console.log(product);
    }
  };

  return (
    <div className={styles.input}>
      <ProductSearch
        orderStatus={orderStatus}
        setSelectedProductId={(id)=>setSelectedProductId(id)}
      ></ProductSearch>
      {/* <TextField
          options={searchProducts}
          onOptionSelect={handleProductOnSelect}
          id={"ProductSearch"}
          dataListId={"ProductOptions"}
          className={""}
          initialValue={productInputVal}
          placeholder={"Add product"}
          label={"Add product"}
          handleKeyUp={handleProductKeyUp}
          starticon={<Image src={SearchIcon} alt="search"></Image>}
          // disable={orderStatus === dsStatus.APRV ? true :false}
        ></TextField> */}
      <DsTextField
        placeholder={"+ Qty"}
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
