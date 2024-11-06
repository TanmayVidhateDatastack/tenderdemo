"use client";
import Ds_SummaryCount, {countProps  } from "./DsSummaryCount"
import Ds_SummaryVariation,{countVariationProps} from "./DsSummaryVariation";
import DemoLayout from "@/app/ElProComponents/Demo/demoLayout";

export default function DemoSummaryCount(){
    const count:countProps = {
        Title: "Total Orders",
        Value:'200',

        statusValues: [
            { status: "Draft", value: "10" },
            { status: "Hold", value: "20" },
            { status: "Open", value: "30" },
            { status: "Approved", value: "49" },
            { status: "Cancelled", value: "01" },
            { status: "Ready to Dispatch", value: "20" },
            { status: "Rejected", value: "01" },
            { status: "Deviation Pending", value: "20" },
            { status: "Submitted", value: "20" },
          ],
      };
    const SummaryVariation:countVariationProps = {
        Title: "Total Values",
        Value:'1,22,20,000,00',

        statusValues: [
            { status: "Draft", value: "1200453" },
            { status: "Hold", value: "1300453" },
            { status: "Open", value: "200453" },
            { status: "Approved", value: "1900453" },
            { status: "Cancelled", value: "208453" },
            { status: "Ready to Dispatch", value: "1200453" },
            { status: "Rejected", value: "12004" },
            { status: "Deviation Pending", value: "1232340" },
            { status: "Submitted", value: "20" },
            
          ],
      };

    return(
        <DemoLayout title="Status Summary Count">
          <Ds_SummaryCount  Title={count.Title}  statusValues={count.statusValues}  Value={count.Value}/>
          <Ds_SummaryVariation Title={SummaryVariation.Title} Value={SummaryVariation.Value}  statusValues={SummaryVariation.statusValues}/>
       </DemoLayout>
    );
};