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
<<<<<<< HEAD
 
 
=======


>>>>>>> 0cfc6fc393a629173af83517b46a16b3d39f7cb4
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  selectedStatus: string;
  setSelectedStatus: Dispatch<SetStateAction<string>>;
}
const DsFilterActions: React.FC<DsFilterActionProps> = ({
  searchQuery,
  setSearchQuery, selectedStatus, setSelectedStatus
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
 
 
  // const handleFilter = (value: string | string[], message?: string) => {
  //   setIsFiltered((prev) => {
  //     const newFilterState = Object.fromEntries(
  //       Object.keys(prev).map((key) => [
  //         key,
  //         Array.isArray(value)
  //           ? value.includes(key)
  //           : key === value
  //           ? !prev[key]
  //           : false,
  //       ])
  //     );
 
  //     if (!Array.isArray(value)) {
  //       if (!newFilterState[value]) {
  //         setFilteredData(data);
  //       } else {
  //         let filteredRows = [...data];
 
  //         if (value === "nearSubmission") {
  //           filteredRows = filteredRows.filter((tender) => {
<<<<<<< HEAD
 
=======

>>>>>>> 0cfc6fc393a629173af83517b46a16b3d39f7cb4
  //             const [day, month, year] = tender.submittionDate.split("/");
  //             const dateToCheck = new Date(
  //               parseInt(year),
  //               parseInt(month) - 1,
  //               parseInt(day)
  //             );
 
  //             const today = new Date();
  //             const futureDate = new Date(today);
  //             futureDate.setDate(today.getDate() + 20); //near submission change 20 days
<<<<<<< HEAD
 
 
=======


>>>>>>> 0cfc6fc393a629173af83517b46a16b3d39f7cb4
  //             return (
  //               (dateToCheck < today || dateToCheck <= futureDate) &&
  //               tender.status.tenderStatus?.toLowerCase() !== DsStatus.SMBT
  //             );
  //           });
  //         } else if (value == "feesPending") {
  //           const lowerCaseValue = DsStatus.DRFT.toLowerCase();
  //           message = "fees pending";
  //           filteredRows = filteredRows.filter((tender) =>
  //             message
  //               ? tender.status?.tenderStatus?.toLowerCase() ===
  //                   lowerCaseValue &&
  //                 tender?.status?.message?.toLowerCase() ==
  //                   message.toLowerCase()
  //               : tender.status?.tenderStatus?.toLowerCase() === lowerCaseValue
  //           );
  //         }
<<<<<<< HEAD
 
=======

>>>>>>> 0cfc6fc393a629173af83517b46a16b3d39f7cb4
  //         else {
  //           const lowerCaseValue = value.toLowerCase();
  //           filteredRows = filteredRows.filter((tender) =>
  //             message
  //               ? tender.status?.tenderStatus?.toLowerCase() ===
  //                   lowerCaseValue &&
  //                 tender?.status?.message?.toLowerCase() ==
  //                   message.toLowerCase()
  //               : tender.status?.tenderStatus?.toLowerCase() === lowerCaseValue
  //           );
  //         }
  //         setFilteredData(filteredRows);
  //       }
  //     } else {
  //         const activeFilters = Object.entries(newFilterState)
  //         .filter(([_, isActive]) => isActive)
  //         .map(([key]) => key);
  //       if (activeFilters.length === 0) {
  //         setFilteredData(data);
  //       } else {
  //         let filteredRows = [...data];
 
  //         filteredRows = filteredRows.filter((tender) =>
  //           activeFilters.some(
  //             (status) =>
  //               tender.status?.tenderStatus?.toLowerCase() ===
  //                 status.toLowerCase() &&
  //               (tender.status.message && message
  //                 ? tender.status.message.toLowerCase() == message.toLowerCase()
  //                 : true)
  //           )
  //         );
  //         setFilteredData(filteredRows);
  //       }
 
  //       return newFilterState;
  //     }
  //     return newFilterState;
  //   });
  // };
 
  // useEffect(() => {
  //   handleFetch();
  // }, []);
 
  // useEffect(() => {
  //   console.log("deta : ", data);
  // }, [data]);
 
  useEffect(() => {
    if (role && role !== "") {
      dispatch(setVisibilityByRole(role));
    }
  }, [role]);
<<<<<<< HEAD
 
 
 
 
 
=======





>>>>>>> 0cfc6fc393a629173af83517b46a16b3d39f7cb4
  const handleFilter = async (value: string) => {
    console.log("valueee", value);
    setIsFiltered((prev) => {
      const newFilterState = Object.fromEntries(
        Object.keys(prev).map((key) => [key, key === value ? !prev[key] : false])
      );
 
      const isFilterActive = !newFilterState[value];
 
      if (isFilterActive) {
<<<<<<< HEAD
 
        setSelectedStatus("");
      } else {
        const lowerCaseValue = value.toUpperCase();
 
=======

        setSelectedStatus("");
      } else {
        const lowerCaseValue = value.toUpperCase();


>>>>>>> 0cfc6fc393a629173af83517b46a16b3d39f7cb4
        setSelectedStatus(lowerCaseValue);
      }
 
      return newFilterState;
    });
  };
  const handleSearch = (e) => {
    if (e.key === "Enter") {
<<<<<<< HEAD
 
      //
      const searchQueryLower = searchText;
 
      setSearchQuery(searchQueryLower);
 
=======

      //
      const searchQueryLower = searchText;

      setSearchQuery(searchQueryLower);

>>>>>>> 0cfc6fc393a629173af83517b46a16b3d39f7cb4
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
  console.log("searchhhhh", searchText);
  console.log("searchinobject", searchInObject);
<<<<<<< HEAD
 
  return (
    <>
 
=======

  return (
    <>

>>>>>>> 0cfc6fc393a629173af83517b46a16b3d39f7cb4
      {tenderDatalistVisible && (
        <DsTextField
          placeholder="Search Tender by Id, Name & Value"
          id="userSelect"
          disable={false}
          initialValue=""
          iconEnd={
            <div style={{ width: "1.125em", height: "1.125em", position: "relative" }}>
              <Image src={searchicon} layout="fill" objectFit="cover" alt="searchicon" />
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
              isFiltered["nearSubmission"] ? "btnContained" : "btnOutlined"
            }
<<<<<<< HEAD
 
=======

>>>>>>> 0cfc6fc393a629173af83517b46a16b3d39f7cb4
            onClick={() => handleFilter("NEAR_SUBMISSION")}
            label="Near Submission"
          />
        )}
<<<<<<< HEAD
 
      </div>
      {feesPendingButtonVisible && (
 
=======

      </div>
      {feesPendingButtonVisible && (

>>>>>>> 0cfc6fc393a629173af83517b46a16b3d39f7cb4
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
      )}
      {approvalButtonVisible && (
<<<<<<< HEAD
 
=======

>>>>>>> 0cfc6fc393a629173af83517b46a16b3d39f7cb4
        <DsFilterButton
          id="dispatch"
          buttonColor="btnPrimary"
          className={styles.dis}
          buttonViewStyle={
            isFiltered["approval"]
              ? "btnContained"
              : "btnOutlined"
          }
 
          onClick={() =>
            handleFilter
              ("APPROVAL")
          }
          label="Approval"
        />
      )}
      {underApprovalButtonVisible && (
        <DsFilterButton
          label="Under Approval"
          className={styles.dis}
          id="underApproval"
          buttonViewStyle={
            isFiltered["underApproval"]
              ? "btnContained"
              : "btnOutlined"
          }
          onClick={() => handleFilter("UNDER_APPROVAL")}
        />
      )}
      {underReviewButtonVisible && (
        <DsFilterButton
          label="Under Review"
          className={styles.dis}
          id="underReview"
          buttonViewStyle={
            isFiltered["underReview"]
              ? "btnContained"
              : "btnOutlined"
          }
          onClick={() => handleFilter("UNDER_REVIEW")}
        />
      )}
      {filterButtonVisible && (
<<<<<<< HEAD
 
=======

>>>>>>> 0cfc6fc393a629173af83517b46a16b3d39f7cb4
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
          label="Filter"
          onClick={() => DisplayPane("AdvancedFilterComponent")}
          iconSize="iconMedium"
<<<<<<< HEAD
 
        />
      )}
 
=======

        />
      )}

>>>>>>> 0cfc6fc393a629173af83517b46a16b3d39f7cb4
    </>
  );
};
 
export default DsFilterActions;
<<<<<<< HEAD
 
 
 
 
=======

>>>>>>> 0cfc6fc393a629173af83517b46a16b3d39f7cb4
