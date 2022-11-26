import React from 'react';
import '../Styles/App.css';
import logo from '../Images/logo.svg';
import * as RatingsAPI from "../API/Ratings";
import { Ratings } from '../Models/Rating';
import { Box, Button, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography } from '@mui/material';
import WebcamCapture from '../Components/WebcamCapture';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { Container } from '@mui/system';
import Category from '../Models/Category';
  
export default function NewItem() {

  const [category, setCategory] = React.useState<string>('');
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [name, setName] = React.useState<string>('');
  const [submittedBy, setSubmittedBy] = React.useState<string>('');
  const [errorMessage, setErrorMessage] = React.useState<string>('');
  const [error, setIsError] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [image, setImage] = React.useState<string | null>(null);
  const [optedForPhoto, setOptedForPhoto] = React.useState<boolean>(false);

  const createNewBeer = () => {

    const newDrinkItem =     {
      name: name,
      submittedBy: submittedBy,
      image: image
    }

    RatingsAPI.postNewDrinkItem(newDrinkItem)
    .then((response) =>{
      setErrorMessage(response)
    })
    .catch(error => console.log(error.message))
    .finally(() => {
      console.log('Experiment completed');
    });
  }

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

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
    RatingsAPI.getCategories()
    .then((response: Category[]) => {
      setCategories(response)
      setIsError(false)
  })
  .catch((error: { message: any; }) => {
      setIsError(true)
      setErrorMessage(error.message)
  })
  .finally(() => {
      setIsLoading(false)
  })
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

        <Select
          labelId="input-category"
          id="demo-simple-select-standard"
          value={category}
          onChange={handleCategoryChange}
          label="Age"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {
            categories.map((category) =>(
              <MenuItem value={category.name}>{category.name}</MenuItem>
            ))
          }
        </Select>

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

        {optedForPhoto ?  
          <WebcamCapture
          image={image}
          setImage={setImage}
          /> 
          : 
          <Container>
            <Button onClick={() => setOptedForPhoto(true)}>
              <PhotoCameraIcon/>
            </Button>
            <Typography>Add a photo!</Typography>
          </Container>
        }

        <Button
          disabled={category === '' || name === '' || submittedBy === ''}
          onClick={() => {
            handleSubmit();
          }}
          >
          Submit
        </Button>

        </Stack>
  );

}