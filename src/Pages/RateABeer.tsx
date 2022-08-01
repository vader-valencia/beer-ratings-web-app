import React from 'react';
import '../Styles/App.css';
import logo from '../Images/logo.svg';
import * as RatingsAPI from "../API/Ratings";
import { Ratings } from '../Models/Rating';
import { Box, TextField, MenuItem } from '@mui/material';
import { SkinnyItem, SkinnyItems } from '../Models/DrinkItem';
  
export default function NewBeer() {

  const [message, setMessage] = React.useState<Ratings|null>(null);
  const testItems = [
    {
      id: 1,
      name: 'beer',
    },
    {
      id: 2,
      name: 'wine',
    },
    {
      id: 3,
      name: 'bourbon',
    },
    {
      id: 4,
      name: 'tacos',
    }
  ];
  const [skinnyItems, setSkinnyItems] = React.useState<SkinnyItems>(testItems);

  const addItemRating = () => {

    const newRating = {
      itemId: 1,
      rating: 5
    }

    RatingsAPI.postRating(newRating)
    .then((response) =>{
      setMessage(response)
    })
    .catch(error => console.log(error.message))
    .finally(() => {
      console.log('Experiment completed');
    });
  }

  const getSkinnyItemsForRatings = () => {
    RatingsAPI.getItemsSkinny()
    .then((response) =>{
      setSkinnyItems(response)
    })
    .catch(error => console.log(error.message))
    .finally(() => {
      console.log('Experiment completed');
    });
  }

  React.useEffect(()=>{
    getSkinnyItemsForRatings()
    addItemRating()
  },[])
  
    const [currency, setCurrency] = React.useState('EUR');
  
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setCurrency(event.target.value);
    };
  
    return (
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            id="outlined-select-currency-native"
            select
            label="Select an Item to Rate"
            value={currency}
            onChange={handleChange}
            SelectProps={{
              native: true,
            }}
            helperText="Please select your currency"
          >
            {skinnyItems.map((option: SkinnyItem) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </TextField>
        </div>
        <div>
          <TextField
            id="filled-select-currency"
            select
            label="Select"
            value={currency}
            onChange={handleChange}
            helperText="Please select your currency"
            variant="filled"
          >
            {skinnyItems.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="filled-select-currency-native"
            select
            label="Native select"
            value={currency}
            onChange={handleChange}
            SelectProps={{
              native: true,
            }}
            helperText="Please select your currency"
            variant="filled"
          >
            {skinnyItems.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
        </div>
        <div>
          <TextField
            id="standard-select-currency"
            select
            label="Select"
            value={currency}
            onChange={handleChange}
            helperText="Please select your currency"
            variant="standard"
          >
            {skinnyItems.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="standard-select-currency-native"
            select
            label="Native select"
            value={currency}
            onChange={handleChange}
            SelectProps={{
              native: true,
            }}
            helperText="Please select your currency"
            variant="standard"
          >
            {skinnyItems.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
        </div>
      </Box>
    );
  }
