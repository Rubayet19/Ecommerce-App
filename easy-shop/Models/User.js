import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Box, Text, VStack, Button } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthGlobal from '../../Context/store/AuthGlobal';
import { logoutUser } from '../../Context/actions/Auth.actions';

const UserProfile = (props) => {
  const context = useContext(AuthGlobal);

  const handleSignOut = async () => {
    await AsyncStorage.removeItem('jwt');
    logoutUser(context.dispatch);
    props.navigation.navigate('Login');
  };

  return (
    <Box flex={1} justifyContent="center" alignItems="center" bg="white">
      <VStack space={5} width="80%">
        <Text fontSize="2xl" fontWeight="bold" alignSelf="center">
          User
        </Text>
        <Button width="100%" onPress={handleSignOut}>
          Sign Out
        </Button>
      </VStack>
    </Box>
  );
};

const styles = StyleSheet.create({});

export default UserProfile;


