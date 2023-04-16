import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
  View,
} from "react-native";
import { Text, HStack, VStack } from "native-base";
import { Button } from "react-native";

import { connect } from "react-redux";
import * as actions from "../../Redux/Actions/cartActions";
import TrafficLight from "../../Shared/StyledComponents/TrafficLight";

const SingleProduct = (props) => {
  const [item, setItem] = useState(props.route.params.item);
  const [availability, setAvailability] = useState(null);
  const [availabilityText, setAvailabilityText] = useState("");

  useEffect(() => {
    if (props.route.params.item.countInStock == 0) {
      setAvailability(<TrafficLight unavailable></TrafficLight>);
      setAvailabilityText("Unavailable");
    } else if (props.route.params.item.countInStock <= 5) {
      setAvailability(<TrafficLight limited></TrafficLight>);
      setAvailabilityText("Limited Stock");
    } else {
      setAvailability(<TrafficLight available></TrafficLight>);
      setAvailabilityText("Available");
    }

    return () => {
      setAvailability(null);
      setAvailabilityText("");
    };
  }, []);

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
        <VStack alignItems="center" style={styles.availabilityContainer}>
          <Text style={styles.availabilityText}>{availabilityText}</Text>
          {availability}
        </VStack>
        <Text style={styles.descriptionText}>{item.description}</Text>
      </ScrollView>
      <HStack
        style={styles.bottomContainer}
        space={3}
        alignItems="center"
        justifyContent="space-between"
      >
        <Text style={styles.price}>${item.price}</Text>
        <Button title="Add" onPress={() => props.addItemToCart(item)} />
      </HStack>
    </View>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addItemToCart: (product) =>
      dispatch(actions.addToCart({ quantity: 1, product })),
  };
};

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
  availabilityText: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 5,
    },
    descriptionText: {
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 40,
    },
    });
    
    export default connect(null, mapDispatchToProps)(SingleProduct);







