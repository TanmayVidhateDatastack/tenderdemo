import ProductSearch from "@/TenderComponents/AddUpdateTenderComponents/ProductComponents/productSearch";
import styles from "@/app/Tender/[TenderId]/tenderOrder.module.css";

import { getProductURL, DsStatus } from "@/Common/helpers/constant";
import fetchData from "@/Common/helpers/Method/fetchData";
import DsButton from "../../../Elements/DsComponents/DsButtons/dsButton";
import DsTextField from "../../../Elements/DsComponents/DsInputs/dsTextField";
import { useEffect, useState } from "react";
import { TenderProduct, useTenderData } from "../TenderDataContextProvider";

export interface addProductProps {
  version?: number;
  orderStatus?: string;
  setProductList: (product: TenderProduct) => void;
}

const DsAddProduct: React.FC<addProductProps> = ({
  version,
  orderStatus,
  setProductList,
}) => {
  // console.log("Add product ", orderStatus);
  const [selectedProductId, setSelectedProductId] = useState<number>();
  const [disabled, setDisabled] = useState<boolean>(false);
  const { tenderData } = useTenderData();
  const [qtyInputVal, setQtyInputVal] = useState<string>("");

  const selectProduct = async () => {
    // console.log("Quantity entered:", qtyInputVal);
    const quantity = (document.querySelector("#qty") as HTMLInputElement)
      ?.value;
    // console.log("selected product id = ", quantity);

    if (selectedProductId) {
      const product = await fetchData({
        url: `${getProductURL}${selectedProductId}?requestedQuantity=${qtyInputVal}`,

        // getProductURL + selectedProductId + "?requestedQuantity=" + quantity,
      });
      // console.log(
      //   "url",
      //   `${getProductURL}${selectedProductId}?requestedQuantity=${qtyInputVal}`
      // );
      if (product?.code === 200) {
        // ✅ Change `statusCode` to `code`
        if (!product.result) {
          // console.error(
          //   " product.result is undefined! Full response:",
          //   product
          // );
          return;
        }
        // console.log("Condition matched! Updating product list.");
        if (!setProductList) {
          // console.error(" setProductList is undefined! Check prop passing.");
          return;
        }
        const tenderProduct: TenderProduct = {
          productId: product.result.id,
          requestedQuantity: Number(qtyInputVal),
          product: {
            type:"read-only",
            productName: product.result.name,
            productPackingSize: product.result.cartonSize,
            dataSource: "fetch",
          },
        };
        setProductList(tenderProduct); // Corrected
        setSelectedProductId(0);
        setQtyInputVal("");
      }
      // console.log(product);
      // console.log("product ", product);
    }
  };
  useEffect(() => {
    const latestVersion =
      tenderData.tenderRevisions.reduce((maxObj, currentObj) =>
        currentObj.version > maxObj.version ? currentObj : maxObj
      )?.version || 1;
    console.log(latestVersion, version);
    setDisabled(latestVersion !== version);
  }, [version, tenderData.tenderRevisions]);
  return (
    <div className={styles.input}>
      <>
        <ProductSearch
          orderStatus={orderStatus}
          setSelectedProductId={(id) => setSelectedProductId(id)}
          setSelectedProductBatchId={(id) => setSelectedProductId(id)}
          disabled={disabled}
        ></ProductSearch>

        <DsTextField
          label={"+ Qty"}
          initialValue={qtyInputVal}
          onChange={(e) => setQtyInputVal(e.target.value)}
          id="qty"
          containerClasses={styles.qtyinproductContainer}
          disable={disabled}
          className={styles.qtyinproduct}
        ></DsTextField>

        <DsButton
          buttonSize="btnMedium"
          onClick={selectProduct}
          disable={
            orderStatus === DsStatus.APRV ||
            !selectedProductId ||
            !qtyInputVal ||
            disabled
          }
        >
          Add
        </DsButton>
      </>
    </div>
  );
};

export default DsAddProduct;
