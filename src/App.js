"use client";
import React, { useState, useEffect } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Galerie from './components/galerie';
import Camera from './components/camera';
// import Geolocation from './components/geolocation';
import Battery from './components/battery';
import Phone from './components/phone';
import Webotp from './components/webotp';
import './App.css';

const getOnLineStatus = () => typeof navigator !== 'undefined' && typeof navigator.onLine === 'boolean' ? navigator.onLine : false;

function App() {
  // is online //
  const [isOnline, setIsOnline] = useState(getOnLineStatus())

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      console.log('ONLINE')
    };
    const handleOffline = () => {
      setIsOnline(false);
      console.log('OFFLINE');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  console.log(navigator.onLine)
  // end is online //

  
  return (
    <div className="App">
      <header>
        <h1>Camera App</h1>

        <div className='data_header'>
          <i className={`fa-solid fa-wifi ${ isOnline ? '' : 'no_connection'}`}></i>
          <Battery />
        </div>
      </header>

      <Phone />
      <Webotp />
      <Camera isOnline={isOnline} />
      <Galerie isOnline={isOnline} />
    </div>
  );
}

export default App;
