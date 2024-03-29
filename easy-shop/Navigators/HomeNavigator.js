import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import ProductContainer from "../Views/Products/ProductContainer";
import SingleProduct from "../Views/Products/SingleProduct";
import Header from "../Shared/Header"; // Import Header component

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name='Home'
        component={ProductContainer}
        options={{
          headerTitle: () => <Header />, // Use Header component as headerTitle
          headerStyle: {
            backgroundColor: "#fff",
            height: 80,
          },
        }}
      />
      <Stack.Screen 
        name='Product Detail'
        component={SingleProduct}
        options={{
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  )
}

export default function HomeNavigator() {
  return <MyStack />;
}

