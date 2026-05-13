import React, { useState } from 'react';
import './Login.css';

const Login = ({ setIsAuthenticated }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Fake authentication delay
    setTimeout(() => {
      // In real app, call Auth.signIn() or Auth.signUp()
      localStorage.setItem('auth', 'true');
      setIsAuthenticated(true);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="logo-icon large"></div>
          <h2>{isLoginView ? 'Xoş gəlmisiniz' : 'Qeydiyyatdan keçin'}</h2>
          <p>Davam etmək üçün hesabınıza daxil olun.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              placeholder="nümunə@mail.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="form-group">
            <label>Şifrə</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Gözləyin...' : (isLoginView ? 'Daxil ol' : 'Qeydiyyat')}
          </button>
        </form>

        <div className="login-footer">
          <button 
            className="toggle-view-btn" 
            onClick={() => setIsLoginView(!isLoginView)}
          >
            {isLoginView ? 'Hesabınız yoxdur? Qeydiyyatdan keçin' : 'Artıq hesabınız var? Daxil olun'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
