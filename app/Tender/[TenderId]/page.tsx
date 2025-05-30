"use client";
import { TenderDataProvider } from "@/TenderComponents/AddUpdateTenderComponents/TenderDataContextProvider";
import DsTenderIdPage from "./tenderIdPage";
import { closeAllContext } from "@/Elements/DsComponents/dsContextHolder/dsContextHolder";
import Toaster from "@/Elements/DsComponents/DsToaster/DsToaster";
import { useEffect, useState } from "react";
export type ParamType = {
  params: {
    TenderId: string | number;
  };
};
export default function Home(param: ParamType) {
  const paramOrderId: string | number = param?.params?.TenderId;
  
  const [storedStatus,setStat] = useState<string | undefined>(undefined);
  useEffect(()=>{
    setStat(sessionStorage?.getItem("tenderStatus") || undefined)
  },[]);
  useEffect(() => {
    closeAllContext();
  }, []);
  return (
    <>
      <TenderDataProvider>
        <DsTenderIdPage
          paramOrderId={paramOrderId}
          tenderStatus={storedStatus}
        />
        <Toaster
          id="fetchCustomer"
          type="success"
          message="The information has been fetched"
          duration={2000}
          position={"top"}
          handleClose={() => {}}
        />
      </TenderDataProvider>
    </>
  );
}
