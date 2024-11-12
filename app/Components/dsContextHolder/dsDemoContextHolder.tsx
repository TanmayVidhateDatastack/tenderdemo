import React from "react";
import DSButton from "../dsButton/DsButton";
import ContextMenu, { displayContext, closeContext } from "./dsContextHolder";

import DemoLayout from "@/app/ElProComponents/Demo/demoLayout";

export default function DemoContext() {
  return (
    <DemoLayout title="Context holder (DsContext)">
    <ContextMenu
        id="contextMenuId4"
        content="Context Holder"
        showArrow={true}
      />
        <DSButton
        handleOnHover={(e) =>
          displayContext(e, "contextMenuId4", "horizontal", "center", "Context 4", true)
        }
        handleMouseLeave={() => closeContext("contextMenuId4")}
      >
        Context1
      </DSButton>
      
      <ContextMenu
        id="contextMenuId4"
        content="Context Holder"
        showArrow={true}
      />
        <DSButton
        handleOnHover={(e) =>
          displayContext(e, "contextMenuId4", "horizontal", "left", "Context 4", true)
        }
        handleMouseLeave={() => closeContext("contextMenuId4")}
      >
        Context2
      </DSButton>
      <ContextMenu
        id="contextMenuId4"
        content="Context Holder"
        showArrow={true}
      />
        <DSButton
        handleOnHover={(e) =>
          displayContext(e, "contextMenuId4", "horizontal", "right", "Context 4", true)
        }
        handleMouseLeave={() => closeContext("contextMenuId4")}
      >
        Context3
      </DSButton>
      <ContextMenu
        id="contextMenuId4"
        content="Context Holder"
        showArrow={true}
      />
        <DSButton
        handleOnHover={(e) =>
          displayContext(e, "contextMenuId4", "vertical", "center", "Context 4", true)
        }
        handleMouseLeave={() => closeContext("contextMenuId4")}
      >
        Context4
      </DSButton>
      <ContextMenu
        id="contextMenuId4"
        content="Context Holder"
        showArrow={true}
      />

    </DemoLayout>
  );
}
