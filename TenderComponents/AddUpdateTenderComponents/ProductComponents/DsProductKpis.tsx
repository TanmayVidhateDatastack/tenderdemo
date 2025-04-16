"use client";
import link from "@/Common/TenderIcons/smallIcons/link.svg";
import  whitelink from "@/Common/TenderIcons/smallIcons/whitelink.svg";
import linkdisabled from "@/Common/TenderIcons/smallIcons/linkdisabled.svg";
import rupees from "@/Common/TenderIcons/smallIcons/rupee.svg";
import  whiterupee from "@/Common/TenderIcons/smallIcons/whiterupee.svg";
import profile from "@/Common/TenderIcons/smallIcons/profile.svg";
import whiteprofile from "@/Common/TenderIcons/smallIcons/whiteprofile.svg";
import profiledisabled from "@/Common/TenderIcons/smallIcons/profiledisable.svg";
import rupeedisabled from "@/Common/TenderIcons/smallIcons/rupeedisabled.svg";
import profit from "@/Common/TenderIcons/smallIcons/profit.svg";
import whiteprofit from "@/Common/TenderIcons/smallIcons/whiteprofit.svg";
import profitdisabled from "@/Common/TenderIcons/smallIcons/profiledisable.svg";
import DsKpi from "@/Elements/DsComponents/DsKpi/DsKpi";
import Image from "next/image";
import style from "@/app/Tender/[TenderId]/tenderOrder.module.css";
import { marginPercentLimit } from "@/Common/helpers/constant";
import DsCurrency from "@/Elements/DsComponents/dsCurrency/dsCurrency";
import { TenderProduct } from "../TenderDataContextProvider";
 
interface ProductKpiProps {
    productData: TenderProduct[] | null;
}
 
const DsProductKpis: React.FC<ProductKpiProps> = ({ productData: data }) => {
 
    if (!Array.isArray(data)) {
      
        return ;
    }
 
    // Calculate total number of products
    const totalProducts = data.length;
 

    const marginCount = data.filter(item => {
      const margin = Number(item?.product?.marginValue ?? NaN);
    
      return !isNaN(margin) && margin < marginPercentLimit;
    }).length;
    
   
   
   
 
 
    // console.log("Total Products:", totalProducts);
    // console.log("Products with Margin < 30:", marginCount);
 
    const totalNetValueSum = Array.isArray(data)
    ? data.reduce((sum, item) => {
       
       const netValue = item?.product?.netValue ?? null;

 
        // If both qty and netValue are null, skip this row
        if (netValue === null) {
          return sum; // Don't add anything to the sum
        }
 
        // Convert to numbers, defaulting to 0 if invalid
       
        const netValueNum = Number(netValue) || 0;
 
        return sum +  netValueNum;
      }, 0)
    : NaN;
   
    // console.log("totalNetValueSum",totalNetValueSum);
 
    const totalMarginProductSum = Array.isArray(data)
  ? data.reduce((sum, item) => {
      const qty = item?.requestedQuantity ?? null;
      const marginValue = item?.product?.marginValue ?? null;
 
      // If both quantity and marginValue are null, skip this row
      if (qty === null && marginValue === null) {
        return sum; // Don't add anything to the sum
      }
 
      // Convert to numbers, defaulting to 0 if invalid
      const qtyNum = Number(qty) || 0;
      const marginValueNum = Number(marginValue) || 0;
 
      return sum + qtyNum * marginValueNum;
    }, 0)
  : NaN;
 
// console.log("Total Margin Product Sum:", totalMarginProductSum);
 
 
const totalMarginPercentage =
  isNaN(totalMarginProductSum) || isNaN(totalNetValueSum) || totalNetValueSum === 0
    ? NaN
    : (totalMarginProductSum / totalNetValueSum) * 100;
 
// console.log("Total Margin Percentage:", totalMarginPercentage);
 
 
   const totalStockistDiscountSum = Array.isArray(data)
    ? data.reduce((sum, item) => {
        const qty = item?.requestedQuantity?? null;
        const stockistDiscount = item?.supplierDiscount?? null;
 
        // If both qty and netValue are null, skip this row
        if (qty === null && stockistDiscount === null) {
          return sum; // Don't add anything to the sum
        }
 
        // Convert to numbers, defaulting to 0 if invalid
        const qtyNum = Number(qty) || 0;
        const discountValueNum = Number(stockistDiscount) || 0;
 
        return sum + qtyNum * discountValueNum;
      }, 0)
    : NaN;
 
 
    // console.log("totalStockistDiscountSum",totalStockistDiscountSum)
   
    const totalStockistPercentage =
    isNaN(totalStockistDiscountSum) || isNaN(totalNetValueSum) || totalNetValueSum === 0
      ? NaN
      : (totalStockistDiscountSum / totalNetValueSum) * 100;
 
  // console.log("Total Stockist Percentage:", totalStockistPercentage);
   
 
    return (
        <>
       <div  className={style.productkpi}>
      <DsKpi
       quantity={totalProducts.toString()}
        title={"Products"}
        subQuantity={marginCount}
        classForQuantity={"redalert"}
         startIcon={<Image src={link} alt="link" />}
        startIconwhite={<Image src={whitelink} alt="link" />}
         startIcondisable={<Image src={linkdisabled} alt="link" />}
        highlight={false}
      />
       <DsKpi
         quantity={<DsCurrency format={"IND"} id={"netval"} amount={totalNetValueSum} type={"short"} />}
        title={"Net Value"}
        startIcon={<Image src={rupees} alt="link" />}
        startIconwhite={<Image src={whiterupee} alt="link" />}  
        startIcondisable={<Image src={rupeedisabled} alt="link" />}
        highlight={true}
      />
        <DsKpi
          quantity={<DsCurrency format={"IND"} id={"marginsum"} amount={totalMarginProductSum} type={"short"} />}
          // quantity={"45000Cr"}
          title={"Margin"}
          subQuantity={isNaN(totalMarginPercentage) ? "0%" : `${totalMarginPercentage.toFixed(2)}%`}
          startIcon={<Image src={profit} alt="link" />}
          startIconwhite={<Image src={whiteprofit} alt="link" />}
          startIcondisable={<Image src={profitdisabled} alt="link" />}
          highlight={false}
        />
        <DsKpi
      
         quantity={<DsCurrency format={"IND"} id={"stockitssum"} amount={totalStockistDiscountSum} type={"short"} />}
          title={"Stocklist Discount"}
          subQuantity={isNaN(totalStockistPercentage) ? "0%" : `${totalStockistPercentage.toFixed(2)}%`}
          startIcon={<Image src={profile} alt="link" />}
          startIconwhite={<Image src={whiteprofile} alt="link" />}
          startIcondisable={<Image src={profiledisabled} alt="link" />}
          highlight={false}    
        />
 
 
</div>
        </>
    );
};
 
export default DsProductKpis;
 
 
 