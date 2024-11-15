"use client";
import DataList from "@/app/Elements/Components/dsDatalist/dsDatalist";
// import NavBack from "../../ElProComponents/NavigationComponent/navBack";
import styles from "../order.module.css";
import pagestyles from "../../page.module.css";
import DsSelect from "@/app/Elements/Components/dsSelect/dsSelect";
import Detail from "@/app/Elements/ElProComponents/DetailComponent/Detail";

import Image from "next/image";
import BankDetailsSrc from "@/app/Elements/Icons/mediumIcons/bankDetails.svg";
import Application from "@/app/Elements/ElProComponents/ApplicationComponents/Application";
import TextField from "@/app/Elements/Components/DsTextField/DsTextField";
import ContextMenu, {
  closeContext,
  displayContext,
} from "@/app/Elements/Components/dsContextHolder/dsContextHolder";
import DSButton from "@/app/Elements/Components/dsButton/dsButton";
import TableComponent from "@/app/Elements/Components/DsTablecomponent/DsTableComponent";
import Ds_checkbox from "@/app/Elements/Components/DsCheckbox/dsCheckbox";

export default function Home() {
  const panNo = "AABCD9532A";
  const gstinNo = "12436514352356675843";
  const drugLicNo = "1234eydfeedqweWSR";
  const fdaLicNo = "2143078925314344568743324568";
  const foodLicNo = "322463215425461663665343";
  const MoTransport = "Road";
  const TransportDate = "15/09/2024";
  const vehType = "Flatbed Truck";
  const vehNo = "MH12VR0244";
  const TransportDocNo = "TD67890";
  const tempTableData = {
    className: "sample-table",
    id: "table-1",
    alignment: "left",
    sortable: true,
    searchAvailable: false,
    columns: [
      {
        columnIndex: 0,
        className: "header-column",
        columnHeader: "PRODUCT CODE & NAME",
        isHidden: false,
        sort: "ASC",
        columnContentType: "string",
      },
      {
        columnIndex: 1,
        className: "header-column",
        columnHeader: "CARTON SIZE",
        isHidden: false,
        sort: "ASC",
        columnContentType: "number",
      },
      {
        columnIndex: 2,
        className: "header-column",
        columnHeader: "QTY",
        isHidden: false,
        sort: "ASC",
        columnContentType: "number",
      },
      {
        columnIndex: 3,
        className: "header-column",
        columnHeader: "BATCH NO.",
        isHidden: false,
        sort: "ASC",
        columnContentType: "number",
      },
      {
        columnIndex: 4,
        className: "header-column",
        columnHeader: "EXPIRY DATE",
        isHidden: false,
        sort: "ASC",
        columnContentType: "date",
      },
      {
        columnIndex: 5,
        className: "header-column",
        columnHeader: "BASIC VALUE",
        isHidden: false,
        sort: "ASC",
        columnContentType: "number",
      },
      {
        columnIndex: 6,
        className: "header-column",
        columnHeader: "DISPATCH QTY",
        isHidden: false,
        sort: "ASC",
        columnContentType: "number",
      },
      {
        columnIndex: 7,
        className: "header-column",
        columnHeader: "BALANCE",
        isHidden: false,
        sort: "ASC",
        columnContentType: "number",
      },
      {
        columnIndex: 8,
        className: "header-column",
        columnHeader: "SPECIAL RATE (₹)",
        isHidden: false,
        sort: "ASC",
        columnContentType: "number",
      },
      {
        columnIndex: 9,
        className: "header-column",
        columnHeader: "NET AMOUT (₹)",
        isHidden: false,
        sort: "ASC",
        columnContentType: "number",
      },
      {
        columnIndex: 10,
        className: "header-column",
        columnHeader: "ESV AMOUNT (₹)",
        isHidden: false,
        sort: "ASC",
        columnContentType: "number",
      },
    ],
    rows: [
      {
        rowIndex: 0,
        className: "row",
        content: [
          {
            columnIndex: 0,
            className: "cell",
            content: "BRZ06- Revelol 35H Tablets",
            contentType: "string",
          },
          {
            columnIndex: 1,
            className: "cell",
            content: 10,
            contentType: "number",
          },
          {
            columnIndex: 2,
            className: "cell",
            content: 10,
            contentType: "number",
          },
          {
            columnIndex: 3,
            className: "cell",
            content: 10000101232,
            contentType: "string",
          },
          {
            columnIndex: 4,
            className: "cell",
            content: "22/09/2025",
            contentType: "date",
          },
          {
            columnIndex: 5,
            className: "cell",
            content: 60.35,
            contentType: "string",
          },
          {
            columnIndex: 6,
            className: "cell",
            content: "0",
            contentType: "number",
          },
          {
            columnIndex: 7,
            className: "cell",
            content: "-",
            contentType: "number",
          },
          {
            columnIndex: 8,
            className: "cell",
            content: "-",
            contentType: "number",
          },
          {
            columnIndex: 9,
            className: "cell",
            content: "-",
            contentType: "number",
          },
          {
            columnIndex: 10,
            className: "cell",
            content: "-",
            contentType: "number",
          },
        ],
      },
    ],
  };
  return (
    <>
      <Application appTitle={"New Order"} hasPrevious={true}>
        <div className={pagestyles.container}>
          <div className={styles.container}>
            <div className={styles.Customer}>
              <div className={styles.title}>Customer Details</div>
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
                      onMouseOver={(e) =>
                        displayContext(e, "BankDetails", "horizontal")
                      }
                      onMouseOut={() => closeContext("BankDetails")}
                    >
                      <Image src={BankDetailsSrc} alt="Bank details"></Image>
                    </div>
                  </Detail>
                </div>
              </div>
            </div>
            <div className={styles.Product}>
              <div className={styles.addProduct}>
                <div className={styles.title}>Product Details</div>
                <div className={styles.input}>
                  <DataList
                    options={[]}
                    inputId={""}
                    dataListId={""}
                    className={""}
                  ></DataList>
                  <TextField placeholder={undefined}></TextField>
                  <DSButton buttonSize="btnLarge">Add</DSButton>
                  <Ds_checkbox id={"180days"} name={"180days"} value={"1"}  label={"Allow < 180 days"}></Ds_checkbox>
                  <DSButton buttonViewStyle="btnText" id="CSV" type="upload">
                    CSV file
                  </DSButton>
                </div>
                <div className={styles.summary}>
                  <Detail detailOf={"Net Value (₹)"}>12345</Detail>
                  <Detail detailOf={"Products"}>12345</Detail>
                </div>
              </div>
              <div className={styles.ProductDetails}>
                <TableComponent
                  className={tempTableData.className}
                  id={tempTableData.id}
                  alignment={tempTableData.alignment.toString()}
                  columns={tempTableData.columns}
                  rows={tempTableData.rows}
                  isFooterRequired={false}
                ></TableComponent>
              </div>
            </div>
            <div className={styles.shipping}>
              <div className={styles.shippingDetails}>
                <div className={styles.title}>Shipping Details</div>
                <div className={styles.ToFrom}>
                  <div className={styles.shipTo}>
                    <div>To</div>
                    <div className={styles.Address}>Ipca Lab,45 MangoLane</div>
                  </div>
                  <div className={styles.From}>
                    <div>From</div>
                    <div className={styles.Address}>
                      Anjali Rao,12 Lotus Park,Mumbai,MH 400020
                    </div>
                  </div>
                  <div>
                    <DataList
                      options={[]}
                      inputId={""}
                      dataListId={""}
                      className={""}
                      label="Transport ID & name"
                    ></DataList>
                  </div>
                </div>
              </div>
              <div className={styles.billingDetails}>
                <div className={styles.title}>Billing Details</div>
                <div className={styles.ToFrom}>
                  <div className={styles.billTo}>
                    <div className={styles.subtitle}>To</div>
                    <div className={styles.Address}>
                      Ipca Lab,78 Jasmine Road
                    </div>
                  </div>
                  <div className={styles.billFrom}>
                    <div className={styles.subtitle}>From</div>
                    <div className={styles.Address}>Neha Gupta,34 Rose</div>
                  </div>
                </div>
              </div>
              <div className={styles.transportDetails}>
                <Detail detailOf="Mode of Transport">{MoTransport}</Detail>
                <Detail detailOf="Transportation Date">{TransportDate}</Detail>
                <Detail detailOf="Vehicle Type">{vehType}</Detail>
                <Detail detailOf="Vehicle Number">{vehNo}</Detail>
                <Detail detailOf="Transport Document Number">
                  {TransportDocNo}
                </Detail>
              </div>
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
