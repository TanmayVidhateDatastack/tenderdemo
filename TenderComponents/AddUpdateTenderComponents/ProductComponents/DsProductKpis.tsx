"use client";
 
import { TenderProduct } from "@/Common/helpers/types";
 
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
import DsKpl from "@/Elements/DsComponents/DsKpl/DsKpl";
import Image from "next/image";
import style from "@/app/Tender/[TenderId]/tenderOrder.module.css";
import { marginPercentLimit } from "@/Common/helpers/constant";
import DsCurrency from "@/Elements/DsComponents/dsCurrency/dsCurrency";
 
interface ProductKpiProps {
    productData: TenderProduct[] | null;
}
 
const DsProductKpis: React.FC<ProductKpiProps> = ({ productData: data }) => {
    if (!Array.isArray(data)) {
        console.error("Invalid data format:", data);
        return ;
    }
 
    // Calculate total number of products
    const totalProducts = data.length;
 
    // Count margin values < 30
 
   
 
    const marginCount = data.filter(item => {
        const margin = Number(item?.marginValue ?? NaN);
        console.log(`Checking margin: ${margin}, Condition: ${margin < marginPercentLimit}`);
        return !isNaN(margin) && margin < marginPercentLimit;
    }).length;
   
    console.log("Final Margin Count:", marginCount);
   
 
 
    console.log("Total Products:", totalProducts);
    console.log("Products with Margin < 30:", marginCount);
 
    const totalNetValueSum = Array.isArray(data)
    ? data.reduce((sum, item) => {
       
        const netValue = item?.netValue ?? null;
 
        // If both qty and netValue are null, skip this row
        if (netValue === null) {
          return sum; // Don't add anything to the sum
        }
 
        // Convert to numbers, defaulting to 0 if invalid
       
        const netValueNum = Number(netValue) || 0;
 
        return sum +  netValueNum;
      }, 0)
    : NaN;
   
    console.log("totalNetValueSum",totalNetValueSum);
 
    const totalMarginProductSum = Array.isArray(data)
  ? data.reduce((sum, item) => {
      const qty = item?.quantity ?? null;
      const marginValue = item?.marginValue ?? null;
 
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
 
console.log("Total Margin Product Sum:", totalMarginProductSum);
 
 
const totalMarginPercentage =
  isNaN(totalMarginProductSum) || isNaN(totalNetValueSum) || totalNetValueSum === 0
    ? NaN
    : (totalMarginProductSum / totalNetValueSum) * 100;
 
console.log("Total Margin Percentage:", totalMarginPercentage);
 
 
   const totalStockistDiscountSum = Array.isArray(data)
    ? data.reduce((sum, item) => {
        const qty = item?.quantity ?? null;
        const stockistDiscount = item?.stockistDiscount?? null;
 
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
 
 
    console.log("totalStockistDiscountSum",totalStockistDiscountSum)
   
    const totalStockistPercentage =
    isNaN(totalStockistDiscountSum) || isNaN(totalNetValueSum) || totalNetValueSum === 0
      ? NaN
      : (totalStockistDiscountSum / totalNetValueSum) * 100;
 
  console.log("Total Stockist Percentage:", totalStockistPercentage);
   
 
 
 
    return (
        <>
        <div  className={style.productkpi}>
      <DsKpl
       quantity={totalProducts.toString()}
        title={"Products"}
        Subquantity={marginCount}
        classForQuantity={"redalert"}
         startIcon={<Image src={link} alt="link" />}
        startIconwhite={<Image src={whitelink} alt="link" />}
         startIcondisable={<Image src={linkdisabled} alt="link" />}
        Highlight={false}
      />
       <DsKpl
       // quantity={isNaN(totalNetValueSum) ? "NaN Cr" : `${(totalNetValueSum / 10000000).toFixed(0)} Cr`}
    //    quantity={<DsCurrency format={"IND"} id={"netval"} amount={totalNetValueSum} type={"short"} unit={"Cr"}/>}
       quantity={<DsCurrency format={"IND"} id={"netval"} amount={totalNetValueSum} type={"short"} />}
       title={"Net Value"}
        startIcon={<Image src={rupees} alt="link" />}
        startIconwhite={<Image src={whiterupee} alt="link" />}  
        startIcondisable={<Image src={rupeedisabled} alt="link" />}
        Highlight={false}
      />
        <DsKpl
        //   quantity={<DsCurrency format={"IND"} id={"marginsum"} amount={totalMarginProductSum} type={"short"} unit={"Cr"}/>}
          quantity={<DsCurrency format={"IND"} id={"marginsum"} amount={totalMarginProductSum} type={"short"} />}
          title={"Margin"}
          Subquantity={isNaN(totalMarginPercentage) ? "NaN%" : `${totalMarginPercentage.toFixed(2)}%`}
          startIcon={<Image src={profit} alt="link" />}
          startIconwhite={<Image src={whiteprofit} alt="link" />}
          startIcondisable={<Image src={profitdisabled} alt="link" />}
          Highlight={true}
        />
        <DsKpl
        //  quantity={<DsCurrency format={"IND"} id={"stockitssum"} amount={totalStockistDiscountSum} type={"short"} unit={"Cr"}/>}
         quantity={<DsCurrency format={"IND"} id={"stockitssum"} amount={totalStockistDiscountSum} type={"short"} />}
          title={"Stocklist Discount"}
          Subquantity={isNaN(totalStockistPercentage) ? "NaN%" : `${totalStockistPercentage.toFixed(2)}%`}
          startIcon={<Image src={profile} alt="link" />}
          startIconwhite={<Image src={whiteprofile} alt="link" />}
          startIcondisable={<Image src={profiledisabled} alt="link" />}
          Highlight={false}    
        />
 
 
</div>
        </>
    );
};
 
export default DsProductKpis;
 
 
 