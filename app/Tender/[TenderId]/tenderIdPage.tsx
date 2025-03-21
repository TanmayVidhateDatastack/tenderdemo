import React from "react";
import TabView from "@/Elements/DsComponents/dsTabs/TabView";
import DsApplication from "@/Elements/ERPComponents/DsApplicationComponents/DsApplication";
import DsBasicDetails from "@/TenderComponents/AddUpdateTenderComponents/BasicDetailComponents/DsBasicDetails";
import { useTenderData } from "@/TenderComponents/AddUpdateTenderComponents/TenderDataContextProvider";
import { useTabState } from "@/Redux/hook/tabHook"; // Import the custom hook
import DSTendrFooter from "@/TenderComponents/TenderLogComponents/DsTenderFooter";
import style from "./tenderOrder.module.css";
import Toaster from "@/Elements/DsComponents/DsToaster/DsToaster";
import { closeTimeForTender } from "@/helpers/constant";
import pagestyles from "@/app/page.module.css"
import { closeAllContext } from "@/Elements/DsComponents/dsContextHolder/dsContextHolder";
import DocumentProvider from "@/TenderComponents/AddUpdateTenderComponents/DocumentSelctionComponents/DocumentsContextProvider";
import DsPane from "@/Elements/DsComponents/DsPane/DsPane";
import DsAddTenderDocumentPane from "@/TenderComponents/AddUpdateTenderComponents/DocumentSelctionComponents/DsAddTenderDocumentPane";
import DocumentSelectorArea from "@/TenderComponents/AddUpdateTenderComponents/DocumentSelctionComponents/DsDocumentSelectionArea";
import PaneOpenButton from "@/Elements/DsComponents/DsPane/PaneOpenButton";
import styles from "@/TenderComponents/AddUpdateTenderComponents/DocumentSelctionComponents/document.module.css";

const DsTenderIdPage: React.FC = () => {
  const { setActionStatusValues, actionStatus, saveTender } = useTenderData();
  const [selectedTabId] = useTabState("tenderPage"); // Use the custom hook
  

  //  console.log(tenderData);
  const tabs = [
    { tabId: "0", tabName: "Basic Details" },
    { tabId: "1", tabName: "Products ₹ (V1)" },
    { tabId: "2", tabName: "Documents" },
    // { tabId: "3", tabName: "New" },
  ];

  return (
    <>
      <DsApplication
        selectedTabId={selectedTabId}

        appTitle="Tender"
        tabs={tabs}

      >
        <div className={pagestyles.container}
          onScroll={() => closeAllContext()}>
          <TabView tabId="0" pageName="tenderPage">
            <div className={style.tenderDetails}>

              <DsBasicDetails />
            </div>
          </TabView>
          <TabView tabId="2" pageName="tenderPage"> 
                  <DocumentProvider>   
                  <DsPane id="high" side="right" title="Documents"> 
                      <DsAddTenderDocumentPane/>  
                  </DsPane>  {/* ✅ Now inside DocumentProvider */}
                    <DocumentSelectorArea />  {/* ✅ Now inside DocumentProvider */}
                  </DocumentProvider>   
                 <PaneOpenButton className={styles.pane} id="high" paneId="high" label="Add Documents"/>
                </TabView>
          {/* <TabView tabId="1" pageName="tenderPage" >
          <DsTenderProduct productList={tenderData.products} setProductList={addTenderProduct} />
          new prod
        </TabView> */}
        </div>
      </DsApplication>
      <Toaster
        handleClose={() => {
        }}
        id={"create-order-toaster"}
        type={actionStatus?.notiType}
        message={actionStatus?.notiMsg}
        position={"top"}
        duration={closeTimeForTender}
      />

      <div className={style.footerContainer}>
        <DSTendrFooter setActionStatus={setActionStatusValues}

          saveTender={saveTender}
        ></DSTendrFooter>
      </div>
    </>

  );
};
export default DsTenderIdPage;
