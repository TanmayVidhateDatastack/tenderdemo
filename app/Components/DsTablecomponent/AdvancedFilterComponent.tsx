import DSButton from "../dsButton/dsButton";
import DsPane from "../DsPane/DsPane";
import TextField from "../DsTextField/DsTextField";
import { filterType } from "./helpers/types";
// import PopUpContext from "../dscontext/dscontext";

interface advancedFilterComponent {
  minValue: number;
  maxValue: number;
  rangeValue: number;
  filterTypes: filterType[];
  setRangeFromValue: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  setRangeToValue: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  setDateFromValue: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  setDateToValue: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  setGrossRangeValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setCommaValue: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  applyFilter: (e: React.MouseEvent<HTMLElement>) => void;
}

const AdvancedFilterComponent: React.FC<advancedFilterComponent> = ({
  setRangeFromValue,
  setRangeToValue,
  setDateFromValue,
  setDateToValue,
  setGrossRangeValue,
  setCommaValue,
  applyFilter,
  minValue,
  maxValue,
  rangeValue,
  filterTypes,
}) => {
  const numberColumn = filterTypes.find((x) => x.filterType == "NRF");

  const rangeColumn = filterTypes.find((x) => x.filterType == "NRF");
  const dateColumn = filterTypes.find((x) => x.filterType == "DRF");
  const csvColumn = filterTypes.find((x) => x.filterType == "CSV");
  // const dropdownColumn = filterTypes.find((x) => x.filterType == "DDF");

  return (
    // <PopUpContext
    //   containerId={"menu"}
    //   id={"menucontext"}
    //   content={
    <div>
      <DsPane>
        <div className="apply-filter">
          <div className="range-filter">
            <TextField
              placeholder={`${numberColumn?.columnHeader} From`}
              type={"singleline"}
              handleInputChange={setRangeFromValue}
              inputType="number"
              label={`${numberColumn?.columnHeader} From`}
              disable={false}
            ></TextField>
            <TextField
              placeholder={`${numberColumn?.columnHeader} To`}
              type={"singleline"}
              handleInputChange={setRangeToValue}
              inputType="number"
              label={`${numberColumn?.columnHeader} To`}
              disable={false}
            ></TextField>
          </div>
          <div className="date-filter">
            <TextField
              placeholder={`${dateColumn?.columnHeader} From`}
              type={"singleline"}
              handleInputChange={setDateFromValue}
              inputType="date"
              label={`${dateColumn?.columnHeader} From`}
              disable={false}
            ></TextField>
            <TextField
              placeholder={`${dateColumn?.columnHeader} To`}
              type={"singleline"}
              handleInputChange={setDateToValue}
              inputType="date"
              label={`${dateColumn?.columnHeader} To`}
              disable={false}
            ></TextField>
          </div>
          {rangeColumn?.columnHeader} From
          <input
            type="range"
            min={minValue}
            max={maxValue}
            value={rangeValue}
            className="range-input"
            onChange={setGrossRangeValue}
          ></input>
          {rangeValue}
          {`               `} {rangeColumn?.columnHeader} To
          <TextField
            placeholder={`Type multiple ${csvColumn?.columnHeader} name and use comma`}
            type={"singleline"}
            handleInputChange={setCommaValue}
            inputType="text"
            label={`Customer`}
            disable={false}
          ></TextField>
          <DSButton label={"Apply"} handleOnClick={applyFilter}></DSButton>
        </div>
      </DsPane>
    </div>
    //   }
    // />
  );
};
export default AdvancedFilterComponent;
