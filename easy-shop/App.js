import React from "react";
import { LogBox } from "react-native";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import Toast from "react-native-toast-message";

import { Provider } from 'react-redux';
import store from './Redux/store';

import Auth from "./Context/store/Auth";

import Main from "./Navigators/Main";

LogBox.ignoreAllLogs(true);

export default function App() {
  return (
    <Auth>
    <Provider store={store}>
      <NativeBaseProvider>
        <NavigationContainer>
          <Main />
          <Toast ref={(ref) => Toast.setRef(ref)} />
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
    </Auth>
  );
}



