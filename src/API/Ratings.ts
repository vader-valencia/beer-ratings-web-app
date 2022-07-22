import axios from "axios";
import DrinkItem  from "../Models/DrinkItem";
import Rating, { Ratings } from "../Models/Rating";
//const os = require('os');

//const networkInterfaces = os.networkInterfaces();
const ipAddress = 'localhost'; 

//const ipAddress = networkInterfaces['eth0'][0]['address']

export const getRatings = () => {
    const getRatingsUrl = `http://${ipAddress}:8000/all-ratings`;

    const ratings = axios.get<Ratings>(getRatingsUrl).then(response => {return response.data});

    return ratings;
}

export function getRatingById (id: number) {
    const getRatingByIdUrl = `http://${ipAddress}:8000/rating/${id}`;

    axios.get(getRatingByIdUrl).then((response) => {
        return response.data;
  });
}

export function postNewDrinkItem (drinkItem: DrinkItem) {
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