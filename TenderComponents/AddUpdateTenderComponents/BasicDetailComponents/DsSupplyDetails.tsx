import DsSingleSelect from "@/Elements/DsComponents/dsSelect/dsSingleSelect";
import DsTextField from "@/Elements/DsComponents/DsInputs/dsTextField";
import DsMultiSelect from "@/Elements/DsComponents/dsSelect/dsMultiSelect";
import DsSelectMultiLevel from "@/Elements/DsComponents/dsSelect/dsSelectMultiLevel";
import {
  datalistOptions,
  DsSelectOption,
  supplyDetailsProps,
} from "@/Common/helpers/types";
// import { datalistOptions, supplyDetailsProps } from "@/Common/helpers/types";
import { useTenderData } from "../TenderDataContextProvider";
import styles from "@/app/Tender/[TenderId]/tenderOrder.module.css";
import { useEffect, useState } from "react";
const DsSupplyDetails: React.FC<supplyDetailsProps> = ({ supplyDetails }) => {
  const { updateSupplyCondition, tenderData } = useTenderData();
  const [selectedEligibility, setSelectedEligibility] = useState<
    DsSelectOption[]
  >([]);
  useEffect(() => {
    const eligibility = [...tenderData.tenderSupplyConditions[0].eligibility];
    const selectedEl = eligibility.map((x) => {
      return {
        value: x,
        label: x,
      };
    });
    setSelectedEligibility(selectedEl);
  }, [tenderData.tenderSupplyConditions[0].eligibility]);
  tenderData.tenderSupplyConditions[0].eligibility.map((x) => {
    return {
      value: x,
      label: x,
    };
  });
  const [selectedSupplyPoint, setSelectedSupplyPoint] =
    useState<DsSelectOption>();
  useEffect(() => {
    const supplyPoint = tenderData.tenderSupplyConditions[0].supplyPoint;
    if (supplyPoint) {
      const option = supplyDetails.supplyPoints.find(
        (x) => x.value == supplyPoint
      );
      if (option) setSelectedSupplyPoint(option);
    }
  }, [tenderData.tenderSupplyConditions[0].supplyPoint]);

  const [selectedtTestReportRequired, setSelectedtTestReportRequired] =
    useState<DsSelectOption>();
  useEffect(() => {
    const testReportRequired = tenderData.tenderSupplyConditions[0].testReportRequired;
    if (testReportRequired) {
      const option = supplyDetails.reportRequirements.find(
        (x) => x.value == testReportRequired
      );
      if (option) setSelectedtTestReportRequired(option);
    }
  }, [tenderData.tenderSupplyConditions[0].testReportRequired]);

  return (
    <>
      <div>Supply Conditions </div>
      <div className={styles.inputDetails}>
        <DsSingleSelect
          selectedOption={selectedSupplyPoint}
          options={supplyDetails.supplyPoints}
          label="Supply point"
          placeholder={"Please select here"} 
          id={"supplyPoints"}
          setSelectOption={(option) => {
            if (typeof option.value == "string")
              updateSupplyCondition("supplyPoint", option.value);
          }}
        ></DsSingleSelect>
        <DsTextField
          maxLength={10}
          initialValue={tenderData.tenderSupplyConditions[0].consigneesCount.toString()}
          inputType="positive"
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
          selectedOption={selectedtTestReportRequired}
          options={supplyDetails.reportRequirements}
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
          selectedOptions={selectedEligibility}
          options={supplyDetails.eligibility}
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
    </>
  );
};
export default DsSupplyDetails;
