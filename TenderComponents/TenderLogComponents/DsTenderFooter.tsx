"use client";
import DsButton from "@/Elements/DsComponents/DsButtons/dsButton";
import React, { useEffect, useState } from "react";

import btnStyles from "@/Elements/DsComponents/DsButtons/dsButton.module.css";
import ContextMenu, {
  createContext,
  displayContext,
} from "@/Elements/DsComponents/dsContextHolder/dsContextHolder";
import { showToaster } from "@/Elements/DsComponents/DsToaster/DsToaster";
import PopupOpenButton from "@/Elements/DsComponents/dsPopup/popupOpenButton";
import { AppDispatch, RootState } from "@/Redux/store/store";
import { useAppDispatch, useAppSelector } from "@/Redux/hook/hook";
import { setVisibilityByRole } from "@/Redux/slice/PermissionSlice/permissionSlice";
import { setUserRole } from "@/Redux/slice/UserSlice/userSlice";
import fetchData from "@/Common/helpers/Method/fetchData";
import { dsStatus, getTenderUserRoles } from "@/Common/helpers/constant";
import DsNavTo from "@/Elements/ERPComponents/DsNavigationComponent/DsNavTo";
import DsSplitButton from "@/Elements/DsComponents/DsButtons/dsSplitButton";
import DsApprovalPopup from "@/Elements/ERPComponents/DsApprovalPopups/DsApprovalPopups";
import Toaster from "@/Elements/DsComponents/DsToaster/DsToaster";
import styles from "@/app/Tender/[TenderId]/tenderOrder.module.css"
class ActionStatus {
  notiType: "success" | "bonus" | "info" | "error" | "cross" = "success";
  notiMsg: string = "";
  showNotification: boolean = false;
}
interface dsTenderfooter {
  setActionStatus: (actionStatus: ActionStatus) => void;
  saveTender?: (status: dsStatus) => Promise<void>;
}

export const DSTendrFooter: React.FC<dsTenderfooter> = ({
  setActionStatus,
  saveTender,
}) => {
  const dispatch = useAppDispatch<AppDispatch>();
  const role = useAppSelector((state: RootState) => state.user.role);
  const [toasterVisible, setToasterVisible] = useState<boolean>(false);

  const handleFetch = async () => {
    try {
      const res = await fetchData({ url: getTenderUserRoles });
      if (res.code === 200) {
        dispatch(setUserRole(res.result.roleName));
      } else {
        console.error("Error fetching data: ", res.message || "Unknown error");
      }
    } catch (error) {
      console.error("Fetch error: ", error);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  useEffect(() => {
    if (role && role !== "") {
      dispatch(setVisibilityByRole(role));
      console.log("Role=", role);
      let contextContent: React.ReactElement | null = null;

      
      if (role === "ACCOUNTANCE") {
        contextContent = (
          <DsButton
            label="Submit Receipt"
            buttonSize="btnSmall"
            buttonViewStyle="btnText"
            className={btnStyles.btnTextPrimary}
            onClick={() => showToaster("toaster1")}
          />
        );
      } else if (role === "HOMANAGER") {
        contextContent = (
          <>
            <PopupOpenButton
              popupId="popup1"
              buttonSize="btnSmall"
              buttonText="Approve"
              buttonViewStyle="btnText"
              className={btnStyles.btnTextPrimary}
            />
            <PopupOpenButton
              popupId="popup2"
              buttonSize="btnSmall"
              buttonText="Revise"
              buttonViewStyle="btnText"
              className={btnStyles.btnTextPrimary}
            />
            <PopupOpenButton
              popupId="popup3"
              buttonSize="btnSmall"
              buttonText="Reject"
              buttonViewStyle="btnText"
              className={btnStyles.btnTextPrimary}
            />
          </>
        );
      } else if (role === "CHECKER") {
        contextContent = (
          <>
            <PopupOpenButton
              popupId="popup1"
              buttonSize="btnSmall"
              buttonText="Reviewed"
              buttonViewStyle="btnText"
              className={btnStyles.btnTextPrimary}
            />
            <PopupOpenButton
              popupId="popup2"
              buttonSize="btnSmall"
              buttonText="Revise"
              buttonViewStyle="btnText"
              className={btnStyles.btnTextPrimary}
            />
          </>
        );
      } else if (role === "MAKER") {
        contextContent = (
          <DsButton
            label="Submit for Review"
            buttonSize="btnSmall"
            buttonViewStyle="btnText"
            className={btnStyles.btnTextPrimary}
            onClick={() => showToaster("toaster1")}
          />
        );
      }

      if (contextContent) {
        createContext("contextMenuId4", <div>{contextContent}</div>, true);
      }
    }
  }, [role]);

  return (
    <>
      <div className={styles.footer}>
        <DsNavTo
          id="closeBtn"
          location=""
          label="Close"
          buttonSize="btnLarge"
          className={btnStyles.btnOutlined}
          buttonColor="btnDark"
          buttonViewStyle="btnOutlined"
          disable={false}
        />

        <DsSplitButton
          buttonViewStyle="btnContained"
          onClick={() => {
            if (saveTender) saveTender("Draft");
          }}
          onSplitClick={(e) =>
            displayContext(e, "contextMenuId4", "top", "center")
          }
          buttonSize="btnLarge"
        >
          Save
        </DsSplitButton>
      </div>

      <DsApprovalPopup
        id="popup1"
        types={[]}
        popupType="Approve"
        buttonColor="btnPrimary"
        position="center"
        toasterMessage={
          role === "HOMANAGER"
            ? "The Tender has been Approved"
            : role === "CHECKER"
            ? "The Tender has been successfully moved to under approval state"
            : "The action was successful!"
        }
        setActionStatus={setActionStatus}
      />

      <DsApprovalPopup
        id="popup2"
        types={[]}
        popupType="Revise"
        buttonColor="btnPrimary"
        position="center"
        toasterMessage={"The Tender has been sent for Revision "}
        setActionStatus={setActionStatus}
      />
      <DsApprovalPopup
        id="popup3"
        types={[]}
        popupType="Reject"
        buttonColor="btnDanger"
        position="center"
        toasterMessage={"The Tender has been Rejected & also note has sent "}
        setActionStatus={setActionStatus}
      />
      <Toaster
        id={"toaster1"}
        message={
          role === "ACCOUNTANCE"
            ? "The Data has been Submitted by Review "
            : role === "MAKER"
            ? "The receipt has been submitted successfully"
            : "The action was successful!"
        }
        type={"success"}
        position={"top"}
        duration={4000}
        handleClose={() => setToasterVisible(false)}
      />
      {/* <ContextMenu id={"contextMenuId4"} showArrow={true} content={<div>{contextContent}</div>}/> */}
    </>
  );
};

export default DSTendrFooter;
