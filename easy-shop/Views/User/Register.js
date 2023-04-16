import React, { useState } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { Box, Text, VStack, Input, Button } from 'native-base';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import baseURL from '../../assets/common/baseUrl';

const Register = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    if (!email || !name || !phone || !password) {
      Alert.alert('Error', 'Please fill in your credentials');
    } else {
      // Create the user object
      const user = {
        name: name,
        email: email,
        phone: phone,
        password: password,
      };
  
      // Send the user object to the server
      axios
        axios.post(`${baseURL}users/`, user)
        .then((res) => {
          if (res.status == 200) {
            Toast.show({
              topOffset: 60,
              type: 'success',
              text1: 'Registration Succeeded',
              text2: 'Please Login into your account',
            });
            setTimeout(() => {
              navigation.navigate('Login');
            }, 500);
          }
        })
        .catch((error) => {
          console.log('Error while registering:', error.response.data);
          Toast.show({
            topOffset: 60,
            type: 'error',
            text1: 'Something went wrong',
            text2: 'Please try again',
          });
        });
        
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




   


