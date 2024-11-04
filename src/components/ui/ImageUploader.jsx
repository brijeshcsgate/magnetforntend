import React, { useState } from 'react';
import { 
  Box,
  Typography,
  Paper,
  IconButton,
  Button
} from '@mui/material';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

import { Label } from "@/components/ui/label";
const ImageUploadPreview = ({ 
  field = 'image',
  label = 'Upload Image',
  setFieldValue,
  error,
  acceptedFileTypes = "image/*",
  maxSizeMB = 5,
  imageurl
}) => {
  const [imagePreview, setImagePreview] = useState(imageurl?imageurl:null);
  const [isDragging, setIsDragging] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > maxSizeMB * 1024 * 1024) {
        alert(`File size should be less than ${maxSizeMB}MB`);
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFieldValue(field, file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleImageChange({ target: { files: [file] }});
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setFieldValue(field, null);
  };

  return (
    <Box  className='flex pb-2 pt-2 align-item pl-3 pr-3'
    // className="space-y-4"
    >
      {/* <Typography variant="subtitle1" className="font-medium">
        {label}
      </Typography>
       */}
       <Label
        // htmlFor={name} 
        className='w-1/5 pt-2'>
          {label}{' '}
        </Label>
      {/* Upload Area */}
      
    <div className="w-3/5"><></>
      <Paper
        className={`p-8 border-2 border-dashed transition-colors duration-300 ${
          isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        } ${error ? 'border-red-500' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {!imagePreview ? (
          <Box className="flex flex-col items-center space-y-4">
            <input
              type="file"
              id={field}
              name={field}
              accept={acceptedFileTypes}
              onChange={handleImageChange}
              className="hidden"
            />
            
            <ImageIcon 
              size={48} 
              className={`${isDragging ? 'text-blue-500' : 'text-gray-400'}`}
            />
            
            <div className="text-center">
              <Typography className="mb-2">
                Drag & drop your image here or
              </Typography>
              
              <label htmlFor={field}>
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={<Upload size={18} />}
                  className="mx-auto"
                >
                  Browse Files
                </Button>
              </label>
            </div>
            
            <Typography variant="caption" className="text-gray-500">
              Supported formats: JPEG, PNG, GIF (max {maxSizeMB}MB)
            </Typography>
          </Box>
        ) : (
          <Box className="relative flex flex-col">
            <div className='flex justify-content-end'>
            <IconButton
              className=" bg-white shadow-md hover:bg-red-50 w-6 h-6 p-0"
              onClick={removeImage}
              size="small"
            >
              <X size={18} className="text-red-500" />
            </IconButton>
            </div>
            <Box className="rounded-lg overflow-hidden flex flex-col items-center relative group">
              <img
                src={imagePreview}
                alt="Preview"
                className=" h-48 "
              />
              
              {/* <Box className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"> */}
                {/* <label htmlFor={field} className="absolute inset-0 cursor-pointer flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Button
                    variant="contained"
                    component="span"
                    startIcon={<Upload size={18} />}
                    className="bg-white text-gray-800 hover:bg-gray-100"
                  >
                    Change Image
                  </Button>
                </label> */}
              {/* </Box> */}
            </Box>
          </Box>
        )}
      </Paper>

      {/* Error Message */}
      {error && (
        <Typography className="text-red-500 text-sm">
          {error}
        </Typography>
      )}

      {/* File Requirements */}
      <Box className="flex items-center space-x-4 text-sm text-gray-500">
        <Typography variant="caption">
          • Maximum file size: {maxSizeMB}MB
        </Typography>
        <Typography variant="caption">
          • Recommended dimensions: 1200x800px
        </Typography>
      </Box>
      </div>
    </Box>
    
  );
};


export default ImageUploadPreview;