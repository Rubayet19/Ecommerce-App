import React from 'react';
import { StyleSheet } from 'react-native';
import { ListItem, Thumbnail, HStack, Text, VStack } from 'native-base';

const CartItem = (props) => {
  const data = props.item.product;

  return (
    <ListItem style={styles.listItem} key={Math.random()}>
      <HStack alignItems="center" justifyContent="space-between">
        <Thumbnail
          source={{
            uri: data.image
              ? data.image
              : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
          }}
          resizeMode="contain"
          borderRadius={100}
          size={50}
        />
        <VStack>
          <Text>{data.name}</Text>
          <Text>$ {data.price}</Text>
        </VStack>
      </HStack>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  listItem: {
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
  },
});

export default CartItem;


