"use client";
import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import ipca from "@/app/Elements/Icons/mediumIcons/ipca.svg";
import Detail from "@/app/Elements/ElProComponents/DetailComponent/Detail";
import locationIcon from "@/app/Elements/Icons/smallIcons/Address_location.svg";
import gmail from "@/app/Elements/Icons/smallIcons/gmail.svg";
import phoneCallIcon from "@/app/Elements/Icons/smallIcons/phonecall.svg";

// import buttonStyles from "../../Components/DsButton/dsButton.module.css";
import buttonStyles from "@/app/Elements/Components/dsButton/dsButton.module.css";
import Invoice_Data from "./invoice_Data";

const Invoice: React.FC = () => {
  const companyName = "IPCA LABORATORIES LIMITED";
  const cinNumber = "L24239MH194PLC007837";
  const gstin = "07AAACI1220M2ZU";
  const add1 =
    "Property no.41(BM/GF/FF/2F), Rama Road, Najafgarh Road, Industrial Area, New Delhi, Delhi - 110015";
  const email = "ipca.delhi@ipca.com";
  const mobile = "+91-8542598757  +91-7452598757";
  const Pan = "AAACI1220M";
  const Drug_Lic = "20B-DL-TGB-130185 - 21B-DL-TGB-130186/87/88/89";
  const FDA = "21B-DL-TGB-130186/87/88/89";
  const Food = " 13319010000576";
  const add2 =
    "F2/6. Okhla Industrial Area, Phase 1, New Delhi, Delhi - 110020";
  const mobile2 = "011-45737271  011-66737271  011-61660000";
  const Pan2 = "AABCD9532A";
  const Drug_Lic2 = "20B-DL-TGB-130185 - 21B-DL-TGB-130186/87/88/89";
  const FDA2 = "21B-DL-TGB-130186/87/88/89";
  const Food2 = "13319010000576";
  const roadOff =
    " 48. Kandivali Industrial Estate, Kandivali (West) Mumbai - 400067. ";
  const phno = "022-66474444 / 66474400 ";
  const fax = "022-28686613";
  const website = "www.ipcalabs.com.";
  const email2 = "ipca@ipca.com";
  const transporter = "Rajput Transport Services";
  const Lr_number = "100010543";
  const Lr_date = "22/08/2024";
  const vehical = "DL12 VA 0234";
  const E_way = "761395541461";
  const Irn_no = "a1b2c3d4e5f67890abcdef1234567890abcdef1234567890";
  const Ack_no = "172414166157216";
  const Ack_date = "06/01/2024";
  const tax_invoice = "100010543";
  const tax_invoice_date = "06/01/2024";
  const due_date = "06/01/2024";

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div>
          <Image className={styles.ipca} alt={"Ipca Logo"} src={ipca} />
          <h3>{companyName}</h3>
          <div className={styles.separate}>
            <Detail detailOf="CIN">{cinNumber}</Detail>
            <Detail detailOf="GSTIN">{gstin}</Detail>
          </div>
        </div>
        <div className={styles.scanner}></div>
      </div>
      <div className={styles.head_menu}>
        <Detail
          startIcon={<Image src={locationIcon} alt="icon" />}
          style="normal"
        >
          {add1}
        </Detail>
        <Detail startIcon={<Image src={gmail} alt="icon" />} style="normal">
          {email}
        </Detail>
        <Detail
          startIcon={<Image src={phoneCallIcon} alt="icon" />}
          style="normal"
        >
          {mobile}
        </Detail>
      </div>
      <div className={styles.invoice_details}>
        <Detail detailOf="P No">{Pan}</Detail>
        <div className={buttonStyles.right_separator}></div>
        <Detail detailOf="Drug Lic">{Drug_Lic}</Detail>
        <div className={buttonStyles.right_separator}></div>
        <Detail detailOf="Food Lic No" style="normal">
          {Food}
        </Detail>
        <div className={buttonStyles.right_separator}></div>
        <Detail detailOf="FDA Sch. X Lic No">{FDA}</Detail>
        {/* <div className={buttonStyles.right_separator}></div> */}
      </div>
      <div className={styles.invoice}>
        <h2>INVOICE -100010103012</h2>
      </div>
      <div className={styles.container}>
        <div>
          <p>To</p>
          <h3>DF09 - DR DISTRIBUTION</h3>
          <div className={styles.separate}>
            <Detail detailOf="GSTIN">{gstin}</Detail>
          </div>
        </div>
      </div>
      <div className={styles.head_menu}>
        {" "}
        <Detail
          startIcon={<Image src={locationIcon} alt="icon" />}
          style="normal"
        >
          {add2}
        </Detail>
        <Detail
          startIcon={<Image src={phoneCallIcon} alt="icon" />}
          style="normal"
        >
          {mobile2}
        </Detail>
      </div>
      <div className={styles.invoice_details}>
        <Detail detailOf="PAN" style="normal">
          {Pan2}
        </Detail>
        <div className={buttonStyles.right_separator}></div>
        <Detail detailOf="Drug Lic">{Drug_Lic2}</Detail>
        <div className={buttonStyles.right_separator}></div>
        <Detail detailOf="FDA Sch. X Lic No">{FDA2}</Detail>
        <div className={buttonStyles.right_separator}></div>
        <Detail detailOf="Food Lic No">{Food2}</Detail>
        {/* <div className={buttonStyles.right_separator}></div> */}
      </div>
      <div className={styles.bottom}>
        <Detail detailOf="CORPORATE BANK - FCS/001 - CANNAUGHT PLACE _ _ _ _ _ _ NEW DELHI - 110001"></Detail>
      </div>
      <div className={styles.container}>
        <div className={styles.box}>
          <div className={styles.separate}>
            <Detail detailOf="Transporter">{transporter}</Detail>
            <Detail detailOf="Number of Cases"></Detail>
          </div>
          <div className={styles.separate}>
            <Detail detailOf="LR Number">{Lr_number}</Detail>
            <Detail detailOf="LR Date">{Lr_date}</Detail>
          </div>
          <div className={styles.separate}>
            <Detail detailOf="Vehical No">{vehical}</Detail>
          </div>
          <div className={styles.boxbottom}>
            <Detail detailOf="E Way Bill No">{E_way}</Detail>
            <Detail detailOf="E Way Bill No">{E_way}</Detail>
          </div>
        </div>
        <div className={styles.box}>
          <div className={styles.boxtop}>
            <Detail
              detailOf="Subject To ________JURISDICTION(Under RULE 46 of CGST Rules, 2017)"
              style="normal"
            ></Detail>
          </div>
          <div className={styles.separate}>
            <Detail
              detailOf="GST Invoice For Supply of Goods"
              style="normal"
            ></Detail>
          </div>
          <div className={styles.separate}>
            <Detail detailOf="Tax Invoice">{tax_invoice}</Detail>
            <Detail detailOf="Tax Invoice Date">{tax_invoice_date}</Detail>
          </div>
          <div className={styles.separate}>
            <Detail detailOf="Due Date">{due_date}</Detail>
          </div>
        </div>
      </div>
      <div className={styles.invoice_details}>
        <Detail detailOf="IRN No">{Irn_no}</Detail>
        <Detail detailOf="ACK No">{Ack_no}</Detail>
        <Detail detailOf="ACK Date">{Ack_date}</Detail>
      </div>
      <div>
        <Invoice_Data />
      </div>
      <div className={styles.footer_End}>
        <span>Road off.: {roadOff}</span>
        <span>Ph. No. {phno}</span>
        <span>Fax. {fax}</span>
        <span>Website : {website}</span>
        <span>E-mail Address : {email2}</span>
      </div>
    </div>
  );
};
export default Invoice;
