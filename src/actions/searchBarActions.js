import axios from 'axios';
import * as types from '../constants/actionTypes';

export function launchSearch(searchTerm) {

  let url;
  if(searchTerm) {
    const sT = searchTerm.replace(/\s/g,'');
    url = `https://content.guardianapis.com/search?q=${sT}&api-key=c1f53e50-8061-42ea-8938-bc68439d90cd`;
  } else {
    url = `https://content.guardianapis.com/search?&api-key=c1f53e50-8061-42ea-8938-bc68439d90cd`;
  }
  console.log(url);
  const request = axios.get(url);
  return {
    type: types.LAUNCH_SEARCH,
    payload: request,
  };
}