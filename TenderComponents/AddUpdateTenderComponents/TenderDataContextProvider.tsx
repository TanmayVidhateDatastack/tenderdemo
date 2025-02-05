import {
  applicableSupplyConditions,
  TenderData,
  tenderDocument,
  tenderFee,
  tenderSupplyCondition,
} from "@/helpers/types";
import React, { createContext, useContext, useState } from "react";

interface TenderDataContextType {
  tenderData: TenderData;
  updateTenderData: (
    key: keyof TenderData,
    value: string | number | tenderFee[] | tenderSupplyCondition
  ) => void;
  updateTenderFee: (
    feeType: string,
    key: keyof tenderFee,
    value: tenderDocument[] | string | number
  ) => void;
  addTenderFee: (type: string) => void;
  removeTenderFeeByType: (feeType: string) => void;
  updateApplicableCondition: (
    conditionType: string,
    key: keyof applicableSupplyConditions,
    value: string | number | tenderDocument[]
  ) => void;
  updateSupplyCondition: (
    key: keyof tenderSupplyCondition,
    value: string | number | tenderDocument[]
  ) => void;
}

const TenderDataContext = createContext<TenderDataContextType | undefined>(
  undefined
);

export const TenderDataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tenderData, setTenderData] = useState<TenderData>({
    customerId: 0,
    customerLocationId: 0,
    tenderNumber: "",
    tenderType: "",
    issueDate: "",
    lastPurchaseDate: "",
    submissionDate: "",
    rateContractValidity: "",
    submissionMode: "",
    deliveryPeriod: 0,
    extendedDeliveryPeriod: 0,
    lateDeliveryPenalty: 0,
    tenderURL: "",
    shippingLocations: [],
    appliedBy: "",
    applierBy: null,
    suppliedBy: "",
    suppliedId: null,
    supplierDiscount: 0,
    preparedBy: 0,
    lastUpdatedBy: 0,
    comments: "",
    fees: [],
    supplyConditions: {
      supplyPoint: "",
      consigneesCount: 0,
      testReportRequirement: "",
      eligibility: [],
      applicableConditions: [],
    },
  });

  // ✅ Update top-level fields
  const updateTenderData = (
    key: keyof TenderData,
    value: string | number | tenderFee[] | tenderSupplyCondition
  ) => {
    setTenderData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // ✅ Update a specific tender fee field
  const updateTenderFee = (
    feeType: string,
    key: keyof tenderFee,
    value: tenderDocument[] | string | number
  ) => {
    setTenderData((prev) => {
      const feeExists = prev.fees.some((fee) => fee.type === feeType);

      if (!feeExists) {
        console.warn(`Fee type "${feeType}" not found!`);
        return prev; // No changes if feeType is not found
      }

      return {
        ...prev,
        fees: prev.fees.map((fee) =>
          fee.type === feeType ? { ...fee, [key]: value } : fee
        ),
      };
    });
  };

  // ✅ Add a new empty fee
  const addTenderFee = (type: string) => {
    setTenderData((prev) => ({
      ...prev,
      fees: [
        ...prev.fees,
        {
          type: type,
          amount: 0,
          currency: "",
          paidBy: "",
          paymentMode: "",
          paymentDueDate: "",
          notes: "",
          documents: [],
        },
      ],
    }));
  };

  // ✅ Remove a fee by index
  const removeTenderFeeByType = (feeType: string) => {
    setTenderData((prev) => ({
      ...prev,
      fees: prev.fees.filter((fee) => fee.type !== feeType),
    }));
  };

  const updateSupplyCondition = (
    key: keyof tenderSupplyCondition,
    value: string | number | tenderDocument[]
  ) => {
    setTenderData((prev) => ({
      ...prev,
      supplyConditions: {
        ...prev.supplyConditions,
        [key]: value,
      },
    }));
  };

  const updateApplicableCondition = (
    conditionType: string,
    key: keyof applicableSupplyConditions,
    value: string | number | tenderDocument[]
  ) => {
    setTenderData((prev) => ({
      ...prev,
      supplyConditions: {
        ...prev.supplyConditions,
        applicableConditions: prev.supplyConditions.applicableConditions.map(
          (condition) =>
            condition.type === conditionType
              ? { ...condition, [key]: value }
              : condition
        ),
      },
    }));
  };

  return (
    <TenderDataContext.Provider
      value={{
        tenderData,
        updateTenderData,
        updateTenderFee,
        addTenderFee,
        removeTenderFeeByType,
        updateSupplyCondition,
        updateApplicableCondition,
      }}
    >
      {children}
    </TenderDataContext.Provider>
  );
};

// Custom hook to use context
export const useTenderData = () => {
  const context = useContext(TenderDataContext);
  if (!context) {
    throw new Error("useTenderData must be used within a TenderDataProvider");
  }
  return context;
};
