import { DsStatus } from "@/helpers/constant";
import { Company, datalistOptions } from "@/helpers/types";
import DsSearchComponent from "@/Elements/ERPComponents/DsSearchComponent/searchComponent";
import { useState } from "react";
export interface CompanySearchProps {
  orderStatus?: string;
  setSelectedCompany: (company:datalistOptions) => void;
  lprTo?:string;
}

export function isSearchCompany(value: unknown): value is Company {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "name" in value &&
    typeof (value as unknown as Company).id === "number" &&
    typeof (value as unknown as Company).name === "string"
  );
}
export function areSearchCompanys(value: unknown): value is Company[] {
  return Array.isArray(value) && value.every(isSearchCompany);
}
const CompanySearch: React.FC<CompanySearchProps> = ({
  orderStatus,
  setSelectedCompany,
  lprTo,
}) => {
  const [company, setCompanys] = useState<datalistOptions[]>([]);

  const searchCompanysURL = "";



  const setOptions = (values: unknown[]) => {
    if (areSearchCompanys(values)) {
      const company: datalistOptions[] = values.map(
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
      setCompanys(company);
    } else {
      console.log("company values are = ", values);
    }
  };

  const setSelectedOption = (option: datalistOptions) => {
    {
      const selectedCompanyId = option.attributes["company-id"];

      if (selectedCompanyId) {
        setSelectedCompany(option);
      }
    }
  };



  return (
    <DsSearchComponent
      id="companySearch"
      dataListId="companySearchDatalist"
      label={"Company"}
      initialValue={lprTo}
      placeholder={"Search Company"}
      options={company ? company : undefined}
      setOptions={setOptions}
      setSearchUrl={(searchTerm: string) => {
        return searchCompanysURL + "name=" + searchTerm;
      }}
      //   setOnSelectUrl={function (selectedOptionId: string): string {
      //     return getCompanyURL + selectedOptionId;
      //   }}
      setSelectedOption={setSelectedOption}
      disable={orderStatus === DsStatus.APRV ? true : false}
    />
  );
};

export default CompanySearch;
