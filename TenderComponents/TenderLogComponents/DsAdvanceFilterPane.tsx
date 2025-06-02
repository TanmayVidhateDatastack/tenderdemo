/* eslint-disable @typescript-eslint/no-explicit-any */
 
 
/* eslint-disable react/display-name */
"use client";
import AdvancedFilterComponent, {
  filterTypes,
} from "@/Elements/DsComponents/AdvancedFilterComponent/AdvancedFilterComponent";
import DsPane, { ClosePane } from "@/Elements/DsComponents/DsPane/DsPane";
import React, { Dispatch, SetStateAction } from "react";
import styles from "@/app/page.module.css";



export interface advProps {
  filters: filterTypes[];
  onFiltersApplied: (apiFilter: Record<string, any>) => void;
  setIsQuickFilter: Dispatch<SetStateAction<boolean>>;
  setFilterCount: Dispatch<SetStateAction<number>>;
}
const DsAdvanceFilterPane: React.FC<advProps> = ({ filters, onFiltersApplied, setIsQuickFilter, setFilterCount }) => {

  function formatDate(inputDate) {
    const [year, month, day] = inputDate.split('/').map(Number);
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  }

  const convertFilterValuesToApiFormat = (filterValues: any[]): Record<string, any> => {
    const apiFilter: Record<string, any> = {};

    filterValues.forEach((filter) => {
      switch (filter.filterFor.trim().toLowerCase()) {
        case "customers": if (filter.filterValues)
          apiFilter["customers"] = filter.filterValues?.map((value) => parseInt(value.id)) ?? [];
          break;

        case "date": if (filter.filterValues?.from || filter.filterValues?.to)
          apiFilter["submissionDate"] = {
            ...(filter.filterValues?.from && { from: formatDate(filter.filterValues?.from) }),
            ...(filter.filterValues?.to && { to: formatDate(filter.filterValues?.to) })
          };
          break;
        case "customer types": if (filter.filterValues)
          apiFilter["customerTypes"] = filter.filterValues ?? [];
          break;
        case "tender types": if (filter.filterValues)
          apiFilter["tenderTypes"] = filter.filterValues ?? [];
          break;
        case "applied by": if (filter.filterValues)
          apiFilter["appliedBy"] = filter.filterValues ?? [];
          break;
        case "supplied by": if (filter.filterValues)
          apiFilter["suppliedBy"] = filter.filterValues ?? [];
          break;
        case "depot": if (filter.filterValues)
          apiFilter["shippingLocations"] = filter.filterValues ?? [];
          break;
        case "value": if (filter.filterValues?.from || filter.filterValues?.to)
          apiFilter["tenderValue"] = {
            ...(filter.filterValues?.from && { min: Number(filter.filterValues.from) }),
            ...(filter.filterValues?.to && { max: Number(filter.filterValues.to) })
          };
          break;
        case "status": if (filter.filterValues)
          apiFilter["status"] = filter.filterValues ?? [];
          break;
        default:
          break;
      }
    });
    // console.log("api for filter component ", apiFilter);
    onFiltersApplied(apiFilter);
    setIsQuickFilter(() => filterValues.length == 0);
    return apiFilter;
  };

  return (
    <>
      <DsPane
        id="AdvancedFilterComponent"
        side="right"
        title="Filter"
        className={styles.advPane}
      >
        <AdvancedFilterComponent
          filters={filters}
          applyFilters={function (
            e: React.MouseEvent<HTMLElement>,
            filterValues: filterTypes[],
            filterCount: number
          ) {
            convertFilterValuesToApiFormat(filterValues);
            ClosePane(e);
            setFilterCount(filterCount);
            ///api call to getAllOrderData with filters
            // console.log(
            //   "filterValues:",
            //   filterValues,
            //   "filterConsole: ",
            //   filterCount
            // );
            // return 0;
          }}
          clearFilters={function (): void {
            setIsQuickFilter(() => true);
          }}
        ></AdvancedFilterComponent>
      </DsPane>
    </>
  );
};
export default DsAdvanceFilterPane;

