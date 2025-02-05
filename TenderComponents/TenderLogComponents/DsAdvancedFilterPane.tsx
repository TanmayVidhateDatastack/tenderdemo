import DsDataList from "@/Elements/DsComponents/DsInputs/dsDatalist";
import DsTextField from "@/Elements/DsComponents/DsInputs/dsTextField";
import DsPane from "@/Elements/DsComponents/DsPane/DsPane";
import Image from "next/image";
import calender from "@/Icons/smallIcons/calender.svg";
import DsMultiSelect from "@/Elements/DsComponents/dsSelect/dsMultiSelect";
const DsAdvancedFilterPane: React.FC = () => {
  return (
    <>
      <DsPane id="y" side="right" title="Filter">
        <div>
          <DsDataList
            dataListId="customerdata"
            id="customerlist"
            placeholder="Customer Name"
            label="Customer Name"
          />
        </div>
        <div>
          <DsTextField
            inputType="number"
            label="Sub Date From"
            iconEnd={<Image src={calender} alt="calender" />}
          />
          <DsTextField
            inputType="number"
            label="Sub Date To"
            iconEnd={<Image src={calender} alt="calender" />}
          />
        </div>
        <div>
          <DsMultiSelect id={"type"} placeholder={"Type"} options={[]} />
        </div>
        <div>
          <DsMultiSelect
            id={"supplyType"}
            placeholder={"Supply Type"}
            options={[]}
          />
        </div>
        <div>
          <DsMultiSelect
            id={"appliedBy"}
            placeholder={"Applied By"}
            options={[]}
          />
        </div>
        <div>
          <DsMultiSelect
            id={"suppliedBy"}
            placeholder={"Supplied By"}
            options={[]}
          />
        </div>
        <div>
          <DsMultiSelect id={"depot"} placeholder={"Depot"} options={[]} />
        </div>
        <div>
          <DsMultiSelect id={"status"} placeholder={"Status"} options={[]} />
        </div>
      </DsPane>
    </>
  );
};

export default DsAdvancedFilterPane;
