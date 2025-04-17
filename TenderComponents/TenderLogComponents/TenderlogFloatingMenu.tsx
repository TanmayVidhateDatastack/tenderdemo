"use client";
import DsButton from "@/Elements/DsComponents/DsButtons/dsButton";
import { FloatingMenu, displayTableMenu } from "@/Elements/DsComponents/FloatingMenu/dsFloatingMenu";
import { useEffect, useState } from "react";
import Image from "next/image";
import cancle from "@/Common/TenderIcons/smallIcons/cancle.svg";
import lost from "@/Common/TenderIcons/smallIcons/lost.svg";
import awarded from "@/Common/TenderIcons/smallIcons/awarded.svg";
 import version  from "@/Common/TenderIcons/smallIcons/V.svg";
import { changeImage } from "@/Common/helpers/Method/conversion";
import IconFactory from "@/Elements/IconComponent";
import { closeContext } from "@/Elements/DsComponents/dsContextHolder/dsContextHolder";
import { useTenderData } from "../AddUpdateTenderComponents/TenderDataContextProvider";
import fetchData from "@/Common/helpers/Method/fetchData";
import { getCustomerSubmissionDoneByTenderId, getTenderByTenderId } from "@/Common/helpers/constant";
import path from "path";
import style from "./filteractions.module.css";



interface DsTenderTableFloatingMenuProps {
  e: React.MouseEvent<HTMLElement>;
  rowIndex: number;
  statuscell: string;
  handleFetch:()=>Promise<void>;
  tenderId:number;
  goTo:(tenderId:number,status:string)=>void;
}

export const DsTenderTableFloatingMenu: React.FC<DsTenderTableFloatingMenuProps> = ({ e, rowIndex, statuscell ,handleFetch,tenderId,goTo}) => {

    
  console.log("statuscell", statuscell);
  
  const [isFloatingMenuVisible, setIsFloatingMenuVisible] = useState(false);
  const [isCancelBtnVisible, setIsCancelBtnVisible] = useState(false);
  const [isLostBtnVisible, setLostBtnVisible] = useState(false);
  const [isPartiallyAwardedBtnVisible, setIsPartiallyAwardedBtnVisible] = useState(false);
  const [isAwardedBtnVisible, setIsAwardedBtnVisible] = useState(false);
  const [isNewVersionBtnVisible, setIsNewVersionBtnVisible] = useState(false);
  const [isSubmitVisible, setIsSubmitVisible] = useState(false);
  const[customerSubmission , setcustomerSubmission ]=useState<[]>([])
  const [isAwardedWhite, setIsAwardedWhite] = useState<boolean>(false);
  const [isParAwardedWhite, setIsParAwardedWhite] = useState<boolean>(false);
  const[isLostWhite,setIsLostWhite]=useState<boolean>(false);
  const[isCancleWhite,setIsCancletWhite]=useState<boolean>(false);
  const[isVersionWhite,setIsVersionWhite]=useState<boolean>(false);




  useEffect(() => {
    console.log("statuscell on load:", statuscell); // Debugging
  
    if (statuscell === "CANCELLED" || statuscell === "LOST") {
      setIsFloatingMenuVisible(false);
  
    } else {
      setIsFloatingMenuVisible(true);
      setIsCancelBtnVisible(true);
    }
  
    if (statuscell === "TENDER_SUBMITTED") {
      setIsCancelBtnVisible(true);
      setLostBtnVisible(true);
      setIsPartiallyAwardedBtnVisible(true);
      setIsAwardedBtnVisible(true);
      setIsNewVersionBtnVisible(true);
      setIsSubmitVisible(false);

    } else if (statuscell === "APPROVED") {
      setIsCancelBtnVisible(true);
      setIsPartiallyAwardedBtnVisible(true);
      setIsSubmitVisible(true);
      setLostBtnVisible(false);
      setIsAwardedBtnVisible(false);
      setIsNewVersionBtnVisible(false);
   
    } else {
      setIsCancelBtnVisible(true);
      setLostBtnVisible(false);
      setIsPartiallyAwardedBtnVisible(false);
      setIsAwardedBtnVisible(false);
      setIsNewVersionBtnVisible(false);
      setIsSubmitVisible(false);
    }
  }, [statuscell]);
  
  
  useEffect(() => {
    if (isFloatingMenuVisible) {
      
      displayTableMenu(e, "tenderfloatingmenu", "bottom", "center");
    }
    else{

      closeContext("tenderfloatingmenu");
    }
  }, [isFloatingMenuVisible, e, rowIndex]);
  const handleClose = () => {
    console.log("close");
    setIsFloatingMenuVisible(false);
  };


  const handlefetchUpdateTender = async () => {
  const customerSubmission=(userId?:number)=>
    {
          return(
              [
              {
                  op: "replace",
                  path: "/status",
                  value: "TENDER_SUBMITTED"
              },
              {
                  op: "replace",
                  path: "/lastUpdatedBy",
                  value: userId||3
              }
          ]
            )
    }

    await fetchData({
      url: getCustomerSubmissionDoneByTenderId,
      method: "PATCH",	
      dataObject: JSON.stringify(customerSubmission),

    })
      .then((res) => {
        if (res?.code === 200 && res?.result) {
       handleFetch();
        } else {
          console.error("Error");
        }
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  };

  // const handlefetchgetTenderByTenderId = async (status:string) => {
  
  //     await fetchData({
  //       url: getTenderByTenderId,
  //       method: "PATCH",	
  //       headers: {
  //         "x-contract-type": status,
  //       },
  //     })
  //       .then((res) => {
  //         if (res?.code === 200 && res?.result) {
        
  //         } else {
  //           console.error("Error");
  //         }
  //       })
  //       .catch((err) => {
  //         console.error("Error fetching data:", err);
  //       });
  //   };


    
  const handleFloatingMenuBtnClick = (status:string) => {
 
   const Id= tenderId;
    if (tenderId) {
      goTo(Number(tenderId),status);
    } else {
      console.warn("TenderId not found on double-clicked row");
    }
  };
  
  return (
    <FloatingMenu selected={1} id={"tenderfloatingmenu"} onCloseClick={handleClose}>

      <>
        {isCancelBtnVisible && (
          <DsButton id="deleteBtn" buttonColor="btnWarning" buttonViewStyle="btnContained" 
          startIcon={
            <div style={{ width:"1em",height:"1em" }}>
             
             <IconFactory name={"crossCircle"} isWhite={isCancleWhite} className={style.crosscirclered} ></IconFactory>
            </div>
          }
          onHover={() => {
            setIsCancletWhite(true);
           
          }}
          onMouseLeave={() => {
            setIsCancletWhite (false);
          
          }}
          label="Tender Cancelled" 
        />
          
        )}
        {isLostBtnVisible && (
          <DsButton id="Signbtn" buttonColor="btnPrimary" buttonViewStyle="btnContained"
          className={style.tenderlost}
          startIcon={
            <div style={{ width:"1em",height:"1em" }}>
             
             <IconFactory name={"crossCircle"} isWhite={isLostWhite} className={style.crosscircle} ></IconFactory>
            </div>
          }
          onHover={() => {
            setIsLostWhite(true);
           
          }}
          onMouseLeave={() => {
            setIsLostWhite(false);
          
          }}
          label="Tender Lost" 
          onClick={() => handleFloatingMenuBtnClick("LOST")}
/>
        )}
        {isPartiallyAwardedBtnVisible && (
   
          <DsButton id="InvoiceBtn"  
           buttonColor= "btnPrimary"
           className={style.awardedbtn}
        buttonViewStyle="btnContained" 
          startIcon={
            <div style={{ width:"1em",height:"1em"}}>
             
             <IconFactory name={"awarded"} isWhite={isParAwardedWhite} ></IconFactory>
            </div>
          }
          onHover={() => {
            setIsParAwardedWhite(true);
            // changeImage(e, addIconWhite);
          }}
          onMouseLeave={() => {
            setIsParAwardedWhite(false);

            // changeImage(e, addIcon);
          }}
      
          label="Partially Awarded"
          onClick={() => handleFloatingMenuBtnClick("PARTIALLY_AWARDED")}/>
        )}
        {isAwardedBtnVisible && (
          <DsButton id="packinglistBtn"     
          buttonColor="btnPrimary"
        buttonViewStyle="btnContained" 
        className={style.awardedbtn}
        startIcon={
          <div style={{ width:"1em",height:"1em"}}>
           
           <IconFactory name={"awarded"} isWhite={isAwardedWhite} ></IconFactory>
          </div>
        }
        onHover={() => {
          setIsAwardedWhite(true);
          // changeImage(e, addIconWhite);
        }}
        onMouseLeave={() => {
          setIsAwardedWhite(false);

          // changeImage(e, addIcon);
        }}
    
          label="Awarded" 
          onClick={() => handleFloatingMenuBtnClick("AWARDED")}/>
        )}
        {isNewVersionBtnVisible && (
          <DsButton id="BillBtn"     buttonColor="btnPrimary"
        buttonViewStyle="btnContained" 
        className={style.awardedbtn}
          startIcon={
            <div style={{width:"1em",height:"0.5em"}}>
           <IconFactory name={"version"} isWhite={isVersionWhite}></IconFactory>
            </div>
          }
       
          onHover={() => {
            setIsVersionWhite(true);
            // changeImage(e, addIconWhite);
          }}
          onMouseLeave={() => {
            setIsVersionWhite(false);
  
            // changeImage(e, addIcon);
          }}
          label="Create New Version" />
        )}
        {isSubmitVisible && (
          <DsButton id="submit"     buttonColor="btnPrimary"
        buttonViewStyle="btnContained" 
        className={style.awardedbtn}
          // startIcon={
          //   <div
          //     style={{
          //       width: "1.125em",
          //       height: "1.125em",
          //       position: "relative",
          //     }}
          //   >
          //     <Image
          //       src={lost}
          //       alt="Add Icon"
          //       layout="fill"
          //       objectFit="cover"
          //     />
          //   </div>
          // }
      
          // onMouseLeave={(e) => {
          //   changeImage(e, lost);
        
          label="Customer Submission Done" 
          onClick={(e)=>handlefetchUpdateTender}
          
          
          />
        )}
      </>
    </FloatingMenu>
  );
};

export default DsTenderTableFloatingMenu;
