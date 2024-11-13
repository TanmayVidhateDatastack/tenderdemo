// /src/components/ComponentA.tsx
import React from "react";
import TabProvider from "./TabsContextProvider";
import TabNav from "./TabNav";
import styles from "./TabView.module.css";

export interface tab {
  tabId: string;
  tabName: string;
}
export interface TabsProps {
  selectedTabId: string;
  tabs: tab[];
  children: React.ReactNode;
}
const TabContainer: React.FC<TabsProps> = ({
  selectedTabId,
  tabs,
  children,
}) => {
  return (
    <TabProvider>
      <div className={styles.TabContainer}>
        <TabNav selectedTabId={selectedTabId} tabs={tabs}></TabNav>
        {children}
      </div>
    </TabProvider>
  );
};

export default TabContainer;
