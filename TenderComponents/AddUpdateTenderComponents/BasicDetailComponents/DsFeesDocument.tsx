import DsButton from "@/Elements/DsComponents/DsButtons/dsButton";
import DsCsvUpload from "@/Elements/DsComponents/DsButtons/dsCsvUpload";
import Ds_checkbox from "@/Elements/DsComponents/DsCheckbox/dsCheckbox";
import DsTextField from "@/Elements/DsComponents/DsInputs/dsTextField";
import DsSingleSelect from "@/Elements/DsComponents/dsSelect/dsSingleSelect";
import Image from "next/image";
// import downloadReceipt from "@/Common/TenderIcons/smallIcons/downloadReceipt.svg";
import styles from "./deposite.module.css";
import eleStyles from "./tender.module.css";
import { DsSelectOption } from "@/Common/helpers/types";
import { updateDocuments, useTenderData } from "../TenderDataContextProvider";
import TextArea from "@/Elements/DsComponents/DsInputs/dsTextArea";
import DatePicker from "@/Elements/DsComponents/DsDatePicker/DsDatePicker";
import {
  downloadDocumentUrl,
  getAllMetaData,
  paidBys,
} from "@/Common/helpers/constant";
import fetchData from "@/Common/helpers/Method/fetchData";
import { useEffect, useState } from "react";
import IconFactory from "@/Elements/IconComponent";
import DsMultiSelect from "@/Elements/DsComponents/dsSelect/dsMultiSelect";
import { getYesterdayDate } from "@/Common/helpers/Method/conversion";
import UploadFile from "@/TenderComponents/TenderLogComponents/uploadfile";
import { closeAllContext } from "@/Elements/DsComponents/dsContextHolder/dsContextHolder";
import { useAppSelector } from "@/Redux/hook/hook";
import { RootState } from "@/Redux/store/store";

export type tenderDocument = {
  name: string;
  document: File;
};

export type tenderFee = {
  type: string;
  amount: number;
  currency: string;
  paidBy: string;
  paymentMode: string;
  refundEligibility: string;
  paymentDueDate: string;
  notes: string;
  recoverypaymentDate?: string;
  refundNotes?: string;
  paymentTransactionId?: string;
  paymentReceiptId?: string;
  acknowledgementReceiptId?: string;
  fundTransferConfirmationId?: string;
  paymentRefundStatus?: string;
  paymentStatus?: string;
  status?: "ACTV" | "INAC";
  paymentstatus: string;
  documents: string[];
};

export interface DsFeesProps {
  title: string;
  id: string;
  mode: DsSelectOption[];
  refund: DsSelectOption[];
  paidBy: DsSelectOption[];
  downloadVisible: boolean;
  completedpayment: boolean;
  recoverycheckvisibible: boolean;
  type: string;
  optionlist: DsSelectOption[];
}
export interface Deposit {
  paidBy: DsSelectOption[];
}

const getTodayDate = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Ensure two digits
  const day = date.getDate().toString().padStart(2, "0"); // Ensure two digits

  return `${year}-${month}-${day}`;
};

const DsFeesDocument: React.FC<DsFeesProps> = ({
  title,
  type,
  id,
  mode,
  refund,
  paidBy,
  downloadVisible,
  recoverycheckvisibible,
  optionlist,
  completedpayment = false,
  // recoverypaymentVisible = false,
}) => {
  const {
    updateTenderFee,
    addNewTenderDocument,
    tenderData,
    tenderDataCopy,
    removeTenderDocument,
  } = useTenderData();
  const metaDataTypes = [
    "TENDER_EMD_PAYMENT",
    "TENDER_FEES_PAYMENT",
    "TENDER_PSD_PAYMENT",
    "FEES_TYPE",
  ];
  const [dueDateMin, setDueDateMin] = useState<Date>();

  const [depositeDocuments, setDepositeDocuments] = useState<DsSelectOption[]>(
    []
  );
  const [selectedPaymentMode, setSelectedPaymentMode] =
    useState<DsSelectOption>();
  const [selectedRefund, setSelectedRefund] = useState<DsSelectOption>();
  const [selectedPaidBy, setSelectedPaidBy] = useState<DsSelectOption>();
  const [selectedOptions, setSelectedOptions] = useState<DsSelectOption[]>([]);
  const [tempOptions, setTempOptions] = useState<DsSelectOption[]>([]);

  const permissions = useAppSelector((state: RootState) => state.permissions);
  const {
    amountDisable,
    paidByDisable,
    modesDisable,
    refundEligibilityDisable,
    PaymentdueDateDisable,
    instructionNotesDisable,
    attachFileButtonDisable,
    paymentcompletedDisable,
    addDocumentTypeButtonDisable,
    addDocumentTypeSlectDisable,
    uploadFileButtonDisabled,
    transactionIdDisable,
    recieptIdDisable,
    paymentRecoverdDateDisable,
    paymentRecoveredDisable,
    recoveredNotesDisable,
    recoveredAttachFileButton,
  } = permissions;

 
  const handleAppliedSuppliedFetch = async () => {
    try {
      const res = await fetchData({ url: paidBys });
      if (res.code === 200) {
        const result = res.result;

        // console.log("appliedbysuppliedby : ", result);

        const paidbys = result.paidBy.map((item: any) => ({
          value: item.codeValue,
          label: item.codeDescription,
        }));
        setDepositeDocuments(paidbys);
      } else {
        console.error("Error fetching data: ", res.message || "Unknown error");
      }
    } catch (error) {
      console.error("Fetch error: ", error);
    }
  };
  useEffect(() => {
    handleAppliedSuppliedFetch();
  }, []);

  useEffect(() => {
    if (mode) {
      const modeValue = tenderData.tenderFees.find(
        (x) => x.feesType == type
      )?.paymentMode;
      if (modeValue) {
        const option = mode.find((x) => x.value == modeValue);
        if (option) setSelectedPaymentMode(option);
        console.log(
          "Fetched Notes Values are",
          tenderData.tenderFees.find((x) => x.feesType == type)
            ?.instructionNotes
        );
      }
    }
    if (refund) {
      const refundValue = tenderData.tenderFees.find(
        (x) => x.feesType == type
      )?.refundEligibility;
      if (refundValue) {
        const option = refund.find((x) => x.value == refundValue);
        if (option) setSelectedRefund(option);
        // console.log("Fetched Notes Values are", tenderData.tenderFees.find((x) => x.feesType == type)?.instructionNotes);
      }
    }
    const paidByvalue = tenderData.tenderFees.find(
      (x) => x.feesType == type
    )?.paidBy;
    if (paidByvalue) {
      const option = depositeDocuments.find((x) => x.value == paidByvalue);
      // const option = mode.find((x) => x.value == paidByvalue);
      if (option) setSelectedPaidBy(option);
    }
  }, [
    tenderData.tenderFees.find((x) => x.feesType == type),
    depositeDocuments,
    mode,
    refund,
  ]);
  useEffect(() => {
    const currentFee = tenderDataCopy.tenderFees.find(
      (x) => x.feesType == type
    );
    if (currentFee) {
      const selectedOPtionArr: DsSelectOption[] = [];
      if (currentFee.paymentTransactionId) {
        const option = optionlist.find((x) =>
          x.value.toString().includes("TRANSACTION_RECEIPT")
        );
        if (option) selectedOPtionArr.push(option);
      }
      if (currentFee.paymentReceiptId) {
        {
          const option = optionlist.find((x) =>
            x.value.toString().includes("PAYMENT_RECEIPT")
          );
          if (option) selectedOPtionArr.push(option);
        }
      }
      if (currentFee.acknowledgementReceiptId) {
        {
          
          const option = optionlist.find((x) =>
            x.value.toString().includes("ACKNOWLEDGEMENT_RECEIPT")
          );
          if (option) selectedOPtionArr.push(option);
        }
      }
      if (currentFee.fundTransferConfirmationId) {
        const option = optionlist.find((x) =>
          x.value.toString().includes("FUND_TRANSFER_CONFIRMATION")
        );
        if (option) selectedOPtionArr.push(option);
      }
      setTempOptions(selectedOPtionArr);
      setSelectedOptions(selectedOPtionArr);
    }
  }, [tenderDataCopy]);

  useEffect(() => {
    console.log("data", tenderData.lastPurchaseDate?.substring(0, 10));
    console.log("copy", tenderDataCopy.lastPurchaseDate?.substring(0, 10));
    const curDate = tenderData.tenderFees.find(
      (x) => x.feesType == type
    )?.paymentDueDate;
    const oriDate = tenderDataCopy.tenderFees.find(
      (x) => x.feesType == type
    )?.paymentDueDate;
    const min =
      oriDate && curDate?.substring(0, 10) == oriDate.substring(0, 10)
        ? getYesterdayDate(new Date(oriDate.substring(0, 10)))
        : getYesterdayDate();
    setDueDateMin(min);
  }, [tenderData.tenderFees, tenderDataCopy.tenderFees]);
  const handleAdd = () => {
    closeAllContext();
    setSelectedOptions(tempOptions);
    console.log("Add button clicked");
  };

  return (
    <>
      <div className={styles.feeContainer} id={id}>
        <div className={styles.headContainer}>
          <div className={styles.headTitle}>{title}</div>
          <DsButton
            className={styles.downloadReceipt}
            buttonViewStyle="btnText"
            label="Download Receipt"
            disable={true}
            startIcon={
              <div
                style={{
                  width: "0.8em",
                  height: "0.8em",
                }}
              >
                <IconFactory name="downloadReceipt" disabled />
              </div>
            }
          />
        </div>
      </div>
      {completedpayment && (
        <>
          <div className={styles.fields}>
            <Ds_checkbox
              id={"payment"}
              name={"Payment Completed"}
              value={"Payment Completed"}
              label={"Payment Completed"}
              isChecked={
                tenderData.tenderFees.find((x) => x.feesType === type)
                  ?.paymentStatus === "DONE"
              }
              onChange={(e) => {
                updateTenderFee(
                  type,
                  "paymentStatus",
                  e.target.checked ? "DONE" : "PEND"
                );
              }}
              disable={paymentcompletedDisable}
            />
          </div>
          <div className={eleStyles.inputDetails}>
            <div className={styles.fields}>
              <DsMultiSelect
                label="Add Document Type"
                containerClasses={`${styles.feeFields} `}
                className={`${styles.scrollableContainer}`}
                id={id + "Documents"}
                options={optionlist || []}
                setSelectOptions={(options) => {
               
                  setTempOptions(options);
                  console.log("Selected options:", options);
                }}
                selectedOptions={tempOptions}
                showOptions={false}
                disable={addDocumentTypeSlectDisable}
              >
                <div className={styles.addBtnSticky}>
                  <DsButton
                    label="Add"
                    buttonViewStyle="btnContained"
                    buttonSize="btnSmall"
                    className={styles.addBtn}
                    onClick={() => {
                      handleAdd();
                    }}
                    disable={addDocumentTypeButtonDisable}
                  />
                </div>
              </DsMultiSelect>
            </div>
            <div className={styles.fields}>
              <DatePicker
                containerClasses={styles.feeFields}
                id={type + "paymentdate"}
                initialDate={
                  tenderData.tenderFees
                    ? new Date(
                        tenderData.tenderFees[0]?.paymentDate || ""
                      ).toLocaleDateString("en-GB")
                    : undefined
                }
                maxDate={new Date()}
                placeholder="DD/MM/YYYY"
                label="Payment Date"
                setDateValue={(date) => {
                  if (date instanceof Date) {
                    updateTenderFee(type, "paymentDate", getTodayDate(date));
                  }
                }}
                // setDateValue={(date)=>{
                //   if (date instanceof Date)
                //   {
                //      if (typeof type == "string")
                //      {
                //       if (type.includes("TENDER_EMD_PAYMENT"))
                      
                //          updateTenderFee(type, "paymentDate", getTodayDate(date));
                      
                //      }
                //   }
                // }}
                disable={paymentcompletedDisable}
              />
            </div>
          </div>

          {selectedOptions.map((option, index) => (
           
            <UploadFile
              key={`upload-${type}-${option.value}-${index}`}
              uploadLabel={`Upload ${option.label} here `}
              id={`${type}_${option.value}`}
              onSelectedFileChange={(files) => {
                const Documents =
                  tenderData.tenderDocuments?.filter(
                    (x) =>
                      x.documentCategory === type &&
                      x.documentType === `${option.value}`
                  ) || [];
                updateDocuments(
                  files,
                  Documents,
                  removeTenderDocument,
                  addNewTenderDocument,
                  `${type}_PAYMENT`,
                  `${type}`,
                  `${option.value}`
                );
              }}
              previouslySelectedFile={
                tenderData.tenderDocuments
                  ?.filter(
                    (x) =>
                      x.documentCategory == type &&
                      x.documentType == type + "_PAYMENT" &&
                      x.documentSubType == option.value
                  )
                  .map((x) => {
                    return {
                      ...x,
                      fileDownloadHref: downloadDocumentUrl(
                        tenderData.id,
                        x.id
                      ),
                    };
                  })[0]
              }
              disable={uploadFileButtonDisabled}
            />
          ))}
          <div className={eleStyles.inputDetails}>
            {selectedOptions.map((option) => (
              <div key={""} className={styles.fields}>
                <DsTextField
                  containerClasses={styles.feeFields}
                  label={`${option.label}   ID`}
                  initialValue={(() => {
                    const fee = tenderData.tenderFees.find(
                      (x) => x.feesType === type
                    );
                    if (!fee) return "";
                    console.log("selecetd option of receipt ",option.value)
                    if (typeof option.value === "string") {
                  
                      if (option.value.includes("ACKNOWLEDGEMENT_RECEIPT"))
                        return fee.acknowledgementReceiptId || "";
                      if (option.value.includes("FUND_TRANSFER_CONFIRMATION"))
                        return fee.fundTransferConfirmationId || "";
                      if (option.value.includes("PAYMENT_RECEIPT"))
                        return fee.paymentReceiptId || "";
                      if (option.value.includes("TRANSACTION_RECEIPT"))
                        return fee.paymentTransactionId || "";
                    }
                    return "";
                  })()}
                  onBlur={(e) => {
                    if (typeof option.value == "string") {
                      if (option.value.includes("ACKNOWLEDGEMENT_RECEIPT"))
                        updateTenderFee(
                          type,
                          "acknowledgementReceiptId",
                          Number((e.target as HTMLInputElement).value)
                        );
                      if (option.value.includes("FUND_TRANSFER_CONFIRMATION"))
                        updateTenderFee(
                          type,
                          "fundTransferConfirmationId",
                          Number((e.target as HTMLInputElement).value)
                        );
                      if (option.value.includes("PAYMENT_RECEIPT"))
                    
                        updateTenderFee(
                          type,
                          "paymentReceiptId",
                          Number((e.target as HTMLInputElement).value)
                        );
                      if (option.value.includes("TRANSACTION_RECEIPT"))
                       
                        updateTenderFee(
                          type,
                          "paymentTransactionId",
                          Number((e.target as HTMLInputElement).value)
                        );
                    }
                  }}
                  disable={recieptIdDisable}
                />
              </div>
            ))}
          </div>
          <div className={styles.separator}></div>
        </>
      )}

      <div className={eleStyles.inputDetails}>
        <DsTextField
          containerClasses={styles.feeFields}
          maxLength={10}
          disable={amountDisable}
          initialValue={
            tenderData.tenderFees
              .find((x) => x.feesType == type)
              ?.amount?.toString() || ""
          }
          label={"Amount"}
          inputType="positiveInteger"
          onBlur={(e) =>
            updateTenderFee(
              type,
              "amount",
              Number((e.target as HTMLInputElement).value)
            )
          }
        ></DsTextField>
        {/* </div> */}
        {/* <div className={styles.fieldColors}> */}
        <DsSingleSelect
          containerClasses={styles.feeFields}
          id={id + "_paidType1"}
          disable={paidByDisable}
          selectedOption={selectedPaidBy}
          options={depositeDocuments}
          label="Paid by"
          placeholder={"Please select here"}
          setSelectOption={(option) => {
            if (typeof option.value == "string") {
              updateTenderFee(type, "paidBy", option.value);
            }
          }}
        ></DsSingleSelect>
        {/* </div> */}
        {/* <div className={styles.fieldColors}> */}
        <DsSingleSelect
          containerClasses={styles.feeFields}
          selectedOption={selectedPaymentMode}
          id={id + "_modes1"}
          disable={modesDisable}
          options={mode}
          label="Modes"
          placeholder={"Please search and select here"}
          setSelectOption={(option) => {
            if (typeof option.value == "string") {
              updateTenderFee(type, "paymentMode", option.value);
            }
          }}
        ></DsSingleSelect>
        {/* </div> */}
        {/* <div className={styles.fieldColors}> */}
        <DsSingleSelect
          containerClasses={styles.feeFields}
          selectedOption={selectedRefund}
          disable={refundEligibilityDisable}
          id={id + "_refund"}
          options={refund}
          label="Refund Eligibility"
          setSelectOption={(option) => {
            if (typeof option.value == "string") {
              updateTenderFee(type, "refundEligibility", option.value);
            }
          }}
        ></DsSingleSelect>
        {/* </div> */}

        {/* <div className={styles.fieldColors}> */}
        <DatePicker
          containerClasses={styles.feeFields}
          disable={PaymentdueDateDisable}
          id={id + "dueDate"}
          minDate={dueDateMin}
          initialDate={
            tenderData.tenderFees.find((x) => x.feesType == type)
              ?.paymentDueDate
              ? new Date(
                  tenderData.tenderFees.find((x) => x.feesType == type)
                    ?.paymentDueDate || ""
                ).toLocaleDateString("en-GB")
              : undefined
          }
          placeholder="DD/MM/YYYY"
          label="Due Date"
          setDateValue={(date) => {
            if (date instanceof Date) {
              updateTenderFee(type, "paymentDueDate", getTodayDate(date));
            }
          }}
        />
        {/* </div> */}
      </div>
      <div className={styles.notes}>
        <span className={styles.notesTitle}>Notes</span>
        {/* <div className={styles.fieldColors}> */}
        <TextArea
          containerClasses={styles.feeFields}
          className={styles.notesField}
          initialValue={
            tenderData.tenderFees.find((x) => x.feesType == type)
              ?.instructionNotes || ""
          }
          placeholder="Please type here"
          disable={instructionNotesDisable}
          minRows={2}
          onBlur={(e) => {
            updateTenderFee(
              type,
              "instructionNotes",
              (e.target as HTMLInputElement).value
            );
          }}
        />
        {/* </div> */}
      </div>
      <div>
        <DsCsvUpload
          id={id + "UploadedDocuments"}
          label="Attach File"
          buttonViewStyle="btnText"
          disable={attachFileButtonDisable}
          buttonSize="btnSmall"
          startIcon={<IconFactory name="fileAttach" />}
          previouslySelectedFile={
            tenderData.tenderDocuments
              ?.filter(
                (x) =>
                  x.documentCategory == type &&
                  x.documentType == type + "_INSTRUCTION"
                // &&
                // x.id !== undefined
              )
              .map((x) => {
                return {
                  ...x,
                  fileDownloadHref: downloadDocumentUrl(tenderData.id, x.id),
                };
              }) || []
          }
          onSelectedFileChange={(files) => {
            const typeDocuments =
              tenderData.tenderDocuments?.filter(
                (x) =>
                  x.documentCategory == type &&
                  x.documentType == type + "_INSTRUCTION"
              ) || [];
            updateDocuments(
              files,
              typeDocuments,
              removeTenderDocument,
              addNewTenderDocument,
              type + "_INSTRUCTION",
              type
            );
          }}
        ></DsCsvUpload>
      </div>
      {recoverycheckvisibible && (
        <>
          <div className={styles.separator}></div>

          <Ds_checkbox
            disable={paymentRecoveredDisable}
            id={"paymentrefund"}
            name={"Payment Recovered "}
            value={"Payment Recovered"}
            label={"Payment Recovered"}
            onChange={(e) => {
              updateTenderFee(
                type,
                "paymentRefundStatus",
                e.target.checked ? "DONE" : "PEND"
              );
            }}
          />

          <div className={eleStyles.inputDetails}>
            <div className={styles.fields}>
              <DatePicker
                containerClasses={styles.feeFields}
                disable={paymentRecoverdDateDisable}
                id={id + "recoverypayment"}
                initialDate={
                  tenderData.tenderFees
                    ? new Date(
                        tenderData.tenderFees[0]?.paymentRefundDate || ""
                      ).toLocaleDateString("en-GB")
                    : undefined
                }
                maxDate={new Date()}
                placeholder="DD/MM/YYYY"
                label="Payment Date"
                setDateValue={(date) => {
                  if (date instanceof Date) {
                    updateTenderFee(
                      type,
                      "paymentRefundDate",
                      getTodayDate(date)
                    );
                  }
                }}
              />
            </div>
          </div>
          <div className={styles.notes}>
            <span className={styles.notesTitle}>Notes</span>

            <TextArea
              containerClasses={styles.feeFields}
              className={styles.notesField}
              initialValue={
                tenderData.tenderFees.find((x) => x.feesType == type)
                  ?.instructionNotes || ""
              }
              placeholder="Please type here"
              disable={recoveredNotesDisable}
              minRows={2}
              onBlur={(e) => {
                updateTenderFee(
                  type,
                  "refundNotes",
                  (e.target as HTMLInputElement).value
                );
              }}
            />
          </div>
          <div className={styles.uploadfile}>
            <DsCsvUpload
              disable={recoveredAttachFileButton}
              id={id + "uploadrefundDocument"}
              label="Attach File"
              buttonViewStyle="btnText"
              buttonSize="btnSmall"
              startIcon={<IconFactory name="fileAttach" />}
              previouslySelectedFile={
                tenderData.tenderDocuments
                  ?.filter(
                    (x) =>
                      x.documentCategory == type &&
                      x.documentType == type + "_INSTRUCTION"
                    // &&
                    // x.id !== undefined
                  )
                  .map((x) => {
                    return {
                      ...x,
                      fileDownloadHref: downloadDocumentUrl(
                        tenderData.id,
                        x.id
                      ),
                    };
                  }) || []
              }
              onSelectedFileChange={(files) => {
                const typeDocuments =
                  tenderData.tenderDocuments?.filter(
                    (x) =>
                      x.documentCategory == type &&
                      x.documentType == type + "_INSTRUCTION"
                  ) || [];
                updateDocuments(
                  files,
                  typeDocuments,
                  removeTenderDocument,
                  addNewTenderDocument,
                  type + "_INSTRUCTION",
                  type
                );
              }}
            ></DsCsvUpload>
          </div>
        </>
      )}
    </>
  );
};

export default DsFeesDocument;
