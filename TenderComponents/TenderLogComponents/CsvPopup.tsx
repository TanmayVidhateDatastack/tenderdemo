"use client";
import styles from "./CsvPopup.module.css";
// import Image from "next/image";
// import uploadIcon from "@/Common/SalesIcons/smallIcons/uploadicon.svg";
import { useState } from "react";
import DsPopup from "@/Elements/DsComponents/dsPopup/dsPopup";
import DSButton from "@/Elements/DsComponents/DsButtons/dsButton";

export default function CsvPopup() {
  const [fileName, setFileName] = useState<string>("Attach your File here");

  // Function to handle file selection through the file input
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Get the first selected file
    if (file) {
      setFileName(file.name); //Update state with the name of the selected file
    }
  };

  // Function to handle file drop when the user dragss a file
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      setFileName(file.name); // Update state with  name of the dropped file
    }
  };

  // Function to handle the drag over event to allow file drop
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <DsPopup
        title="Upload CSV File"
        id="csvpopup"
        type="upload"
        position="center"
        size="large"
        className={styles.popup}
      >
        <div className={styles.container}>
          <div>
            <div className={styles.instruction}>
              Instructions for Uploading CSV File
            </div>
            <div className={styles.list}>
              <div className={styles.statusIndicator}>
                <div className={styles.l1}>
                  Please ensure your file is in CSV format (e.g., filename.csv).
                </div>
              </div>
              <div className={styles.statusIndicator}>
                Make sure the column names in your CSV file are correct (e.g.,
                Name, Qty, size).
              </div>
              <div className={styles.statusIndicator}>
                Each column should contain the appropriate data type (e.g.,
                Quantity should have only Numbers).
              </div>
              <div className={styles.statusIndicator}>
                The maximum file size allowed is 20MB.
              </div>
              <div className={styles.statusIndicator}>
                Be mindful of duplicate entries. Each record should be unique.
              </div>
              <div className={styles.statusIndicator}>
                If an error occurs during upload, please read the error message
                carefully and correct it.
              </div>
              <div className={styles.statusIndicator}>
                After the upload, you will receive a confirmation message.
                Please review it to ensure everything is correct.
              </div>
            </div>
          </div>

          <div
            className={styles.footer + " " + styles.attachfile}
            onClick={() => document.getElementById("selectfile")?.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            {fileName} {/* Display the selected file name */}
            <input
              type="file"
              id="selectfile"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </div>
          <div className={styles.footer_menu}>
            <DSButton label="Upload Now" className={styles.uploadbtn} />
          </div>
        </div>
      </DsPopup>
    </>
  );
}
