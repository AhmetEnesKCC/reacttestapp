import { combineReducers } from "redux";

const SEARCH_STATE = "SEARCH_STATE";
const ADD_BASKET = "ADD_BASKET";
const DELETE_BASKET = "DELETE_BASKET";
const SET_NATIVE = "SET_NATIVE";
const TOTAL_PRICE = "TOTAL_PRICE";
const SEARCH_VALUE = "SEARCH_VALUE";

const initialState = {
  search_state: false,
  basket: [],
  native: false,
  totalPrice: 0,
  search_value: "",
};

export const searchStateAction = (payload) => ({
  type: SEARCH_STATE,
  payload,
});

export const addbasketAction = (payload) => ({
  type: ADD_BASKET,
  payload,
});

export const deleteBasketAction = (payload) => ({
  type: DELETE_BASKET,
  payload,
});

export const setNativeAction = (payload) => ({
  type: SET_NATIVE,
  payload,
});

export const totalPriceAction = (payload) => ({
  type: TOTAL_PRICE,
  payload,
});

export const searchValueAction = (payload) => ({
  type: SEARCH_VALUE,
  payload,
});

export const searchStateReducer = (state = initialState.search_state, action) => {
  switch (action.type) {
    case SEARCH_STATE:
      return action.payload;
    default:
      return state;
  }
};

export const basketReducer = (state = initialState.basket, action) => {
  switch (action.type) {
    case ADD_BASKET:
      return [...state, action.payload];
    case DELETE_BASKET:
      return state;
    default:
      return state;
  }
};

export const setNativeReducer = (state = initialState.native, action) => {
  switch (action.type) {
    case SET_NATIVE:
      return action.payload;
    default:
      return state;
  }
};

export const totalPriceReducer = (state = initialState.totalPrice, action) => {
  switch (action.type) {
    case TOTAL_PRICE:
      return state + action.payload;
    default:
      return state;
  }
};

export const searchValueReducer = (state = initialState.search_value, action) => {
  switch (action.type) {
    case SEARCH_VALUE:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  searching: searchStateReducer,
  basket: basketReducer,
  native: setNativeReducer,
  total: totalPriceReducer,
  search_value: searchValueReducer,
});
