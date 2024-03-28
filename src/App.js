import React, { useState, useRef, useEffect } from 'react';
import logo from './logo.svg';
import { requestPermission, showNotification } from './notification'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [geolocation, setGeolocation] = useState(null);

  
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
    
    if (videoPlayerRef.current) {
      context.drawImage(videoPlayerRef.current, 0, 0, canvasRef.current.width, 1600)
    }
    
    setImage(canvasRef.current.toDataURL('image/png'))
    let new_id = uuidv4()
    localStorage.setItem(new_id, canvasRef.current.toDataURL('image/png'))
    showNotification("En sah t'as pris une photo!"+new_id)
    // stock in local if no wifi
    
    videoPlayerRef.current.srcObject.getVideoTracks().forEach(track => {
      track.stop()
    })
    
    videoPlayerRef.current.style.display = 'none'
    
    setOpenCamera(false)
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
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      setGeolocation(position);
    })
  }, []);


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      <div className='flex justify-center'>
        <video className='w-full' id='player' ref={videoPlayerRef} autoPlay></video>
        <canvas id='canvas' ref={canvasRef}></canvas>
        <button id='capture' onClick={handleCapture}>Capture</button>
        <button id='open-camera' onClick={() => setOpenCamera(true)}>Open Camera</button>
        <button id='request-permission' onClick={requestPermission}>Request Permission</button>
      </div>

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
