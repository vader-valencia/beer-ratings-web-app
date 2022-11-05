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

interface WebcamCaptureProps{
    image: string | null;
    setImage(imageSrc: string | null): void;
}

export default function WebcamCapture(props: WebcamCaptureProps) {
const webcamRef = React.useRef<Webcam>(null);

  const capture = React.useCallback(
    () => {
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            props.setImage(imageSrc);
          }
    },[webcamRef, props.setImage]
  );


  return (
    <div className="webcam-container">
      {props.image===null
      ?<Webcam
        audio={false}
        height={200}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={220}
        videoConstraints={videoConstraints}
        />
      :
      <img src={props.image}/>}
      
      <Button 
        onClick={(e)=>{e.preventDefault();capture();}}>
            Capture
        </Button>
    </div>
  );
};