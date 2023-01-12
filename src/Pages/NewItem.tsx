import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import * as RatingsAPI from "../API/Ratings";
import Footer from '../Components/Footer';
import HeaderBar from '../Components/HeaderBar';
import LoadingBackDrop from '../Components/LoadingBackDrop';
import WebcamCapture from '../Components/WebcamCapture';
import Category, { CategoryResponse } from '../Models/Category';
import PostResponse from '../Models/PostResponse';
import '../Styles/App.css';

export default function NewItem() {

  const [categoryId, setCategoryId] = React.useState<number>(-1);
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
  const [description, setDescription] = React.useState<string>('');
  const [isBackDropOpen, setBackDropIsOpen] = React.useState(false);
  const navigate = useNavigate();

  const createNewItem = () => {

    const newItem = {
      categoryId: categoryId,
      name: name,
      description: description,
      submittedBy: submittedBy,
      image: image
    }

    setIsSubmitLoading(true)
    setBackDropIsOpen(true)
    RatingsAPI.postNewItem(newItem)
      .then((response: PostResponse) => {
        setSubmitSuccessMessage(response.successMessage)
        setIsSubmitLoading(false)
        setTimeout(() => navigate(`/`), 2000);
      })
      .catch(error => {
        setSubmitErrorMessage(error.message)
        setIsSubmitError(true)
      })
      .finally(() => {
        setIsSubmitLoading(false)
      });
  }

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategoryId(parseInt(event.target.value));
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleSubmittedByChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubmittedBy(event.target.value);
  };

  const handleSubmit = () => {
    createNewItem()
  }

  React.useEffect(() => {
    RatingsAPI.getCategories()
      .then((response: CategoryResponse) => {
        setCategories(response.items)
        setisLoadingError(false)
      })
      .catch((error: any) => {
        setisLoadingError(true)
        setErrorMessage(error.request + error.toString() + error.response.toString())
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  return (
    <>
      <HeaderBar />
      {
        isLoading ?
          <></>
          :
          (isLoadingError ?
            <Typography>
              {errorMessage}
            </Typography>
            :
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justifyContent="center"
            >

              <Grid item xs={3}>
                <Stack
                  component="form"
                  sx={{
                    width: '25ch',
                  }}
                  spacing={2}
                  noValidate
                  autoComplete="off"
                >

                  <FormControl>
                    <InputLabel id="input-category-select-label">Category</InputLabel>
                    <Select
                      labelId="input-category"
                      id="demo-simple-select-standard"
                      value={categoryId.toString()}
                      onChange={handleCategoryChange}
                      label="Category"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {
                        categories.map((category) => (
                          <MenuItem
                            value={category.id}
                            key={category.id + '-key'}
                          >{category.name}</MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>

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
                    id="input-description"
                    label="Description"
                    multiline
                    required
                    maxRows={4}
                    value={description}
                    onChange={handleDescriptionChange}
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
                    <Grid
                      container
                      spacing={0}
                      direction="column"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Grid item xs={3}>
                        <Button
                          variant="contained"
                          onClick={() => setOptedForPhoto(true)}>
                          <PhotoCameraIcon />
                        </Button>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography>Add a photo!</Typography>
                      </Grid>
                    </Grid>
                  }

                  <Button
                    variant="contained"
                    disabled={categoryId === null || name === '' || submittedBy === '' || description === ''}
                    onClick={() => {
                      handleSubmit();
                    }}
                  >
                    Submit
                  </Button>

                  <LoadingBackDrop
                    isBackDropOpen={isBackDropOpen}
                    setIsBackDropOpen={setBackDropIsOpen}
                    isSubmitting={isSubmitLoading}
                    isSubmitError={isSubmitError}
                    errorMessage={submitErrorMessage}
                    successMessage={submitSuccessMessage}
                  />

                </Stack>
              </Grid>
            </Grid>
          )
      }
      <Footer />
    </>
  );

}