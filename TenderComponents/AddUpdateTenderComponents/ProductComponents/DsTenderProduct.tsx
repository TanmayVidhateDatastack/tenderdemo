import { product } from "@/helpers/types";
import { SetStateAction } from "react";
import DsAddProduct from "./addProduct";

const DsTenderProduct: React.FC = ({ productList, setProductlist }) => {
  return (
    <>
      <div>
        <DsAddProduct setProductList={setProductlist}></DsAddProduct>
        <DsProductKpis productData={productList}></DsProductKpis>
      </div>
      <DsProductTable></DsProductTable>
    </>
  );
};
export default DsTenderProduct;
