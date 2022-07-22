import React from 'react';
import '../Styles/App.css';
import logo from '../Images/logo.svg';
import ButtonAppBar from '../Components/AppBar';
import * as RatingsAPI from "../API/Ratings";
import { Ratings } from '../Models/Rating';
import { Typography } from '@mui/material';
  
export default function NewBeer() {

  const [message, setMessage] = React.useState<Ratings|null>(null);

  const getAllRatings = () => {
    RatingsAPI.getRatings()
    .then((response: Ratings) =>{
      setMessage(response)
    })
    .catch(error => console.log(error.message))
    .finally(() => {
      console.log('Experiment completed');
    });
  }

  React.useEffect(()=>{
    getAllRatings()
  },[])

  return (
    <div className="App">
      <header className="App-header">
      <ButtonAppBar></ButtonAppBar>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
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
    </div>
  );

}