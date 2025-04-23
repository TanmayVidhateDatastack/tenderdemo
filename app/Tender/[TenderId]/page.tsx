"use client";
import { TenderDataProvider } from "@/TenderComponents/AddUpdateTenderComponents/TenderDataContextProvider";
import DsTenderIdPage from "./tenderIdPage";
import { closeAllContext } from "@/Elements/DsComponents/dsContextHolder/dsContextHolder";
export type ParamType = {
  params: {
    TenderId: string | number;
  };
};
export default function Home(param: ParamType) {
  const paramOrderId: string | number = param?.params?.TenderId;
  const storedStatus = sessionStorage?.getItem("tenderStatus") || undefined;
  closeAllContext();
  return (
    <>
      <TenderDataProvider>
        <DsTenderIdPage
          paramOrderId={paramOrderId}
          tenderStatus={storedStatus}
        />
      </TenderDataProvider>
    </>
  );
}
