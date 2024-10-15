import {StyleSheet} from 'react-native';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Tabnavigation from './src/Tabnavigation';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './src/Dangnhap';
import Signin from './src/Dangky';

const Stack = createNativeStackNavigator();
const App = () => {
  // return <Tabnavigation/>;
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signin" component={Signin} />
        <Stack.Screen name="Home" component={Tabnavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
