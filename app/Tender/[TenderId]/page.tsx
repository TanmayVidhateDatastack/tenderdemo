"use client";
import { TenderDataProvider } from "@/TenderComponents/AddUpdateTenderComponents/TenderDataContextProvider";
import DsTenderIdPage from "./tenderIdPage";
 export type ParamType = {
  params: {
    TenderId: string | number;
  };
};
export default function Home(param:ParamType) {

const paramOrderId: string | number = param?.params?.TenderId;
const storedStatus = sessionStorage.getItem("tenderStatus")||undefined;
 
  return (
    <> 
      <TenderDataProvider>
        <DsTenderIdPage paramOrderId={paramOrderId} tenderStatus={storedStatus}/>    
      </TenderDataProvider>
    </>
  );
} 