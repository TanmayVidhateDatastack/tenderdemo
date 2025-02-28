import DsTextField from "@/Elements/DsComponents/DsInputs/dsTextField";
import DsMultiSelect from "@/Elements/DsComponents/dsSelect/dsMultiSelect";
import DsSelectMultiLevel from "@/Elements/DsComponents/dsSelect/dsSelectMultiLevel";
import {
  applierSupplierDetailsProps,
  tenderDetailsProps,
} from "@/helpers/types";
import { useTenderData } from "../TenderDataContextProvider";
import styles from "@/app/Tender/[TenderId]/tenderOrder.module.css"
const DsApplierSupplierDetails: React.FC<applierSupplierDetailsProps> = ({
  applierSupplierDetails,
}) => {
  const { updateTenderData } = useTenderData();
  return (
    <>
      <div className={styles.inputDetails}>
        <DsSelectMultiLevel
          isSearchable
          options={applierSupplierDetails.appliedBy}
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
          }}
          // handleOnChange={function (
          //   e: React.ChangeEvent<HTMLElement>
          // ): void {
          //   throw new Error("Function not implemented.");
          // }}
          // isSearchable={true}
        ></DsSelectMultiLevel>
        <DsSelectMultiLevel
          isSearchable
          options={applierSupplierDetails.suppliedBy}
          // type={"twolevel"}
          label="Supplied By"
          placeholder={"Please search or select here"}
          id={"suppliedBy"}
          setSelectOption={(option) => {
            if (typeof option.value == "string") {
              updateTenderData(
                "suppliedBy",
                option.label == "IPCA" ? option.label : "Stockist"
              );
              updateTenderData("suppliedId", option.value);
            }
          }}
          // handleOnChange={function (
          //   e: React.ChangeEvent<HTMLElement>
          // ): void {
          //   throw new Error("Function not implemented.");
          // }}
          // isSearchable={true}
        ></DsSelectMultiLevel>
        <DsMultiSelect
          options={applierSupplierDetails.depot}
          // type="multi"
          label="Depot"
          placeholder={"Please search or select here"}
          id={"depot"}
          // setSelectOptions={(options) => {
          //   updateTenderData(
          //     "shippingLocations",
          //     options.reduce<number[]>((acc, option) => {
          //       if (typeof option.value === "string") {
          //         acc.push(parseInt(option.value));
          //       }
          //       return acc;
          //     }, [])
          //   );
          // }}

          // handleOnChange={function (
          //   e: React.ChangeEvent<HTMLElement>
          // ): void {
          //   throw new Error("Function not implemented.");
          // }}
        ></DsMultiSelect>
        <DsTextField
          label="Stockist / Liasioner name"
          placeholder="Please type here"
          // onChange={(e) => updateTenderData(" ", e.target.value)}
        ></DsTextField>
        <DsTextField
          label="Stockist / Liasioner discount %"
          placeholder="Please type here"
          onChange={(e) => updateTenderData("supplierDiscount", e.target.value)}
        ></DsTextField>
      </div>
    </>
  );
};

export default DsApplierSupplierDetails;
