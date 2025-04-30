"use client";
import styles from "./CsvPopup.module.css";
import React, { useRef, useState, useEffect } from "react";
import IconFactory from "@/Elements/IconComponent";

interface UploadFileProps {
  uploadLabel?: string;
  id ?: string;
}
const UploadFile: React.FC<UploadFileProps & { id: string }> = ({ uploadLabel, id }) => {
  const [fileName, setFileName] = useState<string>(
    uploadLabel || "Attach your File here"
  );
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (uploadLabel) {
      setFileName(uploadLabel);
    }
  }, [uploadLabel]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFileName(selectedFile.name);
      setFile(selectedFile);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) {
      setFileName(droppedFile.name);
      setFile(droppedFile);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleRemoveFile = () => {
    setFile(null);
    setFileName(uploadLabel || "Attach your File here");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={styles.container}>
      <div
        className={`${styles.footer} ${styles.attachfile}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div  onClick={() => document.getElementById(`selectfile-${id}`)?.click()}>
        {fileName}
        </div>
 
        <input
          type="file"
          id={`selectfile-${id}`}
          style={{ display: "none" }}
          onChange={handleFileChange}
          ref={fileInputRef}
        />
        {file && (
          <div
            style={{ width: "1em", height: "1em" }}
            onClick={handleRemoveFile}
          >
            <IconFactory name={"crossSmall"} />
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadFile;
