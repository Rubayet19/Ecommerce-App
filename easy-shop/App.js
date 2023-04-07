import React from "react";
import { LogBox } from "react-native";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";

import { Provider } from 'react-redux';
import store from './Redux/store';

import Main from "./Navigators/Main";

LogBox.ignoreAllLogs(true);

export default function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <NavigationContainer>
          <Main />
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
}



