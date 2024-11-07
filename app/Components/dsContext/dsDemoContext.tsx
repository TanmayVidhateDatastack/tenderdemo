import DSButton from "../dsButton/dsButton";
import ContextMenu, { displaycontext, closecontext } from "./dsContext";
import styles from "./dscontext.module.css"
import DemoLayout from "@/app/ElProComponents/Demo/demoLayout";
export default function DemoContext() {
  return (
    <DemoLayout title="Context holder (DsContext)">
      <ContextMenu
        id={"contextMenuId1"}
        alignment="center"
        position="vertical"
        content="Vertical Center"
      />
      <ContextMenu
        id={"contextMenuId2"}
        alignment="right"
        position="vertical"
        content=" vertical Right"
      />
      <ContextMenu
        id={"contextMenuId3"}
        alignment="left"
        position="vertical"
        content="vertical left"
      />
      <ContextMenu
        id={"contextMenuId4"}
        alignment="center"
        position="horizontal"
        content="horizontal center"
      />
        <div className={styles.horizontalDiv}>
            <DSButton handleOnHover={(e)=>displaycontext(e,"contextMenuId4","horizontal")} handleMouseLeave={()=>closecontext("contextMenuId4")}>Context4</DSButton>
            <DSButton handleOnHover={(e)=>displaycontext(e,"contextMenuId4","horizontal")} handleMouseLeave={()=>closecontext("contextMenuId4")}>Context4</DSButton>
            <DSButton handleOnHover={(e)=>displaycontext(e,"contextMenuId4","horizontal")} handleMouseLeave={()=>closecontext("contextMenuId4")}>Context4</DSButton>
            <DSButton handleOnHover={(e)=>displaycontext(e,"contextMenuId4","horizontal")} handleMouseLeave={()=>closecontext("contextMenuId4")}>Context4</DSButton>
            <DSButton handleOnHover={(e)=>displaycontext(e,"contextMenuId4","horizontal")} handleMouseLeave={()=>closecontext("contextMenuId4")}>Context4</DSButton>
            <DSButton handleOnHover={(e)=>displaycontext(e,"contextMenuId4","horizontal")} handleMouseLeave={()=>closecontext("contextMenuId4")}>Context4</DSButton>
            <DSButton handleOnHover={(e)=>displaycontext(e,"contextMenuId4","horizontal")} handleMouseLeave={()=>closecontext("contextMenuId4")}>Context4</DSButton>
            <DSButton handleOnHover={(e)=>displaycontext(e,"contextMenuId4","horizontal")} handleMouseLeave={()=>closecontext("contextMenuId4")}>Context4</DSButton>
            <DSButton handleOnHover={(e)=>displaycontext(e,"contextMenuId4","horizontal")} handleMouseLeave={()=>closecontext("contextMenuId4")}>Context4</DSButton>
            <DSButton handleOnHover={(e)=>displaycontext(e,"contextMenuId4","horizontal")} handleMouseLeave={()=>closecontext("contextMenuId4")}>Context4</DSButton>
            <DSButton handleOnHover={(e)=>displaycontext(e,"contextMenuId4","horizontal")} handleMouseLeave={()=>closecontext("contextMenuId4")}>Context4</DSButton>
            <DSButton handleOnHover={(e)=>displaycontext(e,"contextMenuId4","horizontal")} handleMouseLeave={()=>closecontext("contextMenuId4")}>Context4</DSButton>
            <DSButton handleOnHover={(e)=>displaycontext(e,"contextMenuId4","horizontal")} handleMouseLeave={()=>closecontext("contextMenuId4")}>Context4</DSButton>
            <DSButton handleOnHover={(e)=>displaycontext(e,"contextMenuId4","horizontal")} handleMouseLeave={()=>closecontext("contextMenuId4")}>Context4</DSButton>
            <DSButton handleOnHover={(e)=>displaycontext(e,"contextMenuId4","horizontal")} handleMouseLeave={()=>closecontext("contextMenuId4")}>Context4</DSButton>
            <DSButton handleOnHover={(e)=>displaycontext(e,"contextMenuId4","horizontal")} handleMouseLeave={()=>closecontext("contextMenuId4")}>Context4</DSButton>
            <DSButton handleOnHover={(e)=>displaycontext(e,"contextMenuId4","horizontal")} handleMouseLeave={()=>closecontext("contextMenuId4")}>Context4</DSButton>
            <DSButton handleOnHover={(e)=>displaycontext(e,"contextMenuId4","horizontal")} handleMouseLeave={()=>closecontext("contextMenuId4")}>Context4</DSButton>
            <DSButton handleOnHover={(e)=>displaycontext(e,"contextMenuId4","horizontal")} handleMouseLeave={()=>closecontext("contextMenuId4")}>Context4</DSButton>
            <DSButton handleOnHover={(e)=>displaycontext(e,"contextMenuId4","horizontal")} handleMouseLeave={()=>closecontext("contextMenuId4")}>Context4</DSButton>
        </div>  
      <div>

      <DSButton handleOnHover={(e)=>displaycontext(e,"contextMenuId1")} handleMouseLeave={()=>closecontext("contextMenuId1")}>Context1</DSButton>
      <DSButton handleOnHover={(e)=>displaycontext(e,"contextMenuId2","vertical","right")} handleMouseLeave={()=>closecontext("contextMenuId2")}>Context2</DSButton>
      <DSButton handleOnHover={(e)=>displaycontext(e,"contextMenuId3","vertical","left")} handleMouseLeave={()=>closecontext("contextMenuId3")}>Context3</DSButton>
      <DSButton handleOnHover={(e)=>displaycontext(e,"contextMenuId4","horizontal")} handleMouseLeave={()=>closecontext("contextMenuId4")}>Context4</DSButton>
      <DSButton handleOnHover={(e)=>displaycontext(e,"contextMenuId4","horizontal")} handleMouseLeave={()=>closecontext("contextMenuId4")}>Context4</DSButton>
      </div>
    
    
    </DemoLayout>
  );
}
