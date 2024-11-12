// "use client";
// import React, { useState } from "react";
// import DataList from "./Components/dsDatalist/dsDatalist";
// import btnStyles from "./Components/DsButton/dsButton.module.css";
// import addIcon from "./Icons/smallIcons/add.svg";
// import filter from "./Icons/smallIcons/filtericon.svg";
// import whiteadd from "./Icons/smallIcons/whiteadd.svg";
// import Image from "next/image";
// import DSButton from "./Components/DsButton/DsButton";
// import Application from "./ElProComponents/ApplicationComponents/Application";
// import styles from "./page.module.css";
// import DSButtonGroup from "./Components/DsButton/dsButtonGroup";
// // import addIcon from "./Icons/mediumIcons/addIcon.svg";

// export default function Home() {
//   const [iconSrc, setIconSrc] = useState(addIcon);

//   const clickHandler = (e: React.MouseEvent<HTMLElement>) => {
//     console.log((e.target as HTMLElement).tagName);
//   };

//   const changeImage = (e: React.MouseEvent<HTMLElement, MouseEvent>, imgSrc: string) => {
//     setIconSrc(imgSrc);
//   };

//   return (
//     <Application
//       appTitle="Sales Order"
//       appMenu={
//           <div className={styles.btnrow}>
//             <DataList
//               placeholder="Search"
//               label="label"
//               inputId="userSelect"
//               dataListId="user-list"
//               disable={false}
//               options={[
//                 { attributes: { key: 'key1' }, id: 'emp1', value: 'emp1' },
//                 { attributes: { key: 'key2' }, id: 'emp2', value: 'emp2' },
//                 { attributes: { key: 'key3' }, id: 'emp3', value: 'emp3' },
//                 { attributes: { key: 'key4' }, id: 'emp4', value: 'emp4' },
//                 { attributes: { key: 'key5' }, id: 'emp5', value: 'emp5' },
//               ]}
//               className={""}
//             ></DataList>
//             <DSButton
//               id="filterBtn1"
//               type="tab"
//               buttonColor="btnPrimary"
//               className={btnStyles.btnOutlined}
//               tooltip="variants : btnPrimary, btnOutlined, btnMedium"
//               label="Approved"
//             />
//             <DSButton
//               id="filterBtn2"
//               type="tab"
//               buttonColor="btnPrimary"
//               className={btnStyles.btnOutlined}
//               tooltip="variants : btnPrimary, btnOutlined, btnMedium"
//               label="Dispatch"
//             />
//             <DSButton
//               id="iconfilterBtn"
//               buttonColor="btnPrimary"
//               buttonViewStyle="btnText"
//               className={`${btnStyles.btnTextPrimary}`}
//               handleOnClick={clickHandler}
//               startIcon={<Image src={filter} alt="Filter icon" />}
//               tooltip="variants : btnPrimary, btnText, btnMedium,"
//               label="Filter"
//             />
//             <DSButton
//               id="actionBtn"
//               buttonColor="btnPrimary"
//               className={btnStyles.btnOutlined}
//               handleOnHover={(e) => changeImage(e, whiteadd)}
//               handleMouseLeave={(e) => changeImage(e, addIcon)}
//               startIcon={<Image src={iconSrc} alt="Add icon" />}
//               tooltip="variants : btnPrimary, btnOutlined, btnMedium"
//               label="New"
//               handleOnClick={(e) => clickHandler(e)}
//             />
//           </div>
//       }
//     ><>
//             <div className={styles.btnrow}>
//             <DSButtonGroup id="btngroup1" className={btnStyles.btngroup}>
//             <DSButton
//               id="button1"
//               type="count"
//               buttonViewStyle="btnText"
//               className={btnStyles.btngroupcontained + " " + btnStyles.group_btn}
//               label="Trade "
//               count="25"
//               // handleOnClick={(e) => handleButtonClick(e, "button1")}
//               tooltip="variants: btngroupcontained"
//             />
//             <DSButton
//               id="button2"
//               type="count"
//               buttonViewStyle="btnText"
//               className={btnStyles.btngroupcontained + " " + btnStyles.group_btn}
//               label="Institutitional "
//               count="12"
//               // handleOnClick={(e) => handleButtonClick(e, "button2")}
//               tooltip="variants: btngroupcontained"
//             />
//             <DSButton
//               id="button3"
//               type="count"
//               buttonViewStyle="btnText"
//               className={btnStyles.btngroupcontained + " " + btnStyles.group_btn}
//               label="Corporate "
//               count="08"
//               // handleOnClick={(e) => handleButtonClick(e, "button3")}
//               tooltip="variants: btngroupcontained"
//             />
//             <DSButton
//               id="button4"
//               type="count"
//               buttonViewStyle="btnText"
//               className={btnStyles.btngroupcontained + " " + btnStyles.group_btn}
//               label="New "
//               count="00"
//               // handleOnClick={(e) => handleButtonClick(e, "button4")}
//               tooltip="variants: btngroupcontained"
//             /> 
//           </DSButtonGroup>
//            </div>
//         </>
//           </Application>
//           );
//         }
//import DSButton from "../dsButton/dsButton";
//import ContextMenu, { displayContext, closeContext } from "./dsContextHolder";
"use client";
// import DSButton from "./Components/DsButton/DsButton";
// import ContextMenu, { displayContext, closeContext } from "./Components/dsContextHolder/dsContextHolder";
// //import styles from "./dsContextHolder.module.css";
// import styles from "./Components/DsButton/dsButton.module.css";
// import DemoLayout from "@/app/ElProComponents/Demo/demoLayout";
// export default function DemoContext() {
//   return (
//     <DemoLayout title="Context holder (DsContext)">
//       <ContextMenu
//         id={"contextMenuId2"}
//         alignment="right"
//         position="vertical"
//         content=" vertical Right"
//         showArrow={true}
//       />
//       <ContextMenu
//         id={"contextMenuId3"}
//         alignment="left"
//         position="vertical"
//         content="vertical left"
//         showArrow={true}
//       />
//       <ContextMenu
//         id={"contextMenuId4"}
//         alignment="center"
//         position="horizontal"
//         content="horizontal center"
//         showArrow={true}
//       />
//       <div className={styles.horizontalDiv}>
//         <DSButton
//           handleOnHover={(e) =>
//             displayContext(e, "contextMenuId4", "horizontal")
//           }
//           handleMouseLeave={() => closeContext("contextMenuId4")}
//         >
//           Context4{" "}
//           <ContextMenu
//             id={"contextMenuId1"}
//             alignment="center"
//             position="vertical"
//             content="Vertical Center"
//             showArrow={true}
//           />
//         </DSButton>
//         <DSButton
//           handleOnHover={(e) =>
//             displayContext(e, "contextMenuId4", "horizontal")
//           }
//           handleMouseLeave={() => closeContext("contextMenuId4")}
//         >
//           Context4
//         </DSButton>
//         <DSButton
//           handleOnHover={(e) =>
//             displayContext(e, "contextMenuId4", "horizontal")
//           }
//           handleMouseLeave={() => closeContext("contextMenuId4")}
//         >
//           Context4
//         </DSButton>
//         <DSButton
//           handleOnHover={(e) =>
//             displayContext(e, "contextMenuId4", "horizontal")
//           }
//           handleMouseLeave={() => closeContext("contextMenuId4")}
//         >
//           Context4
//         </DSButton>
//         <DSButton
//           handleOnHover={(e) =>
//             displayContext(e, "contextMenuId4", "horizontal")
//           }
//           handleMouseLeave={() => closeContext("contextMenuId4")}
//         >
//           Context4
//         </DSButton>
//         <DSButton
//           handleOnHover={(e) =>
//             displayContext(e, "contextMenuId4", "horizontal")
//           }
//           handleMouseLeave={() => closeContext("contextMenuId4")}
//         >
//           Context4
//         </DSButton>
//         <DSButton
//           handleOnHover={(e) =>
//             displayContext(e, "contextMenuId4", "horizontal")
//           }
//           handleMouseLeave={() => closeContext("contextMenuId4")}
//         >
//           Context4
//         </DSButton>
//         <DSButton
//           handleOnHover={(e) =>
//             displayContext(e, "contextMenuId4", "horizontal")
//           }
//           handleMouseLeave={() => closeContext("contextMenuId4")}
//         >
//           Context4
//         </DSButton>
//         <DSButton
//           handleOnHover={(e) =>
//             displayContext(e, "contextMenuId4", "horizontal")
//           }
//           handleMouseLeave={() => closeContext("contextMenuId4")}
//         >
//           Context4
//         </DSButton>
//         <DSButton
//           handleOnHover={(e) =>
//             displayContext(e, "contextMenuId4", "horizontal")
//           }
//           handleMouseLeave={() => closeContext("contextMenuId4")}
//         >
//           Context4
//         </DSButton>
//         <DSButton
//           handleOnHover={(e) =>
//             displayContext(e, "contextMenuId4", "horizontal")
//           }
//           handleMouseLeave={() => closeContext("contextMenuId4")}
//         >
//           Context4
//         </DSButton>
//         <DSButton
//           handleOnHover={(e) =>
//             displayContext(e, "contextMenuId4", "horizontal")
//           }
//           handleMouseLeave={() => closeContext("contextMenuId4")}
//         >
//           Context4
//         </DSButton>
//         <DSButton
//           handleOnHover={(e) =>
//             displayContext(e, "contextMenuId4", "horizontal")
//           }
//           handleMouseLeave={() => closeContext("contextMenuId4")}
//         >
//           Context4
//         </DSButton>
//         <DSButton
//           handleOnHover={(e) =>
//             displayContext(e, "contextMenuId4", "horizontal")
//           }
//           handleMouseLeave={() => closeContext("contextMenuId4")}
//         >
//           Context4
//         </DSButton>
//         <DSButton
//           handleOnHover={(e) =>
//             displayContext(e, "contextMenuId4", "horizontal")
//           }
//           handleMouseLeave={() => closeContext("contextMenuId4")}
//         >
//           Context4
//         </DSButton>
//         <DSButton
//           handleOnHover={(e) =>
//             displayContext(e, "contextMenuId4", "horizontal")
//           }
//           handleMouseLeave={() => closeContext("contextMenuId4")}
//         >
//           Context4
//         </DSButton>
//         <DSButton
//           handleOnHover={(e) =>
//             displayContext(e, "contextMenuId4", "horizontal")
//           }
//           handleMouseLeave={() => closeContext("contextMenuId4")}
//         >
//           Context4
//         </DSButton>
//         <DSButton
//           handleOnHover={(e) =>
//             displayContext(e, "contextMenuId4", "horizontal")
//           }
//           handleMouseLeave={() => closeContext("contextMenuId4")}
//         >
//           Context4
//         </DSButton>
//         <DSButton
//           handleOnHover={(e) =>
//             displayContext(e, "contextMenuId4", "horizontal")
//           }
//           handleMouseLeave={() => closeContext("contextMenuId4")}
//         >
//           Context4
//         </DSButton>
//         <DSButton
//           handleOnHover={(e) =>
//             displayContext(e, "contextMenuId4", "horizontal")
//           }
//           handleMouseLeave={() => closeContext("contextMenuId4")}
//         >
//           Context4
//         </DSButton>
//       </div>
//       <div>
//         <DSButton
//           handleOnHover={(e) => displayContext(e, "contextMenuId1")}
//           handleMouseLeave={() => closeContext("contextMenuId1")}
//         >
//           Context1
//         </DSButton>
//         <DSButton
//           handleOnHover={(e) =>
//             displayContext(e, "contextMenuId2", "vertical", "right")
//           }
//           handleMouseLeave={() => closeContext("contextMenuId2")}
//         >
//           Context2
//         </DSButton>
//         <DSButton
//           handleOnHover={(e) =>
//             displayContext(e, "contextMenuId3", "vertical", "left")
//           }
//           handleMouseLeave={() => closeContext("contextMenuId3")}
//         >
//           Context3
//         </DSButton>
//         <DSButton
//           handleOnHover={(e) =>
//             displayContext(e, "contextMenuId4", "horizontal")
//           }
//           handleMouseLeave={() => closeContext("contextMenuId4")}
//         >
//           Context4
//         </DSButton>
//         <DSButton
//           handleOnHover={(e) =>
//             displayContext(e, "contextMenuId4", "horizontal")
//           }
//           handleMouseLeave={() => closeContext("contextMenuId4")}
//         >
//           Context4
//         </DSButton>
//       </div>
//     </DemoLayout>
//   );
// }
import React from "react";
import DemoLayout from "@/app/ElProComponents/Demo/demoLayout";
import DSButton from "./Components/DsButton/DsButton";
import ContextMenu, { displayContext, closeContext } from "./Components/dsContextHolder/dsContextHolder";

export default function DemoContext() {
  return (
    <DemoLayout title="Context holder (DsContext)">
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

