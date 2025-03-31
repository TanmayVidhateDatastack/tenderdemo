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
import DsTenderProduct from "@/TenderComponents/AddUpdateTenderComponents/ProductComponents/DsTenderProduct";
import { OpenPopup } from "@/Elements/DsComponents/dsPopup/dsPopup";
import DsButton from "@/Elements/DsComponents/DsButtons/dsButton";
import Image from "next/image";
import upload from "@/Common/TenderIcons/smallIcons/uploadicon.svg";
import CsvPopup from "@/TenderComponents/TenderLogComponents/CsvPopup";



const DsTenderIdPage: React.FC = () => {

  const [selectedTabId] = useTabState("tenderPage"); 
  const { tenderData, addTenderProduct,setActionStatusValues , actionStatus,saveTender} = useTenderData();


  const tabs = [
    { tabId: "0", tabName: "Basic Details" },
    { tabId: "1", tabName: "Products ₹ (V1)" },
    { tabId: "2", tabName: "Documents" },

  ];
  return (
    <>
      <DocumentProvider>
        <DsApplication
          selectedTabId={selectedTabId}
          appTitle="New Tender"
          appMenu={
            <>
              <div>
                {  
                  <>
                    <DsButton
                      className={style.csvpopupBtn}
                      startIcon={
                        <div
                          style={{
                            width: "1.125em",
                            height: "1.125em",
                            position: "relative",
                          }}
                        >
                          <Image
                            src={upload}
                            alt="Add Icon"
                            layout="fill"
                            objectFit="cover"
                          />
                        </div>
                      }
                      buttonSize="btnLarge"
                      buttonViewStyle="btnText"
                      id="CSV"
                      onClick={() => OpenPopup("csvpopup")}
                    >
                      CSV file
                    </DsButton>
  
                    <div>
                      <CsvPopup />
                    </div>
                  </>
                }
              </div>
            </>
          }
          tabs={tabs}
        >
          <div className={pagestyles.container} onScroll={() => closeAllContext()}>
            <TabView tabId="0">
              <div className={style.tenderDetails}>
                <DsBasicDetails />
              </div>
            </TabView>
            <TabView tabId="1">
              <DsTenderProduct
                productList={tenderData.products}
                setProductList={addTenderProduct}
              />
            </TabView>
            <TabView tabId="2">
              <DocumentContext.Consumer>
                {(context) => {
                  if (!context) {
                    return <div>Error: Document context is not available</div>;
                  }
                  const { totalSelectedDocuments } = context;
  
                  return (
                    <div>
                      <div className={style.docPane}>
                        <div className={style.totalCount}>
                          <div className={style.selectedDocsCount}>Selected Document</div>
                          <div className={style.count}>{totalSelectedDocuments}</div>
                        </div>
                        <PaneOpenButton
                          className={styles.pane}
                          id="documentPaneOpenBtn"
                          paneId="documentPane"
                          label="Add Documents"
                        />
                      </div>
  
                      <DocumentSelectorArea />
                    </div>
                  );
                }}
              </DocumentContext.Consumer>
            </TabView>
          </div>
          <DSTendrFooter setActionStatus={setActionStatusValues} saveTender={saveTender} />

        </DsApplication>
        <DsPane id="documentPane" side="right" title="Documents" isBackdrop={true}>
          <DsAddTenderDocumentPane />
        </DsPane>
        <Toaster
          handleClose={() => {}}
          id={"create-order-toaster"}
          type={actionStatus?.notiType}
          message={actionStatus?.notiMsg}
          position={"top"}
          duration={closeTimeForTender}
        />
  
      </DocumentProvider>
    </>
  );
  
};
export default DsTenderIdPage;
