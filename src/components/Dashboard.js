import React, { useState } from 'react';
import FileUpload from './FileUpload';
import FileList from './FileList';
import './Dashboard.css';

const Dashboard = () => {
  // Mock data for files
  const [files, setFiles] = useState([
    { id: 1, name: 'Project_Proposal.pdf', size: '2.4 MB', updatedAt: '2026-04-25T10:00:00Z', version: 'v2' },
    { id: 2, name: 'Design_Assets.zip', size: '15.6 MB', updatedAt: '2026-04-24T14:30:00Z', version: 'v1' },
    { id: 3, name: 'Q1_Financials.xlsx', size: '1.2 MB', updatedAt: '2026-04-20T09:15:00Z', version: 'v5' }
  ]);

  const handleFileUpload = (newFile) => {
    // Update file list locally
    setFiles([
      {
        id: Date.now(),
        name: newFile.name,
        size: (newFile.size / (1024 * 1024)).toFixed(2) + ' MB',
        updatedAt: new Date().toISOString(),
        version: 'v1'
      },
      ...files
    ]);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Fayllarım</h1>
        <p>Bütün fayllarınız təhlükəsiz şəkildə S3-də saxlanılır və versiyalanır.</p>
      </div>
      
      <div className="dashboard-content">
        <FileUpload onUpload={handleFileUpload} />
        <FileList files={files} />
      </div>
    </div>
  );
};

export default Dashboard;
