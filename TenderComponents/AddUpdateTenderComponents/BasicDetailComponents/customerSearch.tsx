/* eslint-disable react/display-name */
import {
  searchCustomerURL,
  getAllCustomerLocationsURL,
} from "@/Common/helpers/constant";
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
  setCustomerLocations?: Dispatch<SetStateAction<location[]>>; // ✅ Updated to ensure array of locations
}

const CustomerSearch: React.FC<{
  customer: string; 
  orderData?: TenderData;
  updateTenderData?: (
    key: keyof Omit<TenderData, "id" | "orderItems">, 
    value: any 
  ) => void; 
  setCustomerLocations?: Dispatch<SetStateAction<location[]>>; // ✅ Added prop
}> = React.memo(({ customer, updateTenderData, setCustomerLocations }) => {
  const [customers, setCustomers] = useState<datalistOptions[]>();
  const [selectedCustomer, setSelectedCustomer] = useState<number>();
  const [selectedAddress, setSelectedAddress] = useState<string>(""); // Track selected address


  async function setSelectedOptions(option: datalistOptions): Promise<void> {
    const selectedCustomerId = Number(option.id);
    setSelectedCustomer(selectedCustomerId);
    updateTenderData?.("customerId", selectedCustomerId);
  
    // ✅ Reset the selected address when a new customer is chosen
    setSelectedAddress("");
  
    setCustomerLocations?.([]); // ✅ Clear locations before fetching new ones
  
    try {
      const response = await fetch(`${getAllCustomerLocationsURL}${selectedCustomerId}`);
      const data = await response.json();
  
      if (data.code === 200 && Array.isArray(data.result)) {
        const formattedAddresses: location[] = data.result.map((addr) => ({
          id: addr.id,
          address1: addr.address1,
          address2: addr.address2,
          address3: addr.address3, 
          address4: addr.address4, 
          city: addr.city,
          state: addr.state,
          pinCode: addr.pinCode,
          isPrimary: addr.isPrimary === "Y", 
        })); 
        setCustomerLocations?.(formattedAddresses);
      } else {
        console.error("Invalid API response:", data);
        setCustomerLocations?.([]);
      }
    } catch (error) {
      console.error("Error fetching customer details:", error);
      setCustomerLocations?.([]);
    }
  }
  
  

  function setOptions(values: unknown) {
    if (
      Array.isArray(values) &&
      values.every((val) => val.id && val.name && val.code)
    ) {
      const customers: datalistOptions[] = values.map((x) => ({
        id: x?.id?.toString(),
        value: `${x.code.toUpperCase()} - ${x.name}`,
        attributes: { "customer-id": x.id.toString() },
      }));
      setCustomers(customers);
    }
  }

  return (
    <DsSearchComponent
      id="customerSearch"
      initialValue={customer}
      dataListId="customerSearchDatalist"
      label={"Customer ID and Name"}
      options={customers || undefined}
      setOptions={setOptions}
      setSearchUrl={(searchTerm: string) => searchCustomerURL + searchTerm}
      setSelectedOption={setSelectedOptions}
    />
  );
});

export default CustomerSearch;
