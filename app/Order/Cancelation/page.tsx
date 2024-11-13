"use client";
import styles from "../order.module.css";
import pagestyles from "../../page.module.css";

import Image from "next/image";
import Application from "@/app/ElProComponents/ApplicationComponents/Application";

export default function Home() {
  
  return (
    <>
      <Application appTitle={"New Order"} hasPrevious={true}>
        <div className={pagestyles.container}>
          <div className={styles.container}>
          
          </div>
        </div>
      </Application>
    </>
  );
}
