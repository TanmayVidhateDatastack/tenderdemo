import { showToaster } from "@/Elements/DsComponents/DsToaster/DsToaster";
import { closeTimeForTender, dsStatus,saveTenderurl } from "@/helpers/constant";
import fetchData from "@/helpers/Method/fetchData";
import {
  applicableSupplyConditions,
  TenderData,
  Document,
  tenderFee,
  tenderSupplyCondition,
  TenderProduct,
  Company,
} from "@/helpers/types";
import { useRouter } from "next/navigation";
import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
class ActionStatus {
  notiType: "success" | "bonus" | "info" | "error" | "cross" = "success";
  notiMsg: string = "";
  showNotification: boolean = false;
}
 
interface TenderDataContextType {
  tenderData: TenderData;
  actionStatus: ActionStatus;
  setActionStatusValues: (actionStatus: ActionStatus) => void;
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
    value: string | number | Document[]|string[]
  ) => void;
  addNewTenderDocument: (docType: string, document: Document[]) => void;
  addDocumentToExistingType: (docType: string, document: Document) => void;
  addTenderProduct: (product: TenderProduct) => void;
  updateTenderProduct: (
    id: number,
    key: keyof TenderProduct,
    value: string | number|Company
  ) => void;
  addApplicableCondition: (type: string) => void;
  removeApplicableCondition: (conditionType: string) => void;
  saveTender: (status: dsStatus) => Promise<void>;
}
 
const TenderDataContext = createContext<TenderDataContextType | undefined>(
  undefined
);
 
export const TenderDataProvider: React.FC<{ children: React.ReactNode }> = ({
  children
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
    shippingLocations: [1,2],
    appliedBy: "IPCA",
    applierId: null,
    suppliedBy: "STOCKIST",
    suppliedId: null,
    supplierDiscount: 0,
    createdBy: 0,
    lastUpdatedBy: 0,
    comments: "",
    fees: [],
    supplyConditions: {
      supplyPoint: "",
      consigneesCount: 0,
      testReportRequirement: "",
      eligibility: [],
      applicableConditions: []
    },
    products: [],
    documentList: []
  });
 
 
 
 
  const [actionStatus, setActionStatus] = useState<ActionStatus>({
    notiMsg: "",
    notiType: "success",
    showNotification: false,
  });
 
  // ✅ Update top-level tender fields
  const updateTenderData = (
    key: keyof TenderData,
    value: string | number | tenderFee[] | tenderSupplyCondition
  ) => {
    setTenderData((prev) => ({
      ...prev,
      [key]: value
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
      fees: prev.fees.map((fee) =>
        fee.type === feeType ? { ...fee, [key]: value } : fee
      )
    }));
  };
  // ✅ Add a new tender fee
  const addTenderFee = (type: string) => {
    setTenderData((prev) => ({
      ...prev,
      fees: [
        ...prev.fees,
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
    }));
  };
  // ✅ Remove tender fee by type
  const removeTenderFeeByType = (feeType: string) => {
    setTenderData((prev) => ({
      ...prev,
      fees: prev.fees.filter((fee) => fee.type !== feeType)
    }));
  };
  // ✅ Update supply condition fields
  const updateSupplyCondition = (
    key: keyof tenderSupplyCondition,
    value: string | number | Document[]|string[]
  ) => {
    setTenderData((prev) => ({
      ...prev,
      supplyConditions: {
        ...prev.supplyConditions,
        [key]: value
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
      supplyConditions: {
        ...prev.supplyConditions,
        applicableConditions: prev.supplyConditions.applicableConditions.map(
          (condition) =>
            condition.type === conditionType
              ? { ...condition, [key]: value }
              : condition
        )
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
    value: string | number|Company
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
 
      supplyConditions: {
        ...prev.supplyConditions,
        applicableConditions: [
          {
            type,
            notes: "",
            documents: []
          }
        ]
      }
    }));
  };
 
  // ✅ Remove an applicable condition by type
  const removeApplicableCondition = (conditionType: string) => {
    setTenderData((prev) => ({
      ...prev,
 
      supplyConditions: {
        ...prev.supplyConditions,
        applicableConditions: prev.supplyConditions.applicableConditions.filter(
          (condition) => condition.type !== conditionType
        )
      }
    }));
  };
 
  const setActionStatusValues = useCallback((actionStatus: ActionStatus) => {
    setActionStatus(actionStatus);
  }, [tenderData]
  );
 
  const tenderDataCopyRef = useRef(tenderData);
 
  const router = useRouter();
  const goBack = () => {
    router.back();
  };
 
  // Update the ref whenever orderDataCopy changes
  useEffect(() => {
    tenderDataCopyRef .current = tenderData;
  }, [tenderData]);
 
  const stripReadOnlyProperties = (obj: any): any => {
    if (Array.isArray(obj)) {
      return obj.map((item) => stripReadOnlyProperties(item));
    }
 
    if (typeof obj !== "object" || obj === null) {
      return obj;
    }
 
    const newObj: any = {};
    for (const key in obj) {
      if (obj[key] && typeof obj[key] === "object") {
        if (obj[key].type?.toLowerCase() !== "read-only") {
          newObj[key] = stripReadOnlyProperties(obj[key]);
        }
      } else {
        newObj[key] = obj[key];
      }
    }
    return newObj;
  };
  // Save Order API Call
  const saveTender = useCallback(
    async (status: dsStatus) => {
      if (!tenderData) return;
      console.log("sAVEEEE", tenderData);
 
      const dataToSend = stripReadOnlyProperties({
        ...tenderData,
        status: status.toUpperCase(),
        createdBy: 3,
      });
 
      console.log("sAVEEEE", dataToSend);
      try {
        await fetchData({
          url: saveTenderurl,
          method: "POST",
          dataObject: dataToSend,
        }).then((res) => {
          console.log("res = ",res);
          if (res.code === 200) {
            setActionStatus({
              notiMsg: "Tender Created Successfully",
              notiType: "success",
              showNotification: true,
            });
            showToaster("create-order-toaster");
            setTimeout(() => {
              goBack();
 
            }, closeTimeForTender)
          } else {
            setActionStatus({
              notiMsg: "Tender could not be saved",
              notiType: "error",
              showNotification: true,
            });
            showToaster("create-order-toaster");
          }
        });
 
        // console.log("result  = ", result);
        //console.log("Order saved successfully");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        // console.error("Error saving order:", error);
      }
    },
    [tenderData, fetchData]
  );
 
 
  return (
    <TenderDataContext.Provider
      value={{
        tenderData,
        actionStatus,
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
        removeApplicableCondition,
        saveTender,setActionStatusValues
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
 
 
 