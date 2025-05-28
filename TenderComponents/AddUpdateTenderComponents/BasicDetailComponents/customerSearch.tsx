/* eslint-disable react/display-name */
import {
  searchCustomerURL,
  getAllCustomerLocationsURL,
} from "@/Common/helpers/constant";
import { customer, datalistOptions, location } from "@/Common/helpers/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import React from "react";
import DsSearchComponent from "@/Elements/DsComponents/DsSearch/searchComponent";
import { TenderData } from "../TenderDataContextProvider";
import styles from "@/app/Tender/[TenderId]/tenderOrder.module.css";
import { useAppSelector } from "@/Redux/hook/hook";
import { RootState } from "@/Redux/store/store";
import { useSearchParams } from "next/navigation";

//  interface CustomerSearchProps {
//   orderData: TenderData | null;
//   setSelectedCustomer?: Dispatch<SetStateAction<customer | undefined>>;
//   setCustomerLocations?: Dispatch<SetStateAction<location[]>>;
// }
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
  orderData?: TenderData;
  disabled?: boolean;
  updateTenderData?: (
    key:
      | keyof TenderData
      | `tenderDetails.${keyof TenderData["tenderDetails"]}`,
    value: string | number
  ) => void;
  setCustomerLocations?: Dispatch<SetStateAction<location[]>>;
}> = React.memo(
  ({ customer, disabled, updateTenderData, setCustomerLocations, orderData }) => {
    const [customers, setCustomers] = useState<datalistOptions[]>();
    //Gaurav
    const [customerName, setCustomerName] = useState<string>("");
    const [selectedCustomer, setSelectedCustomer] = useState<number>();
    const [customerInputValue, setCustomerInputValue] = useState(customer ?? "");
    const [customerSearchKey, setCustomerSearchKey] = useState(0);

    const [selectedAddress, setSelectedAddress] = useState<string>("");
    const permissions = useAppSelector((state: RootState) => state.permissions);
    const { disable } = permissions;


    const handleOnBlur = (e) => {
      const n = e.target.value == '' ? '' : customerName
      setCustomerName(n);
      setCustomerInputValue(n);

    }

    // get the type value from URL
    const searchParams = useSearchParams();
    const type = searchParams.get("type") || "institutional";


    async function setSelectedOptions(option: datalistOptions): Promise<void> {
      const selectedCustomerId = Number(option.id);
      setSelectedCustomer(selectedCustomerId);
      setCustomerName(option.value ?? "");
      setCustomerInputValue(option.value ?? "");

      if (updateTenderData) {
        updateTenderData("customerId", selectedCustomerId);
        updateTenderData(
          "tenderDetails.customerName",
          option.value || ""
        );

        updateTenderData("customerAddressId", 0);
        updateTenderData(
          "tenderDetails.customerAddressName",
          ''
        );
      }

      // setSelectedAddress("");

      try {
        const response = await fetch(
          `${getAllCustomerLocationsURL}${selectedCustomerId}`
        );
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
          setCustomerLocations?.([]);
        }
      } catch (error) {
        setCustomerLocations?.([]);
      }
    }
    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
      const val = e.target.value;
      setCustomerInputValue(val);

      if (val == "") {
        updateTenderData?.("customerId", 0);
        updateTenderData?.("tenderDetails.customerName", "");
        updateTenderData?.("customerAddressId", 0);
        updateTenderData?.("tenderDetails.customerAddressName", '');
      }
      // if (val.trim() === "") {
      //   // If user cleared the field manually
      //   // updateTenderData?.("customerId", 0);
      //   // updateTenderData?.("tenderDetails.customerName", "");
      //   // setCustomerLocations?.([]);
      //   // setSelectedCustomer(undefined);
      //   // setCustomerSearchKey((prev) => prev + 1); // Force re-mount
      // }
    }

    function setOptions(values: unknown) {
      if (
        Array.isArray(values) &&
        values.every((val) => val.id && val.name && val.code)
      ) {
        const customers: datalistOptions[] = values.map((x) => ({
          id: x?.id?.toString(),
          value: `${x.code.toUpperCase()} - ${x.name}`,
          attributes: {
            "customer-id": x.id.toString(),
            name: x.name,
            code: x.code,
          },
        }));
        setCustomers(customers);
      }
    }

    useEffect(() => {
      if (customer) {
        setCustomerInputValue(customer);
        setCustomerName(customer);
      }
    }, [customer]);

    return (
      <DsSearchComponent
        key={customerSearchKey}
        containerClasses={styles.fields}
        disable={disable || disabled}
        id="customerSearch"
        initialValue={customerInputValue}
        dataListId="customerSearchDatalist"
        label={"Search Customer"}
        options={customers || undefined}
        setOptions={setOptions}
        setSearchUrl={(searchTerm: string) =>
          searchCustomerURL(searchTerm, type)
          // `${searchCustomerURL}${searchTerm}&type=${type}`
        } setSelectedOption={setSelectedOptions}
        onChange={(e) => { if (e) handleInputChange(e) }}
        onBlur={handleOnBlur}
      />
    );
  }
);

export default CustomerSearch;