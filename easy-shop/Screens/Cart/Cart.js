import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { connect } from "react-redux";
import { Box, VStack, Text, HStack, Button } from "native-base";
import { useNavigation } from '@react-navigation/native';


import Header from "../../Shared/Header";
import * as actions from "../../Redux/Actions/cartActions";

const Cart = (props) => {
  const getTotalPrice = () => {
    return props.cartItems.reduce(
      (total, item) => total + item.product.price,
      0
    );
  };

  const clearCart = () => {
    props.clearCart();
  };
  const removeItem = (index) => {
    props.removeItemFromCart(index);
  };

  const navigation = useNavigation();
  

  const checkout = () => {
    navigation.navigate('Checkout', { cartItems: props.cartItems });
  };
  
  
  return (
    <View style={styles.container}>
      <Header />
      {props.cartItems.length > 0 ? (
        <VStack space={4} alignItems="center">
          {props.cartItems.map((x, index) => {
            if (x && x.product) {
              return (
                <HStack
                  key={index}
                  width="90%"
                  alignItems="center"
                  justifyContent="space-between"
                  borderWidth={1}
                  borderRadius={8}
                  borderColor="gray.200"
                  p={4}
                >
                  <Image
                    source={{ uri: x.product.image }}
                    resizeMode="contain"
                    style={styles.image}
                  />
                  <Text>{x.product.name}</Text>
                  <Text>${x.product.price}</Text>
                  <Button
                    onPress={() => removeItem(index)}
                    size="sm"
                    variant="outline"
                  >
                    Remove
                  </Button>
                </HStack>
              );
            } else {
              return null;
            }
          })}
        </VStack>
      ) : (
        <Box justifyContent="center" alignItems="center" flex={1}>
          <Text fontSize="lg">No items in cart</Text>
        </Box>
      )}
      {props.cartItems.length > 0 && (
        <HStack
          justifyContent="space-between"
          alignItems="center"
          px={4}
          pb={4}
          mb={4}
        >
          <Text fontSize="xl">Total: ${getTotalPrice()}</Text>
          <HStack space={4}>
            <Button onPress={clearCart} size="sm" variant="outline">
              Clear
            </Button>
            <Button onPress={checkout} size="sm">
              Checkout
            </Button>
          </HStack>
        </HStack>
      )}
    </View>
  );
};

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
    removeItemFromCart: (index) => dispatch(actions.removeItemFromCart(index)),
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
