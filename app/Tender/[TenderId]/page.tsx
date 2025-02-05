"use client";

import TabView from "@/Elements/DsComponents/dsTabs/TabView";
import DsApplication from "@/Elements/ERPComponents/DsApplicationComponents/DsApplication";
import DsBasicDetails from "@/TenderComponents/AddUpdateTenderComponents/BasicDetailComponents/DsBasicDetails";
import DsTenderProduct from "@/TenderComponents/AddUpdateTenderComponents/ProductComponents/DsTenderProduct";

export default function Home() {
  return (
    <>
      <DsApplication
        appTitle="Tender"
        tabs={[
          { tabId: "0", tabName: "Basic Details" },
          { tabId: "1", tabName: "Products ₹ (V1)" },
          { tabId: "2", tabName: "Documents" },
          { tabId: "3", tabName: "New" }
        ]}
        selectedTabId="0"
      >
        <TabView tabId={"0"}>
          <DsBasicDetails></DsBasicDetails>
          {/* <DsApplierSupplierDetails></DsApplierSupplierDetails>
        <DsDepositeDocuments></DsDepositeDocuments>
        <DsSupplyDetails></DsSupplyDetails> */}
        </TabView>
        <TabView tabId={"1"}>
          <DsTenderProduct></DsTenderProduct>
        </TabView>
      </DsApplication>
      {/* <DsDocumentSelectionPane></DsDocumentSelectionPane> */}
    </>
  );
}
