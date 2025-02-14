import React from "react";
import TabView from "@/Elements/DsComponents/dsTabs/TabView";
import DsApplication from "@/Elements/ERPComponents/DsApplicationComponents/DsApplication";
import DsBasicDetails from "@/TenderComponents/AddUpdateTenderComponents/BasicDetailComponents/DsBasicDetails";
import DsTenderProduct from "@/TenderComponents/AddUpdateTenderComponents/ProductComponents/DsTenderProduct";
import { useTenderData } from "@/TenderComponents/AddUpdateTenderComponents/TenderDataContextProvider";
import { useTabState } from "@/Redux/hook/tabHook"; // Import the custom hook

const DsTenderIdPage: React.FC = () => {
  const { tenderData, addTenderProduct } = useTenderData();
  const [selectedTabId, setSelectedTabId] = useTabState("tenderPage"); // Use the custom hook

  const tabs = [
    { tabId: "0", tabName: "Basic Details" },
    { tabId: "1", tabName: "Products ₹ (V1)" },
    // { tabId: "2", tabName: "Documents" },
    // { tabId: "3", tabName: "New" },
  ];

  return (
    <>
      <DsApplication
        selectedTabId={selectedTabId}
        appTitle="Tender"
        tabs={tabs}
        pageName="tenderPage" // Add this prop
      >
        <TabView tabId="0" pageName="tenderPage">
          <DsBasicDetails />
        </TabView>
        <TabView tabId="1" pageName="tenderPage">
          <DsTenderProduct productList={tenderData.products} setProductList={addTenderProduct} />
          new prod
        </TabView>
        {/* <TabView tabId="2" pageName="tenderPage"> */}
        {/* <DsDocumentSelectionArea /> */}
        {/* </TabView> */}
        {/* <TabView tabId="3" pageName="tenderPage"> */}
        {/* Add content for the "New" tab */}
        {/* </TabView> */}
      </DsApplication>
    </>
  );
};

export default DsTenderIdPage;
