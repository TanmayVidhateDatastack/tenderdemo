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
import DsTextField from "@/Elements/DsComponents/DsInputs/dsTextField";
import searchicon from "@/Icons/smallIcons/searchicon.svg";
 
export interface DsFilterActionProps {
  data: Tender[];
  setFilteredData: Dispatch<SetStateAction<Tender[]>>;
}
const DsFilterActions: React.FC<DsFilterActionProps> = ({
  data,
  setFilteredData
}) => {
  // const [isFiltered, setIsFiltered] = useState<Record<string, boolean>>({
  //   [DsStatus.UREV]: false,
  //   [DsStatus.UAPR]: false,
  //   [DsStatus.APRL]: false,
  //   [DsStatus.APRV]: false,
  //   [(DsStatus.APRL, DsStatus.APRV, DsStatus.UAPR)]: false,
  //   nearSubmission: false
  // });
 
  const initialFilterState = Object.fromEntries(
    [...Object.values(DsStatus), "nearSubmission"].map((status) => [
      status,
      false
    ])
  );
 
  const [isFiltered, setIsFiltered] =
    useState<Record<string, boolean>>(initialFilterState);
 
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
 
  const handleFilter = (value: string | string[], message?: string) => {
    setIsFiltered((prev) => {
      const newFilterState = Object.fromEntries(
        Object.keys(prev).map((key) => [
          key,
          Array.isArray(value)
            ? value.includes(key)
            : key === value
              ? !prev[key]
              : false
        ])
      );
 
      if (!Array.isArray(value)) {
        if (!newFilterState[value]) {
          setFilteredData(data);
        } else {
          let filteredRows = [...data];
 
          if (value === "nearSubmission") {
            filteredRows = filteredRows.filter((tender) => {
              if (!tender.daystosubmit) return false; // If no data, ignore
              const daysLeft = parseInt(
                tender.daystosubmit.match(/\d+/)?.[0] || "0"
              ); // Extract number
              return daysLeft <= 20;
            });
          } else {
            const lowerCaseValue = value.toLowerCase();
            filteredRows = filteredRows.filter((tender) =>
              message
                ? tender.status?.tenderStatus?.toLowerCase() ===
                lowerCaseValue &&
                tender?.status?.message?.toLowerCase() == message.toLowerCase()
                : tender.status?.tenderStatus?.toLowerCase() === lowerCaseValue
            );
          }
 
          setFilteredData(filteredRows);
        }
      } else {
        // Toggle filter state for array values
        const newFilterState = Object.fromEntries(
          Object.keys(prev).map((key) => [
            key,
            value.includes(key) ? !prev[key] : prev[key]
          ])
        );
 
        // Get active filters (only those which are true)
        const activeFilters = Object.entries(newFilterState)
          .filter(([_, isActive]) => isActive)
          .map(([key]) => key);
 
        // If no filters are active, reset data
        if (activeFilters.length === 0) {
          setFilteredData(data);
        } else {
          let filteredRows = [...data];
 
          filteredRows = filteredRows.filter((tender) =>
            activeFilters.some((status) =>
              tender.status?.tenderStatus?.toLowerCase() ===
              status.toLowerCase() &&
              ((tender.status.message &&
                message)
                ? tender.status.message.toLowerCase() == message.toLowerCase()
                : true)
            )
          );
 
          setFilteredData(filteredRows);
        }
 
        return newFilterState;
      }
 
      return newFilterState;
    });
  };
 
  useEffect(() => {
    handleFetch();
  }, []);
 
  useEffect(() => {
    console.log("deta : ", data);
  }, [data]);
 
  useEffect(() => {
    if (role && role !== "") {
      dispatch(setVisibilityByRole(role));
    }
  }, [role]);

  const [searchText, setSearchText] = useState("");


 
  const handleSearch = (e) => {
    if (e.key === "Enter") {
    const searchQuery = normalizeText(searchText);
    
    // Define the columns to search in
    const searchableColumns: (keyof Tender)[] = ["customerName", "tenderId", "value"];
  
    const filteredRows = data.filter((originalData) => {
      return searchableColumns.some((column) => {
        const value = originalData[column]; // Use column as keyof Tender
  
        if (typeof value === "string" || typeof value === "number") {
          return normalizeText(value).includes(searchQuery);
        }
  
        if (Array.isArray(value)) {
          return value.some((item: any) =>
            typeof item === "string" && normalizeText(item).includes(searchQuery)
          );
        }
  
        if (typeof value === "object" && value !== null) {
          return searchInObject(value, searchQuery);
        }
  
        return false;
      });
    });
  
    setFilteredData(filteredRows);
  };
}
  
  // Normalize text for case-insensitive search
  const normalizeText = (text: any): string => {
    return typeof text === "string" ? text.toLowerCase() : text.toString().toLowerCase();
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
      <div className={styles.filterContainer}>
   
      <div className={styles.innerfilterContainer}>
        {tenderDatalistVisible && (
          <DsTextField
          label="Search Tenders by Id,Name & value"
          id="tenderList"
          disable={false}
          initialValue=""
          iconEnd={<Image src={searchicon} alt={"searchicon"} />}
          containerClasses={styles.datalist}
          onChange={(e) => setSearchText(e.target.value)}
          // onBlur={() => handleSearch()}
          onKeyUp={(e) => handleSearch(e)}
        />
 
        )}
   
        {nearSubmissionButtonVisible && (
          <DsTabButton
            className={`${styles.submissionBtn} ${styles.contentsubmissionBtn}`}
            label="Near Submission"
            id="nearSubmission"
            buttonSize="btnLarge"
            buttonViewStyle="btnOutlined"
            onClick={() => {
              console.log("Near Submission button clicked!");
              handleFilter("nearSubmission");
            }}
          />
        )}
        </div>
 
        {feesPendingButtonVisible && (
          <DsTabButton
            className={`${styles.feesBtn}${styles.contentfeesBtn}`}
            label="Fees Pending"
            id="fees"
            buttonSize="btnLarge"
            buttonViewStyle="btnOutlined"
            onClick={() => handleFilter(DsStatus.APRV, "fees pending")}
          />
        )}
        {approvalButtonVisible && (
          <DsTabButton
            className={`${styles.approvalBtn} ${styles.contentaprrove}`}
            label="Approval"
            id="approval"
            buttonSize="btnLarge"
            buttonViewStyle="btnOutlined"
            onClick={() =>
              handleFilter([DsStatus.UREV, DsStatus.APRV, DsStatus.UAPR], "fees paid")
            }
          />
        )}
 
        {underApprovalButtonVisible && (
          <DsTabButton
            label="Under Approval"
            id="underApproval"
            buttonSize="btnLarge"
            buttonViewStyle="btnOutlined"
            onClick={() => handleFilter(DsStatus.UAPR)}
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
 
 