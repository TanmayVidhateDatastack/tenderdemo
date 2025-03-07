import React from "react";
import TabView from "@/Elements/DsComponents/dsTabs/TabView";
import DsApplication from "@/Elements/ERPComponents/DsApplicationComponents/DsApplication";
import DsBasicDetails from "@/TenderComponents/AddUpdateTenderComponents/BasicDetailComponents/DsBasicDetails";
import { useTenderData } from "@/TenderComponents/AddUpdateTenderComponents/TenderDataContextProvider";
import { useTabState } from "@/Redux/hook/tabHook"; // Import the custom hook
import { closeAllContext } from "@/Elements/DsComponents/dsContextHolder/dsContextHolder";
import pagestyles from "@/app/page.module.css";
import DsDocumentSelection from "@/TenderComponents/AddUpdateTenderComponents/DocumentSelctionComponents/DsDocumentSelection";
import DsPane from "@/Elements/DsComponents/DsPane/DsPane";
import DsAddTenderDocumentPane from "@/TenderComponents/AddUpdateTenderComponents/DocumentSelctionComponents/DsAddTenderDocumentPane";

const DsTenderIdPage: React.FC = () => {
  const { tenderData, addTenderProduct } = useTenderData();
  const [selectedTabId, setSelectedTabId] = useTabState("tenderPage"); // Use the custom hook
 
  const tabs = [
    { tabId: "0", tabName: "Basic Details" },
    { tabId: "1", tabName: "Products ₹ (V1)" },
    { tabId: "2", tabName: "Documents" },
  ];    
  return (
    <>
      <DsApplication
        selectedTabId={selectedTabId}
        appTitle="Tender"  
        tabs={tabs}
        pageName="tenderPage" // Add this prop
      >
       <div className={pagestyles.container}
          onScroll={() => closeAllContext()} >
              <TabView tabId="0" pageName="tenderPage"> 
                <DsBasicDetails />
              </TabView>
              <TabView tabId="2" pageName="tenderPage">  
                <DsDocumentSelection/> 
              </TabView>
             
              <DsPane id="h" side="right" title="Documents">
                <DsAddTenderDocumentPane/>
              </DsPane> 
         </div>
       </DsApplication>
    </>
  );
};
export default DsTenderIdPage;
