import DsCsvUpload from "@/Elements/DsComponents/DsButtons/dsCsvUpload";
import TextArea from "@/Elements/DsComponents/DsInputs/dsTextArea";
import DsSingleSelect from "@/Elements/DsComponents/dsSelect/dsSingleSelect";
import TableComponent from "@/Elements/DsComponents/DsTablecomponent/DsTableOld";
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
import { useEffect, useState } from "react";
import fetchData from "@/Common/helpers/Method/fetchData";
import DsTextField from "@/Elements/DsComponents/DsInputs/dsTextField";
import DsSearchComponent from "@/Elements/DsComponents/DsSearch/searchComponent";
import AwardedToSearch from "./AwardedToSearch";
import IconFactory from "@/Elements/IconComponent";
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
  const [contractItemsTableData, setContractItemsTableData] =
    useState<tableData>({
      className: styles.ContractTable,
      type: "InterActive",
      id: "contractTable",
      isSortable: false,
      hasSearch: false,
      columns: [
        {
          columnIndex: 0,
          className: `${styles["cell-generic-name"]}`,
          columnHeader: "GENERIC NAME",
          isHidden: false,
          sort: "ASC",
          columnContentType: "string",
        },
        {
          columnIndex: 1,
          className: "cell-product-name",
          columnHeader: "PRODUCT NAME",
          isHidden: false,
          sort: "ASC",
          columnContentType: "string",
        },
        {
          columnIndex: 2,
          className: "cell-packing-size",
          columnHeader: "PACKING SIZE",
          isHidden: false,
          sort: "ASC",
          columnContentType: "string",
        },
        {
          columnIndex: 3,
          className: " cell-awarded-quantity",
          columnHeader: "AWARDED QUANTITY",
          isHidden: false,
          sort: "ASC",
          columnContentType: "reactNode",
        },
        {
          columnIndex: 4,
          className: " cell-awarded-to",
          columnHeader: "AWARDED TO",
          isHidden: false,
          sort: "ASC",
          columnContentType: "reactNode",
        },
        {
          columnIndex: 5,
          className: " cell-awarded-at-rate",
          columnHeader: "AWARDED AT RATE",
          isHidden: false,
          sort: "ASC",
          columnContentType: "reactNode",
        },
      ],
      rows: [],
    });
  const addTableData = (contractItems: ContractItems[]) => {
    // console.log("Adding table data:", tender);
    const newRows: DsTableRow[] = contractItems.map((item, index) => ({
      rowIndex: index,
      className: "cellRow",
      content: [
        {
          columnIndex: 0,
          className: `cell ${styles["cell-generic-name"]}`,
          content: item.product.requestedGenericName,
          filterValue: item.product.requestedGenericName,
          contentType: "string",
        },
        {
          columnIndex: 1,
          className: "cell cell-product-name",
          content: item.product.productName,
          filterValue: item.product.productName,
          contentType: "string",
        },
        {
          columnIndex: 2,
          className: "cell cell-packing-size",
          content: item.product.requestedPackingSize,
          filterValue: item.product.requestedPackingSize,
          contentType: "string",
        },
        {
          columnIndex: 3,
          className: "cell cell-awarded-quantity",
          content: (
            <DsTextField
              initialValue={item.awardedQuantity?.toString()}
              inputType="positive"
              onBlur={(e) => {
                if (item.id)
                  updateContractItems(
                    "awardedQuantity",
                    item.id,
                    (e.target as HTMLInputElement).value
                  );
              }}
            />
          ),
          filterValue: item.awardedQuantity,
          contentType: "reactNode",
        },

        {
          columnIndex: 4,
          className: "cell cell-awarded-to",
          // content: <DsName id={t.tenderId + "tenderType"} name={t.tenderType || "-"} />,
          content: (
            <AwardedToSearch
              awardedTo={{
                id: item.awardedToId || 0,
                name: item.product.awardedToName,
              }}
              index={0}
              setAwardedTo={(option) => {
                if (item.id && option.id && option.value) {
                  updateContractItems(
                    "awardedToId",
                    item.id,
                    Number(option.id)
                  );
                  updateContractItems(
                    "product.awardedToName",
                    item.id,
                    option.value
                  );
                }
              }}
            />
          ),
          filterValue: item.awardedToId,
          contentType: "reactNode",
        },

        {
          columnIndex: 5,
          className: " cell cell-awarded-at-rate",
          // content: t.depot,
          content: (
            <DsTextField
              initialValue={item.awardedRate?.toString()}
              inputType="positive"
              onBlur={(e) => {
                if (item.id)
                  updateContractItems(
                    "awardedRate",
                    item.id,
                    (e.target as HTMLInputElement).value
                  );
              }}
            />
          ),
          filterValue: item.awardedRate,
          contentType: "reactNode",
        },
      ],
    }));

    // console.log("New Rows:", newRows);

    setContractItemsTableData((prevData) => ({
      ...prevData,
      rows: newRows,
    }));
  };
  // async function fetchJustificationOptions(status: string) {
  //   try {
  //     const justificationFetch = new URL("fetch");
  //     justificationFetch.searchParams.set(
  //       "justificationType",
  //       "TENDER_" + status
  //     );
  //     const response = await fetchData({ url: justificationFetch.toString() });
  //     const options = response.result.map((x) => {
  //       return {
  //         value: x.codeValue,
  //         label: x.codeDescription,
  //       };
  //     });
  //     if (options.length > 0) setJustificationOptions(options);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
  useEffect(() => {
    // fetchJustificationOptions(status);
    if (status == "AWARDED")
      setJustificationOptions(metaData.tenderAwardedJustification);
    else if (status == "PARTIALLY_AWARDED")
      setJustificationOptions(metaData.tenderPartiallyAwardedJustification);
    else if (status == "CANCELLED")
      setJustificationOptions(metaData.tenderAwardedJustification);
    else if (status == "LOST")
      setJustificationOptions(metaData.tenderLostJustification);
  }, [status, metaData, tenderData.id, tenderDataCopy.id]);
  useEffect(() => {
    console.log(tenderData.tenderContract?.tenderRevisions);
    addTableData(
      tenderData.tenderContract?.tenderRevisions?.[0].tenderItems || []
    );
  }, [tenderData.tenderContract?.tenderRevisions]);
  return (
    <div className={styles.ContractPage}>
      <div className={styles.justification}>
        <div className={styles.title}>
          Tender{status ? ` ${ContractStatuses[status]} ` : " "}Justification{" "}
        </div>
        <DsSingleSelect
          id={"contractJustification"}
          options={justificationOptions || []}
          selectedOption={selectedJustification}
          setSelectOption={(option) => {
            setSlectedJustification(option);
            if (typeof option.value == "string")
              updateContractDetails("contractJustification", option.value);
          }}
        />
      </div>
      <div className={styles.notes}>
        <div className={styles.title}>Supporting Notes</div>
        <TextArea
          onBlur={(e) => {
            updateContractDetails(
              "contractStatusNotes",
              (e.target as HTMLTextAreaElement).value
            );
          }}
          minRows={status == "CANCELLED" ? 30 : 5}
          initialValue={tenderData.tenderContract?.contractStatusNotes}
        />
        <DsCsvUpload
          id={"ContractUploadedDocuments"}
          label="Attach File"
          buttonViewStyle="btnText"
          buttonSize="btnSmall"
          startIcon={<IconFactory name="fileAttach" />}
          previouslySelectedFile={
            tenderDataCopy.tenderDocuments?.filter(
              (x) =>
                x.documentCategory == "TENDER_CONTRACT_DOCUMENT" &&
                x.documentType == status + "_DOCUMENTS" &&
                x.id !== undefined
            ) || []
          }
          onSelectedFileChange={(files) => {
            const typeDocuments =
              tenderData.tenderDocuments?.filter(
                (x) =>
                  x.documentCategory == "TENDER_CONTRACT_DOCUMENT" &&
                  x.documentType == status + "_DOCUMENTS"
              ) || [];
            updateDocuments(
              files,
              typeDocuments,
              removeTenderDocument,
              addNewTenderDocument,
              "TENDER_CONTRACT_DOCUMENT",
              status + "_DOCUMENTS"
            );
          }}
        ></DsCsvUpload>
      </div>
      {status !== "CANCELLED" && (
        <>
          <div className={styles.awardTableTitle}>Product Award Details</div>
          <div className={styles.table}>
            <TableComponent
              className={contractItemsTableData.className}
              id={contractItemsTableData.id}
              columns={contractItemsTableData.columns}
              rows={contractItemsTableData.rows}
            />
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
