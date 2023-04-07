import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
  View,
} from "react-native";
import { Text, HStack } from "native-base";
import { Button } from "react-native";

import { connect } from 'react-redux';
import * as actions from '../../Redux/Actions/cartActions';

const SingleProduct = (props) => {
  const [item, setItem] = useState(props.route.params.item);
  const [availability, setAvailability] = useState(null);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.imageContainer}>
          {item.image ? (
            <Image
              source={{ uri: item.image }}
              resizeMode="contain"
              style={styles.image}
            />
          ) : (
            <ActivityIndicator size="large" color="#0000ff" />
          )}
        </View>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.contentText}>{item.brand}</Text>
      </ScrollView>
      <HStack
        style={styles.bottomContainer}
        space={3}
        alignItems="center"
        justifyContent="space-between"
      >
        <Text style={styles.price}>${item.price}</Text>
        <Button title="Add" onPress={() => { props.addItemToCart(item) }} />

      </HStack>
    </View>
  );
};

const mapToDispatchToProps = (dispatch) => {
  return {
      addItemToCart: (product) => 
          dispatch(actions.addToCart({quantity: 1, product}))
  }
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: "100%",
  },
  imageContainer: {
    marginTop: 50,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 250,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },
  contentText: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 20,
  },
  bottomContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
  price: {
    fontSize: 22,
    color: "red",
  },
  availabilityContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  availability: {
    flexDirection: "row",
    marginBottom: 10,
  },
});

export default connect(null, mapToDispatchToProps)(SingleProduct);







