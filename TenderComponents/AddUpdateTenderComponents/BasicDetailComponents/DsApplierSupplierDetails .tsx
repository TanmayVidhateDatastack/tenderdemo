import DsTextField from "@/Elements/DsComponents/DsInputs/dsTextField";
import DsMultiSelect from "@/Elements/DsComponents/dsSelect/dsMultiSelect";
import {
  applierSupplierDetailsProps,
  datalistOptions,
 
} from "@/Common/helpers/types";
import { useTenderData } from "../TenderDataContextProvider";
import styles from "@/app/Tender/[TenderId]/tenderOrder.module.css";
import deptStyles from "@/TenderComponents/AddUpdateTenderComponents/BasicDetailComponents/deposite.module.css";
import DsSelectMultiLevel from "@/Elements/DsComponents/dsSelect/dsSelectMultiLevel";
import DsDataList from "@/Elements/DsComponents/DsInputs/dsDatalist";

const DsApplierSupplierDetails: React.FC<applierSupplierDetailsProps> = ({
  applierSupplierDetails,
}) => {
  const { updateTenderData } = useTenderData();
  // console.log("djhdjd",applierSupplierDetails);
  return (
    <>
      <div className={styles.inputDetails}>
        <div className={deptStyles.fields}>  
          <DsSelectMultiLevel
            isSearchable
            options={[]}
            label="Applied By"
            placeholder={"Please search or select here"}
            id={"appliedBy"}
            setSelectOption={(option) => {
              if (typeof option.value == "string") {
                updateTenderData(
                  "appliedBy",
                  option.label == "IPCA" ? option.label : "Stockist"
                );
                updateTenderData("applierId", option.value);
              }
            } }onSelect={()=>{}}
             isOpen={false}
              ></DsSelectMultiLevel>
        </div>
        <div className={deptStyles.fields}> 
          <DsSelectMultiLevel
            isSearchable
            options={[]}
            label="Supplied By"
            placeholder={"Please search or select here"}
            id={"suppliedBy"}
            isOpen={true}
            setSelectOption={(option) => {
              if (typeof option.value == "string") {
                updateTenderData(
                  "suppliedBy",
                  option.label == "IPCA" ? option.label : "Stockist"
                );
                updateTenderData("suppliedId", option.value);
              }
            } } onSelect={()=>{}} 
              ></DsSelectMultiLevel>
        </div>
        <div className={deptStyles.fields}>
 
          <DsMultiSelect
            options={applierSupplierDetails.depot}
            // type="multi"  
            label="Depot"
            placeholder={"Please search or select here"}
            id={"depot"}
            setSelectOptions={(options) => {
            updateTenderData(
              "shippingLocations",
              options.reduce<number[]>((acc, option) => {
                if (typeof option.value === "string") {
                  acc.push(parseInt(option.value));
                }
                return acc; 
              }, [])
            );                                
          }}
          ></DsMultiSelect>
        </div>
        <div></div>
        <div className={deptStyles.fields}>
 
          <DsTextField
            label="Stockist / Liasioner name"
            inputType="text"
          // placeholder="Please type here"
          //  onChange={(e) => updateTenderData(" ", e.target.value)}
          ></DsTextField>
        </div>
        <div className={deptStyles.fields}>
 
          <DsTextField
            inputType="positive"
            label="Stockist / Liasioner discount %"
            // placeholder="Please type here"
            onChange={(e) => updateTenderData("supplierDiscount", e.target.value)}
          ></DsTextField>
        </div>
      </div>
    </>
  );
};
export default DsApplierSupplierDetails;
 
 
 