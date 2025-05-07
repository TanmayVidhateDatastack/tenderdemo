"use client";
import styles from "./CsvPopup.module.css";
// import Image from "next/image";
// import uploadIcon from "@/Common/SalesIcons/smallIcons/uploadicon.svg";
import React, { useRef, useState } from "react";
import DsPopup, { ClosePopup } from "@/Elements/DsComponents/dsPopup/dsPopup";
import DSButton from "@/Elements/DsComponents/DsButtons/dsButton";
import Toaster from "@/Elements/DsComponents/DsToaster/DsToaster";
import IconFactory from "@/Elements/IconComponent";

interface CsvPopupProps {
  onUpload: (file: File | null) => void;
}

export default function CsvPopup({ onUpload }: CsvPopupProps) {
  const [fileName, setFileName] = useState<string>("Attach your File here");
  const [file, setFile] = useState<File | null>(null); // store the file
  const [message, setMessage] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement | null>(null); // file input ref

  // Function to handle file selection through the file input
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFileName(selectedFile.name);
      setFile(selectedFile); // Save the file
      setMessage("The File has been  attached successfully!");
    }
  };

  // Function to handle file drop when the user dragss a file
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) {
      setFileName(droppedFile.name);
      setFile(droppedFile); // Save the file
      setMessage("The File has been  attached successfully!");
    }
  };

  // Function to handle the drag over event to allow file drop
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleRemoveFile = (e:React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
    setFileName("Attach your File here");
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset input so same file can be selected again
    }
    setMessage("");
  };
  const handleUploadFile = (e: React.MouseEvent) => {
    e.preventDefault();
    onUpload(file); // Call the parent upload handler
  };
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    handleUploadFile(e);
    ClosePopup("csvpopup");
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
            {fileName}
            <input
              type="file"
              accept=".csv"
              id="selectfile"
              style={{ display: "none" }}
              onChange={handleFileChange}
              ref={fileInputRef}
            />
            {file && (
              <div
                style={{ width: "1em", height: "1em" }}
                onClick={handleRemoveFile}
                
              >
                <IconFactory name={"crossSmall"}></IconFactory>
              </div>
            )}
          </div>
          <Toaster
            message={message}
            type="success"
            position="top"
            handleClose={() => {}}
            duration={3000}
          ></Toaster>
          <div className={styles.footer_menu}>
            <DSButton
              label="Upload Now"
              buttonSize="btnSmall"
              onClick={handleClick}
              disable={file === null}
            />
          </div>
        </div>
      </DsPopup>
    </>
  );
}
