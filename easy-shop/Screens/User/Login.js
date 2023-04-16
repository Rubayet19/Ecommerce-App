import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { Box, Text, VStack, Input, Button } from 'native-base';
import { useNavigation } from '@react-navigation/native';

import AuthGlobal from '../../Context/store/AuthGlobal';
import { loginUser } from '../../Context/actions/Auth.actions';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const context = useContext(AuthGlobal);
  const navigation = useNavigation();

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  const handleSubmit = () => {
    if (email === '' || password === '') {
      Alert.alert('Error', 'Please fill in your credentials');
    } else {
      const user = {
        email: email,
        password: password,
      };
      loginUser(user, context.dispatch);
    }
  };

  useEffect(() => {
    if (context.stateUser.isAuthenticated) {
      navigation.navigate('User Profile');
    }
  }, [context.stateUser]);

  return (
    <Box flex={1} justifyContent="center" alignItems="center" bg="white">
      <VStack space={5} width="80%">
        <Text fontSize="2xl" fontWeight="bold">
          Login
        </Text>
        <Input
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(value) => setEmail(value)}
        />
        <Input
          placeholder="Password"
          secureTextEntry={true}
          autoCapitalize="none"
          onChangeText={(value) => setPassword(value)}
        />
        <Button width="100%" onPress={handleSubmit}>
          Login
        </Button>
        <Text textAlign="center">Don't have an account?</Text>
        <Button width="100%" variant="outline" onPress={handleRegister}>
          Register
        </Button>
      </VStack>
    </Box>
  );
};

const styles = StyleSheet.create({});

export default Login;


