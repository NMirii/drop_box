import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Amplify } from 'aws-amplify';

// Configure Amplify (Replace with your own aws-exports.js or config)
/*
Amplify.configure({
  Auth: {
    region: 'us-east-1',
    userPoolId: 'YOUR_USER_POOL_ID',
    userPoolWebClientId: 'YOUR_USER_POOL_WEB_CLIENT_ID',
  },
  API: {
    endpoints: [
      {
        name: 'dropboxApi',
        endpoint: 'YOUR_API_GATEWAY_URL'
      }
    ]
  }
});
*/

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
