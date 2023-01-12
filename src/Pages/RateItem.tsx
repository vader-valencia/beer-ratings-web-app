import { LoadingButton } from '@mui/lab';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, Typography } from '@mui/material';
import React from 'react';
import * as RatingsAPI from "../API/Ratings";
import HeaderBar from '../Components/HeaderBar';
import HoverRating from '../Components/HoverRating';
import Category, { CategoryResponse } from '../Models/Category';
import DrinkItem, { DrinkItems } from '../Models/DrinkItem';
import { Ratings } from '../Models/Rating';
import '../Styles/App.css';
import Footer from "../Components/Footer";
import LoadingBackDrop from '../Components/LoadingBackDrop';
import { useNavigate } from 'react-router-dom';
import PostResponse from '../Models/PostResponse';

export default function RateItem() {

  const [categoryId, setCategoryId] = React.useState<number | null>(null);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [categoryIsLoadingError, setCategoryIsLoadingError] = React.useState<boolean>(false);
  const [categoryIsLoading, setCategoryIsLoading] = React.useState<boolean>(true);
  const [categoryErrorMessage, setCategoryErrorMessage] = React.useState<string>('');
  const [displayItem, setDisplayItem] = React.useState<number | null>(null);
  const [displayItemsLoading, setDisplayItemsLoading] = React.useState<boolean>(false);
  const [displayItemsLoadingError, setDisplayItemsLoadingError] = React.useState<boolean>(false);
  const [displayItemsLoadingErrorMessage, setDisplayItemsLoadingErrorMessage] = React.useState('');
  const [displayItems, setDisplayItems] = React.useState<DrinkItem[]>([]);
  const [value, setValue] = React.useState<number | null>(0);
  const [hover, setHover] = React.useState(-1);
  const [isBackDropOpen, setIsBackDropOpen] = React.useState<boolean>(false);
  const [isSubmitLoading, setIsSubmitLoading] = React.useState<boolean>(false);
  const [isSubmitError, setIsSubmitError] = React.useState<boolean>(false);
  const [submitErrorMessage, setSubmitErrorMessage] = React.useState<string>('');
  const [submitSuccessMessage, setSubmitSuccessMessage] = React.useState<string>('');
  const navigate = useNavigate();

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>, newValue: number) => {
    setValue(newValue);
  }
  const handleOnChangeActive = (event: React.ChangeEvent<HTMLInputElement>, newHover: any) => {
    setHover(newHover);
  }

  const addItemRating = () => {
    const newRating = {
      rating: value as number
    }
    setIsSubmitLoading(true)
    setIsBackDropOpen(true)
    RatingsAPI.postRating(displayItem as number, newRating)
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

  React.useEffect(() => {
    RatingsAPI.getCategories()
      .then((response: CategoryResponse) => {
        setCategories(response.items)
        setCategoryIsLoadingError(false)
      })
      .catch((error: { message: any; }) => {
        setCategoryIsLoadingError(true)
        setCategoryErrorMessage(error.message)
      })
      .finally(() => {
        setCategoryIsLoading(false)
      })
  }, [])

  React.useEffect(() => {
    if (categoryId !== null) {
      setDisplayItemsLoading(true)
      RatingsAPI.getItemsByCategoryId(categoryId as number)
        .then((response: DrinkItems) => {
          setDisplayItems(response.items)
          setDisplayItemsLoadingError(false)
        })
        .catch(error => {
          setDisplayItemsLoadingErrorMessage(error.message)
          setDisplayItemsLoadingError(true)
        })
        .finally(() => {
          setDisplayItemsLoading(false)
        })
    }
  }, [categoryId])

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategoryId(event.target.value as unknown as number);
  };

  const handleItemChange = (event: SelectChangeEvent) => {
    setDisplayItem(event.target.value as unknown as number);
  };

  const handleSubmit = () => {
    addItemRating()
    setDisplayItem(null)
    setValue(0)
    setHover(-1)
  }

  return (
    <>
      <HeaderBar />
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
                value={categoryId?.toString() || ''}
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

            {categoryIsLoading ?
              <LoadingButton />
              :
              categoryIsLoadingError ?
                <Typography>{categoryErrorMessage}</Typography>
                :
                categoryId === null ?
                  <></>
                  :
                  displayItemsLoading ?
                    <LoadingButton />
                    :
                    displayItemsLoadingError ?
                      <Typography>{displayItemsLoadingErrorMessage}</Typography>
                      :
                      (<>

                        <FormControl>
                          <InputLabel id="input-category-select-label">Item</InputLabel>
                          <Select
                            id="select-item"
                            label="Items"
                            value={displayItem?.toString() || ''}
                            onChange={handleItemChange}
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            {
                              displayItems.map((option: DrinkItem) => (
                                <MenuItem key={option.id} value={option.id}>
                                  {option.name}
                                </MenuItem>
                              ))}
                          </Select>
                        </FormControl>

                        <HoverRating
                          value={value}
                          hover={hover}
                          handleOnChange={handleOnChange}
                          handleOnChangeActive={handleOnChangeActive} />

                        <Button
                          variant="contained"
                          onClick={() => {
                            handleSubmit();
                          }}
                        >
                          Submit
                        </Button>

                        <LoadingBackDrop
                          isBackDropOpen={isBackDropOpen}
                          setIsBackDropOpen={setIsBackDropOpen}
                          isSubmitting={isSubmitLoading}
                          isSubmitError={isSubmitError}
                          errorMessage={submitErrorMessage}
                          successMessage={submitSuccessMessage}
                        />
                      </>
                      )
            }
          </Stack>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}
