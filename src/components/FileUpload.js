import React, { useState, useRef } from 'react';
import './FileUpload.css';

const FileUpload = ({ onUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = async (file) => {
    setUploading(true);
    // Simulate API call to Lambda/S3
    // In reality, you'd get a signed URL from Lambda, then PUT to S3
    setTimeout(() => {
      onUpload(file);
      setUploading(false);
    }, 1500);
  };

  return (
    <div className="upload-section">
      <div 
        className={`drop-zone ${isDragging ? 'active' : ''} ${uploading ? 'uploading' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !uploading && fileInputRef.current.click()}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          style={{ display: 'none' }} 
        />
        <div className="drop-content">
          {uploading ? (
            <div className="loader"></div>
          ) : (
            <>
              <svg className="upload-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <h3>Faylı bura sürükləyin və ya klikləyin</h3>
              <p>Maksimum fayl həcmi: 50MB</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
