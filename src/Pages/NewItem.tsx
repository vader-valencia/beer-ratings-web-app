import React from 'react';
import '../Styles/App.css';
import logo from '../Images/logo.svg';
import * as RatingsAPI from "../API/Ratings";
import { Ratings } from '../Models/Rating';
import { Box, Button, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography } from '@mui/material';
import WebcamCapture from '../Components/WebcamCapture';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { Container } from '@mui/system';
import Category, { CategoryResponse } from '../Models/Category';
import PostResponse from '../Models/PostResponse';
  
export default function NewItem() {

  const [category, setCategory] = React.useState<string>('');
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [name, setName] = React.useState<string>('');
  const [submittedBy, setSubmittedBy] = React.useState<string>('');
  const [errorMessage, setErrorMessage] = React.useState<string>('');
  const [isLoadingError, setisLoadingError] = React.useState<boolean>(false);
  const [isSubmitLoading, setIsSubmitLoading] = React.useState<boolean>(false);
  const [isSubmitError, setIsSubmitError] = React.useState<boolean>(false);
  const [submitSuccessMessage, setSubmitSuccessMessage] = React.useState<string>('');
  const [submitErrorMessage, setSubmitErrorMessage] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [image, setImage] = React.useState<string | null>(null);
  const [optedForPhoto, setOptedForPhoto] = React.useState<boolean>(false);

  const createNewItem = () => {

    const newDrinkItem =     {
      category: category,
      name: name,
      submittedBy: submittedBy,
      image: image
    }

    setIsSubmitLoading(true)
    RatingsAPI.postNewDrinkItem(newDrinkItem)
    .then((response : PostResponse) =>{
      setSubmitSuccessMessage(response.successMessage)
    })
    .catch(error => {
      console.log(error.message)
      setSubmitErrorMessage(error.message)
      setIsSubmitError(true)
    })
    .finally(() => {
      setIsSubmitLoading(false)
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
    createNewItem()
  }

  React.useEffect(()=>{
    RatingsAPI.getCategories()
    .then((response: CategoryResponse) => {
      setCategories(response.items)
      setisLoadingError(false)
  })
  .catch((error: { message: any; }) => {
      setisLoadingError(true)
      setErrorMessage(error.message)
  })
  .finally(() => {
      setIsLoading(false)
  })
  },[])

  return (
    isLoading ?
    <></>
    :
    (isLoadingError ? 
      <Typography>
        {errorMessage}
      </Typography>
      :
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

        {
          isSubmitLoading ? 
          <></>
            :
            isSubmitError ?
            <Typography>{submitErrorMessage}</Typography>
            :
            <Typography>{submitSuccessMessage}</Typography>
        }

        </Stack>
    )
  );

}