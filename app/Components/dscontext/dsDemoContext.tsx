
import PopUpContext from "./dscontext";
import styles from "../../page.module.css";
export default function DemoContext() {

 
  return (
    <div className={styles.demo}>

    <PopUpContext positionProp="top" showArrow={false} />
    <PopUpContext positionProp="bottom" showArrow={false} />
    <PopUpContext positionProp="left" showArrow={false} />
    <PopUpContext positionProp="right" showArrow={false} />
    <PopUpContext positionProp="bottom" showArrow={true} />
    </div>
        
  );
}
