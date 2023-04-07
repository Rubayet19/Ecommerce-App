import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import { combineReducers } from 'redux';

import cartItems from './Reducers/cartItem'

const reducers = combineReducers({
    cartItems: cartItems,
});

const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(thunkMiddleware),
});

export default store;
