import React from 'react';
import '../Styles/App.css';
import logo from '../Images/logo.svg';
import * as RatingsAPI from "../API/Ratings";
import { Ratings } from '../Models/Rating';
import { Box, TextField, MenuItem } from '@mui/material';
import { SkinnyItem, SkinnyItems } from '../Models/DrinkItem';
  
export default function NewBeer() {

  const [message, setMessage] = React.useState<Ratings|null>(null);
  const testItems : SkinnyItems = {
    skinnyItems : [
          {
            id: 1,
            name: "beer",
          }
        ]
      };

  const [displayItems, setdisplayItems] = React.useState<SkinnyItems>(testItems);

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

  const getdisplayItemsForRatings = () => {
    RatingsAPI.getItemsSkinny()
    .then((response) =>{
      setdisplayItems(response)
    })
    .catch(error => console.log(error.message))
    .finally(() => {
      console.log('Experiment completed');
    });
  }

  React.useEffect(()=>{
    getdisplayItemsForRatings()
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
            id="select-item-native"
            select
            label="Select an Item to Rate"
            value={currency}
            onChange={handleChange}
            SelectProps={{
              native: true,
            }}
            helperText="Please select your currency"
          >
            {displayItems.map((option: SkinnyItem) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </TextField>
        </div>
      </Box>
    );
  }
