import * as types from '../constants/actionTypes';

export function launchSearch(searchTerm) {
  return {
    type: types.LAUNCH_SEARCH,
    term: searchTerm,
  };
}