"use client";
import { DsSelectOption } from "@/Common/helpers/types";
import DsButton from "@/Elements/DsComponents/DsButtons/dsButton";
import DsTextField from "@/Elements/DsComponents/DsInputs/dsTextField";
import DsMultiSelect from "@/Elements/DsComponents/dsSelect/dsMultiSelect";
import UploadFile from "@/TenderComponents/TenderLogComponents/uploadfile";
import React, { useEffect, useState } from "react";
import styles from "./trypage.module.css";

import Ds_checkbox from "@/Elements/DsComponents/DsCheckbox/dsCheckbox";
import fetchData from "@/Common/helpers/Method/fetchData";
import { getAllMetaData } from "@/Common/helpers/constant";

const Tryfolder = () => {
  const metaDataTypes = [
    "TENDER_EMD_PAYMENT",	"TENDER_FEES_PAYMENT",	"TENDER_PSD_PAYMENT"
  ];
  const [selectedcheckbox, setSelectedCheckbox] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<DsSelectOption[]>([]);
  const [options, setOptions] = useState<DsSelectOption[]>([]);
  const handleFetchpayments = async () => {
    try {
        const metaData = await fetchData({
            url: getAllMetaData,
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-tender-codes": JSON.stringify(metaDataTypes),
            },
        });
        if (metaData.code === 200) {
            const result = metaData.result;
            console.log("MetaData ", result);

            let tenderpayments = [];
           
            tenderpayments = result?.tenderEmdPayment || [];
              
            
            tenderpayments = result?.tenderFeesPayment || [];
               
        
            tenderpayments = result?.tenderPsdPayment || [];
               
            
            console.log("tenderpayments", tenderpayments);

            const formattedOptions = tenderpayments.map((item: any) => ({
                value: item.codeValue,
                label: item.codeDescription,
            }));

            setOptions(formattedOptions);
        }
    } catch (error) {
        console.error("Fetch error: ", error);
    }
};

useEffect(() => {
  handleFetchpayments();
}, []);

return (
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
        id={"Documents"}
        options={options} 
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

    <div className={styles.paymentfields}>
      {selectedcheckbox &&
        selectedOptions.map((option) => (
          <div  className={styles.fields}>
            <DsTextField label={`${option.label}  ID`} />
          </div>
        ))}
    </div>
  </>
);
};

export default Tryfolder;
