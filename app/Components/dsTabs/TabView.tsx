// /src/components/ComponentA.tsx
import React, { useContext } from "react";
import { TabContext } from "./TabsContextProvider";

export interface TabProps {
 tabId:string;
  children: React.ReactNode;
}
const TabView: React.FC<TabProps> = ({
  tabId,
  children,
}) => {
  const tabContext = useContext(TabContext);

  if (!tabContext) {
    throw new Error("TabView must be used within an AppProvider");
  }

  const { selectedTabId } = tabContext;
  
  return (
    <>
     {selectedTabId==tabId && children}
    </>
  );
};

export default TabView;
