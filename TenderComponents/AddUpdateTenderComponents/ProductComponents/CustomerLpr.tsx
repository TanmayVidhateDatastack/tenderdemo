import DsButton from "@/Elements/DsComponents/DsButtons/dsButton"
import DsTextField from "@/Elements/DsComponents/DsInputs/dsTextField"
import lprSelectedSVG from "@/Icons/smallIcons/lprSelected.svg";
import lprSVG from "@/Icons/smallIcons/lpr.svg";
import Image from "next/image";
import { useState } from "react";
import { useTenderData } from "../TenderDataContextProvider";

export interface CustomerLPRProps{
    index:number;
    lprValue?:string;
    lprTo?:
}
const CustomerLPR: React.FC<CustomerLPRProps> = ({}) => {
    const [isLPR, setIsLpr] = useState<boolean>(false);
    return <>
        <DsTextField />
        <DsButton>{isLPR ? <Image src={lprSelectedSVG} alt="LprValue" /> : <Image src={lprSVG} alt="" />}</DsButton>

    </>
}
