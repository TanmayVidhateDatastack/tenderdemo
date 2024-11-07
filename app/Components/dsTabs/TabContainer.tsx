// /src/components/ComponentA.tsx
import React from "react";
import TabProvider from "./TabsContextProvider";
import TabNav from "./TabNav";
import styles from "./TabView.module.css";

interface tab {
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
        <div className={styles.TabView}>{children}</div>
      </div>
    </TabProvider>
  );
};

export default TabContainer;
