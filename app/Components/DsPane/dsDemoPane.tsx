import PaneOpenButton from "./PaneOpenButton";
import DemoLayout from "@/app/ElProComponents/Demo/demoLayout";
export default function DemoPane() {
  return (
    <DemoLayout title={"Panels (DsPane)"}>
      <PaneOpenButton
        id="actionBtn"
        paneId="PaneInset"
        // handleOnClick={handleActionClick}
        // handleOnHover={handleMouseHover}
        label="Inset"
      />
      <PaneOpenButton
        id="actionBtn"
        paneId="PaneRight"
        // handleOnClick={handleActionClick}
        // handleOnHover={handleMouseHover}
        label="Overlay"
      />
    </DemoLayout>
  );
}
