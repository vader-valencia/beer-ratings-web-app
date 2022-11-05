import React, { Component, useState } from 'react';
//import './cameraStyles.css'
import Webcam from "react-webcam";
import { Button } from '@mui/material';
const WebcamComponent = () => <Webcam />;
const videoConstraints = {
  width: 220,
  height: 200,
  facingMode: "user"
};

export default function WebcamCapture() {
const webcamRef = React.useRef<Webcam>(null);
const [imgSrc, setImgSrc] = useState<string | null>(null);

  const capture = React.useCallback(
    () => {
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            setImgSrc(imageSrc);
          }
    },[webcamRef, setImgSrc]
  );

  return (
    <div className="webcam-container">
      <Webcam
        audio={false}
        height={200}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={220}
        videoConstraints={videoConstraints}
      />
      <Button 
        onClick={(e)=>{e.preventDefault();capture();}}>
            Capture
        </Button>
    </div>
  );
};