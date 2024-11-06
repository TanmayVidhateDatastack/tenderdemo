import ContextMenu, { closecontext, displaycontext } from "./dscontext";
import DemoLayout from "@/app/ElProComponents/Demo/demoLayout";
export default function DemoContext() {

 
  return (
    
    <DemoLayout title="Context holder (DsContext)">
      <ContextMenu id={"contextMenuId1"} containerId={"containerId1"} alignment="center" position ="vertical"content="kalyani deshmukh"/>
      <ContextMenu id={"contextMenuId2"} containerId={"containerId2"} alignment="right" position ="vertical"content="kalyani deshmukh"/>
      <ContextMenu id={"contextMenuId3"} containerId={"containerId3"} alignment="left" position ="vertical"content="kalyani deshmukh"/>
      <ContextMenu id={"contextMenuId4"} containerId={"containerId4"} alignment="center" position ="horizontal"content="kalyani deshmukh"/>
      <button
        onClick={(e) => displaycontext(e, "contextMenuId1", "containerId2", "horizontal","center")}
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          width: "150px",
          height: "50px",
        }}
        onBlur={() =>closecontext("contextMenuId1")}
      >
     
      </button>

    </DemoLayout>
    
  );
}
