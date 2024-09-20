import React, { useState } from "react";

import { detailsIcon, uploadIcon } from "../../../assets/Icons";
import "./DocumentUploder.css";
const DocumentUploder = ({ id, title, message, btnText, bottomMessage }) => {
  const [uploadFiles, setUploadFiles] = useState([]);
  const handleBrowse = () => {
    document.querySelector(`.upload-file-${id}`).value = "";
    document.querySelector(`.upload-file-${id}`).click();
  };
  const handleFileChange = async (files) => {
    if (!files.length) {
      return;
    }
    setUploadFiles((prevFiles) => [...prevFiles, ...files]);
  };


  const onDropHandler = (e) => {
    e.preventDefault();

    handleFileChange(e.dataTransfer.files);
  };
  const onDragOverHandler = (e) => {
    e.preventDefault();
  
  };

  return (
    <>
      <div
        className="upload-wrap"
        key={id}
        onDragOver={onDragOverHandler}
        onDrop={onDropHandler}
      >
        {!uploadFiles.length > 0 && (
          <>
            <div>{uploadIcon({ width: 40, height: 40 })}</div>
            <div className="desc heading-700-22">{title}</div>
            <div className="heading-400-12">{message}</div>
            <div>
              <button
                className="upload-btn heading-400-12"
                onClick={handleBrowse}
              >
                {btnText}
              </button>
            </div>
            <div className="heading-400-10 upload-bottom-message">
              {bottomMessage}
            </div>
          </>
        )}
        {uploadFiles.length > 0 && (
          <div className="uploading-wrap">
            {uploadFiles.map((uploadFile, index) => (
              <div className="uploading-item" key={index}>
                <div className="del-img">+</div>
                <div className="uploded-img-container">
                  <img
                    className="uploded-img"
                    src={URL.createObjectURL(uploadFile)}
                    alt={uploadFile.name}
                  />
                </div>

              
              </div>
            ))}

            <div
              className="uploading-item curser-pointer"
              onClick={handleBrowse}
            >
              <div className="heading-300-32 c-gray4">+</div>
              <div className="heading-500-16 c-gray4">Add More</div>
            </div>
          </div>
        )}
      </div>
      <input
        type="file"
        name="file"
        key={id}
        className={`upload-file upload-file-${id}`}
        onChange={(e) => handleFileChange(e.target.files)}
        multiple
      />
    </>
  );
};

export default DocumentUploder;
