import React, { useState } from "react";
import Modal from "react-modal";
import { useDropzone } from "react-dropzone";
import { X } from "lucide-react";
import { Paperclip } from "lucide-react";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "80%",
    width: "500px", // Adjust width as needed
    maxHeight: "80%",
    overflowY: "auto", // Enable scrolling if content exceeds modal height
  },
};

const FileUploadModal = ({ isOpen, onClose, onSubmit }) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*, .pdf, .doc, .docx",
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, type, files });
  };

  const handleCancel = () => {
    onClose(); // Close the modal without submitting
    setName("");
    setType("");
    setFiles([]);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Attached Project Documents"
    >
      <div className="p-4">
        <div className=" mb-4 text-sm bg-[#1273d2] text-white p-4 rounded-md flex justify-between">
          <span>Attached Project Documents</span>{" "}
          <span>
            {" "}
            <X onClick={handleCancel} />
          </span>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between">
            <div className="mb-4 mr-2">
              <label className="block text-[12px] font-medium text-gray-700 rounded-sm">
                Document Name/Number
              </label>
              <input
                type="text"
                className="mt-1 p-2 border border-gray-300 rounded-sm w-full h-[24px]"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-[12px] font-medium text-gray-700 rounded-sm">
                Document Type
              </label>
              <input
                type="text"
                className="mt-1 p-2 border border-gray-300 rounded-sm w-full h-[24px]"
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="flex">
            <Paperclip className="w-[14px]" />{" "}
            <span className="ml-2 text-[12px]">Attactment</span>
          </div>
          <div className="mb-4 border  h-[100px] justify-center flex text-center items-center ">
            <div {...getRootProps({ className: "dropzone" })}>
              <input {...getInputProps()} />
              <div className=" rounded-md flex text-center items-center text-sm text-white py-3 px-5 bg-[#1273d2] w-[170px]  ">
                Browse Document
              </div>
              <p className="text-[8px] py-2">
                Upload Proof or drag & drop proof image files here
              </p>
            </div>
          </div>
          <div className="w-full  flex justify-between">
            <button
              type="submit"
              className="w-[526px] px-4 py-2 text-white bg-blue-500  rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 flex justify-center"
            >
              <span>
                <Paperclip className="w-[18px]" />
              </span>
              <span className="text-sm pl-4">Upload Attachment</span>
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default FileUploadModal;
