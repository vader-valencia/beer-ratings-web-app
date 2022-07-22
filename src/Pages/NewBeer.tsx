import React from 'react';
import '../Styles/App.css';
import logo from '../Images/logo.svg';
import * as RatingsAPI from "../API/Ratings";
import { Ratings } from '../Models/Rating';
  
export default function NewBeer() {

  const [message, setMessage] = React.useState<Ratings|null>(null);

  const createNewBeer = () => {

    const newDrinkItem =     {
      id: 1,
      name: 'New Beer Test',
      submittedBy: 'New Beer Tester',
    }

    RatingsAPI.postNewDrinkItem(newDrinkItem)
    .then((response) =>{
      setMessage(response)
    })
    .catch(error => console.log(error.message))
    .finally(() => {
      console.log('Experiment completed');
    });
  }

  React.useEffect(()=>{
    createNewBeer()
  },[])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>
          Input a new beer into the rating system!
        </h2>
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