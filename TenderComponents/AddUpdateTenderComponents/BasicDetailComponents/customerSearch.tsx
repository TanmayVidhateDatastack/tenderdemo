/* eslint-disable react/display-name */
import { searchCustomerURL } from "@/Common/helpers/constant";
import {
  customer,
  datalistOptions,
  location,
  TenderData,
} from "@/Common/helpers/types";
import { Dispatch, SetStateAction, useState } from "react";
import React from "react";
import DsSearchComponent from "@/Elements/DsComponents/DsSearch/searchComponent";

export interface CustomerSearchProps {
  orderData: TenderData | null;
  setSelectedCustomer?: Dispatch<SetStateAction<customer | undefined>>;
  setCustomerLocations?: Dispatch<SetStateAction<location[] | undefined>>;
}

export function isLocation(value: unknown): value is location { 
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "address1" in value &&
    typeof (value as unknown as location).id === "number" &&
    typeof (value as unknown as location).address1 === "string" 
  );
}
export function isCustomer(value: unknown): value is customer {
  return (
    typeof value === "object" && 
    value !== null && 
    "id" in value && 
    "name" in value && 
    "code" in value && 
    "address" in value &&  
    typeof (value as unknown as customer).id === "number" &&
    typeof (value as unknown as customer).name === "string" &&
    typeof (value as unknown as customer).code === "string" &&
    isLocation((value as unknown as customer).address)
  );
}
export function isSearchCustomer(value: unknown): value is customer {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "name" in value &&
    "code" in value &&
    typeof (value as unknown as customer).id === "number" &&
    typeof (value as unknown as customer).name === "string" &&
    typeof (value as unknown as customer).code === "string"
  );
}
export function areSearchCustomers(value: unknown): value is customer[] {
  return Array.isArray(value) && value.every(isSearchCustomer);
}
const CustomerSearch: React.FC<{ 
  customer: string;
  orderData: TenderData; 
  updateTenderData: (
    key: keyof Omit<TenderData, "id" | "orderItems">,
    value: any 
  ) => void; 
}> = React.memo(({ customer, orderData, updateTenderData }) => {
  const [customers, setCustomers] = useState<datalistOptions[]>();
  const [selectedCustomer, setSelectedCustomer] = useState<number>();
  async function setSelectedOptions(option: datalistOptions): Promise<void> {
    const selectedCustomerId = option.id;
    setSelectedCustomer(selectedCustomer);
    // const getCustomerByCustomerId = getCustomersURL + ;
    updateTenderData("customerId", selectedCustomerId);
  }
  function setOptions(values: unknown) {
    if (areSearchCustomers(values)) {
      const customers: datalistOptions[] = values.map(
        (x: { id: number; code: string; name: string }) => {
          return {
            id: x?.id?.toString(), 
            value: x?.code.toUpperCase() + " - " + x.name,
            attributes: { "customer-id": x.id.toString() },
          };
        }
      );
      setCustomers(customers);
    } 
  }
  return (
    <DsSearchComponent
      id="customerSearch"
      initialValue={customer}
      dataListId="customerSearchDatalist"
      label={"Customer ID and Name"}
      options={customers ? customers : undefined}
      setOptions={setOptions}
      setSearchUrl={(searchTerm: string) => {
        return searchCustomerURL + searchTerm;
      }} 
      setSelectedOption={setSelectedOptions}
      // onBlur={(e)=>{
      //   const value=  (e.target as HTMLInputElement).value;
      //   // console.log("value = ",value)
      //    if(value!== orderData?.customer?.code + " " + orderData?.customer?.name){
      //      updateOrderDataField("customerId",null)}}
      //    }
    />
  );
});
export default CustomerSearch;
