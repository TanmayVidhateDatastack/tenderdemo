import DsSingleSelect from "@/Elements/DsComponents/dsSelect/dsSingleSelect";
import DsTextField from "@/Elements/DsComponents/DsInputs/dsTextField";
import DsMultiSelect from "@/Elements/DsComponents/dsSelect/dsMultiSelect";
import DsSelectMultiLevel from "@/Elements/DsComponents/dsSelect/dsSelectMultiLevel";
import { supplyDetailsProps } from "@/helpers/types";
import { useTenderData } from "../TenderDataContextProvider";
import styles from "@/app/Tender/[TenderId]/tenderOrder.module.css"
const DsSupplyDetails: React.FC<supplyDetailsProps> = ({ supplyDetails }) => {
  const { updateSupplyCondition } = useTenderData();
  return (
    <>
      <div className={styles.inputDetails}>
        <DsSingleSelect 
          options={supplyDetails.supplyPoints}
          label="Supply points"
          placeholder={"Please select here"}
          id={"supplyPoints"}
          setSelectOption={(option) => { 
            if (typeof option.value == "string")
              updateSupplyCondition("supplyPoint", option.value);
          }}
        ></DsSingleSelect>
        <DsTextField 
          label="Provide no. of consignees"
          placeholder="Please type here"
          onChange={(e) => updateSupplyCondition("consigneesCount", e.target.value)}
        ></DsTextField>
        <DsSelectMultiLevel
          options={supplyDetails.reportRequirements}
          label="Test report requirement"
          placeholder={"Please select here"}
          id={"reportReq"}                                                             
          setSelectOption={(option) => {
            if (typeof option.value == "string") {
              updateSupplyCondition("testReportRequirement", option.value); 
            }
          }} 
        ></DsSelectMultiLevel>
        <DsMultiSelect
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
