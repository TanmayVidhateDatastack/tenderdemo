"use client";
import { TenderDataProvider } from "@/TenderComponents/AddUpdateTenderComponents/TenderDataContextProvider";
import DsTenderIdPage from "./tenderIdPage";
 export type ParamType = {
  params: {
    orderId: string | number;
  };
};
export default function Home(param:ParamType) {

const paramOrderId: string | number = param?.params?.orderId;
 
  return (
    <> 
      <TenderDataProvider>
        <DsTenderIdPage paramOrderId={paramOrderId} />    
      </TenderDataProvider>
    </>
  );
} 