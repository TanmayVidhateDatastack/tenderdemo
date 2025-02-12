"use client";

import TableComponent from "@/Elements/DsComponents/DsTablecomponent/DsTableComponent";
import DsApplication from "@/Elements/ERPComponents/DsApplicationComponents/DsApplication";
import DsNavTo from "@/Elements/ERPComponents/DsNavigationComponent/DsNavTo";
import styles from "./page.module.css";
import DsFilterActions from "@/TenderComponents/TenderLogComponents/DsFilterActions";
import DsPane from "@/Elements/DsComponents/DsPane/DsPane";
import { generatePatchDocument } from "@/helpers/Method/UpdatePatchObjectCreation";

export default function Home() {
  


  const originalObject = {
    id: 4211,
    purchaseOrderNumber: "test37",
    bill_to_address_id: 3002,
    billingAddress: {
      type: "read-only",
      to: {
        bill_to_address_id: 3002,
        address1: "123 Warehouse St.",
        address2: "Unit 5",
        address3: "North Wing",
        address4: null,
        city: "New York",
        state: "1",
        pinCode: "10001",
        isPrimary: "Y",
      },
    },
    orderItems: [
      { id: 4212, productId: 2, requestedQuantity: 25 },
      { id: 4213, productId: 6, requestedQuantity: 19 },
    ],
  };
  
  const updatedObject = {
    id: 4211,
    purchaseOrderNumber: "",
    bill_to_address_id: 3003,
    billingAddress: {
      type: "read-only",
      to: {
        bill_to_address_id: 3003,
        address1: "1 garage St.",
        address2: "Unit 5",
        address3: "North Wing",
        address4: null,
        city: "New York",
        state: "1",
        pinCode: "10001",
        isPrimary: "Y",
      },
    },
    orderItems: [
      { id: 4212, productId: 2, requestedQuantity: 35 },
      { productId: 7, requestedQuantity: 20 },
      { productId: 8, requestedQuantity: 200 },
    ],
  };

  
  const result = generatePatchDocument(originalObject, updatedObject);
  console.log(result);
  return (
    <>
      <DsApplication
        appTitle="Tender"
        appMenu={
          <div className={styles.filterNavBar}>
            <DsFilterActions />
            <DsNavTo label="New" location="Tender/New" />
          </div>
        }
      >
        <TableComponent
          className={""}
          id={""}
          columns={[]}
          rows={[]}
        ></TableComponent>
      </DsApplication>
      <DsPane id="y"></DsPane>
    </>
  );
}
