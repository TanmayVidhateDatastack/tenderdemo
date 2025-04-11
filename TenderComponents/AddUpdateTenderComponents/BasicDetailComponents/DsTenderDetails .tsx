import DsTextField from "@/Elements/DsComponents/DsInputs/dsTextField";
import DsSingleSelect from "@/Elements/DsComponents/dsSelect/dsSingleSelect";
import styles from "@/app/Tender/[TenderId]/tenderOrder.module.css";
import deptStyle from "./deposite.module.css";
import { useEffect, useState } from "react";
import {getTenderUserRoles} from "@/Common/helpers/constant";
import {tenderDetailsProps,location} from "@/Common/helpers/types";
import { useTenderData } from "../TenderDataContextProvider";
import DsDatePicker from "@/Elements/DsComponents/DsDatePicker/DsDatePicker";
import DsButton from "@/Elements/DsComponents/DsButtons/dsButton";
import Image from "next/image";
import fetchData from "@/Common/helpers/Method/fetchData";
import copybtnenabled from "@/Common/TenderIcons/smallIcons/copyEnabled.svg";
import DsAddressSelect from "@/Elements/DsComponents/dsSelect/dsAddressSelect";
import CustomerSearch from "./customerSearch";

const DsTenderDetails: React.FC<tenderDetailsProps> = ({ tenderDetails }) => {
  const [fetchVisible, setFetchVisible] = useState(true);
  const [role, setRole] = useState("checker"); 
  const [pos, setPos] = useState<
    | "top"
    | "topleft"
    | "topright" 
    | "middle"
    | "bottom"
    | "bottomleft"
    | "bottomright"
  >("bottom");
  
  const [notiType, setNotiType] = useState<
    "success" | "bonus" | "info" | "error"
  >("info");
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const { updateTenderData } = useTenderData();
  const [customerLocations, setCustomerLocations] = useState<location[]>([]); 
  // const [customerIdName, setCustomerIdName] = useState<string>("");

  const handleRoleFetch = async () => {
    try {
      const res = await fetchData({ url: getTenderUserRoles });
      if (res.code === 200) {
        const result = res.result;
        if (result) {
          setRole(result.roleName);
        }
      } else { 
        console.error("Error fetching data: ", res.message || "Unknown error");
      } 
    } catch (error) {
      console.error("Fetch error: ", error);
    }
  };
  useEffect(() => {
    handleRoleFetch();
  }, []);
  useEffect(() => {
    if (role == "MAKER") {
      setFetchVisible(true);
    } else { 
      setFetchVisible(false);
    }
  }, [role]);

  

  const getTodayDate = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  }; 

  const urlRegex = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(:\d+)?(\/[^\s]*)?$/; 
  
  return (
    <>
      <div className={styles.inputDetails}>
        <div className={deptStyle.fields}>
          <CustomerSearch
            customer={""}
            orderData={undefined} 
            setCustomerLocations={setCustomerLocations}
            updateTenderData={updateTenderData}
          />
        </div>

        <div className={deptStyle.fields}>
          {fetchVisible && (
            <DsButton 
              id="copyBtn"
              label="Fetch Information"
              buttonViewStyle="btnText" 
              buttonSize="btnSmall"
              className={deptStyle.copyBtn}
              startIcon={<Image src={copybtnenabled} alt="copy" />}
              // disable
              onClick={() => { 
                setShowNotification(true); 
                setPos("top");
                setNotiType("info"); 
              }} 
            ></DsButton>
          )}
        </div>
        <div className={deptStyle.fields}>
          <DsSingleSelect 
            id="CustomerAddress"
            placeholder="Select Customer Location" 
            options={customerLocations.map((addr) => ({
              value: addr.id.toString(), 
              
              label: `${addr.city}, ${addr.state}, ${addr.pinCode}`, 
              key: addr.id.toString(),
            }))}
            setSelectOption={(option) => {
              if (typeof option.value == "string") {
                updateTenderData("customerAddressId", option.value); 
                updateTenderData("tenderDetails.customerAddressName", option.label

                ); 
                
                // console.log("customerLocationId",option.value)
              }
            }}           
          /> 
        </div>
        <div className={deptStyle.fields}>
          <DsTextField
            initialValue=""
            maxLength={50}
            label="Tender number"
            // placeholder="Please Type Here"  
            onBlur={(e) => updateTenderData("tenderNumber", (e.target as HTMLInputElement).value)}
          ></DsTextField>
        </div> 
        <div className={deptStyle.fields}>
          <DsSingleSelect
            options={tenderDetails.tenderType} 
            label="Tender type"
            // placeholder={"Tender type"}
            id={"tenderType"}
            setSelectOption={(option) => {
              if (typeof option.value == "string") {
                updateTenderData("tenderType", option.value);
                console.log("tendertype", option.value);
              }
            }}
          ></DsSingleSelect>
        </div>
        <div className={deptStyle.fields}>
          <DsDatePicker
            maxDate={new Date()}
            id={"issueDate"}
            setDateValue={(date) => {
              if (date instanceof Date) {
                updateTenderData("issueDate", getTodayDate(date));
              }
            }}
            // disable={true}
            placeholder="DD/MM/YYYY"
            label="Tender issue date"
          />
        </div>
        <div className={deptStyle.fields}>
          <DsDatePicker
            minDate={new Date()}
            id={"lastPurchaseDate"}
            setDateValue={(date) => {
              if (date instanceof Date) {
                updateTenderData("lastPurchaseDate", getTodayDate(date));
              }
            }}
            // disable={true}
            placeholder="DD/MM/YYYY"
            label="Last date of purchasing"
          />
        </div>
        <div className={deptStyle.fields}>
          <DsDatePicker
            minDate={new Date()}
            id={"submissionDate"}
             setDateValue={(date) => {
              if (date instanceof Date) {
                updateTenderData("submissionDate", getTodayDate(date));
              }
            }}
            // disable={true}
            placeholder="DD/MM/YYYY"
            label="Submission date"
          />
        </div>
        <div className={deptStyle.fields}>
          <DsTextField
            maxLength={6}
            initialValue=""
            inputType="positive"
            label="Rate contract validity"
            onBlur={(e) =>
              updateTenderData("rateContractValidity", (e.target as HTMLInputElement).value)
            }
          ></DsTextField>
        </div>
        <div className={deptStyle.fields}>
          <DsSingleSelect
            options={tenderDetails.submissionMode}
            // type={"single"}
            label="Submission Mode"
            id={"submissionMode"}
            setSelectOption={(option) => {
              if (typeof option.value == "string") {
                updateTenderData("submissionMode", option.value);
              }
            }}
          ></DsSingleSelect>
        </div>
        <div className={deptStyle.fields}>
          <DsTextField
            maxLength={5}
            initialValue=""
            inputType="positive"
            label={"Delivery period (In days)"}  
            // placeholder={"Please type or select"}
            onBlur={(e) => updateTenderData("deliveryPeriod",(e.target as HTMLInputElement).value)}
          ></DsTextField>
        </div>
        <div className={deptStyle.fields}>
          <DsTextField
            maxLength={5}
            initialValue=""
            inputType="positive"
            label={"Extended delivery period (In days)"}
            // placeholder={"Please type or select"}
            onBlur={(e) =>
              updateTenderData("extendedDeliveryPeriod", (e.target as HTMLInputElement).value)
            }
          ></DsTextField>
        </div>
        <div className={deptStyle.fields}>
          <DsTextField
             maxLength={3}
             initialValue=""
             label="Penalty for late delivery %"
             inputType="positive"
            // placeholder="Please type here"
            onBlur={(e) =>
              updateTenderData("lateDeliveryPenalty", (e.target as HTMLInputElement).value)
            }
          ></DsTextField>
        </div>
        <div className={deptStyle.fields}>
          <DsTextField
            maxLength={2000}
            initialValue=""
            label="Tender site/url"
            // placeholder="Please type here"
            onBlur={(e) => updateTenderData("tenderURL", (e.target as HTMLInputElement).value)}
          ></DsTextField>
        </div>
      </div>
    </>
  );
};
export default DsTenderDetails;
