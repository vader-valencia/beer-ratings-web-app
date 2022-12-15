import axios from "axios";
import { Buffer } from 'buffer';
import Category, { CategoryIdResponse, CategoryResponse } from "../Models/Category";
import { DrinkItems, NewDrinkItem, SkinnyItems } from "../Models/DrinkItem";
import QRCodeQueryOptions from "../Models/QRCodeRequestQueryOptions";
import Rating, { Ratings } from "../Models/Rating";

const ipAddress = window.location.hostname; 

axios.defaults.baseURL = `https://${ipAddress}/3000`;

export const getCreateItemQRCode = (portNum: number, queryOptions: QRCodeQueryOptions) => {
    const getQRCodUrl = `https://${ipAddress}:8000/${portNum}/qr-code`
    const qrCode = axios.get(getQRCodUrl, { params: queryOptions, responseType:'arraybuffer' })
    .then((response) => {
        return 'data:image/png;base64,'+Buffer.from(response.data, 'base64').toString('base64');
    });
    return qrCode;
}

export const getCategories = () => {
  const getCategoriesUrl = `https://${ipAddress}:8000/categories`;

  const categories = axios.get<CategoryResponse>(getCategoriesUrl).then((response) => {
    return response.data});
  return categories;
}

export const getItems = () => {
    const getRatingsUrl = `https://${ipAddress}:8000/items`;

    const ratings = axios.get<Ratings>(getRatingsUrl).then(response => {return response.data});

    return ratings;
}

export const getItemsByCateogryId = (categoryId: number) => {
  const getItemsByCateogryIdUrl = `https://${ipAddress}:8000/${categoryId}/items`;

  const ratings = axios.get<DrinkItems>(getItemsByCateogryIdUrl).then(response => {return response.data});

  return ratings;
}

export const getItemsSkinny = () => {
    const getRatingsUrl = `https://${ipAddress}:8000/all-items-skinny`;

    const ratings = axios.get<SkinnyItems>(getRatingsUrl).then(response => {return response.data});

    return ratings;
}

export function getItemById (id: number) {
    const getRatingByIdUrl = `https://${ipAddress}:8000/items/${id}`;

    axios.get(getRatingByIdUrl).then((response) => {
        return response.data;
  });
}

export function postNewItem (item: NewDrinkItem) {
    const postItemUrl = `https://${ipAddress}:8000/items/`;
    console.log(postItemUrl)


    const postResponse = axios.post(postItemUrl, item).then((response) => {
        return response.data;
  });

  return postResponse;
}

export function postRating (itemId: number, rating: Rating) {
    const postRatingUrl = `https://${ipAddress}:8000/ratings/${itemId}`;

    const postResponse = axios.post(postRatingUrl, rating).then((response) => {
        return response.data;
  });

  return postResponse;

}

export function postNewCategory(newCategory: Category ) {
    const postCategoryUrl = `https://${ipAddress}:8000/categories/`;
    console.log(postCategoryUrl)

    const postResponse = axios.post(postCategoryUrl, newCategory).then((response) => {
        return response.data;
  });

  return postResponse;
}

export function getCategoryIdByCategoryNames(categoryName: string){
  const getCategoryIdByCategoryNamesUrl = `https://${ipAddress}:8000/categories/names/${categoryName}`;

  const ratings = axios.get<CategoryIdResponse>(getCategoryIdByCategoryNamesUrl).then(response => {return response.data});

  return ratings;
}

export function getCategoryTopRated(args : {numItems: number, categoryId: number}) {
    const getRatingsUrl = `https://${ipAddress}:8000/${args.categoryId}/items`;

    const ratings = axios.get<DrinkItems>(getRatingsUrl).then(response => {return response.data});

    return ratings;

}

export function getAllTopRated(numItems: number) {
    const getRatingsUrl = `https://${ipAddress}:8000/items`;

    const ratings = axios.get<DrinkItems>(getRatingsUrl).then(response => {return response.data});

    return ratings;
}

