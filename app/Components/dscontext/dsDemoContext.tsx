import DSButton from "../DsButton/DsButton";
import ContextMenu, { closecontext, displaycontext } from "./dscontext";
import DemoLayout from "@/app/ElProComponents/Demo/demoLayout";
export default function DemoContext() {
  return (
    <DemoLayout title="Context holder (DsContext)">
      <ContextMenu
        id={"contextMenuId1"}
        containerId={"containerId1"}
        alignment="center"
        position="vertical"
        content="Vertical Center"
      />
      <ContextMenu
        id={"contextMenuId2"}
        containerId={"containerId2"}
        alignment="right"
        position="vertical"
        content=" vertical Right"
      />
      <ContextMenu
        id={"contextMenuId3"}
        containerId={"containerId3"}
        alignment="left"
        position="vertical"
        content="vertical left"
      />
      <ContextMenu
        id={"contextMenuId4"}
        containerId={"containerId4"}
        alignment="center"
        position="horizontal"
        content="horizontal center"
      />
      <DSButton
        handleOnHover={(e) =>
          displaycontext(
            e,
            "contextMenuId1",
            "containerId1",
            "vertical",
            "center"
          )
        }
        handleMouseLeave={() => closecontext("contextMenuId1")}
      >
        Context1
      </DSButton>
      <DSButton
        handleOnHover={(e) =>
          displaycontext(
            e,
            "contextMenuId2",
            "containerId2",
            "vertical",
            "right"
          )
        }
        handleMouseLeave={() => closecontext("contextMenuId2")}
      >
        Context2
      </DSButton>
      <DSButton
        handleOnHover={(e) =>
          displaycontext(
            e,
            "contextMenuId3",
            "containerId3",
            "vertical",
            "left"
          )
        }
        handleMouseLeave={() => closecontext("contextMenuId3")}
      >
        Context3
      </DSButton>
      <DSButton
        handleOnHover={(e) =>
          displaycontext(
            e,
            "contextMenuId4",
            "containerId4",
            "horizontal",
            "center"
          )
        }
        handleMouseLeave={() => closecontext("contextMenuId4")}
      >
        Context4
      </DSButton>
    </DemoLayout>
  );
}
