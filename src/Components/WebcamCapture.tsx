import React, { Component, useState } from 'react';
//import './cameraStyles.css'
import Webcam from "react-webcam";
import { Button, Grid } from '@mui/material';
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
      <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            >
      {props.image === null
      ? <Grid item>
          <Webcam
          audio={false}
          height={200}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={220}
          videoConstraints={videoConstraints}
          />
        </Grid>
      :
      <img src={props.image}/>}
      {props.image === null ?
        <Grid item>
          <Button 
          onClick={(e)=>{e.preventDefault();capture();}}>
              Capture
          </Button>
        </Grid>
        : 
        <Grid item>
          <Button 
          onClick={(e)=>{e.preventDefault();props.setImage(null);}}>
              Retake
          </Button>
        </Grid>
        }
        </Grid>
    </div>
  );
};