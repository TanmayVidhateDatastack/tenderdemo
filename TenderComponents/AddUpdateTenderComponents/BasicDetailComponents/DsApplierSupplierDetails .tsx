import DsTextField from "@/Elements/DsComponents/DsInputs/dsTextField";
import DsMultiSelect, { DsMultiSelectProp } from "@/Elements/DsComponents/dsSelect/dsMultiSelect";

import { useTenderData } from "../TenderDataContextProvider";
import styles from "@/app/Tender/[TenderId]/tenderOrder.module.css";
import deptStyles from "@/TenderComponents/AddUpdateTenderComponents/BasicDetailComponents/deposite.module.css";
import DsSelectMultiLevel from "@/Elements/DsComponents/dsSelect/dsSelectMultiLevel";
import fetchData from "@/Common/helpers/Method/fetchData";
import { useEffect, useState } from "react";
import { appliedBySuppliedBy, getAllDepots } from "@/Common/helpers/constant";
import {datalistOptions, DsMultiLevelSelectOption, DsSelectOption} from "@/Common/helpers/types";
import {searchCustomerURL} from "@/Common/helpers/constant";
type Depot = {
  id: number;
  name: string;
  code: string;
} 
 
const DsApplierSupplierDetails: React.FC = ({}) => { 
  
  const [depotList, setDepotList] = useState<Depot[]>([]); 
  const { updateTenderData } = useTenderData(); 
  const [applierSupplierDetails, setApplierSupplierDetails] = 
    useState<DsMultiLevelSelectOption[]>([]);    
    const [formatedDepot, setFormatedDepot] = useState<DsSelectOption[]>([])

     const [stockiestSearchUrl, setStcokiestSearchUrl] = useState<string>(""); 
     const setStockiestSearchOptions = async (inputValue: string): Promise<DsSelectOption[]> => {
        try { 
          const res = await fetchData({
            url: `${stockiestSearchUrl}?search=${inputValue}`
          });
          if (res.code === 200 && Array.isArray(res.result)) {
            return res.result.map((item: any) => ({
              value: item.id,
              label: item.name
            }));
          }
        } catch (err) {
          console.error("Error fetching stockist options:", err);
        }
        return [];
      };

     const onStockistSelect = (selectedOption: DsSelectOption) => {
      updateTenderData("appliedBy", "Stockist");
      // updateTenderData("applierId", selectedOption.value);  
      console.log("selected option ",selectedOption);  
    };

  const handleAppliedSuppliedFetch = async () => { 
    try { 
      const res = await fetchData({ url: appliedBySuppliedBy }); 
      if (res.code === 200) { 
        const result = res.result; 
        // console.log("appliedbysuppliedby 12131 : ", result); 
  
        const applyBysupplyBy = result.organization.map((item: any) => ({ 
          value: item.id + "_" + item.type,
          label: item.name  
        }));  
        applyBysupplyBy.push({
          value:{  
              setStockiestSearchOptions,   
              setStcokiestSearchUrl, 
              onStockistSelect,
              id: "",     
              selectedOption: [],   
              label: "Search Stockiest"    
          }, 
          label:"Stockiest" 
        })
        // console.log("appliedbysuppliedby 12131 : ", applyBysupplyBy);
        setApplierSupplierDetails(applyBysupplyBy);
      } else {
        console.error("Error fetching data: ", res.message || "Unknown error");
      }
    } catch (error) {
      console.error("Fetch error: ", error);
    }
  };

  useEffect(() => {
    handleAppliedSuppliedFetch();
  },[]); 
   
  const handleFetchDepot = async () => {
    await fetchData({
      url: getAllDepots
    })
      .then((res) => {
        console.log("depot fetched response :", res); // Log the fetched response
        // setDepotList(res.result);
        const result = res.result; 
        const formatedDepot = result.map((item: any) => ({ 
          value: item.id + "_" + item.type,
          label: item.name  
        }));  
        setFormatedDepot(formatedDepot);
        if (res?.code === 200 && res?.result) {
          // if(res?.c)
          console.log("stored depot result:", res.result);
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
    },[]); 

    const handleAppliedBySelect = (option: datalistOptions) => {
    };
    
  return (
    <>
      <div className={styles.inputDetails}>
        <div className={deptStyles.fields}>
          <DsSelectMultiLevel  
            isSearchable
            options={applierSupplierDetails }
            label="Applied By"
            placeholder={"Please search or select here"}
            id={"appliedBy"}
            onSelect={handleAppliedBySelect}
            setSelectOption={(option) => {
              if (typeof option.value == "string") { 
                updateTenderData( 
                  "appliedBy",
                  option.label == "IPCA" ? option.label : "Stockist" 
                );
                updateTenderData("applierId", option.value);
              }
            }} 
          
            // isOpen={true}
          ></DsSelectMultiLevel>
        </div>
        <div className={deptStyles.fields}>
          <DsSelectMultiLevel
            isSearchable
            options={applierSupplierDetails}
            label="Supplied By"
            placeholder={"Please search or select here"}
            id={"suppliedBy"}
            isOpen={true}
            setSelectOption={(option) => {
              if (typeof option.value == "string") {
                updateTenderData(
                  "suppliedBy",
                  option.label == "IPCA" ? option.label : "Stockist"
                );
                updateTenderData("suppliedId", option.value);
              }
            }}
            onSelect={() => {}}
          ></DsSelectMultiLevel>
        </div>
        <div className={deptStyles.fields}> 
          <DsMultiSelect
            options={formatedDepot}
            // type="multi" 
            label="Depot"
            placeholder={"Please search or select here"}
            id={"depot"}  
            setSelectOptions={(options) => {
              updateTenderData(
                "shippingLocations",
                options.reduce<number[]>((acc, option) => {
                  if (typeof option.value === "string") {
                    acc.push(parseInt(option.value)); 
                  } 
                  return acc;
                }, [])
              );
            }}
          ></DsMultiSelect> 
        </div>
        <div></div>
        <div className={deptStyles.fields}>
          <DsTextField
            initialValue=""
            label="Stockist / Liasioner name"
            inputType="text"
            // placeholder="Please type here"
            //  onBlur={(e) => updateTenderData(" ", (e.target as HTMLInputElement).value)}
          ></DsTextField>
        </div>
        <div className={deptStyles.fields}>
          <DsTextField
            maxLength={3}
            minimumNumber={100}
            initialValue=""
            inputType="positive"
            label="Stockist / Liasioner discount %"
            // placeholder="Please type here"
            onBlur={(e) =>
              updateTenderData(
                "supplierDiscount",
                (e.target as HTMLInputElement).value
              )
            } 
          ></DsTextField>
        </div>
      </div>
    </>
  );
};
export default DsApplierSupplierDetails;
