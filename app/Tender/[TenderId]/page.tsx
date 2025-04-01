"use client";
import { TenderDataProvider } from "@/TenderComponents/AddUpdateTenderComponents/TenderDataContextProvider";
import DsTenderIdPage from "./tenderIdPage";

export default function Home(param:any) {

const paramOrderId: string | number = param?.params?.orderId;
 
  return (
    <> 
      <TenderDataProvider>
        <DsTenderIdPage paramOrderId={paramOrderId} />    
      </TenderDataProvider>
    </>
  );
} 