import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <Router>
          <div className="app-container">
            <Navbar user={user} signOut={signOut} />
            <Routes>
              <Route path="/" element={<Dashboard user={user} />} />
              <Route path="/dashboard" element={<Dashboard user={user} />} />
            </Routes>
          </div>
        </Router>
      )}
    </Authenticator>
  );
}

export default App;
