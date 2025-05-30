"use client";
import { showToaster } from "@/Elements/DsComponents/DsToaster/DsToaster";
import {
  cancelTenderContractURl,
  closeTimeForTender,
  DsStatus,
  // DsStatus,
  dsStatus,
  getAllMetaData,
  getTenderByTenderId,
  saveDocumentUrl,
  // saveDocumentUrl,
  updateTenderUrl,
  updateContractUrl,
  saveTenderUrl,
  updatePaymentUrl,
} from "@/Common/helpers/constant";
import fetchData, { fileToBase64 } from "@/Common/helpers/Method/fetchData";

import { useRouter } from "next/navigation";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { generatePatchDocument } from "@/Common/helpers/Method/UpdatePatchObjectCreation";
import DsSupplyConditions from "./BasicDetailComponents/DsSupplyConditions";
import { DsSelectOption } from "@/Common/helpers/types";
import { useAppSelector } from "@/Redux/hook/hook";
import { RootState } from "@/Redux/store/store";

class ActionStatus {
  notiType: "success" | "bonus" | "info" | "error" | "cross" = "success";
  notiMsg: string | React.ReactNode = "";
  showNotification: boolean = false;
  isOkayButtonVisible?: boolean = false;
}
export type Document = {
  id?: number;
  documentId?: number;
  documentName?: string;
  document?: File;
  name?: string;
};
export type TenderDocument = {
  id?: number;
  documentType: string;
  documentCategory: string;
  documentSubType?: string;
  documentName: string;
  documentPath?: string;
  data?: File;
  documentId?: number;
  // documents: Document[];
};

export type TenderProduct = {
  id?: number;
  requestedGenericName?: string;
  requestedQuantity?: number;
  requestedPackingSize?: string;
  productId?: number;
  lastPurchaseRate?: number;
  competitorId?: number;
  proposedRate?: number;
  ptrPercentage?: number;
  stockistDiscountValue?: number;
  lastQuotedRate?: number;

  product: {
    type?: "read-only";
    productName?: string;
    productPackingSize?: string;
    mrp?: string | number;
    ptr?: string | number;
    directCost?: string | number;
    competitorName?: string;

    totalCost?: number;
    marginValue?: number;
    marginPercent?: number;
    netValue?: number;
    dataSource?: "fetch" | "csv" | "saved";
  };
};
// export type Company = {
//   id: number;
//   name: string;
// };
export type tenderSupplyCondition = {
  id?: number;
  supplyPoint: string;
  consigneesCount: number | null;
  testReportRequired: string;
  eligibility: string[];
  applicableConditions: applicableSupplyConditions[];
};
export type applicableSupplyConditions = {
  id?: number;
  type: string | number;
  notes: string;
  // documents: Document[];
  status?: "ACTV" | "INAC";
};
export type tenderFee = {
  id?: number;
  feesType: string | number;
  amount: number | null;
  currency: string;
  paidBy: string;
  paymentMode: string;
  refundEligibility: string;
  paymentDueDate: string;
  paymentOptions:string[];
  paymentDate?: string;
  paymentRefundDate?: string;
  refundNotes?: string;
  paymentStatus?: string;
  // paymentrefundStatus?:string
  paymentRefundStatus?: string;
  paymentTransactionId?: string;
  paymentReceiptId?: string;
  acknowledgementReceiptId?: string;
  fundTransferConfirmationId?: string;
  instructionNotes: string;
  status?: "ACTV" | "INAC";
  // documents: Document[];
};
export type ContractItems = {
  id?: number;
  productId?: number;
  product: {
    type: "read-only";
    requestedGenericName: string;
    requestedPackingSize: string;
    productName: string;
    awardedToName: string;
  };
  awardedQuantity?: number;
  awardedToId?: number;
  awardedRate?: number;
};
export type TenderContract = {
  contractStatus?: string;
  contractJustification?: string;
  contractStatusNotes?: string;
  tenderRevisions?: {
    id: number;
    tenderItems?: ContractItems[];
  }[];
};
export type TenderData = {
  // tenderId: string;
  id?: number;
  customerId: number;
  customerAddressId: number | undefined;
  tenderNumber: string;
  tenderType: string;
  contractType: string;
  issueDate: string | undefined;
  lastPurchaseDate: string | undefined;
  submissionDate: string | undefined;
  rateContractValidity: string;
  submissionMode: string;
  deliveryPeriod: number | null;
  extendedDeliveryPeriod: number | null;
  lateDeliveryPenalty: number | null;
  tenderUrl: string;
  shippingLocations: number[];
  // appliedBy: string;
  applierId: number;
  applierType: string;
  // suppliedBy: string;
  supplierId: number;
  supplierType: string;
  supplierName: string;
  supplierDiscount: number | null;
  // createdBy: number;
  lastUpdatedBy: number;
  status: string;
  tenderDetails: {
    type: "read-only";
    customerName: string;
    customerAddressName: string;
    appliedBy: string;
    suppliedBy: string;
    lastUpdatedByName: string;
    lastUpdatedByEmpId: string;
    statusDescription: string;
  };
  // comments: string;
  tenderFees: tenderFee[];
  tenderSupplyCondition: tenderSupplyCondition;
  tenderRevisions: {
    id?: number;
    status?: string;
    version: number;
    tenderItems: TenderProduct[];
  }[];
  tenderContract?: TenderContract;
  tenderDocuments?: TenderDocument[];
};

export function updateDocuments(
  files: {
    id?: string | number;
    documentName?: string;
    document?: File;
  }[],
  typeDocuments: TenderDocument[],
  removeDocumentFunction: (
    documentType: string,
    documentCategory: string,
    documentName: string,
    documentSubType?: string
  ) => void,
  addDocumentFunction: (
    documentType: string,
    documentCategory: string,
    document: {
      documentId?: number;
      name: string;
      document?: File;
    },
    documentSubType?: string
  ) => void,
  type: string,
  category: string,
  subCategory?: string
) {
  //If all current files array is empty (all documents are removed) then simply empty/remove the tenderDocument array (with their corresponding document_type, category and sub-category).
  if (files.length == 0) {
    typeDocuments?.forEach((x) => {
      if (x.id == undefined)
        removeDocumentFunction(
          x.documentType,
          x.documentCategory,
          x.documentName,
          x.documentSubType
        );
    });
    return;
  }

  //When first time document is getting uploaded the tenderDocument is empty then simply add the document in TenderDocument Array
  if (typeDocuments?.length == 0) {
    files.forEach((x) => {
      if (x.documentName || x.document?.name)
        addDocumentFunction(
          type,
          category,
          {
            documentId: x.id ? Number(x.id) : undefined,
            name: x.documentName || x.document?.name || "",
            document: x.document,
          },
          subCategory
        );
    });
    return;
  }

  // For add document --> document is not in tenderDocument array and it is present in latest files array
  files?.forEach((x) => {
    if (
      !typeDocuments?.find(
        (f) =>
          f.documentName == x.documentName || f.documentName == x.document?.name
      )
    ) {
      if (x.documentName || x.document?.name)
        addDocumentFunction(
          type,
          category,
          {
            documentId: x.id ? Number(x.id) : undefined,
            name: x.documentName || x.document?.name || "",
            document: x.document,
          },
          subCategory
        );
    }
    // else{
    // settError Message for duplicate file
    // console.error()
    // }
  });
  // For remove document --> document is present in tenderDocument array and it is not present in latest files array.
  typeDocuments?.forEach((x) => {
    if (!files.find((f) => f.documentName == x.documentName)) {
      removeDocumentFunction(
        x.documentType,
        x.documentCategory,
        x.documentName,
        x.documentSubType
      );
    }
  });
}

interface TenderDataContextType {
  tenderData: TenderData;
  tenderDataCopy: TenderData;
  metaData: Record<string, DsSelectOption[]>;
  actionStatus: ActionStatus;
  setActionStatusValues: (actionStatus: ActionStatus) => void;
  updateTenderData: (
    key:
      | keyof TenderData
      | `tenderDetails.${keyof TenderData["tenderDetails"]}`,
    value: string | number | number[] | tenderFee[] | tenderSupplyCondition
  ) => void;
  updateTenderFee: (
    feeType: string,
    key: keyof tenderFee,
    value: Document[] |string[] |string | number
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
    value: string | number | string[] | Document[]
  ) => void;
  addNewTenderDocument: (
    documentType: string,
    documentCategory: string,
    document: Document,
    documentSubType?: string
  ) => void;
  removeTenderDocument: (
    documentType: string,
    documentCategory: string,
    documentName: string,
    documentSubType?: string
  ) => void;
  // addDocumentToExistingType: (docType: string, document: Document) => void;
  addTenderProduct: (version: number, product: TenderProduct) => void;
  removeTenderProduct: (
    version: number,
    id?: number,
    genericName?: string
  ) => void;
  // createTenderVersion: () => void;
  updateTenderProduct: (
    version: number,
    key: keyof TenderProduct | `product.${keyof TenderProduct["product"]}`,
    value: string | number,
    id?: number,
    productId?: number,
    requestedGenericName?: string
  ) => void;
  addApplicableCondition: (type: string) => void;
  removeApplicableCondition: (conditionType: string) => void;
  updateContractDetails: (
    key: keyof TenderContract,
    value: string | { id: number; tenderItems: ContractItems[] }
  ) => void;
  updateContractItems: (
    key: keyof ContractItems | `product.${keyof ContractItems["product"]}`,
    id: number,
    value: string | number
  ) => void;
  saveTender: (status: string) => Promise<void>;
  updateTender: (status: string, action: "SAVE" | "SUBMIT") => Promise<void>;
  fetchAndSetOriginalTender: (
    tenderId: number,
    tenderStatus?: string
  ) => Promise<void>;
  fetchAndSetPreviousTender: (tenderId: number) => Promise<void>;
  fetchMetaData: () => Promise<void>;
}

const TenderDataContext = createContext<TenderDataContextType | undefined>(
  undefined
);

export const TenderDataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const reader = new FileReader();
  const metaDataTypes: string[] = React.useMemo(() => {
    return [
      "TENDER_TYPE",
      "SUBMISSION_MODE",
      "RATE_CONTRACT_TYPE",
      "SUPPLY_POINT",
      "TEST_REPORT_REQUIRED",
      "ELIGIBILITY",
      "FEES_TYPE",
      "TENDER_EMD_PAYMENT",
      "TENDER_FEES_PAYMENT",
      "TENDER_PSD_PAYMENT",
      "TENDER_SUPPLY_CONDITION",
      "PAYMENT_MODE",
      "EMD_PAYMENT_MODE",
      "TENDER_FEE_PAYMENT_MODE",
      "PSD_PAYMENT_MODE",
      "REFUND_ELIGIBILITY",
      "TENDER_PARTIALLY_AWARDED_JUSTIFICATION",
      "TENDER_LOST_JUSTIFICATION",
      "TENDER_CANCELLED_JUSTIFICATION",
      "TENDER_AWARDED_JUSTIFICATION",
      "JUSTIFICATION_APPROVE_TYPE",
      "JUSTIFICATION_REJECT_TYPE",
      "JUSTIFICATION_REVISE_TYPE",
      "TENDER_DOCUMENT",
    ];
  }, []);
  const [metaData, setMetaData] = useState<Record<string, DsSelectOption[]>>(
    {}
  );

  const [tenderData, setTenderData] = useState<TenderData>({
    customerId: 0,
    customerAddressId: undefined,
    tenderNumber: "",
    tenderType: "",
    contractType: "",
    issueDate: "",
    lastPurchaseDate: "",
    submissionDate: "",
    rateContractValidity: "",
    submissionMode: "",
    deliveryPeriod: null,
    extendedDeliveryPeriod: null,
    lateDeliveryPenalty: null,
    tenderUrl: "",
    shippingLocations: [],
    applierType: "",
    applierId: 0,
    supplierType: "",
    supplierId: 0,
    supplierName: "",
    supplierDiscount: null,
    lastUpdatedBy: 0,
    status: "Draft",
    tenderDetails: {
      type: "read-only",
      customerName: "",
      customerAddressName: "",
      appliedBy: "",
      suppliedBy: "",
      lastUpdatedByName: "",
      lastUpdatedByEmpId: "",
      statusDescription: "Draft",
    },
    tenderFees: [],
    tenderSupplyCondition: {
      supplyPoint: "",
      consigneesCount: null,
      testReportRequired: "",
      eligibility: [],
      applicableConditions: [],
    },

    tenderRevisions: [
      {
        version: 1,
        status: DsStatus.DRFT.toUpperCase(),
        tenderItems: [],
      },
    ],
    tenderDocuments: [],
    tenderContract: {
      contractStatus: "AWARDED",
      contractJustification: "test",
      contractStatusNotes: "test",
      tenderRevisions: [
        {
          id: 0,
          tenderItems: [
            {
              awardedQuantity: 1,
              awardedRate: 2,
              awardedToId: 1,
              id: 2,
              productId: 1,
              product: {
                awardedToName: "Testor",
                productName: "Zer",
                requestedGenericName: "Zept",
                requestedPackingSize: "15ml vail",
                type: "read-only",
              },
            },
          ],
        },
      ],
    },
  });
  const [tenderDataCopy, setTenderDataCopy] = useState<TenderData>({
    ...tenderData,
  });
  const [actionStatus, setActionStatus] = useState<ActionStatus>({
    notiMsg: "",
    notiType: "success",
    showNotification: false,
  });
  const role = useAppSelector((state: RootState) => state.user.role);
  // ✅ Update top-level tender fields
  const updateTenderData = useCallback(
    (
      key:
        | keyof TenderData
        | `tenderDetails.${keyof TenderData["tenderDetails"]}`,
      value: string | number | number[] | tenderFee[] | tenderSupplyCondition
    ) => {
      setTenderData((prev) => {
        if (key.startsWith("tenderDetails.")) {
          const nestedKey = key.split(
            "."
          )[1] as keyof TenderData["tenderDetails"];
          return {
            ...prev,
            tenderDetails: {
              ...prev.tenderDetails,
              [nestedKey]: value,
            },
          };
        } else {
          return {
            ...prev,
            [key]: value,
          };
        }
      });
    },
    [setTenderData]
  );
  // ✅ Update a specific tender fee field (Only if fee type exists)
  const updateTenderFee = useCallback(
    (
      feeType: string,
      key: keyof tenderFee,
      value: Document[] |string[]| string | number
    ) => {
      setTenderData((prev) => ({
        ...prev,
        tenderFees: prev.tenderFees.map((fee) =>
          fee.feesType === feeType ? { ...fee, [key]: value } : fee
        ),
      }));
    },
    [setTenderData]
  );

  // ✅ Add a new tender fee
  const addTenderFee = useCallback(
    (type: string) => {
      // setTenderData((prev) => ({
      //   ...prev,
      //   tenderFees: [
      //     ...prev.tenderFees,
      //     {
      //       feesType: type,
      //       amount: 0,
      //       currency: "",
      //       paidBy: "",
      //       paymentMode: "",
      //       paymentDueDate: "",
      //       instructionNotes: "",
      //       // documents: []
      //     },
      //   ],
      // }));
      setTenderData((prev) => {
        let updated = false; // Flag to track if we updated an existing entry
        const active: "ACTV" | "INAC" = "ACTV";
        const updatedTenderFees = prev.tenderFees.map((fee) => {
          if (fee.feesType === type) {
            updated = true; // Mark that we found and updated the type
            return {
              ...fee,
              status: active,
            };
          }
          return fee; // Keep existing entries unchanged
        });

        // If no update was made, add a new entry
        if (!updated) {
          updatedTenderFees.push({
            feesType: type,
            amount: null,
            refundEligibility: "",
            currency: "INR",
            paidBy: "",
            paymentMode: "",
            paymentDueDate: "",
            instructionNotes: "",
            status: active,
            paymentOptions:[],
            paymentDate: "",
            paymentRefundDate: "",
            refundNotes: "",
            paymentTransactionId: "",
            paymentReceiptId: "",
            acknowledgementReceiptId: "",
            fundTransferConfirmationId: "",
            paymentStatus: "",
          });
        }

        return {
          ...prev,
          tenderFees: updatedTenderFees,
        };
      });
    },
    [setTenderData]
  );

  // ✅ Remove tender fee by type
  const removeTenderFeeByType = useCallback(
    (feeType: string) => {
      setTenderData((prev) => ({
        ...prev,
        tenderFees: prev.tenderFees.filter((fee) => fee.feesType !== feeType),
      }));
    },
    [setTenderData]
  );

  // ✅ Update supply condition fields
  const updateSupplyCondition = useCallback(
    (
      key: keyof tenderSupplyCondition,
      value: string | number | string[] | Document[]
    ) => {
      setTenderData((prev) => ({
        ...prev,
        tenderSupplyCondition: {
          ...prev.tenderSupplyCondition,
          [key]: value,
        },
      }));
    },
    [setTenderData]
  );

  // ✅ Update applicable condition fields
  const updateApplicableCondition = useCallback(
    (
      conditionType: string,
      key: keyof applicableSupplyConditions,
      value: string | number | Document[]
    ) => {
      setTenderData((prev) => ({
        ...prev,
        tenderSupplyCondition: {
          ...prev.tenderSupplyCondition,
          applicableConditions:
            prev.tenderSupplyCondition.applicableConditions.map((condition) =>
              condition.type === conditionType
                ? { ...condition, [key]: value }
                : condition
            ),
        },
      }));
    },
    [setTenderData]
  );

  // ✅ Add a document to the tender-level document list
  const addNewTenderDocument = useCallback(
    (
      documentType: string,
      documentCategory: string,
      document?: Document,
      documentSubType?: string,
      documentName?: string,
      name?: string,
      documentId?: number,
      documentPath?: string
    ) => {
      setTenderData((prev) => ({
        ...prev,
        tenderDocuments: [
          ...(prev.tenderDocuments || []),
          {
            id: document?.id,
            documentType: documentType,
            documentCategory: documentCategory,
            documentSubType: documentSubType,
            documentName:
              document?.documentName ||
              document?.document?.name ||
              documentName ||
              document?.name ||
              name ||
              "",
            documentPath: documentPath || "",
            documentId: documentId || document?.documentId || 0,
            data: document?.document || undefined,
          },
        ],
      }));
    },
    [setTenderData]
  );

  const removeTenderDocument = useCallback(
    (
      documentType: string,
      documentCategory: string,
      documentName: string,
      documentSubType?: string
    ) => {
      setTenderData((prev) => ({
        ...prev,

        tenderDocuments: [
          ...(prev.tenderDocuments?.filter(
            (document) =>
              !(
                document.documentName == documentName &&
                document.documentType == documentType &&
                document.documentCategory == documentCategory &&
                document.documentSubType == documentSubType
              )
          ) || []),
        ],
      }));
    },
    [tenderData, setTenderData]
  );

  // const addDocumentToExistingType = (docType: string, document: Document) => {
  //   setTenderData((prev) => ({
  //     ...prev,
  //     tenderDocuments: prev.tenderDocuments.map((doc) =>
  //       doc.type === docType
  //         ? { ...doc, data: [...doc.data, document.document] }
  //         : doc
  //     ),
  //   }));
  // };
  // ✅ Add a new tender product
  const addTenderProduct = useCallback(
    (version: number, product: TenderProduct) => {
      setTenderData((prev) => ({
        ...prev,
        tenderRevisions: prev.tenderRevisions.map((revision) =>
          revision.version === version
            ? {
              ...revision,
              tenderItems: [...(revision.tenderItems || []), product],
            }
            : revision
        ),
      }));
    },
    [setTenderData]
  );

  const removeTenderProduct = useCallback(
    (version: number, id?: number, genericName?: string) => {
      setTenderData((prev) => ({
        ...prev,
        tenderRevisions: prev.tenderRevisions.map((revision) =>
          revision.version === version
            ? {
              ...revision,
              tenderItems: [
                ...revision.tenderItems.filter((item) =>
                  item.productId == undefined
                    ? item.requestedGenericName !== genericName
                    : item.productId !== id
                ),
              ],
            }
            : revision
        ),
      }));
    },
    [setTenderData]
  );

  const createTenderVersion = useCallback(
    (tenderData: TenderData) => {
      const latestRevision = {
        ...[...tenderData.tenderRevisions].reduce((maxObj, currentObj) =>
          currentObj.version > maxObj.version ? currentObj : maxObj
        ),
      };
      console.log(latestRevision);
      console.log(tenderData.tenderRevisions);
      delete latestRevision.id;

      const newTenderRevision = [...tenderData.tenderRevisions];
      const newRevisedIndex = newTenderRevision.findIndex(
        (x) => x.version == latestRevision.version
      );
      latestRevision.version = latestRevision.version + 1;
      if (newRevisedIndex) {
        // newTenderRevision[newRevisedIndex].status = "REVISE";
        newTenderRevision.push({
          ...latestRevision,
          tenderItems: [
            ...latestRevision.tenderItems.map((x) => {
              return {
                requestedGenericName: x.requestedGenericName,
                requestedQuantity: x.requestedQuantity,
                requestedPackingSize: x.requestedPackingSize,
                productId: x.productId,
                product: x.product,
                proposedRate: x.proposedRate,
                ptrPercentage: x.ptrPercentage,
                lastPurchaseRate: x.lastPurchaseRate,
                competitorId: x.competitorId,
                stockistDiscountValue: x.stockistDiscountValue,
              } as TenderProduct;
            }),
          ],
        });
        // setTimeout(()=>{

        return {
          ...tenderData,
          tenderRevisions: [...newTenderRevision],
        };
        // },1000);
      }
    },
    [setTenderData]
  );

  // const createTenderVersion = useCallback(() => {
  //   const latestRevision = {
  //     ...[...tenderData.tenderRevisions].reduce((maxObj, currentObj) =>
  //       currentObj.version > maxObj.version ? currentObj : maxObj
  //     ),
  //   };
  //   console.log(latestRevision);
  //   console.log(tenderData.tenderRevisions);
  //   delete latestRevision.id;
  //   latestRevision.version = latestRevision.version + 1;

  //   setTenderData((prev) => ({
  //     ...prev,
  //     tenderRevisions: [
  //       ...prev.tenderRevisions,
  //       {
  //         ...latestRevision,
  //         tenderItems: [
  //           ...latestRevision.tenderItems.map((x) => {
  //             return {
  //               requestedGenericName: x.requestedGenericName,
  //               requestedQuantity: x.requestedQuantity,
  //               requestedPackingSize: x.requestedPackingSize,
  //               productId: x.productId,
  //               product: x.product,
  //               proposedRate: x.proposedRate,
  //               ptrPercentage: x.ptrPercentage,
  //               lpr: x.lpr,
  //               lastPurchasedFrom: x.lastPurchasedFrom,
  //               stockistDiscountValue: x.stockistDiscountValue,
  //             } as TenderProduct;
  //           }),
  //         ],
  //       },
  //     ],
  //   }));
  // }, [tenderDataCopy, tenderData]);
  // ✅ Update a tender product field
  // const updateTenderProduct = useCallback(
  //   (
  //     version: number,
  //     key: keyof TenderProduct | `product.${keyof TenderProduct["product"]}`,
  //     value: string | number,
  //     id?: number,
  //     productId?: number,
  //     requestedGenericName?: string
  //   ) => {
  //     setTenderData((prev) => ({
  //       ...prev,
  //       tenderRevisions: prev.tenderRevisions.map((revision) =>
  //         revision.version === version
  //           ? {
  //               ...revision,
  //               tenderItems: revision.tenderItems.map((item) => {
  //                 const obj =
  //                   (id && item.id === id) ||
  //                   (productId && item.productId === productId) ||
  //                   (requestedGenericName &&
  //                     item.requestedGenericName === requestedGenericName)
  //                     ? key.startsWith("product.")
  //                       ? {
  //                           ...item,
  //                           product: {
  //                             ...item.product,
  //                             [key.split(".")[1]]: value, // Update the nested product field
  //                           },
  //                         }
  //                       : { ...item, [key]: value } // Update the top-level field
  //                     : item;
  //                 return obj;
  //               }),
  //             }
  //           : revision
  //       ),
  //     }));
  //   },
  //   [ setTenderData]
  // );
  const updateTenderProduct = useCallback(
    (
      version: number,
      key: keyof TenderProduct | `product.${keyof TenderProduct["product"]}`,
      value: string | number,
      id?: number,
      productId?: number,
      requestedGenericName?: string
    ) => {
      setTenderData((prev) => {
        // Find the revision index
        const revIdx = prev.tenderRevisions.findIndex(
          (r) => r.version === version
        );
        if (revIdx === -1) return prev; // Not found, nothing to update

        // Find the item index within the revision
        const itemIdx = prev.tenderRevisions[revIdx].tenderItems.findIndex(
          (item) =>
            (id && item.id === id) ||
            (productId && item.productId === productId) ||
            (requestedGenericName &&
              item.requestedGenericName === requestedGenericName)
        );
        if (itemIdx === -1) return prev; // Not found, nothing to update

        // Prepare updated item
        const oldItem = prev.tenderRevisions[revIdx].tenderItems[itemIdx];
        let updatedItem;
        if (key.startsWith("product.")) {
          const productKey = key.split(".")[1];
          updatedItem = {
            ...oldItem,
            product: {
              ...oldItem.product,
              [productKey]: value,
            },
          };
        } else {
          updatedItem = {
            ...oldItem,
            [key]: value,
          };
        }

        // Build new tenderItems array with only the updated item replaced
        const newTenderItems = [
          ...prev.tenderRevisions[revIdx].tenderItems.slice(0, itemIdx),
          updatedItem,
          ...prev.tenderRevisions[revIdx].tenderItems.slice(itemIdx + 1),
        ];

        // Build new tenderRevisions array with only the updated revision replaced
        const newTenderRevisions = [
          ...prev.tenderRevisions.slice(0, revIdx),
          {
            ...prev.tenderRevisions[revIdx],
            tenderItems: newTenderItems,
          },
          ...prev.tenderRevisions.slice(revIdx + 1),
        ];

        // Return new state
        return {
          ...prev,
          tenderRevisions: newTenderRevisions,
        };
      });
    },
    [setTenderData]
  );

  const updateContractDetails = useCallback(
    (
      key: keyof TenderContract,
      value: string | { id: number; tenderItems: ContractItems[] }
    ) => {
      setTenderData((prev) => ({
        ...prev,
        tenderContract: {
          ...prev.tenderContract,
          [key]: value,
        },
      }));
    },
    [setTenderData]
  );

  const updateContractItems = useCallback(
    (
      key: keyof ContractItems | `product.${keyof ContractItems["product"]}`,
      id: number,
      value: string | number
    ) => {
      setTenderData((prev) => ({
        ...prev,
        tenderContract: {
          ...prev.tenderContract,
          tenderRevisions: [
            {
              id: prev.tenderContract?.tenderRevisions?.[0]?.id || 0,
              tenderItems:
                prev.tenderContract?.tenderRevisions?.[0].tenderItems?.map(
                  (item) =>
                    item.id === id || item.productId === id
                      ? key.startsWith("product.")
                        ? {
                          ...item,
                          product: {
                            ...item.product,
                            [key.split(".")[1]]: value, // Update the nested product field
                          },
                        }
                        : { ...item, [key]: value } // Update the top-level field
                      : item
                ),
            },
          ],
        },
      }));
    },
    [setTenderData]
  );

  // ✅ Add a new applicable condition
  const addApplicableCondition = useCallback(
    (type: string) => {
      // setTenderData((prev) => ({
      //   ...prev,

      //   supplyConditions: {
      //     ...prev.supplyConditions,
      //     applicableConditions: [
      //       ...prev.supplyConditions.applicableConditions,
      //       {
      //         type,
      //         notes: "",
      //         status: "ACTV",
      //       },
      //     ],
      //   },
      // }));
      setTenderData((prev) => {
        let updated = false; // Flag to track if we updated an existing entry
        const active: "ACTV" | "INAC" = "ACTV";

        const updatedTenderApplicableConditions =
          prev.tenderSupplyCondition.applicableConditions?.map((ac) => {
            if (ac.type == type) {
              updated = true;
              return {
                ...ac,
                status: active,
              };
            }
            return ac;
          });
        if (!updated) {
          updatedTenderApplicableConditions?.push({
            type,
            status: active,
            notes: "",
          });
        }
        return {
          ...prev,
          tenderSupplyCondition: {
            ...prev.tenderSupplyCondition,
            applicableConditions: updatedTenderApplicableConditions,
          },
        };
      });
    },
    [setTenderData]
  );

  // ✅ Remove an applicable condition by type
  const removeApplicableCondition = useCallback(
    (conditionType: string) => {
      setTenderData((prev) => ({
        ...prev,

        tenderSupplyCondition: {
          ...prev.tenderSupplyCondition,
          applicableConditions:
            prev.tenderSupplyCondition.applicableConditions.filter(
              (condition) => condition.type !== conditionType
            ),
        },
      }));
    },
    [setTenderData]
  );

  const setActionStatusValues = useCallback(
    (actionStatus: ActionStatus) => {
      setActionStatus(actionStatus);
    },
    [tenderData]
  );

  const tenderDataCopyRef = useRef(tenderData);

  const router = useRouter();
  const goBack = () => {
    router.back();
  };

  // Update the ref whenever orderDataCopy changes
  useEffect(() => {
    tenderDataCopyRef.current = tenderData;
  }, [tenderData]);

  const stripReadOnlyProperties = (obj: any): any => {
    if (obj instanceof File || obj instanceof Blob) {
      return obj;
    }
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
  // Save Order API Call
  async function fileToBlob(file) {
    const arrayBuffer = await file.arrayBuffer();
    return new Blob([new Uint8Array(arrayBuffer)], { type: file.type });
  }
  const saveTender = useCallback(
    async (status: string) => {
      if (!tenderData) return;
      let documentRequestId = 0;
      const tenderSaveDocuments = tenderData.tenderDocuments?.map((x) => {
        documentRequestId = documentRequestId - 1;
        return { ...x, requestId: documentRequestId };
      });
      const formData = new FormData();

      tenderSaveDocuments?.forEach((doc, index) => {
        console.log(
          doc.data,
          typeof doc.data,
          doc.data instanceof File,
          doc.data instanceof Blob
        );
        // const blob = new Blob([doc.data.arrayBuffer()], {
        //   type: "application/pdf",
        // });
        if (doc.data) {
          formData.append(
            `tenderDocuments[${index}].requestId`,
            doc.requestId.toString()
          );

          formData.append(
            `tenderDocuments[${index}].document`,
            doc.data,
            doc.documentName
          ); // File/Blob object
          formData.append(
            `tenderDocuments[${index}].documentCategory`,
            doc.documentCategory
          );
          formData.append(
            `tenderDocuments[${index}].documentType`,
            doc.documentType
          );

          formData.append(
            `tenderDocuments[${index}].documentSubType`,
            doc.data,
            doc.documentSubType
          );
        }
      });
      let tenderSaveData = {
        customerId: tenderData.customerId,
        customerAddressId: tenderData.customerAddressId,
        tenderNumber: tenderData.tenderNumber,
        tenderType: tenderData.tenderType,
        contractType: tenderData.contractType,
        issueDate: tenderData.issueDate,
        lastPurchaseDate: tenderData.lastPurchaseDate,
        submissionDate: tenderData.submissionDate,
        rateContractValidity: tenderData.rateContractValidity,
        submissionMode: tenderData.submissionMode,
        deliveryPeriod: tenderData.deliveryPeriod,
        extendedDeliveryPeriod: tenderData.extendedDeliveryPeriod,
        lateDeliveryPenalty: tenderData.lateDeliveryPenalty,
        tenderUrl: tenderData.tenderUrl,
        shippingLocations: tenderData.shippingLocations,
        appliedBy:
          tenderData.applierType.toLowerCase() == "organization"
            ? "IPCA"
            : "STOCKIST",
        applierId:
          tenderData.applierType.toLowerCase() == "organization"
            ? null
            : tenderData.applierId,
        // applierType: ,
        suppliedBy:
          tenderData.supplierType.toLowerCase() == "organization"
            ? "IPCA"
            : "STOCKIST",
        supplierId:
          tenderData.supplierType.toLowerCase() == "organization"
            ? null
            : tenderData.supplierId,
        // supplierType: ,
        // supplierName: ,
        supplierDiscount: tenderData.supplierDiscount,
        // createdBy: number;
        // createdBy: 3,
        lastUpdatedBy: 3,
        // status: status,
        tenderFees: tenderData.tenderFees
          .filter((x) => x.status == "ACTV")
          .map((x) => {
            return {
              feesType: x.feesType,
              amount: x.amount,
              currency: x.currency,
              paidBy: x.paidBy,
              paymentMode: x.paymentMode,
              refundEligibility: x.refundEligibility,
              paymentDueDate: x.paymentDueDate,
              instructionNotes: x.instructionNotes,
              paymentOptions:x.paymentOptions,
              paymentDate: x.paymentDate,
              paymentRefundDate: x.paymentRefundDate,
              refundNotes: x.refundNotes,
              paymentTransactionId: x.paymentTransactionId,
              paymentReceiptId: x.paymentReceiptId,
              acknowledgementReceiptId: x.acknowledgementReceiptId,
              fundTransferConfirmationId: x.fundTransferConfirmationId,
              paymentStatus: x.paymentStatus,
            };
          }),
        tenderSupplyCondition: {
          ...tenderData.tenderSupplyCondition,
          eligibility: tenderData.tenderSupplyCondition.eligibility,
          applicableConditions:
            tenderData.tenderSupplyCondition.applicableConditions.filter(
              (x) => x.status == "ACTV"
            ),
        },




        tenderDocuments:
          tenderSaveDocuments?.map((x) => {
            // const newDocs=new FormData();
            // newDocs.append("name",x.name);
            // newDocs.append("data",x.data as Blob);
            // newDocs.append("documentType",x.name);
            // newDocs.append("category",x.name);
            // const base64String = x.data ? await fileToBase64(x.data) : "";
            return {
              documentName: x.documentName,
              documentId: x.documentId,
              documentType: x.documentType,
              documentCategory: x.documentCategory,
              documentSubType: x.documentSubType,
            };
          }) || [],
        comments: null,
      };
      delete tenderSaveData.tenderSupplyCondition.id;
      try {
        if (
          tenderData?.tenderDocuments &&
          tenderData.tenderDocuments.length > 0 &&
          tenderData.tenderDocuments.filter((x) => x.id == undefined).length > 0
        )
          await fetch(saveDocumentUrl(tenderData.id ?? 0), {
            method: "POST",
            body: formData,
          }).then((result) => {
            result.json().then(async (docRes) => {
              if (docRes.code == 200) {
                tenderSaveData = {
                  ...tenderSaveData,
                  tenderDocuments:
                    tenderSaveDocuments?.map((x) => {
                      // const newDocs=new FormData();
                      // newDocs.append("name",x.name);
                      // newDocs.append("data",x.data as Blob);
                      // newDocs.append("documentType",x.name);
                      // newDocs.append("category",x.name);
                      // const base64String = x.data ? await fileToBase64(x.data) : "";
                      return {
                        documentName: x.documentName,
                        documentId: docRes.result[x.requestId],
                        documentType: x.documentType,
                        documentCategory: x.documentCategory,
                        documentSubType: x.documentSubType,
                      };
                    }) || [],
                };
                const dataToSend = stripReadOnlyProperties({
                  ...tenderSaveData,
                  // status: status.toUpperCase(),
                  lastUpdatedBy: 3,
                });

                console.log("sAVEEEE", dataToSend);
                await fetch(saveTenderUrl, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json", //gaurav
                  },
                  body: JSON.stringify(dataToSend),
                }).then((result) => {
                  result.json().then((res) => {
                    if (res.code === 200) {
                      setActionStatus({
                        notiMsg: `${res.message}`,
                        notiType: "success",
                        showNotification: true,
                      });
                      showToaster("create-order-toaster");
                      setTimeout(() => {
                        goBack();
                      }, closeTimeForTender);
                    } else {
                      setActionStatus({
                        notiMsg: `${res.message}.\r\n` + `${res.error.errorDetails.map(x => x.message).join("\r\n")}`,
                        notiType: "error",
                        showNotification: true,
                      });
                      showToaster("create-order-toaster");
                    }
                  });
                });
                // console.log("result  = ", result); 
                //console.log("Order saved successfully");
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
              }
            });
          });
        else {
          const dataToSend = stripReadOnlyProperties({
            ...tenderSaveData,
            // status: status.toUpperCase(),
            lastUpdatedBy: 3,
          });

          console.log("sAVEEEE", dataToSend);
          await fetch(saveTenderUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json", //gaurav 
            },
            body: JSON.stringify(dataToSend),
          }).then((result) => {
            result.json().then((res) => {
              if (res.code === 200) {
                setActionStatus({
                  notiMsg: `${res.message}`,
                  notiType: "success",
                  showNotification: true,
                });
                showToaster("create-order-toaster");
                setTimeout(() => {
                  goBack();
                }, closeTimeForTender);
              } else {
                setActionStatus({
                  notiMsg: `${res.message}.\r\n` + `${res.error.errorDetails.map(x => x.message).join("\r\n")}`,
                  notiType: "error",
                  showNotification: true,
                });
                showToaster("create-order-toaster");
              }
            });
          });
        }
      } catch (error) {
        console.error("Error saving order:", error);
      }
    },
    [tenderData, tenderDataCopy, fetchData]
  );

  const updateTender = useCallback(
    async (status: string, action:
      "SAVE" | "SUBMIT") => {
      try {
        let documentRequestId = 0;
        const tenderOriginalDocuments = tenderDataCopy.tenderDocuments?.map(
          (x) => {
            documentRequestId = documentRequestId - 1;
            return { ...x, requestId: documentRequestId };
          }
        );
        const tenderSaveDocuments = tenderData.tenderDocuments?.map((x) => {
          documentRequestId = documentRequestId - 1;
          return { ...x, requestId: documentRequestId };
        });
        const formData = new FormData();
        let docCount = 0;
        tenderSaveDocuments?.forEach((doc) => {
          console.log(
            doc.data,
            typeof doc.data,
            doc.data instanceof File,
            doc.data instanceof Blob
          );
          // const blob = new Blob([doc.data.arrayBuffer()], {
          //   type: "application/pdf",
          // });
          if (doc.data && !(doc.id !== undefined && doc.id !== null)) {
            formData.append(
              `tenderDocuments[${docCount}].requestId`,
              doc.requestId.toString()
            );

            formData.append(
              `tenderDocuments[${docCount}].document`,
              doc.data,
              doc.documentName
            ); // File/Blob object
            formData.append(
              `tenderDocuments[${docCount}].documentType`,
              doc.documentType
            );
            formData.append(
              `tenderDocuments[${docCount}].documentCategory`,
              doc.documentCategory
            );
            formData.append(
              `tenderDocuments[${docCount}].documentSubType`,
              doc.data,
              doc.documentSubType
            );
            docCount = docCount + 1;
          }
        });
        const copylatestTenderRevision =
          tenderDataCopy.tenderRevisions?.length > 0
            ? [
              tenderDataCopy.tenderRevisions.reduce(
                (max, obj) => (obj.version > max.version ? obj : max),
                tenderDataCopy.tenderRevisions[0]
              ),
            ]
            : [];
        const latestTenderRevision = [
          tenderData.tenderRevisions.reduce(
            (max, obj) => (obj.version > max.version ? obj : max),
            tenderData.tenderRevisions[0]
          ),
        ];
        let dataToSendTenderCopy: any = stripReadOnlyProperties({
          ...tenderDataCopy,
          shippingLocations: tenderDataCopy.shippingLocations,
          appliedBy:
            tenderDataCopy.applierType.toLowerCase() == "organization"
              ? "IPCA"
              : "STOCKIST",
          applierId:
            tenderDataCopy.applierType.toLowerCase() == "organization"
              ? null
              : tenderDataCopy.applierId,
          suppliedBy:
            tenderDataCopy.supplierType.toLowerCase() == "organization"
              ? "IPCA"
              : "STOCKIST",
          supplierId:
            tenderDataCopy.supplierType.toLowerCase() == "organization"
              ? null
              : tenderDataCopy.supplierId,
          // tenderFees: tenderDataCopy.tenderFees
          //   .filter((x) => x.status == "ACTV")
          //   .map((x) => {
          //     return {
          //       id: x.id,
          //       feesType: x.feesType,
          //       amount: x.amount,
          //       currency: x.currency,
          //       paidBy: x.paidBy,
          //       paymentMode: x.paymentMode,
          //       refundEligibility: x.refundEligibility,
          //       paymentDate: x.paymentDate,
          //       paymentDueDate: x.paymentDueDate,
          //       paymentRefundDate: x.paymentRefundDate,
          //       paymentStatus: x.paymentStatus,
          //       paymentRefundStatus: x.paymentRefundStatus,
          //       instructionNotes: x.instructionNotes,
          //       refundNotes: x.refundNotes,
          //       paymentTransactionId: x.paymentTransactionId,
          //       paymentReceiptId: x.paymentReceiptId,
          //       acknowledgementReceiptId: x.acknowledgementReceiptId,
          //       fundTransferConfirmationId: x.fundTransferConfirmationId,
          //     };
          //   }),
          tenderSupplyCondition: {
            ...tenderDataCopy.tenderSupplyCondition,
            eligibility: tenderDataCopy.tenderSupplyCondition.eligibility,
            applicableConditions:
              tenderDataCopy.tenderSupplyCondition.applicableConditions
                .filter((x) => x.status == "ACTV")
                .map((x) => {
                  return {
                    id: x.id,
                    type: x.type,
                    notes: x.notes,
                  };
                }),
          },
          tenderFees: tenderDataCopy.tenderFees
            .filter((x) => x.status == "ACTV")
            .map((x) => {
              //  console.log("paymentMode",tenderData.tenderFees.paymentMode)
              return {
                id: x.id,
                feesType: x.feesType,
                amount: x.amount,
                currency: x.currency,
                paidBy: x.paidBy,
                paymentMode: x.paymentMode,
                refundEligibility: x.refundEligibility,
                paymentOptions:x.paymentOptions,
                paymentDate: x.paymentDate,
                paymentDueDate: x.paymentDueDate,
                paymentRefundDate: x.paymentRefundDate,
                paymentStatus: x.paymentStatus,
                paymentRefundStatus: x.paymentRefundStatus,
                instructionNotes: x.instructionNotes,
                refundNotes: x.refundNotes,
                paymentTransactionId: x.paymentTransactionId,
                paymentReceiptId: x.paymentReceiptId,
                acknowledgementReceiptId: x.acknowledgementReceiptId,
                fundTransferConfirmationId: x.fundTransferConfirmationId,
              };
            }),

          tenderDocuments:
            tenderOriginalDocuments?.map((x) => {
              // const newDocs=new FormData();
              // newDocs.append("name",x.name);
              // newDocs.append("data",x.data as Blob);
              // newDocs.append("documentType",x.name);
              // newDocs.append("category",x.name);
              // const base64String = x.data ? await fileToBase64(x.data) : "";
              return {
                id: x.id,
                documentName: x.documentName,
                documentId: x.documentId,
                documentType: x.documentType,
                documentCategory: x.documentCategory,
                documentSubType: x.documentSubType,
              };
            }) || [],
          // tenderRevisions: copylatestTenderRevision,
          tenderRevisions: tenderDataCopy.tenderRevisions.map((x) => {
            if (x.id) return { id: x.id, tenderItems: x.tenderItems };
            return { tenderItems: x.tenderItems };
          }),
          // copylatestTenderRevision.map((x) => {
          //   if (x.id) return { id: x.id, tenderItems: x.tenderItems };
          //   return { tenderItems: x.tenderItems };
          // }),
          // comments: null,
        });
        delete dataToSendTenderCopy.applierType;
        delete dataToSendTenderCopy.supplierType;
        let dataToSendOriginalTender: any = stripReadOnlyProperties({
          ...tenderData,
          shippingLocations: tenderData.shippingLocations,
          appliedBy:
            tenderData.applierType.toLowerCase() == "organization"
              ? "IPCA"
              : "STOCKIST",
          applierId:
            tenderData.applierType.toLowerCase() == "organization"
              ? null
              : tenderData.applierId,
          suppliedBy:
            tenderData.supplierType.toLowerCase() == "organization"
              ? "IPCA"
              : "STOCKIST",
          supplierId:
            tenderData.supplierType.toLowerCase() == "organization"
              ? null
              : tenderData.supplierId,
          tenderFees: tenderData.tenderFees
            .filter((x) => x.status == "ACTV")
            .map((x) => {
              return {
                id: x.id,
                feesType: x.feesType,
                amount: x.amount,
                currency: x.currency,
                paidBy: x.paidBy,
                paymentMode: x.paymentMode,
                refundEligibility: x.refundEligibility,
                paymentOptions:x.paymentOptions,
                paymentDate: x.paymentDate,
                paymentDueDate: x.paymentDueDate,
                paymentRefundDate: x.paymentRefundDate,
                paymentStatus: x.paymentStatus,
                paymentRefundStatus: x.paymentRefundStatus,
                instructionNotes: x.instructionNotes,
                refundNotes: x.refundNotes,
                paymentTransactionId: x.paymentTransactionId,
                paymentReceiptId: x.paymentReceiptId,
                acknowledgementReceiptId: x.acknowledgementReceiptId,
                fundTransferConfirmationId: x.fundTransferConfirmationId,
              };
            }),
          tenderSupplyCondition: {
            ...tenderData.tenderSupplyCondition,
            eligibility: tenderData.tenderSupplyCondition.eligibility,

            applicableConditions:
              tenderData.tenderSupplyCondition.applicableConditions
                .filter((x) => x.status == "ACTV")
                .map((x) => {
                  return {
                    id: x.id,
                    type: x.type,
                    notes: x.notes,
                    // status: x.status,
                  };
                }),
          },
          tenderDocuments:
            tenderSaveDocuments?.map((x) => {
              // const newDocs=new FormData();
              // newDocs.append("name",x.name);
              // newDocs.append("data",x.data as Blob);
              // newDocs.append("documentType",x.name);
              // newDocs.append("category",x.name);
              // const base64String = x.data ? await fileToBase64(x.data) : "";
              return {

                id: x.id,
                documentName: x.documentName,
                documentId: x.documentId,
                documentType: x.documentType,
                documentCategory: x.documentCategory,
                documentSubType: x.documentSubType,
              };
            }) || [],
          // tenderRevisions: latestTenderRevision,
          tenderRevisions: tenderData.tenderRevisions.map((x) => {
            if (x.id) return { id: x.id, tenderItems: x.tenderItems };
            return { tenderItems: x.tenderItems };
          }),
          // ?.length > 0 &&
          // latestTenderRevision[0].tenderItems.length > 0
          //   ? latestTenderRevision.map((x) => {
          //       if (x.id) return { id: x.id, tenderItems: x.tenderItems };
          //       return { tenderItems: x.tenderItems };
          //     })
          //   : [],
          // comments: "t",
        });
        delete dataToSendOriginalTender.applierType;
        delete dataToSendOriginalTender.supplierType;
        let url = updateTenderUrl(tenderData.id, action);
        //  + "/" + tenderData.id;
        if (
          (status.toLowerCase() == DsStatus.AWRD.toLowerCase() ||
            status.toLowerCase() == DsStatus.PAWRD.toLowerCase() ||
            status.toLowerCase() == DsStatus.LOST.toLowerCase() ||
            status.toLowerCase() == DsStatus.CNCL.toLowerCase()) &&
          role === "MAKER"
        ) {
          // url = getTenderByTenderId + tenderData.id + "/contract";
          if (status.toLowerCase() == DsStatus.CNCL.toLowerCase())
            url = cancelTenderContractURl(tenderData.id, "SUBMIT");
          else url = updateContractUrl(tenderData.id, action);
          dataToSendTenderCopy = stripReadOnlyProperties({
            ...dataToSendTenderCopy.tenderContract,
            tenderDocuments: dataToSendTenderCopy.tenderDocuments,
            status: dataToSendTenderCopy.status,
            lastUpdatedBy: dataToSendTenderCopy.lastUpdatedBy,
          });
          dataToSendOriginalTender = stripReadOnlyProperties({
            ...dataToSendOriginalTender.tenderContract,
            contractStatusNotes:
              dataToSendOriginalTender.tenderContract.contractStatusNotes ||
                dataToSendOriginalTender.tenderContract.contractStatusNotes?.trim() !==
                ""
                ? dataToSendOriginalTender.tenderContract.contractStatusNotes
                : null,
            tenderDocuments: dataToSendOriginalTender.tenderDocuments,
            status: dataToSendOriginalTender.status,
            lastUpdatedBy: dataToSendOriginalTender.lastUpdatedBy,
          });
        }
        if (
          (status.toLowerCase() == DsStatus.AWRD.toLowerCase() ||
            // status.toLowerCase() == DsStatus.PAWRD.toLowerCase() ||
            status.toLowerCase() == DsStatus.LOST.toLowerCase() ||
            status.toLowerCase() == DsStatus.CNCL.toLowerCase()) &&
          role === "ACCOUNTANCE" || role === "FINANCE"
        ) {
          url = updatePaymentUrl(tenderData.id, action);
          dataToSendTenderCopy = stripReadOnlyProperties({
            // ...dataToSendTenderCopy.tenderFee,
            tenderFees: dataToSendTenderCopy.tenderFees,
            tenderDocuments: dataToSendTenderCopy.tenderDocuments,
            status: dataToSendTenderCopy.status,
            lastUpdatedBy: dataToSendTenderCopy.lastUpdatedBy,
          });
          dataToSendOriginalTender = stripReadOnlyProperties({
            // ...dataToSendOriginalTender.tenderContract,
            tenderFees: dataToSendOriginalTender.tenderFees,
            tenderDocuments: dataToSendOriginalTender.tenderDocuments,
            status: dataToSendOriginalTender.status,
            lastUpdatedBy: dataToSendOriginalTender.lastUpdatedBy,
          });
        }

        //user uploaded documents
        if (
          tenderData?.tenderDocuments &&
          tenderData.tenderDocuments.length > 0 &&
          (tenderData.tenderDocuments ?? []).filter((x) => x.id == undefined).length > 0 &&
          (tenderData?.tenderDocuments?.filter((x) => x.documentId == 0)?.length ?? 0) > 0
        ) {
          await fetch(saveDocumentUrl(tenderData.id ?? 0), {
            method: "POST",
            body: formData,
          }).then((result) => {
            result.json().then(async (docRes) => {
              if (docRes.code == 200) {
                dataToSendOriginalTender = stripReadOnlyProperties({
                  ...dataToSendOriginalTender,
                  tenderDocuments:
                    tenderSaveDocuments?.map((x) => {
                      // const newDocs=new FormData();
                      // newDocs.append("name",x.name);
                      // newDocs.append("data",x.data as Blob);
                      // newDocs.append("documentType",x.name);
                      // newDocs.append("category",x.name);
                      // const base64String = x.data ? await fileToBase64(x.data) : "";
                      return {
                        id: x.id,
                        documentName: x.documentName,
                        documentId: docRes.result[x.requestId] || x.documentId,
                        documentType: x.documentType,
                        documentCategory: x.documentCategory,
                        documentSubType: x.documentSubType,

                      };
                    }) || [],
                });

                const patchDocument = generatePatchDocument(
                  dataToSendTenderCopy,
                  dataToSendOriginalTender
                );

                await fetchData({
                  url: url,
                  method: "PATCH",
                  dataObject: patchDocument,
                }).then((res) => {
                  if (res.code === 200) {
                    setActionStatus({
                      notiMsg: `${res.message}`,
                      notiType: "success",
                      showNotification: true,
                    });
                    showToaster("create-order-toaster");
                    setTimeout(() => {
                      goBack();
                    }, closeTimeForTender);
                  } else {
                    setActionStatus({
                      notiMsg: `${res.message}.\r\n` + `${res.error.errorDetails.map(x => x.message).join("\r\n")}`,
                      notiType: "error",
                      showNotification: true,
                    });
                    showToaster("create-order-toaster");
                  }
                });
              }
            });
          });
        } else {
          const patchDocument = generatePatchDocument(
            dataToSendTenderCopy,
            dataToSendOriginalTender
          );

          await fetchData({
            url: url,
            method: "PATCH",
            dataObject: patchDocument,
          }).then((res) => {
            if (res.code === 200) {
              setActionStatus({
                notiMsg: `${res.message}`,
                notiType: "success",
                showNotification: true,
              });
              showToaster("create-order-toaster");
              setTimeout(() => {
                goBack();
              }, closeTimeForTender);
            } else {
              setActionStatus({
                notiMsg: `${res.message}.\r\n` + `${res.error.errorDetails.map(x => x.message).join("\r\n")}`,
                notiType: "error",
                showNotification: true,
              });
              showToaster("create-order-toaster");
            }
          });
        }
      } catch (error) {
        console.error("Error saving order:", error);
      }
    },
    [tenderData, tenderDataCopy, fetchData, generatePatchDocument]
  );

  const fetchAndSetOriginalTender = useCallback(
    async (tenderId: number, tenderStatus?: string) => {
      try {
        const response = await fetchData({
          url: getTenderByTenderId + tenderId,
          headers: {
            "Content-Type": "application/json",
            ...(tenderStatus &&
              tenderStatus != "newPricingVersion" && {
              "x-contract-status": `${tenderStatus}`,
            }),
          },
        });

        const tenderData = response.result;
        // console.log(response.result);
        if (
          tenderData.tenderRevisions.length == 0 ||
          tenderData.tenderRevisions == null
        )
          tenderData.tenderRevisions = [
            {
              version: 1,
              status: DsStatus.DRFT.toUpperCase(),
              tenderItems: [],
            },
          ];
        else
          tenderData.tenderRevisions = tenderData.tenderRevisions.map((rev) => {
            return {
              ...rev,
              tenderItems: rev.tenderItems.map((item) => {
                return {
                  ...item,
                  product: {
                    ...item.product,
                    dataSource: "saved",
                  },
                };
              }),
            };
          });
        // console.log("sv", tenderData);
        if (tenderStatus && tenderStatus != "newPricingVersion") {
          tenderData.tenders.status = tenderStatus;
          // }else{
          //   tenderData.tenders.status = tenderStatus;
        }
        else
          if (tenderStatus == "newPricingVersion")
            tenderData.tenders.status = DsStatus.DRFT.toUpperCase();


        tenderData.tenders.tenderDetails =
          tenderData.tenders.tenderDetailsReadOnly;
        delete tenderData.tenders.tenderDetailsReadOnly;
        // console.log("swgev", tenderData);

        const newTenderData: TenderData = {
          ...tenderData.tenders,
          tenderRevisions: tenderData.tenderRevisions,
          tenderFees: tenderData.tenderFees.map((fee) => ({
            ...fee,
            paymentReceiptId: fee.paymentRecieptId,
            status: "ACTV",
          })),
          tenderSupplyCondition: {
            ...tenderData.tenderSupplyCondition,
            applicableConditions:
              tenderData.tenderSupplyCondition.applicableConditions
                // ?.filter((x) => x.status == "ACTV")
                .map((ac) => ({
                  ...ac,
                  status: "ACTV",
                })),
          },
          tenderDocuments:
            tenderData.tenderDocuments?.map((x) => {
              // const newDocs=new FormData();
              // newDocs.append("name",x.name);
              // newDocs.append("data",x.data as Blob);
              // newDocs.append("documentType",x.name);
              // newDocs.append("category",x.name);
              // const base64String = x.data ? await fileToBase64(x.data) : "";
              return {
                id: x.id,
                documentName: x.documentName,
                documentId: x.documentId,

                documentType: x.documentType,
                documentCategory: x.documentCategory,
                documentSubType: x.documentSubType,
              };
            }) || [],
          tenderContract: tenderData.tenderContract, //Gaurav changed from {..tenderData.tenderContract}
        };
        // console.log("km", newTenderData);
        if (tenderStatus == "newPricingVersion") {
          const data = createTenderVersion(newTenderData);
          if (data) setTenderData(data);
          else setTenderData(newTenderData);
        } else {
          setTenderData(newTenderData);
        }
        setTenderDataCopy({
          ...newTenderData,
          tenderRevisions: newTenderData.tenderRevisions.filter(
            (x) => x.id != undefined
          ),
          lastUpdatedBy: -1,
        });
        return response;
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    },
    [fetchData]
  );

  const fetchAndSetPreviousTender = useCallback(
    async (tenderId: number) => {
      try {
        const response = await fetchData({
          url: getTenderByTenderId + tenderId,
        });
        const tenderData = response.result;
        tenderData.tenders.lastPurchaseDate = undefined;
        tenderData.tenders.submissionDate = undefined;
        tenderData.tenders.issueDate = undefined;
        tenderData.tenders.tenderNumber = undefined;
        // tenderData.tenderFees.amount=undefined;
        // delete tenderData.tenders.lastPurchaseDate

        console.log("tenderData.tenderFees.amount ", tenderData.feesType);
        if (
          tenderData.tenderRevisions.length == 0 ||
          tenderData.tenderRevisions == null
        )
          tenderData.tenderRevisions = [
            {
              version: 1,
              status: DsStatus.DRFT.toUpperCase(),
              tenderItems: [],
            },
          ];
        else
          tenderData.tenderRevisions = tenderData.tenderRevisions.map((rev) => {
            return {
              ...rev,
              tenderItems: rev.tenderItems.map((item) => {
                return {
                  ...item,
                  product: {
                    ...item.product,
                    dataSource: "saved",
                  },
                };
              }),
            };
          });
        console.log("saved data", tenderData);

        tenderData.tenders.tenderDetails =
          tenderData.tenders.tenderDetailsReadOnly;
        delete tenderData.tenders.tenderDetailsReadOnly;
        // delete tenderData.tenders.id;

        console.log("saveddatais ", tenderData);

        const newTenderData: TenderData = {
          ...tenderData.tenders,
          tenderRevisions: [
            {
              version: 1,
              status: DsStatus.DRFT.toUpperCase(),
              tenderItems: [],
            },
          ],
          tenderFees: tenderData.tenderFees.map((fee) => ({
            ...fee,
            paymentStatus: undefined,
            amount: undefined,
            paymentMode: undefined,
            paymentDueDate: undefined,
            paidBy: undefined,
            refundEligibility: undefined,
            paymentOptions:undefined,
            paymentDate: undefined,
            refundNotes: undefined,
            paymentRefundDate: undefined,
            instructionNotes: undefined,
            paymentTransactionId: undefined,
            paymentReceiptId: undefined,
            acknowledgmentReceiptId: undefined,
            fundTransferConfirmationId: undefined,
            status: "ACTV",
          })),
          tenderSupplyCondition: {
            ...tenderData.tenderSupplyCondition,
            applicableConditions:
              tenderData.tenderSupplyCondition.applicableConditions?.map(
                (ac) => ({
                  ...ac,
                  notes: undefined,
                  status: "ACTV",
                })
              ),
          },

          status: "Draft",
          lastUpdatedBy: 0,
          tenderContract: undefined,
          tenderDocuments: [],
        };
        setTenderData(newTenderData);

        return response;
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    },
    [fetchData]
  );
  const fetchMetaData = useCallback(async () => {
    await fetchData({
      url: getAllMetaData,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-tender-codes": JSON.stringify(metaDataTypes),
      },
    })
      .then((res) => {
        if (res.code === 200) {
          const result = res.result;

          const metaData = {
            tenderType: (result.tenderType || []).map(
              (item: { codeValue: string; codeDescription: string }) => ({
                value: item.codeValue,
                label: item.codeDescription,
              })
            ),
            submissionMode: (result.submissionMode || []).map(
              (item: { codeValue: string; codeDescription: string }) => ({
                value: item.codeValue,
                label: item.codeDescription,
              })
            ),
            rateContractType: (result.rateContractType || []).map(
              (item: { codeValue: string; codeDescription: string }) => ({
                value: item.codeValue,
                label: item.codeDescription,
              })
            ),

            supplyPoints: (result.supplyPoint || []).map(
              (item: { codeValue: string; codeDescription: string }) => ({
                value: item.codeValue,
                label: item.codeDescription,
              })
            ),
            testReportRequired: (result.testReportRequired || []).map(
              (item: { codeValue: string; codeDescription: string }) => ({
                value: item.codeValue,
                label: item.codeDescription,
              })
            ),
            eligibility: (result.eligibility || []).map(
              (item: { codeValue: string; codeDescription: string }) => ({
                value: item.codeValue,
                label: item.codeDescription,
              })
            ),
            feesType: (result.feesType || []).map(
              (item: { codeValue: string; codeDescription: string }) => ({
                value: item.codeValue,
                label: item.codeDescription,
              })
            ),
            tenderEmdPayment: (result.tenderEmdPayment || []).map(
              (item: { codeValue: string; codeDescription: string }) => ({
                value: item.codeValue,
                label: item.codeDescription,
              })
            ),
            tenderFeesPayment: (result.tenderFeesPayment || []).map(
              (item: { codeValue: string; codeDescription: string }) => ({
                value: item.codeValue,
                label: item.codeDescription,
              })
            ),
            tenderPsdPayment: (result.tenderPsdPayment || []).map(
              (item: { codeValue: string; codeDescription: string }) => ({
                value: item.codeValue,
                label: item.codeDescription,
              })
            ),
            applicableSupplyConditions: (
              result.tenderSupplyCondition || []
            ).map((item: { codeValue: string; codeDescription: string }) => ({
              value: item.codeValue,
              label: item.codeDescription,
            })),
            paymentModes: (result.paymentMode || []).map(
              (item: { codeValue: string; codeDescription: string }) => ({
                value: item.codeValue, // Optional: Lowercase if needed
                label: item.codeDescription,
              })
            ),
            emdPaymentMode: (result.emdPaymentMode || []).map(
              (item: { codeValue: string; codeDescription: string }) => ({
                value: item.codeValue,
                label: item.codeDescription,
              })
            ),

            tenderFeePaymentMode: (result.tenderFeePaymentMode || []).map(
              (item: { codeValue: string; codeDescription: string }) => ({
                value: item.codeValue,
                label: item.codeDescription,
              })
            ),
            psdPaymentMode: (result.psdPaymentMode || []).map(
              (item: { codeValue: string; codeDescription: string }) => ({
                value: item.codeValue,
                label: item.codeDescription,
              })
            ),
            refundEligibility: (result.refundEligibility || []).map(
              (item: { codeValue: string; codeDescription: string }) => ({
                value: item.codeValue,
                label: item.codeDescription,
              })
            ),
            tenderPartiallyAwardedJustification: (
              result.tenderPartiallyAwardedJustification || []
            ).map((item: { codeValue: string; codeDescription: string }) => ({
              value: item.codeValue,
              label: item.codeDescription,
            })),
            tenderLostJustification: (result.tenderLostJustification || []).map(
              (item: { codeValue: string; codeDescription: string }) => ({
                value: item.codeValue,
                label: item.codeDescription,
              })
            ),
            tenderAwardedJustification: (
              result.tenderAwardedJustification || []
            ).map((item: { codeValue: string; codeDescription: string }) => ({
              value: item.codeValue,
              label: item.codeDescription,
            })),
            tenderCancelledJustification: (
              result.tenderCancelledJustification || []
            ).map((item: { codeValue: string; codeDescription: string }) => ({
              value: item.codeValue,
              label: item.codeDescription,
            })),
            tenderApproveJustification: (
              result.justificationApproveType || []
            ).map((item: { codeValue: string; codeDescription: string }) => ({
              value: item.codeValue,
              label: item.codeDescription,
            })),
            tenderRejectJustification: (
              result.justificationRejectType || []
            ).map((item: { codeValue: string; codeDescription: string }) => ({
              value: item.codeValue,
              label: item.codeDescription,
            })),
            tenderReviseJustification: (
              result.justificationReviseType || []
            ).map((item: { codeValue: string; codeDescription: string }) => ({
              value: item.codeValue,
              label: item.codeDescription,
            })),
            tenderDocument: (result.tenderDocument || []).map(
              (item: { codeValue: string; codeDescription: string }) => ({
                value: item.codeValue,
                label: item.codeDescription,
              })
            ),
          };
          console.log("AAAAAAAAAAAAAAAAAA", metaData);
          setMetaData(metaData);
        } else {
          console.error(
            "Error fetching data: ",
            res.message || "Unknown error"
          );
        }
      })
      .catch((error) => {
        console.error("Fetch error: ", error);
      });
  }, [metaDataTypes]);
  // const fetchPreviousTenderData = useCallback(async (customerId: number) => {
  //   try {
  //     const res = await fetchData({
  //       url: "",
  //     });
  //     if ((res.code = 200)) {
  //     }
  //   } catch (e) {
  //     console.error("fetchPreviousTenderData", e);
  //   }
  // }, []);
  return (
    <TenderDataContext.Provider
      value={{
        tenderData,
        tenderDataCopy,
        metaData,
        actionStatus,
        updateTenderData,
        updateTenderFee,
        addTenderFee,
        removeTenderFeeByType,
        updateSupplyCondition,
        updateApplicableCondition,
        addNewTenderDocument,
        removeTenderDocument,
        // addDocumentToExistingType,
        addTenderProduct,
        removeTenderProduct,
        // createTenderVersion,
        updateTenderProduct,
        addApplicableCondition,
        removeApplicableCondition,
        setActionStatusValues,
        fetchAndSetOriginalTender,
        fetchAndSetPreviousTender,
        fetchMetaData,
        updateContractDetails,
        updateContractItems,
        saveTender,
        updateTender,
      }}
    >
      {children}
    </TenderDataContext.Provider>
  );
};
// Custom hook to access context
export const useTenderData = () => {
  const context = useContext(TenderDataContext);
  if (!context) {
    throw new Error("TenderDataContextProvider must be used");
  }
  return context;
};