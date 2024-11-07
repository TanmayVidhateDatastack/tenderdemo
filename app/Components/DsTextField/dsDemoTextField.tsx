"use client";
import TextField from "./DsTextField";
import DemoLayout from "@/app/ElProComponents/Demo/demoLayout";

const DemoTextField: React.FC = () => {
  return (
    <DemoLayout title="TextField (DsTextField)">
      {/* <TextField
        placeholder="placeholder"
        label="label"
        disable={false}
        // onClick={false}
        type="multiline"
        minRows={10}
        icon="Test"
        iconEnd="📋"
      /> */}

      <TextField
        placeholder="placeholder"
        label="label"
        disable={false}
        // onClick={false}
        type="singleline"
        iconEnd="📋"
      />
    </DemoLayout>
  );
};

export default DemoTextField;
