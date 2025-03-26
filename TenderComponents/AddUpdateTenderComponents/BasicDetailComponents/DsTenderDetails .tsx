
import DsTextField from "@/Elements/DsComponents/DsInputs/dsTextField";
import DsSingleSelect from "@/Elements/DsComponents/dsSelect/dsSingleSelect";
import styles from "@/app/Tender/[TenderId]/tenderOrder.module.css";
import deptStyle from "./deposite.module.css"; 
import { useEffect, useState } from "react";
import {  getTenderUserRoles } from "@/Common/helpers/constant";
import {
  datalistOptions, 
  searchCustomers,
  tenderDetailsProps, 
} from "@/Common/helpers/types";    
import { useTenderData } from "../TenderDataContextProvider";

import DsDatePicker from "@/Elements/DsComponents/DsDatePicker/DsDatePicker"; 
import DsButton from "@/Elements/DsComponents/DsButtons/dsButton";
import Image from "next/image"; 
import fetchData from "@/Common/helpers/Method/fetchData";
import copybtnenabled from "@/Common/TenderIcons/smallIcons/copyEnabled.svg"
import DsAddressSelect from "@/Elements/DsComponents/dsSelect/dsAddressSelect";
import CustomerSearch from "./customerSearch";

const DsTenderDetails: React.FC<tenderDetailsProps> = ({ tenderDetails }) => {
  const [customers, setCustomers] = useState<searchCustomers[]>([]); 
  const [dataListOption, setDataListOption] = useState<datalistOptions[]>();
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

  // const handleFetch = async (searchTerm: string) => {
  //   try {
  //     await fetchData({ url: customerSearch + searchTerm }).then((res) => {
  //       if ((res.code = 200)) {
  //         setCustomers(res.result); 
  //       } else {
  //         console.error(
  //           "Error fetching data: ",
  //           res.message || "Unknown error"
  //         );
  //       } 
  //     }); 
  //   } catch (error) {
  //     console.error("Fetch error: ", error); 
  //   }
  // };
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

  // useEffect(() => {
  //   if (customers.length > 0) {
  //     const opt = customers.map((customer) => {
  //       return {
  //         attributes: {},
  //         id: customer.id.toString(),
  //         value: customer.code + "-" + customer.name,
  //       };
  //     });
  //     setDataListOption(opt);
  //   }
  // }, [customers]);  
  const getTodayDate = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Ensure two digits
    const day = date.getDate().toString().padStart(2, "0"); // Ensure two digits

    return `${year}-${month}-${day}`;
  };

  return (
    <>
      <div className={styles.inputDetails}>
        <div className={deptStyle.fields}>

          {/* <DsDataList
            // placeholder="Please search and select here"
            label="Select Customer"
            id="customerSelect"
            dataListId="customer-list"
            disable={false}
            className={styles.datalist}
            onOptionSelect={(option) => {
              if (typeof option.value == "string") {
                updateTenderData("customerId", option.value);
              }
            }}
            onKeyUp={debounce(async (e: React.KeyboardEvent<HTMLElement>) => {
              const input = e.target as HTMLInputElement;
              const searchTerm = input.value;
              if (searchTerm.trim().length > 2) { 
                handleFetch(searchTerm);
              }
            }, 500)}
            options={dataListOption}
            onChange={customerSearch}
          ></DsDataList> */}
          
            <CustomerSearch  
              customer={""} 
              orderData={undefined}>
            </CustomerSearch>
        </div>
 
        <div className={deptStyle.fields}>
          {/* <DsButton label="Fetch Information" startIcon={<Image src={copybtndisabled} alt="fetch information" />} buttonViewStyle="btnText" buttonSize="btnMedium" disable /> */}
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
          {/* <DsTextField
            // placeholder={"Please Type Here"}
            label={"Customer Location"}
            onChange={(e) =>
              updateTenderData("customerLocationId", e.target.value)
            }
          ></DsTextField> */}

          <DsAddressSelect 
           id={"CustomerAddress"}
           placeholder={"Customer Location"} 
           options={[ 
            {
              value: "PAID_BY_IPCA",
              label: "Paid By Ipca",
            },
            {
              value: "PAID_BY_STOCKIEST",
              label: "Paid By Stockiest",
            }]}>
          </DsAddressSelect>
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
            onChange={(e) => updateTenderData("rateContractValidity", e.target.value)}
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