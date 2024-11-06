// /src/components/ComponentA.tsx
import React, { useContext, useEffect } from "react";
import { TabContext } from "./TabsContextProvider";
import DSButtonGroup from "../dsButton/dsButtonGroup";
import styles from "./TabView.module.css";
import btnStyles from "../dsButton/dsButton.module.css";
import DSButton from "../dsButton/dsButton";

interface tab {
  tabId: string;
  tabName: string;
}
export interface TabNavProps {
  selectedTabId: string;
  tabs: tab[];
}
const TabNav: React.FC<TabNavProps> = ({
  selectedTabId,
  tabs,
}) => {
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
              className={
                btnStyles.btngroupcontained + " " + btnStyles.group_btn
              }
              label={x.tabName}
              //   count="00"
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
