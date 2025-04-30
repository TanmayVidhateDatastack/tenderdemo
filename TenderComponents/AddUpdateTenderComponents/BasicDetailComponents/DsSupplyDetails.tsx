import DsSingleSelect from "@/Elements/DsComponents/dsSelect/dsSingleSelect";
import DsTextField from "@/Elements/DsComponents/DsInputs/dsTextField";
import DsMultiSelect from "@/Elements/DsComponents/dsSelect/dsMultiSelect";
import DsSelectMultiLevel from "@/Elements/DsComponents/dsSelect/dsSelectMultiLevel";
import {
  datalistOptions,
  DsSelectOption,
} from "@/Common/helpers/types";
// import { datalistOptions, supplyDetailsProps } from "@/Common/helpers/types";
import { useTenderData } from "../TenderDataContextProvider";
import styles from "@/app/Tender/[TenderId]/tenderOrder.module.css";
import { useEffect, useState } from "react";
const DsSupplyDetails: React.FC = () => {
  const { updateSupplyCondition, tenderData, tenderDataCopy, metaData } =
    useTenderData();
  const [selectedEligibility, setSelectedEligibility] = useState<
    DsSelectOption[] 
  >([]);
  const [selectedSupplyPoint, setSelectedSupplyPoint] =
    useState<DsSelectOption>();
  const [selectedtTestReportRequired, setSelectedtTestReportRequired] =
    useState<DsSelectOption>();

  // tenderData.tenderSupplyConditions[0].eligibility.map((x) => {
  //   return {
  //     value: x,
  //     label: x,
  //   };
  // },[tenderData.tenderSupplyConditions[0].eligibility]);

  useEffect(() => {
    const supplyPoint = tenderData.tenderSupplyCondition.supplyPoint;
    // if (supplyPoint) {
    const option = (metaData.supplyPoints||[]).find((x) => x.value == supplyPoint);
    setSelectedSupplyPoint(option);
    // }
  }, [
    tenderData.tenderSupplyCondition.supplyPoint,
    tenderData.id,
    metaData?.supplyPoints,
  ]);

  useEffect(() => {
    const testReportRequired =
      tenderData.tenderSupplyCondition.testReportRequired;
    // if (testReportRequired) {
    const option = (metaData.testReportRequired||[]).find(
      (x) => x.value == testReportRequired
    );
    setSelectedtTestReportRequired(option);
    // }
  }, [
    tenderData.tenderSupplyCondition.testReportRequired,
    tenderData.id,
    metaData?.testReportRequired,
  ]);
  useEffect(() => {
    if (tenderData.tenderSupplyCondition.eligibility) {
      const eligibility = [...tenderData.tenderSupplyCondition.eligibility];
      const selectedEl = eligibility.map((x) => {
        return {
          value: x,
          label: x,
        };
      });
      setSelectedEligibility(selectedEl);
    }
  }, [tenderDataCopy.tenderSupplyCondition.eligibility, tenderData.id]);

  return (
    <>
      <div>Supply Conditions </div>
      <div className={styles.my1}>
        <div className={styles.inputDetails}>
          <DsSingleSelect
            containerClasses={styles.fields}
            selectedOption={selectedSupplyPoint}
            options={metaData.supplyPoints||[]}
            label="Supply point"
            placeholder={"Please select here"}
            id={"supplyPoints"}
            setSelectOption={(option) => {
              if (typeof option.value == "string")
                updateSupplyCondition("supplyPoint", option.value);
            }}
          ></DsSingleSelect>
          <DsTextField
            containerClasses={styles.fields}
            maxLength={10}
            initialValue={tenderData.tenderSupplyCondition.consigneesCount?.toString()}
            inputType="positiveInteger"
            label="Provide no. of consignees"
            // placeholder="Please type here"
            onBlur={(e) =>
              updateSupplyCondition(
                "consigneesCount",
                Number((e.target as HTMLInputElement).value)
              )
            }
          ></DsTextField>

          <DsSingleSelect
            containerClasses={styles.fields}
            selectedOption={selectedtTestReportRequired}
            options={metaData.reportRequirements||[]}
            label="Test report requirement"
            placeholder={"Please select here"}
            id={"reportReq"}
            setSelectOption={(option) => {
              if (typeof option.value == "string") {
                updateSupplyCondition("testReportRequired", option.value);
              }
            }}
          ></DsSingleSelect>

          <DsMultiSelect
            //  const selectedDepo=useMemo(()=>{
            //    return tenderData.shippingLocations.map((x) => {
            //       return (
            //         formatedDepot.find((d) => Number(d.value) == x) || {
            //           value: "",
            //           label: "",
            //         }
            //       );
            //     })
            //   },[formatedDepot,tenderData.shippingLocations]);
            containerClasses={styles.fields}
            selectedOptions={selectedEligibility}
            options={metaData.eligibility||[]}
            label="Eligibility"
            placeholder={"Please search and select here"}
            id={"eligibility"}
            setSelectOptions={(options) => {
              updateSupplyCondition(
                "eligibility",
                options.reduce<string[]>((acc, option) => {
                  if (typeof option.value === "string") {
                    acc.push(option.value);
                  }
                  return acc;
                }, [])
              );
            }}
          ></DsMultiSelect>
        </div>
      </div>
    </>
  );
};
export default DsSupplyDetails;
