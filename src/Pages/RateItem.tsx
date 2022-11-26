import { LoadingButton } from '@mui/lab';
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import { isConstructorDeclaration } from 'typescript';
import * as RatingsAPI from "../API/Ratings";
import HoverRating from '../Components/HoverRating';
import Category, { CategoryResponse } from '../Models/Category';
import DrinkItem, { DrinkItems, SkinnyItem } from '../Models/DrinkItem';
import { Ratings } from '../Models/Rating';
import '../Styles/App.css';

export default function RateItem() {

  const [message, setMessage] = React.useState<Ratings | null>(null);
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
  
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>, newValue: number) => {
    setValue(newValue);
  }
  const handleOnChangeActive = (event: React.ChangeEvent<HTMLInputElement>, newHover: any) => {
    setHover(newHover);
  }

  const addItemRating = () => {
    const newRating = {
      itemId: displayItem as number,
      rating: value as number
    }
    RatingsAPI.postRating(newRating)
      .then((response) => {
        setMessage(response)
      })
      .catch(error => console.log(error.message))
      .finally(() => {
        console.log('Item rating added completed');
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

  const getdisplayItemsForRatings = React.useMemo(() => {
    if(categoryId){
      setDisplayItemsLoading(true)
    RatingsAPI.getItemsByCateogryId(categoryId as number)
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
        <LoadingButton/>
        :
         categoryIsLoadingError ? 
        <Typography>{categoryErrorMessage}</Typography>
        :
          categoryId === null ?
          <></>
          :
            displayItemsLoading ?
            <LoadingButton/>
            :
              displayItemsLoadingError ?
              <Typography>{displayItemsLoadingErrorMessage}</Typography>
              :
          (<>

    <FormControl>
        <InputLabel id="input-category-select-label">Category</InputLabel>
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
              onClick={() => {
                handleSubmit();
              }}
            >
              Submit
            </Button>
          </>
          )
        }
    </Stack>
  );
}
