"use client";

// import PopUpContext from "./dsContext";
// import { useState } from "react";
// import { SetStateAction, useState } from "react";
import DsSelect from "./dsSelect";

const DemoSelect: React.FC = () => {
  // const options = ["option1", "option2", "option3", "option4", "option5"];
  // const options = [
  //   { value: "1", label: "Option 1" },
  //   { value: "2", label: "Option 2" },
  //   { value: "3", label: "Option 3" },
  // ];
  // type Option = {
  //   label: string;
  //   value: string | Option[]; // `value` can either be a string or an array of Option objects
  // };

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
  ];

  // const [value, setValue] = useState<string>("");

  // const handleChange = (value:string) => {
  //   setValue(value);
  //   console.log(value);
  // };
  return (
    <>
      <DsSelect
        options={options}
        type="single"
        placeholder="Click me to select"
        label="singleselect"
      ></DsSelect>
      <DsSelect
        options={options}
        type="multi"
        placeholder="Click me to select"
        label="multiselect"
      ></DsSelect>
      <DsSelect
        options={options}
        type="twolevel"
        placeholder="Click me to select"
        label="multiselect"
      ></DsSelect>
    </>
  );
};

export default DemoSelect;
