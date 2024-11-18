"use client";
import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import ipca from "@/app/Elements/Icons/mediumIcons/ipca.svg";
import Detail from "@/app/Elements/ElProComponents/DetailComponent/Detail";
import locationIcon from "@/app/Elements/Icons/smallIcons/Address_location.svg";
import gmail from "@/app/Elements/Icons/smallIcons/gmail.svg";
import phoneCallIcon from "@/app/Elements/Icons/smallIcons/phonecall.svg";
import buttonStyles from "@/app/Elements/Components/dsButton/dsButton.module.css";
import Invoice_Data from "./invoice_Data";
import Invoice_Data2 from "./invoice_Data2";
import Invoice_Data3 from "./invoice_Data3";

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
  const net_amt = "92823.00";
  const material = "Material Value:";
  const material_value = "90504.55";
  const tax = "Tax Amount:";
  const tax_amt = "11137.06";
  const gross = "Gross Value:";
  const gross_val = "107641.61";
  const adjust = "Less Adjustment:";
  const adjust_val = "14759.00";
  const val = "92822.61";
  const round_off = "Round off:";
  const round_val = "0.39";
  const net_amount = "Net Amount:";
  const net_val = "92823.00";
  const rupees = "One Lakh Seven Thousand Forty Two Only";
  const net_invoice = "Net Amount as per Invoice:";
  const net_invoice_amt = "92823.00";
  const TDS = "Less TDS@ 0.1% on Rs. 96504.55";
  const tds_amt = "97";
  const payable = "Net Amount Payble";
  const payable_amt = "92823.97";
  const note = "Note:";
  const note_val =
    "Interest will be charged @ 24% p.a if drawee fails to pay by due date.";
  const rr_val = "RR Value Rs. 107228.65";
  const ipca_lab = "For IPCA Laboratories Limited";

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
        </div>
        <div className={styles.scanner}></div>
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
        <div>
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
      <hr></hr>
      <div className={styles.last_table}>
        <div className={styles.tabledata_2}>
          <div className={styles.size}>
            <div>
              <Invoice_Data2 />
            </div>
          </div>
          <div className={styles.half_table}>
            <div className={styles.whole_box}>
              <div className={`${styles.last_table} `}>
                <div>
                  <Detail detailOf="Adjustment Details" style="normal"></Detail>
                </div>
                <div>
                  <Invoice_Data3 />
                </div>
                <div className={styles.net_amt}>
                  <Detail detailOf="Net Amount">{net_amt}</Detail>
                </div>
                <hr />
              </div>
              <div className={styles.invoice_container}>
                <div className={styles.row}>
                  <span className={styles.label}>{material}</span>
                  <span className={styles.value}>{material_value}</span>
                </div>
                <div className={styles.row}>
                  <span className={styles.label}>{tax}</span>
                  <span className={styles.value}>{tax_amt}</span>
                </div>
                <div className={styles.row}>
                  <span className={styles.label}>{gross}</span>
                  <span className={styles.value}>{gross_val}</span>
                </div>
                <div className={styles.row}>
                  <span className={styles.label}>{adjust}</span>
                  <span className={styles.value}>{adjust_val}</span>
                </div>
                <div className={styles.row}>
                  <span className={styles.value}>{val}</span>
                </div>
                <div className={styles.row}>
                  <span className={styles.label}>{round_off}</span>
                  <span className={styles.value}>{round_val}</span>
                </div>
                <div className={`${styles.row}`}>
                  <span className={styles.label}>{net_amount}</span>
                  <span className={`${styles.value} ${styles.total}`}>
                    {net_val}
                  </span>
                </div>
              </div>
            </div>
            <div className={styles.rupees}>
              {/* <p>Rupees: {rupees} </p> */}
              <Detail detailOf="Rupees">{rupees}</Detail>
            </div>
          </div>
        </div>
      </div>
      <hr></hr>
      <div className={styles.invoice_container2}>
        <div className={`${styles.row1} ${styles.total}`}>
          <span className={styles.label}>{net_invoice}</span>
          <span className={`${styles.value}`}>{net_invoice_amt}</span>
        </div>
        <div className={`${styles.row1} ${styles.total}`}>
          <span className={styles.label}>{TDS}</span>
          <span className={`${styles.value}`}>{tds_amt}</span>
        </div>
        <div className={`${styles.row1} ${styles.total}`}>
          <span className={styles.label}>{payable}</span>
          <span className={`${styles.value}`}>{payable_amt}</span>
        </div>
      </div>
      <hr></hr>
      <div className={styles.last_div}>
        <div className={`${styles.row1} ${styles.total}`}>
          <span className={styles.label}>{note}</span>
          <span className={`${styles.value}`}>{note_val}</span>
        </div>
        <div>
          <span className={styles.label}>{rr_val}</span>
        </div>
        <div className={`${styles.row1} ${styles.total}`}>
          <span className={styles.label}>{ipca_lab}</span>
        </div>
      </div>
      <div className={styles.auth}>
        <p>(Authorised Signatory)</p>
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
