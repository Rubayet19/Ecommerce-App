import React from 'react';
import { View, StyleSheet, Dimensions, ScrollView, Pressable } from 'react-native';
import { Box, VStack, HStack, Image, Text } from 'native-base';

var { width } = Dimensions.get("window");

const SearchedProduct = (props) => {
  const { productsFiltered } = props;
  return (
    <ScrollView style={{ width: width }}>
      {productsFiltered.length > 0 ? (
        productsFiltered.map((item) => (
          <Pressable
            onPress={() => {
              props.navigation.navigate("Product Detail", { item: item });
            }}
            key={item._id.$oid}
          >
            <Box
              borderColor="gray.200"
              borderWidth={1}
              borderRadius="md"
              py={2}
              px={4}
              mb={4}
            >
              <HStack space={3} alignItems="center">
                <Image
                  source={{
                    uri: item.image
                      ? item.image
                      : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
                  }}
                  alt={item.name}
                  size="sm"
                />
                <VStack>
                  <Text>{item.name}</Text>
                  <Text fontSize="sm" color="gray.500" noOfLines={2}>
                    {item.description}
                  </Text>
                </VStack>
              </HStack>
            </Box>
          </Pressable>
        ))
      ) : (
        <View style={styles.center}>
          <Text style={{ alignSelf: 'center' }}>
            No products match the selected criteria
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
});

export default SearchedProduct;



