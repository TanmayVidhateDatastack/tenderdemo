import DSButton from "../DsButton/DsButton";
import ContextMenu, { displayContext, closeContext } from "./dsContextHolder";
import styles from "./dsContextHolder.module.css";
import DemoLayout from "@/app/ElProComponents/Demo/demoLayout";
export default function DemoContext() {
  return (
    <DemoLayout title="Context holder (DsContext)">
      <ContextMenu
        id={"contextMenuId2"}
        alignment="right"
        position="vertical"
        content=" vertical Right"
        showArrow={true}
      />
      <ContextMenu
        id={"contextMenuId3"}
        alignment="left"
        position="vertical"
        content="vertical left"
        showArrow={true}
      />
      <ContextMenu
        id={"contextMenuId4"}
        alignment="center"
        position="horizontal"
        content="horizontal center"
        showArrow={true}
      />
      <div className={styles.horizontalDiv}>
        <DSButton
          handleOnHover={(e) =>
            displayContext(e, "contextMenuId4", "horizontal")
          }
          handleMouseLeave={() => closeContext("contextMenuId4")}
        >
          Context4{" "}
          <ContextMenu
            id={"contextMenuId1"}
            alignment="center"
            position="vertical"
            content="Vertical Center"
            showArrow={true}
          />
        </DSButton>
        <DSButton
          handleOnHover={(e) =>
            displayContext(e, "contextMenuId4", "horizontal")
          }
          handleMouseLeave={() => closeContext("contextMenuId4")}
        >
          Context4
        </DSButton>
        <DSButton
          handleOnHover={(e) =>
            displayContext(e, "contextMenuId4", "horizontal")
          }
          handleMouseLeave={() => closeContext("contextMenuId4")}
        >
          Context4
        </DSButton>
        <DSButton
          handleOnHover={(e) =>
            displayContext(e, "contextMenuId4", "horizontal")
          }
          handleMouseLeave={() => closeContext("contextMenuId4")}
        >
          Context4
        </DSButton>
        <DSButton
          handleOnHover={(e) =>
            displayContext(e, "contextMenuId4", "horizontal")
          }
          handleMouseLeave={() => closeContext("contextMenuId4")}
        >
          Context4
        </DSButton>
        <DSButton
          handleOnHover={(e) =>
            displayContext(e, "contextMenuId4", "horizontal")
          }
          handleMouseLeave={() => closeContext("contextMenuId4")}
        >
          Context4
        </DSButton>
        <DSButton
          handleOnHover={(e) =>
            displayContext(e, "contextMenuId4", "horizontal")
          }
          handleMouseLeave={() => closeContext("contextMenuId4")}
        >
          Context4
        </DSButton>
        <DSButton
          handleOnHover={(e) =>
            displayContext(e, "contextMenuId4", "horizontal")
          }
          handleMouseLeave={() => closeContext("contextMenuId4")}
        >
          Context4
        </DSButton>
        <DSButton
          handleOnHover={(e) =>
            displayContext(e, "contextMenuId4", "horizontal")
          }
          handleMouseLeave={() => closeContext("contextMenuId4")}
        >
          Context4
        </DSButton>
        <DSButton
          handleOnHover={(e) =>
            displayContext(e, "contextMenuId4", "horizontal")
          }
          handleMouseLeave={() => closeContext("contextMenuId4")}
        >
          Context4
        </DSButton>
        <DSButton
          handleOnHover={(e) =>
            displayContext(e, "contextMenuId4", "horizontal")
          }
          handleMouseLeave={() => closeContext("contextMenuId4")}
        >
          Context4
        </DSButton>
        <DSButton
          handleOnHover={(e) =>
            displayContext(e, "contextMenuId4", "horizontal")
          }
          handleMouseLeave={() => closeContext("contextMenuId4")}
        >
          Context4
        </DSButton>
        <DSButton
          handleOnHover={(e) =>
            displayContext(e, "contextMenuId4", "horizontal")
          }
          handleMouseLeave={() => closeContext("contextMenuId4")}
        >
          Context4
        </DSButton>
        <DSButton
          handleOnHover={(e) =>
            displayContext(e, "contextMenuId4", "horizontal")
          }
          handleMouseLeave={() => closeContext("contextMenuId4")}
        >
          Context4
        </DSButton>
        <DSButton
          handleOnHover={(e) =>
            displayContext(e, "contextMenuId4", "horizontal")
          }
          handleMouseLeave={() => closeContext("contextMenuId4")}
        >
          Context4
        </DSButton>
        <DSButton
          handleOnHover={(e) =>
            displayContext(e, "contextMenuId4", "horizontal")
          }
          handleMouseLeave={() => closeContext("contextMenuId4")}
        >
          Context4
        </DSButton>
        <DSButton
          handleOnHover={(e) =>
            displayContext(e, "contextMenuId4", "horizontal")
          }
          handleMouseLeave={() => closeContext("contextMenuId4")}
        >
          Context4
        </DSButton>
        <DSButton
          handleOnHover={(e) =>
            displayContext(e, "contextMenuId4", "horizontal")
          }
          handleMouseLeave={() => closeContext("contextMenuId4")}
        >
          Context4
        </DSButton>
        <DSButton
          handleOnHover={(e) =>
            displayContext(e, "contextMenuId4", "horizontal")
          }
          handleMouseLeave={() => closeContext("contextMenuId4")}
        >
          Context4
        </DSButton>
        <DSButton
          handleOnHover={(e) =>
            displayContext(e, "contextMenuId4", "horizontal")
          }
          handleMouseLeave={() => closeContext("contextMenuId4")}
        >
          Context4
        </DSButton>
      </div>
      <div>
        <DSButton
          handleOnHover={(e) => displayContext(e, "contextMenuId1")}
          handleMouseLeave={() => closeContext("contextMenuId1")}
        >
          Context1
        </DSButton>
        <DSButton
          handleOnHover={(e) =>
            displayContext(e, "contextMenuId2", "vertical", "right")
          }
          handleMouseLeave={() => closeContext("contextMenuId2")}
        >
          Context2
        </DSButton>
        <DSButton
          handleOnHover={(e) =>
            displayContext(e, "contextMenuId3", "vertical", "left")
          }
          handleMouseLeave={() => closeContext("contextMenuId3")}
        >
          Context3
        </DSButton>
        <DSButton
          handleOnHover={(e) =>
            displayContext(e, "contextMenuId4", "horizontal")
          }
          handleMouseLeave={() => closeContext("contextMenuId4")}
        >
          Context4
        </DSButton>
        <DSButton
          handleOnHover={(e) =>
            displayContext(e, "contextMenuId4", "horizontal")
          }
          handleMouseLeave={() => closeContext("contextMenuId4")}
        >
          Context4
        </DSButton>
      </div>
    </DemoLayout>
  );
}
