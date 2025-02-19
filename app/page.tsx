"use client";
 
import DsApplication from "@/Elements/ERPComponents/DsApplicationComponents/DsApplication";
import DsNavTo from "@/Elements/ERPComponents/DsNavigationComponent/DsNavTo";
import styles from "./page.module.css";
import DsTenderTable from "@/TenderComponents/TenderLogComponents/DsTenderTable";
import DsFilterActions from "@/TenderComponents/TenderLogComponents/DsFilterActions";
import add from "@/Icons/smallIcons/add.svg";
import addIconWhite from "@/Icons/smallIcons/whiteadd.svg";
import Image from "next/image";
import { useState } from "react";
import { generatePatchDocument } from "@/helpers/Method/UpdatePatchObjectCreation";
import { Tender } from "@/helpers/types";
import DsTotalTenders from "@/TenderComponents/TenderLogComponents/DsTotalTender";
import DsTotalValues from "@/TenderComponents/TenderLogComponents/DsTotalValues";
import DsButton from "@/Elements/DsComponents/DsButtons/dsButton";
import ContextMenu, { displayContext } from "@/Elements/DsComponents/dsContextHolder/dsContextHolder";
import { changeImage } from "@/helpers/Method/conversion";
 
export default function Home() { 
  const [data, setData] = useState<Tender[]>([]); //for table data
  const [filteredData, setFilteredData] = useState<Tender[]>([]); //for filtered table data
 
  // useEffect(() => {
  //   if (data || filteredData) {
  //     console.log("data fetched from table : ", data);
  //     console.log("filtereddata fetched from table : ", filteredData);
  //   }
  // }, [data, filteredData]);
 
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
        isPrimary: "Y"
      }
    },
    orderItems: [
      { id: 4212, productId: 2, requestedQuantity: 25 },
      { id: 4213, productId: 6, requestedQuantity: 19 }
    ]
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
        isPrimary: "Y"
      }
    },
    orderItems: [
      { id: 4212, productId: 2, requestedQuantity: 35 },
      { productId: 7, requestedQuantity: 20 },
      { productId: 8, requestedQuantity: 200 }
    ]
  };
 
  const result = generatePatchDocument(originalObject, updatedObject);
  console.log(result);
  return (
    <>
      <DsApplication
        appTitle="Tenders"
        //className={styles.appmenuTitle}
        appMenu={
      <>
          <div className={styles.filterNavBar}>

            <DsFilterActions data={data} setFilteredData={setFilteredData}/>
             </div>
            <DsButton
            label="New"
            icon={<div style={{ width: "1.05rem", height: "1.4rem", position: "relative"}}>
            <Image
              src={add}
              layout="intrinsic"
              objectFit="cover"
              alt="Image"
            />
          </div>
 }          onHover={(e)=>{changeImage(e,addIconWhite)}}
            onClick={(e) => displayContext(e, "CreateNewActions", "vertical", "center")}
             />
         
          </>
        }
        pageName="LogPage"  
      >
        <div className={styles.totalCal}>
        <DsTotalTenders data={data}/>
        <DsTotalValues data={data}/>
        </div>
        <DsTenderTable
          setData={setData}
          data={data}
          filteredData={filteredData}
          />
      </DsApplication>
      <ContextMenu
        id={"CreateNewActions"}
        showArrow={true}
        content={
          <div className={styles.ContextCreateNew}>
            <DsNavTo
              id="institutional"
              buttonColor="btnPrimary"
              buttonViewStyle="btnText"
              className={styles.MenuBtn}
              location="/Tender/New"
              label="Institutional"
            />
            <DsNavTo
              id="corporate"
              buttonColor="btnPrimary"
              buttonViewStyle="btnText"
              className={styles.MenuBtn}
              location="/Tender/New"
              label="Corporate"
            />
           
          </div>
        }
      ></ContextMenu>
 
    </>
  );
}
 
 
 