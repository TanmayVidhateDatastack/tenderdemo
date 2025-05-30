/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import styles from "./filteractions.module.css";
import Image from "next/image";
import filter from "@/Common/TenderIcons/smallIcons/filtericon.svg";
import { useAppDispatch, useAppSelector } from "@/Redux/hook/hook";
import { AppDispatch, RootState } from "@/Redux/store/store";
import fetchData from "@/Common/helpers/Method/fetchData";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getTenderUserRoles } from "@/Common/helpers/constant";
import { setUserRole } from "@/Redux/slice/UserSlice/userSlice";
import { setVisibilityByRole } from "@/Redux/slice/PermissionSlice/permissionSlice";
// import { Tender } from "@/Common/helpers/types";
import DsTextField from "@/Elements/DsComponents/DsInputs/dsTextField";
import searchicon from "@/Common/TenderIcons/smallIcons/searchicon.svg";
import DsFilterButton from "@/Elements/DsComponents/DsButtons/dsFilterButton";
import DsButton from "@/Elements/DsComponents/DsButtons/dsButton";
import { DisplayPane } from "@/Elements/DsComponents/DsPane/DsPane";
import btnStyles from "@/Elements/DsComponents/DsButtons/dsButton.module.css";

export interface DsFilterActionProps {


  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  selectedStatus: string;
  setSelectedStatus: Dispatch<SetStateAction<string>>;
  isQuickFilterActive: boolean;
  filterCount: number;
}
const DsFilterActions: React.FC<DsFilterActionProps> = ({
  searchQuery,
  setSearchQuery, selectedStatus, setSelectedStatus, isQuickFilterActive, filterCount
}) => {

  const initialFilterState = Object.fromEntries(
    ["NEAR_SUBMISSION", "FEES_PENDING", "APPROVAL", "UNDER_APPROVAL", "UNDER_REVIEW"].map(
      (status) => [status, false]
    )
  );

  const [isFiltered, setIsFiltered] =
    useState<Record<string, boolean>>(initialFilterState);

  const dispatch = useAppDispatch<AppDispatch>();
  const role = useAppSelector((state: RootState) => state.user.role);
  const permissions = useAppSelector((state: RootState) => state.permissions);
  const [searchText, setSearchText] = useState("");

  const {
    tenderDatalistVisible,
    nearSubmissionButtonVisible,
    // feesPendingButtonVisible,
    filterButtonVisible,
    approvalButtonVisible,
    myApprovalButtonVisible,
    // myApprovalButtonVisible

  } = permissions;

  const handleFetch = async () => {
    try {
      await fetchData({ url: getTenderUserRoles }).then((res) => {
        if ((res.code = 200)) {
          dispatch(setUserRole(res.result.roleName));
          console.log("userrole=", res);
          console.log("role", role);
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
  }, [role]);



  useEffect(() => {
    if (role && role !== "") {
      dispatch(setVisibilityByRole(role));
    }
  }, [role]);

  useEffect(() => {
    handleFilter(selectedStatus)
  }, [isQuickFilterActive]
  )
  const handleFilter = async (value: string) => {
    console.log("valueee", value);
    setIsFiltered((prev) => {
      const newFilterState = Object.fromEntries(
        Object.keys(prev).map((key) => [key, key === value ? !prev[key] : false])
      );

      const isFilterActive = !newFilterState[value];

      if (isFilterActive) {

        setSelectedStatus("");
      } else {
        const lowerCaseValue = value.toUpperCase();


        setSelectedStatus(lowerCaseValue);
      }

      return newFilterState;
    });
  };
  const handleSearch = (e) => {
    if (e.key === "Enter") {

      //
      const searchQueryLower = searchText;

      setSearchQuery(searchQueryLower);

    }
  };

  const normalizeText = (text: any): string => {
    if (typeof text !== "string") {
      return text.toString().toLowerCase();
    }
    return text.toLowerCase(); // Do not escape special characters like `/`, `,`
  };

  // Helper function to search inside nested objects
  const searchInObject = (obj: any, query: string): boolean => {
    return Object.values(obj).some((val) => {
      if (typeof val === "string" || typeof val === "number") {
        return normalizeText(val).includes(query);
      }

      if (typeof val === "object" && val !== null) {
        return searchInObject(val, query);
      }

      return false;
    });
  };



  return (
    <>
      {tenderDatalistVisible && (
        <DsTextField
          placeholder="Search Tender by Id or Name "
          id="userSelect"
          disable={false}
          initialValue=""
          iconEnd={
            <div
              style={{
                width: "1.125em",
                height: "1.125em",
                position: "relative",
              }}
            >
              <Image
                src={searchicon}
                layout="fill"
                objectFit="cover"
                alt="searchicon"
              />
            </div>
          }
          containerClasses={styles.datalist}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyUp={(e) => handleSearch(e)}
        />
      )}
      <div className={styles.nav}>
        {nearSubmissionButtonVisible && (
          <DsFilterButton
            id="approved"
            buttonColor="btnPrimary"
            className={styles.dis}
            buttonViewStyle={
              isFiltered["NEAR_SUBMISSION"] ? "btnContained" : "btnOutlined"
            }
            onClick={() => handleFilter("NEAR_SUBMISSION")}
            label="Near Submission"
            disable={!isQuickFilterActive}
          />
        )}
      </div>
      {/* {feesPendingButtonVisible && (

        <DsFilterButton
          id="dispatch"
          buttonColor="btnPrimary"
          className={styles.dis}
          buttonViewStyle={
            isFiltered["feesPending"] ? "btnContained" : "btnOutlined"
          }
          onClick={() => handleFilter("FEES_PENDING")}
          label="Fees Pending"
        />
      )} */}
      {approvalButtonVisible && (
        <DsFilterButton
          id="dispatch"
          buttonColor="btnPrimary"
          className={styles.dis}
          buttonViewStyle={
            isFiltered["APPROVAL"] ? "btnContained" : "btnOutlined"
          }
          onClick={() => handleFilter("APPROVAL")}
          label="Approval"
          disable={!isQuickFilterActive}

        />
      )}
      {myApprovalButtonVisible && (
        <DsFilterButton
          label="Under Approval"
          className={styles.dis}
          id="underApproval"
          buttonViewStyle={
            isFiltered["UNDER_APPROVAL"] ? "btnContained" : "btnOutlined"
          }
          onClick={() => handleFilter("UNDER_APPROVAL")}
          disable={!isQuickFilterActive}

        />
      )}
      {myApprovalButtonVisible && (
        <DsFilterButton
          // label="Under Review"
          label="My Approval"
          className={styles.dis}
          id="underReview"
          buttonViewStyle={
            isFiltered["UNDER_REVIEW"] ? "btnContained" : "btnOutlined"
          }
          onClick={() => handleFilter("UNDER_REVIEW")}
          disable={!isQuickFilterActive}

        />
      )}
      {filterButtonVisible && (
        <DsButton
          id="iconfilterBtn"
          buttonColor="btnPrimary"
          buttonViewStyle="btnText"
          className={btnStyles.btnTextPrimary + " text-dark-2"}
          startIcon={
            <div
              style={{
                width: "1.125em",
                height: "1.125em",
                position: "relative",
              }}
            >
              <Image
                src={filter}
                alt="Add Icon"
                layout="fill"
                objectFit="cover"
              />
            </div>
          }
          label={filterCount > 1 ? `${filterCount} Filters Applied` : filterCount == 1 ? `${filterCount} Filter Applied` : "Filter"}
          // label={`${filterCount}`}
          onClick={() => DisplayPane("AdvancedFilterComponent")}
          iconSize="iconMedium"
        />
      )}
    </>
  );
};

export default DsFilterActions;

