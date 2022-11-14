import axios from "axios";
import { useParams } from "react-router-dom";
import DrinkItem, { NewDrinkItem, SkinnyItem, SkinnyItems }  from "../Models/DrinkItem";
import QRCodeQueryOptions from "../Models/QRCodeRequestQueryOptions";
import Rating, { Ratings } from "../Models/Rating";
import {Buffer} from 'buffer';
import Category from "../Models/Category";
//const os = require('os');

//const networkInterfaces = os.networkInterfaces();
const ipAddress = 'localhost'; 

//const ipAddress = networkInterfaces['eth0'][0]['address']

export const getCreateItemQRCode = (portNum: number, queryOptions: QRCodeQueryOptions) => {
    const getQRCodUrl = `http://${ipAddress}:8000/${portNum}/qr-code`
    const qrCode = axios.get(getQRCodUrl, { params: queryOptions, responseType:'arraybuffer' })
    .then((response) => {
        return 'data:image/png;base64,'+Buffer.from(response.data, 'base64').toString('base64');
    });
    return qrCode;
}

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

export function postNewCategory(newCategory: Category ) {
    const postCategoryUrl = `http://${ipAddress}:8000/category/`;

    const postResponse = axios.post(postCategoryUrl).then((response) => {
        return response.data;
  });

  return postResponse;
}
