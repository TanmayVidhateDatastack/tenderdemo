"use client";

import DemoLayout from "@/app/ElProComponents/Demo/demoLayout";
import TextField from "../DsTextField/DsTextField";

import DsSelect from "./dsSelect";

const DemoSelect: React.FC = () => {
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
