import { useEffect, useState } from "react";
import Accordion from "@/Elements/DsComponents/dsAccordion/accordion";
import Ds_checkbox from "@/Elements/DsComponents/DsCheckbox/dsCheckbox";
import DsButton from "@/Elements/DsComponents/DsButtons/dsButton";
import styles from "./document.module.css";
import fetchData from "@/helpers/Method/fetchData";
import { datalistOptions, DocumentResult, documents } from "@/helpers/types";
import { getAllDocuments } from "@/helpers/constant";
import Image from "next/image";
import searchicon from "@/Icons/smallIcons/searchicon.svg"
import DsTextField from "@/Elements/DsComponents/DsInputs/dsTextField";

const DsAddTenderDocumentPane: React.FC = () => {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [groupedDocuments, setGroupedDocuments] = useState<
    Record<string, documents[]>
  >({});

  const handleAccordionToggle = (type: string) => {
    setOpenAccordion((prevType) => (prevType === type ? null : type));
  };

  const handleFetch = async () => {
    try {
      const res = await fetchData({ url: getAllDocuments });
      if (res.code === 200) {
        const tenderDocuments = res.result.Documents.filter(
          (doc: documents) => doc.category === "TenderDocument"
        );

        const grouped = tenderDocuments.reduce(
          (acc: Record<string, documents[]>, doc: documents) => {
            if (!acc[doc.type]) {   
              acc[doc.type] = [];
            } 
            acc[doc.type].push(doc);
            return acc;
          },
          {}
        );

        setGroupedDocuments(grouped);
      } else {
        console.error("Error fetching data: ", res.message || "Unknown error");
      }
    } catch (error) {
      console.error("Fetch error: ", error);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  return (
   <>
    {/* <DsSearchComponent
     placeholder="Search documents here" 
     iconEnd={<Image src={searchicon} alt="icon" />}
      >
    </DsSearchComponent>   */}
    <div className={styles.padd}>
      <DsTextField
            label="Search document here"
            id="userSelect"
            disable={false}
            initialValue=""
            iconEnd={
              <div
              style={{
                width: "100%",
                  height: "100%",
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
            // onChange={ }
            // onKeyUp={}
            />

        {Object.entries(groupedDocuments).map(([type, docs]) => (  
          <Accordion
          key={type} 
          id={type}
          title={type}
          isOpen={openAccordion === type}
          onToggle={() => handleAccordionToggle(type)}
          >
            <div className={styles.documents}>
              {docs.map((doc) => (
                <Ds_checkbox
                key={doc.id}
                  id={doc.id.toString()}
                  name={doc.documentName}
                  value={doc.id.toString()}
                  label={doc.documentName}
                />
              ))}
            </div> 
          </Accordion>
        ))}
        <div className={styles.SaveBtn}>
          <DsButton className={styles.savebtn} label="Save" />
        </div>
    </div>
  </> 
  );
};  

export default DsAddTenderDocumentPane; 
  