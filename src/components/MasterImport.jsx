import React, { useState, useCallback, useRef, useEffect } from 'react';
import { postFileApi } from '@/services/method';
import { APIS } from '@/constants/api.constant';
import uploadImg from '../../public/assets/images/upload-file-img.png';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';
import { CloseIcon } from '@/assets/Icons';
import canvasDatagrid from 'canvas-datagrid';
import SpreadsheetIcon from '@/assets/images/google-sheets-icon.svg';
import { toast } from 'react-toastify';
import { Button } from './ui/button';

const ImportPage = ({ routeId, setShowModal }) => {
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [fileContent, setFileContent] = useState([]);
  const gridRef = useRef(null);

  useEffect(() => {
    if (gridRef.current) {
      const grid = canvasDatagrid({
        parentNode: gridRef.current,
        editable: false,
      });
      grid.data = fileContent;
    }
  }, [fileContent]);

  const getApiEndpoint = () => {
    switch (routeId) {
      case 'depot':
        return {
          endPoint: APIS.DEPOT_BULK_UPLOAD,
          sheetData: [
            {
              No: '',
              'Short Name': '',
              Region: '',
              'Depot Name': '',
              District: '',
            },
          ],
        };
      case 'state':
        return {
          endPoint: APIS.STATE_BULK_UPLOAD,
          sheetData: [
            {
              id: '',
              'State Name': '',
              country: '',
            },
          ],
        };
      case 'district':
        return {
          endPoint: APIS.DISTRICT_BULK_UPLOAD,
          sheetData: [
            {
              'S no': '',
              Country: '',
              'State Name': '',
              'District Name': '',
            },
          ],
        };
      case 'dhaba':
        return {
          endPoint: APIS.DHABA_BULK_UPLOAD,
          sheetData: [
            {
              No: '',
              'Dhaba Name': '',
              'State Name': '',
              'Region Name': '',
              'Depot Name': '',
              Category: '',
              'Short Name': '',
              'District Name': '',
            },
          ],
        };
      case 'region':
        return {
          endPoint: APIS.REGION_BULK_UPLOAD,
          sheetData: [
            {
              No: '',
              State: '',
              District: '',
              Region: '',
              'Make sure the district are comma "," seperated': '',
            },
          ],
        };
      case 'busStop':
        return { endPoint: APIS.BUS_STOP_BULK_UPLOAD, sheetData: [] };
      default:
    }
  };

  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      setLoading(true);
      const endpoint = getApiEndpoint().endPoint;

      const response = await postFileApi(endpoint, formData);

      setShowModal(false);

      toast.success('Data Uploaded Successfully');
      setLoading(false);
    } catch (error) {
      console.error(`Error while uploading ${routeId}`, error);
      setLoading(false);
    }
  };
  const handleDownload = () => {
    const sheetData = getApiEndpoint().sheetData;
    const worksheet = XLSX.utils.json_to_sheet(sheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Generate buffer
    const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    // Create a Blob from the buffer
    const blob = new Blob([buffer], { type: 'application/octet-stream' });

    // Create a download link and click it programmatically
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${routeId}-sample-spreadsheet.xlsx`;
    link.click();
    URL.revokeObjectURL(link.href);
  };
  const handleFilePreview = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      const uploadedHeaders = json[0].map((header) => header.trim()); // Trim the headers from the uploaded file
      const validHeaders = Object.keys(getApiEndpoint().sheetData[0]).map(
        (header) => header.trim()
      ); // Trim the expected headers

      if (uploadedHeaders.length !== validHeaders.length) {
        toast.error(
          'Excel Sheet does not follow the correct format, please download the sample file and try again'
        );
        return;
      }
      for (let i = 0; i < validHeaders.length; i++) {
        if (uploadedHeaders[i] !== validHeaders[i]) {
          toast.error(
            'Excel Sheet does not follow the correct format, please download the sample file and try again'
          );
          return;
        }
      }
      const dataJson = XLSX.utils.sheet_to_json(worksheet);
      setFileContent(dataJson);
    };
    reader.readAsArrayBuffer(file);
  };
  const handleUploadButtonClick = () => {
    handleFileUpload(previewUrl);
  };
  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setPreviewUrl(file);
        handleFilePreview(file);
      } else {
        console.error('No file selected');
      }
    },
    [routeId]
  );

  const clearFile = () => {
    setPreviewUrl(null);
    setFileContent([]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      className="global-import-modal flex flex-col align-middle"
      onClick={() => setShowModal(false)}
    >
      <div
        className=" bg-white border-2 border-slate-500 outline-1"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between w-100">
          <div className="p-3">
            <b>Import Data</b>
          </div>
          <div className="p-3" onClick={() => setShowModal(false)}>
            <CloseIcon width={20} height={20} />
          </div>
        </div>
        <div className="flex flex-col items-center gap-y-10 p-7">
          <div
            style={{
              border: '2px dashed #cccccc',
              padding: '1rem',
              textAlign: 'center',
              width: '85vh',
              height: 'auto',
              backgroundColor: isDragActive ? '#00850026' : '#f5f5f5',
            }}
          >
            <div className="flex items-center justify-evenly">
              <img src={SpreadsheetIcon} height={35} width={35} />
              <b className="">Download Sample File</b>
              <Button
                type="submit"
                label="Download"
                onClick={() => handleDownload()}
              >
                Download
              </Button>
            </div>
          </div>
          <div style={{ marginBottom: '0.8rem' }}>
            {fileContent.length === 0 && (
              <div
                {...getRootProps()}
                style={{
                  border: '2px dashed #cccccc',
                  display: 'flex',
                  flexDirection: '',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                  padding: '1rem',
                  textAlign: 'center',
                  cursor: 'pointer',
                  width: 'auto',
                  height: 'auto',
                  backgroundColor: isDragActive ? '#00850026' : '#f5f5f5',
                }}
              >
                <input {...getInputProps()} style={{ display: 'none' }} />
                {isDragActive ? (
                  <p>
                    <img src={uploadImg} alt="upload" height={80} width={80} />
                    <b>Drop the file here.</b>
                  </p>
                ) : (
                  <>
                    <img src={uploadImg} alt="upload" height={80} width={80} />
                    <p>
                      <b>Must be .xlsx file using our excel template</b>
                    </p>
                  </>
                )}
              </div>
            )}
            {fileContent.length > 0 && (
              <>
                <div
                  ref={gridRef}
                  className="myGridStyle"
                  style={{
                    border: '1px solid #ccc',
                    width: '100vh',
                    height: '50vh',
                    overflow: 'auto',
                  }}
                ></div>
                <div className="flex justify-around mt-5">
                  <Button
                    type="submit"
                    onClick={() => {
                      handleUploadButtonClick();
                      setLoading(true);
                      setPreviewUrl(null);
                      setFileContent([]);
                    }}
                  >
                    Upload
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading}
                    onClick={() => {
                      clearFile();
                      setLoading(false);
                    }}
                  >
                    Dump File
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportPage;
