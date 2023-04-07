import React, { useState } from 'react';
import { VStack, Text, HStack, Box, Pressable, Icon, Button } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { View } from 'react-native';

const PaymentOption = ({ label, value, selectedValue, onSelect }) => (
  <Pressable
    onPress={() => onSelect(value)}
    borderRadius="md"
    borderWidth={1}
    borderColor={selectedValue === value ? 'primary.500' : 'gray.200'}
    py={3}
    px={5}
    mb={3}
    _pressed={{ opacity: 0.7 }}
  >
    <HStack alignItems="center" justifyContent="space-between">
      <Text>{label}</Text>
      {selectedValue === value && (
        <Icon
          as={MaterialIcons}
          name="check"
          size={6}
          color="primary.500"
        />
      )}
    </HStack>
  </Pressable>
);

export default function Payment(props) {
  const [paymentMethod, setPaymentMethod] = useState('');

  const handlePaymentMethodSelect = (value) => {
    setPaymentMethod(value);
  };

  const order = {
    paymentMethod: paymentMethod,
    // ... other order properties
  };

  return (
    <VStack alignItems="center" space={4} px={4} mt={6}>
      <Text fontSize="2xl" fontWeight="bold">
        Choose a payment method
      </Text>
      <VStack space={3} w="100%">
        <PaymentOption
          label="Cash on Delivery"
          value="cashOnDelivery"
          selectedValue={paymentMethod}
          onSelect={handlePaymentMethodSelect}
        />
        <PaymentOption
          label="Card Payment"
          value="cardPayment"
          selectedValue={paymentMethod}
          onSelect={handlePaymentMethodSelect}
        />
      </VStack>
      {!paymentMethod && (
        <Text color="red.500" mt={2}>
          Please select a payment method.
        </Text>
      )}
      <View style={{ marginTop: 60, alignSelf: 'center' }}>
        <Button
          onPress={() => {
            const shippingDetails = props.route.params?.shippingDetails;
            props.navigation.navigate('Confirm', { order, shippingDetails });
          }}
          py={3}
          px={160}
          fontSize="lg"
          disabled={!paymentMethod} // Disable the button if no payment method is selected
        >
          Confirm
        </Button>
      </View>
    </VStack>
  );
}











