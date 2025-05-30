"use client";
import DsTextField from "@/Elements/DsComponents/DsInputs/dsTextField";
import DsMultiSelect from "@/Elements/DsComponents/dsSelect/dsMultiSelect";
import { useTenderData } from "../TenderDataContextProvider";
import styles from "@/app/Tender/[TenderId]/tenderOrder.module.css";
import deptStyles from "@/TenderComponents/AddUpdateTenderComponents/BasicDetailComponents/deposite.module.css";
import DsSelectMultiLevel from "@/Elements/DsComponents/dsSelect/dsSelectMultiLevel";
import fetchData from "@/Common/helpers/Method/fetchData";
import { useEffect, useMemo, useState } from "react";
import { appliedBySuppliedBy, getAllDepots } from "@/Common/helpers/constant";
import {
  datalistOptions,
  DsMultiLevelSelectOption,
  DsSelectOption,
} from "@/Common/helpers/types";
import { searchCustomerURL } from "@/Common/helpers/constant";
import { useAppSelector } from "@/Redux/hook/hook";
import { RootState } from "@/Redux/store/store";

type Depot = {
  id: number;
  name: string;
  code: string;
};
const DsApplierSupplierDetails: React.FC = ({}) => {
  const permissions = useAppSelector((state: RootState) => state.permissions);
  const {
    appliedByDisable,
    suppliedDisable,
    depotDisable,
    stockistNameDisable,
    stockistDiscountDisable,
  } = permissions;
  const [allSuppliedBy, setAllSuppliedBy] = useState<
    DsMultiLevelSelectOption[]
  >([]);
  
  const [depotList, setDepotList] = useState<Depot[]>([]);
  const [formatedDepot, setFormatedDepot] = useState<DsSelectOption[]>([]);

  const { updateTenderData, tenderData, tenderDataCopy } = useTenderData();
  const [selected, setSelected] = useState<datalistOptions>();
  const [selecteds, setSelecteds] = useState<datalistOptions>();
  const [appliedBy, setAppliedBy] = useState<DsMultiLevelSelectOption[]>([]);
  const [suppliedBy, setSuppliedBy] = useState<DsMultiLevelSelectOption[]>([]);

  function setStockistSearchOptions(values: unknown) {
    let customers: datalistOptions[] = [];
    if (Array.isArray(values) && values.every((val) => val.id && val.name)) {
      customers = values.map((x) => ({
        id: x?.id?.toString(),
        value: `${x.name}`,
        label: `${x.name}`,
        attributes: { type: "STOCKIST" },
      }));
    }
    return customers;
  }
  function setStockistSearchOptionss(values: unknown) {
    let customers: datalistOptions[] = [];
    if (Array.isArray(values) && values.every((val) => val.id && val.name)) {
      customers = values.map((x) => ({
        id: x?.id?.toString(),
        value: `${x.name}`,
        label: `${x.name}`,
        attributes: { type: "STOCKIST" },
      }));
    }
    return customers;
  }
  const onStockistSelect = (selectedOption: datalistOptions) => {
    // updateTenderData("appliedBy", "Stockist");
    // updateTenderData("applierId", selectedOption.value);
    // console.log("selected option ",selectedOption);
  };
  const onStockistSelects = (selectedOption: datalistOptions) => {
    // updateTenderData("appliedBy", "Stockist");
    // updateTenderData("applierId", selectedOption.value);
    // console.log("selected option ",selectedOption);
  };
  const handleAppliedSuppliedFetch = async () => {
    try {
      const res = await fetchData({ url: appliedBySuppliedBy });
      if (res.code === 200) {
        const result = res.result;
        const appliedBys: DsMultiLevelSelectOption[] = result.organization.map(
          (item: any) => ({
            value: item.id + "_" + item.type,
            label: item.name,
          })
        );
        appliedBys.push({
          value: {
            setOptions: setStockistSearchOptions,
            setSearchUrl: (searchTerm: string) =>
              searchCustomerURL + searchTerm,
            onSelect: onStockistSelect,
            id: "AppliedBy",
            selectedOption: selected,
            label: "Search Stockist",
          },
          label: "Stockist",
        });
        setAppliedBy(appliedBys);
        const suppliedBys: DsMultiLevelSelectOption[] = result.organization.map(
          (item: any) => ({
            value: item.id + "_" + item.type,
            label: item.name,
          })
        );
        suppliedBys.push({
          value: {
            setOptions: setStockistSearchOptionss,
            setSearchUrl: (searchTerm: string) =>
              searchCustomerURL + searchTerm,
            onSelect: onStockistSelects,
            id: "SuppliedBy",
            selectedOption: selecteds,
            label: "Search Stockist",
          },
          label: "Stockist",
        });
        setAllSuppliedBy(suppliedBys);
        setSuppliedBy(suppliedBys);
      } else {
        // console.error("Error fetching data: ", res.message || "Unknown error");
      }
    } catch (error) {
      console.error("Fetch error: ", error);
    }
  };
  useEffect(() => {
    handleAppliedSuppliedFetch();
  }, []);
  const handleFetchDepot = async () => {
    await fetchData({
      url: getAllDepots,
    })
      .then((res) => {
        const result = res.result;
        const formatedDepot = result.map((item: any) => ({
          value: item.id.toString(),
          label: item.name,
        }));
        setFormatedDepot(formatedDepot);
        if (res?.code === 200 && res?.result) {
          // console.log("stored depot result:", res.result);
        } else {
          console.error("Error: Invalid data format or empty depot");
        }
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  };
  useEffect(() => {
    handleFetchDepot();
  }, []);

  const handleAppliedBySelect = (
    isDatalistOpt: boolean,
    option: datalistOptions
  ) => {
    console.log(option);
    setSelected(option);
    if (isDatalistOpt) {
      const onlyStockist = allSuppliedBy.filter(
        (opt) => opt.label === "Stockist"
      );
      setSuppliedBy(onlyStockist);
    } else if (typeof option.value === "string") {
      const type = option.value.split("_")[1];
      if (type === "ORGANIZATION") {
        setSuppliedBy(allSuppliedBy);
      } else {
        setSuppliedBy(allSuppliedBy);
      }
    }
  };

  const handleSuppliedBySelects = (
    isDatalistOpt: boolean,
    option: datalistOptions
  ) => {
    console.log(option);
    setSelecteds(option);
  };
  const [selectedDepo, setSelectedDepo] = useState<DsSelectOption[]>([]);
  useEffect(() => {
    const loc = [...tenderData.shippingLocations];
    const depo = loc.map((x) => {
      return (
        formatedDepot.find((d) => Number(d.value) == x) || {
          value: "",
          label: "",
        }
      );
    });
    setSelectedDepo(depo);
  }, [formatedDepot, tenderDataCopy.shippingLocations, tenderData.id]);


  return (
    <div className={deptStyles.container}>
      <div className={styles.inputDetails}>
        <DsSelectMultiLevel
          disable={appliedByDisable}
          containerClasses={styles.fields}
          isSearchable={true}
          options={appliedBy}
          label="Applied by"
          {...(tenderData.id
            ? {
                selectedOption: {
                  attributes: { type: tenderData.applierType },
                  id: "",
                  label: tenderData.tenderDetails.appliedBy,
                },
              }
            : {})}
          placeholder={"Please search or select here"}
          id={"appliedBy"}
          onSelect={handleAppliedBySelect}
          setSelectOption={(isDataListOptions, option) => {
            setSelected(option);
            // console.log("applieridoption", option);
            if (isDataListOptions) {
              updateTenderData("applierId", Number(option.id));
              updateTenderData("applierType", option.attributes.type);
              updateTenderData("tenderDetails.appliedBy", option.value || "");
            } else if (typeof option.value == "string") {
              updateTenderData("applierId", option.value.split("_")[0]);
              updateTenderData("applierType", option.value.split("_")[1]);
              updateTenderData("tenderDetails.appliedBy", option.label || "");
            }
          }}
          isOpen={true}
        ></DsSelectMultiLevel>
        <DsSelectMultiLevel
          containerClasses={styles.fields}
          disable={suppliedDisable}
          isSearchable={true}
          options={suppliedBy}
          {...(tenderData.id
            ? { 
                selectedOption: {
                  attributes: { type: tenderData.supplierType },
                  id: "",
                  label: tenderData.tenderDetails.suppliedBy,
                },
              }
            : {})}
          label="Supplied by"
          placeholder={"Please search or select here"}
          id={"suppliedBy"}
          onSelect={handleSuppliedBySelects}
          setSelectOption={(isDataListOptions, option) => {
            // setSelected(option);
            console.log("applieridoption", option);
            if (isDataListOptions) {
              updateTenderData("supplierId", Number(option.id));
              updateTenderData("supplierType", option.attributes.type);
              updateTenderData("tenderDetails.suppliedBy", option.value || "");
            } else if (typeof option.value == "string") {
              updateTenderData("supplierId", option.value.split("_")[0]);
              updateTenderData("supplierType", option.value.split("_")[1]);
              updateTenderData("tenderDetails.suppliedBy", option.label || "");
            }
          }}
          isOpen={false}
        ></DsSelectMultiLevel>
        <DsMultiSelect
          disable={depotDisable}
          containerClasses={styles.fields}
          selectedOptions={selectedDepo}
          options={formatedDepot}   
          addButton={true}
          // type="multi" 
          label="Depot"
          placeholder={"Select Depots"}
          id={"depot"}
          setSelectOptions={(options) => {
            const shipIds = options.reduce<number[]>((acc, option) => {
              if (typeof option.value === "string") {
                acc.push(parseInt(option.value));
              }
              return acc;
            }, []);
            updateTenderData("shippingLocations", shipIds);
            setSelectedDepo(options);
          }}
        ></DsMultiSelect>
        <div></div>
        <DsTextField
          containerClasses={styles.fields}
          initialValue={tenderData.supplierName}
          label="Stockist / Liasioner Name"
          inputType="text"
          // placeholder="Please type here"
          onBlur={(e) =>
            updateTenderData(
              "supplierName",
              (e.target as HTMLInputElement).value
            )
          }
          disable={stockistNameDisable}
        ></DsTextField>
        <DsTextField
          containerClasses={styles.fields}
          maximumNumber={100}
          initialValue={tenderData.supplierDiscount?.toString()}
          inputType="positive"
          maxLength={5}
          label="Stockist / Liasioner Discount %"
          iconEnd={<pre>{" %"}</pre>}
          // placeholder="Please type here"
          onBlur={(e) =>
            updateTenderData(
              "supplierDiscount",
              Number((e.target as HTMLInputElement).value)
            )
          }
          disable={stockistDiscountDisable}
        ></DsTextField>
      </div>
    </div>
  );
};
export default DsApplierSupplierDetails;
