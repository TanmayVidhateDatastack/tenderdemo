"use client";

import styles from "./CsvPopup.module.css";
import React, { useRef, useState, useEffect } from "react";
import IconFactory from "@/Elements/IconComponent";

interface UploadFileProps {
  uploadLabel?: string;
  id: string;
  disable?: boolean;
  onSelectedFileChange?: (documents: { id?: number; document?: File }[]) => void;
  previouslySelectedFile?: {
    id?: number;
    documentName?: string;
    fileDownloadHref?: string;
  };
}

const UploadFile: React.FC<UploadFileProps> = ({
  uploadLabel,
  id,
  disable = false,
  onSelectedFileChange,
  previouslySelectedFile,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isRemoved, setIsRemoved] = useState<boolean>(false);

const displayFileName = uploadedFile?.name
  || (!isRemoved && previouslySelectedFile?.documentName)
  || uploadLabel
  || "Attach your File here";

    


  useEffect(() => {
    if (onSelectedFileChange) {
      if (uploadedFile) {
        onSelectedFileChange([{ document: uploadedFile }]);
      } else {
        onSelectedFileChange([]);
      }
    }
  }, [uploadedFile]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setUploadedFile(selectedFile);
      setIsRemoved(false);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) {
      setUploadedFile(droppedFile);
      setIsRemoved(false);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setIsRemoved(true);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={styles.container}>
      <div
        className={`${styles.uploadfooter} ${styles.attachfile} ${disable ? styles.disabled : ""}`}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => {
          if (!disable) {
            document.getElementById(`selectfile-${id}`)?.click();
          }
        }}
      >
        <div className={disable ? styles.disabled : ""}>{displayFileName}</div>

        <input
          type="file"
          id={`selectfile-${id}`}
          style={{ display: "none" }}
          onChange={handleFileChange}
          ref={fileInputRef}
          disabled={disable}
        />

        {(uploadedFile || (previouslySelectedFile && !isRemoved)) && (
          <div
            style={{ width: "1em", height: "1em" }}
            onClick={(e) => {
              e.stopPropagation();
              if (!disable) {
                handleRemoveFile();
              }
            }}
          >
            <IconFactory name="crossSmall" />
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadFile;
