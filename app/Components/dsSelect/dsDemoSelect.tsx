"use client";

import DemoLayout from "@/app/ElProComponents/Demo/demoLayout";
import TextField from "../DsTextField/DsTextField";
// import PopUpContext from "./dsContext";
// import { useState } from "react";
import DsSelect from "./dsSelect";

const DemoSelect: React.FC = () => {
  // const options = ["option1", "option2", "option3", "option4", "option5"];
  // const options = [
  //   { value: "1", label: "Option 1" },
  //   { value: "2", label: "Option 2" },
  //   { value: "3", label: "Option 3" },
  // ];
  type Option = {
    label: string;
    value: string | Option[]; // `value` can either be a string or an array of Option objects
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

  // const [value, setValue] = useState<string>("");

  // const handleChange = (value:string) => {
  //   setValue(value);
  //   console.log(value);
  // };
  return (
    <>
      <DemoLayout title="Text Field (DsTextField)">
        <DsSelect
          id="Level"
          options={options}
          type="twolevel"
          placeholder="Click me to select"
          label="twolevelselect"
          disable={false}
        ></DsSelect>

        <DsSelect
          id="Single"
          options={options}
          type="single"
          placeholder="Click me to select"
          label="singleselect"
          disable={false}
        ></DsSelect>

        <DsSelect
          id="Multi"
          options={options}
          type="multi"
          placeholder="Click me to select"
          label="multiselect"
          disable={false}
        ></DsSelect>
        <TextField
          placeholder="placeholder"
          label="label"
          disable={false}
          // onClick={false}
          type="singleline"
          // iconEnd="📋"
        />
      </DemoLayout>
    </>
  );
};

export default DemoSelect;
