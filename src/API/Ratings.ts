import axios from "axios";
import { useParams } from "react-router-dom";
import DrinkItem, { NewDrinkItem, SkinnyItem, SkinnyItems }  from "../Models/DrinkItem";
import QRCodeQueryOptions from "../Models/QRCodeRequestQueryOptions";
import Rating, { Ratings } from "../Models/Rating";
import {Buffer} from 'buffer';
import Category, { CategoryResponse } from "../Models/Category";
import LabeledImage, { LabeledImageListResponse } from "../Models/LabeledImage";

const ipAddress = 'localhost'; 

export const getCreateItemQRCode = (portNum: number, queryOptions: QRCodeQueryOptions) => {
    const getQRCodUrl = `http://${ipAddress}:8000/${portNum}/qr-code`
    const qrCode = axios.get(getQRCodUrl, { params: queryOptions, responseType:'arraybuffer' })
    .then((response) => {
        return 'data:image/png;base64,'+Buffer.from(response.data, 'base64').toString('base64');
    });
    return qrCode;
}

export const getCategories = () => {
  const getCategoriesUrl = `http://${ipAddress}:8000/all-categories`;

  const categories = axios.get<CategoryResponse>(getCategoriesUrl).then((response) => {
    return response.data});
  return categories;
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

export function postNewItem (item: NewDrinkItem) {
  console.log(item)
    const postItemUrl = `http://${ipAddress}:8000/item/`;

    const postResponse = axios.post(postItemUrl, item).then((response) => {
        return response.data;
  });

  return postResponse;
}

export function postRating (rating: Rating) {
    const postRatingUrl = `http://${ipAddress}:8000/rating/`;

    const postResponse = axios.post(postRatingUrl, rating).then((response) => {
        return response.data;
  });

  return postResponse;

}

export function postNewCategory(newCategory: Category ) {
    const postCategoryUrl = `http://${ipAddress}:8000/category/`;

    const postResponse = axios.post(postCategoryUrl, newCategory).then((response) => {
        return response.data;
  });

  return postResponse;
}

export function getCategoryTopRated(numItems: number, categoryNameInUrl: string) {
    const getRatingsUrl = `http://${ipAddress}:8000/all-items`;

    const ratings = axios.get<LabeledImageListResponse>(getRatingsUrl).then(response => {return response.data});

    return ratings;

    /*
    const images : LabeledImage[] = [
        {
          label: 'San Francisco – Oakland Bay Bridge, United States',
          imageSource:
            'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
        },
        {
          label: 'Bird',
          imageSource:
            'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
        },
        {
          label: 'Bali, Indonesia',
          imageSource:
            'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250',
        },
        {
          label: 'Goč, Serbia',
          imageSource:
            'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
        },
      ];

    return images;
    */
}

export function getAllTopRated(numItems: number) {
    const getRatingsUrl = `http://${ipAddress}:8000/all-items`;

    const ratings = axios.get<LabeledImageListResponse>(getRatingsUrl).then(response => {return response.data});

    return ratings;

    /*
    const images : LabeledImage[] = [
        {
          label: 'San Francisco – Oakland Bay Bridge, United States',
          imageSource:
            'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
        },
        {
          label: 'Bird',
          imageSource:
            'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
        },
        {
          label: 'Bali, Indonesia',
          imageSource:
            'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250',
        },
        {
          label: 'Goč, Serbia',
          imageSource:
            'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
        },
      ];

    return images;
    */
}

