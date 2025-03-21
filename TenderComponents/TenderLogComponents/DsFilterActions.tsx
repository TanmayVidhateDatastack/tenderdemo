import styles from "./filteractions.module.css";
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
import DsFilterButton from "@/Elements/DsComponents/DsButtons/dsFilterButton";
import DsButton from "@/Elements/DsComponents/DsButtons/dsButton";
import { DisplayPane } from "@/Elements/DsComponents/DsPane/DsPane";
import btnStyles from "@/Elements/DsComponents/DsButtons/dsButton.module.css";

export interface DsFilterActionProps {
  data: Tender[];
  setFilteredData: Dispatch<SetStateAction<Tender[]>>;
}
const DsFilterActions: React.FC<DsFilterActionProps> = ({
  data,
  setFilteredData,
}) => {

  const initialFilterState = Object.fromEntries(
    [...Object.values(DsStatus), "nearSubmission", "feesPending"].map(
      (status) => [status, false]
    )
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
          console.log("userrole=",res);
          console.log("role",role);
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
            : false,
        ])
      );

      if (!Array.isArray(value)) {
        if (!newFilterState[value]) {
          setFilteredData(data);
        } else {
          let filteredRows = [...data];

          if (value === "nearSubmission") {
            filteredRows = filteredRows.filter((tender) => {
     
              const [day, month, year] = tender.submittionDate.split("/");
              const dateToCheck = new Date(
                parseInt(year),
                parseInt(month) - 1,
                parseInt(day)
              );

              const today = new Date();
              const futureDate = new Date(today);
              futureDate.setDate(today.getDate() + 20); //near submission change 20 days 

    
              return (
                (dateToCheck < today || dateToCheck <= futureDate) &&
                tender.status.tenderStatus?.toLowerCase() !== DsStatus.SMBT
              );
            });
          } else if (value == "feesPending") {
            const lowerCaseValue = DsStatus.DRFT.toLowerCase();
            message = "fees pending";
            filteredRows = filteredRows.filter((tender) =>
              message
                ? tender.status?.tenderStatus?.toLowerCase() ===
                    lowerCaseValue &&
                  tender?.status?.message?.toLowerCase() ==
                    message.toLowerCase()
                : tender.status?.tenderStatus?.toLowerCase() === lowerCaseValue
            );
          } 
     
          else {
            const lowerCaseValue = value.toLowerCase();
            filteredRows = filteredRows.filter((tender) =>
              message
                ? tender.status?.tenderStatus?.toLowerCase() ===
                    lowerCaseValue &&
                  tender?.status?.message?.toLowerCase() ==
                    message.toLowerCase()
                : tender.status?.tenderStatus?.toLowerCase() === lowerCaseValue
            );
          }
          setFilteredData(filteredRows);
        }
      } else {
          const activeFilters = Object.entries(newFilterState)
          .filter(([_, isActive]) => isActive)
          .map(([key]) => key);
        if (activeFilters.length === 0) {
          setFilteredData(data);
        } else {
          let filteredRows = [...data];

          filteredRows = filteredRows.filter((tender) =>
            activeFilters.some(
              (status) =>
                tender.status?.tenderStatus?.toLowerCase() ===
                  status.toLowerCase() &&
                (tender.status.message && message
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

     
      const searchableColumns: (keyof Tender)[] = [
        "customerName",
        "tenderId",
        "value",
      ];

      const filteredRows = data.filter((originalData) => {
        return searchableColumns.some((column) => {
          const value = originalData[column]; 

          if (typeof value === "string" || typeof value === "number") {
            return normalizeText(value).includes(searchQuery);
          }

          if (Array.isArray(value)) {
            return value.some(
              (item: any) =>
                typeof item === "string" &&
                normalizeText(item).includes(searchQuery)
            );
          }

          if (typeof value === "object" && value !== null) {
            return searchInObject(value, searchQuery);
          }

          return false;
        });
      });

      setFilteredData(filteredRows);
    }
  };


  const normalizeText = (text: any): string => {
    return typeof text === "string"
      ? text.toLowerCase()
      : text.toString().toLowerCase();
  };


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
          label="Search Tenders by ID,Name & Value"
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
          // onChange={(e) => setSearchText(e.target.value)}
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
  
            onClick={() => handleFilter("nearSubmission")}
            label="Near Submission"
          />
        )}

  </div>
      {feesPendingButtonVisible && (
     
        <DsFilterButton
          id="dispatch"
          buttonColor="btnPrimary"
          className={styles.dis}
          buttonViewStyle={
            isFiltered["feesPending"] ? "btnContained" : "btnOutlined"
          }
          onClick={() => handleFilter("feesPending")}
          label="Fees Pending"
        />
      )}
      {approvalButtonVisible && (
    
        <DsFilterButton
          id="dispatch"
          buttonColor="btnPrimary"
          className={styles.dis}
          buttonViewStyle={
            isFiltered[DsStatus.APRV || DsStatus.UREV || DsStatus.UAPR]
              ? "btnContained"
              : "btnOutlined"
          }

          onClick={() =>
            handleFilter(
              [DsStatus.UREV, DsStatus.APRV, DsStatus.UAPR],
              "fees paid"
            )
          }
          label="Approval"
        />
      )}
 {underApprovalButtonVisible && (
          <DsFilterButton
            label="Under Approval"
            className={styles.dis}
            id="underApproval"
            buttonViewStyle="btnOutlined"
            onClick={() => handleFilter(DsStatus.UAPR)}
          />
        )}
        {underReviewButtonVisible && (
          <DsFilterButton
            label="Under Review"
            className={styles.dis}
            id="underReview"
            buttonViewStyle="btnOutlined"
            onClick={() => handleFilter(DsStatus.UREV)}
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
        label="Filter"
        onClick={() => DisplayPane("tenderFilter")}
        iconSize="iconMedium"

      />
      )}
   
    </>
  );
};

export default DsFilterActions;
