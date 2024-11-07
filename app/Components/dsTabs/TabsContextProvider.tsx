// /src/contexts/AppContext.tsx
import React, {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

// 1. Define the context types
interface TabContextType {
  selectedTabId: string;
  setSelectedTabId: Dispatch<SetStateAction<string>>;
  //   tabs: string;
  //   setTabs: Dispatch<SetStateAction<string>>;
}

// 2. Create the context with a default value of `undefined` for initial typing
export const TabContext = createContext<TabContextType | undefined>(undefined);

// 3. Define the provider's props
interface TabsProviderProps {
  children: ReactNode;
}

// 4. Define the provider component
export const TabProvider: React.FC<TabsProviderProps> = ({ children }) => {
  const [selectedTabId, setSelectedTabId] = useState<string>("");

  const contextValue: TabContextType = {
    selectedTabId,
    setSelectedTabId,
  };

  return (
    <TabContext.Provider value={contextValue}>{children}</TabContext.Provider>
  );
};
export default TabProvider;
