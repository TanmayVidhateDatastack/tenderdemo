import React, { useState, useEffect, useRef } from "react";
import TabView from "@/Elements/DsComponents/dsTabs/TabView";
import DsApplication from "@/Elements/ERPComponents/DsApplicationComponents/DsApplication";
import DsBasicDetails from "@/TenderComponents/AddUpdateTenderComponents/BasicDetailComponents/DsBasicDetails";
import { useTenderData } from "@/TenderComponents/AddUpdateTenderComponents/TenderDataContextProvider";
import { useTabState } from "@/Redux/hook/tabHook"; // Import the custom hook
import DSTendrFooter from "@/TenderComponents/TenderLogComponents/DsTenderFooter";
import style from "./tenderOrder.module.css";
import Toaster from "@/Elements/DsComponents/DsToaster/DsToaster";
import { closeTimeForTender, DsStatus } from "@/Common/helpers/constant";
import pagestyles from "@/app/page.module.css";
import { closeAllContext } from "@/Elements/DsComponents/dsContextHolder/dsContextHolder";
import DsPane from "@/Elements/DsComponents/DsPane/DsPane";
import PaneOpenButton from "@/Elements/DsComponents/DsPane/PaneOpenButton";
import DocumentProvider, {
  DocumentContext,
} from "@/TenderComponents/AddUpdateTenderComponents/DocumentSelctionComponents/DocumentsContextProvider";
import DsAddTenderDocumentPane from "@/TenderComponents/AddUpdateTenderComponents/DocumentSelctionComponents/DsAddTenderDocumentPane";
import DocumentSelectorArea from "@/TenderComponents/AddUpdateTenderComponents/DocumentSelctionComponents/DsDocumentSelectionArea";
import styles from "@/TenderComponents/AddUpdateTenderComponents/DocumentSelctionComponents/document.module.css";
import DsTenderProduct from "@/TenderComponents/AddUpdateTenderComponents/ProductComponents/DsTenderProduct";
import { OpenPopup } from "@/Elements/DsComponents/dsPopup/dsPopup";
import DsButton from "@/Elements/DsComponents/DsButtons/dsButton";
import CsvPopup from "@/TenderComponents/TenderLogComponents/CsvPopup";
import IconFactory from "@/Elements/IconComponent";
import DsStatusIndicator from "@/Elements/DsComponents/dsStatus/dsStatusIndicator";
 
const DsTenderIdPage: React.FC<{ paramOrderId: string | number }> = ({
  paramOrderId,
}) => {
  const [selectedTabId,setTabId] = useTabState("tenderPage");
  const {
    tenderData,
    addTenderProduct,
    setActionStatusValues,
    actionStatus,
    saveTender,
  } = useTenderData();
  const [isCsvWhite, setIsCsvWhite] = useState(false);
  const [orderId] = useState<string>(paramOrderId?.toString());
  const appTitle = useRef<string>("New");
 
  const tabs = [
    { tabId: "0", tabName: "Basic Details" },
    { tabId: "1", tabName: "Products ₹ (V1)" },
    { tabId: "2", tabName: "Documents" },
  ];
 
  const [displayFlag, setDisplayFlag] = useState<"New" | "Existing">(
    "Existing"
  );
 
  useEffect(() => {
    if (orderId?.toString().toLowerCase() == "new") {
      setDisplayFlag("New");
      appTitle.current = "New Order";
    } else if (Number(orderId) > 0) {
      setDisplayFlag("Existing");
    } else {
      // setNotFound(true);
      // return {notFound:true}
      ////Page not Found
    }
  }, [orderId]);
 
// useEffect(()=>{
 
//   console.log("tab Id", selectedTabId);
 
// })
 
  return (
    <>
      <DocumentProvider>
        <DsApplication
          selectedTabId={selectedTabId}
          appTitle={appTitle.current}
          appMenu={
            <>
              { selectedTabId === "1" && (
                <>
                  <DsButton
                    className={style.csvpopupBtn}
                    startIcon={
                      <div
                        style={{
                          width: "1.125em",
                          height: "1.130em",
                          position: "relative",
                        }}
                      >
                        <IconFactory
                          name={"upload"}
                          isWhite={isCsvWhite}
                        ></IconFactory>
                      </div>
                    }
                    buttonSize="btnMedium"
                    buttonViewStyle="btnText"
                    id="CSV"
                    onClick={() => OpenPopup("csvpopup")}
                    onHover={() => {
                      setIsCsvWhite(true);
                    }}
                    onMouseLeave={() => {
                      setIsCsvWhite(false);
                    }}
                  >
                    CSV file
                  </DsButton>
 
                  <div>
                    <CsvPopup />
                  </div>
                 
                  <DsButton
                   label="Download Pricing"
                   buttonSize="btnMedium"
                   className={style.downloadPricing}
                   startIcon={
                    <div
                        style={{
                          width: "1.125em",
                          height: "1.130em",
                          position: "relative",
                        }}
                      >
                        <IconFactory
                          name={"download"}
                          // isWhite={isCsvWhite}
                        ></IconFactory>
                      </div>
                   }
                   >
                   </DsButton>
                </>
              )}
              <div>
                {
                  <>
                    <DsStatusIndicator
                      label={`${
                        displayFlag == "Existing"
                          ? tenderData?.status.tenderStatus
                          : DsStatus.DRFT
                      }`}
                      className={styles.statusIndicator}
                      type="user_defined"
                      id="state"
                      status={
                        displayFlag == "Existing"
                          ? tenderData?.status.tenderStatus ?? DsStatus.DRFT
                          : DsStatus.DRFT
                      }
                      // handleClickableOnClick={handleStatusClick}
                    />
                  </>
                }
              </div>
            </>
          }
          hasPrevious={true}
          tabs={tabs}
          onTabChange={(x)=> {setTabId(x.tabId)}}
        >
          <div
            className={pagestyles.container}
            onScroll={() => closeAllContext()}
          >
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
                    <div className={style.documentContainer}>
                      <div className={style.docPane}>
                        <div className={style.totalCount}>
                          <div className={style.selectedDocsCount}>
                            Selected Document
                          </div>
                          <div className={style.count}>
                            {Number(totalSelectedDocuments).toLocaleString(
                              "en-US",
                              { minimumIntegerDigits: 2, useGrouping: false }
                            )}
                          </div>
                        </div>
                        <PaneOpenButton
                          className={styles.docPaneBtn}
                          buttonViewStyle="btnText"
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
          <DSTendrFooter
            setActionStatus={setActionStatusValues}
            saveTender={saveTender}
          />
        </DsApplication>
        <DsPane
          id="documentPane"
          side="right"
          title="Documents"
          isBackdrop={true}
          className={styles.documentSelectionPane}
        >
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
 
 