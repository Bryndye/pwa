import React, { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
// import { showNotification } from '../notification'

function Camera(props){
    const {isOnline} = props

    const [openCamera, setOpenCamera] = useState(false)
    const [image, setImage] = useState(null)
    const videoPlayerRef = useRef(null)
    const canvasRef = useRef(null)
    let stream = null;

    const initializeCamera = () => {
        navigator.mediaDevices.getUserMedia({
            video: true
        }).then((stream_local) => {
            videoPlayerRef.current.srcObject = stream_local
            videoPlayerRef.current.style.display = 'block'
            stream = stream_local;
        })
    }
    
    const handleCapture = () => {
        const context = canvasRef.current.getContext('2d')
        context.drawImage(videoPlayerRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height)
        
        setImage(canvasRef.current.toDataURL('image/png'))
        
        if (stream) {
            stream.getTracks().forEach(track => {
                track.stop()
            })
        }
        
        videoPlayerRef.current.style.display = 'none'
        setOpenCamera(false)
    }

    useEffect(() => {
        let new_id = uuidv4()
        localStorage.setItem('images/'+new_id, image)
        // showNotification("En sah t'as pris une photo! \n"+new_id)

        if (isOnline) {
            console.log('REQUETE POST')
        }
        else{
            localStorage.setItem('to_sync/'+new_id,new_id)
        }
    }
    , [image, isOnline])

    const toggleCamera = () => {
        if (openCamera) {
            if (stream) {
                stream.getTracks().forEach(track => {
                    track.stop()
                })
            }
            videoPlayerRef.current.style.display = 'none'
            setOpenCamera(false)
        } else {
            initializeCamera()
            setOpenCamera(true)
        }
    }
    
    return (
        <div className='camera_section'>
            <div className='camera'>
                <video className='w-full' id='player' ref={videoPlayerRef} autoPlay></video>
                <canvas id='canvas' ref={canvasRef}></canvas>
            </div>

            <div className='buttons_camera'>
                <button id='capture' onClick={handleCapture}>Capture</button>
                <button id='open-camera' onClick={toggleCamera}> {openCamera ? 'Close Camera' : 'Open Camera'}</button>
            </div>
        </div>
        
    );
}

export default Camera;
