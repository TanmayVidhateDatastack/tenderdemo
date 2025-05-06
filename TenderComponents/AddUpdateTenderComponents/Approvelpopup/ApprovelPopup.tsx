"use client";

import { closeTimeForSalesOrder, getAllMetaData, updateApprovalTypes } from "@/Common/helpers/constant";
import fetchData from "@/Common/helpers/Method/fetchData";
import { DsSelectOption } from "@/Common/helpers/types";
import DsPopup, { ClosePopup } from "@/Elements/DsComponents/dsPopup/dsPopup";
import DsSingleSelect from "@/Elements/DsComponents/dsSelect/dsSingleSelect";
import Toaster, { showToaster } from "@/Elements/DsComponents/DsToaster/DsToaster";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./ApprovelPopup.module.css";
import TextArea from "@/Elements/DsComponents/DsInputs/dsTextArea";
import DsButton from "@/Elements/DsComponents/DsButtons/dsButton";
import { DisplayPane } from "@/Elements/DsComponents/DsPane/DsPane";

class ActionStatus {
    notiType: "success" | "bonus" | "info" | "error" | "cross" = "success";
    notiMsg: string = "";
    showNotification: boolean = false;
}
export interface ApprovalProps {
    id: string;
    popupType: "Approve" | "Revise" | "Reject";
    buttonColor: "btnDanger" | "btnPrimary";
    position?: "top" | "center";
    toasterMessage: string; // Single message string instead of an object
    customerId?: number;
    setActionStatus: (actionStatus: ActionStatus) => void;
    deviationCode?: string;
    types: DsSelectOption[];
    orderId?: number;
}


const createApprovalObject = (customerId: number, comment: string, status: string, value: string, deviationCode?: string) => {
    return [
        {
            op: "replace",
            path: "ApprovalStage",
            value: "BASIC_CHECK_APPROVAL",
        },
        {
            op: "replace",
            path: "/ApprovedBy",
            value: customerId,
        },
        {
            op: "replace",
            path: "/ApproverComments",
            value: comment, // Dynamic comment
        },
        {
            op: "replace",
            path: "/Status",
            value: status, // Dynamic status
        },
        {
            op: "add",
            path: "/JustificationType",
            value: deviationCode, // Dynamic justification value
        },
        {
            op: "add",
            path: "/JustificationDescription",
            value: value, // Dynamic justification value
        },
    ];
};


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
    orderId
}) => {
    const metaDataTypes = [
        "JUSTIFICATION_APPROVE_TYPE",
        "JUSTIFICATION_REJECT_TYPE",
        "JUSTIFICATION_REVISE_TYPE",
      ];
    const [popupTitle, setPopUpTitle] = useState<string>("");
    const [toasterVisible, setToasterVisible] = useState<boolean>(false);
    const [toasterType, setToasterType] = useState<"success" | "info" | "error">("success");
    // const [options, setOptions] = useState<DsSelectOption[]>([]);
    const [selectedOption, setSelectedOption] = useState<DsSelectOption>();
    const [options, setOptions] = useState<DsSelectOption[]>([]); // Define options state
    const [selectedtypes, setSelectedType] = useState<string>("")
    const [status, setStatus] = useState<string>("");
    const [cId, setCId] = useState<number>(1);
    // const selectedOptionsType: (value: string) => void;


    const router = useRouter();
    const goBack = () => {
        router.back();
    };
    const handleOptionChange = (e: React.FormEvent<HTMLElement>) => {
        const target = e.target as HTMLSelectElement; // Cast target to the appropriate type
        const selectedValue = target.options[target.selectedIndex].text; // Get the value from the event
        const selectedLabel = target.value;// Get the label

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
    }, [customerId, orderId])

    useEffect(() => {
        if (selectedOption) {
            setSelectedType(selectedOption.value.toString());
        }
    }, [selectedOption]); // React to changes in selectedOption


    const [textAreaValue, setTextAreaValue] = useState("");

    const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        if (e.target instanceof HTMLTextAreaElement) {
            setTextAreaValue(e.target.value); // Update the state with the entered text
        }
    };

    const handleButtonClick = () => {
        const resultObject = {
            text: textAreaValue,
            selectedValue: selectedOption?.value || " ",
            selectedLabel: selectedOption?.label,

        };
        const selectedValueString = resultObject?.selectedValue?.toString();
        createApprovalObject(cId, textAreaValue, selectedValueString, status, deviationCode);
        const approvalObject = createApprovalObject(cId, textAreaValue, status, selectedValueString, deviationCode);

    };
    const handleSave = async () => {
        const resultObject = {
            text: textAreaValue,
            selectedValue: selectedOption?.label,
            selectedLabel: selectedOption?.value,
        };


        const selectedValueString = resultObject.selectedValue?.toString() ?? "";

        const approvalObject = createApprovalObject(cId, textAreaValue, status, selectedValueString, deviationCode);


        const apiUrl = updateApprovalTypes + orderId;

        try {
            const response = await fetch(apiUrl, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(approvalObject),
            });

            if (response.status === 200) {
                const responseData = await response.json();
                if (responseData.code === 200) {
                    setActionStatus({
                        notiMsg: "Status Updated Successfully!",
                        notiType: "success",
                        showNotification: true,
                    });
                    showToaster("create-order-toaster");
                } else {
                    setActionStatus({
                        notiMsg: "Status Update Failed!",
                        notiType: "error",
                        showNotification: true,
                    });
                    showToaster("create-order-toaster");

                }
            } else {
                console.error("Error saving data:", response.statusText);
                setActionStatus({
                    notiMsg: "Status Update Failed!",
                    notiType: "error",
                    showNotification: true,
                });
                showToaster("create-order-toaster");
            }
        } catch (error) {
            console.error("Error in API call:", error);
            showToaster("server_error");
            setActionStatus({
                notiMsg: "Status Update Failed!",
                notiType: "error",
                showNotification: true,
            });
            showToaster("create-order-toaster");
        }
    };

    // const handleFetchJustificationTypes = async () => {
    //     await fetchData({ url: getJustificationTypes + deviationCode }).then((res) => {
    //         if (res?.code === 200 && Array.isArray(res?.result)) {
    //             const formattedOptions = res.result.map((item) => ({
    //                 label: item.description,
    //                 value: item.id,
    //             }));

    //             console.log("formated option : ", formattedOptions)
    //             setOptions(formattedOptions);
    //         }
    //         else {
    //             console.log("error found while fetching")
    //         }
    //     });
    // };

    // useEffect(() => {
    //     handleFetchJustificationTypes();
    // }, [deviationCode])


    function ShowToaster() {
        if (popupType === "Approve") {
            setToasterType("success");
            setStatus("APPROVE");
        } else if (popupType === "Revise") {
            setStatus("REVISE");
            setToasterType("info");
        } else if (popupType === "Reject") {
            setStatus("REJECT");
            setToasterType("error");
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
                console.log("MetaData :-", result);

                let justificationType = [];
                if (popupType === "Approve") {
                    justificationType = result?.justificationApproveType || [];
                  
                } else if (popupType === "Reject") {
                    justificationType = result?.justificationRejectType || [];
                   
                } else if (popupType === "Revise") {
                    justificationType = result?.justificationReviseType || [];
                   
                }

                console.log("Justification Type ", justificationType);

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
                    <div className={styles.commentText} >
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
                    {buttonColor === "btnPrimary" && popupType === "Approve" && (
                        <DsButton
                            id="approveButton"
                            label="Approve"
                            buttonViewStyle="btnContained"
                            buttonColor="btnPrimary"
                            onClick={() => {
                                if (selectedOption?.value) {
                                    showToaster("approve-toaster");
                                } 
                                handleButtonClick();
                                // handleSave();

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
                                if (selectedOption?.value) {
                                    showToaster("revise-toaster");
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
                                if (selectedOption?.value) {
                                    showToaster("reject-toaster");
                                } 
                            }}
                        />
                    )}
                </div>
            </DsPopup >
            {toasterVisible && (
                <Toaster
                    handleClose={() => setToasterVisible(false)}
                    type={toasterType}
                    message={toasterMessage} // Use single message prop directly
                    position="top"
                    duration={3000}
                />
            )
            }
            <Toaster
                id="revise-toaster"
                type={"bonus"}
                message={"Tender has been send for Revision"}
                position="top"
                duration={3000}
                handleClose={() => setToasterVisible(false)}
                />
                 <Toaster
                id="approve-toaster"
                type={"success"}
                message={"Tende has been Approved "} 
                position="top"
                duration={3000}
                handleClose={() => setToasterVisible(false)}
                />
                 <Toaster
                id="reject-toaster"
                type={"cross"}
                message={"Tender has been rejected and also not has send"} 
                position="top"
                duration={3000}
                handleClose={() => setToasterVisible(false)}
                />
        </>
        
    );
};

export default ApprovalPopup;

