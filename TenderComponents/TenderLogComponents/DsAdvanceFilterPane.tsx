/* eslint-disable react/display-name */
import AdvancedFilterComponent, {
    filterTypes,
  } from "@/Elements/DsComponents/AdvancedFilterComponent/AdvancedFilterComponent";
  import DsPane from "@/Elements/DsComponents/DsPane/DsPane";
  import React from "react";
  import styles from "@/app/page.module.css";
  
  
  
  export interface advProps {
    filters: filterTypes[];
    onFiltersApplied: (apiFilter: Record<string, any>) => void;
  }
  const DsAdvanceFilterPane: React.FC<advProps> = ({ filters, onFiltersApplied }) => {


    console.log("filters in advance",filters);
  
    function formatDate(inputDate) {
      const [year, month, day] = inputDate.split('/').map(Number);
      return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    }
  
    const convertFilterValuesToApiFormat = (filterValues: any[]): Record<string, any> => {
      console.log("Raw filter values:", filterValues); // Debug step
    
      const apiFilter: Record<string, any> = {};
    
      filterValues.forEach((filter) => {
        console.log("Processing filter:", filter);
    
        switch (filter.filterFor.trim().toLowerCase()) { // Use `trim()` to avoid extra spaces
          case "customer":
            if (filter.filterValues)
              apiFilter["customers"] = filter.filterValues?.map((value) => parseInt(value)) ?? [];
            break;
    
          case "date":
            if (filter.filterValues?.from || filter.filterValues?.to)
              apiFilter["DateRange"] = {
                from: formatDate(filter.filterValues?.from),
                to: formatDate(filter.filterValues?.to),
              };
            break;
    
          case "type":
            if (filter.filterValues) apiFilter["tendertype"] = filter.filterValues ?? [];
            break;
    
          case "supply type":
            if (filter.filterValues) apiFilter["supplytype"] = filter.filterValues ?? [];
            break;
    
          case "applied by":
            if (filter.filterValues) apiFilter["appliedby"] = filter.filterValues ?? [];
            break;
    
          case "supplied by":
            if (filter.filterValues) apiFilter["suppliedby"] = filter.filterValues ?? [];
            break;
    
          case "depot":
            if (filter.filterValues) apiFilter["depot"] = filter.filterValues ?? [];
            break;
    
          case "value":
            if (filter.filterValues?.from || filter.filterValues?.to) {
              apiFilter["value"] = {
                min: filter.filterValues?.from,
                max: filter.filterValues?.to,
              };
            }
            break; // <-- Added missing break
    
          case "status":
            if (filter.filterValues) apiFilter["Status"] = filter.filterValues ?? [];
            break;
    
          default:
            console.warn("Unhandled filter:", filter.filterFor);
            break;
        }
      });
    
      console.log("api for filter component:", apiFilter);
      onFiltersApplied(apiFilter);
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
              filterValues: filterTypes[],
              filterCount: number
            ): 0 | 1 {
              convertFilterValuesToApiFormat(filterValues);
              ///api call to getAllOrderData with filters
              console.log(
                "filterValues:",
                filterValues,
                "filterConsole: ",
                filterCount
              );
              return 0;
            }}
            clearFilters={function (): void {
              // console.log("clearFilters");
            }}
          ></AdvancedFilterComponent>
        </DsPane>
      </>
    );
  };
  export default DsAdvanceFilterPane;