// /src/components/ComponentA.tsx
import React, { useContext, useEffect } from "react";
import { TabContext } from "./TabsContextProvider";
import DSButtonGroup from "../dsButton/dsButtonGroup";
import DSFilterButton from "../dsButton/dsFilterButton";

import btnStyles from "../dsButton/dsButton.module.css";

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
  const tabContext = useContext(TabContext);

  if (!tabContext) {
    throw new Error("TabContainer must be used within an AppProvider");
  }

  const { setSelectedTabId } = tabContext;
  useEffect(() => {
    setSelectedTabId(selectedTabId);
  }, [selectedTabId, setSelectedTabId]);
  return (
    <div className="TabNav">
      <DSButtonGroup id="TabBtns" buttonClass={btnStyles.btngroup}>
        {tabs?.map((x) => {
          return (
            <DSFilterButton
              key={x.tabId}
              id={x.tabId}
              buttonClass={
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
      <div className="TabView">{children}</div>
    </div>
  );
};

export default TabContainer;
