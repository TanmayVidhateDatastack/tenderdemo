"use client";
import styles from "./CsvPopup.module.css";
import React, { useRef, useState, useEffect } from "react";
import IconFactory from "@/Elements/IconComponent";
interface UploadFileProps {
  onRemoveFiles?: (documentName: string) => void;
  onAddFiles?: (
    documents: {
      documentName?: string;
      document?: File;
    }[]
  ) => void;
  uploadLabel?: string;
  id: string;
  disable?: boolean;
  previouslySelectedFile?: {
    id?: number;
    documentName?: string;
    fileDownloadHref?: string;
  };
}
const UploadFile: React.FC<UploadFileProps> = ({
  onRemoveFiles,
  onAddFiles,
  uploadLabel,
  id,

  disable = false,
  previouslySelectedFile,
}) => {
  const [fileName, setFileName] = useState<string>(
    uploadLabel || "Attach your File here"
  );
  const [file, setFile] = useState<File | null>(null);

  const [hasManuallyChangedFile, setHasManuallyChangedFile] = useState(false);
  const [prevFile, setPrevFile] = useState<
    typeof previouslySelectedFile | null
  >(previouslySelectedFile || null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (uploadLabel) {
      setFileName(uploadLabel);
    }
  }, [uploadLabel]);

  useEffect(() => {
    if (!hasManuallyChangedFile && previouslySelectedFile) {
      setPrevFile(previouslySelectedFile);
      setFile(null);
      setFileName(
        previouslySelectedFile.documentName ||
          uploadLabel ||
          "Attach your File here"
      );
    }
  }, [previouslySelectedFile, uploadLabel, hasManuallyChangedFile]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFileName(selectedFile.name);
      setFile(selectedFile);
      setPrevFile(null);
      setHasManuallyChangedFile(true);
    }
    if (onAddFiles && selectedFile) {
      onAddFiles([
        {
          documentName: selectedFile.name,
          document: selectedFile,
        },
      ]);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) {
      setFileName(droppedFile.name);
      setFile(droppedFile);
      setPrevFile(null);
      setHasManuallyChangedFile(true);
    }
    if (onAddFiles) {
      onAddFiles([
        {
          documentName: droppedFile.name,
          document: droppedFile,
        },
      ]);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleRemoveFile = () => {
    if (file && onRemoveFiles) {
      onRemoveFiles(file.name);
    } else if (prevFile && prevFile.documentName && onRemoveFiles) {
      onRemoveFiles(prevFile.documentName);
    }
    setFile(null);
    setPrevFile(null);
    setFileName(uploadLabel || "Attach your File here");
    setHasManuallyChangedFile(true);
  };

  return (
    <div className={styles.container}>
      <div
        className={`${styles.uploadfooter} ${styles.attachfile} ${
          disable ? styles.disabled : ""
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() =>
          !disable && document.getElementById(`selectfile-${id}`)?.click()
        }
      >
        <div className={disable ? styles.disabled : ""}>
          {file ? (
            <a
              href={URL.createObjectURL(file)}
              download={file.name}
              className={styles.document_Link}
              onClick={(e) => e.stopPropagation()}
            >
              {fileName}
            </a>
          ) : prevFile ? (
            prevFile.fileDownloadHref ? (
              <a
                href={prevFile.fileDownloadHref}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.document_Link}
                onClick={(e) => e.stopPropagation()}
              >
                {prevFile.documentName}
              </a>
            ) : (
              prevFile.documentName || fileName
            )
          ) : (
            fileName
          )}
        </div>
        <input
          type="file"
          id={`selectfile-${id}`}
          style={{ display: "none" }}
          onChange={handleFileChange}
          ref={fileInputRef}
          disabled={disable}
        />

        {(file || prevFile) && (
          <div
            style={{ width: "1em", height: "1em" }}
            onClick={(e) => {
              if (!disable) handleRemoveFile();
              e.stopPropagation();
            }}
          >
            <IconFactory name={"crossSmall"} />
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadFile;
