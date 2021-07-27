import React from 'react';
import {IconButton} from 'react-native-paper';
import {createStackNavigator} from '@react-navigation/stack';

//importamos screens
import Home from '../screens/Home';
import Movie from '../screens/Movie';

//creamos constante para crear nuestro stack con los screen

const Stack = createStackNavigator();

export default function StackNavigation(props) {
  const {navigation} = props;
  //boton para sacar draw
  const buttonLeft = screen => {
    switch (screen) {
      case 'movie':
        return (
          <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
        );
      default:
        return (
          <IconButton icon="menu" onPress={() => navigation.openDrawer()} />
        );
    }
  };

  //screen de las app
  return (
    <Stack.Navigator initialRouteName="app">
      <Stack.Screen
        name="home"
        component={Home}
        options={{
          title: '',
          headerTransparent: true,
          headerLeft: () => buttonLeft('home'),
        }}
      />
      <Stack.Screen
        name="movie"
        component={Movie}
        options={{
          title: '',
          headerTransparent: true,
          headerLeft: () => buttonLeft('movie'),
        }}
      />
    </Stack.Navigator>
  );
}
