"use client";
import { useEffect, useState } from "react";
import DsAddProduct from "./addProduct";
import DsProductTable from "./DsProductTable";
import DsProductKpis from "./DsProductKpis";
import fetchData from "@/Common/helpers/Method/fetchData";
import { getProductURL } from "@/Common/helpers/constant";
import { TenderProduct } from "../TenderDataContextProvider";
import { version } from "os";

const DsTenderProduct: React.FC<{
  productList: TenderProduct[];
  setProductList: (product: TenderProduct) => void;
  version: number;
}> = ({ productList, setProductList, version }) => {
  // const [fetchdata, setfetchdata] = useState<TenderProduct[] | null>(null);
  // const handleFetch = async () => {
  //     try {
  //         const res = await fetchData({ url:  getProductURL});
  //         // console.log("Fetched Response:", res);

  //         if (res?.code === 200 && Array.isArray(res?.result)) {
  //             setfetchdata(res.result);
  //         } else {
  //             // console.error("Invalid data format or empty result");
  //             setfetchdata([]);
  //         }
  //     } catch (error) {
  //         // console.error("Error fetching data:", error);
  //         setfetchdata([]);
  //     }
  // };

  // useEffect(() => {
  //     handleFetch();
  // }, []);
  return (
    <>
      <div
        style={{
          display: "flex",
          gap: "17.5em",
          alignItems: "flex-start",
          margin: "20px",
          justifyContent:"space-between"
        }}
      >
        <DsAddProduct setProductList={setProductList} version={version}/>
        <DsProductKpis version={version} />
      </div>
      <DsProductTable productList={productList} version={version}  />
    </>
  );
};

export default DsTenderProduct;
