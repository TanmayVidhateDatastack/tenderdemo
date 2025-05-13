import React, { useState, useEffect, useRef } from "react";
import TabView from "@/Elements/DsComponents/dsTabs/TabView";
import DsApplication from "@/Elements/ERPComponents/DsApplicationComponents/DsApplication";
import DsBasicDetails from "@/TenderComponents/AddUpdateTenderComponents/BasicDetailComponents/DsBasicDetails";
import {
  TenderProduct,
  useTenderData,
} from "@/TenderComponents/AddUpdateTenderComponents/TenderDataContextProvider";
import { useTabState } from "@/Redux/hook/tabHook"; // Import the custom hook
import DSTendrFooter from "@/TenderComponents/TenderLogComponents/DsTenderFooter";
import style from "./tenderOrder.module.css";
import Toaster, {
  hideToaster,
} from "@/Elements/DsComponents/DsToaster/DsToaster";
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
import DsStatusIndicator, {
  formatStatus,
} from "@/Elements/DsComponents/dsStatus/dsStatusIndicator";
import ContractView from "@/TenderComponents/AddUpdateTenderComponents/CustomTabViews/ContractView";
import { tab } from "@/Common/helpers/types";
import { setSelectedTabId } from "@/Redux/slice/TabSlice/TabSlice";
import { setDisabledByStatusAndRole } from "@/Redux/slice/PermissionSlice/permissionSlice";
import { useAppDispatch, useAppSelector } from "@/Redux/hook/hook";
import { AppDispatch } from "@/Redux/store/store";

const DsTenderIdPage: React.FC<{
  paramOrderId: string | number;
  tenderStatus?: string; 
}> = ({ paramOrderId, tenderStatus }) => {
  const [selectedTabId, setTabId] = useTabState("tenderPage");
  const {
    tenderData,
    tenderDataCopy,
    addTenderProduct,
    setActionStatusValues,
    actionStatus,
    saveTender,
    updateTender,
    fetchAndSetOriginalTender,
  } = useTenderData();
  const [isCsvWhite, setIsCsvWhite] = useState(false);
  const [isLatestVersion, setIsLatestVersion] = useState(false);
  const [orderId, setOrderId] = useState<string>(paramOrderId?.toString());
  const appTitle = useRef<string>("New");
   const dispatch = useAppDispatch<AppDispatch>();
  const userRole = useAppSelector((state) => state.user);
  const version = 1;

  const [tabs, setTabs] = useState<tab[]>([
    { tabId: "0", tabName: "Basic Details" },
  ]);

  const [displayFlag, setDisplayFlag] = useState<"New" | "Existing">(
    "Existing"
  );
  const [message, setMessage] = useState<string>("");

  const handleUpload = (file: File | null) => {
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const fileContent = event.target?.result;
      setMessage("The File has been  attached successfully!");
 
      const text = event.target?.result as string;
      const rows = text
        .replace("\r\n", "\n")
        .trim()
        .split("\n")
        .map((row) => row.split(","));

      // Get existing products from the current version (v1)
      const version = Number(selectedTabId.split("v")[1]);
      const currentRevision = tenderData.tenderRevisions.find(
        (rev) => rev.version === version
      );

      const existingGenericNames = new Set(
        (currentRevision?.tenderItems || [])
          .map((p) => p.requestedGenericName?.trim().toLowerCase())
          .filter(Boolean)
      );

      const prd: TenderProduct[] = rows.map((x) => {
        return {
          requestedGenericName: x[0],
          requestedQuantity: Number(x[1]),
          requestedPackingSize: x[2],
          competitorId: 0,
          product: {
            dataSource: "csv",
          },
        };
      });

      prd.forEach((x) => {
        const name = x.requestedGenericName?.trim().toLowerCase();
        if (name && !existingGenericNames.has(name)) {
          addTenderProduct(version, x);
          existingGenericNames.add(name); // prevent same product from being added multiple times in same upload
        }
      });
    };

    reader.onerror = () => {
      console.error("Error reading the file");
    };

    reader.readAsText(file);
  };
  useEffect(() => {
    // fetchAndSetOriginalTender(9917);
  }, []);

  useEffect(() => {
    // console.log("orderId", orderId);
    if (orderId?.toString().toLowerCase() == "new") {
      setDisplayFlag("New");
      appTitle.current = "New Tender";
    } else if (Number(orderId) > 0) {
      setDisplayFlag("Existing");
      if (
        tenderStatus == "AWARDED" ||
        tenderStatus == "PARTIALLY_AWARDED" ||
        tenderStatus == "LOST" ||
        tenderStatus == "CANCELLED" ||
        tenderStatus == "newPricingVersion"
      )
        fetchAndSetOriginalTender(Number(orderId), tenderStatus);
      else {
        fetchAndSetOriginalTender(Number(orderId)); 
      }
    }
  }, [orderId]);

    useEffect(() => {
      dispatch(
        setDisabledByStatusAndRole({
          role:userRole.role,
          status: tenderData?.status.toUpperCase() ?? DsStatus.DRFT,
        })
      );
    }, [userRole.role, tenderData?.status]); 

  useEffect(() => {
    console.log(displayFlag, "displayFlag");
    const revisionTabs = tenderData.tenderRevisions.map((rev) => ({
      tabId: `v${rev.version}`,
      tabName: `Products ₹ (V${rev.version})`,
      disable: displayFlag == "New",
    }));
    setTabs([
      { tabId: "0", tabName: "Basic Details" },
      ...revisionTabs,
      { tabId: "2", tabName: "Documents", disable: displayFlag == "New" },
    ]);

    if ( 
      tenderData.status == "AWARDED" ||  
      tenderData.status == "PARTIALLY_AWARDED" ||
      tenderData.status == "LOST" || 
      tenderData.status == "CANCELLED"  
    ) { 
      setTabs((prev) => { 
        if (prev?.find((x) => x.tabId == "Contract") == undefined)
          return [
            ...prev,   
            {
              tabId: "Contract",
              tabName: "Tender " + formatStatus(tenderData.status),
            },
          ];
        return prev;
      });
    }
    if (tenderStatus) {
      if (tenderStatus !== "newPricingVersion") setTabId("Contract");
      else {
        const latestVersion =
          tenderData.tenderRevisions.reduce((maxObj, currentObj) =>
            currentObj.version > maxObj.version ? currentObj : maxObj
          )?.version || 1;

        setTabId(`v${latestVersion}`);
      }
    }
    if (tenderDataCopy.id) {
      appTitle.current =
        tenderDataCopy.tenderNumber +
        " ( " +
        tenderDataCopy.tenderDetails.customerName +
        " )";
    }
    // };
  }, [tenderDataCopy, displayFlag]);
  useEffect(() => {
    const version = Number(selectedTabId.split("v")[1]);

    const latestVersion =
      tenderData.tenderRevisions.reduce((maxObj, currentObj) =>
        currentObj.version > maxObj.version ? currentObj : maxObj
      )?.version || 1;
    console.log(latestVersion, version);
    setIsLatestVersion(latestVersion == version);
  }, [selectedTabId, tenderData.tenderRevisions]);
  useEffect(() => {
    setTabId("0");
  }, []);
  // useEffect(()=>{
  //   if(displayFlag=="New"){
  //     setTabs(
  //       [
  //         { tabId: "0", tabName: "Basic Details" },
  //         { tabId: "v1", tabName: "Products ₹ (V1)",disable:true },
  //         { tabId: "2", tabName: "Documents",disable:true },
  //       ]
  //     )

  //   }
  // },[displayFlag])
   
  return (
    <>
      <DocumentProvider>
        <DsApplication
          selectedTabId={selectedTabId}
          appTitle={appTitle.current}
          appMenu={
            <>
              {/* { selectedTabId === `v${rev.version}` && (
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
                  <CsvPopup onUpload={handleUpload} />
                  </div>

                  <DsButton
                    label="Download Pricing"
                    buttonSize="btnMedium"
                    className={style.downloadPricing}
                    startIcon={
                      <div
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
                          disabled={true}
                          // isWhite={isCsvWhite}
                        ></IconFactory>
                      </div>
                   }
               
                   >
                   </DsButton>
                </>
              )} */}
              {tenderData?.tenderRevisions?.length > 0 && (
                <div>
                  {selectedTabId &&
                    tabs
                      .find((x) => x.tabId === selectedTabId)
                      ?.tabName.startsWith("Products") && (
                      <>
                        <div style={{ display: "flex", flexDirection: "row" }}>
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
                                  name="upload"
                                  isWhite={isCsvWhite}
                                  disabled={!isLatestVersion}
                                />
                              </div>
                            }
                            buttonSize="btnSmall"
                            buttonViewStyle="btnText"
                            id="CSV"
                            disable={!isLatestVersion}
                            onClick={() => OpenPopup("csvpopup")}
                            onMouseEnter={() => setIsCsvWhite(true)}
                            onMouseLeave={() => setIsCsvWhite(false)}
                          >
                            CSV file
                          </DsButton>

                          <div>
                            <CsvPopup onUpload={handleUpload} />
                          </div>

                          <DsButton
                            label="Download Pricing"
                            buttonSize="btnSmall"
                            buttonViewStyle="btnText"
                            // disable={!isLatestVersion}

                            disable={true}
                            className={style.downloadPricing}
                            startIcon={
                              <div
                                style={{
                                  width: "1.125em",
                                  height: "1.130em",
                                  position: "relative",
                                }}
                              >
                                {/* <IconFactory name="download" disabled={!isLatestVersion} /> */}
                                <IconFactory name="download" disabled={true} />
                              </div>
                            }
                          />
                        </div>
                      </>
                    )}
                </div>
              )}

              <div>
                {
                  <>
                    <DsStatusIndicator
                      label={`${
                        displayFlag == "Existing"
                          ? tenderData?.status
                          : DsStatus.DRFT
                      }`}
                      className={styles.statusIndicator}
                      type="user_defined"
                      id="state"
                      status={
                        displayFlag == "Existing"
                          ? tenderData?.status ?? DsStatus.DRFT
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
          onTabChange={(x) => {
            setTabId(x.tabId);
          }}
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
            {tenderDataCopy.id !== undefined &&
              tenderDataCopy.id !== null &&
              tenderDataCopy.id !== 0 && (
                <>
                  {tenderData.tenderRevisions.map((rev) => (
                    <TabView key={rev.version} tabId={`v${rev.version}`}>
                      {/* <DsTenderProduct
                  productList={[...(rev.tenderItems ?? [])]}
                  setProductList={(product) =>
                    addTenderProduct(rev.version, product)
                  }
                /> */}
                      <DsTenderProduct
                        productList={rev.tenderItems || []}
                        setProductList={(product) => {
                          const isDuplicate = rev.tenderItems?.some(
                            (item) => item.productId === product.productId
                          );

                          if (!isDuplicate) {
                            addTenderProduct(rev.version, product);
                          }
                        }}
                        version={rev.version}
                      />
                    </TabView>
                  ))}

                  <TabView tabId="2">
                    <DocumentContext.Consumer>
                      {(context) => {
                        if (!context) {
                          return (
                            <div>Error: Document context is not available</div>
                          );
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
                                  {Number(
                                    totalSelectedDocuments
                                  ).toLocaleString("en-US", {
                                    minimumIntegerDigits: 2,
                                    useGrouping: false,
                                  })}
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
                  <TabView tabId="Contract">
                    {(tenderData.status == "AWARDED" ||
                      tenderData.status == "PARTIALLY_AWARDED" ||
                      tenderData.status == "LOST" ||
                      tenderData.status == "CANCELLED") && (
                      <ContractView status={tenderData.status} />
                    )}
                  </TabView>
                </>
              )}
          </div>
          <DSTendrFooter />
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
        {/* <Toaster
          handleClose={() => {}}
          id={"create-order-toaster"} 
          type={actionStatus?.notiType} 
          message={actionStatus?.notiMsg} 
          position={"top"} 
          duration={closeTimeForTender} 
        /> */}

        <Toaster
          handleClose={() => {
            hideToaster("create-order-toaster");
            // setShowNotification(false);
            // if (actionStatus?.notiType == "success")
            // window.location.reload();
          }}
          id={"create-order-toaster"}
          type={actionStatus?.notiType}
          message={actionStatus?.notiMsg}
          position={"top"}
          duration={
            actionStatus?.isOkayButtonVisible === true
              ? undefined
              : closeTimeForTender
          }
          isOkayButton={actionStatus?.isOkayButtonVisible}
        />
      </DocumentProvider>
    </>
  );
};
export default DsTenderIdPage;
