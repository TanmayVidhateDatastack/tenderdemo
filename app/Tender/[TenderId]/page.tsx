"use client";

import { TenderDataProvider } from "@/TenderComponents/AddUpdateTenderComponents/TenderDataContextProvider";
import DsTenderIdPage from "./tenderIdPage";

export default function Home() {
 

  return (
    <>
      <TenderDataProvider>
        <DsTenderIdPage>

        </DsTenderIdPage>
        
      </TenderDataProvider>
    </>
  );
}
