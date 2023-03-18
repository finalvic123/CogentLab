import axios from "axios";
import queryString from "query-string";

import { companyLocation } from "../constants/location";

const foursquareAPI = process.env.REACT_APP_FOURSQUARE_API;
const foursquareAPIClientId = process.env.REACT_APP_FOURSQUARE_API_CLIENT_ID;
const foursquareAPIClientSecret = process.env.REACT_APP_FOURSQUARE_API_CLIENT_SECRET;
const categoryId = process.env.REACT_APP_GOOGLE_MAP_CATEGORY_ID;
const authorization = process.env.REACT_APP_GOOGLE_MAP_AUTHORIZATION;

const credential = {
  v: '20171001',
  client_id: foursquareAPIClientId,
  client_secret: foursquareAPIClientSecret
}

const param = {
  ll: `${companyLocation.lat},${companyLocation.lng}`,
  radius: 1000,
  categoryId: categoryId,
  query: ''
}

const options = {
  headers: {
    Accept: 'application/json',
    Authorization: `${authorization}=`
  }
}

const listSearch = async (query: string) => {
  const params = { ...param, query };
  const url = `${foursquareAPI}/places/search?fields=fsq_id,name,rating,location,geocodes,photos,categories&`
	+ `${queryString.stringify(params)}&${queryString.stringify(credential)}`;

  try {
    const result = await axios.get(url, options).then((response) => {response.data})
    return result;
  } catch (error) {
    console.log(error)
    return false
  }
}

const detailSearch = async (id:string) => {
  if(!id) return;
  const url = `${foursquareAPI}/places/`
    + `${id}?fields=fsq_id,name,website,stats,geocodes,popularity,tips,tastes,features,rating,location,photos,hours,tel&${queryString.stringify(credential)}`;
  
  try {
    const result = await axios.get(url, options).then((response) => response.data)
    return result;
  } catch(error) {
    console.log(error)
    return false;
  }
}

export {
  listSearch,
  detailSearch
}