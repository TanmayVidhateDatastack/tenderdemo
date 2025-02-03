"use client";
// import NavBack from "../../ElProComponents/NavigationComponent/navBack";
import styles from "./tender.module.css";
import pagestyles from "../../page.module.css";
import DsSelect from "@/app/Elements/Components/dsSelect/dsSelect";

import Image from "next/image";
import Application from "@/app/Elements/ElProComponents/ApplicationComponents/Application";
import TextField from "@/app/Elements/Components/DsTextField/DsTextField";
import DSButton from "@/app/Elements/Components/dsButton/dsButton";
import NavTo from "@/app/Elements/ElProComponents/NavigationComponent/navTo";
import DSButtonGroup from "@/app/Elements/Components/dsButton/dsButtonGroup";
import Deposits from "./deposits";
import TenderFees from "./tenderfees";
import Embossment from "./Embossment";

export default function Home() {
  type Option = {
    label: string;
    value: string | Option[];
  };

  const options: Option[] = [
    {
      label: "Fruits",
      value: [
        { label: "Apple", value: "apple" },
        { label: "Banana", value: "banana" },
      ],
    },
    {
      label: "Vegetables",
      value: [
        { label: "Carrot", value: "carrot" },
        { label: "Lettuce", value: "lettuce" },
      ],
    },
    {
      label: "Beverages",
      value: [
        { label: "Water", value: "water" },
        { label: "Juice", value: "juice" },
        { label: "Tea", value: "tea" },
      ],
    },
    {
      label: "Animals",
      value: [
        { label: "Dog", value: "dog" },
        { label: "Cat", value: "cat" },
        { label: "Cow", value: "cow" },
      ],
    },
  ];
  return (
    <>
      <Application
        appTitle={"New Tender"}
        hasPrevious={true}
        appMenu={<NavTo location="/Order/Bill">Billing</NavTo>}
      >
        <div className={pagestyles.container}>
          <div className={styles.container}>
            <div className={styles.Customer}>
              <div className={styles.title}>
                <DSButtonGroup id="btnGroup">
                  <DSButton
                    id="detailsBtn"
                    buttonViewStyle="btnContained"
                    label="Basic Details"
                  />
                  <DSButton
                    id="productsBtn"
                    buttonViewStyle="btnContained"
                    label="Products ₹ (V1)"
                  />
                  <DSButton
                    id="docBtn"
                    buttonViewStyle="btnContained"
                    label="Documents"
                  />
                </DSButtonGroup>
              </div>
              <div className={styles.inputDetails}>
                <div>
                  <TextField
                    placeholder="Please search and select here"
                    label="Select Customer"
                    id="customerSelect"
                    dataListId="customer-list"
                    showshadow="shadow"
                    disable={false}
                    className={styles.datalist}
                    options={[
                      {
                        attributes: { key: "key1" },
                        id: "opt1",
                        value: "Directorate of Health Services",
                      },
                      {
                        attributes: { key: "key2" },
                        id: "opt2",
                        value: "Joint Director (Mal. & Fil.)",
                      },
                      {
                        attributes: { key: "key3" },
                        id: "opt3",
                        value: "State Malaria Officer",
                      },
                      {
                        attributes: { key: "key4" },
                        id: "opt4",
                        value: "Anna University",
                      },
                      {
                        attributes: { key: "key5" },
                        id: "opt5",
                        value: "Gulshan Enterprises",
                      },
                    ]}
                  ></TextField>
                </div>
                <div>
                  <TextField
                    placeholder={"Please Type Here"}
                    label={"Customer Location"}
                  ></TextField>
                </div>
                <div>
                  <TextField
                    label="Tender Number"
                    placeholder="Please Type Here"
                  ></TextField>
                </div>
                <div>
                  <DsSelect
                    options={[
                      {
                        label: "Single-Delivery",
                        value: [
                          { label: "Apple", value: "apple" },
                          { label: "Banana", value: "banana" },
                        ],
                      },
                      {
                        label: "Multi-Delivery",
                        value: [
                          { label: "Apple", value: "apple" },
                          { label: "Banana", value: "banana" },
                        ],
                      },
                    ]}
                    type={"single"}
                    label="Tender Type"
                    placeholder={"Please Select Here"}
                    id={"tenderType"}
                  ></DsSelect>
                </div>

                <div>
                  <TextField
                    label={"Tender issue date"}
                    placeholder={"DD/MM/YYYY"}
                  ></TextField>
                </div>
                <div>
                  <TextField
                    label="Last date of purchasing"
                    placeholder="DD/MM/YYYY"
                  ></TextField>
                </div>
                <div>
                  <TextField
                    label={"Submission Date"}
                    placeholder={"DD/MM/YYYY"}
                  ></TextField>
                </div>
                <div>
                  <TextField
                    label={"Rate contract validity"}
                    placeholder={"DD/MM/YYYY"}
                  ></TextField>
                </div>

                <div>
                  <DsSelect
                    options={[
                      {
                        label: "Online",
                        value: [
                          { label: "Apple", value: "apple" },
                          { label: "Banana", value: "banana" },
                        ],
                      },
                      {
                        label: "Offline",
                        value: [
                          { label: "Apple", value: "apple" },
                          { label: "Banana", value: "banana" },
                        ],
                      },
                    ]}
                    type={"single"}
                    label="Submission Mode"
                    placeholder={"Please Select Here"}
                    id={"submissionMode"}
                  ></DsSelect>
                </div>
                <div>
                  <TextField
                    label={"Delivery Period"}
                    placeholder={"Please type or select"}
                  ></TextField>
                </div>
                <div>
                  <TextField
                    label={"Extended Delivery Period"}
                    placeholder={"Please type or select"}
                  ></TextField>
                </div>
                <div>
                  <TextField
                    label="Penalty for last delivery purchase %"
                    placeholder="Please type here"
                  ></TextField>
                </div>

                <div>
                  <TextField
                    label="Tender site/url"
                    placeholder="Please type here"
                  ></TextField>
                </div>
              </div>
              <div className={styles.inputDetails}>
                <div>
                  <DsSelect
                    options={[
                      {
                        label: "IPCA",
                        value: [
                          { label: "Apple", value: "apple" },
                          { label: "Banana", value: "banana" },
                        ],
                      },
                      {
                        label: "Stockist",
                        value: [
                          { label: "Spare India", value: "apple" },
                          { label: "VR Chemicals", value: "banana" },
                          { label: "Lifeline Pharma", value: "banana" },
                          { label: "S.S.P PTV.LTD", value: "banana" },
                          { label: "Flarer S.A", value: "banana" },
                          { label: "Neat Point", value: "banana" },
                        ],
                      },
                    ]}
                    type={"twolevel"}
                    label="Applied By"
                    placeholder={"Please search or select here"}
                    id={"appliedBy"}
                  ></DsSelect>
                </div>
                <div>
                  <DsSelect
                    options={[
                      {
                        label: "IPCA",
                        value: [
                          { label: "Apple", value: "apple" },
                          { label: "Banana", value: "banana" },
                        ],
                      },
                      {
                        label: "Stockist",
                        value: [
                          { label: "Spare India", value: "apple" },
                          { label: "VR Chemicals", value: "banana" },
                          { label: "Lifeline Pharma", value: "banana" },
                          { label: "S.S.P PTV.LTD", value: "banana" },
                          { label: "Flarer S.A", value: "banana" },
                          { label: "Neat Point", value: "banana" },
                        ],
                      },
                    ]}
                    type={"twolevel"}
                    label="Supplied By"
                    placeholder={"Please search or select here"}
                    id={"suppliedBy"}
                  ></DsSelect>
                </div>
                <div>
                  <DsSelect
                    options={[
                      {
                        label: "Pune",
                        value: [
                          { label: "Apple", value: "apple" },
                          { label: "Banana", value: "banana" },
                        ],
                      },
                      {
                        label: "Mumbai",
                        value: [
                          { label: "Apple", value: "apple" },
                          { label: "Banana", value: "banana" },
                        ],
                      },
                      {
                        label: "Dehradun (Unit 1)",
                        value: [
                          { label: "Apple", value: "apple" },
                          { label: "Banana", value: "banana" },
                        ],
                      },
                      {
                        label: "Siliguri Depot",
                        value: [
                          { label: "Apple", value: "apple" },
                          { label: "Banana", value: "banana" },
                        ],
                      },
                      {
                        label: "Indore III",
                        value: [
                          { label: "Apple", value: "apple" },
                          { label: "Banana", value: "banana" },
                        ],
                      },
                    ]}
                    type="multi"
                    label="Depot"
                    placeholder={"Please search or select here"}
                    id={"depot"}
                  ></DsSelect>
                </div>
                <div>
                  <TextField
                    label="Stockist / Liasioner name"
                    placeholder="Please type here"
                  ></TextField>
                </div>
                <div>
                  <TextField
                    label="Stockist / Liasioner discount %"
                    placeholder="Please type here"
                  ></TextField>
                </div>
              </div>
              <div className={styles.inputComps}>
                <Deposits />
                <TenderFees />
              </div>
              <div>
                <div>Supply Conditions</div>
                <div className={styles.inputDetails}>
                  <div>
                    <DsSelect
                      options={[
                        {
                          label: "Single",
                          value: [
                            { label: "Apple", value: "apple" },
                            { label: "Banana", value: "banana" },
                          ],
                        },
                        {
                          label: "Multiple",
                          value: [
                            { label: "Apple", value: "apple" },
                            { label: "Banana", value: "banana" },
                          ],
                        },
                      ]}
                      type={"multi"}
                      label="Supply points"
                      placeholder={"Please select here"}
                      id={"supplyPoints"}
                    ></DsSelect>
                  </div>
                  <div>
                    <TextField
                      label="Provide no. of consignees"
                      placeholder="Please type here"
                    ></TextField>
                  </div>

                  <div>
                    <DsSelect
                      options={[
                        {
                          label: "Required",
                          value: [
                            { label: "Apple", value: "apple" },
                            { label: "Banana", value: "banana" },
                          ],
                        },
                        {
                          label: "Not Required",
                          value: [
                            { label: "Apple", value: "apple" },
                            { label: "Banana", value: "banana" },
                          ],
                        },
                      ]}
                      type={"single"}
                      label="Test report requirement"
                      placeholder={"Please select here"}
                      id={"reportReq"}
                    ></DsSelect>
                  </div>
                  <div>
                    <DsSelect
                      options={[
                        {
                          label: "Self Item",
                          value: [
                            { label: "Apple", value: "apple" },
                            { label: "Banana", value: "banana" },
                          ],
                        },
                        {
                          label: "L/L Item",
                          value: [
                            { label: "Apple", value: "apple" },
                            { label: "Banana", value: "banana" },
                          ],
                        },
                        {
                          label: "Third Party Item",
                          value: [
                            { label: "Apple", value: "apple" },
                            { label: "Banana", value: "banana" },
                          ],
                        },
                      ]}
                      type={"multi"}
                      label="Eligibility"
                      placeholder={"Please search and select here"}
                      id={"eligibility"}
                    ></DsSelect>
                  </div>
                </div>
              </div>
              <div>
                <Embossment />
              </div>
            </div>

            <div className={styles.footer}></div>
          </div>
        </div>
      </Application>
    </>
  );
}
