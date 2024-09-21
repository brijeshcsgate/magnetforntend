// import { uploadIcon } from '@/assets/Icons';
// import HttpFileClient from '@/services/HttpFileClient';
// import { parseFileNameFromUrl } from '@/utils/s3Helper';
// import { useField, useFormikContext } from 'formik';
import './FormikDocumentUploder.css';
// import { useState } from 'react';

// const FormikDocumentUploder = ({
//   id,
//   title,
//   message,
//   btnText,
//   bottomMessage,
//   name,
//   isSingle,
//   ...props
// }) => {
//   const [field, ,] = useField(name);
//   const { setFieldValue } = useFormikContext();
//   const [errorMessage, setErrorMessage] = useState(''); // State to track error message

//   const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB in bytes

//   const handleFileChange = async (files) => {
//     // Convert FileList to Array
//     const fileArray = Array.from(files);

//     if (!fileArray || !fileArray.length) {
//       return;
//     }

//     // Check for file size limit
//     const oversizedFiles = fileArray.filter(
//       (file) => file.size > MAX_FILE_SIZE
//     );

//     if (oversizedFiles.length > 0) {
//       setErrorMessage(
//         'files exceed the 1MB size limit. Please upload smaller files.'
//       );
//       return; // Stop if any file exceeds the limit
//     }

//     // Clear any previous error messages
//     setErrorMessage('');

//     // Create a FormData object to hold the files
//     const formData = new FormData();
//     fileArray.forEach((file) => {
//       formData.append('file', file);
//     });

//     try {
//       HttpFileClient.post('/s3/multiple', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       })
//         .then(({ data }) => {
//           const uploadedUrls = data.data.location?.map((url) => ({
//             url,
//             name: parseFileNameFromUrl(url),
//           }));

//           // Update Formik state with uploaded URLs
//           setFieldValue(name, [...(field.value || []), ...uploadedUrls]);
//         })
//         .catch((error) => {
//           console.error('Error uploading file(s):', error);
//         });
//     } catch (error) {
//       console.error('Error uploading files:', error);
//       // Handle error gracefully, e.g., display error message to user
//     }
//   };

//   const handleFileDelete = (index) => {
//     try {
//       const updatedFiles = [...field.value];
//       updatedFiles.splice(index, 1);

//       setFieldValue(name, updatedFiles);
//     } catch (error) {
//       console.error('Error deleting file:', error);
//       // Handle error gracefully, e.g., display error message to user
//     }
//   };

//   return (
//     <>
//       <label htmlFor={`upload-file-${id}`} className="upload-wrap">
//         {!field.value?.length > 0 && (
//           <>
//             <div>{uploadIcon({ width: 40, height: 40 })}</div>
//             <div className="desc heading-700-22">{title}</div>
//             <div className="heading-400-12">{message}</div>
//             <div>
//               <div className="upload-btn heading-400-12">{btnText}</div>
//             </div>
//             <div className="heading-400-10 upload-bottom-message">
//               {bottomMessage}
//             </div>
//           </>
//         )}
//         {field.value?.length > 0 && (
//           <div className="uploading-wrap">
//             {field.value.map((uploadFile, index) => (
//               <div className="uploading-item" key={index}>
//                 <div
//                   className="del-img"
//                   onClick={() => handleFileDelete(index)}
//                 >
//                   +
//                 </div>
//                 <div className="uploded-img-container">
//                   <img
//                     className="uploded-img"
//                     src={uploadFile.url}
//                     alt={uploadFile.name}
//                   />
//                 </div>
//               </div>
//             ))}

//             <div className="uploading-item curser-pointer">
//               <div className="heading-300-32 c-gray4">+</div>
//               <div className="heading-500-16 c-gray4">Add More</div>
//             </div>
//           </div>
//         )}
//       </label>
//       {isSingle ? (
//         <input
//           type="file"
//           name="file"
//           id={`upload-file-${id}`}
//           className={`upload-file upload-file-${id}`}
//           onChange={(e) => handleFileChange(e.target.files)}
//           {...props}
//         />
//       ) : (
//         <input
//           type="file"
//           name="file"
//           id={`upload-file-${id}`}
//           className={`upload-file upload-file-${id}`}
//           onChange={(e) => handleFileChange(e.target.files)}
//           multiple
//           {...props}
//         />
//       )}
//       {errorMessage && <div className="error-message">{errorMessage}</div>}{' '}
//       {/* Show error message */}
//     </>
//   );
// };

// export default FormikDocumentUploder;










import { uploadIcon } from '@/assets/Icons';
import { useField, useFormikContext } from 'formik';
// import './FormikDocumentUploader.css';
import { useState } from 'react';

const FormikDocumentUploader = ({
  id,
  title,
  message,
  btnText,
  bottomMessage,
  name,
  isSingle,
  ...props
}) => {
  const [field, ,] = useField(name);
  const { setFieldValue } = useFormikContext();
  const [errorMessage, setErrorMessage] = useState('');

  const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB

  const handleFileChange = async (files) => {
    const fileArray = Array.from(files);

    if (!fileArray.length) return;

    // Check for oversized files
    const oversizedFiles = fileArray.filter(file => file.size > MAX_FILE_SIZE);
    if (oversizedFiles.length > 0) {
      setErrorMessage('Files exceed the 1MB size limit. Please upload smaller files.');
      return;
    }

    setErrorMessage('');

    // Simulate file upload by generating dummy URLs
    const uploadedUrls = fileArray.map(file => ({
      url: URL.createObjectURL(file), // Create a local URL for the uploaded file
      name: file.name,
    }));

    // Update Formik state with simulated uploaded URLs
    setFieldValue(name, [...(field.value || []), ...uploadedUrls]);
  };

  const handleFileDelete = (index) => {
    const updatedFiles = [...field.value];
    updatedFiles.splice(index, 1);
    setFieldValue(name, updatedFiles);
  };

  return (
    <>
      <label htmlFor={`upload-file-${id}`} className="upload-wrap">
        {!field.value?.length > 0 && (
          <>
            <div>{uploadIcon({ width: 40, height: 40 })}</div>
            <div className="desc heading-700-22">{title}</div>
            <div className="heading-400-12">{message}</div>
            <div>
              <div className="upload-btn heading-400-12">{btnText}</div>
            </div>
            <div className="heading-400-10 upload-bottom-message">{bottomMessage}</div>
          </>
        )}
        {field.value?.length > 0 && (
          <div className="uploading-wrap">
            {field.value.map((uploadFile, index) => (
              <div className="uploading-item" key={index}>
                <div className="del-img" onClick={() => handleFileDelete(index)}>+</div>
                <div className="uploaded-img-container">
                  <img className="uploaded-img" src={uploadFile.url} alt={uploadFile.name} />
                </div>
              </div>
            ))}
            {isSingle?<></>:
            <div className="uploading-item curser-pointer">
              <div className="heading-300-32 c-gray4">+</div>
              <div className="heading-500-16 c-gray4">Add More</div>
            </div>
}
          </div>
        )}
      </label>
      <input
        type="file"
        name="file"
        id={`upload-file-${id}`}
        className={`upload-file upload-file-${id}`}
        onChange={(e) => handleFileChange(e.target.files)}
        {...props}
        {...(isSingle ? {} : { multiple: true })}
      />
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </>
  );
};

export default FormikDocumentUploader;
