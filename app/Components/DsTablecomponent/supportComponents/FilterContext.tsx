import React, { createContext, useState, useContext } from "react";

// Define the shape of the filter state
interface FilterState {
  rangeFrom?: string;
  rangeTo?: string;
  dateFrom?: string;
  dateTo?: string;
  grossRange?: number;
  commaValue?: string;
}

// Define the shape of the FilterContext value
interface FilterContextType {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

// Define the props for FilterProvider
interface FilterProviderProps {
  children: React.ReactNode;
}

// Create the FilterContext with an initial undefined value
const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider: React.FC<FilterProviderProps> = ({ children }) => {
  const [filters, setFilters] = useState<FilterState>({});

  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  );
};

// Custom hook to use the FilterContext
export const useFilter = (): FilterContextType => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
};
