import DsDataList from "@/Elements/DsComponents/DsInputs/dsDatalist";
import DsTextField from "@/Elements/DsComponents/DsInputs/dsTextField";
import DsSingleSelect from "@/Elements/DsComponents/dsSelect/dsSingleSelect";
import styles from "@/app/Tender/[TenderId]/tenderOrder.module.css"
import { useEffect, useState } from "react";
import { getAllMetaData, searchCustomerURL } from "@/helpers/constant";
import fetchData from "../../../helpers/Method/fetchData";
import {datalistOptions,searchCustomers,tenderDetailsProps} from "@/helpers/types"; 
import { useTenderData } from "../TenderDataContextProvider";
import { debounce } from "@/helpers/Method/optimization";
import DsDatePicker from "@/Elements/DsComponents/DsDatePicker/DsDatePicker";

const DsTenderDetails: React.FC<tenderDetailsProps> = ({ tenderDetails }) => { 

  const [customers, setCustomers] = useState<searchCustomers[]>([]); 
  const [dataListOption, setDataListOption] = useState<datalistOptions[]>(); 
  const { updateTenderData } = useTenderData();
 
  const handleFetch = async (searchTerm: string) => {
    try {
      await fetchData({ url: searchCustomerURL + searchTerm }).then((res) => { 
        if ((res.code = 200)) {
          setCustomers(res.result); 
        } else { 
          console.error(
            "Error fetching data: ", 
            res.message || "Unknown error" 
          );
        }
      });
    } catch (error) {
      console.error("Fetch error: ", error);
    }
  };
  useEffect(() => {
    if (customers.length > 0) {
      const opt = customers.map((customer) => {
        return {
          attributes: {},
          id: customer.id.toString(),
          value: customer.code + "-" + customer.name,
        };
      });
      setDataListOption(opt);
    }
  },[customers]);

  return ( 
    <> 
    
      <div className={styles.inputDetails}>
          <DsDataList
            // placeholder="Please search and select here" 
            label="Select Customer"  
            id="customerSelect"
            dataListId="customer-list"
            disable={false}
            className={styles.datalist}
            onOptionSelect={(option) => {
              if (typeof option.value == "number") {  
                updateTenderData("customerId", option.value);
              }
            }} 
            onKeyUp={debounce(async (e: React.KeyboardEvent<HTMLElement>) => {
              const input = e.target as HTMLInputElement;
              const searchTerm = input.value;
              if (searchTerm.trim().length > 3) {
                handleFetch(searchTerm);
              }
            }, 500)} 
            options={dataListOption} 
          ></DsDataList>

          <DsTextField
            // placeholder={"Please Type Here"}
            label={"Customer Location"}
            onChange={(e) =>
              updateTenderData("customerLocationId", e.target.value)
            }
          ></DsTextField>

          <DsTextField
            label="Tender Number"
            // placeholder="Please Type Here"
            onChange={(e) => updateTenderData("tenderNumber", e.target.value)}
          ></DsTextField>  

          <DsSingleSelect
            options={tenderDetails.tenderType}
            // label="Tender Type"
            placeholder={"Tender Type"} 
            id={"tenderType"}
            setSelectOption={(option) => {
              if (typeof option.value == "string") { 
                updateTenderData("tenderType", option.value);
              } 
            }}
          ></DsSingleSelect>
           <DsDatePicker
              id={"issueDate"} 
              initialDate={""} 
              className={""}
              // setDateValue={(date) => { 
              //   updateOrderDataField("transportationDate", convertDateFormat(date));
              // }}
              // disable={true}
              placeholder="DD/MM/YYYY"
              label="Tender issue date" 
              onChange={(e) =>
                updateTenderData("issueDate", e.target.value)
              }
            />  
            <DsDatePicker    
              id={"lastPurchaseDate"}
              initialDate={""} 
              className={""}
              // setDateValue={(date) => { 
              //   updateOrderDataField("transportationDate", convertDateFormat(date));
              // }}
              // disable={true}
              placeholder="DD/MM/YYYY"
              label="Last date of purchasing"
              onChange={(e) =>
                updateTenderData("lastPurchaseDate", e.target.value)
              }
            /> 
            <DsDatePicker
              id={"submissionDate"}
              initialDate={""} 
              className={""}
              // setDateValue={(date) => { 
              //   updateOrderDataField("transportationDate", convertDateFormat(date));
              // }}
              // disable={true}
              placeholder="DD/MM/YYYY"
              label="Submission Date"
              onChange={(e) =>
                updateTenderData("submissionDate", e.target.value)
              }
            /> 
          <DsDatePicker
              id={"rateContractValidity"} 
              initialDate={""} 
              className={""}
              // setDateValue={(date) => { 
              //   updateOrderDataField("transportationDate", convertDateFormat(date));
              // }}
              // disable={true}
              placeholder="DD/MM/YYYY"
              label="Rate contract validity"
              onChange={(e) => 
                updateTenderData("rateContractValidity", e.target.value)  
              }
            />  
          <DsSingleSelect
            options={tenderDetails.submissionMode}
            // type={"single"}
            label="Submission Mode"
            // placeholder={"Please Select Here"}
            id={"submissionMode"}
            setSelectOption={(option) => {
              if (typeof option.value == "string") {
                updateTenderData("submissionMode", option.value);
              }
            }}
          ></DsSingleSelect>
          <DsTextField
            label={"Delivery Period"}
            // placeholder={"Please type or select"}
            onChange={(e) => updateTenderData("deliveryPeriod", e.target.value)}
          ></DsTextField>

          <DsTextField
            label={"Extended Delivery Period"}
            // placeholder={"Please type or select"}
            inputType={"number"}
            onChange={(e) =>
              updateTenderData("extendedDeliveryPeriod", e.target.value)
            }
          ></DsTextField>

          <DsTextField
            label="Penalty for last delivery purchase %"
            // placeholder="Please type here"
            onChange={(e) =>
              updateTenderData("lateDeliveryPenalty", e.target.value)
            }
          ></DsTextField>

          <DsTextField
            label="Tender site/url"
            // placeholder="Please type here"
            onChange={(e) => updateTenderData("tenderURL", e.target.value)}
          ></DsTextField>
          
      </div>
    </>       
  );
};               
     
export default DsTenderDetails;  