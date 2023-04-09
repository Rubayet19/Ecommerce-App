import React, { useState } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { Box, Text, VStack, Input, Button } from 'native-base';

const Register = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    if (!email || !name || !phone || !password) {
      Alert.alert('Error', 'Please fill in your credentials');
    } else {
      // Register logic here
    }
  };

  return (
    <Box flex={1} justifyContent="center" alignItems="center" bg="white">
      <VStack space={5} width="80%">
        <Text fontSize="2xl" fontWeight="bold">
          Register
        </Text>
        <Input
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(value) => setEmail(value)}
        />
        <Input
          placeholder="Name"
          autoCapitalize="none"
          onChangeText={(value) => setName(value)}
        />
        <Input
          placeholder="Phone No."
          keyboardType="phone-pad"
          autoCapitalize="none"
          onChangeText={(value) => setPhone(value)}
        />
        <Input
          placeholder="Password"
          secureTextEntry={true}
          autoCapitalize="none"
          onChangeText={(value) => setPassword(value)}
        />
        <Button width="100%" onPress={handleSubmit}>
          Register
        </Button>
        <Text textAlign="center">Already have an account?</Text>
        <Button width="100%" variant="outline" onPress={() => navigation.navigate('Login')}>
          Back to Login
        </Button>
      </VStack>
    </Box>
  );
};

const styles = StyleSheet.create({});

export default Register;




   


