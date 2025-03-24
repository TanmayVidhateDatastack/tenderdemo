import React from "react";
import TabView from "@/Elements/DsComponents/dsTabs/TabView";
import DsApplication from "@/Elements/ERPComponents/DsApplicationComponents/DsApplication";
import DsBasicDetails from "@/TenderComponents/AddUpdateTenderComponents/BasicDetailComponents/DsBasicDetails";
import { useTenderData } from "@/TenderComponents/AddUpdateTenderComponents/TenderDataContextProvider";
import { useTabState } from "@/Redux/hook/tabHook"; // Import the custom hook
import DSTendrFooter from "@/TenderComponents/TenderLogComponents/DsTenderFooter";
import style from "./tenderOrder.module.css";
import Toaster from "@/Elements/DsComponents/DsToaster/DsToaster";
import { closeTimeForTender } from "@/Common/helpers/constant";
import pagestyles from "@/app/page.module.css"
import { closeAllContext } from "@/Elements/DsComponents/dsContextHolder/dsContextHolder";
import DsPane from "@/Elements/DsComponents/DsPane/DsPane";
import PaneOpenButton from "@/Elements/DsComponents/DsPane/PaneOpenButton";
import DocumentProvider, { DocumentContext } from "@/TenderComponents/AddUpdateTenderComponents/DocumentSelctionComponents/DocumentsContextProvider";
import DsAddTenderDocumentPane from "@/TenderComponents/AddUpdateTenderComponents/DocumentSelctionComponents/DsAddTenderDocumentPane";
import DocumentSelectorArea from "@/TenderComponents/AddUpdateTenderComponents/DocumentSelctionComponents/DsDocumentSelectionArea";
import styles from "@/TenderComponents/AddUpdateTenderComponents/DocumentSelctionComponents/document.module.css";

const DsTenderIdPage: React.FC = () => {
  const { setActionStatusValues, actionStatus, saveTender } = useTenderData();
  const [selectedTabId] = useTabState("tenderPage"); // Use the custom hook

  // const documentContext = useContext(DocumentContext);
  // if (!documentContext) {
  //   throw new Error("DocumentSelectorArea must be used within a DocumentContext");
  // }

  // const { totalSelectedDocuments } = documentContext;

  //  console.log(tenderData);
  const tabs = [
    { tabId: "0", tabName: "Basic Details" },
    { tabId: "1", tabName: "Products ₹ (V1)" },
    { tabId: "2", tabName: "Documents" },
    // { tabId: "3", tabName: "New" },
  ];

  // const docCount = totalSelectedDocuments;

  return (
    <>
      <DocumentProvider>
        <DsApplication
          selectedTabId={selectedTabId}
          appTitle="Tender"
          tabs={tabs}
        >
          <div className={pagestyles.container}
            onScroll={() => closeAllContext()}>
            <TabView tabId="0" >
              <div className={style.tenderDetails}>

                <DsBasicDetails />
              </div>
            </TabView>
            <TabView tabId="2">
              <DocumentContext.Consumer>
                {(context) => {
                  if (!context) {
                    return <div>Error: Document context is not available</div>; // ✅ Prevents undefined errors
                  }
                  const { totalSelectedDocuments } = context;

                  return (
                    <div>
                      <div className={style.docPane}>
                        <div className={style.totalCount}>
                          <div>Selected Document</div>
                          <div className={style.count}> {totalSelectedDocuments}</div>
                        </div>
                        <PaneOpenButton className={styles.pane} id="documentPaneOpenBtn" paneId="documentPane" label="Add Documents" />
                      </div>

                      <DocumentSelectorArea />
                    </div>
                  );
                }}
              </DocumentContext.Consumer>
            </TabView>


          </div>
        </DsApplication>
        <DsPane id="documentPane" side="right" title="Documents" isBackdrop={true}>
          <DsAddTenderDocumentPane />
        </DsPane>
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
      </DocumentProvider>

    </>

  );
};
export default DsTenderIdPage;
