import { showToaster } from "@/Elements/DsComponents/DsToaster/DsToaster";
import {
  closeTimeForTender,
  DsStatus,
  // DsStatus,
  dsStatus,
  getTenderByTenderId,
  saveTenderurl,
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

class ActionStatus {
  notiType: "success" | "bonus" | "info" | "error" | "cross" = "success";
  notiMsg: string | React.ReactNode = "";
  showNotification: boolean = false;
  isOkayButtonVisible?: boolean = false;
}
export type Document = {
  name: string;
  document: File;
};
export type TenderDocument = {
  id?: number;
  documentType: string;
  category: string;
  subCategory?: string;
  name: string;
  documentPath?: string;
  data?: File;
  documentStorageId?: number;
  // documents: Document[];
};

export type TenderProduct = {
  id?: number;
  requestedGenericName?: string;
  requestedQuantity?: number;
  requestedPackingSize?: string;
  productId?: number;
  lpr?: number;
  competitorId?: number;
  proposedRate?: number;
  ptrPercentage?: number;
  stockistDiscountValue?: number;
  product: {
    type?: "read-only";
    productName?: string;
    productPackingSize?: string;
    mrp?: string | number;
    ptr?: string | number;
    directCost?: string | number;
    lqr?: number;
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
  consigneesCount: number |null;
  testReportRequired: string;
  eligibility: string[];
  applicableConditions: applicableSupplyConditions[];
};
export type applicableSupplyConditions = {
  type: string | number;
  notes: string;
  // documents: Document[];
  status?: "ACTV" | "INAC";
};
export type tenderFee = {
  id?: number;
  feesType: string | number;
  amount: number |null;
  currency: string;
  paidBy: string;
  paymentMode: string;
  refundEligibility:string;
  paymentDueDate: string;
  instructionNotes: string;
  paymentStatus?: string;
  paymentDate?: string;
  paymentTransactionId?: string;
  paymentReceiptId?: string;
  acknowledgmentReceiptId?: string;
  fundTransferConfirmationId?: string;
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
  awardedTo?: number;
  awardedRate?: number;
};
export type TenderContract = {
  contractStatus?: string;
  contractJustification?: string;
  contractStatusNotes?: string;
  tenderRevisions?: {
    id: number;
    tenderItems?: ContractItems[];
  };
};
export type TenderData = {
  // tenderId: string;
  id?: number;
  customerId: number;
  customerAddressId: number|undefined;
  tenderNumber: string;
  tenderType: string;
  issueDate: string|undefined;
  lastPurchaseDate: string|undefined;
  submissionDate: string|undefined;
  rateContractValidity: string;
  submissionMode: string;
  deliveryPeriod: number | null;
  extendedDeliveryPeriod: number | null;
  lateDeliveryPenalty: number |null;
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
  tenderSupplyConditions: tenderSupplyCondition[];
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
  files: File[],
  typeDocuments: TenderDocument[],
  removeDocumentFunction: (
    documentType: string,
    documentCategory: string,
    documentName: string,
    documentSubCategory?: string
  ) => void,
  addDocumentFunction: (
    documentType: string,
    documentCategory: string,
    document: {
      name: string;
      document: File;  
    },
    documentSubCategory?: string
  ) => void,
  type: string,
  category: string,
  subCategory?: string
) {
  //If all current files array is empty (all documents are removed) then simply empty/remove the tenderDocument array (with their corresponding document_type, category and sub-category).
  if (files.length == 0) {
    typeDocuments?.forEach((x) => {
      removeDocumentFunction(x.documentType, x.category, x.name, x.subCategory);
    });
    return;
  }

  //When first time document is getting uploaded the tenderDocument is empty then simply add the document in TenderDocument Array
  if (typeDocuments?.length == 0) {
    files.forEach((x) => {
      addDocumentFunction(
        type,
        category,
        {
          name: x.name,
          document: x,
        },
        subCategory
      );
    });
    return;
  }

  // For add document --> document is not in tenderDocument array and it is present in latest files array
  files?.forEach((x) => {
    if (!typeDocuments?.find((f) => f.name == x.name)) {
      addDocumentFunction(
        type,
        category,
        {
          name: x.name,
          document: x,
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
    if (!files.find((f) => f.name == x.name)) {
      removeDocumentFunction(x.documentType, x.category, x.name, x.subCategory);
    }
  });
}
interface TenderDataContextType {
  tenderData: TenderData;
  tenderDataCopy: TenderData;
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
    value: string | number | string[] | Document[]
  ) => void;
  addNewTenderDocument: (
    documentType: string,
    documentCategory: string,
    document: Document,
    documentSubCategory?: string
  ) => void;
  removeTenderDocument: (
    documentType: string,
    documentCategory: string,
    documentName: string,
    documentSubCategory?: string
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
  updateTender: (status: string) => Promise<void>;
  fetchAndSetOriginalTender: (
    tenderId: number,
    tenderStatus?: string
  ) => Promise<void>;
  fetchAndSetPreviousTender: (tenderId: number) => Promise<void>;
}

const TenderDataContext = createContext<TenderDataContextType | undefined>(
  undefined
);

export const TenderDataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const reader = new FileReader();
  const [tenderData, setTenderData] = useState<TenderData>({
    customerId: 0,
    customerAddressId: undefined,
    tenderNumber: "",
    tenderType: "",
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
    tenderSupplyConditions: [
      {
        supplyPoint: "",
        consigneesCount: null,
        testReportRequired: "",
        eligibility: [],
        applicableConditions: [],
      },
    ],
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
      tenderRevisions: {
        id: 0,
        tenderItems: [
          {
            awardedQuantity: 1, 
            awardedRate: 2,
            awardedTo: 1,
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
    [tenderData, tenderDataCopy, setTenderData]
  );
  // ✅ Update a specific tender fee field (Only if fee type exists)
  const updateTenderFee = useCallback(
    (
      feeType: string,
      key: keyof tenderFee,
      value: Document[] | string | number
    ) => {
      setTenderData((prev) => ({
        ...prev,
        tenderFees: prev.tenderFees.map((fee) =>
          fee.feesType === feeType ? { ...fee, [key]: value } : fee
        ),
      }));
    },
    [tenderData, tenderDataCopy, setTenderData]
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
          refundEligibility:"",
          currency: "INR",
          paidBy: "",
          paymentMode: "",
          paymentDueDate: "",
          instructionNotes: "",
          status: active,
        });
      }

        return {
          ...prev,
          tenderFees: updatedTenderFees,
        };
      });
    },
    [tenderData, tenderDataCopy, setTenderData]
  );

  // ✅ Remove tender fee by type
  const removeTenderFeeByType = useCallback(
    (feeType: string) => {
      setTenderData((prev) => ({
        ...prev,
        tenderFees: prev.tenderFees.filter((fee) => fee.feesType !== feeType),
      }));
    },
    [tenderData, tenderDataCopy, setTenderData]
  );

  // ✅ Update supply condition fields
  const updateSupplyCondition = useCallback(
    (
      key: keyof tenderSupplyCondition,
      value: string | number | string[] | Document[]
    ) => {
      setTenderData((prev) => ({
        ...prev,
        tenderSupplyConditions: [
          {
            ...prev.tenderSupplyConditions[0],
            [key]: value,
          },
        ],
      }));
    },
    [tenderData, tenderDataCopy, setTenderData]
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
        tenderSupplyConditions: [
          {
            ...prev.tenderSupplyConditions[0],
            applicableConditions:
              prev.tenderSupplyConditions[0].applicableConditions.map(
                (condition) =>
                  condition.type === conditionType
                    ? { ...condition, [key]: value }
                    : condition
              ),
          },
        ],
      }));
    },
    [tenderData, tenderDataCopy, setTenderData]
  );

  // ✅ Add a document to the tender-level document list
  const addNewTenderDocument = useCallback(
    (
      documentType: string,
      documentCategory: string,
      document?: Document,
      documentSubCategory?: string,
      documentName?: string,
      documentStorageId?: number,
      documentPath?: string
    ) => {
      setTenderData((prev) => ({
        ...prev,
        tenderDocuments: [
          ...(prev.tenderDocuments || []),
          {
            documentType: documentType,
            category: documentCategory,
            subCategory: documentSubCategory,
            name: document?.name || documentName || "",
            documentPath: documentPath || "",
            documentStorageId: documentStorageId || 0,
            data: document?.document || undefined,
          },
        ],
      }));
    },
    [tenderData, tenderDataCopy, setTenderData]
  );

  const removeTenderDocument = useCallback(
    (
      documentType: string,
      documentCategory: string,
      documentName: string,
      documentSubCategory?: string
    ) => {
      setTenderData((prev) => ({
        ...prev,

        tenderDocuments: [
          ...(prev.tenderDocuments?.filter(
            (document) =>
              !(
                document.name == documentName &&
                document.documentType == documentType &&
                document.category == documentCategory &&
                document.subCategory == documentSubCategory
              )
          ) || []),
        ],
      }));
    },
    [tenderData, tenderDataCopy, setTenderData]
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
    [tenderData, tenderDataCopy, setTenderData]
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
    [tenderData, tenderDataCopy, setTenderData]
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
                lpr: x.lpr,
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
    [tenderData, tenderDataCopy, setTenderData]
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
  const updateTenderProduct = useCallback(
    (
      version: number,
      key: keyof TenderProduct | `product.${keyof TenderProduct["product"]}`,
      value: string | number,
      id?: number,
      productId?: number,
      requestedGenericName?: string
    ) => {
      setTenderData((prev) => ({
        ...prev,
        tenderRevisions: prev.tenderRevisions.map((revision) =>
          revision.version === version
            ? {
                ...revision,
                tenderItems: revision.tenderItems.map((item) => {
                  const obj =
                    (id && item.id === id) ||
                    (productId && item.productId === productId) ||
                    (requestedGenericName &&
                      item.requestedGenericName === requestedGenericName)
                      ? key.startsWith("product.")
                        ? {
                            ...item,
                            product: {
                              ...item.product,
                              [key.split(".")[1]]: value, // Update the nested product field
                            },
                          }
                        : { ...item, [key]: value } // Update the top-level field
                      : item;
                  return obj;
                }),
              }
            : revision
        ),
      }));
    },
    [tenderData, tenderDataCopy, setTenderData]
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
    [tenderData, tenderDataCopy, setTenderData]
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
          tenderRevisions: {
            id: prev.tenderContract?.tenderRevisions?.id || 0,
            tenderItems: prev.tenderContract?.tenderRevisions?.tenderItems?.map(
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
        },
      }));
    },
    [tenderData, tenderDataCopy, setTenderData]
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
          prev.tenderSupplyConditions[0].applicableConditions.map((ac) => {
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
          updatedTenderApplicableConditions.push({
            type,
            status: active,
            notes: "",
          });
        }
        return {
          ...prev,
          tenderSupplyConditions: {
            ...prev.tenderSupplyConditions,
            applicableConditions: updatedTenderApplicableConditions,
          },
        };
      });
    },
    [tenderData, tenderDataCopy, setTenderData]
  );

  // ✅ Remove an applicable condition by type
  const removeApplicableCondition = useCallback(
    (conditionType: string) => {
      setTenderData((prev) => ({
        ...prev,

        tenderSupplyConditions: {
          ...prev.tenderSupplyConditions,
          applicableConditions:
            prev.tenderSupplyConditions[0].applicableConditions.filter(
              (condition) => condition.type !== conditionType
            ),
        },
      }));
    },
    [tenderData, tenderDataCopy, setTenderData]
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

  const saveTender = useCallback(
    async (status: string) => {
      if (!tenderData) return;
      const tenderSaveData = {
        customerId: tenderData.customerId,
        customerAddressId: tenderData.customerAddressId,
        tenderNumber: tenderData.tenderNumber,
        tenderType: tenderData.tenderType,
        issueDate: tenderData.issueDate,
        lastPurchaseDate: tenderData.lastPurchaseDate,
        submissionDate: tenderData.submissionDate,
        rateContractValidity: tenderData.rateContractValidity,
        submissionMode: tenderData.submissionMode,
        deliveryPeriod: tenderData.deliveryPeriod,
        extendedDeliveryPeriod: tenderData.extendedDeliveryPeriod,
        lateDeliveryPenalty: tenderData.lateDeliveryPenalty,
        tenderUrl: tenderData.tenderUrl,
        shippingLocations: tenderData.shippingLocations.join(","),
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
              paymentDueDate: x.paymentDueDate,
              instructionNotes: x.instructionNotes,
            };
          }),  
        tenderSupplyConditions: [
          {
            ...tenderData.tenderSupplyConditions[0],
            eligibility:
              tenderData.tenderSupplyConditions[0].eligibility.join(","),
            applicableConditions: JSON.stringify(
              tenderData.tenderSupplyConditions[0].applicableConditions
            ),
          },
        ],
        tenderDocuments:
          tenderData.tenderDocuments?.map(async (x) => {
            const base64String = x.data ? await fileToBase64(x.data) : "";
            return {
              name: x.name,
              data: x.data,
              documentType: x.documentType,
              category: x.category,
            };
          }) || [],
        comments: null,
      };
      delete tenderSaveData.tenderSupplyConditions[0].id;
      const dataToSend = stripReadOnlyProperties({
        ...tenderSaveData,
        status: status.toUpperCase(),
        lastUpdatedBy: 3,
      });
 
      console.log("sAVEEEE", dataToSend); 
      try { 
        await fetchData({ 
          url: saveTenderurl,
          method: "POST",
          dataObject: dataToSend, 
        }).then((res) => {
          if (res.code === 200) { 
            setActionStatus({ 
              notiMsg: "Tender Created Successfully",
              notiType: "success", 
              showNotification: true, 
            }); 
            showToaster("create-order-toaster"); 
            setTimeout(() => { 
              goBack();
            }, closeTimeForTender);
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
    [tenderData, tenderDataCopy, fetchData]
  );

  const updateTender = useCallback(
    async (status: string) => {
      try {
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
        const dataToSendTenderCopy = stripReadOnlyProperties({
          ...tenderDataCopy,
          shippingLocations: tenderDataCopy.shippingLocations.join(","),
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
          tenderSupplyConditions: [
            {
              ...tenderDataCopy.tenderSupplyConditions[0],
              eligibility:
                tenderDataCopy.tenderSupplyConditions[0].eligibility.join(","),
              applicableConditions: JSON.stringify(
                tenderDataCopy.tenderSupplyConditions[0].applicableConditions
              ),
            },
          ],
          // tenderRevisions: copylatestTenderRevision,
          tenderRevisions: copylatestTenderRevision.map((x) => {
            if (x.id) return { id: x.id, tenderItems: x.tenderItems };
            return { tenderItems: x.tenderItems };
          }),
        });
        delete dataToSendTenderCopy.applierType;
        delete dataToSendTenderCopy.supplierType;
        const dataToSendOriginalTender = stripReadOnlyProperties({
          ...tenderData,
          shippingLocations: tenderData.shippingLocations.join(","),
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
          tenderSupplyConditions: [
            {
              ...tenderData.tenderSupplyConditions[0],
              eligibility:
                tenderData.tenderSupplyConditions[0].eligibility.join(","),

              applicableConditions: JSON.stringify(
                tenderData.tenderSupplyConditions[0].applicableConditions
              ),
            },
          ],
          // tenderRevisions: latestTenderRevision,
          tenderRevisions: latestTenderRevision.map((x) => {
            if (x.id) return { id: x.id, tenderItems: x.tenderItems };
            return { tenderItems: x.tenderItems };
          }),
        });
        delete dataToSendOriginalTender.applierType;
        delete dataToSendOriginalTender.supplierType;

        const patchDocument = generatePatchDocument(
          dataToSendTenderCopy,
          dataToSendOriginalTender
        );
        let url = saveTenderurl + "/" + tenderData.id;
        if (
          status.toLowerCase() == DsStatus.AWRD ||
          status == DsStatus.PAWRD ||
          status == DsStatus.LOST ||
          status == DsStatus.CNCL
        )
          url = getTenderByTenderId + tenderData.id + "/contract";
        await fetchData({
          url: url,
          method: "PATCH",
          dataObject: patchDocument,
        }).then((res) => {
          if (res.code === 200) {
            setActionStatus({
              notiMsg: "Tender Updated Successfully",
              notiType: "success",
              showNotification: true,
            });
            showToaster("create-order-toaster");
            setTimeout(() => {
              goBack();
            }, closeTimeForTender);
          } else {
            setActionStatus({
              notiMsg: "Tender could not be updated",
              notiType: "error",
              showNotification: true,
            });
            showToaster("create-order-toaster");
          }
        });
      } catch (error) {
        console.error("Error saving order:", error);
      }
    },

    // async(status:string)=>{
    //   const obj1={
    //     abc:"abc",
    //     mno:{
    //       abc1:"abc",
    //     },
    //     xyz:[
    //       {
    //         id:1,
    //         abcx:"abc",
    //         mnox:{
    //           abc1x:"abc",
    //         },
    //         yz:[
    //           {
    //             id:2,
    //             abcyz:"abc",
    //             mnozy:{
    //               abc1yz:"abc",
    //             },
    //           },
    //         ],
    //         label:[
    //           {
    //             id:1,
    //             l1:"abc",
    //             l2:"xtyz",
    //           }
    //         ]
    //       }
    //     ]
    //   }
    //   const obj2={
    //     abc:"abc2",
    //     mno:{
    //       abc1:"abc4",
    //     },
    //     xyz:[
    //       {
    //         id:1,
    //         abcx:"abc5",
    //         mnox:{
    //           abc1x:"abc7",
    //         },
    //         yz:[
    //           {
    //             abcyz:"abc0",
    //             mnozy:{
    //               abc1yz:"abc0",
    //             },
    //             laible:[
    //               {
    //               h1:"rest",
    //               h2:"t",
    //               }
    //             ]
    //           },

    //         ],
    //         label:[
    //           {
    //             id:1,
    //             l1:"sky",
    //             l2:"pat",
    //           }
    //         ]
    //       },
    //       {
    //         abcx:"abc",
    //         mnox:{
    //           abc1x:"abc",
    //         },
    //         yz:[
    //           {
    //             abcyz:"abc",
    //             mnozy:{
    //               abc1yz:"abc",
    //             },
    //           },
    //         ],
    //         label:[
    //           {
    //             l1:"ab",
    //             l2:"xt",
    //           }
    //         ]
    //       }
    //     ]
    //   }
    //   const patchDoc=generatePatchDocument(obj1,obj2);
    //   console.log("patch",patchDoc);
    // },
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
                "x-contract-status": `{"tenderStatus":"${tenderStatus}"}`,
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
        if (tenderStatus) {
          tenderData.tenders.status = tenderStatus;
        }

        tenderData.tenders.tenderDetails =
          tenderData.tenders.tenderDetailsReadOnly;
        delete tenderData.tenders.tenderDetailsReadOnly;
        // console.log("swgev", tenderData);

        const newTenderData: TenderData = {
          ...tenderData.tenders,
          tenderRevisions: tenderData.tenderRevisions,
          tenderFees: tenderData.tenderFees.map((fee) => ({
            ...fee,
            status: "ACTV",
          })),
          tenderSupplyConditions: [
            {
              ...tenderData.tenderSupplyConditions[0],
              applicableConditions:
                tenderData.tenderSupplyConditions[0].applicableConditions?.map(
                  (ac) => ({
                    ...ac,
                    status: "ACTV",
                  })
                ),
            },
          ],
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
          status: "",
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
        console.log(response.result);
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
        console.log("sv", tenderData);
 
        tenderData.tenders.tenderDetails =
          tenderData.tenders.tenderDetailsReadOnly;
        delete tenderData.tenders.tenderDetailsReadOnly;
        // delete tenderData.tenders.id;
 
        console.log("swgev", tenderData);
 
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
            paymentDate: undefined,
            paymentTransactionId: undefined,
            paymentReceiptId: undefined,
            acknowledgmentReceiptId: undefined,
            fundTransferConfirmationId: undefined,
            status: "ACTV",
          })),
          tenderSupplyConditions: [
            {
              ...tenderData.tenderSupplyConditions[0],
              applicableConditions:
                tenderData.tenderSupplyConditions[0].applicableConditions?.map(
                  (ac) => ({
                    ...ac,
                    status: "ACTV",
                  })
                ),
            },
          ],
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
