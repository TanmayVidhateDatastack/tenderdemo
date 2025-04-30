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
import { getAllMetaData, paidBys } from "@/Common/helpers/constant";
import fetchData from "@/Common/helpers/Method/fetchData";
import { useEffect, useState } from "react";
import IconFactory from "@/Elements/IconComponent";
import DsMultiSelect from "@/Elements/DsComponents/dsSelect/dsMultiSelect";
import { getYesterdayDate } from "@/Common/helpers/Method/conversion";
import UploadFile from "@/TenderComponents/TenderLogComponents/uploadfile";
import Tryfolder from "@/app/Tender/tryfolder/tryfolder";
import { closeAllContext } from "@/Elements/DsComponents/dsContextHolder/dsContextHolder";

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
  documents: tenderDocument[];
};

export interface DsFeesProps {
  title: string;
  id: string;
  mode: DsSelectOption[];
  refund: DsSelectOption[];
  paidBy: DsSelectOption[];
  downloadVisible: boolean;
  completedpayment:boolean
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
 
  optionlist,
  completedpayment=false,
}) => {
  const {
    updateTenderFee,
    addNewTenderDocument,
    tenderData,
    removeTenderDocument,
  } = useTenderData();
  const metaDataTypes = [
    "TENDER_EMD_PAYMENT",
    "TENDER_FEES_PAYMENT",
    "TENDER_PSD_PAYMENT",
    "FEES_TYPE",
  ];
  const [depositeDocuments, setDepositeDocuments] = useState<DsSelectOption[]>(
    []
  );
  const [selectedPaymentMode, setSelectedPaymentMode] =
    useState<DsSelectOption>();
  const [selectedRefund, setSelectedRefund] = useState<DsSelectOption>();
  const [selectedPaidBy, setSelectedPaidBy] = useState<DsSelectOption>();
  const [selectedcheckbox, setSelectedCheckbox] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<DsSelectOption[]>([]);

  // const handleFetchpayments = async () => {
  //   try {
  //     const metaData = await fetchData({
  //       url: getAllMetaData,
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "x-tender-codes": JSON.stringify(metaDataTypes),
  //       },
  //     });
  //     if (metaData.code === 200) {
  //       const result = metaData.result;
  //       console.log("MetaData ", result);

  //       let tenderpayments = [];
      
  //       tenderpayments = result?.tenderEmdPayment || [];

  //       tenderpayments = result?.tenderFeesPayment || [];

  //       tenderpayments = result?.tenderPsdPayment || [];
  //       let  feestype = result?.feesType || [];
  //       console.log("feestype is ", feestype[0]);
  //       console.log("tenderpayments", tenderpayments);

  //       const formattedOptions = tenderpayments.map((item: any) => ({
  //         value: item.codeValue,
  //         label: item.codeDescription,
  //       }));

  //       setOptions(formattedOptions);
  //     }
  //   } catch (error) {
  //     console.error("Fetch error: ", error);
  //   }
  // };

  // useEffect(() => {
  //   handleFetchpayments();
  // }, []);

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

  return (
    <>
      {/* <div> */}
      <div className={styles.feeContainer} id={id}>
        <div className={styles.headContainer}>
          <div className={styles.headTitle}>{title}</div>
          {/* {downloadVisible && ( */}
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

        {/* // { )} } */}
      </div>
    {completedpayment &&(
      <>
      <Ds_checkbox
        id={"payment"}
        name={"Payment Completed"}
        value={"Payment Completed"}
        label={"Payment Completed"}
      />
      <div className={styles.multipleSelect}>
        <DsMultiSelect
          label="Add document type"
          id={id+"Documents"}
          options={optionlist || []}
          setSelectOptions={(options) => {
            setSelectedOptions(options);
            console.log("Selected options:", options);
          }}
        >
          <div className={styles.addBtn}>
            <DsButton
              label="Add"
              buttonViewStyle="btnContained"
              buttonSize="btnSmall"
              className={styles.addBtn}
              onClick={() => {
                closeAllContext();
                setSelectedCheckbox(true);
                console.log("Add button clicked");
              }}
            />
          </div>
        </DsMultiSelect>
      </div>
      {selectedcheckbox &&
        selectedOptions.map((option, index) => (
          <UploadFile
            key={`upload-${index}`}
            uploadLabel={`Upload ${option.label} here `}
            id={typeof option.value === "string" ? option.value : ""}
          />
        ))}

     
        {selectedcheckbox &&
          selectedOptions.map((option) => (
            <div key="" className={styles.fields}>
              <DsTextField
                containerClasses={styles.feeFields}
                label={`${option.label}  ID`}
              />
            </div>
          ))}
</>
)}
 <div className={eleStyles.inputDetails}>
        <DsTextField
          containerClasses={styles.feeFields}
          maxLength={10}
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
          id={id + "dueDate"}
          minDate={getYesterdayDate()}
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
          disable={false}
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
          buttonSize="btnSmall"
          startIcon={<IconFactory name="fileAttach" />}
          onSelectedFileChange={(files) => {
            const typeDocuments =
              tenderData.tenderDocuments?.filter(
                (x) =>
                  x.documentType == type && x.category == type + "_INSTRUCTION"
              ) || [];
            updateDocuments(
              files,
              typeDocuments,
              removeTenderDocument,
              addNewTenderDocument,
              type,
              type + "_INSTRUCTION"
            );
          }}
        ></DsCsvUpload>
      </div>
      {/* </div> */}
    </>
  );
};

export default DsFeesDocument;
