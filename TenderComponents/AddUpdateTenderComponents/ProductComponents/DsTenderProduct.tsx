import { TenderProduct } from "@/Common/helpers/types";
import { useEffect, useState } from "react";
import DsAddProduct from "./addProduct";
import DsProductTable from "./DsProductTable";
import DsProductKpis from "./DsProductKpis";

import fetchData from "@/Common/helpers/Method/fetchData";
import {  getAllDepot } from "@/Common/helpers/constant";
import style from "@/app/page.module.css";

 
const DsTenderProduct: React.FC<{
  productList: TenderProduct[];
  setProductList: (product: TenderProduct) => void;
}> = ({ productList, setProductList }) => {
    const [fetchdata, setfetchdata] = useState<TenderProduct[] | null>(null);
 
    const handleFetch = async () => {
        try {
            const res = await fetchData({ url: getAllDepot });
            console.log("Fetched Response:", res);
 
            if (res?.code === 200 && Array.isArray(res?.result)) {
                setfetchdata(res.result);
            } else {
                console.error("Invalid data format or empty result");
                setfetchdata([]);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setfetchdata([]);
        }
    };
 
    useEffect(() => {
        handleFetch();
    }, []);
 
  return (
    <>
      <div>
        <DsAddProduct setProductList={setProductList}></DsAddProduct>
    <div className={style.kpi}>
        <DsProductKpis productData={productList||fetchdata}></DsProductKpis>
        </div>
      </div>
      <DsProductTable />
    </>
  );
};
export default DsTenderProduct;
 
 