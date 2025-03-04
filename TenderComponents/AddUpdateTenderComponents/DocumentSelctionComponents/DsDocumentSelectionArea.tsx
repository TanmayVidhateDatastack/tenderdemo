"use client";
import styles from "./document.module.css";
import pagestyles from "@/app/page.module.css";
import React, { useContext, useEffect, useState } from "react";
import { eventNames } from "process";
import Image from "next/image"; 
import  stampIcon from "@/Icons/mediumIcons/cross.svg"
import DocumentSelector from "@/Elements/DsComponents/dsDocumentSelector/dsDocumentSelector";
import { closeAllContext } from "@/Elements/DsComponents/dsContextHolder/dsContextHolder";
import DsTabButton from "@/Elements/DsComponents/DsButtons/dsTabButton";
import PaneOpenButton from "@/Elements/DsComponents/DsPane/PaneOpenButton";
import DocumentProvider, { DocumentContext } from "./DocumentsContextProvider";

export default function Documents() {
  const [productVisible, setProductVisible] = useState<boolean>(false);
  const [fdaVisible, setFdaVisible] = useState<boolean>(false);   
  const [financialVisible, setFinancialVisible] = useState<boolean>(false);
  const [miscellaneousVisible, setMiscellaneousVisible] = 
    useState<boolean>(false); 
  const [companyDocumentsVisible, setCompanyDocumentsVisible] =  
    useState<boolean>(false);
  const count = "01";
  
  const docContext = useContext(DocumentContext);

  if (!docContext) {
    throw new Error("AddDocument must be used within a DocumentContext");
  } 

  const { selectedFiles, setSelectedFiles } = docContext;

  useEffect(() => {
    if (selectedFiles.length > 0) {
      selectedFiles.forEach((sf, index) => {
        if (sf.docType == "fda") {
          setFdaVisible(true);
        } else if (sf.docType == "product") {
          setProductVisible(true);
        } else if (sf.docType == "financial") {
          setFinancialVisible(true);
        } else if (sf.docType == "miscellaneous") {
          setMiscellaneousVisible(true);
        } else if (sf.docType == "company") {
          setCompanyDocumentsVisible(true);
        }
      });
    }
  }, [selectedFiles]);

  useEffect(() => {
    const fdaLength = [...selectedFiles]
      .filter((x) => x.docType == "fda")
      .length.toString();
    if (fdaLength <= "0") {
      setFdaVisible(false);
    }
    const companyLength = [...selectedFiles]
      .filter((x) => x.docType == "company")
      .length.toString();
    if (companyLength <= "0") {
      setCompanyDocumentsVisible(false);
    }
    const financialLength = [...selectedFiles]
      .filter((x) => x.docType == "financial")
      .length.toString();
    if (financialLength <= "0") {
      setFinancialVisible(false);
    }
    const productLength = [...selectedFiles]
      .filter((x) => x.docType == "product")
      .length.toString();
    if (productLength <= "0") {
      setProductVisible(false);
    }
    const miscellaneousLength = [...selectedFiles] 
      .filter((x) => x.docType == "miscellaneous")
      .length.toString();
    if (miscellaneousLength <= "0") {
      setMiscellaneousVisible(false);
    }
  }, [selectedFiles]);

  return (
    <>
      <DocumentProvider>
        <div
          className={pagestyles.container}
          onScroll={() => closeAllContext()}
        >
          {/* <div className={styles.container}> */}
          <div className={styles.Customer}>
            <div className={styles.container + " " + styles["flex-column"]}>
              <div className={styles.add_documents}>
                <div className={styles.count_div}>
                  <div>Selected Document</div>
                  <div>
                    <DsTabButton
                    //   type="count"
                      className={styles.countBtn}
                      // label={"08"}
                      count={count}
                    ></DsTabButton>
                  </div>
                </div>
                <div>
                  <PaneOpenButton
                    startIcon={<Image src={stampIcon} alt="stamp" />}
                    id="actionBtn12"
                    paneId="myPane"
                    label="Add Document"
                  />
                </div>
              </div>
              <div className={styles.documentsDivs}>
                {productVisible && (
                  <div>
                    <div>
                      <DocumentSelector
                        headerTitle={"Product Licenses"}
                        headerNumber={[...selectedFiles]
                          .filter((x) => x.docType == "product")
                          .length.toString()}
                        initialDocuments={[...selectedFiles]
                          .filter((x) => x.docType == "product")
                          .map((x) => x.docvalue)}
                        handleOnRemoveClick={(doc) =>
                          setSelectedFiles(
                            [...selectedFiles].filter((d) => {
                              if (
                                d.docType === "product" &&
                                d.docvalue === doc
                              ) {
                                const checkbox = document.querySelector(
                                  d.checkboxId as string
                                ) as HTMLInputElement;
                                if (checkbox) {
                                  checkbox.checked = false;
                                }
                                return false;
                              } else {
                                return true;
                              }
                            })
                          )
                        }  
                      ></DocumentSelector>
                    </div>
                  </div>
                )}
              </div>
              <div className={styles.documentsDivs}>
                {fdaVisible && (
                  <div>
                    <div>
                      <DocumentSelector
                        headerTitle={"FDA Documents"}
                        headerNumber={selectedFiles
                          .filter((x) => x.docType === "fda")
                          .length.toString()}
                        initialDocuments={selectedFiles
                          .filter((x) => x.docType === "fda")
                          .map((x) => x.docvalue)}
                        handleOnRemoveClick={(doc) =>
                          setSelectedFiles(
                            [...selectedFiles].filter((d) => {
                              if (d.docType === "fda" && d.docvalue === doc) {
                                const checkbox = document.querySelector(
                                  d.checkboxId as string
                                ) as HTMLInputElement;
                                if (checkbox) {
                                  checkbox.checked = false;
                                }
                                return false;
                              } else {
                                return true;
                              }
                            })
                          )
                        }
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className={styles.documentsDivs}>
                {financialVisible && (
                  <div>
                    <div>
                      <DocumentSelector
                        headerTitle={"Financial Documents"}
                        headerNumber={[...selectedFiles]
                          .filter((x) => x.docType == "financial")
                          .length.toString()}
                        initialDocuments={[...selectedFiles]
                          .filter((x) => x.docType == "financial")
                          .map((x) => x.docvalue)}
                        handleOnRemoveClick={(doc) =>
                          setSelectedFiles(
                            [...selectedFiles].filter((d) => {
                              if (
                                d.docType === "financial" &&
                                d.docvalue === doc
                              ) {
                                const checkbox = document.querySelector(
                                  d.checkboxId as string
                                ) as HTMLInputElement;
                                if (checkbox) {
                                  checkbox.checked = false;
                                }
                                return false;
                              } else {
                                return true;
                              }
                            })
                          )
                        }
                      ></DocumentSelector>
                    </div>
                  </div>
                )}
              </div>
              <div className={styles.documentsDivs}>
                {companyDocumentsVisible && (
                  <div>
                    <div>
                      <DocumentSelector
                        headerTitle={"Comapany Documents"}
                        headerNumber={[...selectedFiles]
                          .filter((x) => x.docType == "company")
                          .length.toString()}
                        initialDocuments={[...selectedFiles]
                          .filter((x) => x.docType == "company")
                          .map((x) => x.docvalue)}
                        handleOnRemoveClick={(doc) =>
                          setSelectedFiles(
                            [...selectedFiles].filter((d) => {
                              if (
                                d.docType === "company" &&
                                d.docvalue === doc
                              ) {
                                const checkbox = document.querySelector(
                                  d.checkboxId as string
                                ) as HTMLInputElement;
                                if (checkbox) {
                                  checkbox.checked = false;
                                }
                                return false;
                              } else {
                                return true;
                              }
                            })
                          )
                        }
                      ></DocumentSelector>
                    </div>
                  </div>
                )} 
              </div>
              <div className={styles.documentsDivs}>
                {miscellaneousVisible && (
                  <div>
                    <div>
                      <DocumentSelector
                        headerTitle={"Miscellaneous Annexures and Under..."}
                        headerNumber={[...selectedFiles]
                          .filter((x) => x.docType == "miscellaneous")
                          .length.toString()}
                        initialDocuments={[...selectedFiles]
                          .filter((x) => x.docType == "miscellaneous")
                          .map((x) => x.docvalue)}
                        handleOnRemoveClick={(doc) =>
                          setSelectedFiles(
                            [...selectedFiles].filter((d) => {
                              if (
                                d.docType === "miscellaneous" &&
                                d.docvalue === doc
                              ) {
                                const checkbox = document.querySelector(
                                  d.checkboxId as string
                                ) as HTMLInputElement;
                                if (checkbox) {
                                  checkbox.checked = false;
                                }
                                return false;
                              } else {
                                return true;
                              }
                            })
                          )
                        }
                      ></DocumentSelector>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* </div> */}
        </div>
      </DocumentProvider>
    </>
  );
}
