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
  
  return (
    <>
      <div className={styles.inputDetails}>
        <div className={deptStyle.fields}>
          <CustomerSearch
            customer={""}
            orderData={undefined}
            setCustomerLocations={setCustomerLocations}
            // updateTenderData={updateTenderData}
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
              id: addr.id.toString(), 
              value: `${addr.city}, ${addr.state}, ${addr.pinCode}`,
              label: `${addr.city}, ${addr.state}, ${addr.pinCode}`, 
              key: addr.id.toString(),
            }))}
            setSelectOption={(option) => {
              if (typeof option.value == "string") {
                updateTenderData("customerLocationId", option.value);
                // console.log("customerLocationId",option.value)
              }
            }}           
          /> 
        </div>
        <div className={deptStyle.fields}>
          <DsTextField
            label="Tender Number"
            // placeholder="Please Type Here"  
            onChange={(e) => updateTenderData("tenderNumber", e.target.value)}
          ></DsTextField>
        </div> 
        <div className={deptStyle.fields}>
          <DsSingleSelect
            options={tenderDetails.tenderType}
            // label="Tender Type"
            placeholder={"Tender Type"}
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
            id={"submissionDate"}
            setDateValue={(date) => {
              if (date instanceof Date) {
                updateTenderData("submissionDate", getTodayDate(date));
              }
            }}
            // disable={true}
            placeholder="DD/MM/YYYY"
            label="Submission Date"
          />
        </div>
        <div className={deptStyle.fields}>
          {/* <DsDatePicker
            id={"rateContractValidity"}
            setDateValue={(date) => {
              if (date instanceof Date) {
                updateTenderData("rateContractValidity", getTodayDate(date));
              } 
            }}
            placeholder="DD/MM/YYYY" 
            label="Rate contract validity"
          /> */}
          <DsTextField
            inputType="number"
            label="Rate contract validity"
            onChange={(e) =>
              updateTenderData("rateContractValidity", e.target.value)
            }
          ></DsTextField>
        </div>
        <div className={deptStyle.fields}>
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
        </div>
        <div className={deptStyle.fields}>
          <DsTextField
           inputType="number"
            label={"Delivery Period ( In days )"}
            // placeholder={"Please type or select"}
            onChange={(e) => updateTenderData("deliveryPeriod", e.target.value)}
          ></DsTextField>
        </div>
        <div className={deptStyle.fields}>
          <DsTextField
            label={"Extended Delivery Period ( In days )"}
            // placeholder={"Please type or select"}
            inputType={"number"}
            onChange={(e) =>
              updateTenderData("extendedDeliveryPeriod", e.target.value)
            }
          ></DsTextField>
        </div>
        <div className={deptStyle.fields}>
          <DsTextField
            label="Penalty for last delivery purchase %"
            inputType="number"
            // placeholder="Please type here"
            onChange={(e) =>
              updateTenderData("lateDeliveryPenalty", e.target.value)
            }
          ></DsTextField>
        </div>
        <div className={deptStyle.fields}>
          <DsTextField
            label="Tender site/url"
            // placeholder="Please type here"
            onChange={(e) => updateTenderData("tenderURL", e.target.value)}
          ></DsTextField>
        </div>
      </div>
    </>
  );
};
export default DsTenderDetails;
