import React, { useEffect, useReducer, useState } from "react";
import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

import authReducer from "../reducers/Auth.reducer";
import { setCurrentUser } from "../actions/Auth.actions";
import AuthGlobal from "./AuthGlobal";

const Auth = (props) => {
  const [stateUser, dispatch] = useReducer(authReducer, {
    isAuthenticated: null,
    user: {},
  });

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("jwt");
      if (token) {
        const decoded = jwt_decode(token);
        dispatch(setCurrentUser(decoded));
      }
    };
    checkToken();
  }, []);

  return (
    <AuthGlobal.Provider
      value={{
        stateUser,
        dispatch,
      }}
    >
      {props.children}
    </AuthGlobal.Provider>
  );
};

export default Auth;

