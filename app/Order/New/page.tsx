"use client";
import DataList from "@/app/Components/dsDatalist/dsDatalist";
// import NavBack from "../../ElProComponents/NavigationComponent/navBack";
import styles from "../order.module.css";
import pagestyles from "../../page.module.css";
import DsSelect from "@/app/Components/dsSelect/dsSelect";
import Detail from "@/app/ElProComponents/DetailComponent/Detail";

import Image from "next/image";
import BankDetailsSrc from "../../Icons/mediumIcons/bankDetails.svg";
import Application from "@/app/ElProComponents/ApplicationComponents/Application";
import TextField from "@/app/Components/DsTextField/DsTextField";
import ContextMenu, {
  closeContext,
  displayContext,
} from "@/app/Components/dsContextHolder/dsContextHolder";

export default function Home() {
  const panNo = "AABCD9532A";
  const gstinNo = "12436514352356675843";
  const drugLicNo = "1234eydfeedqweWSR";
  const fdaLicNo = "2143078925314344568743324568";
  const foodLicNo = "322463215425461663665343";
  return (
    <>
      <Application appTitle={"New Order"} hasPrevious={true}>
        <div className={pagestyles.container}>
          <div className={styles.container}>
            <div className={styles.Customer}>
              <div className={styles.title}>Customer Dtails</div>
              <div className={styles.inputDetails}>
                <div>
                  <DataList
                    options={[]}
                    inputId={""}
                    dataListId={""}
                    className={""}
                    label="Customer ID & Name"
                    placeholder="Search customer"
                  ></DataList>
                </div>
                <div>
                  <TextField
                    placeholder={"Order No"}
                    label={"Purchase order no(PO)"}
                  ></TextField>
                </div>
                <div>
                  <TextField
                    label="Purchase order date"
                    placeholder="dd/mm/yyyy"
                  ></TextField>
                </div>
                <div>
                  <DsSelect
                    options={[]}
                    type={"single"}
                    placeholder={"Ordered By"}
                    id={"orderedBy"}
                  ></DsSelect>
                </div>
              </div>
              <div className={styles.details}>
                <div>
                  <Detail detailOf="PAN">{panNo}</Detail>
                  <Detail detailOf="GSTIN">{gstinNo}</Detail>
                  <Detail detailOf="Drug Lic">{drugLicNo}</Detail>
                  <Detail detailOf="FDA Sch X Lic No">{fdaLicNo}</Detail>
                </div>
                <div>
                  <Detail detailOf="Food Lic No">{foodLicNo}</Detail>
                  <Detail detailOf="Bank account details">
                    <div
                      onMouseOver={(e) => displayContext(e, "BankDetails","horizontal")}
                      // onMouseOut={() => closeContext("BankDetails")}
                    >
                      <Image
                        src={BankDetailsSrc}
                        alt="Bank details"
                      ></Image>
                    </div>
                  </Detail>
                </div>
              </div>
            </div>
            <div className={styles.Product}>
              <div className={styles.addProduct}>
                <div className={styles.title}>Product Details</div>
                <div className={styles.input}></div>
                <div className={styles.summary}></div>
              </div>
              <div className={styles.ProductDetails}></div>
            </div>
            <div className={styles.footer}></div>
          </div>
        </div>
      </Application>
      <ContextMenu
        id={"BankDetails"}
        showArrow={true}
        content={
          <>
            <Detail detailOf="Food Lic No">{foodLicNo}</Detail>
            <Detail detailOf="Food Lic No">{foodLicNo}</Detail>
          </>
        }
      ></ContextMenu>
    </>
  );
}
