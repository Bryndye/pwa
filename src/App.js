import React, { useState, useRef, useEffect } from 'react';
// import logo from './logo.svg';
import { requestPermission, showNotification } from './notification'
import { v4 as uuidv4 } from 'uuid';
import Galerie from './components/galerie';

const getOnLineStatus = () => typeof navigator !== 'undefined' && typeof navigator.onLine === 'boolean' ? navigator.onLine : false;

function App() {
  const isready = navigator.serviceWorker.ready;
  useEffect(() => {
    console.log('BOUH',isready);
  }
  , [isready]);
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
  
  // GEOLOCATION //
  const [geolocation, setGeolocation] = useState(null);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      setGeolocation(position);
    })
  }, []);
  // END GEOLOCATION //
  
  // CAMERA //
  const [openCamera, setOpenCamera] = useState(false)
  const [image, setImage] = useState(null)
  const videoPlayerRef = useRef(null)
  const canvasRef = useRef(null)
  
  const initializeCamera = () => {
    navigator.mediaDevices.getUserMedia({
      video: true
    }).then((stream) => {
      videoPlayerRef.current.srcObject = stream
      videoPlayerRef.current.style.display = 'block'
    })
  }
  
  const handleCapture = () => {
    const context = canvasRef.current.getContext('2d')
    context.drawImage(videoPlayerRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height)
    
    let new_id = uuidv4()
    setImage(canvasRef.current.toDataURL('image/png'))
    localStorage.setItem('images/'+new_id, image)
    showNotification("En sah t'as pris une photo! \n"+new_id)
    // stock in local if no wifi

    if (isOnline) {
      console.log('REQUETE POST')
    }
    else{
      localStorage.setItem('to_sync/'+new_id,new_id)
    }
    
    videoPlayerRef.current.srcObject.getVideoTracks().forEach(track => {
      track.stop()
    })
    
    videoPlayerRef.current.style.display = 'none'
    
  }
  
  useEffect(() => {
    if (openCamera) {
      initializeCamera()
      console.log('Camera Opened')
    }
    else{
      setOpenCamera(false)
    }
  }, [openCamera]);
  
  // END CAMERA //

  useEffect(() => {
    if (isOnline) {
      const keys = Object.keys(localStorage);

      for (const key of keys) {
        if (key.startsWith('to_sync/')) {
          // Cette clé appartient au dossier spécifié
          const value = localStorage.getItem(key);
          console.log(key, value);

          console.log('REQUETE POST : '+ value)
          // localStorage.removeItem(key);
        }
      }
    }
  }
  , [isOnline]);

  
  return (
    <div className="App">
      <header>
        { isOnline ? <p>Online</p> : <p>Offline</p>}
      </header>
      <div className='flex justify-center'>
        <video className='w-full' id='player' ref={videoPlayerRef} autoPlay></video>
        <canvas id='canvas' ref={canvasRef}></canvas>
        <button id='capture' onClick={handleCapture}>Capture</button>
        <button id='open-camera' onClick={() => setOpenCamera(true)}>Open Camera</button>
        <button id='request-permission' onClick={requestPermission}>Request Permission</button>
      </div>

      <Galerie />

      {geolocation && (
        <div>
            <p>{geolocation.coords.latitude}</p>
            <p>{geolocation.coords.longitude}</p>
        </div>
      )}

    </div>
  );
}

export default App;
