import DsButton from "@/Elements/DsComponents/DsButtons/dsButton";
import DsCsvUpload from "@/Elements/DsComponents/DsButtons/dsCsvUpload";
import Ds_checkbox from "@/Elements/DsComponents/DsCheckbox/dsCheckbox";
import DsTextField from "@/Elements/DsComponents/DsInputs/dsTextField";
import DsSingleSelect from "@/Elements/DsComponents/dsSelect/dsSingleSelect";
import Image from "next/image";
// import downloadReciept from "@/Common/TenderIcons/smallIcons/downloadReciept.svg";
import styles from "./deposite.module.css";
import eleStyles from "./tender.module.css";
import { DsSelectOption } from "@/Common/helpers/types";
import { updateDocuments, useTenderData } from "../TenderDataContextProvider";
import TextArea from "@/Elements/DsComponents/DsInputs/dsTextArea";
import DatePicker from "@/Elements/DsComponents/DsDatePicker/DsDatePicker";
import { paidBys } from "@/Common/helpers/constant";
import fetchData from "@/Common/helpers/Method/fetchData";
import { useEffect, useState } from "react";
import IconFactory from "@/Elements/IconComponent";
import DsMultiSelect from "@/Elements/DsComponents/dsSelect/dsMultiSelect";
import { getYesterdayDate } from "@/Common/helpers/Method/conversion";

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
  paymentDueDate: string;
  notes: string;
  documents: tenderDocument[];
};

export interface DsFeesProps {
  title: string;
  id: string;
  mode: DsSelectOption[];
  paidBy: DsSelectOption[];
  downloadVisible: boolean;
  paymentCompletedVisible: boolean;
  type: string;
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
  paidBy,
  downloadVisible,
  paymentCompletedVisible,
}) => {
  const {
    updateTenderFee,
    addNewTenderDocument,
    tenderData,
    removeTenderDocument,
  } = useTenderData();

  const [depositeDocuments, setDepositeDocuments] = useState<DsSelectOption[]>(
    []
  );

  const [selectedPaymentMode, setSelectedPaymentMode] =
    useState<DsSelectOption>();


  const [selectedPaidBy, setSelectedPaidBy] =
    useState<DsSelectOption>();


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
        console.log("Fetched Notes Values are", tenderData.tenderFees.find((x) => x.feesType == type)?.instructionNotes);
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
  }, [tenderData.tenderFees.find((x) => x.feesType == type)]);


  return (
    <>
      <div>
        <div className={styles.emdContainerHead} id={id}>
          <div>{title}</div>
          {/* {downloadVisible && ( */}
          <DsButton
            className={styles.downloadreciept}
            label="Download Reciept"
            disable={true}
            startIcon={<IconFactory name="downloadReciept" />}
          />
          {/* // { )} } */}
        </div>
        <div>
          {paymentCompletedVisible && (
            <>
              <div>
                <Ds_checkbox
                  id={"payment"}
                  name={"Payment Completed"}
                  value={"Payment Completed"}
                  label={"Payment Completed"}
                />
              </div>
              <div className={eleStyles.inputDetails}>
                <DsMultiSelect
                  label="Add document type"
                  id={"Documents"}
                  options={[
                    {
                      label: "EMD Acknowledgement Receipt",
                      value: "EMD_Acknowledgement_Receipt",
                    },
                    {
                      label: "EMD Fund Transfer Confirmation",
                      value: "EMD_Fund_Transfer_Confirmation",
                    },
                    { label: "EMD Transaction", value: "EMD_Transaction" },
                    {
                      label: "EMD Payment Receipt",
                      value: "EMD_Payment_Receipt",
                    },
                  ]}
                ></DsMultiSelect>
                <div>
                  <DsButton
                    label="Add"
                    buttonViewStyle="btnContained"
                    buttonSize="btnSmall"
                    className={styles.addBtn}
                    onClick={() => {}}
                  />
                </div>
              </div>
            </>
          )}
        </div>
        <div className={eleStyles.inputDetails}>
          <div className={styles.fieldColors}>
            <DsTextField
              maxLength={10}
              initialValue={
                tenderData.tenderFees
                  .find((x) => x.feesType == type)
                  ?.amount.toString() || ""
              }
              label={"Amount"}
              inputType="positive"
              onBlur={(e) =>
                updateTenderFee(
                  type,
                  "amount",
                  Number((e.target as HTMLInputElement).value)
                )
              }
            ></DsTextField>
          </div>
          <div className={styles.fieldColors}>
            <DsSingleSelect
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
          </div>
          <div className={styles.fieldColors}>
            <DsSingleSelect
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
          </div>
          <div className={styles.fieldColors}>
            <DatePicker
              id={id + "dueDate"}
              minDate={getYesterdayDate()}
              initialDate={new Date(
                tenderData.tenderFees.find((x) => x.feesType == type)
                  ?.paymentDueDate || ""
              ).toLocaleDateString("en-GB")}
              placeholder="DD/MM/YYYY"
              label="Due Date"
              setDateValue={(date) => {
                if (date instanceof Date) {
                  updateTenderFee(type, "paymentDueDate", getTodayDate(date));
                }
              }}
            />
          </div>
        </div>

        <div className={styles.notes}>
          <h4>Notes</h4>
          <div className={styles.fieldColors}>
            <TextArea
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
          </div>
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
                    x.documentType == type &&
                    x.category == type + "_INSTRUCTION"
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
      </div>
    </>
  );
};

export default DsFeesDocument;
