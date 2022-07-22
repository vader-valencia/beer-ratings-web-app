import axios from "axios";
import { Item } from "../Models/Item";
import { Rating } from "../Models/Rating";
const os = require('os');

const networkInterfaces = os.networkInterfaces();
const ipAddress = networkInterfaces['eth0'][0]['address']

const backup = "http://136.244.18.136:8000/all-ratings";

export function getRatings () {
    const getRatingsUrl = `http://${ipAddress}:8000/all-ratings`;

    axios.get(getRatingsUrl).then((response) => {
        return response.data;
  });
}

export function getRatingById (id: number) {
    const getRatingByIdUrl = `http://${ipAddress}:8000/rating/${id}`;

    axios.get(getRatingByIdUrl).then((response) => {
        return response.data;
  });
}

export function postNewItem (item: Item) {
    const postItemUrl = `http://${ipAddress}:8000/new-item/`;

    axios.post(postItemUrl).then((response) => {
        return response.data;
  });
}

export function postRating (rating: Rating) {
    const postRatingUrl = `http://${ipAddress}:8000/rating/`;

    axios.post(postRatingUrl).then((response) => {
        return response.data;
  });
}