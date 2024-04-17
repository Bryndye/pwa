import React, { useState, useEffect } from 'react';
import Galerie from './components/galerie';
import Camera from './components/camera';
import Geolocation from './components/geolocation';
import './App.css';

const getOnLineStatus = () => typeof navigator !== 'undefined' && typeof navigator.onLine === 'boolean' ? navigator.onLine : false;

function App() {
  // is online //
  const [isOnline, setIsOnline] = useState(getOnLineStatus())
  
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  // end is online //

  
  return (
    <div className="App">
      <header>
        <div>
          <h1>Camera App</h1>
        </div>

        <div className='data_header'>
          { isOnline ? <p>Online</p> : <p>Offline</p>}
          <Geolocation />
        </div>
      </header>

      <Camera isOnline={isOnline} />
      <Galerie isOnline={isOnline} />
    </div>
  );
}

export default App;
