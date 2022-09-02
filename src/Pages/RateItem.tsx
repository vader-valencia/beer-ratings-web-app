import React from 'react';
import '../Styles/App.css';
import logo from '../Images/logo.svg';
import * as RatingsAPI from "../API/Ratings";
import { Ratings } from '../Models/Rating';
import { Box, TextField, MenuItem, Rating, Button } from '@mui/material';
import { SkinnyItem, SkinnyItems } from '../Models/DrinkItem';
import HoverRating from '../Components/HoverRating';
  
export default function RateItem() {

  const [message, setMessage] = React.useState<Ratings|null>(null);
  const testItems : SkinnyItems = {
    skinnyItems : [
          {
            id: 1,
            name: "beer",
          },
          {
            id: 2,
            name: "wine",
          }
        ]
      };

  const [displayItems, setdisplayItems] = React.useState<SkinnyItem[]>(testItems.skinnyItems);

  const [value, setValue] = React.useState<number | null>(0);
  const [hover, setHover] = React.useState(-1);
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>, newValue: number) => {
          setValue(newValue);
        }
  const handleOnChangeActive =( event: React.ChangeEvent<HTMLInputElement>, newHover: any) => {
    setHover(newHover);
  }

  const addItemRating = () => {
    const newRating = {
      itemId: displayItem,
      rating: value as number
    }
    RatingsAPI.postRating(newRating)
    .then((response) =>{
      setMessage(response)
    })
    .catch(error => console.log(error.message))
    .finally(() => {
      console.log('Item rating added completed');
    });
  }


  const getdisplayItemsForRatings = () => {
    RatingsAPI.getItemsSkinny()
    .then((response: SkinnyItems) =>{
      setdisplayItems(response.skinnyItems)
    })
    .catch(error => console.log(error.message))
    .finally(() => {
      console.log('Items retrieved.');
    });
  }

  React.useEffect(()=>{
    getdisplayItemsForRatings()
  },[])
  
    const [displayItem, setDisplayItem] = React.useState(1);
  
    const handleItemChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setDisplayItem(event.target.value as unknown as number);
    };

    const handleSubmit = () =>{
      addItemRating()
      setDisplayItem(1)
      setValue(0)
      setHover(-1)
    }
  
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
          id="select-item"
          select
          label="Items"
          value={displayItem}
          onChange={handleItemChange}
          helperText="Please select an item to rate"
        >
          {displayItems.map((option: SkinnyItem) => (
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
        </div>
        
          <HoverRating 
            value={value}
            hover={hover}
            handleOnChange={handleOnChange}  
            handleOnChangeActive={handleOnChangeActive}/>

        <Button
          onClick={() => {
            handleSubmit();
          }}
          >
          Submit
        </Button>
        </Box>
    );
  }
