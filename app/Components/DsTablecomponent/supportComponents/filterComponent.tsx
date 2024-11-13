import React, { ChangeEvent } from "react";
import TextField from "../../DsTextField/DsTextField";
import { tcolumn } from "../helpers/types";

interface filterComponentProps {
  column: tcolumn;
  sortDataUsingInputValueOnlyOnSpecifiedColumn: (
    e: ChangeEvent<HTMLElement>,
    columnIndex: number
  ) => void;
}

const FilterComponent: React.FC<filterComponentProps> = ({
  column,
  sortDataUsingInputValueOnlyOnSpecifiedColumn,
}) => {
  return (
    <>
      <TextField
        placeholder={`Search ${column.columnHeader} press enter to search`}
        label={`${column.columnHeader}`}
        handleInputChange={(e) =>
          sortDataUsingInputValueOnlyOnSpecifiedColumn(e, column.columnIndex)
        }
      ></TextField>
    </>
  );
};

export default FilterComponent;
