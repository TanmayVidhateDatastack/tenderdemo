"use client";

import { TenderDataProvider } from "@/TenderComponents/AddUpdateTenderComponents/TenderDataContextProvider";
import DsTenderIdPage from "./tenderIdPage";
import DSTendrFooter from "@/TenderComponents/TenderLogComponents/DsTenderFooter";
import style from "./tenderOrder.module.css";
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
