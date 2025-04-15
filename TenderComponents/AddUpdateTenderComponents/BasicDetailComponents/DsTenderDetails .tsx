import DsTextField from "@/Elements/DsComponents/DsInputs/dsTextField";
import DsSingleSelect from "@/Elements/DsComponents/dsSelect/dsSingleSelect";
import styles from "@/app/Tender/[TenderId]/tenderOrder.module.css";
import deptStyle from "./deposite.module.css";
import { useEffect, useState } from "react";
import {getTenderUserRoles} from "@/Common/helpers/constant";
import {tenderDetailsProps,location, DsSelectOption} from "@/Common/helpers/types";
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
  const { updateTenderData,tenderData } = useTenderData();
  const [customerLocations, setCustomerLocations] = useState<location[]>([]); 
  
  // const [cust, setCust] = useState<DsSelectOption>();
  //     value:
  //     label:
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
            customer={tenderData.tenderDetails.customerName}
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
            selectedOption={{
              label:tenderData.tenderDetails.customerAddressName,
              value:tenderData.customerAddressId.toString()
            }}
            setSelectOption={(option) => {
              if (typeof option.value == "string") {
                updateTenderData("customerAddressId", Number(option.value));
                updateTenderData("tenderDetails.customerAddressName", option.label

                ); 
                
                // console.log("customerLocationId",option.value)
              }
            }}           
          /> 
        </div>
        <div className={deptStyle.fields}>
          <DsTextField
            initialValue={tenderData.tenderNumber}
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
            selectedOption={{
              value:tenderData.tenderType,
              label:tenderData.tenderType,
            }}
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
           initialDate={new Date(tenderData.issueDate).toLocaleDateString("en-GB",)}
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
            initialDate={new Date(tenderData.lastPurchaseDate).toLocaleDateString("en-GB")}
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
            initialDate={new Date(tenderData.submissionDate).toLocaleDateString("en-GB")}
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
            initialValue={tenderData.rateContractValidity}
            inputType="positive"
            label="Rate contract validity"
            onBlur={(e) =>
              updateTenderData("rateContractValidity", (e.target as HTMLInputElement).value)
            }
          ></DsTextField>
        </div>
        <div className={deptStyle.fields}>
          <DsSingleSelect
            selectedOption={{
              value:tenderData.submissionMode,
              label:tenderData.submissionMode,
            }}
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
            initialValue={tenderData.deliveryPeriod.toString()}
            maxLength={5}
            inputType="positive"
            label={"Delivery period (In days)"}  
            // placeholder={"Please type or select"}
            onBlur={(e) => updateTenderData("deliveryPeriod",Number((e.target as HTMLInputElement).value))}
          ></DsTextField>
        </div>
        <div className={deptStyle.fields}>
          <DsTextField
            initialValue={tenderData.extendedDeliveryPeriod.toString()}
            maxLength={5}
            inputType="positive"
            label={"Extended delivery period (In days)"}
            // placeholder={"Please type or select"}
            onBlur={(e) =>
              updateTenderData("extendedDeliveryPeriod",Number((e.target as HTMLInputElement).value))}
          ></DsTextField>
        </div>
        <div className={deptStyle.fields}>
          <DsTextField
             minimumNumber={100} 
             initialValue={tenderData.lateDeliveryPenalty.toString()}
             label="Penalty for late delivery %"
             inputType="positive"
            // placeholder="Please type here"
            onBlur={(e) =>
              updateTenderData("lateDeliveryPenalty", Number((e.target as HTMLInputElement).value))
            }
          ></DsTextField>
        </div>
        <div className={deptStyle.fields}>
          <DsTextField
            maxLength={2000}
            initialValue={tenderData.tenderUrl}
            label="Tender site/url" 
            onBlur={(e) => updateTenderData("tenderUrl", (e.target as HTMLInputElement).value)}
          ></DsTextField>
        </div>
      </div>
    </>
  );
};
export default DsTenderDetails;
