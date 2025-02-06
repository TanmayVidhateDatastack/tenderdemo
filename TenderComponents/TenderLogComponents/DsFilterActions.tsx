import DsDataList from "@/Elements/DsComponents/DsInputs/dsDatalist";
import styles from "./filteractions.module.css";
import DsTabButton from "@/Elements/DsComponents/DsButtons/DsTabButton";
import Image from "next/image";
import filter from "@/Icons/smallIcons/filtericon.svg";
import PaneOpenButton from "@/Elements/DsComponents/DsPane/PaneOpenButton";
import { useAppDispatch, useAppSelector } from "@/Redux/hook/hook";
import { AppDispatch, RootState } from "@/Redux/store/store";
import fetchData from "@/helpers/Method/fetchData";
import { useEffect } from "react";
import { getTenderUserRoles } from "@/helpers/constant";
import { setUserRole } from "@/Redux/slice/UserSlice/userSlice";
import { setVisibilityByRole } from "@/Redux/slice/PermissionSlice/permissionSlice";

const DsFilterActions: React.FC = () => {
  const dispatch = useAppDispatch<AppDispatch>();
  const role = useAppSelector((state: RootState) => state.user.role);
  const permissions = useAppSelector((state: RootState) => state.permissions);

  const {
    tenderDatalistVisible,
    nearSubmissionButtonVisible,
    feesPendingButtonVisible,
    filterButtonVisible,
    approvalButtonVisible,
    underApprovalButtonVisible,
    underReviewButtonVisible
  } = permissions;

  const handleFetch = async () => {
    try {
      await fetchData({ url: getTenderUserRoles }).then((res) => {
        if ((res.code = 200)) {
          dispatch(setUserRole(res.result.roleName));
        } else {
          console.error(
            "Error fetching data: ",
            res.message || "Unknown error"
          );
        }
      });
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
    }
  }, [role]);

  return (
    <>
      <div className={styles.filterContainer}>
        {tenderDatalistVisible && (
          <DsDataList
            id={"tenderList"}
            dataListId={"tenderData"}
            label="Search Tender By Name, Value and Id"
            placeholder="Search Tender By Name, Value and Id"
          />
        )}
        {nearSubmissionButtonVisible && (
          <DsTabButton
            className={styles.submissionBtn}
            label="Near Submission"
            id="nearSubmission"
            buttonSize="btnLarge"
            buttonViewStyle="btnOutlined"
          />
        )}
        {feesPendingButtonVisible && (
          <DsTabButton
            className={styles.feesBtn}
            label="Fees Pending"
            id="fees"
            buttonSize="btnLarge"
            buttonViewStyle="btnOutlined"
          />
        )}
        {approvalButtonVisible && (
          <DsTabButton
            className={styles.approvalBtn}
            label="Approval"
            id="approval"
            buttonSize="btnLarge"
            buttonViewStyle="btnOutlined"
          />
        )}
        {underApprovalButtonVisible && (
          <DsTabButton
            label="Under Approval"
            id="underApproval"
            buttonSize="btnLarge"
            buttonViewStyle="btnOutlined"
          />
        )}
        {underReviewButtonVisible && (
          <DsTabButton
            label="Under Review"
            id="underReview"
            buttonSize="btnLarge"
            buttonViewStyle="btnContained"
          />
        )}
        {filterButtonVisible && (
          <PaneOpenButton
            paneId="y"
            id="paneBTN"
            className={styles.filterBtn}
            label="Filter"
            startIcon={<Image src={filter} alt="filter" />}
            buttonSize="btnMedium"
            buttonViewStyle="btnText"
          />
        )}
      </div>
    </>
  );
};

export default DsFilterActions;
