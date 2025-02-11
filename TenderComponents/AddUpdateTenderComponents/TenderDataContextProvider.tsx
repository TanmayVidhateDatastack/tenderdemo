import {
  applicableSupplyConditions,
  TenderData,
  Document,
  tenderFee,
  tenderSupplyCondition,
  CreateUpdateTender,
  TenderProduct
} from "@/helpers/types";
import React, { createContext, useContext, useState } from "react";

interface TenderDataContextType {
  tenderData: CreateUpdateTender;
  updateTenderData: (
    key: keyof TenderData,
    value: string | number | tenderFee[] | tenderSupplyCondition
  ) => void;
  updateTenderFee: (
    feeType: string,
    key: keyof tenderFee,
    value: Document[] | string | number
  ) => void;
  addTenderFee: (type: string) => void;
  removeTenderFeeByType: (feeType: string) => void;
  updateApplicableCondition: (
    conditionType: string,
    key: keyof applicableSupplyConditions,
    value: string | number | Document[]
  ) => void;
  updateSupplyCondition: (
    key: keyof tenderSupplyCondition,
    value: string | number | Document[]
  ) => void;
  addNewTenderDocument: (docType: string, document: Document[]) => void;
  addDocumentToExistingType: (docType: string, document: Document) => void;
  addTenderProduct: (product: TenderProduct) => void;
  updateTenderProduct: (
    id: number,
    key: keyof TenderProduct,
    value: string | number
  ) => void;
  addApplicableCondition: (type: string) => void;
  removeApplicableCondition: (conditionType: string) => void;
}

const TenderDataContext = createContext<TenderDataContextType | undefined>(
  undefined
);

export const TenderDataProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [tenderData, setTenderData] = useState<CreateUpdateTender>({
    tender: {
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
        applicableConditions: []
      }
    },
    products: [],
    documentList: []
  });

  // ✅ Update top-level tender fields
  const updateTenderData = (
    key: keyof TenderData,
    value: string | number | tenderFee[] | tenderSupplyCondition
  ) => {
    setTenderData((prev) => ({
      ...prev,
      tender: {
        ...prev.tender,
        [key]: value
      }
    }));
  };

  // ✅ Update a specific tender fee field (Only if fee type exists)
  const updateTenderFee = (
    feeType: string,
    key: keyof tenderFee,
    value: Document[] | string | number
  ) => {
    setTenderData((prev) => ({
      ...prev,
      tender: {
        ...prev.tender,
        fees: prev.tender.fees.map((fee) =>
          fee.type === feeType ? { ...fee, [key]: value } : fee
        )
      }
    }));
  };

  // ✅ Add a new tender fee
  const addTenderFee = (type: string) => {
    setTenderData((prev) => ({
      ...prev,
      tender: {
        ...prev.tender,
        fees: [
          ...prev.tender.fees,
          {
            type,
            amount: 0,
            currency: "",
            paidBy: "",
            paymentMode: "",
            paymentDueDate: "",
            notes: "",
            documents: []
          }
        ]
      }
    }));
  };

  // ✅ Remove tender fee by type
  const removeTenderFeeByType = (feeType: string) => {
    setTenderData((prev) => ({
      ...prev,
      tender: {
        ...prev.tender,
        fees: prev.tender.fees.filter((fee) => fee.type !== feeType)
      }
    }));
  };

  // ✅ Update supply condition fields
  const updateSupplyCondition = (
    key: keyof tenderSupplyCondition,
    value: string | number | Document[]
  ) => {
    setTenderData((prev) => ({
      ...prev,
      tender: {
        ...prev.tender,
        supplyConditions: {
          ...prev.tender.supplyConditions,
          [key]: value
        }
      }
    }));
  };

  // ✅ Update applicable condition fields
  const updateApplicableCondition = (
    conditionType: string,
    key: keyof applicableSupplyConditions,
    value: string | number | Document[]
  ) => {
    setTenderData((prev) => ({
      ...prev,
      tender: {
        ...prev.tender,
        supplyConditions: {
          ...prev.tender.supplyConditions,
          applicableConditions:
            prev.tender.supplyConditions.applicableConditions.map((condition) =>
              condition.type === conditionType
                ? { ...condition, [key]: value }
                : condition
            )
        }
      }
    }));
  };

  // ✅ Add a document to the tender-level document list
  const addNewTenderDocument = (docType: string, documentList: Document[]) => {
    setTenderData((prev) => ({
      ...prev,
      documentList: [
        ...prev.documentList,
        {
          type: docType,
          documents: documentList
        }
      ]
    }));
  };
  const addDocumentToExistingType = (docType: string, document: Document) => {
    setTenderData((prev) => ({
      ...prev,
      documentList: prev.documentList.map((doc) =>
        doc.type === docType
          ? { ...doc, documents: [...doc.documents, document] }
          : doc
      )
    }));
  };

  // ✅ Add a new tender product
  const addTenderProduct = (product: TenderProduct) => {
    setTenderData((prev) => ({
      ...prev,
      products: [...prev.products, product]
    }));
  };

  // ✅ Update a tender product field
  const updateTenderProduct = (
    id: number,
    key: keyof TenderProduct,
    value: string | number
  ) => {
    setTenderData((prev) => ({
      ...prev,
      products: prev.products.map((product) =>
        product.id === id ? { ...product, [key]: value } : product
      )
    }));
  };
  // ✅ Add a new applicable condition
  const addApplicableCondition = (type: string) => {
    setTenderData((prev) => ({
      ...prev,
      tender: {
        ...prev.tender,
        supplyConditions: {
          ...prev.tender.supplyConditions,
          applicableConditions: [
            {
              type,
              notes: "",
              status: "",
              documents: []
            }
          ]
        }
      }
    }));
  };

  // ✅ Remove an applicable condition by type
  const removeApplicableCondition = (conditionType: string) => {
    setTenderData((prev) => ({
      ...prev,
      tender: {
        ...prev.tender,
        supplyConditions: {
          ...prev.tender.supplyConditions,
          applicableConditions:
            prev.tender.supplyConditions.applicableConditions.filter(
              (condition) => condition.type !== conditionType
            )
        }
      }
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
        addNewTenderDocument,
        addDocumentToExistingType,
        addTenderProduct,
        updateTenderProduct,
        addApplicableCondition,
        removeApplicableCondition
      }}
    >
      {children}
    </TenderDataContext.Provider>
  );
};

// ✅ Custom hook to access context
export const useTenderData = () => {
  const context = useContext(TenderDataContext);
  if (!context) {
    throw new Error("useTenderData must be used within a TenderDataProvider");
  }
  return context;
};
