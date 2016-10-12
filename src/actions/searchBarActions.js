import axios from 'axios';
import * as types from '../constants/actionTypes';

export function launchSearch(searchTerm) {
  const url = `https://webhose.io/search?token=f694c46d-10ff-4385-8273-3a0bd8537f4a&format=json&q=(${searchTerm})%20site_category%3Amedia%20(site_type%3Anews%20OR%20site_type%3Ablogs)`;
  const request = axios.get(url);
  console.log('called');
  return {
    type: types.LAUNCH_SEARCH,
    payload: request,
  };
}