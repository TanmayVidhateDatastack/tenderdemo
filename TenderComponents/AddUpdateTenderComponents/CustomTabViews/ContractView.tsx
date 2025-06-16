"use client";
import DsCsvUpload from "@/Elements/DsComponents/DsButtons/dsCsvUpload";
import TextArea from "@/Elements/DsComponents/DsInputs/dsTextArea";
import DsSingleSelect from "@/Elements/DsComponents/dsSelect/dsSingleSelect";

import DsInfoDisplay from "@/Elements/ERPComponents/DsInfoDisplay/DsInfoDisplay";
import {
  ContractItems,
  updateDocuments,
  useTenderData,
} from "../TenderDataContextProvider";
import {
  datalistOptions,
  DsSelectOption,
  DsTableRow,
  tableData,
} from "@/Common/helpers/types";
import styles from "./ContractView.module.css";
import { useCallback, useEffect, useMemo, useState } from "react";
import fetchData from "@/Common/helpers/Method/fetchData";
import DsTextField from "@/Elements/DsComponents/DsInputs/dsTextField";
import DsSearchComponent from "@/Elements/DsComponents/DsSearch/searchComponent";
import AwardedToSearch from "./AwardedToSearch";
import IconFactory from "@/Elements/IconComponent";
import TableComponent from "@/Elements/DsComponents/DsTablecomponent/DsTableComponent";
import { TableProvider } from "@/Elements/DsComponents/NewDsTable/TableProvider";
import Table from "@/Elements/DsComponents/NewDsTable/Table";
import { TableColumn } from "@/Elements/DsComponents/NewDsTable/types";
import { v4 as uuidv4 } from "uuid";
import { downloadDocumentUrl } from "@/Common/helpers/constant";

export interface ContractViewProps {
  status: "AWARDED" | "PARTIALLY_AWARDED" | "LOST" | "CANCELLED";
  //   contractRevision: { id: number; contractItems: ContractItems };
  //   lastUpdatedBy: {
  //     id: string;
  //     name: string;
  //   };
}
export const ContractStatuses = {
  AWARDED: "Awarded",
  PARTIALLY_AWARDED: "Partially Awarded",
  LOST: "Lost",
  CANCELLED: "Cancellation",
};
export type ContractItemsWithRowId = ContractItems & { rowId: number | string };
type ContractProductKey =
  | keyof ContractItems
  | `product.${keyof ContractItems["product"] & string}`;
const ContractView: React.FC<ContractViewProps> = ({
  status,
  //   contractRevision,
  //   lastUpdatedBy,
}) => {
  const {
    tenderDataCopy,
    tenderData,
    updateContractDetails,
    updateContractItems,
    removeTenderDocument,
    addNewTenderDocument,
    metaData,
  } = useTenderData();
  const [justificationOptions, setJustificationOptions] = useState<
    DsSelectOption[]
  >([]);

  const [selectedJustification, setSlectedJustification] =
    useState<DsSelectOption>({
      value: tenderData.tenderContract?.contractJustification || "",
      label: tenderData.tenderContract?.contractJustification || "",
    });

  useEffect(() => {
    // fetchJustificationOptions(status);
    if (status == "AWARDED")
      setJustificationOptions(metaData.tenderAwardedJustification);
    else if (status == "PARTIALLY_AWARDED")
      setJustificationOptions(metaData.tenderPartiallyAwardedJustification);
    else if (status == "CANCELLED")
      setJustificationOptions(metaData.tenderCancelledJustification);
    else if (status == "LOST")
      setJustificationOptions(metaData.tenderLostJustification);
  }, [status, metaData, tenderData.id, tenderDataCopy.id]);

  const [contractProducts, setContractProducts] = useState<
    ContractItemsWithRowId[]
  >([]);
  useEffect(() => {
    // console.log(tenderData.tenderContract?.tenderRevisions);
    // addTableData(
    //   tenderData.tenderContract?.tenderRevisions?.[0].tenderItems || []
    // );
    if (status != "CANCELLED")
      setContractProducts(
        (tenderData.tenderContract?.tenderRevisions?.[0].tenderItems || []).map(
          (row) => ({
            ...row,
            rowId: uuidv4(),
            
          })
        )
      );
  }, [tenderData.tenderContract?.tenderRevisions]);
  const handleUpdateCell = useCallback(
    (rowId, changesOrColumnId, value?) => {
      setContractProducts((prev) => {
        const updatedProducts = prev.map((row) => {
          if (row.rowId !== rowId) return row;
          if (typeof changesOrColumnId === "object") {
            // Batch update (object of changes)
            return { ...row, ...changesOrColumnId };
          } else {
            // Single field update
            return { ...row, [changesOrColumnId]: value };
          }
        });
        const rowIndex = updatedProducts.findIndex(
          (row) => row.rowId === rowId
        );
        const product = updatedProducts[rowIndex];
        if (product) {
          if (typeof changesOrColumnId === "object") {
            Object.entries(changesOrColumnId).forEach(([col, val]) => {
              return updateContractItems(
                col as ContractProductKey,
                product.id,
                val as string | number
              );
            });
          } else {
            updateContractItems(changesOrColumnId, product.id, value);
          }
        }
        return updatedProducts;
      });
    },
    [tenderData]
  );
  const columns: TableColumn<ContractItemsWithRowId>[] = useMemo(
    () => [
      {
        id: "requestedGenericName",
        header: "Generic Name",
        accessor: (row) => row.product.requestedGenericName,
        editable: false,
        className: styles["cell-generic-name"],
      },
      {
        id: "productName",
        header: "Product Name",
        accessor: (row) => row.product.productName,
        editable: false,
        className: styles["cell-product-name"],
      },
      {
        id: "packingSize",
        header: "Packing Size",
        accessor: (row) => row.product.requestedPackingSize,
        editable: false,
        className: styles["cell-packing-size"],
      },
      {
        id: "awardedQuantity",
        header: "Awarded Quantity",
        accessor: (row) => row.awardedQuantity,
        editorComponent: DsTextField,
        editorProps: { inputType: "positiveInteger", autofocus: true },
        editable: true,
        autoFocus: true,
        align: "right",
        className: styles["cell-award-quantity"],
      },
      {
        id: "awardedTo",
        header: "Awarded To",
        accessor: (row) => row.product.awardedToName,
        // editable: true,
        cellRenderer: (value, row, rowIndex) => (
          <AwardedToSearch
            awardedTo={{
              id: row.awardedTo || 0,
              name: row.product.awardedToName,
            }}
            index={rowIndex}
            setAwardedTo={(option) => {
              if (row.id && option.id && option.value) {
                // if (cellEdit)
                handleUpdateCell(row.rowId, "awardedTo", Number(option.id));
                handleUpdateCell(
                  row.rowId,
                  "product.awardedToName",
                  option.value
                );
                // cellEdit(row.rowId, {
                //   awardedTo: Number(option.id),
                //   "product.awardedToName": option.value,
                // });
              }
            }}
            // onBlur={() => {
            //   if (onCommit) onCommit();
            // }}
            // autofocus={true}
          />
        ),
        className: styles["cell-awarded-to"],
      },
      {
        id: "awardedRate",
        header: "Awarded At Rate",
        accessor: (row) => row.awardedRate,
        editorComponent: DsTextField,
        editorProps: { inputType: "positiveInteger", autofocus: true },
        editable: true,
        autoFocus: true,
        align: "right",
        className: styles["cell-award-rate"],
      },
    ],
    []
  );
  return (
    <div className={styles.ContractPage}>
      <div className={styles.justification}>
        <div className={styles.title}>
          Tender{status ? ` ${ContractStatuses[status]} ` : " "}
          Justification{" "}
        </div>
        <DsSingleSelect
          id={"contractJustification"}
          options={justificationOptions || []}
          disable={tenderDataCopy.tenderContract?.contractStatus == "SUBMITTED"}
          selectedOption={selectedJustification}
          setSelectOption={(option) => {
            setSlectedJustification(option);
            if (typeof option.value == "string")
              updateContractDetails("contractJustification", option.value);
          }}
        />
      </div>
      <div className={styles.notes}>
        {status == "PARTIALLY_AWARDED" || status == "AWARDED" ? (
          <div className={styles.title}>Supporting Notes/Delivery Details</div>
        ) : (
          <div className={styles.title}>Supporting Notes</div>
        )}
        <TextArea
          disable={tenderDataCopy.tenderContract?.contractStatus == "SUBMITTED"}
          onBlur={(e) => {
            updateContractDetails(
              "contractStatusNotes",
              (e.target as HTMLTextAreaElement).value
            );
          }}
          minRows={status == "CANCELLED" ? 20 : 5}
          initialValue={tenderData.tenderContract?.contractStatusNotes}
        />
        <DsCsvUpload
          id={"ContractUploadedDocuments"}
          label="Attach File"
          buttonViewStyle="btnText"
          buttonSize="btnSmall"
          disable={tenderDataCopy.tenderContract?.contractStatus == "SUBMITTED"}
          startIcon={<IconFactory name="fileAttach" />}
          previouslySelectedFile={
            tenderData.tenderDocuments
              ?.filter(
                (x) =>
                  x.documentCategory == "TENDER_CONTRACT_DOCUMENT" &&
                  x.documentType == status + "_DOCUMENT"
                // && x.id !== undefined
              )
              .map((x) => {
                return {
                  ...x,
                  fileDownloadHref: downloadDocumentUrl(tenderData.id, x.id),
                };
              }) || []
          }
          // onSelectedFileChange={(files) => {
          //   const typeDocuments =
          //     tenderData.tenderDocuments?.filter(
          //       (x) =>
          //         x.documentCategory == "TENDER_CONTRACT_DOCUMENT" &&
          //         x.documentType == status + "_DOCUMENT"
          //     ) || [];
          //   updateDocuments(
          //     files,
          //     typeDocuments,
          //     removeTenderDocument,
          //     addNewTenderDocument,
          //     status + "_DOCUMENT",
          //     "TENDER_CONTRACT_DOCUMENT"
          //   );
          // }}
          onRemoveFiles={(documentName) => {
            removeTenderDocument(
              status + "_DOCUMENT",
              "TENDER_CONTRACT_DOCUMENT",
              documentName
            );
          }}
          onAddFiles={(
            documents: {
              documentName?: string;
              document?: File;
            }[]
          ) => {
            const typeDocuments =
              tenderData.tenderDocuments?.filter(
                (x) =>
                  x.documentCategory == "TENDER_CONTRACT_DOCUMENT" &&
                  x.documentType == status + "_DOCUMENT"
              ) || [];
            documents.forEach((file) => {
              if (
                !typeDocuments?.find(
                  (f) =>
                    f.documentName == file.documentName ||
                    f.documentName == file.document?.name
                )
              )
                addNewTenderDocument(
                  status + "_DOCUMENT",
                  "TENDER_CONTRACT_DOCUMENT",
                  {
                    document: file.document,
                    documentName: file.documentName,
                    name: file.documentName,
                  }
                );
            });
          }}
        ></DsCsvUpload>
      </div>
      {status !== "CANCELLED" && (
        <>
          <div className={styles.awardTableTitle}>Product Award Details</div>
          <div className={styles.table}>
            <TableProvider
              data={contractProducts}
              columns={columns}
              onCellEdit={handleUpdateCell}
              isSelectable={false}
              isEditable={
                !(tenderDataCopy.tenderContract?.contractStatus == "SUBMITTED")
              }
            >
              <Table />
            </TableProvider>
            {/* 
            <TableComponent
              className={contractItemsTableData.className}
              id={contractItemsTableData.id}
              columns={contractItemsTableData.columns}
              rows={contractItemsTableData.rows}
            /> */}
          </div>
        </>
      )}
      <div>
        <DsInfoDisplay detailOf="Updated By" value={"Val"} />
      </div>
    </div>
  );
};
export default ContractView;
