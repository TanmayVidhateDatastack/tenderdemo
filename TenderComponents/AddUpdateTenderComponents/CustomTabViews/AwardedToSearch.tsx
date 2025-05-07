import { searchCustomerURL } from "@/Common/helpers/constant";
import { datalistOptions } from "@/Common/helpers/types";
import DsSearchComponent from "@/Elements/DsComponents/DsSearch/searchComponent";
import { useState } from "react";

export interface AwardedToSearchProps {
  awardedTo: awardedTo;
  index: number;
  setAwardedTo: (option: datalistOptions) => void;
}
export type awardedTo = {
  id: number;
  name: string;
};
export function isSearchAwardedToValue(value: unknown): value is awardedTo {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "name" in value &&
    typeof (value as unknown as awardedTo).id === "number" &&
    typeof (value as unknown as awardedTo).name === "string"
  );
}
export function areSearchAwardedToValues(value: unknown): value is awardedTo[] {
  return Array.isArray(value) && value.every(isSearchAwardedToValue);
}
const AwardedToSearch: React.FC<AwardedToSearchProps> = ({
  awardedTo,
  index,
  setAwardedTo,
}) => {
  const [awardedToOptions, setAwardedToOptions] = useState<datalistOptions[]>(
    []
  );
  const setAwardedToSearchOptions = (values: unknown[]) => {
    if (areSearchAwardedToValues(values)) {
      const awardedToValues: datalistOptions[] = values.map(
        (x: { id: number; name?: string }) => {
          return {
            id: x.id.toString(),
            value: x.name,
            attributes: {
              "company-id": x.id.toString(),
            },
          };
        }
      );
      setAwardedToOptions(awardedToValues);
    } else {
      console.log("company values are = ", values);
    }
  };
  return (
    <DsSearchComponent
      options={awardedToOptions}
      setOptions={setAwardedToSearchOptions}
      setSearchUrl={function (searchTerm: string): string {
        return searchCustomerURL + searchTerm;
      }}
      setSelectedOption={setAwardedTo}
      id={"awardedToSearch" + index}
      dataListId={"awardedToSearchDatalist" + index}
      initialValue={awardedTo.name}
    />
  );
};
export default AwardedToSearch;
