import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { Box, VStack, Input, Button, Text, Select } from 'native-base';


const Shipping = (props) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');

  const handleSubmit = () => {
    const shippingDetails = {
      name,
      phone,
      streetAddress,
      city,
      zipCode,
    };
    
    props.navigation.navigate('Payment', { shippingDetails });

  };
  
  

  return (
    <ScrollView>
      <VStack space={4} mt={4} px={4}>
        <Text fontSize="2xl" fontWeight="bold">Shipping Information</Text>
        <Input
          placeholder="Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Input
          placeholder="Phone"
          value={phone}
          onChangeText={(text) => setPhone(text)}
          keyboardType="phone-pad"
        />
        <Input
          placeholder="Street Address"
          value={streetAddress}
          onChangeText={(text) => setStreetAddress(text)}
        />
        <Input
          placeholder="City"
          value={city}
          onChangeText={(text) => setCity(text)}
        />
        <Input
          placeholder="Zip Code"
          value={zipCode}
          onChangeText={(text) => setZipCode(text)}
          keyboardType="number-pad"
        />
        <Button onPress={handleSubmit} mt={4}>Confirm</Button>
      </VStack>
    </ScrollView>
  );
};

export default Shipping;

