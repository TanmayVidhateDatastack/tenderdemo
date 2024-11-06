import DSButton from "../dsButton/dsButton";
import TextField from "../DsTextField/DsTextField";

interface advancedFilterComponent {
  minValue: number;
  maxValue: number;
  rangeValue: number;
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

  applyFilter: (e: React.MouseEvent<HTMLElement>) => void;
}

const AdvancedFilterComponent: React.FC<advancedFilterComponent> = ({
  setRangeFromValue,
  setRangeToValue,
  setDateFromValue,
  setDateToValue,
  setGrossRangeValue,
  applyFilter,
  minValue,
  maxValue,
  rangeValue,
}) => {
  return (
    <div className="apply-filter">
      <div className="range-filter">
        <TextField
          placeholder={"Range From "}
          type={"singleline"}
          handleInputChange={setRangeFromValue}
          inputType="number"
          label={"Order ID From"}
          disable={false}
        ></TextField>
        <TextField
          placeholder={"Range To "}
          type={"singleline"}
          handleInputChange={setRangeToValue}
          inputType="number"
          label={"Order ID To"}
          disable={false}
        ></TextField>
      </div>
      <div className="date-filter">
        <TextField
          placeholder={"Date From "}
          type={"singleline"}
          handleInputChange={setDateFromValue}
          inputType="date"
          label={"date from"}
          disable={false}
        ></TextField>
        <TextField
          placeholder={"Date To "}
          type={"singleline"}
          handleInputChange={setDateToValue}
          inputType="date"
          label={"date to"}
          disable={false}
        ></TextField>
      </div>
      Gross Value From
      <input
        type="range"
        min={minValue}
        max={maxValue}
        value={rangeValue}
        className="range-input"
        onChange={setGrossRangeValue}
      ></input>
      Gross Value To
      <DSButton label={"Apply"} handleOnClick={applyFilter}></DSButton>
    </div>
  );
};
export default AdvancedFilterComponent;
