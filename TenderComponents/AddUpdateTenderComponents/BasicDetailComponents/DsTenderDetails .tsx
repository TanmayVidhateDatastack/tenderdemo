import DsTextField from "@/Elements/DsComponents/DsInputs/dsTextField";
import DsSingleSelect from "@/Elements/DsComponents/dsSelect/dsSingleSelect";
import styles from "@/app/Tender/[TenderId]/tenderOrder.module.css";
import deptStyle from "./deposite.module.css";
import { useEffect, useState } from "react";
import { getTenderUserRoles } from "@/Common/helpers/constant";
import {
  // tenderDetailsProps,
  location,
  DsSelectOption,
} from "@/Common/helpers/types";
import { useTenderData } from "../TenderDataContextProvider";
import DsDatePicker from "@/Elements/DsComponents/DsDatePicker/DsDatePicker";
import DsButton from "@/Elements/DsComponents/DsButtons/dsButton";
import fetchData from "@/Common/helpers/Method/fetchData";
import CustomerSearch from "./customerSearch";
import IconFactory from "@/Elements/IconComponent";
import { getYesterdayDate } from "@/Common/helpers/Method/conversion";
import ContextMenu, {
  displayContext,
} from "@/Elements/DsComponents/dsContextHolder/dsContextHolder";
import FetchCustomer from "./fetchcustomerComponent";
const DsTenderDetails: React.FC = () => {
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
  const [showNotification, setShowNotification] = useState<boolean>(true);
  const { updateTenderData, tenderData, tenderDataCopy, metaData } =
    useTenderData();
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
    if (role == "MAKER" && tenderDataCopy.id == undefined) {
      setFetchVisible(true);
    } else {
      setFetchVisible(false);
    }
  }, [role, tenderDataCopy.id]);

  const getTodayDate = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const [selectedTenderType, setSelectedTenderType] =
    useState<DsSelectOption>();
  useEffect(() => {
    const tenderType = tenderData.tenderType;
    if (tenderType) {
      const option = metaData.tenderType.find((x) => x.value == tenderType);
      if (option) setSelectedTenderType(option);
    }
  }, [tenderData.tenderType, metaData.tenderType]);

  const [selectedSubmissionMode, setSelectedSubmissionMode] =
    useState<DsSelectOption>();
  useEffect(() => {
    const submissionMode = tenderData.submissionMode;
    if (submissionMode) {
      const option = metaData.submissionMode.find(
        (x) => x.value == submissionMode
      );
      if (option) setSelectedSubmissionMode(option);
    }
  }, [tenderData.submissionMode, metaData.submissionMode]);

  return (
    <>
      <ContextMenu
        id="contextMenuId5"
        content={
          <div className={styles.ContextCreateNew}>
            <FetchCustomer
              customerId={tenderData.customerId}
              customerName="(Directorate of Health Services)"
            />
          </div>
        }
        showArrow={true}
      />
      <div className={styles.inputDetails}>
        <div className={deptStyle.fields}>
          <CustomerSearch
            customer={tenderData.tenderDetails.customerName}
            orderData={undefined}
            setCustomerLocations={setCustomerLocations}
            updateTenderData={updateTenderData}
          />
        </div>

        {fetchVisible && (
          <div className={deptStyle.fields}>
            <DsButton
              id="copyBtn"
              label="Fetch Information"
              buttonViewStyle="btnText"
              buttonSize="btnSmall"
              disable={tenderData.customerId ? false : true}
              className={deptStyle.copyBtn}
              startIcon={
                <div style={{ width: "0.95625em", height: "1.125em" }}>
                  <IconFactory
                    name="copy"
                    disabled={tenderData.customerId ? false : true}
                  />
                </div>
              }
              // disable
              onClick={(e) => {
                // setShowNotification(true);
                // setPos("top");
                // setNotiType("info");
                displayContext(e, "contextMenuId5", "horizontal", "center");
              }}
            />
          </div>
        )}
        <DsSingleSelect
          containerClasses={styles.fields}
          id="CustomerAddress"
          placeholder="Select Customer Location"
          options={customerLocations.map((addr) => ({
            value: addr.id.toString(),

            label: `${addr.city}, ${addr.state}, ${addr.pinCode}`,
            key: addr.id.toString(),
          }))}
          selectedOption={
            tenderData.customerAddressId &&
            tenderData.tenderDetails.customerAddressName
              ? {
                  label: tenderData.tenderDetails.customerAddressName,
                  value: tenderData.customerAddressId.toString(),
                }
              : undefined
          }
          setSelectOption={(option) => {
            if (typeof option.value == "string") {
              updateTenderData("customerAddressId", Number(option.value));
              updateTenderData(
                "tenderDetails.customerAddressName",
                option.label
              );

              // console.log("customerLocationId",option.value)
            }
          }}
        />
        <DsTextField
          containerClasses={styles.fields}
          initialValue={tenderData.tenderNumber}
          maxLength={50}
          label="Tender number"
          inputType="alphaNumeric"
          // placeholder="Please Type Here"
          onBlur={(e) =>
            updateTenderData(
              "tenderNumber",
              (e.target as HTMLInputElement).value
            )
          }
        ></DsTextField>
        <DsSingleSelect
          containerClasses={styles.fields}
          options={metaData.tenderType||[]}
          label="Tender type"
          // placeholder={"Tender type"}
          id={"tenderType"}
          selectedOption={selectedTenderType}
          setSelectOption={(option) => {
            if (typeof option.value == "string") {
              updateTenderData("tenderType", option.value);
              console.log("tendertype", option.label);
            }
          }}
        ></DsSingleSelect>
        <DsDatePicker
          containerClasses={styles.fields}
          initialDate={
            tenderData.issueDate
              ? new Date(tenderData.issueDate).toLocaleDateString("en-GB")
              : undefined
          }
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
        <DsDatePicker
          containerClasses={styles.fields}
          initialDate={
            tenderData.lastPurchaseDate
              ? new Date(tenderData.lastPurchaseDate).toLocaleDateString(
                  "en-GB"
                )
              : undefined
          }
          minDate={getYesterdayDate()}
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
        <DsDatePicker
          containerClasses={styles.fields}
          initialDate={
            tenderData.submissionDate
              ? new Date(tenderData.submissionDate).toLocaleDateString("en-GB")
              : undefined
          }
          minDate={getYesterdayDate()}
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
        <DsTextField
          containerClasses={styles.fields}
          maxLength={6}
          initialValue={tenderData.rateContractValidity}
          inputType="positiveInteger"
          label="Rate contract validity"
          onBlur={(e) =>
            updateTenderData(
              "rateContractValidity",
              (e.target as HTMLInputElement).value
            )
          }
        ></DsTextField>
        <DsSingleSelect
          containerClasses={styles.fields}
          selectedOption={selectedSubmissionMode}
          options={metaData.submissionMode||[]}
          // type={"single"}
          label="Submission mode"
          id={"submissionMode"}
          setSelectOption={(option) => {
            if (typeof option.value == "string") {
              updateTenderData("submissionMode", option.value);
            }
          }}
        ></DsSingleSelect>
        <DsTextField
          containerClasses={styles.fields}
          initialValue={tenderData.deliveryPeriod?.toString()}
          maxLength={5}
          inputType="positiveInteger"
          label={"Delivery period (In days)"}
          onBlur={(e) =>
            updateTenderData(
              "deliveryPeriod",
              Number((e.target as HTMLInputElement).value)
            )
          }
        />
        <DsTextField
          containerClasses={styles.fields}
          initialValue={tenderData.extendedDeliveryPeriod?.toString()}
          maxLength={5}
          inputType="positiveInteger"
          label={"Extended delivery period (In days)"}
          onBlur={(e) =>
            updateTenderData(
              "extendedDeliveryPeriod",
              Number((e.target as HTMLInputElement).value)
            )
          }
        ></DsTextField>
        <DsTextField
          maximumNumber={100}
          containerClasses={styles.fields}
          maxLength={5}
          initialValue={tenderData.lateDeliveryPenalty?.toString()}
          label="Penalty for late delivery %"
          inputType="positive"
          iconEnd={<pre>{" %"}</pre>}
          onBlur={(e) =>
            updateTenderData(
              "lateDeliveryPenalty",
              Number((e.target as HTMLInputElement).value)
            )
          }
        ></DsTextField>
        <DsTextField
          containerClasses={styles.fields}
          maxLength={2000}
          initialValue={tenderData.tenderUrl}
          label="Tender site/url"
          onBlur={(e) =>
            updateTenderData("tenderUrl", (e.target as HTMLInputElement).value)
          }
        ></DsTextField>
      </div>
    </>
  );
};
export default DsTenderDetails;
