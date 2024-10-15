import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TrangChu from './ManHom';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon3 from 'react-native-vector-icons/Entypo';
import Cart from './Cart';
import Yeuthich from './Yeuthich';
import Lienhe from './Lienhe';

const Tabnavigation = () => {
  const Tabs = createBottomTabNavigator();

  return (
    <Tabs.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({focused, color, size}) => {
          if (route.name === 'TrangChu') {
            return (
              <Icon
                name={'home'}
                size={30}
                color={focused ? '#02aedd' : '#676767'}
              />
            );
          } else if (route.name === 'Cart') {
            return (
              <Icon1
                name={'shopping-cart'}
                size={24}
                color={focused ? '#02aedd' : '#676767'}
              />
            );
          } else if (route.name === 'Favorite') {
            return (
              <Icon2
                name={'favorite'}
                size={size}
                color={focused ? '#02aedd' : '#676767'}
              />
            );
          } else if (route.name === 'Lienhe') {
            return (
              <Icon3
                name={'location'}
                size={size}
                color={focused ? '#02aedd' : '#676767'}
              />
            );
          }
        },
      })}>
      <Tabs.Screen name="TrangChu" component={TrangChu} />
      <Tabs.Screen name="Cart" component={Cart} />
      <Tabs.Screen name="Favorite" component={Yeuthich} />
      <Tabs.Screen name="Lienhe" component={Lienhe} />
    </Tabs.Navigator>
  );
};

export default Tabnavigation;
