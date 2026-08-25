import { useState, useEffect } from 'react';
import { checkBackend } from './api';
import './App.css';

export default function App() {
  const [status, setStatus] = useState('loading'); // 'loading' | 'connected' | 'failed'
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  const fetchBackendData = async () => {
    setStatus('loading');
    setError('');
    setData(null);

    try {
      const result = await checkBackend();
      
      // Ensure we don't display raw HTML webpage string
      if (typeof result === 'string' && (result.trim().startsWith('<!DOCTYPE') || result.trim().startsWith('<html'))) {
        throw new Error("Invalid API response format");
      }

      setData(result);
      setStatus('connected');
    } catch (err) {
      console.error(err);
      setError('Unable to connect to backend.');
      setStatus('failed');
    }
  };

  useEffect(() => {
    fetchBackendData();
  }, []);

  return (
    <div className="app-container">
      <div className="card">
        <h1>Backend API App</h1>

        <div className="status-box">
          <span className="status-title">Backend Status: </span>
          {status === 'loading' && <span className="badge loading">Loading... ⏳</span>}
          {status === 'connected' && <span className="badge connected">Connected ✅</span>}
          {status === 'failed' && <span className="badge failed">Connection Failed ❌</span>}
        </div>

        <div className="response-area">
          {status === 'loading' && (
            <p className="message-loading">Calling API...</p>
          )}

          {status === 'connected' && (
            <div className="success-box">
              <h3>Response:</h3>
              <pre className="data-display">
                {typeof data === 'object' ? JSON.stringify(data, null, 2) : data}
              </pre>
            </div>
          )}

          {status === 'failed' && (
            <p className="message-error">{error}</p>
          )}
        </div>

        <button 
          className="btn"
          onClick={fetchBackendData}
          disabled={status === 'loading'}
        >
          {status === 'failed' ? 'Try Again' : 'Check Backend'}
        </button>
      </div>
    </div>
  );
}
