import React from 'react';
import { TouchableOpacity, View, Dimensions } from 'react-native';

import ProductCard from './ProductCard';

var { width } = Dimensions.get("window");

// Calculate the padding value based on the screen width
const paddingHorizontal = width * 0; // You can adjust the multiplier (0.02) as needed

const ProductList = (props) => {
    const { item } = props;
    return (
        <TouchableOpacity
          style={{ width: width * 0.5, paddingHorizontal: paddingHorizontal }}
          onPress={() => props.navigation.navigate('Product Detail', { item: item })}
        >
            <View
                style={{
                    width: (width * 0.5) - paddingHorizontal * 2,
                    backgroundColor: 'gainsboro',
                }}
            >
                <ProductCard {...item} />
            </View>
        </TouchableOpacity>
    );
};

export default ProductList;



