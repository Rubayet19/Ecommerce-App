import React, { useEffect, useState } from "react";
import { ScrollView, Alert } from 'react-native';
import { VStack, Text, Box, Button, HStack, Center } from 'native-base';
import { connect } from "react-redux";
import { clearCart } from "../../../Redux/Actions/cartActions";
import AuthGlobal from "../../../Context/store/AuthGlobal";
import { useContext } from 'react';

const Confirm = (props) => {
  const shippingDetails = props.route.params?.shippingDetails;
  const cartItems = props.cartItems || [];

  const context = useContext(AuthGlobal);
  const { isAuthenticated } = context.stateUser;

  const handlePlaceOrder = () => {
    props.clearCart();
    props.navigation.navigate('Cart');
    Alert.alert('Order Placed', 'Your order has been successfully placed.');
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.product.price, 0);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      props.navigation.navigate('Login');
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <Center flex={1}>
        <Text fontSize="lg" fontWeight="bold" textAlign="center">
          You must be logged in to place an order.
        </Text>
        <Button onPress={() => props.navigation.navigate('Login')} mt={2}>
          Login
        </Button>
      </Center>
    );
  } else {
    if (!shippingDetails) {
      return (
        <Center flex={1}>
          <Text fontSize="lg" fontWeight="bold" textAlign="center">
            Please enter shipping details and choose your payment method.
          </Text>
        </Center>
      );
    }
  
    return (
      <ScrollView>
        <VStack space={4} mt={4} px={4}>
          <Text fontSize="2xl" fontWeight="bold">Confirm Order</Text>
          <Box
            bg="white"
            p={4}
            rounded="lg"
            shadow={1}
            border={1}
            borderColor="coolGray.200"
          >
            <Text fontSize="md" fontWeight="bold">Shipping Details:</Text>
            <Text>Name: {shippingDetails.name}</Text>
            <Text>Phone: {shippingDetails.phone}</Text>
            <Text>Street Address: {shippingDetails.streetAddress}</Text>
            <Text>City: {shippingDetails.city}</Text>
            <Text>Zip Code: {shippingDetails.zipCode}</Text>
          </Box>
          <Box
            bg="white"
            p={4}
            rounded="lg"
            shadow={1}
            border={1}
            borderColor="coolGray.200"
          >
            <Text fontSize="md" fontWeight="bold">Cart Items:</Text>
            {cartItems.map((item, index) => (
              <HStack key={index} justifyContent="space-between">
                <Text>{item.product.name}</Text>
                <Text>${item.product.price}</Text>
              </HStack>
            ))}
            <HStack justifyContent="space-between" mt={2}>
              <Text fontWeight="bold">Total:</Text>
              <Text fontWeight="bold">${getTotalPrice()}</Text>
            </HStack>
          </Box>
          <Button onPress={handlePlaceOrder}>
            Place Order
          </Button>
        </VStack>
      </ScrollView>
    );
  }
};

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(clearCart()),
  };
};
  
  export default connect(mapStateToProps, mapDispatchToProps)(Confirm);




