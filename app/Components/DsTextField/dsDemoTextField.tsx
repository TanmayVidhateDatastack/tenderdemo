"use client";
import TextField from "./DsTextField";
import DemoLayout from "@/app/ElProComponents/Demo/demoLayout";

const DemoTextField: React.FC = () => {
  return (
    <DemoLayout title="DsTextField">
      <TextField
        placeholder="placeholder"
        label="label"
        disable={false}
        // onClick={false}
        type="multiline"
        icon="Test"
        iconEnd="📋"
      />

      <TextField
        placeholder="placeholder"
        label="label"
        disable={false}
        // onClick={false}
        type="singleline"
        icon="Test"
        iconEnd="📋"
      />
    </DemoLayout>
  );
};

export default DemoTextField;
