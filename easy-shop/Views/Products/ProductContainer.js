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

import baseUrl from "../../assets/common/baseUrl";
import axios from "axios";

import ProductList from "./ProductList";
import SearchedProduct from "./SearchedProducts";
import Banner from "../../Shared/Banner";
import CategoryFilter from "./CategoryFilter";

var { height } = Dimensions.get("window");

const data = require("../../assets/data/products.json");
//const productsCategories = require("../../assets/data/categories.json");

const ProductContainer = (props) => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState(false);

  const [productsCtg, setProductsCtg] = useState([]);
  const [categories, setCategories] = useState([]);
  const [active, setActive] = useState();
  const [initialState, setInitialState] = useState([]);
  const handleProductPress = (item) => {
    props.navigation.navigate("Product Detail", { item: item });
  };

  useEffect(() => {
    //setProducts(data);
    //setProductsFiltered(data);
    setFocus(false);
    //setProductsCtg(data);
    //setCategories(productsCategories);
    setActive(-1);
    //setInitialState(data);

    // Get products
    axios
      .get(`${baseUrl}products`)
      .then((res) => {
        console.log("Fetched products:", res.data); 
        setProducts(res.data);
        setProductsFiltered(res.data);
        setProductsCtg(res.data);
        setInitialState(res.data);
      })

  // Fetch categories from the server
  axios
    .get(`${baseUrl}categories`)
    .then((res) => {
      setCategories(res.data);
    })
    .catch((error) => {
      console.log("Error fetching categories:", error);
    });

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
      const categoryObj = categories.find((category) => (category._id ? category._id.toString() === ctg : false));
  
      if (categoryObj && categoryObj.name) {
        const categoryName = categoryObj.name;
        console.log("Category name:", categoryName);
  
        const filteredProducts = products.filter((i) => {
          console.log("Product category:", i.category);
          return i.category && i.category.name === categoryName;
        });
  
        console.log("Filtered products:", filteredProducts);
  
        setProductsFiltered(filteredProducts);
        setActive(true);
      } else {
        console.log("Category not found");
      }
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
          productsFiltered={productsFiltered}
          onProductPress={handleProductPress}
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
