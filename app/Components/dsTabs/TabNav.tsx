// /src/components/ComponentA.tsx
import React, { useContext, useEffect } from "react";
import { TabContext } from "./TabsContextProvider";
import DSButtonGroup from "../dsButton/dsButtonGroup";
import styles from "./TabView.module.css";
import btnStyles from "../dsButton/dsButton.module.css";
import DSButton from "../dsButton/DsButton";

interface tab {
  tabId: string;
  tabName: string;
  count?:number;
}
export interface TabNavProps {
  selectedTabId: string;
  tabs: tab[];
}
const TabNav: React.FC<TabNavProps> = ({ selectedTabId, tabs }) => {
  const tabContext = useContext(TabContext);

  if (!tabContext) {
    throw new Error("TabNav must be used within an TabContext");
  }

  const { setSelectedTabId } = tabContext;
  useEffect(() => {
    setSelectedTabId(selectedTabId);
  }, [selectedTabId, setSelectedTabId]);
  return (
    <div className={styles.TabNav}>
      <DSButtonGroup id="TabBtns" className={btnStyles.btngroup}>
        {tabs?.map((x) => {
          return (
            <DSButton
              key={x.tabId}
              id={x.tabId}
              type="tab"
              buttonViewStyle="btnContained"
              label={x.tabName}
              count={x.count?x.count.toString():""}
              handleOnClick={() => setSelectedTabId(x.tabId)}
              tooltip={x.tabName}
            />
          );
        })}
      </DSButtonGroup>
    </div>
  );
};

export default TabNav;