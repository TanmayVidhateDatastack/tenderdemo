/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  approvelurl,
  closeTimeForSalesOrder,
  getAllMetaData,
  proDeskUrl,
  updateApprovalTypes,
} from "@/Common/helpers/constant";
import fetchData from "@/Common/helpers/Method/fetchData";
import { DsSelectOption } from "@/Common/helpers/types";
import DsPopup, { ClosePopup } from "@/Elements/DsComponents/dsPopup/dsPopup";
import DsSingleSelect from "@/Elements/DsComponents/dsSelect/dsSingleSelect";
import Toaster, {
  showToaster,
} from "@/Elements/DsComponents/DsToaster/DsToaster";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./ApprovelPopup.module.css";
import TextArea from "@/Elements/DsComponents/DsInputs/dsTextArea";
import DsButton from "@/Elements/DsComponents/DsButtons/dsButton";
import { DisplayPane } from "@/Elements/DsComponents/DsPane/DsPane";
import { approvalObject, useTenderData } from "../TenderDataContextProvider";

class ActionStatus {
  notiType: "success" | "bonus" | "info" | "error" | "cross" = "success";
  notiMsg: string = "";
  showNotification: boolean = false;
}
export interface ApprovalProps {
  id: string;
  popupType: "Approve" | "Revise" | "Reject" | "Reviewed";
  buttonColor: "btnDanger" | "btnPrimary";
  position?: "top" | "center";
  toasterMessage: string; // Single message string instead of an object
  customerId?: number;
  setActionStatus: (actionStatus: ActionStatus) => void;
  deviationCode?: string;
  types: DsSelectOption[];
  tenderId?: number;
  validateAndUpdateTender: (approval: approvalObject) => void;
}

// const createApprovalObject = (customerId: number, comment: string, status: string, value: string, deviationCode?: string) => {
//     return [
//         {
//             op: "replace",
//             path: "ApprovalStage",
//             value: "BASIC_CHECK_APPROVAL",
//         },
//         {
//             op: "replace",
//             path: "/ApprovedBy",
//             value: customerId,
//         },
//         {
//             op: "replace",
//             path: "/ApproverComments",
//             value: comment, // Dynamic comment
//         },
//         {
//             op: "replace",
//             path: "/Status",
//             value: status, // Dynamic status
//         },
//         {
//             op: "add",
//             path: "/JustificationType",
//             value: deviationCode, // Dynamic justification value
//         },
//         {
//             op: "add",
//             path: "/JustificationDescription",
//             value: value, // Dynamic justification value
//         },
//     ];
// };

const ApprovalPopup: React.FC<ApprovalProps> = ({
  id,
  popupType,
  buttonColor,
  position = "top",
  toasterMessage,
  customerId,
  deviationCode,
  setActionStatus,
  types,
  tenderId,
  validateAndUpdateTender,
}) => {
  const metaDataTypes = [
    "JUSTIFICATION_APPROVE_TYPE",
    "JUSTIFICATION_REJECT_TYPE",
    "JUSTIFICATION_REVISE_TYPE",
  ];
  const [popupTitle, setPopUpTitle] = useState<string>("");
  const [toasterVisible, setToasterVisible] = useState<boolean>(false);
  const [toasterType, setToasterType] = useState<"success" | "info" | "error">(
    "success"
  );
  // const [options, setOptions] = useState<DsSelectOption[]>([]);
  const [selectedOption, setSelectedOption] = useState<DsSelectOption>();
  const [options, setOptions] = useState<DsSelectOption[]>([]); // Define options state
  const [selectedtypes, setSelectedType] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [cId, setCId] = useState<number>(1);
  // const selectedOptionsType: (value: string) => void;

  const router = useRouter();
  const goBack = () => {
    router.replace(proDeskUrl);
  };
  const handleOptionChange = (e: React.FormEvent<HTMLElement>) => {
    const target = e.target as HTMLSelectElement; // Cast target to the appropriate type
    const selectedValue = target.options[target.selectedIndex].text; // Get the value from the event
    const selectedLabel = target.value; // Get the label

    const option: DsSelectOption = {
      value: selectedValue,
      label: selectedLabel,
    };

    setSelectedOption(option); // Update selectedOption
  };

  useEffect(() => {
    if (customerId) {
      setCId(customerId);
    }
  }, [customerId, tenderId]);

  useEffect(() => {
    if (selectedOption) {
      setSelectedType(selectedOption.value.toString());
    }
  }, [selectedOption]); // React to changes in selectedOption

  const [textAreaValue, setTextAreaValue] = useState("");

  const handleTextAreaChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (e.target instanceof HTMLTextAreaElement) {
      setTextAreaValue(e.target.value); // Update the state with the entered text
    }
  };

  const handleSave = async () => {
    const approvalObject = {
      approvalComments: textAreaValue,
      justificationType: selectedOption?.value.toString() || "",
      approvalStatus: status,
      // lastUpdatedBy: customerId || 1,
    };
    validateAndUpdateTender(approvalObject);
    const apiUrl = approvelurl(tenderId);
    // console.log("apiurl",apiUrl)
    // console.log("Sending POST data:", approvalObject);

    // try {
    //     const response = await fetch(apiUrl, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(approvalObject),

    //     });

    //     // console.log("Response body", response);
    //     // console.log("POST status is", response.status);
    //     // console.log("approvel object", approvalObject);

    //     if (response.ok) {
    //         const responseData = await response.json();
    //         if (responseData.code === 200) {
    //             // console.log("Response Status inside:", response.status);

    //             setActionStatus({
    //                 notiMsg: "Status Updated Successfully!",
    //                 notiType: "success",
    //                 showNotification: true,
    //             });

    //             showToaster("create-order-toaster");
    //         } else {
    //             setActionStatus({
    //                 notiMsg: "Status Update Failed!",
    //                 notiType: "error",
    //                 showNotification: true,
    //             });
    //             showToaster("create-order-toaster");
    //         }
    //     } else {
    //         setActionStatus({
    //             notiMsg: "Status Update Failed!",
    //             notiType: "error",
    //             showNotification: true,
    //         });
    //         showToaster("create-order-toaster");
    //     }
    // } catch (error) {
    //     console.error("API Error:", error);
    //     setActionStatus({
    //         notiMsg: "Status Update Failed!",
    //         notiType: "error",
    //         showNotification: true,
    //     });
    //     showToaster("create-order-toaster");
    // }
  };

  function ShowToastermessage() {
    if (popupType === "Approve") {
      setToasterType("success");
      setStatus("APPROVE");
    } else if (popupType === "Revise") {
      setStatus("REVISE");
      setToasterType("info");
    } else if (popupType === "Reject") {
      setStatus("REJECT");
      setToasterType("error");
    } else if (popupType === "Reviewed") {
      setStatus("REVIEW");
      setToasterType("success");
    }
    setToasterVisible(true);
  }

  useEffect(() => {
    if (popupType === "Approve") {
      setPopUpTitle("Justification");
      setStatus("APPROVE");
    } else if (popupType === "Revise") {
      setPopUpTitle("Reason for Revision");
      setStatus("REVISE");
    } else if (popupType === "Reject") {
      setPopUpTitle("Reason for Rejection");
      setStatus("REJECT");
    } else if (popupType === "Reviewed") {
      setPopUpTitle("Reviewed");
      setStatus("REVIEW");
    }
  }, [popupType]);

  const handleFetchData = async () => {
    try {
      const metaData = await fetchData({
        url: getAllMetaData,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-tender-codes": JSON.stringify(metaDataTypes),
        },
      });
      if (metaData.code === 200) {
        const result = metaData.result;
        // console.log("MetaData :-", result);

        let justificationType = [];
        if (popupType === "Approve") {
          justificationType = result?.justificationApproveType || [];
        } else if (popupType === "Reviewed") {
          justificationType = result?.justificationApproveType || [];
        } else if (popupType === "Reject") {
          justificationType = result?.justificationRejectType || [];
        } else if (popupType === "Revise") {
          justificationType = result?.justificationReviseType || [];
        }

        // console.log("Justification Type ", justificationType);

        const formattedOptions = justificationType.map((item: any) => ({
          value: item.codeValue,
          label: item.codeDescription,
        }));

        setOptions(formattedOptions);
      }
    } catch (error) {
      console.error("Fetch error: ", error);
    }
  };

  useEffect(() => {
    handleFetchData();
  }, []);

  return (
    <>
      <DsPopup title={popupTitle} id={id} position={position}>
        <div className={styles.fieldContainer}>
          <DsSingleSelect
            id={id + "_select"}
            label="Please Select"
            placeholder="Please Select"
            className={styles.selectPopup}
            options={options}
            setSelectOption={(selectedOption) =>
              setSelectedOption(selectedOption)
            }
            onChange={handleOptionChange}
          />
          <div className={styles.commentText}>
            <h4>Comments</h4>
          </div>
          <TextArea
            placeholder="Please Type Here"
            // label="label"
            disable={false}
            minRows={3}
            // cols={5}
            className="commentField"
            onChange={handleTextAreaChange} // Capture text changes
          />
        </div>
        <div className={styles.popupFooter}>
          {buttonColor === "btnPrimary" && popupType === "Reviewed" && (
            <DsButton
              id="approveButton"
              label="Approve"
              buttonViewStyle="btnContained"
              buttonColor="btnPrimary"
              onClick={() => {
                if (selectedOption?.value) {
                  ShowToastermessage();
                }

                handleSave();

                setTimeout(() => {
                  ClosePopup(id);
                }, closeTimeForSalesOrder - 600);
                setTimeout(() => {
                  DisplayPane("deviationPane");
                }, closeTimeForSalesOrder - 400);
                setTimeout(() => {
                  goBack();
                }, closeTimeForSalesOrder);
              }}
            />
          )}

          {buttonColor === "btnPrimary" && popupType === "Approve" && (
            <DsButton
              id="approveButton"
              label="Approve"
              buttonViewStyle="btnContained"
              buttonColor="btnPrimary"
              onClick={() => {
                if (selectedOption?.value) {
                  ShowToastermessage();
                }

                handleSave();

                setTimeout(() => {
                  ClosePopup(id);
                }, closeTimeForSalesOrder - 600);
                setTimeout(() => {
                  DisplayPane("deviationPane");
                }, closeTimeForSalesOrder - 400);
                setTimeout(() => {
                  goBack();
                }, closeTimeForSalesOrder);
              }}
            />
          )}
          {buttonColor === "btnPrimary" && popupType === "Revise" && (
            <DsButton
              id="reviseButton"
              label="Revise"
              buttonViewStyle="btnContained"
              buttonColor="btnPrimary"
              onClick={() => {
                handleSave();
                if (selectedOption?.value) {
                  ShowToastermessage();
                }
              }}
            />
          )}
          {buttonColor === "btnDanger" && popupType === "Reject" && (
            <DsButton
              id="rejectButton"
              label="Reject"
              buttonViewStyle="btnContained"
              buttonColor="btnDanger"
              onClick={() => {
                handleSave();
                if (selectedOption?.value) {
                  ShowToastermessage();
                }
              }}
            />
          )}
        </div>
      </DsPopup>
      {toasterVisible && (
        <Toaster
          handleClose={() => setToasterVisible(false)}
          type={toasterType}
          message={toasterMessage} // Use single message prop directly
          position="top"
          duration={3000}
        />
      )}
    </>
  );
};

export default ApprovalPopup;
