import { combineReducers } from 'redux';
import fuelSavings from './fuelSavingsReducer';
import news from './searchBarReducer';
import {routerReducer} from 'react-router-redux';

const rootReducer = combineReducers({
  fuelSavings,
  news,
  routing: routerReducer
});

export default rootReducer;
