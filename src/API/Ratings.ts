import axios from "axios";
import DrinkItem, { NewDrinkItem, SkinnyItem, SkinnyItems }  from "../Models/DrinkItem";
import Rating, { Ratings } from "../Models/Rating";
//const os = require('os');

//const networkInterfaces = os.networkInterfaces();
const ipAddress = 'localhost'; 

//const ipAddress = networkInterfaces['eth0'][0]['address']

export const getItems = () => {
    const getRatingsUrl = `http://${ipAddress}:8000/all-items`;

    const ratings = axios.get<Ratings>(getRatingsUrl).then(response => {return response.data});

    return ratings;
}

export const getItemsSkinny = () => {
    const getRatingsUrl = `http://${ipAddress}:8000/all-items-skinny`;

    const ratings = axios.get<SkinnyItems>(getRatingsUrl).then(response => {return response.data});

    return ratings;
}

export function getItemById (id: number) {
    const getRatingByIdUrl = `http://${ipAddress}:8000/item/${id}`;

    axios.get(getRatingByIdUrl).then((response) => {
        return response.data;
  });
}

export function postNewDrinkItem (drinkItem: NewDrinkItem) {
    const postItemUrl = `http://${ipAddress}:8000/new-item/`;

    const postResponse = axios.post(postItemUrl).then((response) => {
        return response.data;
  });

  return postResponse;
}

export function postRating (rating: Rating) {
    const postRatingUrl = `http://${ipAddress}:8000/rating/`;

    const postResponse = axios.post(postRatingUrl).then((response) => {
        return response.data;
  });

  return postResponse;

}