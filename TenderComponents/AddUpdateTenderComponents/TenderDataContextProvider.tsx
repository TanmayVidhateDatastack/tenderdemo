import { showToaster } from "@/Elements/DsComponents/DsToaster/DsToaster";
import {
  closeTimeForTender,
  DsStatus,
  // DsStatus,
  dsStatus,
  getTenderByTenderId,
  saveTenderurl,
} from "@/Common/helpers/constant";
import fetchData from "@/Common/helpers/Method/fetchData";

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
  notiMsg: string = "";
  showNotification: boolean = false;
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
  ptrPercent?: number;
  supplierDiscount?: number;
  product: {
    type?: "read-only";
    name?: string;
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
  supplyPoint: string;
  consigneesCount: number;
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
  amount: number;
  currency: string;
  paidBy: string;
  paymentMode: string;
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
  id?: number;
  customerId: number;
  customerAddressId: number;
  tenderNumber: string;
  tenderType: string;
  issueDate: string;
  lastPurchaseDate: string;
  submissionDate: string;
  rateContractValidity: string;
  submissionMode: string;
  deliveryPeriod: number;
  extendedDeliveryPeriod: number;
  lateDeliveryPenalty: number;
  tenderURL: string;
  shippingLocations: number[];
  // appliedBy: string;
  applierId: number;
  applierType: string;
  // suppliedBy: string;
  supplierId: number;
  supplierType: string;
  stockistName: string;
  supplierDiscount: number;
  // createdBy: number;
  lastUpdatedBy: number;
  status: string;
  tenderDetails: {
    type: "read-only";
    customerName: string;
    customerAddressName: string;
    applierName: string;
    supplierName: string;
    lastUpdatedByName: string;
    lastUpdatedByEmpId: string;
    statusDescription: string;
  };
  // comments: string;
  tenderFees: tenderFee[];
  supplyConditions: tenderSupplyCondition;
  tenderRevisions: {
    id?: number;
    status?: string;
    version: number;
    tenderItems: TenderProduct[];
  }[];
  tenderContract?: TenderContract;
  documents?: TenderDocument[];
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
  createTenderVersion: () => void;
  updateTenderProduct: (
    version: number,
    id: number,
    key: keyof TenderProduct | `product.${keyof TenderProduct["product"]}`,
    value: string | number
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
  saveTender: (status: dsStatus) => Promise<void>;
  updateTender: (status: dsStatus) => Promise<void>;
  fetchAndSetOriginalTender: (tenderId: number) => Promise<void>;
}

const TenderDataContext = createContext<TenderDataContextType | undefined>(
  undefined
);

export const TenderDataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tenderData, setTenderData] = useState<TenderData>({
    customerId: 0,
    customerAddressId: 0,
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
    shippingLocations: [1, 2],
    applierType: "",
    applierId: 0,
    supplierType: "",
    supplierId: 0,
    stockistName: "",
    supplierDiscount: 0,
    lastUpdatedBy: 0,
    status: "AWARDED",
    tenderDetails: {
      type: "read-only",
      customerName: "",
      customerAddressName: "",
      applierName: "",
      supplierName: "",
      lastUpdatedByName: "",
      lastUpdatedByEmpId: "",
      statusDescription: "Draft",
    },
    tenderFees: [],
    supplyConditions: {
      supplyPoint: "",
      consigneesCount: 0,
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
    documents: [],
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
  const updateTenderData = (
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
  };
  // ✅ Update a specific tender fee field (Only if fee type exists)
  const updateTenderFee = (
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
  };
  // ✅ Add a new tender fee
  const addTenderFee = (type: string) => {
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
          amount: 0,
          currency: "",
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
  };
  // ✅ Remove tender fee by type
  const removeTenderFeeByType = (feeType: string) => {
    setTenderData((prev) => ({
      ...prev,
      tenderFees: prev.tenderFees.filter((fee) => fee.feesType !== feeType),
    }));
  };
  // ✅ Update supply condition fields
  const updateSupplyCondition = (
    key: keyof tenderSupplyCondition,
    value: string | number | string[] | Document[]
  ) => {
    setTenderData((prev) => ({
      ...prev,
      supplyConditions: {
        ...prev.supplyConditions,
        [key]: value,
      },
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
        ),
      },
    }));
  };
  // ✅ Add a document to the tender-level document list
  const addNewTenderDocument = (
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
      documents: [
        ...(prev.documents || []),
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
  };
  const removeTenderDocument = (
    documentType: string,
    documentCategory: string,
    documentName: string,
    documentSubCategory?: string
  ) => {
    setTenderData((prev) => ({
      ...prev,

      documents: [
        ...(prev.documents?.filter(
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
  };
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
  const addTenderProduct = (version: number, product: TenderProduct) => {
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
  };
  const removeTenderProduct = (
    version: number,
    id?: number,
    genericName?: string
  ) => {
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
  };
  const createTenderVersion = () => {
    const latestRevision = tenderData.tenderRevisions.reduce(
      (maxObj, currentObj) =>
        currentObj.version > maxObj.version ? currentObj : maxObj
    );
    setTenderData((prev) => ({
      ...prev,
      tenderRevisions: [
        ...prev.tenderRevisions,
        {
          version: latestRevision.version + 1,
          tenderItems: [
            ...latestRevision.tenderItems.map((x) => {
              return {
                requestedGenericName: x.requestedGenericName,
                requestedQuantity: x.requestedQuantity,
                requestedPackingSize: x.requestedPackingSize,
                productId: x.productId,
                product: x.product,
                proposedRate: x.proposedRate,
                ptrPercent: x.ptrPercent,
                lpr: x.lpr,
                competitorId: x.competitorId,
                supplierDiscount: x.supplierDiscount,
              } as TenderProduct;
            }),
          ],
        },
      ],
    }));
  };
  // ✅ Update a tender product field
  const updateTenderProduct = (
    version: number,
    id: number,
    key: keyof TenderProduct | `product.${keyof TenderProduct["product"]}`,
    value: string | number
  ) => {
    setTenderData((prev) => ({
      ...prev,
      tenderRevisions: prev.tenderRevisions.map((revision) =>
        revision.version === version
          ? {
              ...revision,
              tenderItems: revision.tenderItems.map((item) =>
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
            }
          : revision
      ),
    }));
  };
  const updateContractDetails = (
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
  };
  const updateContractItems = (
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
  };
  // ✅ Add a new applicable condition
  const addApplicableCondition = (type: string) => {
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
        prev.supplyConditions.applicableConditions.map((ac) => {
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
        supplyConditions: {
          ...prev.supplyConditions,
          applicableConditions: updatedTenderApplicableConditions,
        },
      };
    });
  };

  // ✅ Remove an applicable condition by type
  const removeApplicableCondition = (conditionType: string) => {
    setTenderData((prev) => ({
      ...prev,

      supplyConditions: {
        ...prev.supplyConditions,
        applicableConditions: prev.supplyConditions.applicableConditions.filter(
          (condition) => condition.type !== conditionType
        ),
      },
    }));
  };

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
  const saveTender = useCallback(
    async (status: dsStatus) => {
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
        tenderURL: tenderData.tenderURL,
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
        // stockistName: ,
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
        supplyConditions: {
          ...tenderData.supplyConditions,
          applicableConditions: JSON.stringify(
            tenderData.supplyConditions.applicableConditions
          ),
        },
        documents:
          tenderData.documents?.map((x) => {
            return {
              name: x.name,
              data: x.data,
              documentType: x.documentType,
              category: x.category,
            };
          }) || [],
      };
      const dataToSend = stripReadOnlyProperties({
        ...tenderSaveData,
        status: status.toUpperCase(),
        lastUpdatedBy: 3,
      });

      // console.log("sAVEEEE", dataToSend);
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
        const dataToSendTenderCopy = stripReadOnlyProperties({
          ...tenderDataCopy,
          supplyConditions: {
            ...tenderDataCopy.supplyConditions,
            applicableConditions: JSON.stringify(
              tenderDataCopy.supplyConditions.applicableConditions
            ),
          },
        });
        const dataToSendOriginalTender = stripReadOnlyProperties({
          ...tenderData,
          supplyConditions: {
            ...tenderData.supplyConditions,
            applicableConditions: JSON.stringify(
              tenderData.supplyConditions.applicableConditions
            ),
          },
        });
        const patchDocument = generatePatchDocument(
          dataToSendTenderCopy,
          dataToSendOriginalTender
        );
        let url = saveTenderurl;
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
    [tenderData, tenderDataCopy, fetchData, generatePatchDocument]
  );

  const fetchAndSetOriginalTender = useCallback(
    async (tenderId: number) => {
      try {
        const response = await fetchData({
          url: getTenderByTenderId + tenderId,
        });
        const tenderData = response.result;
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
        tenderData.tenders.tenderDetails =
          tenderData.tenders.tenderDetailsReadOnly;
        delete tenderData.tenders.tenderDetailsReadOnly;
        const newTenderData: TenderData = {
          ...tenderData.tenders,
          tenderRevisions:tenderData.tenderRevisions,
          tenderFees: tenderData.tenderFees.map((fee) => ({
            ...fee,
            status: "ACTV",
          })),
          supplyConditions: {
            ...tenderData.supplyCondition,
            applicableConditions:
              tenderData.supplyCondition.applicableConditions?.map((ac) => ({
                ...ac,
                status: "ACTV",
              })),
          },
        };
        setTenderData(newTenderData);
        setTenderDataCopy({
          ...newTenderData,
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
        removeTenderDocument,
        // addDocumentToExistingType,
        addTenderProduct,
        removeTenderProduct,
        createTenderVersion,
        updateTenderProduct,
        addApplicableCondition,
        removeApplicableCondition,
        setActionStatusValues,
        fetchAndSetOriginalTender,
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

// ✅ Custom hook to access context
export const useTenderData = () => {
  const context = useContext(TenderDataContext);
  if (!context) {
    throw new Error("useTenderData must be used within a TenderDataProvider");
  }
  return context;
};
