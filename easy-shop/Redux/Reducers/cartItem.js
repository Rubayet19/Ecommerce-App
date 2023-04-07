import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    CLEAR_CART,
  } from "../constants";
  
  const cartItems = (state = [], action) => {
    switch (action.type) {
      case ADD_TO_CART:
        return [...state, action.payload];
      case "REMOVE_ITEM":
        return state.filter((_, i) => i !== action.payload);
      case CLEAR_CART:
        return [];
      default:
        return state;
    }
  };
  
  export default cartItems;
  
