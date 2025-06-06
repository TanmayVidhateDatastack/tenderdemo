// "use client";
// // csvContext.tsx
// import React, { createContext, useContext, useState } from "react";

// export type CsvContextType = {
//   csvData: string[][];
//   setCsvData: React.Dispatch<React.SetStateAction<string[][]>>;
// };

// const CsvContext = createContext<CsvContextType | null>(null);

// export const CsvProvider = ({ children }: { children: React.ReactNode }) => {
//   const [csvData, setCsvData] = useState<string[][]>([]);

//   return (
//     <CsvContext.Provider value={{ csvData, setCsvData }}>
//       {children}
//     </CsvContext.Provider>
//   );
// };

// export const useCsvContext = () => {
//   const context = useContext(CsvContext);
//   if (!context) {
//     throw new Error("useCsvContext must be used within a CsvProvider");
//   }
//   return context;
// };
// CsvDataContext.tsx
// "use client";
// import React, { createContext, useContext, useState } from 'react';

//  export type ParsedProduct = {
//   genericName: string;
//   quantity: number;
//   packingSize: string;
// };

// export type CsvDataContextType = {
//   csvData: string;
//   setCsvData: (data: string) => void;
//   parsedProducts: ParsedProduct[];
// };

// const CsvDataContext = createContext<CsvDataContextType | undefined>(undefined);

// export const CsvDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [csvData, setCsvData] = useState('');

//   const parsedProducts: ParsedProduct[] = csvData
//     .split('\n')
//     .filter(Boolean)
//     .map((line) => {
//       const [genericName, quantity, packingSize] = line.split(',').map((x) => x.trim());
//       return {
//         genericName,
//         quantity: Number(quantity),
//         packingSize,
//       };
//     });

//   return (
//     <CsvDataContext.Provider value={{ csvData, setCsvData, parsedProducts }}>
//       {children}
//     </CsvDataContext.Provider>
//   );
// };

// export const useCsvData = () => {
//   const context = useContext(CsvDataContext);
//   if (!context) throw new Error('useCsvData must be used within CsvDataProvider');
//   return context;
// };
