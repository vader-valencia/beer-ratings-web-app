import React from 'react';
import '../Styles/App.css';
import logo from '../Images/logo.svg';
import * as RatingsAPI from "../API/Ratings";
import { Ratings } from '../Models/Rating';
import { Box, Button, Stack, TextField } from '@mui/material';
  
export default function NewItem() {

  const [name, setName] = React.useState<string>('');
  const [submittedBy, setSubmittedBy] = React.useState<string>('');
  const [message, setMessage] = React.useState<Ratings|null>(null);

  const createNewBeer = () => {

    const newDrinkItem =     {
      name: name,
      submittedBy: submittedBy,
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

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSubmittedByChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubmittedBy(event.target.value);
  };

  const handleSubmit = () => {
    createNewBeer()
  }

  React.useEffect(()=>{
  },[])

  return (
    <Stack
      component="form"
      sx={{
        width: '25ch',
      }}
      spacing={2}
      noValidate
      autoComplete="off"
    >

        <TextField
          id="input-name"
          label="Item Name"
          multiline
          required
          maxRows={4}
          value={name}
          onChange={handleNameChange}
        />

        <TextField
          id="input-submitted-by"
          label="Submitted By"
          multiline
          required
          maxRows={4}
          value={submittedBy}
          onChange={handleSubmittedByChange}
        />

        <Button
          disabled={name === '' || submittedBy === ''}
          onClick={() => {
            handleSubmit();
          }}
          >
          Submit
        </Button>

        </Stack>
  );

}