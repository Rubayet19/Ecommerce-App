import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    CLEAR_CART,
  } from "../constants";
  
  export const addToCart = (payload) => {
    return {
      type: ADD_TO_CART,
      payload,
    };
  };
  
  export const removeItemFromCart = (index) => {
    return {
      type: "REMOVE_ITEM",
      payload: index,
    };
  };
  
  export const clearCart = () => {
    return {
      type: CLEAR_CART,
    };
  };
  