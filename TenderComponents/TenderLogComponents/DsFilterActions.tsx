import DsDataList from "@/Elements/DsComponents/DsInputs/dsDatalist";
import styles from "./filteractions.module.css";
import DsTabButton from "@/Elements/DsComponents/DsButtons/DsTabButton";
import Image from "next/image";
import filter from "@/Icons/smallIcons/filtericon.svg";
import PaneOpenButton from "@/Elements/DsComponents/DsPane/PaneOpenButton";
import { useAppDispatch, useAppSelector } from "@/Redux/hook/hook";
import { AppDispatch, RootState } from "@/Redux/store/store";
import fetchData from "@/helpers/Method/fetchData";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { DsStatus, getTenderUserRoles } from "@/helpers/constant";
import { setUserRole } from "@/Redux/slice/UserSlice/userSlice";
import { setVisibilityByRole } from "@/Redux/slice/PermissionSlice/permissionSlice";
import { Tender } from "@/helpers/types";

export interface DsFilterActionProps {
  data: Tender[];
  setFilteredData: Dispatch<SetStateAction<Tender[]>>;
}
const DsFilterActions: React.FC<DsFilterActionProps> = ({
  data,
  setFilteredData
}) => {
  const [isFiltered, setIsFiltered] = useState<Record<string, boolean>>({
    [DsStatus.UREV]: false,
    [DsStatus.UAPR]: false,
    [DsStatus.APRL]: false
  });
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

  const handleFilter = (value: string) => {
    setIsFiltered((prev) => {
      const newFilterState = Object.fromEntries(
        Object.keys(prev).map((key) => [
          key,
          key === value ? !prev[key] : false
        ])
      );

      // If the selected filter is being turned off, reset the data
      if (!newFilterState[value]) {
        setFilteredData(data);
      } else {
        // Convert both the filter value and status to lowercase before comparison
        const lowerCaseValue = value.toLowerCase();
        const filteredRows = data.filter(
          (tender) =>
            tender.status?.tenderStatus?.toLowerCase() === lowerCaseValue
        );
        setFilteredData(filteredRows);
      }

      return newFilterState;
    });
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
            buttonViewStyle="btnOutlined"
            onClick={() => handleFilter(DsStatus.UREV)}
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
