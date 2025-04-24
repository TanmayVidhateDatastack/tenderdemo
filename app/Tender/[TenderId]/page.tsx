"use client";
import { TenderDataProvider } from "@/TenderComponents/AddUpdateTenderComponents/TenderDataContextProvider";
import DsTenderIdPage from "./tenderIdPage";
import Toaster from "@/Elements/DsComponents/DsToaster/DsToaster";
 export type ParamType = {
  params: {
    TenderId: string | number;
  };
};
export default function Home(param:ParamType) {

const paramOrderId: string | number = param?.params?.TenderId;
const storedStatus = sessionStorage?.getItem("tenderStatus")||undefined;
 
  return (
    <> 
      <TenderDataProvider>
        <DsTenderIdPage paramOrderId={paramOrderId} tenderStatus={storedStatus}/>    
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