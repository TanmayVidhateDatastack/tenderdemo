import { TenderProduct } from "@/helpers/types";
import { SetStateAction } from "react";
import DsAddProduct from "./addProduct";
import DsProductTable from "./DsProductTable";

const DsTenderProduct: React.FC = ({ productList, setProductlist }) => {
  return (
    <>
      <div>
        <DsAddProduct></DsAddProduct>
        {/* <DsProductKpis productData={productList}></DsProductKpis> */}
      </div>
      <DsProductTable/>
    </>
  );
};
export default DsTenderProduct;
