import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Paperclip } from 'lucide-react';
import { uploadIcon } from '@/assets/Icons';
import { toast } from 'react-toastify';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const MAX_FILE_SIZE_MB = 5; 
const ACCEPTED_FILE_TYPES = {
  'image/jpeg': ['.jpeg', '.jpg'],
  'image/png': ['.png'],
  'application/pdf': ['.pdf'],
  'application/msword': ['.doc'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [
    '.xls',
    '.xlsx',
  ],
};

const FileUploadModal = ({ isOpen, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [lastModified, setLastModified] = useState('');
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: ACCEPTED_FILE_TYPES,
    maxSize: MAX_FILE_SIZE_MB * 1024 * 1024, // Convert MB to bytes
    onDrop: (acceptedFiles, rejectedFiles) => {
      // Check for errors
      if (rejectedFiles.length > 0) {
        const errorFile = rejectedFiles[0];
        if (errorFile.errors) {
          if (errorFile.errors[0].code === 'file-invalid-type') {
            setError(
              'Invalid file type. Supported types are: jpg, jpeg, png, docx, pdf, xls.'
            );
          } else if (errorFile.errors[0].code === 'file-too-large') {
            setError(
              `File is too large. Maximum size is ${MAX_FILE_SIZE_MB} MB.`
            );
          }
        }
        return; // Skip updating files if there's an error
      }

      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        // setSelectedFiles([file]);
        setSelectedFiles((prevFiles) => [...prevFiles, file]);
        setName(file.name);
        setType(file.type);
        setFiles([
          {
            name: file.name,
            type: file.type,
            size: file.size,
            lastModified: file.lastModified,
            preview: URL.createObjectURL(file),
          },
        ]);
        setLastModified(file.lastModified);
        setError(''); // Clear error message on successful file selection
      }
    },
  });

  const handleNameUpdate = (e) => {
    const value = e.target.value;
    setName(value);
    setFiles((prev) =>
      prev.map((file) => ({
        ...file,
        name: value,
      }))
    );
  };

  const handleTypeUpdate = (e) => {
    const value = e.target.value;
    setType(value);
    setFiles((prev) =>
      prev.map((file) => ({
        ...file,
        type: value,
      }))
    );
  };

  const handleSubmit = () => {
    // e.preventDefault();

    if (!name || !type) {
      toast.error(
        'Please fill in both the Document Name/Number and Document Type fields before uploading.'
      );
      return;
    }

    if (files.length === 0) {
      toast.error('Please upload a file before submitting.');
      return;
    }

    // Validate if there's a callback function provided
    if (typeof onSubmit === 'function') {
      onSubmit({ name, type, files, selectedFiles }); // Ensure files include metadata
    } else {
      console.error('onSubmit is not a function');
    }
    handleCancel(); // Close the modal after submission
  };

  const handleCancel = () => {
    onClose();
    setName('');
    setType('');
    setFiles([]);
    setLastModified('');
    setError('');
  };
  const updatedFiles = files.map((file) => ({
    ...file,
    name,
    type,
    lastModified,
  }));

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Attached Documents</DialogTitle>
        </DialogHeader>
        <div className="">
          <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            <div className="upload-wrap border">
              <div>{uploadIcon({ width: 40, height: 40 })}</div>
              <div className="desc heading-700-22">Upload Image/Document</div>
              <div className="heading-400-12">or drag & drop the file here</div>
              <div
                className="upload-btn heading-400-12"
                style={{ cursor: 'pointer' }}
              >
                BROWSE FILE
              </div>
              <div className="heading-400-10 upload-bottom-message">
                Supported File Format: jpg, jpeg, png, docx, pdf, xlxs, xls (up
                to {MAX_FILE_SIZE_MB} MB)
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="py-4 pr-3 md:w-1/2">
              <Label htmlFor={'name'}>Document Name/Number</Label>
              <Input
                type="text"
                id={'name'}
                name={'name'}
                value={name}
                onChange={handleNameUpdate}
                placeholder={'Enter document name/number'}
              />
              {/* <input
                labelName="Document Name/Number"
                placeholder="Enter document name/number"
                name="name"
                // type="text"
                value={name}
                onChange={handleNameUpdate}
              /> */}
            </div>
            <div className="py-4 pl-3 md:w-1/2">
              <Label htmlFor={'type'}>Document Type</Label>
              <Input
                // labelName="Document Type"
                placeholder="Enter document type"
                name="type"
                value={type}
                // disabled={true}
                onChange={handleTypeUpdate}
              />
            </div>
          </div>
          {error && <div className="text-red-500 mt-2">{error}</div>}
          {updatedFiles.length > 0 && (
            <div className="mt-4 flex align-middle justify-between">
              <h3 className="text-lg font-semibold">File Size:</h3>
              <ul>
                {updatedFiles.map((file, index) => (
                  <div key={index} className="flex justify-between py-1">
                    {/* <div>
                      {file.name} ({file.type})
                    </div> */}
                    <div>{(file.size / 1024).toFixed(2)} KB</div>
                  </div>
                ))}
              </ul>
            </div>
          )}
          <div className="w-full flex justify-center mt-5 mb-0">
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 flex justify-center"
              onClick={handleSubmit}
            >
              <div className="flex justify-center items-center">
                <div>
                  <Paperclip className="w-[18px]" />
                </div>
                <div className="text-sm pl-4">Upload Attachment</div>
              </div>
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FileUploadModal;
