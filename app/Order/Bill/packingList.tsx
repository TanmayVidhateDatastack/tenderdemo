"use client";
import styles from "./packing.module.css";
import buttonStyles from "@/app/Elements/Components/dsButton/dsButton.module.css";
import Image from "next/image";

import IpcaLogo from "../../Elements/Icons/mediumIcons/Ipca.svg";
import gmail from "../../Elements/Icons/smallIcons/gmail.svg";
import phoneCallIcon from "../../Elements/Icons/smallIcons/phonecall.svg";
import locationIcon from "../../Elements/Icons/smallIcons/Address_location.svg";
import PackingData from "./packingData";
import Detail from "@/app/Elements/ElProComponents/DetailComponent/Detail";
import TextField from "@/app/Elements/Components/DsTextField/DsTextField";

const PackingList: React.FC = () => {
  const packingListNo = "1000100030440";
  const DF09 = "DR DISTRIBUTION";
  const companyNme = "IPCA Depot Name";
  const add1 = "F2/6. Okhta Inustrial Area, Phase 1, New Delhi- 110020";
  const telephone1 = "011-45737271 011-66737271 011-61660000";
  const mobile1 = "+91-8542598757 +91-7452598757";
  const add2 =
    "Property no.41(BM/GF/FF/2F), Rama Road, Najafgarh Road, Industrial Area, New Delhi - 110015";
  const email = "ipca.delhi@ipca.com";
  const mobile2 = "+91-8542598757 +91-7452598757";
  const packingDate = "24/08/2024";
  const invoiceNo = "100010103012";
  const invoiceDate = "24/08/2024";
  const roadOff =
    "48. Kandivali Industrial Estate, Kandivali (West) Mumbai - 400067.";
  const phno = "022-66474444 / 66474400";
  const fax = "022-28686613 ";
  const email2 = "ipca@ipca.com";
  const website = "www.ipcalabs.com.";

  return (
    <>
      <div className={styles.packingList_Container}>
        <div className={styles.packingList_Head}>
          <h2>Packing List - {packingListNo}</h2>
          <span>
            <Image src={IpcaLogo} alt="icon" />
          </span>
        </div>
        <div className={styles.packingList_Head}>
          <h3>DF09 - {DF09}</h3>
          <h3>{companyNme}</h3>
        </div>
        <div className={styles.packingList_Head}>
          <div className={styles.head_menu}>
            {" "}
            <Detail startIcon={<Image src={locationIcon} alt="icon" />}>
              {add1}
            </Detail>
            <Detail startIcon={<Image src={phoneCallIcon} alt="icon" />}>
              {telephone1}
            </Detail>
            <Detail startIcon={<Image src={phoneCallIcon} alt="icon" />}>
              {mobile1}
            </Detail>
          </div>
          <div className={styles.head_menu}>
            {" "}
            <Detail startIcon={<Image src={locationIcon} alt="icon" />}>
              {add2}
            </Detail>
            <Detail startIcon={<Image src={gmail} alt="icon" />}>
              {email}
            </Detail>
            <Detail startIcon={<Image src={phoneCallIcon} alt="icon" />}>
              {mobile2}
            </Detail>
          </div>
        </div>
        <div className={styles.packingList_details}>
          <Detail detailOf="Packing List Generation Date">{packingDate}</Detail>
          <div className={buttonStyles.right_separator}></div>
          <Detail detailOf="Invoice Number">{invoiceNo}</Detail>
          <div className={buttonStyles.right_separator}></div>
          <Detail detailOf="Invoice Date">{invoiceDate}</Detail>
        </div>
        <div>
          <PackingData />
        </div>
        <div className={styles.footer_menu}>
          <div className={styles.signature}>
            <h4>Signature </h4>
            <div className={styles.authSign}>(Autorised Signatory)</div>
          </div>
          <div className={styles.date}>Date</div>
        </div>

        <div className={styles.notes}>
          <h4>Notes</h4>
          <TextField
            placeholder="placeholder"
            label="label"
            // size="medium"
            // labelsize="medium-label"
            disable={false}
            // onClick={false}
            type="multiline"
            minRows={5}
            // icon="Test"
            // iconEnd="📋"
          />
        </div>
        <div className={styles.footer_End}>
          <span>Road off.: {roadOff}</span>
          <span>Ph. No. {phno}</span>
          <span>Fax. {fax}</span>
          <span>Website : {website}</span>
          <span>E-mail Address : {email2}</span>
        </div>
      </div>
    </>
  );
};

export default PackingList;
