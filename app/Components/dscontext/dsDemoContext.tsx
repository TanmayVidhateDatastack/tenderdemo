
import PopUpContext from "./dscontext";
import DemoLayout from "@/app/ElProComponents/Demo/demoLayout";
export default function DemoContext() {

 
  return (
    <DemoLayout title="DsContext">


    <PopUpContext positionProp="top" showArrow={false} />
    <PopUpContext positionProp="bottom" showArrow={false} />
    <PopUpContext positionProp="left" showArrow={false} />
    <PopUpContext positionProp="right" showArrow={false} />
    <PopUpContext positionProp="bottom" showArrow={true} />
    </DemoLayout>
        
  );
}
