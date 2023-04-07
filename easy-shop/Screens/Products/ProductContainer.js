import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList,Dimensions } from "react-native";
import {
  Container,
  HStack,
  Input,
  Text,
  Box,
  VStack,
  ScrollView
} from "native-base";
import { SearchIcon } from "native-base";

import ProductList from "./ProductList";
import SearchedProduct from "./SearchedProducts";
import Banner from "../../Shared/Banner";
import CategoryFilter from "./CategoryFilter";

var { height } = Dimensions.get("window");

const data = require("../../assets/data/products.json");
const productsCategories = require("../../assets/data/categories.json");

const ProductContainer = (props) => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState(false);

  const [productsCtg, setProductsCtg] = useState([]);
  const [categories, setCategories] = useState([]);
  const [active, setActive] = useState();
  const [initialState, setInitialState] = useState([]);

  useEffect(() => {
    setProducts(data);
    setProductsFiltered(data);
    setFocus(false);
    setProductsCtg(data);
    setCategories(productsCategories);
    setActive(-1);
    setInitialState(data);

    return () => {
      setProducts([]);
      setCategories([]);
      setActive();
      setInitialState();
    };
  }, []);

  // Search function
  const searchProduct = (text) => {
    setProductsFiltered(
      products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
    );
  };

  const openList = () => {
    setFocus(true);
  };

  const onBlur = () => {
    setFocus(false);

    
  };
  const renderItem = ({ item }) => (
    <ProductList item={item} navigation={props.navigation} />
  );

  // Categories
  const changeCtg = (ctg) => {
    if (ctg === "all") {
      setProductsFiltered(initialState);
      setActive(true);
    } else {
      const categoryName = categories.find((category) => category._id === ctg).name;
      const filteredProducts = products.filter((i) => i.category.name === categoryName);
      setProductsFiltered(filteredProducts);
      setActive(true);
    }
  };

  return (
    <ScrollView>
      <VStack space={2} alignItems="center">
        <Box width="90%">
          <HStack space={2} alignItems="center">
            <SearchIcon />
            <Input
              variant="filled"
              width="90%"
              bg="gray.200"
              borderRadius="md"
              py={2}
              px={1}
              fontSize={14}
              _web={{
                _focus: {
                  borderColor: "muted.300",
                  style: { boxShadow: "none" },
                },
                ml: "0",
              }}
              placeholder="Search"
              onFocus={openList}
              onBlur={onBlur}
              onChangeText={(text) => searchProduct(text)}
            />
          </HStack>
        </Box>


        {focus ? (
          <SearchedProduct
            navigation={props.navigation}
            productsFiltered={productsFiltered}
          />
        ) : (
          <>
            <Banner />
            <CategoryFilter
              categories={categories}
              categoryFilter={changeCtg}
              productsCtg={productsCtg}
              active={active}
              setActive={setActive}
            />
            <FlatList
              contentContainerStyle={styles.listContainer}
              data={productsFiltered}
              renderItem={({ item, index }) => (
                <ProductList
                  key={index}
                  item={item}
                  navigation={props.navigation}
                />
              )}
              keyExtractor={(item) => item.id}
            />
          </>
        )}
      </VStack>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexWrap: "wrap",
    backgroundColor: "gainsboro",
  },
  listContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    backgroundColor: "gainsboro",
  },
  noProductsFound: {
    textAlign: "center",
    fontSize: 20,
    alignSelf: "center",
    color: "#3d3d3d",
    fontWeight: "bold",
    marginTop: 30,
  },
  emptyContainer: {
    backgroundColor: "gainsboro",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
});

export default ProductContainer;
