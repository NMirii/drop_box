import React from 'react';
import './FileList.css';

const FileList = ({ files }) => {
  return (
    <div className="file-list-container">
      <div className="file-list-header">
        <h2>Son fayllar</h2>
      </div>
      
      {files.length === 0 ? (
        <div className="empty-state">
          <p>Hələ heç bir fayl yüklənməyib.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="file-table">
            <thead>
              <tr>
                <th>Ad</th>
                <th>Ölçü</th>
                <th>Versiya</th>
                <th>Son dəyişiklik</th>
                <th>Əməliyyatlar</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file) => (
                <tr key={file.id}>
                  <td>
                    <div className="file-name">
                      <svg className="file-icon" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                      </svg>
                      {file.name}
                    </div>
                  </td>
                  <td>{file.size}</td>
                  <td><span className="version-badge">{file.version}</span></td>
                  <td>{new Date(file.updatedAt).toLocaleDateString('az-AZ', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                  <td>
                    <button className="btn-action" title="Yüklə">⬇️</button>
                    <button className="btn-action" title="Sil">🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FileList;
